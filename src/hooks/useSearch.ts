import { useState, useEffect } from 'react';
import { supabase, Dataset, SearchQuery } from '../lib/supabase';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Dataset[]>([]);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDatasets = async (query: string, filters: string[] = []) => {
    try {
      setLoading(true);
      setError(null);

      // Log the search query
      await supabase
        .from('search_queries')
        .insert([{ query }]);

      let queryBuilder = supabase
        .from('datasets')
        .select('*');

      // Apply text search
      if (query.trim()) {
        queryBuilder = queryBuilder.or(
          `name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`
        );
      }

      // Apply category filters
      if (filters.length > 0) {
        queryBuilder = queryBuilder.in('category', filters);
      }

      const { data, error } = await queryBuilder
        .order('downloads', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularQueries = async () => {
    try {
      const { data, error } = await supabase
        .from('search_queries')
        .select('query')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      // Get unique queries
      const uniqueQueries = [...new Set(data?.map(q => q.query) || [])];
      setPopularQueries(uniqueQueries.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch popular queries:', err);
    }
  };

  useEffect(() => {
    fetchPopularQueries();
  }, []);

  return {
    searchResults,
    popularQueries,
    loading,
    error,
    searchDatasets,
    refetchPopularQueries: fetchPopularQueries
  };
};