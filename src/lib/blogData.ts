import blogsData from '../data/blogs.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
}

export const getAllBlogs = (): BlogPost[] => {
  return blogsData;
};

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogsData.find(blog => blog.slug === slug);
};

export const getPaginatedBlogs = (page: number, postsPerPage: number) => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = blogsData.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    totalPosts: blogsData.length,
    totalPages: Math.ceil(blogsData.length / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < blogsData.length,
    hasPrevPage: page > 1
  };
};