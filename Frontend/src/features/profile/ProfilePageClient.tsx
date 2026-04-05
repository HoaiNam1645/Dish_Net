'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useState } from 'react';
import type { ReactNode } from 'react';

import type { UserProfile } from '@/features/profile/data';

type ProfileTab = 'posts' | 'videos' | 'reposts';
type SortMode = 'latest' | 'oldest';

function GridIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M3 3h5v5H3V3Zm0 9h5v5H3v-5Zm9-9h5v5h-5V3Zm0 9h5v5h-5v-5Z" />
        </svg>
    );
}

function VideoIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
            <rect x="3.25" y="4.25" width="13.5" height="11.5" rx="2.25" />
            <path d="m8 7 5 3-5 3V7Z" fill="currentColor" stroke="none" />
        </svg>
    );
}

function RepostIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6h7l-1.8-2" />
            <path d="M14 14H7l1.8 2" />
            <path d="M13 6l2 2.2L13 10.5" />
            <path d="M7 14l-2-2.2L7 9.5" />
        </svg>
    );
}

function ShareIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5" cy="10" r="2" />
            <circle cx="14.5" cy="5" r="2" />
            <circle cx="14.5" cy="15" r="2" />
            <path d="m6.8 9 5.6-3" />
            <path d="m6.8 11 5.6 3" />
        </svg>
    );
}

function MoreIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-current">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
        </svg>
    );
}

function SearchImageIcon() {
    return (
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="14" height="14" rx="2.5" />
            <circle cx="7.25" cy="7.25" r="1.2" />
            <path d="m17 13-3.5-3.5a1.8 1.8 0 0 0-2.55 0L3 17" />
        </svg>
    );
}

function Badge({ children, tone = 'yellow' }: { children: ReactNode; tone?: 'yellow' | 'pink' }) {
    const toneClass = tone === 'yellow'
        ? 'bg-[#faedc8] text-[#202020]'
        : 'bg-[#ffd8d0] text-[#202020]';

    return (
        <span className={`inline-flex items-center gap-1.5 rounded-[12px] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.02em] ${toneClass}`}>
            {children}
        </span>
    );
}

