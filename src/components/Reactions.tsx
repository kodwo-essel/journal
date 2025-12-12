import { useState, useEffect } from 'react';
import { addReaction, getReactions } from '../lib/database';

interface ReactionsProps {
  blogSlug: string;
}

const reactionEmojis = ['👍', '❤️', '😊', '🤔', '👏'];

export default function Reactions({ blogSlug }: ReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, number>>({});
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadReactions();
  }, [blogSlug]);

  const loadReactions = async () => {
    try {
      const data = await getReactions(blogSlug);
      setReactions(data.counts || {});
      setUserReactions(data.userReactions || {});
    } catch (error) {
      console.error('Error loading reactions:', error);
    }
  };

  const handleReaction = async (emoji: string) => {
    try {
      await addReaction(blogSlug, emoji);
      loadReactions();
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {reactionEmojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReaction(emoji)}
          className={`flex items-center gap-1 px-3 py-2 border transition-colors cursor-pointer ${
            userReactions[emoji] 
              ? 'border-black bg-neutral-100' 
              : 'border-neutral-200 hover:border-black'
          }`}
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          <span className="text-lg">{emoji}</span>
          {reactions[emoji] && (
            <span className="text-sm text-neutral-600">{reactions[emoji]}</span>
          )}
        </button>
      ))}
    </div>
  );
}