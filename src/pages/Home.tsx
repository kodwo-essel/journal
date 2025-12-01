import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Jimmy Essel - Journal';
    
    const existingMetas = document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
    existingMetas.forEach(meta => meta.remove());
    
    const metas = [
      { name: 'description', content: 'Personal thoughts and reflections by Jimmy Essel' },
      { property: 'og:title', content: 'Jimmy Essel' },
      { property: 'og:description', content: 'Personal thoughts and reflections by Jimmy Essel' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'Jimmy Essel' },
      { name: 'twitter:description', content: 'Personal thoughts and reflections by Jimmy Essel' }
    ];
    
    metas.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      document.head.appendChild(meta);
    });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-normal mb-2 text-black" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
        Welcome
      </h1>
      <h2 className="text-4xl font-normal mb-2 text-black" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
        blog.jimmyessel.com
      </h2>
      <p className="text-lg text-neutral-600 mb-8" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
        Jimmy Essel
      </p>
      <Link
        to="/blog"
        className="px-8 py-3 bg-black text-white text-lg whitespace-nowrap cursor-pointer hover:bg-neutral-800 transition-colors"
        style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
      >
        Read My Journal
      </Link>
    </div>
  );
}
