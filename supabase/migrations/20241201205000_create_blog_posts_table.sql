/*
  # Create Blog Posts Table

  1. New Table
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text) 
      - `content` (text)
      - `date` (date)
      - `read_time` (text)
      - `slug` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  read_time text NOT NULL DEFAULT '3 min read',
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  USING (true);