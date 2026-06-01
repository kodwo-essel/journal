import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise: Promise<any> | null = null;

const getBrowserFingerprint = async (): Promise<string> => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }
  const fp = await fpPromise;
  const result = await fp.get();
  return result.visitorId;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function reactionsKey(blogSlug: string) {
  return `reactions:${blogSlug}`;
}

function commentsKey(blogSlug: string) {
  return `comments:${blogSlug}`;
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── Reactions ─────────────────────────────────────────────────────────────────
// Stored as: { [reactionType]: string[] }  (array of fingerprints)

export const addReaction = async (blogSlug: string, reactionType: string) => {
  const fingerprint = await getBrowserFingerprint();
  const key = reactionsKey(blogSlug);
  const data = readJSON<Record<string, string[]>>(key, {});

  const existing = data[reactionType] ?? [];
  if (existing.includes(fingerprint)) {
    data[reactionType] = existing.filter((f) => f !== fingerprint);
  } else {
    data[reactionType] = [...existing, fingerprint];
  }
  writeJSON(key, data);
};

export const getReactions = async (blogSlug: string) => {
  const fingerprint = await getBrowserFingerprint();
  const key = reactionsKey(blogSlug);
  const data = readJSON<Record<string, string[]>>(key, {});

  const counts: Record<string, number> = {};
  const userReactions: Record<string, boolean> = {};

  for (const [reaction, fingerprints] of Object.entries(data)) {
    counts[reaction] = fingerprints.length;
    userReactions[reaction] = fingerprints.includes(fingerprint);
  }

  return { counts, userReactions };
};

// ─── Comments ─────────────────────────────────────────────────────────────────
// Stored as array of { id, blog_slug, content, fingerprint, created_at }

interface StoredComment {
  id: string;
  blog_slug: string;
  content: string;
  fingerprint: string;
  created_at: string;
}

export const addComment = async (blogSlug: string, content: string) => {
  const fingerprint = await getBrowserFingerprint();
  const key = commentsKey(blogSlug);
  const comments = readJSON<StoredComment[]>(key, []);

  const newComment: StoredComment = {
    id: crypto.randomUUID(),
    blog_slug: blogSlug,
    content,
    fingerprint,
    created_at: new Date().toISOString(),
  };

  writeJSON(key, [newComment, ...comments]);
};

export const updateComment = async (commentId: string, newContent: string, blogSlug: string) => {
  const fingerprint = await getBrowserFingerprint();
  const key = commentsKey(blogSlug);
  const comments = readJSON<StoredComment[]>(key, []);

  const updated = comments.map((c) =>
    c.id === commentId && c.fingerprint === fingerprint
      ? { ...c, content: newContent }
      : c
  );

  const changed = updated.some(
    (c, i) => c.content !== comments[i]?.content
  );
  if (changed) writeJSON(key, updated);
  return changed;
};

export const deleteComment = async (commentId: string, blogSlug: string) => {
  const fingerprint = await getBrowserFingerprint();
  const key = commentsKey(blogSlug);
  const comments = readJSON<StoredComment[]>(key, []);

  const filtered = comments.filter(
    (c) => !(c.id === commentId && c.fingerprint === fingerprint)
  );
  writeJSON(key, filtered);
  return filtered.length !== comments.length;
};

export const getComments = async (blogSlug: string) => {
  const key = commentsKey(blogSlug);
  return readJSON<StoredComment[]>(key, []);
};

export const canEditComment = async (comment: StoredComment): Promise<boolean> => {
  const fingerprint = await getBrowserFingerprint();
  return comment.fingerprint === fingerprint;
};