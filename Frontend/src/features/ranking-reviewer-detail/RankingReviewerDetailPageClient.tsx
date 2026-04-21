'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { userContentApi } from '@/shared/userContentApi';

import type { RankingReviewerDetailData } from './data';

type ProfileTab = 'posts' | 'videos' | 'reposts';

function ProfilePostCard({ post }: { post: RankingReviewerDetailData['posts'][number] }) {
  return (
    <article className="border-t border-[#d6d6d6] px-5 py-4">
      <div className="flex items-center gap-2">
        <span className="text-[15px] font-bold text-[#1a1a1a]">Bài viết</span>
        <span className="text-[11px] text-[#7a7a7a]">{post.date}</span>
      </div>
      <div className="mt-3 space-y-2.5 text-[12px] leading-7 text-[#3d3d3d]"><p>{post.content}</p></div>
      <div className="mt-3 grid max-w-[500px] grid-cols-2 gap-3">
        {post.images.map((image, index) => (
          <img key={`${post.id}-${index}`} src={image} alt="" className="h-[148px] w-full rounded-[10px] object-cover" />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-5 text-[13px] text-[#505050]">
        <span>♡ {post.likes}</span>
        <span>◔ {post.comments}</span>
        <span>↺ {post.shares}</span>
      </div>
    </article>
  );
}

function VideoCard({ item }: { item: RankingReviewerDetailData['videos'][number] }) {
  return (
    <article className="group relative overflow-hidden rounded-[14px]">
      <img src={item.image} alt="" className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[14px] font-semibold text-white"><span>▷</span><span>{item.views}</span></div>
    </article>
  );
}

export default function RankingReviewerDetailPageClient({ reviewer }: { reviewer: RankingReviewerDetailData }) {
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [interaction, setInteraction] = useState<{ dang_theo_doi?: boolean; da_chan?: boolean } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const payload: any = await userContentApi.layTrangThaiTuongTacNguoiDung(Number(reviewer.id));
        if (mounted) {
          setInteraction({
            dang_theo_doi: Boolean(payload?.dang_theo_doi),
            da_chan: Boolean(payload?.da_chan),
          });
        }
      } catch {
        if (mounted) setInteraction(null);
      }
    };
    void run();
    return () => {
      mounted = false;
    };
  }, [reviewer.id]);

  const visiblePosts = useMemo(() => reviewer.posts, [reviewer.posts]);
  const visibleVideos = useMemo(() => reviewer.videos, [reviewer.videos]);

  const handleToggleFollow = async () => {
    try {
      const payload: any = await userContentApi.toggleTheoDoiNguoiDung(Number(reviewer.id));
      setInteraction((prev) => ({ ...(prev || {}), dang_theo_doi: Boolean(payload?.dang_theo_doi) } as { dang_theo_doi?: boolean; da_chan?: boolean }));
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể theo dõi');
    }
  };

  const handleBlock = async () => {
    try {
      const payload: any = await userContentApi.toggleChanNguoiDung(Number(reviewer.id));
      setInteraction((prev) => ({ ...(prev || {}), da_chan: Boolean(payload?.da_chan) } as { dang_theo_doi?: boolean; da_chan?: boolean }));
      setActionMsg(Boolean(payload?.da_chan) ? 'Đã chặn người dùng' : 'Đã bỏ chặn người dùng');
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể chặn người dùng');
    } finally {
      setMenuOpen(false);
    }
  };

  const handleReport = async () => {
    const reason = window.prompt('Nhập lý do báo cáo');
    if (!reason?.trim()) return;
    try {
      await userContentApi.baoCaoNguoiDung(Number(reviewer.id), {
        loai_vi_pham: 'noi_dung_vi_pham',
        noi_dung_bao_cao: reason.trim(),
      });
      setActionMsg('Đã gửi báo cáo');
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : 'Không thể báo cáo');
    } finally {
      setMenuOpen(false);
    }
  };

  return (
    <div className="bg-[#f1f1ee] py-5">
      <section className="mx-auto w-full max-w-[1080px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
        <div className="px-7 pb-4 pt-5">
          <div className="grid gap-5 lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-[158px] w-[158px] items-center justify-center rounded-full bg-[#f6f1ca] p-4">
                <img src={reviewer.avatar} alt={reviewer.name} className="h-[112px] w-[112px] rounded-full object-cover" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-[30px] font-bold text-black">{reviewer.name}</h1>
                  <p className="mt-1.5 text-[18px] text-[#4a4a4a]">@{reviewer.handle}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#fde8bf] px-5 py-3 text-[18px] font-bold text-[#211d11]">⭐ TOP REVIEWER</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 text-[16px] text-[#242424]">
                <span><b>{reviewer.postsCount}</b> bài viết</span>
                <span><b>{reviewer.followers}</b> người theo dõi</span>
                <span>Đang theo dõi <b>{reviewer.following}</b> người dùng</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => void handleToggleFollow()} className="min-w-[180px] rounded-[12px] bg-black px-5 py-2.5 text-[16px] font-bold text-white">
                  {interaction?.dang_theo_doi ? 'Đang theo dõi' : 'Theo dõi'}
                </button>
                <Link href={`/messages/${reviewer.id}`} className="min-w-[156px] rounded-[12px] bg-[#edf2ed] px-5 py-2.5 text-center text-[16px] font-bold text-[#161616]">Nhắn tin</Link>
                <div className="relative">
                  <button type="button" onClick={() => setMenuOpen((v) => !v)} className="rounded-[10px] bg-[#f3f3f3] px-3.5 py-2.5 text-[16px]">•••</button>
                  {menuOpen ? (
                    <div className="absolute right-0 z-20 mt-2 w-[190px] rounded border bg-white p-1 shadow">
                      <button type="button" onClick={() => void handleReport()} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-[#f6f6f6]">Báo cáo tài khoản</button>
                      <button type="button" onClick={() => void handleBlock()} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-[#f6f6f6]">{interaction?.da_chan ? 'Bỏ chặn tài khoản' : 'Chặn tài khoản'}</button>
                    </div>
                  ) : null}
                </div>
              </div>
              {actionMsg ? <p className="mt-3 text-sm text-[#2f8f22]">{actionMsg}</p> : null}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#bcbcbc]">
            <div className="flex flex-wrap items-center gap-5">
              <button type="button" onClick={() => setActiveTab('posts')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>▦ Bài viết</button>
              <button type="button" onClick={() => setActiveTab('videos')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'videos' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>◉ Video</button>
              <button type="button" onClick={() => setActiveTab('reposts')} className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${activeTab === 'reposts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'}`}>⇅ Bài đăng lại</button>
            </div>
          </div>
        </div>

        {activeTab === 'posts' ? <div>{visiblePosts.map((post) => <ProfilePostCard key={post.id} post={post} />)}</div> : null}
        {activeTab === 'videos' ? <div className="px-6 pb-6 pt-5"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{visibleVideos.map((video) => <VideoCard key={video.id} item={video} />)}</div></div> : null}
        {activeTab === 'reposts' ? <div className="px-6 py-12 text-center text-[15px] text-[#787878]">Chưa có bài đăng lại nào được hiển thị.</div> : null}
      </section>
    </div>
  );
}
