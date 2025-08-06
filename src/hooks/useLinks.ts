import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
  featured?: boolean;
  position: number;
}

export function useLinks() {
  const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLinks();
      subscribeToLinks();
    } else {
      setLinks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', user.id)
        .order('position', { ascending: true });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToLinks = () => {
    if (!user) return;

    const channel = supabase
      .channel('links_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'links',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchLinks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const addLink = async (title: string, url: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('links')
        .insert({
          user_id: user.id,
          title,
          url,
          position: links.length
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error adding link:', error);
      return { data: null, error };
    }
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('links')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating link:', error);
      return { data: null, error };
    }
  };

  const deleteLink = async (id: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting link:', error);
      return { error };
    }
  };

  const trackLinkClick = async (linkId: string) => {
    if (!user) return;

    try {
      // Update click count
      await supabase.rpc('increment_clicks', { link_id: linkId });

      // Track analytics
      await supabase
        .from('analytics')
        .insert({
          user_id: user.id,
          link_id: linkId,
          event_type: 'link_click'
        });
    } catch (error) {
      console.error('Error tracking link click:', error);
    }
  };

  return {
    links,
    loading,
    addLink,
    updateLink,
    deleteLink,
    trackLinkClick,
    refetch: fetchLinks,
  };
}