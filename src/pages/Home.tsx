import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const STORY_PARAGRAPHS = [
  `"What is a blind man without his stick?" asked the wind.`,
  `The trees whispered among themselves, but none answered.`,
  `"And what is a stick," the wind continued, "when the man is no longer blind?"`,
  `At the edge of a dusty road walked a blind man and his stick. The man leaned heavily on the stick. Every stone, every ditch, every sharp turn in the path was first discovered by the stick before the man encountered it.`,
  `When the road was rough, the stick was there. When darkness filled the man's world, the stick became his eyes. Day after day they traveled together.`,
  `One evening, as the man slept beneath a tree, the stick spoke softly to the wind. "I hope he sees one day." The wind paused. "If he sees," it asked, "will he not leave you behind?" "Yes," said the stick. "Then why wish for it?"`,
  `The stick was quiet for a moment. "Because I do not love being needed. I want the best for him."`,
  `The wind had no answer.`,
  `Years passed. The blind man grew stronger, wiser, and more confident. Yet he still depended on the stick.`,
  `Then one morning, something miraculous happened. The darkness lifted. Shapes appeared. Colors emerged.`,
  `For the first time in many years, the man opened his eyes and saw the world. He saw the sky. He saw the trees. He saw the road. And then he looked down and saw the stick.`,
  `For a moment, resentment rose within him. The stick reminded him of every painful year. Every stumble. Every limitation. "What use do I have for this now?" he thought. He considered snapping it in half for firewood.`,
  `The stick felt the thought but said nothing. Love does not beg to be kept.`,
  `The man lifted the stick and prepared to break it. Then he paused.`,
  `Without the stick, he would never have reached this moment. Without the stick, he might have fallen into a ditch, wandered into danger, or given up on the journey altogether. The stick had guided him when he could not guide himself.`,
  `Slowly, he lowered his hands. "No," he said. "A tool that carried me through darkness deserves better than a fire."`,
  `The stick felt lighter than it ever had. Not because it was needed. But because it was remembered.`,
  `The man could no longer walk with the stick every day. His eyes now guided him where the stick once had. Yet he refused to forget.`,
  `Instead of burning the stick, he planted a grove of young trees. When people asked why, he smiled. "One day, another traveler may need a stick."`,
  `The years passed. The trees grew tall. Some became shade for weary travelers. Some became homes for birds. And some would one day become walking sticks for those who could not see.`,
  `The old stick rested beneath the grove, watching generations grow. It never regretted helping the man see. Not for a single day.`,
  `Because real love does not measure its worth by how indispensable it is. Real love rejoices when the one it serves no longer needs it. And gratitude does not discard the hands, or sticks, that helped it rise.`,
  `So what is a blind man without his stick? A traveler who once needed help.`,
  `And what is a stick when the man is no longer blind? Proof that love can let go without becoming bitter.`,
];

export default function Home() {
  useEffect(() => {
    document.title = 'Jimmy Essel — Journal';

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
      { name: 'twitter:description', content: 'Personal thoughts and reflections by Jimmy Essel' },
    ];

    metas.forEach(({ name, property, content }: any) => {
      const meta = document.createElement('meta');
      if (name) meta.name = name;
      if (property) meta.setAttribute('property', property);
      meta.content = content;
      document.head.appendChild(meta);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="w-full pt-20 pb-10 px-6 text-center border-b border-neutral-100">
        <p
          className="text-sm tracking-widest uppercase text-neutral-400 mb-3"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          A story by
        </p>
        <h1
          className="text-3xl font-normal text-black mb-1"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          Jimmy Essel
        </h1>
      </header>

      {/* Story */}
      <main className="w-full px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Story title */}
          <h2
            className="text-4xl md:text-5xl font-normal text-black mb-3 leading-snug"
            style={{ fontFamily: 'Lora, Georgia, serif' }}
          >
            The Blind Man and the Stick
          </h2>
          <div className="w-12 h-px bg-neutral-300 mb-12" />

          {/* Paragraphs */}
          <div className="space-y-6">
            {STORY_PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-neutral-800 text-justify"
                style={{ fontFamily: 'Lora, Georgia, serif' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Divider + CTA */}
          <div className="mt-20 pt-10 border-t border-neutral-100 text-center">
            <p
              className="text-neutral-500 mb-6 text-base"
              style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
            >
              More thoughts and reflections in the journal.
            </p>
            <Link
              to="/blog"
              className="inline-block px-8 py-3 bg-black text-white text-sm tracking-wide hover:bg-neutral-800 transition-colors"
              style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
            >
              Read My Journal
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-6 border-t border-neutral-100 text-center">
        <p
          className="text-xs text-neutral-400"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          © {new Date().getFullYear()} Jimmy Essel. All thoughts reserved.
        </p>
      </footer>
    </div>
  );
}
