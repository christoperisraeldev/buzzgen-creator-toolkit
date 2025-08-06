import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
}

export function useScheduledPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPosts();
      subscribeToPosts();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchPosts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToPosts = () => {
    if (!user) return;

    const channel = supabase
      .channel('posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'scheduled_posts',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const addPost = async (post: Omit<ScheduledPost, 'id'>) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: user.id,
          ...post
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error adding post:', error);
      return { data: null, error };
    }
  };

  const updatePost = async (id: string, updates: Partial<ScheduledPost>) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating post:', error);
      return { data: null, error };
    }
  };

  const deletePost = async (id: string) => {
    if (!user) return { error: new Error('No user') };

    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { error };
    }
  };

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
}