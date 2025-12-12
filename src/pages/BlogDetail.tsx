import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogPost, getBlogBySlug } from '../lib/blogData';
import Reactions from '../components/Reactions';
import Comments from '../components/Comments';
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
      const url = window.location.href;
      
      // Update page title
      document.title = `${post.title} - Jimmy Essel`;
      
      // Remove existing meta tags
      const existingMetas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
      existingMetas.forEach(meta => meta.remove());
      
      // Add new meta tags
      const metas = [
        { name: 'description', content: post.excerpt },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.excerpt }
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
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log('Failed to copy');
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 lg:max-w-2xl">
              <div className="pt-8">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-black hover:text-neutral-600 transition-colors cursor-pointer"
                  style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                >
                  <i className="ri-arrow-left-line"></i>
                  <span>Back to all journals</span>
                </Link>
              </div>
              
              <header className="py-16">
                <div
                  className="mb-4 flex items-center gap-4 text-sm text-neutral-500"
                  style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                >
                  <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</time>
                  <span>•</span>
                  <span>{post.read_time}</span>
                </div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h1
                    className="text-5xl md:text-6xl font-normal text-black tracking-tight"
                    style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                  >
                    {post.title}
                  </h1>
                  <div className="flex gap-2">
                    <div className="mt-2">
                      <NightModeToggle />
                    </div>
                    <div className="relative">
                      <button
                        onClick={handleShare}
                        className="mt-2 w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors cursor-pointer"
                      >
                        <i className={copied ? "ri-check-line" : "ri-share-line"}></i>
                      </button>
                      {copied && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 text-sm rounded whitespace-nowrap" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
                          Copied!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </header>
              <article className="space-y-8 text-black" style={{ fontFamily: 'Caveat, cursive' }}>
                {post.content?.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-3xl leading-relaxed">
                    {paragraph}
                  </p>
                )) || null}
              </article>
              
              <div className="mt-16 pt-8 border-t border-neutral-200">
                <h3 className="text-xl font-normal mb-4 text-black" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
                  Reactions
                </h3>
                <Reactions blogSlug={post.slug} />
              </div>
            </div>
            
            <div className="w-full lg:w-80 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-8 lg:pt-16 pt-8 border-t border-neutral-200 lg:border-t-0">
                <h3 className="text-xl font-normal mb-6 text-black" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
                  Comments
                </h3>
                <Comments blogSlug={post.slug} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-6 border-t border-neutral-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-neutral-500" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
            © 2025 Jimmy Essel. All thoughts reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
