'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

import { homeUiAssets } from './assets';
import CommentModal from './CommentModal';
import type { FeedPost, HomePageData, RankingItem, RankingMode, SpotlightCard } from './types';

const rankingColumnLabels: Record<RankingMode, { name: string; metric: string; popularity: string }> = {
    stores: {
        name: 'Cửa hàng',
        metric: 'Đánh giá / đã bán',
        popularity: 'Độ phổ biến',
    },
    reviewers: {
        name: 'Reviewer',
        metric: 'Bài review',
        popularity: 'Độ phổ biến',
    },
};

function RankingRow({ item }: { item: RankingItem }) {
    return (
        <div className="grid grid-cols-[32px_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 border-b border-[#d8ddd6] py-3 text-[13px] text-black last:border-b-0">
            <div className="text-center text-[15px] font-bold whitespace-nowrap">{item.rank}</div>
            <div className="truncate whitespace-nowrap">{item.name}</div>
            <div className="truncate text-center text-[11px] text-[#5e625e] whitespace-nowrap">{item.metric}</div>
            <div className="truncate text-center text-[11px] text-[#5e625e] whitespace-nowrap">{item.popularity}</div>
        </div>
    );
}

function SidebarStoreCard({ card }: { card: SpotlightCard }) {
    return (
        <article className="overflow-hidden rounded-[18px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <img src={card.coverImage} alt={card.title} className="h-40 w-full object-cover" />
            <div className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-base font-semibold text-black">{card.title}</h3>
                        <p className="mt-1 text-xs text-[#5f655f]">{card.address}</p>
                    </div>
                    <img src={homeUiAssets.ratingStars} alt="Sao đánh giá" className="mt-1 h-5 w-20 object-contain" />
                </div>

                <div className="flex items-center gap-3 border-y border-[#d8ddd6] py-3">
                    <img src={card.reviewerAvatar} alt="Người dùng" className="h-10 w-10 rounded-full object-cover" />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-black">{card.area}</p>
                        <p className="line-clamp-2 text-xs text-[#5f655f]">{card.excerpt}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <img src={homeUiAssets.reactionsLeft} alt="Phản hồi trái" className="h-7 w-20 object-contain" />
                    <img src={homeUiAssets.reactionsRight} alt="Phản hồi phải" className="h-7 w-16 object-contain" />
                </div>
            </div>
        </article>
    );
}

