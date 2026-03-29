export type ExploreCategory = {
    id: string;
    title: string;
    image: string;
};

export type ExploreStoreCard = {
    id: string;
    categoryId: string;
    title: string;
    address: string;
    meta: string;
    status: string;
    image: string;
    rating?: string;
    distance?: string;
    featuredItem?: string;
    price?: string;
};

export type ExplorePageData = {
    categories: ExploreCategory[];
    nearby: ExploreStoreCard[];
    recommendations: ExploreStoreCard[];
    topReviewerPicks: ExploreStoreCard[];
};

export const explorePageData: ExplorePageData = {
    categories: [
        {
            id: 'drinks',
            title: 'Đồ uống',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
        },
        {
            id: 'fast-food',
            title: 'Thức Ăn Nhanh',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
        },
        {
            id: 'asian-euro',
            title: 'Món Á - Âu',
            image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=900&q=80',
        },
        {
            id: 'rice',
            title: 'Cơm',
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
        },
    ],
    nearby: [
        {
            id: 'nearby-1',
            categoryId: 'rice',
            title: 'Cơm Tấm 182 - Lê Thánh Tôn',
            address: '182 Lê Thánh Tôn, Phường Bến Thành, Quận 1',
            meta: '4,9 (37)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1625938145744-1ac947f8f4f6?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (37)',
            featuredItem: 'Cơm tấm sườn bì chả',
            price: '60.000đ',
        },
        {
            id: 'nearby-2',
            categoryId: 'fast-food',
            title: 'Bánh Mì Mẹ Ỉn - Lê Thánh Tôn',
            address: '136/13 Đường Lê Thánh Tôn, Bến Thành',
            meta: '',
            status: 'Đóng cửa',
            image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
            featuredItem: 'Bánh mì chảo',
            price: '52.000đ',
        },
        {
            id: 'nearby-3',
            categoryId: 'drinks',
            title: 'Lucky - Juice & Tea - Lê Thánh Tôn',
            address: '136G1 Lê Thánh Tôn, Phường Bến Thành',
            meta: '',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
            featuredItem: 'Trà tắc',
            price: '39.000đ',
        },
        {
            id: 'nearby-4',
            categoryId: 'rice',
            title: 'Cơm Tấm, Bún Thịt Nướng & Sinh Tố Sài Gòn Quán',
            address: '104 Lê Thánh Tôn, Phường Bến Thành, Quận 1',
            meta: '',
            status: 'Đóng cửa',
            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
            featuredItem: 'Cơm tấm đặc biệt',
            price: '59.000đ',
        },
        {
            id: 'nearby-5',
            categoryId: 'drinks',
            title: 'Louis Top Juice - Nước Ép - Trà & Sữa Hạt',
            address: '252 Nguyễn Thái Bình, Phường Bến Thành',
            meta: '4,9 (13)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (13)',
            featuredItem: 'Nước ép cần tây',
            price: '45.000đ',
        },
        {
            id: 'nearby-6',
            categoryId: 'asian-euro',
            title: 'Hủ Tiếu Nam Vang, Mì & Nui Bò Hải Sản Anh Tuấn',
            address: '80 Lê Công Kiều, Phường Nguyễn Thái Bình',
            meta: '4,3 (14)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80',
            rating: '4,3 (14)',
            featuredItem: 'Hủ tiếu hải sản',
            price: '55.000đ',
        },
        {
            id: 'nearby-7',
            categoryId: 'drinks',
            title: 'TAKA CHA - Trà Sữa & Chè Sầu Riêng',
            address: '66/1 Huỳnh Thúc Kháng, Phường Bến Thành',
            meta: '4,9 (999+)',
            status: 'Đóng cửa',
            image: 'https://images.unsplash.com/photo-1558857563-c0c3c35fd702?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (999+)',
            featuredItem: 'Trà sữa trân châu',
            price: '48.000đ',
        },
        {
            id: 'nearby-8',
            categoryId: 'asian-euro',
            title: 'Nhà Hàng Unatoto - Cơm Lươn Nhật Bản',
            address: '56 Trương Định, Phường Bến Thành, Quận 1',
            meta: '4,8 (27)',
            status: 'Đóng cửa trong 27 phút nữa',
            image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=900&q=80',
            rating: '4,8 (27)',
            featuredItem: 'Cơm lươn nhật',
            price: '69.000đ',
        },
    ],
    recommendations: [
        {
            id: 'rec-1',
            categoryId: 'drinks',
            title: 'Katinat - Phan Bội Châu',
            address: '56-58 Đường Phan Bội Châu, Bến Thành',
            meta: '4,9 (999+)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (999+)',
            featuredItem: 'Trà sữa signature',
            price: '58.000đ',
        },
        {
            id: 'rec-2',
            categoryId: 'drinks',
            title: 'Phê La - Chợ Bến Thành',
            address: '1-3 Phan Chu Trinh, Phường Bến Thành',
            meta: '4,9 (822)',
            status: 'Đóng cửa',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (822)',
            featuredItem: 'Phê sữa kem muối',
            price: '52.000đ',
        },
        {
            id: 'rec-3',
            categoryId: 'drinks',
            title: 'Highlands Coffee - 71 Lý Tự Trọng',
            address: '71 Lý Tự Trọng, Bến Thành, Quận 1',
            meta: '4,9 (165)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
            rating: '4,9 (165)',
            featuredItem: 'Freeze trà xanh',
            price: '55.000đ',
        },
        {
            id: 'rec-4',
            categoryId: 'fast-food',
            title: "Gà Rán & Burger McDonald's - Trần Hưng Đạo",
            address: '2-2A Trần Hưng Đạo, Phường Bến Thành',
            meta: '4,8 (240)',
            status: 'Đóng cửa trong 57 phút nữa',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
            rating: '4,8 (240)',
            featuredItem: 'Burger gà cay',
            price: '64.000đ',
        },
    ],
    topReviewerPicks: [
        {
            id: 'top-1',
            categoryId: 'asian-euro',
            title: 'Phở Chang - Phở Gia Truyền 13 Lò Đúc Hà Nội',
            address: '1 Bùi Thị Xuân, Phường Bến Thành, Hồ Chí Minh',
            meta: '0.3 km  5 (11)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=900&q=80',
            distance: '0.3 km',
            rating: '5 (11)',
            featuredItem: 'Phở tái lăn',
            price: '65.000đ',
        },
        {
            id: 'top-2',
            categoryId: 'asian-euro',
            title: 'Giang Quán - Hủ Tiếu, Bún & Mì Tươi',
            address: '85 Cách Mạng Tháng Tám, Phường Bến Thành',
            meta: '0.2 km',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=900&q=80',
            distance: '0.2 km',
            featuredItem: 'Hủ tiếu khô',
            price: '48.000đ',
        },
        {
            id: 'top-3',
            categoryId: 'asian-euro',
            title: 'Bánh Cuốn 232 - Lý Tự Trọng',
            address: '232 Lý Tự Trọng, Phường Bến Thành, Quận 1',
            meta: '0.2 km',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
            distance: '0.2 km',
            featuredItem: 'Bánh cuốn chả',
            price: '42.000đ',
        },
        {
            id: 'top-4',
            categoryId: 'fast-food',
            title: 'Bánh Mì Huỳnh Hoa - 26 Lê Thị Riêng',
            address: '26 Lê Thị Riêng, Phường Bến Thành, Quận 1',
            meta: '0.2 km  4,9 (999+)',
            status: 'Mở cửa vào 06:00 ngày 01/03',
            image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
            distance: '0.2 km',
            rating: '4,9 (999+)',
            featuredItem: 'Bánh mì đặc biệt',
            price: '59.000đ',
        },
        {
            id: 'top-5',
            categoryId: 'asian-euro',
            title: 'Bún Bò Gánh - Nguyễn Du',
            address: '114 Nguyễn Du, Phường Bến Thành, Hồ Chí Minh',
            meta: '0.3 km',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&w=900&q=80',
            distance: '0.3 km',
            featuredItem: 'Bún bò đặc biệt',
            price: '54.000đ',
        },
        {
            id: 'top-6',
            categoryId: 'drinks',
            title: 'Highlands Coffee - AB Tower',
            address: '76A Lê Lai, Phường Bến Thành, Quận 1',
            meta: '0.4 km  4,6 (125)',
            status: 'Mở cửa vào 07:00 ngày 01/03',
            image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80',
            distance: '0.4 km',
            rating: '4,6 (125)',
            featuredItem: 'Freeze caramel',
            price: '49.000đ',
        },
        {
            id: 'top-7',
            categoryId: 'drinks',
            title: 'Phúc Long - Phạm Hồng Thái',
            address: '42 Phạm Hồng Thái, Phường Bến Thành',
            meta: '0.4 km  4,9 (999+)',
            status: 'Mở cửa vào 07:00 ngày 01/03',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
            distance: '0.4 km',
            rating: '4,9 (999+)',
            featuredItem: 'Trà ô long sữa',
            price: '52.000đ',
        },
        {
            id: 'top-8',
            categoryId: 'drinks',
            title: 'Robusta & Matcha Loves Milk by Boom - Lê Lợi',
            address: '90 Lê Lai, Phường Bến Thành, Hồ Chí Minh',
            meta: '0.3 km  4,8 (36)',
            status: 'PROMO',
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
            distance: '0.3 km',
            rating: '4,8 (36)',
            featuredItem: 'Matcha latte',
            price: '56.000đ',
        },
    ],
};

export function getAllExploreStores(): ExploreStoreCard[] {
    return [
        ...explorePageData.nearby,
        ...explorePageData.recommendations,
        ...explorePageData.topReviewerPicks,
    ];
}

export function getExploreStoreById(id: string): ExploreStoreCard | null {
    return getAllExploreStores().find((store) => store.id === id) ?? null;
}

export function getExploreStoreIds(): string[] {
    return getAllExploreStores().map((store) => store.id);
}
