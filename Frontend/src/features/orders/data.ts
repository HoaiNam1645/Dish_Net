export type OrderTabKey = 'placed' | 'purchased' | 'cancelled' | 'returned' | 'review';
export type OrderStageKey = 'ordered' | 'preparing' | 'delivering' | 'delivered';

export type UserOrder = {
    id: string;
    storeName: string;
    itemName: string;
    quantity: number;
    image: string;
    unitPrice: string;
    totalPrice: string;
    timeLabel: string;
    statusLabel: string;
    orderNumber: string;
    paymentMethod: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    activeStage?: OrderStageKey;
    cancelledReason?: string;
    orderedAt?: string;
    paidAt?: string;
    deliveredAt?: string;
    quickRating?: number;
    canRefund?: boolean;
    canReview?: boolean;
    received?: boolean;
    cancelledAt?: string;
    cancelledBy?: string;
    refundStatus?: string;
    refundReason?: string;
};

export const orderTabs: Array<{ key: OrderTabKey; label: string }> = [
    { key: 'placed', label: 'Đã đặt' },
    { key: 'purchased', label: 'Đã mua' },
    { key: 'cancelled', label: 'Đã hủy' },
    { key: 'returned', label: 'Trả hàng' },
    { key: 'review', label: 'Đánh giá' },
];

export const stageLabels: Array<{ key: OrderStageKey; label: string }> = [
    { key: 'ordered', label: 'Đã đặt hàng' },
    { key: 'preparing', label: 'Bếp đang chuẩn bị' },
    { key: 'delivering', label: 'Đang trên đường giao' },
    { key: 'delivered', label: 'Đã giao đơn hàng' },
];

const placedOrders: UserOrder[] = [
    {
        id: 'order-1',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:35 CH',
        statusLabel: 'Đang trên đường giao',
        orderNumber: '120453210259431',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        activeStage: 'delivering',
    },
    {
        id: 'order-2',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:35 CH',
        statusLabel: 'Chờ xác nhận',
        orderNumber: '120453210259432',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        activeStage: 'ordered',
    },
];

const purchasedOrders: UserOrder[] = [
    {
        id: 'purchased-1',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:55 CH',
        statusLabel: 'Đã giao đơn hàng',
        orderNumber: '120453210259431',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        activeStage: 'delivered',
        orderedAt: '24 tháng 2 2026, 07:10 CH',
        paidAt: '24 tháng 2 2026, 07:11 CH',
        deliveredAt: '24 tháng 2 2026, 07:40 CH',
        quickRating: 0,
        canRefund: true,
        canReview: true,
        received: false,
    },
    {
        id: 'purchased-2',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:55 CH',
        statusLabel: 'Đã giao đơn hàng',
        orderNumber: '120453210259433',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        activeStage: 'delivered',
        orderedAt: '24 tháng 2 2026, 07:10 CH',
        paidAt: '24 tháng 2 2026, 07:11 CH',
        deliveredAt: '24 tháng 2 2026, 07:40 CH',
        quickRating: 0,
        canRefund: false,
        canReview: false,
        received: true,
    },
];

const cancelledOrders: UserOrder[] = [
    {
        id: 'cancelled-1',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:35 CH',
        statusLabel: 'Đã hủy',
        orderNumber: '120453210259431',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        cancelledAt: '24 - 02 - 2026 07:35 CH',
        cancelledBy: 'Người mua',
        cancelledReason: 'Đặt nhầm',
        refundStatus: 'Đã xử lý hoàn tiền',
    },
];

const returnedOrders: UserOrder[] = [
    {
        id: 'returned-1',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '07:35 CH',
        statusLabel: 'Đã hoàn tiền',
        orderNumber: '120453210259434',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        refundStatus: 'Đã xử lý hoàn tiền',
        refundReason: 'Món không giống mô tả',
        cancelledBy: 'Người mua',
        cancelledAt: '24 - 02 - 2026 07:35 CH',
    },
    {
        id: 'returned-2',
        storeName: 'Nét Huế - Hàng Bông',
        itemName: 'Bún bò Huế số 1',
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=240&q=80',
        unitPrice: '56.000đ',
        totalPrice: '56.000đ',
        timeLabel: '08:10 CH',
        statusLabel: 'Chưa hoàn tiền',
        orderNumber: '120453210259435',
        paymentMethod: 'VN-PAY',
        customerName: 'Quỳnh Vy',
        customerPhone: '(+84) 012*****02',
        customerAddress: '10 Nguyễn Như Hạnh, Phường Hòa Khánh, Đà Nẵng, Việt Nam',
        refundStatus: 'Chưa hoàn tiền',
        refundReason: 'Món bị thiếu / giao sai',
        cancelledBy: 'Người mua',
        cancelledAt: '24 - 02 - 2026 07:35 CH',
    },
];

export const userOrdersByTab: Record<OrderTabKey, UserOrder[]> = {
    placed: placedOrders,
    purchased: purchasedOrders,
    cancelled: cancelledOrders,
    returned: returnedOrders,
    review: [],
};

export const cancelReasonOptions = [
    'Thay đổi ý định / không muốn mua nữa',
    'Muốn đổi món / đặt lại đơn khác',
    'Thời gian giao quá lâu',
    'Đặt nhầm đơn',
    'Giá cao / phí ship cao hơn dự kiến',
    'Nhập sai địa chỉ giao hàng',
];

export const refundReasonOptions = [
    'Món bị thiếu / giao sai',
    'Món không giống mô tả',
    'Thức ăn bị hỏng / có mùi lạ',
    'Quán tự hủy nhưng vẫn trừ tiền',
    'Không liên hệ được nhưng tự hủy đơn',
    'Shipper làm đổ món/ hư món',
];
