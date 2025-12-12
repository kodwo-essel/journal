interface Reaction {
  id: string;
  blogSlug: string;
  reactionType: string;
  createdAt: string;
  fingerprint: string;
}

interface Comment {
  id: string;
  blogSlug: string;
  content: string;
  createdAt: string;
  fingerprint: string;
}

const getStoredReactions = (): Reaction[] => {
  const stored = localStorage.getItem('blogReactions');
  return stored ? JSON.parse(stored) : [];
};

const getStoredComments = (): Comment[] => {
  const stored = localStorage.getItem('blogComments');
  return stored ? JSON.parse(stored) : [];
};

const getBrowserFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx?.fillText('fingerprint', 10, 10);
  const canvasData = canvas.toDataURL();
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    navigator.hardwareConcurrency || 0,
    new Date().getTimezoneOffset(),
    navigator.cookieEnabled,
    navigator.doNotTrack || 'unknown',
    canvasData.slice(-50)
  ].join('|');
  
  return btoa(fingerprint).slice(0, 20);
};

export const addReaction = async (blogSlug: string, reactionType: string) => {
  const reactions = getStoredReactions();
  const fingerprint = getBrowserFingerprint();
  
  // Check if user already reacted with this emoji
  const existingReaction = reactions.find(r => 
    r.blogSlug === blogSlug && 
    r.reactionType === reactionType && 
    r.fingerprint === fingerprint
  );
  
  if (existingReaction) {
    // Remove reaction (unreact)
    const filteredReactions = reactions.filter(r => r.id !== existingReaction.id);
    localStorage.setItem('blogReactions', JSON.stringify(filteredReactions));
  } else {
    // Add new reaction
    const newReaction: Reaction = {
      id: Date.now().toString(),
      blogSlug,
      reactionType,
      createdAt: new Date().toISOString(),
      fingerprint
    };
    reactions.push(newReaction);
    localStorage.setItem('blogReactions', JSON.stringify(reactions));
  }
};

export const getReactions = async (blogSlug: string) => {
  const reactions = getStoredReactions();
  const blogReactions = reactions.filter(r => r.blogSlug === blogSlug);
  const reactionsMap: Record<string, number> = {};
  const userReactions: Record<string, boolean> = {};
  const fingerprint = getBrowserFingerprint();
  
  blogReactions.forEach(reaction => {
    reactionsMap[reaction.reactionType] = (reactionsMap[reaction.reactionType] || 0) + 1;
    if (reaction.fingerprint === fingerprint) {
      userReactions[reaction.reactionType] = true;
    }
  });
  
  return { counts: reactionsMap, userReactions };
};

export const addComment = async (blogSlug: string, content: string) => {
  const comments = getStoredComments();
  const newComment: Comment = {
    id: Date.now().toString(),
    blogSlug,
    content,
    createdAt: new Date().toISOString(),
    fingerprint: getBrowserFingerprint()
  };
  comments.push(newComment);
  localStorage.setItem('blogComments', JSON.stringify(comments));
};

export const updateComment = async (commentId: string, newContent: string) => {
  const comments = getStoredComments();
  const fingerprint = getBrowserFingerprint();
  const commentIndex = comments.findIndex(c => c.id === commentId && c.fingerprint === fingerprint);
  
  if (commentIndex !== -1) {
    comments[commentIndex].content = newContent;
    localStorage.setItem('blogComments', JSON.stringify(comments));
    return true;
  }
  return false;
};

export const deleteComment = async (commentId: string) => {
  const comments = getStoredComments();
  const fingerprint = getBrowserFingerprint();
  const filteredComments = comments.filter(c => !(c.id === commentId && c.fingerprint === fingerprint));
  
  if (filteredComments.length < comments.length) {
    localStorage.setItem('blogComments', JSON.stringify(filteredComments));
    return true;
  }
  return false;
};

export const canEditComment = (comment: Comment): boolean => {
  return comment.fingerprint === getBrowserFingerprint();
};

export const getComments = async (blogSlug: string) => {
  const comments = getStoredComments();
  return comments
    .filter(c => c.blogSlug === blogSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};