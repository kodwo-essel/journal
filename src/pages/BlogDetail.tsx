import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogPost, getBlogBySlug } from '../lib/blogData';
import NightModeToggle from '../components/NightModeToggle';
import Loader from '../components/Loader';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    if (!slug) return;
    setLoading(true);
    try {
      const foundPost = await getBlogBySlug(slug);
      setPost(foundPost);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - Jimmy Essel`;

      const existingMetas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
      existingMetas.forEach(meta => meta.remove());

      const metas: any[] = [
        { name: 'description', content: post.excerpt },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.excerpt },
      ];

      metas.forEach(({ name, property, content }) => {
        const meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      });
    }
  }, [post]);

  const handleShare = async () => {
    if (!post) return;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  if (loading) return <Loader />;

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-neutral-600" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
          Post not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full px-6 pb-32">
        <div className="max-w-2xl mx-auto">

          {/* Back link */}
          <div className="pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-black hover:text-neutral-600 transition-colors cursor-pointer"
              style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
            >
              <i className="ri-arrow-left-line" />
              <span>Back to all journals</span>
            </Link>
          </div>

          {/* Header */}
          <header className="py-16">
            <div
              className="mb-4 flex items-center gap-4 text-sm text-neutral-500"
              style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
            >
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.read_time}</span>
            </div>

            <div className="flex items-start justify-between gap-4 mb-2">
              <h1
                className="text-5xl md:text-6xl font-normal text-black tracking-tight leading-tight"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {post.title}
              </h1>
              <div className="flex gap-2 shrink-0 mt-1">
                <NightModeToggle />
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors cursor-pointer"
                  >
                    <i className={copied ? 'ri-check-line' : 'ri-share-line'} />
                  </button>
                  {copied && (
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 text-xs rounded whitespace-nowrap"
                      style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                    >
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Body */}
          <article className="space-y-6 text-black">
            {post.content?.split('\n\n').map((paragraph, index) => (
              <p
                key={index}
                className="text-lg md:text-xl leading-relaxed text-neutral-800 text-justify"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {paragraph.split('\n').map((line, li) => (
                  <span key={li}>
                    {line}
                    {li < paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </article>

        </div>
      </main>

      <footer className="w-full py-12 px-6 border-t border-neutral-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-neutral-400" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
            © {new Date().getFullYear()} Jimmy Essel. All thoughts reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
