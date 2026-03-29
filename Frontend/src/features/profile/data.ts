import { getHomePageData } from '@/features/home/data';

export type UserProfile = {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    gender: string;
    birthday: string;
    email: string;
    phone: string;
    address: string;
    trustScore: string;
    postsCount: string;
    followers: string;
    following: string;
    isTopReviewer: boolean;
    showBadge: boolean;
    showTrustScore: boolean;
    isPrivate: boolean;
    posts: ProfilePost[];
    videos: ProfileVideo[];
};

export type ProfilePost = {
    id: string;
    date: string;
    content: string;
    images: string[];
    likes: string;
    comments: string;
    shares: string;
    sends: string;
};

export type ProfileVideo = {
    id: string;
    image: string;
    views: string;
    pinned?: boolean;
};

const videoThumbs = [
    'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
];

export async function getCurrentUserProfile(): Promise<UserProfile> {
    const homeData = await getHomePageData();
    const avatar = homeData.feedPosts[0]?.authorAvatar ?? '';

    const basePosts = homeData.feedPosts.map((post, index) => ({
        id: `my-post-${index + 1}`,
        date: post.date,
        content: `${post.review}\n\nQuán phục vụ khá nhanh, gọi món tầm 5–7 phút là có. Không gian tuy không quá rộng nhưng sạch sẽ, ấm cúng. Mình nghĩ đây sẽ là lựa chọn ổn cho bữa trưa. Lần sau nhất định sẽ quay lại!`,
        images: [post.images[0], post.images[1]],
        likes: index === 0 ? '2,4K' : '2,1K',
        comments: index === 0 ? '415' : '368',
        shares: index === 0 ? '159' : '124',
        sends: index === 0 ? '51' : '47',
    }));

    const posts = Array.from({ length: 2 }, (_, cycleIndex) =>
        basePosts.map((post, postIndex) => ({
            ...post,
            id: `my-post-${cycleIndex + 1}-${postIndex + 1}`,
        })),
    ).flat();

    return {
        id: 'me',
        name: 'Vyfoodieee',
        handle: 'accclone',
        avatar,
        gender: 'Nữ',
        birthday: '22/06/2004',
        email: 'vythi930309@gmail.com',
        phone: '0386755402',
        address: '40 nguyễn như hạnh, phường hòa minh, quận liên chiểu, tỉnh đà nẵng',
        trustScore: '4.9',
        postsCount: '106',
        followers: '51,2k',
        following: '10',
        isTopReviewer: true,
        showBadge: true,
        showTrustScore: true,
        isPrivate: false,
        posts,
        videos: Array.from({ length: 8 }, (_, index) => ({
            id: `my-video-${index + 1}`,
            image: videoThumbs[index % videoThumbs.length],
            views: ['14.2K', '1.5M', '993.9K', '591', '2035', '135.8K', '54.4K', '16.6K'][index % 8],
            pinned: index < 3,
        })),
    };
}
