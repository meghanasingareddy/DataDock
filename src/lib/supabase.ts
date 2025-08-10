import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please connect to Supabase first.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Dataset {
  id: string;
  name: string;
  description: string;
  category: string;
  size: string;
  file_type: string;
  downloads: number;
  rating: number;
  tags: string[];
  author: string;
  created_at: string;
  updated_at: string;
  file_url?: string;
  processed: boolean;
  quality_score: number;
}

export interface SearchQuery {
  id: string;
  query: string;
  user_id?: string;
  created_at: string;
}

export interface Visualization {
  id: string;
  name: string;
  type: string;
  dataset_id: string;
  config: any;
  views: number;
  created_at: string;
  updated_at: string;
}