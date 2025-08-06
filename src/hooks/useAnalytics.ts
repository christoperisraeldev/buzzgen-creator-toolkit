import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  topSources: Array<{ source: string; clicks: number; percentage: number }>;
  clicksByDay: Array<{ day: string; clicks: number }>;
}

export function useAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalViews: 0,
    totalClicks: 0,
    topSources: [],
    clicksByDay: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    } else {
      setAnalytics({
        totalViews: 0,
        totalClicks: 0,
        topSources: [],
        clicksByDay: []
      });
      setLoading(false);
    }
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;

    try {
      // Get total views and clicks
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('event_type, source')
        .eq('user_id', user.id);

      if (analyticsError) throw analyticsError;

      const totalViews = analyticsData?.filter(a => a.event_type === 'page_view').length || 0;
      const totalClicks = analyticsData?.filter(a => a.event_type === 'link_click').length || 0;

      // Group by source for top sources
      const sourceGroups = analyticsData?.reduce((acc: any, item) => {
        if (item.event_type === 'link_click' && item.source) {
          acc[item.source] = (acc[item.source] || 0) + 1;
        }
        return acc;
      }, {}) || {};

      const topSources = Object.entries(sourceGroups)
        .map(([source, clicks]: [string, any]) => ({
          source,
          clicks,
          percentage: totalClicks > 0 ? (clicks / totalClicks) * 100 : 0
        }))
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5);

      // Get clicks by day for the last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: recentClicks, error: recentError } = await supabase
        .from('analytics')
        .select('created_at')
        .eq('user_id', user.id)
        .eq('event_type', 'link_click')
        .gte('created_at', sevenDaysAgo.toISOString());

      if (recentError) throw recentError;

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const clicksByDay = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayClicks = recentClicks?.filter(click => {
          const clickDate = new Date(click.created_at);
          return clickDate.toDateString() === date.toDateString();
        }).length || 0;

        return {
          day: dayNames[date.getDay()],
          clicks: dayClicks
        };
      });

      setAnalytics({
        totalViews,
        totalClicks,
        topSources,
        clicksByDay
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const trackPageView = async () => {
    if (!user) return;

    try {
      await supabase
        .from('analytics')
        .insert({
          user_id: user.id,
          event_type: 'page_view'
        });
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  return {
    analytics,
    loading,
    trackPageView,
    refetch: fetchAnalytics,
  };
}