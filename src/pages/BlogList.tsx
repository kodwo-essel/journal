import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost, getPaginatedBlogs } from '../lib/blogData';

const POSTS_PER_PAGE = 5;

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    document.title = 'Journal Entries - Jimmy Essel';
    
    const existingMetas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
    existingMetas.forEach(meta => meta.remove());
    
    const metas = [
      { name: 'description', content: 'Thoughts, reflections, and observations from Jimmy Essel' },
      { property: 'og:title', content: 'Journal Entries - Jimmy Essel' },
      { property: 'og:description', content: 'Thoughts, reflections, and observations from Jimmy Essel' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Journal Entries - Jimmy Essel' },
      { name: 'twitter:description', content: 'Thoughts, reflections, and observations from Jimmy Essel' }
    ];
    
    metas.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      document.head.appendChild(meta);
    });
  }, []);

  function fetchPosts() {
    setLoading(true);
    const paginationData = getPaginatedBlogs(currentPage, POSTS_PER_PAGE);
    setPosts(paginationData.posts);
    setTotalPages(paginationData.totalPages);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-600" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-normal mb-4 text-black tracking-tight"
            style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
          >
            Journal Entries
          </h1>
          <h2
            className="text-lg md:text-xl font-light text-neutral-600"
            style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
          >
            Thoughts, reflections, and observations
          </h2>
        </div>
      </header>

      <main className="w-full px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="block group cursor-pointer">
                <article className="p-8 border border-neutral-200 hover:border-black transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="text-2xl md:text-3xl font-normal text-black group-hover:text-neutral-600 transition-colors"
                      style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                    >
                      {post.title}
                    </h3>
                  </div>
                  <p
                    className="text-xl text-neutral-700 mb-4 leading-relaxed"
                    style={{ fontFamily: 'Caveat, cursive' }}
                  >
                    {post.excerpt}
                  </p>
                  <div
                    className="flex items-center gap-4 text-sm text-neutral-500"
                    style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                  >
                    <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</time>
                    <span>•</span>
                    <span>{post.read_time}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-neutral-200 transition-colors cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
              >
                <i className="ri-arrow-left-s-line"></i>
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer whitespace-nowrap ${
                    currentPage === i + 1
                      ? 'bg-black text-white border-black'
                      : 'border-neutral-200 hover:border-black text-black'
                  }`}
                  style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-neutral-200 transition-colors cursor-pointer whitespace-nowrap"
                style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
              >
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-12 px-6 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-neutral-500" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
            © 2025 Jimmy Essel. All thoughts reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
