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

const allBlogs: BlogPost[] = blogsData as BlogPost[];

export const getAllBlogs = async (): Promise<BlogPost[]> => {
  return [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  return allBlogs.find((p) => p.slug === slug) ?? null;
};

export const getPaginatedBlogs = async (page: number, postsPerPage: number) => {
  const sorted = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const totalPosts = sorted.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const posts = sorted.slice(startIndex, startIndex + postsPerPage);

  return {
    posts,
    totalPosts,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

export const searchBlogs = async (query: string): Promise<BlogPost[]> => {
  const q = query.toLowerCase();
  return allBlogs.filter(
    (p) =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
  );
};