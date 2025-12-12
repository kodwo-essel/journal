import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
}

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });
  
  return data || [];
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  return data;
};

export const getPaginatedBlogs = async (page: number, postsPerPage: number) => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage - 1;
  
  const { count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });
  
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false })
    .range(startIndex, endIndex);
  
  return {
    posts: data || [],
    totalPosts: count || 0,
    totalPages: Math.ceil((count || 0) / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < (count || 0) - 1,
    hasPrevPage: page > 1
  };
};

export const searchBlogs = async (query: string): Promise<BlogPost[]> => {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order('date', { ascending: false });
  
  return data || [];
};