import { useState, useEffect } from 'react';
import { addComment, getComments, updateComment, deleteComment, canEditComment } from '../lib/database';

interface CommentsProps {
  blogSlug: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
}

export default function Comments({ blogSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [blogSlug]);

  const loadComments = async () => {
    try {
      const data = await getComments(blogSlug);
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(blogSlug, newComment.trim());
      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEdit = (comment: any) => {
    setEditingId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (commentId: string) => {
    if (!editContent.trim()) return;
    
    try {
      const success = await updateComment(commentId, editContent.trim());
      if (success) {
        setEditingId(null);
        setEditContent('');
        loadComments();
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const success = await deleteComment(commentId);
      if (success) {
        loadComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave an anonymous comment..."
          className="w-full p-4 border border-neutral-200 focus:border-black focus:outline-none transition-colors resize-none"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
          rows={3}
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-6 py-2 bg-black text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
          style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="pb-4 border-b border-neutral-100 last:border-b-0">
            {editingId === comment.id ? (
              <div className="space-y-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 text-lg border border-neutral-200 focus:border-black focus:outline-none transition-colors resize-none"
                  style={{ fontFamily: 'Caveat, cursive' }}
                  rows={2}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(comment.id)}
                    className="px-2 py-1 text-xs bg-black text-white hover:bg-neutral-800 transition-colors"
                    style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-2 py-1 text-xs border border-neutral-200 hover:border-black transition-colors"
                    style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-neutral-700 mb-2 text-lg" style={{ fontFamily: 'Caveat, cursive' }}>
                  {comment.content}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-neutral-400" style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </p>
                  {canEditComment(comment) && (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(comment)}
                        className="text-[10px] text-black hover:text-neutral-600 transition-colors"
                        style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-[10px] text-red-600 hover:text-red-800 transition-colors"
                        style={{ fontFamily: "'Bai Jamjuree', sans-serif" }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}