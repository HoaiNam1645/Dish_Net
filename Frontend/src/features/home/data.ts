import type { HomePageData } from './types';
import { figmaFallbackAssets } from '@/shared/assets/figmaFallback';
import { userContentApi } from '@/shared/userContentApi';

const heroBanner = figmaFallbackAssets.heroBanner;
const dishCollage = figmaFallbackAssets.dishCollage;
const storeImage = figmaFallbackAssets.storeImage;
const reviewerAvatar = figmaFallbackAssets.reviewerAvatarA;
const feedDishImage = figmaFallbackAssets.feedDishImage;

export const homePageBaseData: HomePageData = {
    hero: {
        eyebrow: 'Khám phá ẩm thực',
        title: 'Deal Hôm Nay',
        description:
            'Khám phá những quán đang lên xu hướng, ưu đãi nổi bật và các bài review mới nhất trên DishNet.',
        ctaLabel: 'Xem thêm',
        backgroundImage: heroBanner,
        collageImage: dishCollage,
    },
    filters: ['Danh mục', 'Ẩm thực', 'Quận / Huyện'],
    rankings: {
        stores: [],
        reviewers: [],
    },
    spotlightCards: [],
    feedPosts: [],
    orderPreview: {
        title: '',
        address: '',
        image: storeImage,
        badgeText: '',
    },
    menu: {
        title: 'Thực đơn',
        categories: [],
        items: [],
    },
};

export async function getHomePageData(): Promise<HomePageData> {
    try {
        const [feedPayload, miniPayload] = await Promise.all([
            userContentApi.layBangTin({ trang: 1, so_luong: 12 }) as Promise<any>,
            userContentApi.layBangXepHangMini({ so_luong: 6 }) as Promise<any>,
        ]);

        const deals = Array.isArray(feedPayload?.deal_hom_nay) ? feedPayload.deal_hom_nay : [];

        const feedPosts = Array.isArray(feedPayload?.bai_viet)
            ? feedPayload.bai_viet.map((item: any) => ({
                id: String(item.id),
                authorId: Number(item?.thong_tin_nguoi_dang?.id || 0),
                storeId: item?.cua_hang?.id != null ? Number(item.cua_hang.id) : undefined,
                storeName: item?.cua_hang?.ten_cua_hang ? String(item.cua_hang.ten_cua_hang) : undefined,
                author: item?.thong_tin_nguoi_dang?.ten_hien_thi || 'Người dùng',
                authorAvatar: item?.thong_tin_nguoi_dang?.anh_dai_dien || reviewerAvatar,
                date: item?.ngay_dang ? new Date(item.ngay_dang).toLocaleDateString('vi-VN') : '',
                rating: Number(item?.so_sao || 0).toFixed(1),
                review: item?.noi_dung || '',
                followLabel: 'Follow +',
                tags: [],
                images: (Array.isArray(item?.tep_dinh_kem) && item.tep_dinh_kem.length > 0
                    ? item.tep_dinh_kem
                    : [feedDishImage, feedDishImage]).slice(0, 2),
            }))
            : [];

        const spotlightCards = deals.map((deal: any, index: number) => ({
            id: `deal-${deal.id ?? index + 1}`,
            storeId: deal?.cua_hang?.id != null ? Number(deal.cua_hang.id) : undefined,
            title: String(deal?.cua_hang?.ten_cua_hang ?? deal?.ten_khuyen_mai ?? 'Deal hôm nay'),
            area: String(deal?.ma_khuyen_mai ?? 'Khuyến mãi'),
            address: String(deal?.cua_hang?.ten_cua_hang ?? 'DishNet'),
            excerpt: String(deal?.ten_khuyen_mai ?? 'Ưu đãi đặc biệt đang diễn ra'),
            coverImage: deal?.mon_goi_y?.hinh_anh || deal?.cua_hang?.anh_dai_dien || feedDishImage,
            reviewerAvatar,
            galleryImages: [
                deal?.mon_goi_y?.hinh_anh || feedDishImage,
                deal?.cua_hang?.anh_dai_dien || storeImage,
                feedDishImage,
                storeImage,
            ],
        }));

        const menuCategories = deals.map((deal: any, index: number) => ({
            id: String(deal?.id ?? index + 1),
            label: String(deal?.cua_hang?.ten_cua_hang ?? `Deal ${index + 1}`),
        }));
        const menuItems = deals
            .filter((deal: any) => deal?.mon_goi_y)
            .map((deal: any) => ({
                id: String(deal.mon_goi_y.id),
                name: String(deal.mon_goi_y.ten_mon ?? 'Món gợi ý'),
                price: `${Number(deal.mon_goi_y.gia_sau_giam ?? deal.mon_goi_y.gia_ban ?? 0).toLocaleString('vi-VN')}đ`,
                note: `${String(deal.ten_khuyen_mai ?? 'Khuyến mãi')} (${String(deal.ma_khuyen_mai ?? '')})`.trim(),
                image: String(deal.mon_goi_y.hinh_anh ?? feedDishImage),
                categoryId: String(deal.id),
            }));

        const stores = Array.isArray(miniPayload?.cua_hang) ? miniPayload.cua_hang : [];
        const reviewers = Array.isArray(miniPayload?.reviewer) ? miniPayload.reviewer : [];

        const firstDeal = deals[0];

        return {
            ...homePageBaseData,
            rankings: {
                stores: stores.map((item: any) => ({
                    rank: String(item.xep_hang),
                    name: item.ten_cua_hang,
                    metric: `${Number(item.diem_danh_gia || 0).toFixed(1)} / ${item.so_don_hang || 0} đã bán`,
                    popularity: `Tỷ lệ hủy ${Number(item.ty_le_huy_don || 0).toFixed(2)}%`,
                })),
                reviewers: reviewers.map((item: any) => ({
                    rank: String(item.xep_hang),
                    name: item.ten_reviewer,
                    metric: `${item.luot_xem || 0} lượt xem`,
                    popularity: `${item.luot_thich || 0} lượt thích`,
                })),
            },
            feedPosts,
            spotlightCards,
            orderPreview: {
                title: String(firstDeal?.mon_goi_y?.ten_mon ?? firstDeal?.ten_khuyen_mai ?? ''),
                address: String(firstDeal?.cua_hang?.ten_cua_hang ?? ''),
                image: firstDeal?.mon_goi_y?.hinh_anh || firstDeal?.cua_hang?.anh_dai_dien || storeImage,
                badgeText: firstDeal?.ma_khuyen_mai ? `Mã: ${firstDeal.ma_khuyen_mai}` : '',
            },
            menu: {
                title: 'Thực đơn',
                categories: menuCategories,
                items: menuItems,
            },
        };
    } catch {
        return homePageBaseData;
    }
}
