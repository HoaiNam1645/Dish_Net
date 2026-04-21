'use client';
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { useAuth } from '@/shared/AuthContext';
import { userContentApi } from '@/shared/userContentApi';

type CommentTab = 'all' | 'positive' | 'latest';

type CommentRow = {
  id: number;
  parentId: number | null;
  content: string;
  likes: number;
  createdAt: string;
  authorName: string;
  authorAvatar: string | null;
};

const commentTabs: Array<{ id: CommentTab; label: string }> = [
  { id: 'all', label: 'Tất cả' },
  { id: 'positive', label: 'Nổi bật' },
  { id: 'latest', label: 'Mới nhất' },
];

function formatDateTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CommentModal({
  isOpen,
  onClose,
  storeName = 'Bình luận',
  startComposerOpen = false,
  postId,
}: {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  startComposerOpen?: boolean;
  postId?: number | null;
}) {
  const { dangNhap } = useAuth();
  const [activeTab, setActiveTab] = useState<CommentTab>('all');
  const [isComposerOpen, setIsComposerOpen] = useState(startComposerOpen);
  const [draftComment, setDraftComment] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = useCallback(async () => {
    if (!postId) {
      setComments([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const payload: any = await userContentApi.layBinhLuanBaiViet(postId, {
        trang: 1,
        so_luong: 100,
      });
      const rows = Array.isArray(payload?.du_lieu) ? payload.du_lieu : [];
      setComments(
        rows.map((item: any) => ({
          id: Number(item.id),
          parentId:
            item?.id_binh_luan_cha != null ? Number(item.id_binh_luan_cha) : null,
          content: String(item?.noi_dung ?? ''),
          likes: Number(item?.tong_luot_thich ?? 0),
          createdAt: String(item?.ngay_tao ?? ''),
          authorName: String(item?.nguoi_binh_luan?.ten_hien_thi ?? 'Người dùng'),
          authorAvatar: item?.nguoi_binh_luan?.anh_dai_dien ?? null,
        })),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không tải được bình luận');
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!isOpen) return;
    void loadComments();
  }, [isOpen, loadComments]);

  useEffect(() => {
    if (!isOpen) return;
    setIsComposerOpen(startComposerOpen);
  }, [isOpen, startComposerOpen]);

  const handleClose = useCallback(() => {
    setDraftComment('');
    setReplyDrafts({});
    setReplyingTo(null);
    setError(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const grouped = useMemo(() => {
    const rootComments = comments.filter((item) => item.parentId == null);
    const childMap = new Map<number, CommentRow[]>();
    comments
      .filter((item) => item.parentId != null)
      .forEach((item) => {
        const key = Number(item.parentId);
        const current = childMap.get(key) ?? [];
        current.push(item);
        childMap.set(key, current);
      });

    if (activeTab === 'latest') {
      rootComments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (activeTab === 'positive') {
      rootComments.sort((a, b) => b.likes - a.likes);
    }

    return { rootComments, childMap };
  }, [activeTab, comments]);

  const handleSubmit = async (parentId?: number) => {
    const content = (parentId ? replyDrafts[parentId] : draftComment).trim();
    if (!content || !postId) return;

    if (!dangNhap) {
      setError('Vui lòng đăng nhập để gửi bình luận');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await userContentApi.taoBinhLuan(postId, {
        noi_dung: content,
        id_binh_luan_cha: parentId,
      });
      if (parentId) {
        setReplyDrafts((current) => ({ ...current, [parentId]: '' }));
        setReplyingTo(null);
      } else {
        setDraftComment('');
      }
      await loadComments();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không gửi được bình luận');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/58 px-4 py-6"
      onClick={handleClose}
    >
      <div
        className="relative flex h-[min(86vh,860px)] w-full max-w-[1180px] flex-col overflow-hidden rounded-[20px] bg-[#fbfbfa] shadow-[0_28px_90px_rgba(0,0,0,0.28)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-[30px] leading-none text-[#1f1f1f] transition hover:bg-black/5"
          aria-label="Đóng bình luận"
        >
          ×
        </button>

        <div className="border-b border-[#e8e8e2] bg-white px-8 pb-5 pt-6 pr-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9aa091]">
            Cộng đồng DishNet
          </p>
          <h3 className="mt-2 text-[28px] font-semibold text-[#2e2e2c]">
            Bình luận về {storeName}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {commentTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-[#2f8f22] text-white'
                    : 'bg-[#eff4ee] text-[#4e5a4d] hover:bg-[#e4efe2]'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsComposerOpen((current) => !current)}
              className="ml-auto rounded-[10px] bg-[#1f86ff] px-5 py-2 text-[14px] font-semibold text-white transition hover:bg-[#1274ea]"
            >
              {isComposerOpen ? 'Ẩn viết bình luận' : 'Viết bình luận'}
            </button>
          </div>
        </div>

        {isComposerOpen ? (
          <div className="border-b border-[#e8e8e2] bg-white px-8 py-4">
            {!dangNhap ? (
              <p className="text-sm text-[#6f7786]">
                Bạn cần đăng nhập để bình luận.{' '}
                <Link href="/login" className="font-semibold text-[#2f8f22] underline">
                  Đi đến đăng nhập
                </Link>
              </p>
            ) : (
              <>
                <textarea
                  value={draftComment}
                  onChange={(event) => setDraftComment(event.target.value)}
                  rows={3}
                  placeholder="Chia sẻ trải nghiệm của bạn..."
                  className="w-full resize-none rounded-[12px] border border-[#e1e5dc] bg-white px-4 py-3 text-[14px] leading-6 text-[#40443d] outline-none focus:border-[#2f8f22]"
                />
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    disabled={isSubmitting || !draftComment.trim() || !postId}
                    onClick={() => void handleSubmit()}
                    className="rounded-full bg-[#2f8f22] px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8f8f5] px-8 py-6">
          {!postId ? (
            <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
              Chưa có bài viết nguồn để tải bình luận.
            </div>
          ) : isLoading ? (
            <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
              Đang tải bình luận...
            </div>
          ) : grouped.rootComments.length === 0 ? (
            <div className="rounded-[14px] border border-[#e5e7eb] bg-white px-5 py-4 text-[14px] text-[#6b7280]">
              Chưa có bình luận nào cho bài viết này.
            </div>
          ) : (
            <div className="space-y-4">
              {grouped.rootComments.map((item) => {
                const replies = grouped.childMap.get(item.id) ?? [];
                return (
                  <article key={item.id} className="rounded-[14px] bg-white p-4 shadow-[0_8px_16px_rgba(0,0,0,0.06)]">
                    <div className="flex items-start gap-3">
                      <img
                        src={item.authorAvatar || 'https://i.pravatar.cc/120'}
                        alt={item.authorName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[15px] font-semibold text-[#202020]">{item.authorName}</p>
                          <span className="text-[12px] text-[#8a8f89]">{formatDateTime(item.createdAt)}</span>
                        </div>
                        <p className="mt-2 text-[14px] leading-6 text-[#40443d]">{item.content}</p>
                        <div className="mt-3 flex items-center gap-4 text-[12px] text-[#7a8576]">
                          <span>Thích {item.likes}</span>
                          <button
                            type="button"
                            onClick={() => setReplyingTo((current) => (current === item.id ? null : item.id))}
                            className="font-semibold text-[#2f8f22]"
                          >
                            Phản hồi
                          </button>
                        </div>

                        {replyingTo === item.id ? (
                          <div className="mt-3 rounded-[10px] border border-[#e1e5dc] p-3">
                            {!dangNhap ? (
                              <p className="text-sm text-[#6f7786]">
                                Bạn cần đăng nhập để phản hồi.{' '}
                                <Link href="/login" className="font-semibold text-[#2f8f22] underline">
                                  Đi đến đăng nhập
                                </Link>
                              </p>
                            ) : (
                              <>
                                <textarea
                                  value={replyDrafts[item.id] ?? ''}
                                  onChange={(event) =>
                                    setReplyDrafts((current) => ({
                                      ...current,
                                      [item.id]: event.target.value,
                                    }))
                                  }
                                  rows={2}
                                  placeholder={`Phản hồi ${item.authorName}...`}
                                  className="w-full resize-none rounded-[10px] border border-[#e1e5dc] px-3 py-2 text-[13px] outline-none focus:border-[#2f8f22]"
                                />
                                <div className="mt-2 flex justify-end">
                                  <button
                                    type="button"
                                    disabled={isSubmitting || !(replyDrafts[item.id] ?? '').trim()}
                                    onClick={() => void handleSubmit(item.id)}
                                    className="rounded-full bg-[#2f8f22] px-4 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                  >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi phản hồi'}
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ) : null}

                        {replies.length > 0 ? (
                          <div className="mt-3 space-y-2 border-l-2 border-[#ecf2ea] pl-3">
                            {replies.map((reply) => (
                              <div key={reply.id} className="rounded-[8px] bg-[#f8fbf8] px-3 py-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="text-[13px] font-semibold text-[#202020]">
                                    {reply.authorName}
                                  </span>
                                  <span className="text-[11px] text-[#8a8f89]">
                                    {formatDateTime(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="mt-1 text-[13px] text-[#40443d]">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {error ? (
          <div className="border-t border-[#e8e8e2] bg-[#fff5f5] px-8 py-3 text-sm text-[#b91c1c]">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