function CreatePostModal({ profile, onClose }: { profile: UserProfile; onClose: () => void }) {
    const [isOrderLink, setIsOrderLink] = useState(false);

    return (
        <div className="fixed inset-0 z-[100] flex justify-center bg-black/40 px-4 pt-[10vh] backdrop-blur-sm">
            <div className="h-fit w-full max-w-[500px] rounded-[12px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] px-5 py-4">
                    <button onClick={onClose} className="text-[15px] font-medium text-[#666] transition hover:text-black">
                        Hủy
                    </button>
                    <h2 className="text-[18px] font-bold text-black">Tạo bài viết</h2>
                    <div className="w-[30px]" />
                </div>

                <div className="p-5">
                    <div className="flex gap-3">
                        <img src={profile.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-black">{profile.handle}</span>
                                <button className="flex items-center gap-1 rounded bg-[#e4e6eb] px-2 py-0.5 text-[12px] font-medium text-[#050505]">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    Bạn bè
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </div>
                            <textarea
                                placeholder="Có gì mới?"
                                className="mt-2 w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-[#8a8d91]"
                                rows={3}
                                autoFocus
                            />

                            <div className="mt-2 flex items-center gap-4 text-[#65676b]">
                                <button className="transition hover:text-black"><SearchImageIcon /></button>
                                <button className="transition hover:text-black"><GridIcon /></button>
                                <button className="transition hover:text-black"><VideoIcon /></button>
                                <button className="transition hover:text-black"><RepostIcon /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between p-5 pt-8">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-[#1a6e14]">Đặt món</span>
                        <button
                            type="button"
                            onClick={() => setIsOrderLink(!isOrderLink)}
                            className={`relative flex h-[22px] w-10 items-center rounded-full transition-colors ${isOrderLink ? 'bg-[#1a6e14]' : 'bg-[#8a8d91]'}`}
                        >
                            <span className={`inline-block h-[18px] w-[18px] rounded-full bg-white shadow transition-transform ${isOrderLink ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                        <input
                            type="text"
                            placeholder="Link món"
                            className="h-[34px] w-[180px] rounded-[6px] border border-[#ced0d4] px-3 text-[14px] outline-none transition focus:border-[#1a6e14]"
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

function CreatePostBox({ profile, onClick }: { profile: UserProfile; onClick: () => void }) {
    return (
        <div className="border-t border-[#d9d9d9] px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
                <img src={profile.avatar} alt={profile.name} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <button
                    type="button"
                    onClick={onClick}
                    className="flex h-11 flex-1 items-center rounded-full border border-[#d8d8d8] px-4 text-left text-[14px] text-[#9b9b9b] transition hover:bg-[#fafafa]"
                >
                    Có gì mới
                </button>
                <button
                    type="button"
                    onClick={onClick}
                    className="rounded-full bg-[#111111] px-4 py-2 text-[14px] font-bold text-white transition hover:bg-[#2c2c2c]"
                >
                    Đăng
                </button>
            </div>
        </div>
    );
}

function PostMenu({ isOpen, onToggle, onClose }: { isOpen: boolean; onToggle: () => void; onClose: () => void }) {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#696969] transition hover:bg-[#f3f3f3]"
                aria-label="Tùy chọn bài viết"
            >
                <MoreIcon />
            </button>
            {isOpen ? (
                <div className="absolute right-0 top-[calc(100%+6px)] z-10 w-[132px] rounded-[10px] border border-[#ebebeb] bg-white py-1 shadow-[0_16px_32px_rgba(0,0,0,0.12)]">
                    <button type="button" onClick={onClose} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>📝</span>
                        <span>Chỉnh sửa</span>
                    </button>
                    <button type="button" onClick={onClose} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#222] transition hover:bg-[#f7f7f7]">
                        <span>🗑️</span>
                        <span>Xóa bài viết</span>
                    </button>
                </div>
            ) : null}
        </div>
    );
}

function PostCard({
    post,
    profile,
}: {
    post: UserProfile['posts'][number];
    profile: UserProfile;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <article className="border-t border-[#d9d9d9] px-4 py-5 sm:px-6">
            <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-4 sm:grid-cols-[44px_minmax(0,1fr)]">
                <div className="flex flex-col items-center">
                    <img src={profile.avatar} alt={profile.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="mt-3 h-full min-h-[320px] w-px bg-[#ececec]" />
                </div>

                <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-[16px] font-bold text-black">@vy.fooodieee</span>
                                <span className="text-[11px] text-[#8c8c8c]">{post.date}</span>
                            </div>
                        </div>
                        <PostMenu
                            isOpen={isMenuOpen}
                            onToggle={() => setIsMenuOpen((current) => !current)}
                            onClose={() => setIsMenuOpen(false)}
                        />
                    </div>

                    <div className="mt-3 space-y-2 text-[13px] leading-7 text-[#535353]">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-4 grid max-w-[424px] grid-cols-2 gap-3">
                        {post.images.slice(0, 2).map((image, index) => (
                            <img
                                key={`${post.id}-${index}`}
                                src={image}
                                alt=""
                                className="h-[154px] w-full rounded-[10px] object-cover sm:h-[168px]"
                            />
                        ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-[#5b5b5b]">
                        <span>♡ {post.likes}</span>
                        <span>◔ {post.comments}</span>
                        <span>↺ {post.shares}</span>
                        <span>➤ {post.sends}</span>
                        <button
                            type="button"
                            className="ml-auto rounded-full bg-[#2f8e2a] px-5 py-1.5 text-[12px] font-bold text-white transition hover:bg-[#277823]"
                        >
                            Đặt món
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function VideoCard({ item }: { item: UserProfile['videos'][number] }) {
    return (
        <article className="group relative overflow-hidden rounded-[12px]">
            <img src={item.image} alt="" className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {item.pinned ? (
                <span className="absolute left-3 top-3 rounded-[8px] bg-[#ff3356] px-3 py-1 text-[12px] font-bold text-white">Đã ghim</span>
            ) : null}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[15px] font-semibold text-white">
                <span>▷</span>
                <span>{item.views}</span>
            </div>
        </article>
    );
}

export default function ProfilePageClient({
    profile,
    editHref = '/user/profile/edit',
    editLabel = 'Chỉnh sửa trang cá nhân',
}: {
    profile: UserProfile;
    editHref?: string;
    editLabel?: string;
}) {
    const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
    const [sortMode, setSortMode] = useState<SortMode>('latest');
    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

    const visiblePosts = sortMode === 'latest' ? profile.posts : [...profile.posts].reverse();
    const visibleVideos = profile.videos;

    const tabs = [
        { key: 'posts' as const, label: 'Bài viết', icon: <GridIcon /> },
        { key: 'videos' as const, label: 'Video', icon: <VideoIcon /> },
        { key: 'reposts' as const, label: 'Bài đăng lại', icon: <RepostIcon /> },
    ];

    return (
        <div className="bg-[#f3f3f1] px-4 py-7 sm:px-6 lg:py-8">
            <section className="mx-auto w-full max-w-[820px] overflow-hidden rounded-[18px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)] xl:max-w-[880px]">
                <div className="px-4 pb-3 pt-5 sm:px-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                        <div className="mx-auto flex h-[132px] w-[132px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f6f1ca] sm:mx-0">
                            <img src={profile.avatar} alt={profile.name} className="h-[132px] w-[132px] object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <h1 className="text-[20px] font-bold leading-none text-black sm:text-[22px]">{profile.name}</h1>
                                        <p className="mt-3 text-[14px] text-[#535353]">{profile.handle}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {profile.isTopReviewer ? (
                                            <Badge tone="yellow">
                                                <span className="text-[#f5b400]">★</span>
                                                <span>Top 10 Reviewer</span>
                                            </Badge>
                                        ) : null}
                                        <Badge tone="pink">
                                            <span>Độ uy tín</span>
                                            <span className="text-[#f50b0b]">{profile.trustScore}</span>
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[14px] text-[#222]">
                                    <span><strong className="font-semibold">{profile.postsCount}</strong> bài viết</span>
                                    <span><strong className="font-semibold">{profile.followers}</strong> người theo dõi</span>
                                    <span>Đang theo dõi <strong className="font-semibold">{profile.following}</strong> người dùng</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Link
                                        href={editHref}
                                        id="btn-edit-profile"
                                        className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-black px-4 text-[14px] font-bold text-white transition hover:bg-[#262626]"
                                    >
                                        {editLabel}
                                    </Link>
                                    <button
                                        type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#d9d9d9] text-[#484848] transition hover:bg-[#f7f7f7]"
                                        aria-label="Chia sẻ trang cá nhân"
                                    >
                                        <ShareIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 border-b border-[#d7d7d7] pt-1 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-wrap items-center gap-5">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    id={`tab-${tab.key}`}
                                    className={`flex items-center gap-1.5 border-b-2 pb-3 text-[14px] font-semibold transition ${
                                        activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-[#7a7a7a]'
                                    }`}
                                >
                                    <span className="text-[13px]">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mb-3 flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setSortMode('latest')}
                                className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                    sortMode === 'latest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                }`}
                            >
                                Mới nhất
                            </button>
                            <button
                                type="button"
                                onClick={() => setSortMode('oldest')}
                                className={`rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
                                    sortMode === 'oldest' ? 'border border-[#d8d8d8] bg-white text-[#202020]' : 'bg-[#f2f2f2] text-[#8d8d8d]'
                                }`}
                            >
                                Cũ nhất
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === 'posts' ? <CreatePostBox profile={profile} onClick={() => setIsCreatePostModalOpen(true)} /> : null}

                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.map((post) => (
                            <PostCard key={post.id} post={post} profile={profile} />
                        ))}
                    </div>
                ) : null}

                {activeTab === 'videos' ? (
                    <div className="border-t border-[#d9d9d9] px-4 pb-5 pt-4 sm:px-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleVideos.map((video) => (
                                <VideoCard key={video.id} item={video} />
                            ))}
                        </div>
                    </div>
                ) : null}

                {activeTab === 'reposts' ? (
                    <div className="border-t border-[#d9d9d9] px-4 py-12 text-center text-[14px] text-[#787878] sm:px-6">
                        Chưa có bài đăng lại nào được hiển thị.
                    </div>
                ) : null}
            </section>

            {isCreatePostModalOpen ? (
                <CreatePostModal profile={profile} onClose={() => setIsCreatePostModalOpen(false)} />
            ) : null}
        </div>
    );
}
