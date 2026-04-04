'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';

type ProfileTab = 'posts' | 'videos' | 'reposts';

/* ═══════════════════════════════════════════
   POST CARD
   ═══════════════════════════════════════════ */
function PostCard({ post }: { post: UserProfile['posts'][number] }) {
    return (
        <article className="border-t border-[#d6d6d6] px-5 py-4 lg:px-6">
            <div className="grid grid-cols-[36px_minmax(0,1fr)] gap-3">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eceff4] text-[22px]">👤</div>
                    <div className="mt-4 h-full min-h-[370px] w-px bg-[#e4e4e4]" />
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <span className="text-[18px] font-bold text-[#1a1a1a]">@vy.fooodieee</span>
                        <span className="text-[13px] text-[#7a7a7a]">{post.date}</span>
                    </div>

                    <div className="mt-3 space-y-2 text-[13px] leading-7 text-[#3d3d3d]">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-3 grid max-w-[560px] grid-cols-2 gap-3">
                        {post.images.map((image, index) => (
                            <img key={`${post.id}-${index}`} src={image} alt="" className="h-[170px] w-full rounded-[12px] object-cover" />
                        ))}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-5 text-[13px] text-[#505050]">
                        <span>♡ {post.likes}</span>
                        <span>◔ {post.comments}</span>
                        <span>↺ {post.shares}</span>
                        <span>➤ {post.sends}</span>
                        <div className="ml-auto flex items-center gap-3">
                            <button type="button" className="rounded-full border border-[#B7AFAF] px-5 py-1.5 text-[13px] font-bold text-green-primary transition hover:bg-gray-50">
                                Xem menu
                            </button>
                            <button type="button" className="rounded-full border border-[#258F22] bg-[#DCEBDC] px-5 py-1.5 text-[13px] font-bold text-green-primary transition hover:bg-[#c8dfca]">
                                Đặt món
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════
   VIDEO CARD
   ═══════════════════════════════════════════ */
function VideoCard({ item }: { item: UserProfile['videos'][number] }) {
    return (
        <article className="group relative overflow-hidden rounded-[18px]">
            <img src={item.image} alt="" className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {item.pinned ? (
                <span className="absolute left-3 top-3 rounded-[10px] bg-[#ff3356] px-3 py-1 text-[13px] font-bold text-white">Đã ghim</span>
            ) : null}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[16px] font-semibold text-white">
                <span>▷</span>
                <span>{item.views}</span>
            </div>
        </article>
    );
}

/* ═══════════════════════════════════════════
   CREATE POST MODAL
   ═══════════════════════════════════════════ */
function CreatePostModal({ profile, onClose }: { profile: UserProfile; onClose: () => void }) {
    const [isOrderLink, setIsOrderLink] = useState(false);
    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/40 px-4 pt-[10vh] backdrop-blur-sm">
            <div className="h-fit w-full max-w-[500px] rounded-[12px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
                    <button onClick={onClose} className="text-[15px] font-medium text-[#666] transition hover:text-black">
                        Hủy
                    </button>
                    <h2 className="text-[18px] font-bold text-black">Tạo bài viết</h2>
                    <div className="w-[30px]" />
                </div>

                {/* Body */}
                <div className="p-5">
                    <div className="flex gap-3">
                        <img src={profile.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">{profile.handle}</span>
                                <button className="flex items-center gap-1 rounded bg-[#e4e6eb] px-2 py-0.5 text-[12px] font-medium text-[#050505]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                    </svg>
                                    Bạn bè
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </button>
                            </div>
                            <textarea
                                placeholder="Có gì mới?"
                                className="mt-2 w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-[#8a8d91]"
                                rows={3}
                                autoFocus
                            />

                            {/* Icons */}
                            <div className="mt-2 flex items-center gap-4 text-[#65676b]">
                                <button className="transition hover:text-black"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></button>
                                <button className="transition hover:text-black"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></button>
                                <button className="transition hover:text-black"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></button>
                                <button className="transition hover:text-black"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-5 pt-8">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-[#1a6e14]">Đặt món</span>
                        <button
                            type="button"
                            onClick={() => setIsOrderLink(!isOrderLink)}
                            className={`relative flex h-[22px] w-10 items-center rounded-full transition-colors ${
                                isOrderLink ? 'bg-[#1a6e14]' : 'bg-[#8a8d91]'
                            }`}
                        >
                            <span
                                className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
                                    isOrderLink ? 'translate-x-5' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                        <input
                            type="text"
                            placeholder="Link món"
                            className="h-[34px] w-[180px] rounded-[6px] border border-[#ced0d4] px-3 text-[14px] outline-none transition focus:border-green-primary"
                            disabled={!isOrderLink}
                            style={{ opacity: isOrderLink ? 1 : 0.6 }}
                        />
                    </div>
                    
                    <button className="rounded-[8px] border border-[#f0f0f0] px-6 py-1.5 font-bold text-[#bcc0c4]">
                        Đăng
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CREATE POST BOX
   ═══════════════════════════════════════════ */
function CreatePostBox({ onClick }: { onClick: () => void }) {
    return (
        <div className="px-8 py-5">
            <div 
                className="flex cursor-text items-center gap-4 rounded-[20px] border border-[#BABBBA] bg-white px-5 py-4 transition hover:bg-gray-50"
                onClick={onClick}
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eceff4] text-[22px]">👤</div>
                <div className="flex-1 text-base text-[#6D6969]">Có gì mới</div>
                <button type="button" className="rounded-full bg-[#f3f3f3] p-2 text-[#8a8a8a] transition hover:bg-[#e8e8e8]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MAIN PROFILE PAGE (CLIENT)
   ═══════════════════════════════════════════ */
export default function ProfilePageClient({ profile }: { profile: UserProfile }) {
    const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const visiblePosts = useMemo(() => profile.posts, [profile.posts]);
    const visibleVideos = useMemo(() => profile.videos, [profile.videos]);

    return (
        <div className="bg-[#f1f2f1] py-6 lg:py-8">
            <section className="mx-auto w-full max-w-[960px] overflow-hidden rounded-[22px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                <div className="px-5 pb-4 pt-5 lg:px-6 lg:pt-6">
                    {/* ── Profile Header ── */}
                    <div className="grid gap-5 lg:grid-cols-[190px_minmax(0,1fr)]">
                        {/* Avatar */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative flex h-[176px] w-[176px] items-center justify-center rounded-full bg-[#f6f1ca] p-4">
                                <img src={profile.avatar} alt={profile.name} className="h-[120px] w-[120px] rounded-full object-cover" />
                                {/* Small avatar icons around */}
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border-2 border-white bg-[#f0e8c9] shadow-sm"
                                        style={{
                                            top: ['-8px', '20%', '75%', '85%', '-5%'][i],
                                            left: ['92%', '100%', '100%', '5%', '5%'][i],
                                        }}
                                    >
                                        <img src={profile.avatar} alt="" className="h-7 w-7 rounded-[9px] object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Profile info */}
                        <div>
                            <div className="flex flex-wrap items-start justify-between gap-6">
                                <div>
                                    <h1 className="text-[26px] font-bold text-black">{profile.name}</h1>
                                    <p className="mt-1 text-[15px] text-[#4a4a4a]">{profile.handle}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    {profile.isTopReviewer && (
                                        <span className="rounded-full bg-[#FAEACD] px-4 py-2 text-[13px] font-bold text-[#1a1a1a]">
                                            ⭐ TOP 10 REVIEWER
                                        </span>
                                    )}
                                    <span className="rounded-full bg-[#FAD3CD] px-4 py-2 text-[13px] font-bold text-[#1a1a1a]">
                                        ĐỘ UY TÍN <span className="ml-1 text-[#F50B0B]">{profile.trustScore}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#242424]">
                                <span className="font-light">{profile.postsCount} bài viết</span>
                                <span className="font-light">{profile.followers} người theo dõi</span>
                                <span className="font-bold">Đang theo dõi {profile.following} người dùng</span>
                            </div>

                            {/* Edit profile button */}
                            <div className="mt-6">
                                <Link
                                    href="/user/profile/edit"
                                    className="inline-block rounded-[12px] bg-black px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#333]"
                                    id="btn-edit-profile"
                                >
                                    Chỉnh sửa trang cá nhân
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ── Tabs ── */}
                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-b border-[#bcbcbc]">
                        <div className="flex flex-wrap items-center gap-5">
                            {([
                                { key: 'posts' as const, label: '▦ Bài viết', icon: '📝' },
                                { key: 'videos' as const, label: '◉ Video', icon: '🎬' },
                                { key: 'reposts' as const, label: '⇅ Bài đăng lại', icon: '🔄' },
                            ] as const).map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`border-b-2 px-2 pb-3 text-[15px] font-bold transition ${
                                        activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                    }`}
                                    id={`tab-${tab.key}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="mb-3 flex items-center gap-2">
                            <button type="button" className="rounded-[10px] border border-[#e0e0e0] bg-white px-3.5 py-2 text-[13px] font-semibold">
                                Mới nhất
                            </button>
                            <button type="button" className="rounded-[10px] bg-[#f1f1f1] px-3.5 py-2 text-[13px] font-semibold text-[#9a9a9a]">
                                Cũ nhất
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Create Post (only on posts tab) ── */}
                {activeTab === 'posts' && <CreatePostBox onClick={() => setIsCreatePostModalOpen(true)} />}

                {/* ── Posts ── */}
                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : null}

                {/* ── Videos ── */}
                {activeTab === 'videos' ? (
                    <div className="px-5 pb-5 pt-4 lg:px-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleVideos.map((video) => (
                                <VideoCard key={video.id} item={video} />
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* ── Reposts ── */}
                {activeTab === 'reposts' ? (
                    <div className="px-5 py-12 text-center text-[15px] text-[#787878]">
                        Chưa có bài đăng lại nào được hiển thị.
                    </div>
                ) : null}
            </section>

            {isCreatePostModalOpen && (
                <CreatePostModal profile={profile} onClose={() => setIsCreatePostModalOpen(false)} />
            )}
        </div>
    );
}
