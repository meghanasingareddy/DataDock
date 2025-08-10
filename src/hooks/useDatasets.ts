import { useState, useEffect } from 'react';
import { supabase, Dataset } from '../lib/supabase';

export const useDatasets = () => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDatasets(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addDataset = async (dataset: Omit<Dataset, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .insert([dataset])
        .select()
        .single();

      if (error) throw error;
      setDatasets(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add dataset');
      throw err;
    }
  };

  const updateDataset = async (id: string, updates: Partial<Dataset>) => {
    try {
      const { data, error } = await supabase
        .from('datasets')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setDatasets(prev => prev.map(d => d.id === id ? data : d));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update dataset');
      throw err;
    }
  };

  const incrementDownloads = async (id: string) => {
    try {
      const dataset = datasets.find(d => d.id === id);
      if (!dataset) return;

      await updateDataset(id, { downloads: dataset.downloads + 1 });
    } catch (err) {
      console.error('Failed to increment downloads:', err);
    }
  };

  useEffect(() => {
    fetchDatasets();

    // Set up real-time subscription
    const subscription = supabase
      .channel('datasets')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'datasets' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setDatasets(prev => [payload.new as Dataset, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setDatasets(prev => prev.map(d => 
              d.id === payload.new.id ? payload.new as Dataset : d
            ));
          } else if (payload.eventType === 'DELETE') {
            setDatasets(prev => prev.filter(d => d.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    datasets,
    loading,
    error,
    addDataset,
    updateDataset,
    incrementDownloads,
    refetch: fetchDatasets
  };
};