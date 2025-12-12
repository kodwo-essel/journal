import { supabase } from './supabase';
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

export const addReaction = async (blogSlug: string, reactionType: string) => {
  const fingerprint = await getBrowserFingerprint();
  
  // Check if user already reacted with this emoji
  const { data: existing } = await supabase
    .from('reactions')
    .select('id')
    .eq('blog_slug', blogSlug)
    .eq('reaction_type', reactionType)
    .eq('fingerprint', fingerprint)
    .single();
  
  if (existing) {
    // Remove reaction (unreact)
    await supabase
      .from('reactions')
      .delete()
      .eq('id', existing.id);
  } else {
    // Add new reaction
    await supabase
      .from('reactions')
      .insert({
        blog_slug: blogSlug,
        reaction_type: reactionType,
        fingerprint
      });
  }
};

export const getReactions = async (blogSlug: string) => {
  const fingerprint = await getBrowserFingerprint();
  
  const { data: reactions } = await supabase
    .from('reactions')
    .select('reaction_type, fingerprint')
    .eq('blog_slug', blogSlug);
  
  const reactionsMap: Record<string, number> = {};
  const userReactions: Record<string, boolean> = {};
  
  reactions?.forEach(reaction => {
    reactionsMap[reaction.reaction_type] = (reactionsMap[reaction.reaction_type] || 0) + 1;
    if (reaction.fingerprint === fingerprint) {
      userReactions[reaction.reaction_type] = true;
    }
  });
  
  return { counts: reactionsMap, userReactions };
};

export const addComment = async (blogSlug: string, content: string) => {
  const fingerprint = await getBrowserFingerprint();
  await supabase
    .from('comments')
    .insert({
      blog_slug: blogSlug,
      content,
      fingerprint
    });
};

export const updateComment = async (commentId: string, newContent: string) => {
  const fingerprint = await getBrowserFingerprint();
  
  const { error } = await supabase
    .from('comments')
    .update({ content: newContent })
    .eq('id', commentId)
    .eq('fingerprint', fingerprint);
  
  return !error;
};

export const deleteComment = async (commentId: string) => {
  const fingerprint = await getBrowserFingerprint();
  
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)
    .eq('fingerprint', fingerprint);
  
  return !error;
};

export const getComments = async (blogSlug: string) => {
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('blog_slug', blogSlug)
    .order('created_at', { ascending: false });
  
  return comments || [];
};

export const canEditComment = async (comment: any): Promise<boolean> => {
  const fingerprint = await getBrowserFingerprint();
  return comment.fingerprint === fingerprint;
};