import { useState, useEffect } from 'react';
import { supabase, Visualization } from '../lib/supabase';

export const useVisualizations = () => {
  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVisualizations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('visualizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVisualizations(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch visualizations');
    } finally {
      setLoading(false);
    }
  };

  const addVisualization = async (visualization: Omit<Visualization, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('visualizations')
        .insert([visualization])
        .select()
        .single();

      if (error) throw error;
      setVisualizations(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add visualization');
      throw err;
    }
  };

  const incrementViews = async (id: string) => {
    try {
      const viz = visualizations.find(v => v.id === id);
      if (!viz) return;

      const { error } = await supabase
        .from('visualizations')
        .update({ views: viz.views + 1 })
        .eq('id', id);

      if (error) throw error;
      
      setVisualizations(prev => prev.map(v => 
        v.id === id ? { ...v, views: v.views + 1 } : v
      ));
    } catch (err) {
      console.error('Failed to increment views:', err);
    }
  };

  useEffect(() => {
    fetchVisualizations();

    // Set up real-time subscription
    const subscription = supabase
      .channel('visualizations')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'visualizations' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setVisualizations(prev => [payload.new as Visualization, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setVisualizations(prev => prev.map(v => 
              v.id === payload.new.id ? payload.new as Visualization : v
            ));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    visualizations,
    loading,
    error,
    addVisualization,
    incrementViews,
    refetch: fetchVisualizations
  };
};