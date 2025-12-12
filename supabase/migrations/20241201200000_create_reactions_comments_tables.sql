/*
  # Create Reactions and Comments Tables

  1. New Tables
    - `reactions`
      - `id` (uuid, primary key)
      - `blog_slug` (text) - Blog post slug
      - `reaction_type` (text) - Emoji reaction
      - `fingerprint` (text) - Browser fingerprint
      - `created_at` (timestamptz)
    
    - `comments`
      - `id` (uuid, primary key) 
      - `blog_slug` (text) - Blog post slug
      - `content` (text) - Comment content
      - `fingerprint` (text) - Browser fingerprint
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read/write access
*/

CREATE TABLE IF NOT EXISTS reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_slug text NOT NULL,
  reaction_type text NOT NULL,
  fingerprint text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_slug text NOT NULL,
  content text NOT NULL,
  fingerprint text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reactions"
  ON reactions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert reactions"
  ON reactions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own reactions"
  ON reactions
  FOR DELETE
  USING (true);

CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own comments"
  ON comments
  FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete their own comments"
  ON comments
  FOR DELETE
  USING (true);