function FeedPostCard({
    post,
    onComment,
    onOrder,
    onOpenMenu,
}: {
    post: FeedPost;
    onComment: () => void;
    onOrder: () => void;
    onOpenMenu: () => void;
}) {
    return (
        <article className="rounded-[18px] bg-white p-6 shadow-[0_10px_36px_rgba(0,0,0,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <img src={post.authorAvatar} alt={post.author} className="h-16 w-16 rounded-full object-cover" />
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[22px] font-bold text-black">{post.author}</h3>
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#faeacd] px-4 py-1 text-xs font-bold text-black">
                                <img src={homeUiAssets.starIcon} alt="Top reviewer" className="h-4 w-4 object-contain" />
                                TOP REVIEWER
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-[#727672]">{post.date}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#f7ead0] px-4 py-2 text-sm font-bold text-[#f59e0b]">
                        <img src={homeUiAssets.starIcon} alt="Điểm số" className="h-4 w-4 object-contain" />
                        {post.rating}
                    </span>
                    <button className="rounded-full bg-[#258f22] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#1f771d]">
                        {post.followLabel}
                    </button>
                </div>
            </div>

            <div className="my-6 h-px bg-[#d9ded7]" />

            <p className="text-[17px] leading-8 text-black">{post.review}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {post.images.map((image, index) => (
                    <img
                        key={`${post.id}-image-${index}`}
                        src={image}
                        alt={`Ảnh bài viết ${index + 1}`}
                        className="h-60 w-full rounded-[18px] object-cover"
                    />
                ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                {post.tags.map((tag, index) => (
                    <span
                        key={tag}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${index === 1
                            ? 'bg-[#fad3cd] text-[#f50b0b]'
                            : 'bg-[#faeacd] text-[#f59e0b]'
                            }`}
                    >
                        <img src={homeUiAssets.tagIcon} alt="" className="h-4 w-4 object-contain" />
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#d9ded7] pt-4">
                <div className="flex items-center gap-8 text-sm font-bold text-[#6d6969]">
                    <button className="inline-flex items-center gap-2 transition hover:text-[#285e19]">
                        <img src={homeUiAssets.likeIcon} alt="" className="h-8 w-8 object-contain" />
                        Yêu thích
                    </button>
                    <button onClick={onComment} className="inline-flex items-center gap-2 transition hover:text-[#285e19]">
                        <img src={homeUiAssets.commentIcon} alt="" className="h-8 w-8 object-contain" />
                        Bình luận
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={onOpenMenu}
                        className="rounded-full border border-[#b7afaf] bg-[#f7f6f6] px-6 py-2 text-sm font-bold text-[#285e19] transition hover:border-[#285e19]"
                    >
                        Xem menu
                    </button>
                    <button
                        onClick={onOrder}
                        className="rounded-full border border-[#258f22] bg-[#dcebdc] px-6 py-2 text-sm font-bold text-[#285e19] transition hover:bg-[#cae4ca]"
                    >
                        Đặt món
                    </button>
                </div>
            </div>
        </article>
    );
}

export default function HomePageClient({ data }: { data: HomePageData }) {
    const [rankingMode, setRankingMode] = useState<RankingMode>('stores');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeMenuCategory, setActiveMenuCategory] = useState(data.menu.categories[0]?.id ?? '');
    const [menuQuery, setMenuQuery] = useState('');

    const rankingItems = data.rankings[rankingMode];
    const rankingLabels = rankingColumnLabels[rankingMode];
    const filteredMenuItems = data.menu.items.filter((item) => {
        const matchesCategory = !activeMenuCategory || item.categoryId === activeMenuCategory;
        const matchesQuery = !menuQuery || item.name.toLowerCase().includes(menuQuery.toLowerCase());
        return matchesCategory && matchesQuery;
    });

    return (
        <>
            <div className="bg-[#fafaf9] pb-14">
                <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(360px,0.9fr)]">
                        <article className="relative overflow-hidden rounded-[24px] bg-[#285e19] shadow-[0_18px_50px_rgba(40,94,25,0.18)]">
                            <img src={data.hero.backgroundImage} alt={data.hero.title} className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,52,11,0.82)_0%,rgba(33,92,19,0.28)_55%,rgba(33,92,19,0.1)_100%)]" />
                            <div className="relative grid min-h-[364px] gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                                <div className="max-w-[360px] text-white">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/75">
                                        {data.hero.eyebrow}
                                    </p>
                                    <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                                        {data.hero.title}
                                    </h1>
                                    <p className="mt-4 text-base leading-7 text-white/85">
                                        {data.hero.description}
                                    </p>
                                    <button className="mt-8 inline-flex items-center rounded-full border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/12">
                                        {data.hero.ctaLabel}
                                    </button>
                                </div>

                                <div className="justify-self-end rounded-[20px] bg-white/8 p-2 backdrop-blur-sm">
                                    <img
                                        src={data.hero.collageImage}
                                        alt="Bộ sưu tập món ăn"
                                        className="h-[220px] w-full max-w-[420px] rounded-[18px] object-cover"
                                    />
                                </div>
                            </div>
                        </article>

                        <aside className="rounded-[24px] bg-white p-5 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between gap-4">
                                <h2 className="text-2xl font-bold text-[#285e19]">Bảng Xếp Hạng</h2>
                                <button className="text-sm font-medium text-[#285e19] transition hover:underline">
                                    Xem thêm →
                                </button>
                            </div>

                            <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-full border border-[#dcebdc] bg-[#f7faf6] p-1">
                                <button
                                    onClick={() => setRankingMode('stores')}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${rankingMode === 'stores'
                                        ? 'bg-[#285e19] text-white shadow'
                                        : 'text-[#98ab92]'
                                        }`}
                                >
                                    Cửa hàng
                                </button>
                                <button
                                    onClick={() => setRankingMode('reviewers')}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${rankingMode === 'reviewers'
                                        ? 'bg-[#285e19] text-white shadow'
                                        : 'text-[#98ab92]'
                                        }`}
                                >
                                    Reviewer
                                </button>
                            </div>

                            <div className="mt-5 rounded-[18px] border border-[#edf2eb]">
                                <div className="grid grid-cols-[32px_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,1fr)] gap-3 bg-[#f9fbf8] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-[#98ab92]">
                                    <span className="whitespace-nowrap">#</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.name}</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.metric}</span>
                                    <span className="truncate whitespace-nowrap">{rankingLabels.popularity}</span>
                                </div>
                                <div className="px-4">
                                    {rankingItems.map((item) => (
                                        <RankingRow key={`${rankingMode}-${item.rank}`} item={item} />
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="rounded-[22px] bg-[#e6e9e6] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                        <div className="flex flex-wrap justify-end gap-4">
                            {data.filters.map((filter) => (
                                <button
                                    key={filter}
                                    className="inline-flex min-w-[180px] items-center justify-between rounded-[10px] bg-white px-5 py-3 text-base text-[#616462] shadow-[0_3px_8px_rgba(0,0,0,0.03)]"
                                >
                                    {filter}
                                    <img src={homeUiAssets.filterChevron} alt="" className="h-5 w-5 object-contain" />
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-8 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.75fr)]">
                        <div className="space-y-8">
                            {data.feedPosts.map((post) => (
                                <FeedPostCard
                                    key={post.id}
                                    post={post}
                                    onComment={() => setIsCommentModalOpen(true)}
                                    onOpenMenu={() => setIsMenuModalOpen(true)}
                                    onOrder={() => setIsOrderModalOpen(true)}
                                />
                            ))}
                        </div>

                        <div className="space-y-6">
                            {data.spotlightCards.map((card) => (
                                <SidebarStoreCard key={card.id} card={card} />
                            ))}
                        </div>
                    </section>
                </section>
            </div>

            {isMenuModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
                    <div className="relative flex h-[min(88vh,900px)] w-full max-w-[1360px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
                        <button
                            onClick={() => setIsMenuModalOpen(false)}
                            className="absolute right-6 top-5 z-10 text-[54px] leading-none text-black transition hover:opacity-65"
                            aria-label="Đóng thực đơn"
                        >
                            ×
                        </button>

                        <aside className="w-[250px] shrink-0 border-r border-[#ececec] px-8 py-14">
                            <h2 className="mb-8 text-[28px] font-bold text-[#ef3124]">{data.menu.title}</h2>
                            <div className="space-y-4">
                                {data.menu.categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveMenuCategory(category.id)}
                                        className={`block rounded-[8px] px-4 py-2 text-left text-[18px] uppercase transition ${activeMenuCategory === category.id
                                            ? 'bg-[#a4a8ae] font-bold text-white'
                                            : 'text-[#7e8797] hover:text-[#4e5560]'
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        <div className="relative flex min-w-0 flex-1 flex-col px-8 pb-8 pt-8">
                            <div className="mr-14 flex h-[76px] items-center gap-4 border border-[#ededed] px-6">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" className="text-[#374151]">
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m20 20-3.5-3.5" />
                                </svg>
                                <input
                                    value={menuQuery}
                                    onChange={(event) => setMenuQuery(event.target.value)}
                                    placeholder="Tìm món"
                                    className="w-full border-none text-[18px] text-[#6b7280] placeholder:text-[#9ca3af] focus:outline-none"
                                />
                            </div>

                            <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-4">
                                {data.menu.categories
                                    .filter((category) => !activeMenuCategory || category.id === activeMenuCategory)
                                    .map((category) => {
                                        const categoryItems = filteredMenuItems.filter((item) => item.categoryId === category.id);

                                        if (categoryItems.length === 0) return null;

                                        return (
                                            <section key={category.id} className="mb-7">
                                                <h3 className="mb-4 text-[20px] font-medium uppercase text-[#8b929c]">
                                                    {category.label}
                                                </h3>
                                                <div>
                                                    {categoryItems.map((item) => (
                                                        <article
                                                            key={item.id}
                                                            className="grid grid-cols-[84px_minmax(0,1fr)_140px_56px] items-center gap-5 border-b border-[#f0f0f0] py-3.5"
                                                        >
                                                            <img src={item.image} alt={item.name} className="h-[64px] w-[64px] rounded-[4px] object-cover" />
                                                            <div className="min-w-0">
                                                                <h4 className="truncate text-[20px] font-bold text-[#3b3b3b]">{item.name}</h4>
                                                                <p className="mt-1 line-clamp-2 text-[14px] text-[#6d6d6d]">{item.note}</p>
                                                            </div>
                                                            <div className="text-right text-[18px] font-bold text-[#2aa8f4]">{item.price}</div>
                                                            <button className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] bg-[#ff5a2c] text-[30px] leading-none text-white transition hover:bg-[#ef4b1d]">
                                                                +
                                                            </button>
                                                        </article>
                                                    ))}
                                                </div>
                                            </section>
                                        );
                                    })}
                            </div>

                            <div className="pointer-events-none absolute bottom-10 right-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border border-[#dadada] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                                <div className="text-[42px]">🛍️</div>
                                <div className="absolute bottom-[6px] right-[6px] flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5a2c] text-[32px] leading-none text-white">
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
                    <div className="w-full max-w-[460px] rounded-[28px] bg-white p-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#98ab92]">
                                    Đặt món
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-[#285e19]">
                                    Đăng nhập để tiếp tục
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="rounded-full bg-[#f1f2f1] p-2 text-[#616462] transition hover:bg-[#e5e7e5]"
                                aria-label="Đóng popup"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>

                        <p className="mt-4 text-[15px] leading-7 text-[#5f655f]">
                            Bạn đang xem DishNet với vai trò khách vãng lai. Đăng nhập để lưu món yêu thích,
                            xem menu chi tiết và hoàn tất đơn hàng.
                        </p>

                        <div className="mt-6 rounded-[22px] bg-[#f7faf6] p-4">
                            <div className="flex items-center gap-4">
                                <img src={data.orderPreview.image} alt={data.orderPreview.title} className="h-20 w-24 rounded-[14px] object-cover" />
                                <div>
                                    <h3 className="text-base font-semibold text-black">{data.orderPreview.title}</h3>
                                    <p className="mt-1 text-sm text-[#616462]">{data.orderPreview.address}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <img src={homeUiAssets.ratingStars} alt="Đánh giá" className="h-5 w-20 object-contain" />
                                        <span className="text-xs font-medium text-[#616462]">{data.orderPreview.badgeText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="flex-1 rounded-full border border-[#b7afaf] px-5 py-3 text-sm font-bold text-[#616462] transition hover:border-[#8f948f]"
                            >
                                Xem sau
                            </button>
                            <a
                                href="/login"
                                className="flex-1 rounded-full bg-[#285e19] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1f4a13]"
                            >
                                Đi đến đăng nhập
                            </a>
                        </div>
                    </div>
                </div>
            )}

            <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} />
        </>
    );
}
