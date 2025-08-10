/*
  # Initial DataDock Schema

  1. New Tables
    - `datasets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `size` (text)
      - `file_type` (text)
      - `downloads` (integer)
      - `rating` (numeric)
      - `tags` (text array)
      - `author` (text)
      - `file_url` (text)
      - `processed` (boolean)
      - `quality_score` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `search_queries`
      - `id` (uuid, primary key)
      - `query` (text)
      - `user_id` (uuid, optional)
      - `created_at` (timestamp)
    
    - `visualizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `dataset_id` (uuid, foreign key)
      - `config` (jsonb)
      - `views` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (suitable for public data platform)
    - Add policies for authenticated users to create/update
*/

-- Create datasets table
CREATE TABLE IF NOT EXISTS datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  size text NOT NULL,
  file_type text NOT NULL,
  downloads integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  tags text[] DEFAULT '{}',
  author text NOT NULL,
  file_url text,
  processed boolean DEFAULT false,
  quality_score numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create search_queries table
CREATE TABLE IF NOT EXISTS search_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  user_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Create visualizations table
CREATE TABLE IF NOT EXISTS visualizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  dataset_id uuid REFERENCES datasets(id) ON DELETE CASCADE,
  config jsonb DEFAULT '{}',
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE visualizations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (suitable for public data)
CREATE POLICY "Public datasets are viewable by everyone"
  ON datasets
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert datasets"
  ON datasets
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update datasets"
  ON datasets
  FOR UPDATE
  USING (true);

CREATE POLICY "Public search queries are viewable by everyone"
  ON search_queries
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert search queries"
  ON search_queries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public visualizations are viewable by everyone"
  ON visualizations
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert visualizations"
  ON visualizations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update visualizations"
  ON visualizations
  FOR UPDATE
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_datasets_category ON datasets(category);
CREATE INDEX IF NOT EXISTS idx_datasets_created_at ON datasets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_datasets_downloads ON datasets(downloads DESC);
CREATE INDEX IF NOT EXISTS idx_datasets_rating ON datasets(rating DESC);
CREATE INDEX IF NOT EXISTS idx_search_queries_created_at ON search_queries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visualizations_dataset_id ON visualizations(dataset_id);

-- Insert sample data
INSERT INTO datasets (name, description, category, size, file_type, downloads, rating, tags, author, processed, quality_score) VALUES
('National Population Census 2024', 'Comprehensive demographic data covering population distribution, age groups, and socioeconomic indicators across all states and territories.', 'Demographics', '2.3 GB', 'CSV', 45200, 4.9, ARRAY['population', 'demographics', 'census', 'statistics'], 'Census Bureau India', true, 94),
('Education Infrastructure Database', 'Detailed information about schools, colleges, and educational facilities including enrollment data, infrastructure status, and performance metrics.', 'Education', '856 MB', 'JSON', 32100, 4.7, ARRAY['education', 'schools', 'infrastructure', 'enrollment'], 'Ministry of Education', true, 91),
('Healthcare Facility Mapping', 'Geographic distribution and capacity data of hospitals, clinics, and healthcare centers with specialization and equipment details.', 'Healthcare', '1.2 GB', 'XML', 28900, 4.8, ARRAY['healthcare', 'hospitals', 'medical', 'facilities'], 'Health Ministry', true, 96),
('Economic Growth Indicators 2020-2024', 'Quarterly economic data including GDP growth, inflation rates, employment statistics, and sector-wise performance analysis.', 'Economics', '445 MB', 'Excel', 19700, 4.6, ARRAY['economy', 'gdp', 'growth', 'indicators'], 'Economic Survey Division', true, 88),
('Environmental Monitoring Data', 'Air quality, water quality, and pollution monitoring data from sensors across major cities and industrial areas.', 'Environment', '1.8 GB', 'CSV', 23400, 4.5, ARRAY['environment', 'pollution', 'monitoring', 'air-quality'], 'Environment Ministry', true, 92);

-- Insert sample search queries
INSERT INTO search_queries (query) VALUES
('Population density by state'),
('Education budget allocation'),
('Healthcare infrastructure rural areas'),
('Agricultural production statistics'),
('Employment rate urban vs rural'),
('Air pollution levels major cities'),
('GDP growth trends'),
('School enrollment rates'),
('Hospital bed availability'),
('Economic indicators quarterly');

-- Insert sample visualizations
INSERT INTO visualizations (name, type, dataset_id, views) VALUES
('Population Distribution by State', 'Map', (SELECT id FROM datasets WHERE name = 'National Population Census 2024'), 12500),
('Education Budget Trends', 'Line Chart', (SELECT id FROM datasets WHERE name = 'Education Infrastructure Database'), 8300),
('Healthcare Facilities Overview', 'Dashboard', (SELECT id FROM datasets WHERE name = 'Healthcare Facility Mapping'), 15200),
('Economic Growth Analysis', 'Bar Chart', (SELECT id FROM datasets WHERE name = 'Economic Growth Indicators 2020-2024'), 6700);