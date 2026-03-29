'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { RankingReviewerDetailData } from './data';

type ProfileTab = 'posts' | 'videos' | 'reposts';

function ProfilePostCard({
    post,
}: {
    post: RankingReviewerDetailData['posts'][number];
}) {
    return (
        <article className="border-t border-[#d6d6d6] px-8 py-6">
            <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-5">
                <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eceff4] text-[22px]">👤</div>
                    <div className="mt-4 h-full min-h-[370px] w-px bg-[#e4e4e4]" />
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <span className="text-[18px] font-bold text-[#1a1a1a]">@vy.fooodieee</span>
                        <span className="text-[13px] text-[#7a7a7a]">{post.date}</span>
                    </div>

                    <div className="mt-6 space-y-3 text-[15px] leading-9 text-[#3d3d3d]">
                        {post.content.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-4 grid max-w-[720px] grid-cols-2 gap-3">
                        {post.images.map((image, index) => (
                            <img key={`${post.id}-${index}`} src={image} alt="" className="h-[220px] w-full rounded-[14px] object-cover" />
                        ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-8 text-[15px] text-[#505050]">
                        <span>♡ {post.likes}</span>
                        <span>◔ {post.comments}</span>
                        <span>↺ {post.shares}</span>
                        <span>➤ {post.sends}</span>
                        <button type="button" className="ml-auto rounded-full border border-[#59a84f] px-8 py-2 text-[14px] font-bold text-[#3b8a31]">
                            Đặt món
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function VideoCard({
    item,
}: {
    item: RankingReviewerDetailData['videos'][number];
}) {
    return (
        <article className="group relative overflow-hidden rounded-[18px]">
            <img src={item.image} alt="" className="h-[280px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
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

export default function RankingReviewerDetailPageClient({
    reviewer,
}: {
    reviewer: RankingReviewerDetailData;
}) {
    const [activeTab, setActiveTab] = useState<ProfileTab>('posts');

    const visiblePosts = useMemo(() => reviewer.posts, [reviewer.posts]);
    const visibleVideos = useMemo(() => reviewer.videos, [reviewer.videos]);

    return (
        <div className="bg-[#f1f1ee] py-8">
            <section className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[28px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                <div className="px-10 pb-5 pt-8">
                    <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
                        <div className="flex justify-center lg:justify-start">
                            <div className="flex h-[230px] w-[230px] items-center justify-center rounded-full bg-[#f6f1ca] p-5">
                                <img src={reviewer.avatar} alt={reviewer.name} className="h-[160px] w-[160px] rounded-full object-cover" />
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-start justify-between gap-6">
                                <div>
                                    <h1 className="text-[44px] font-bold text-black">{reviewer.name}</h1>
                                    <p className="mt-3 text-[24px] text-[#4a4a4a]">{reviewer.handle}</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="rounded-full bg-[#fde8bf] px-5 py-3 text-[18px] font-bold text-[#211d11]">⭐ TOP REVIEWER</span>
                                    <span className="rounded-full bg-[#f8d4cf] px-5 py-3 text-[18px] font-bold text-[#2d241f]">ĐỘ UY TÍN <span className="ml-2 text-[#ff4327]">{reviewer.trustScore}</span></span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-[22px] text-[#242424]">
                                <span><b>{reviewer.postsCount}</b> bài viết</span>
                                <span><b>{reviewer.followers}</b> người theo dõi</span>
                                <span>Đang theo dõi <b>{reviewer.following}</b> người dùng</span>
                            </div>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <button type="button" className="min-w-[260px] rounded-[18px] bg-black px-8 py-4 text-[22px] font-bold text-white">Theo dõi</button>
                                <Link
                                    href={`/messages/${reviewer.id}`}
                                    className="min-w-[220px] rounded-[18px] bg-[#edf2ed] px-8 py-4 text-center text-[22px] font-bold text-[#161616]"
                                >
                                    Nhắn tin
                                </Link>
                                <button type="button" className="rounded-[14px] bg-[#f3f3f3] px-5 py-4 text-[22px]">🧑‍🤝‍🧑</button>
                                <button type="button" className="rounded-[14px] bg-[#f3f3f3] px-5 py-4 text-[22px]">↗</button>
                                <button type="button" className="rounded-[14px] bg-[#f3f3f3] px-5 py-4 text-[22px]">•••</button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#bcbcbc]">
                        <div className="flex flex-wrap items-center gap-8">
                            <button
                                type="button"
                                onClick={() => setActiveTab('posts')}
                                className={`border-b-2 px-2 pb-4 text-[18px] font-bold transition ${
                                    activeTab === 'posts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ▦ Bài viết
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('videos')}
                                className={`border-b-2 px-2 pb-4 text-[18px] font-bold transition ${
                                    activeTab === 'videos' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ◉ Video
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('reposts')}
                                className={`border-b-2 px-2 pb-4 text-[18px] font-bold transition ${
                                    activeTab === 'reposts' ? 'border-black text-black' : 'border-transparent text-[#6d6d6d]'
                                }`}
                            >
                                ⇅ Bài đăng lại
                            </button>
                        </div>

                        <div className="mb-3 flex items-center gap-2">
                            <button type="button" className="rounded-[10px] border border-[#e0e0e0] bg-white px-4 py-2 text-[15px] font-semibold">Mới nhất</button>
                            <button type="button" className="rounded-[10px] bg-[#f1f1f1] px-4 py-2 text-[15px] font-semibold text-[#9a9a9a]">Cũ nhất</button>
                        </div>
                    </div>
                </div>

                {activeTab === 'posts' ? (
                    <div>
                        {visiblePosts.map((post) => (
                            <ProfilePostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : null}

                {activeTab === 'videos' ? (
                    <div className="px-8 pb-8 pt-6">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {visibleVideos.map((video) => (
                                <VideoCard key={video.id} item={video} />
                            ))}
                        </div>
                    </div>
                ) : null}

                {activeTab === 'reposts' ? (
                    <div className="px-8 py-16 text-center text-[18px] text-[#787878]">
                        Chưa có bài đăng lại nào được hiển thị.
                    </div>
                ) : null}
            </section>
        </div>
    );
}
