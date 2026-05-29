"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Flag, ThumbsUp, ChevronDown, ChevronUp, Shield, Loader2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  avatar: string | null;
}

interface CommentData {
  id: string;
  content: string;
  createdAt: string;
  approved: boolean;
  parentId: string | null;
  users: User;
}

interface DisplayComment extends CommentData {
  author: string;
  avatar: string;
  likes: number;
  verified: boolean;
  replies: DisplayComment[];
}

function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "À l'instant";
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days}j`;
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

function CommentItem({
  comment,
  depth = 0,
}: {
  comment: DisplayComment;
  depth?: number;
}) {
  const [showReplies, setShowReplies] = useState(depth === 0);
  const [liked, setLiked] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  return (
    <div className={depth > 0 ? "ml-8 mt-4 pl-4 border-l-2 border-[#DEDBD4] dark:border-[#2a2a3e]" : ""}>
      <div className="flex gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#DEDBD4] dark:bg-[#2a2a3e]">
          {comment.avatar ? (
            <Image src={comment.avatar} alt={comment.author} fill className="object-cover" sizes="36px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#7A7A7A]">
              {comment.author.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm text-[#0D1B2A] dark:text-white">
              {comment.author}
            </span>
            {comment.verified && (
              <span className="flex items-center gap-0.5 text-[0.65rem] font-semibold text-[#C01D35] bg-[#C01D35]/10 px-1.5 py-0.5 rounded">
                <Shield className="w-3 h-3" />
                Vérifié
              </span>
            )}
            <span className="text-xs text-[#7A7A7A]">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-sm text-[#4A4A4A] dark:text-[#a0a0b0] leading-relaxed mb-2">
            {comment.content}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1 text-xs transition-colors ${
                liked ? "text-[#C01D35]" : "text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white"
              }`}
              aria-label={liked ? "Retirer le j'aime" : "J'aime"}
            >
              <ThumbsUp className="w-3 h-3" />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="text-xs text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white transition-colors"
            >
              Répondre
            </button>
            <button
              className="text-xs text-[#7A7A7A] hover:text-[#C01D35] transition-colors"
              aria-label="Signaler ce commentaire"
            >
              <Flag className="w-3 h-3" />
            </button>
          </div>

          {replyOpen && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Votre réponse..."
                className="flex-1 text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-transparent text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
                aria-label="Écrire une réponse"
              />
              <button
                onClick={() => { setReplyText(""); setReplyOpen(false); }}
                className="bg-[#C01D35] text-white text-xs font-bold px-3 py-2 rounded hover:bg-[#A01728] transition-colors"
              >
                Envoyer
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-2">
          {depth === 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-xs font-semibold text-[#C01D35] ml-12 mb-2"
            >
              {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {comment.replies.length} réponse{comment.replies.length > 1 ? "s" : ""}
            </button>
          )}
          {showReplies && comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSection({ articleId, articleSlug }: { articleId?: string; articleSlug: string }) {
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [comments, setComments] = useState<DisplayComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!articleId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/comments?articleId=${articleId}`);
        if (!res.ok) throw new Error("Failed to load comments");
        const data = await res.json();
        const displayComments: DisplayComment[] = (data.comments || []).map((c: CommentData) => ({
          ...c,
          author: c.users.name,
          avatar: c.users.avatar || "",
          likes: 0,
          verified: false,
          replies: [],
        }));
        setComments(displayComments);
      } catch (err) {
        console.error("Error loading comments:", err);
        setError(err instanceof Error ? err.message : "Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [articleId]);

  const sorted = [...comments].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || !articleId) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, content: newComment }),
      });
      if (res.ok) {
        setNewComment("");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!articleId) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-[#DEDBD4] dark:border-[#2a2a3e]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl font-bold text-[#0D1B2A] dark:text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#C01D35]" />
          Commentaires ({loading ? "..." : comments.length})
        </h3>
        <div className="flex gap-1 text-xs">
          <button
            onClick={() => setSortBy("recent")}
            className={`px-2.5 py-1 rounded ${sortBy === "recent" ? "bg-[#C01D35] text-white" : "text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white"}`}
          >
            Récents
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`px-2.5 py-1 rounded ${sortBy === "popular" ? "bg-[#C01D35] text-white" : "text-[#7A7A7A] hover:text-[#0D1B2A] dark:hover:text-white"}`}
          >
            Populaires
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 p-4 rounded-lg border border-[#DEDBD4] dark:border-[#2a2a3e] bg-[#F2F1EE] dark:bg-[#12121e]">
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            required
            className="flex-1 text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors"
            aria-label="Votre nom"
          />
        </div>
        <div className="flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Partagez votre opinion..."
            required
            rows={3}
            className="flex-1 text-sm px-3 py-2 border border-[#DEDBD4] dark:border-[#3a3a4e] rounded bg-white dark:bg-[#1a1a2e] text-[#1A1A1A] dark:text-white outline-none focus:border-[#C01D35] transition-colors resize-none"
            aria-label="Votre commentaire"
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-[#7A7A7A]">
            Les commentaires sont modérés avant publication.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[#C01D35] text-white text-sm font-bold px-4 py-2 rounded hover:bg-[#A01728] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publier"}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-[#C01D35]" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-sm text-red-600">
          {error}
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-sm text-[#7A7A7A]">
          Aucun commentaire pour le moment. Soyez le premier !
        </div>
      ) : (
        <div className="space-y-6">
          {sorted.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
