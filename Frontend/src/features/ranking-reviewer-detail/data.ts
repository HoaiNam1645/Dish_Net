import { userContentApi } from '@/shared/userContentApi';

export type ReviewerProfilePost = {
  id: string;
  date: string;
  content: string;
  images: string[];
  likes: string;
  comments: string;
  shares: string;
  sends: string;
};

export type ReviewerVideo = {
  id: string;
  image: string;
  views: string;
  pinned?: boolean;
};

export type RankingReviewerDetailData = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  trustScore: string;
  postsCount: string;
  followers: string;
  following: string;
  posts: ReviewerProfilePost[];
  videos: ReviewerVideo[];
};

export async function getRankingReviewerDetailById(id: string): Promise<RankingReviewerDetailData | null> {
  const idNguoiDung = Number(id);
  if (!Number.isFinite(idNguoiDung) || idNguoiDung <= 0) return null;

  const [profilePayload, postPayload, videoPayload] = await Promise.all([
    userContentApi.layThongTinTrangCaNhan(idNguoiDung) as Promise<any>,
    userContentApi.layNoiDungTrangCaNhan(idNguoiDung, { tab: 'bai_viet', trang: 1, so_luong: 20 }) as Promise<any>,
    userContentApi.layNoiDungTrangCaNhan(idNguoiDung, { tab: 'video', trang: 1, so_luong: 20 }) as Promise<any>,
  ]);

  const info = profilePayload?.thong_tin_co_ban;
  if (!info) return null;

  const posts = (Array.isArray(postPayload?.du_lieu) ? postPayload.du_lieu : []).map((item: any) => ({
    id: String(item.id),
    date: item.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
    content: String(item.noi_dung ?? ''),
    images: Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem : [],
    likes: String(item.tong_luot_thich ?? 0),
    comments: String(item.tong_luot_binh_luan ?? 0),
    shares: String(item.tong_luot_chia_se ?? 0),
    sends: '0',
  }));

  const videos = (Array.isArray(videoPayload?.du_lieu) ? videoPayload.du_lieu : []).map((item: any) => ({
    id: String(item.id),
    image: (Array.isArray(item.tep_dinh_kem) ? item.tep_dinh_kem[0] : null) || 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=800&q=80',
    views: String(item.tong_luot_thich ?? 0),
  }));

  return {
    id: String(info.id),
    name: info.ten_hien_thi || 'Người dùng',
    handle: info.ten_tai_khoan || `user-${info.id}`,
    avatar: info.anh_dai_dien || 'https://i.pravatar.cc/180',
    trustScore: '0',
    postsCount: String(info.so_bai_viet ?? posts.length),
    followers: String(info.so_nguoi_theo_doi ?? 0),
    following: String(info.so_nguoi_dang_theo_doi ?? 0),
    posts,
    videos,
  };
}

export type ReviewerConversation = {
  id: string;
  reviewerName: string;
  reviewerHandle: string;
  avatar: string;
  lastSeen: string;
  messages: Array<{ id: string; from: 'me' | 'them'; text: string; time: string }>;
};

export async function getReviewerConversationById(id: string): Promise<ReviewerConversation | null> {
  const reviewer = await getRankingReviewerDetailById(id);
  if (!reviewer) return null;

  return {
    id,
    reviewerName: reviewer.name,
    reviewerHandle: reviewer.handle,
    avatar: reviewer.avatar,
    lastSeen: '',
    messages: [],
  };
}
