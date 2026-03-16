import type { HomePageData } from './types';

const heroBanner =
    'https://www.figma.com/api/mcp/asset/1f15bd31-f3dc-40fd-9e27-b6c9c6ed0603';
const dishCollage =
    'https://www.figma.com/api/mcp/asset/6c83e42d-044d-4b75-bf76-8d92b9b33ad2';
const storeImage =
    'https://www.figma.com/api/mcp/asset/b4659418-7eb8-4a4b-97be-06fcfbac9479';
const avatarSmall =
    'https://www.figma.com/api/mcp/asset/092b3565-0fd5-402f-b11f-bbaf9d1a3914';
const reviewerAvatar =
    'https://www.figma.com/api/mcp/asset/82d47201-0b50-4cc3-84a0-de11c7816a7f';
const feedDishImage =
    'https://www.figma.com/api/mcp/asset/4ecfd72d-e0e1-4ecb-85ac-4aa8517b408e';
const menuItemImage =
    'https://www.figma.com/api/mcp/asset/39c76dc1-fc29-4753-9fa2-8e2b099120b5';

const homePageMockData: HomePageData = {
    hero: {
        eyebrow: 'Gợi ý cho khách vãng lai',
        title: 'Deal Hôm Nay',
        description:
            'Khám phá những quán đang lên xu hướng, ưu đãi nổi bật và các bài review mới nhất trên DishNet.',
        ctaLabel: 'Xem thêm',
        backgroundImage: heroBanner,
        collageImage: dishCollage,
    },
    filters: ['Danh mục', 'Ẩm thực', 'Quận / Huyện'],
    rankings: {
        stores: [
            { rank: '1', name: 'Bún Bò Gốc Đa', metric: '4.9 / 1.2K đã bán', popularity: '100 người đã ghé' },
            { rank: '2', name: 'Nét Huế Hàng Bông', metric: '4.8 / 950 đã bán', popularity: '92 người đã ghé' },
            { rank: '3', name: 'Bún Chả Cửa Đông', metric: '4.7 / 810 đã bán', popularity: '88 người đã ghé' },
            { rank: '4', name: 'Phở Gánh 1986', metric: '4.7 / 770 đã bán', popularity: '77 người đã ghé' },
            { rank: '5', name: 'Mì Vịt Tiềm An Nam', metric: '4.6 / 690 đã bán', popularity: '73 người đã ghé' },
            { rank: '6', name: 'Bánh Mì Bơm', metric: '4.6 / 640 đã bán', popularity: '68 người đã ghé' },
        ],
        reviewers: [
            { rank: '1', name: '@vy.fooodieee', metric: '128 bài review', popularity: '12.8K người theo dõi' },
            { rank: '2', name: '@anngonmoi', metric: '102 bài review', popularity: '10.1K người theo dõi' },
            { rank: '3', name: '@eatsaigon', metric: '94 bài review', popularity: '9.4K người theo dõi' },
            { rank: '4', name: '@motngayangi', metric: '88 bài review', popularity: '8.9K người theo dõi' },
            { rank: '5', name: '@banhcuonclub', metric: '79 bài review', popularity: '8.1K người theo dõi' },
            { rank: '6', name: '@mlem.chronicle', metric: '74 bài review', popularity: '7.2K người theo dõi' },
        ],
    },
    spotlightCards: [
        {
            id: 'spotlight-1',
            title: 'Bún Bò Gốc Đa',
            area: 'Khu AAAAA',
            address: '4 Ngõ Gạch, Quận Hoàn Kiếm, Hà Nội',
            excerpt:
                "Mình ăn ở quán khá nhiều lần nhưng hôm nay mới thử đặt ship trên website. Từ lúc quán confirm đơn đến lúc nhận đồ chỉ khoảng 20'.",
            coverImage: storeImage,
            reviewerAvatar: avatarSmall,
        },
        {
            id: 'spotlight-2',
            title: 'Nét Huế Hàng Bông',
            area: 'Khu phố cổ',
            address: '12 Hàng Bông, Quận Hoàn Kiếm, Hà Nội',
            excerpt:
                'Nước dùng đậm vị, topping đầy đặn và giao diện đặt món rất rõ ràng. Đây là quán mình quay lại nhiều nhất trong tháng này.',
            coverImage: storeImage,
            reviewerAvatar: avatarSmall,
        },
    ],
    feedPosts: [
        {
            id: 'feed-1',
            author: '@vy.fooodieee',
            authorAvatar: reviewerAvatar,
            date: '22 thg 02, 2026',
            rating: '4.6',
            review:
                'Sau lần ăn thử tại Nét Huế, mình cảm nhận quán bún bò này rất đáng để thử. Nước dùng đậm đà, thơm mùi sả, topping đầy đặn với thịt bò, chả Huế, gân bò mềm ngon và cả tiết bò tươi. Giá hơi nhỉnh một chút nhưng hoàn toàn tương xứng với chất lượng.',
            followLabel: 'Follow +',
            tags: ['Ngon', 'Nên thử', 'Đậm vị'],
            images: [feedDishImage, feedDishImage],
        },
        {
            id: 'feed-2',
            author: '@eatsaigon',
            authorAvatar: reviewerAvatar,
            date: '24 thg 02, 2026',
            rating: '4.8',
            review:
                'Điểm mình thích nhất là phần nước dùng rất tròn vị, không bị ngấy. Không gian không quá rộng nhưng sạch và lên món nhanh. Nếu đi nhóm 2 đến 4 người thì rất hợp.',
            followLabel: 'Follow +',
            tags: ['No lâu', 'Quán sạch', 'Giá ổn'],
            images: [feedDishImage, feedDishImage],
        },
    ],
    orderPreview: {
        title: 'Bún Bò Gốc Đa',
        address: '4 Ngõ Gạch, Hoàn Kiếm, Hà Nội',
        image: storeImage,
        badgeText: 'Món nổi bật hôm nay',
    },
    menu: {
        title: 'Thực đơn',
        categories: [
            { id: 'bun', label: 'Món bún' },
            { id: 'com', label: 'Món cơm' },
            { id: 'chao', label: 'Món cháo' },
            { id: 'banh', label: 'Món bánh' },
            { id: 'cuon', label: 'Món cuốn' },
            { id: 'an-choi', label: 'Món ăn chơi' },
            { id: 'lau', label: 'Món lẩu' },
            { id: 'che', label: 'Món chè' },
            { id: 'nuoc-ep', label: 'Nước ép-sinh tố-trà' },
            { id: 'nuoc-ngot', label: 'Nước ngọt' },
        ],
        items: [
            { id: 'bun-1', categoryId: 'bun', name: 'Bún Bò Huế Số 1', price: '56.160đ', note: 'Giá đã bao gồm 10% VAT', image: menuItemImage },
            { id: 'bun-4', categoryId: 'bun', name: 'Bún Bò Huế Số 4', price: '79.920đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'bun-2', categoryId: 'bun', name: 'Bún Bò Huế Số 2', price: '66.960đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'bun-db', categoryId: 'bun', name: 'Bún Bò Huế Đặc Biệt', price: '103.680đ', note: 'Giá đã bao gồm 8% VAT', image: menuItemImage },
            { id: 'com-1', categoryId: 'com', name: 'Cơm Thịt Bò Rang Giòn', price: '99.360đ', note: 'Cơm rang, trứng, thịt bò, hành lá, dưa, cà rốt, củ cải muối kèm 1 canh chua thịt', image: menuItemImage },
            { id: 'com-2', categoryId: 'com', name: 'Cơm Thịt Luộc Tôm Chua', price: '77.760đ', note: 'Cơm trắng, thịt ba chỉ luộc, tôm chua Huế, rau xào, củ quả luộc, cải thảo muối kèm 1 canh chua thịt', image: menuItemImage },
            { id: 'com-3', categoryId: 'com', name: 'Cơm Thịt Kho Nước Dừa', price: '73.440đ', note: 'Cơm trắng, thịt ba chỉ kho dừa già, nước dừa, rau xào, củ quả luộc, cải thảo muối kèm 1 canh chua thịt', image: menuItemImage },
        ],
    },
};

export async function getHomePageData(): Promise<HomePageData> {
    return homePageMockData;
}
