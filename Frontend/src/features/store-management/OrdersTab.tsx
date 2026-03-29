'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type OrderTabKey = 'pending' | 'preparing' | 'delivering' | 'delivered' | 'cancelled' | 'returned';

interface StoreOrder {
    id: string;
    code: string;
    customer: string;
    customerPhone: string;
    customerDate: string;
    customerImage: string;
    items: { name: string; qty: number; price: string }[];
    toppings: { name: string; qty: number; price: string }[];
    subtotal: string;
    shippingFee: string;
    discount: string;
    paymentMethod: string;
    totalValue: string;
    deliveryAddress: string;
    remainingMinutes: string;
    tag: 'Mới' | 'Sắp trễ' | 'Quá giờ';
    status: OrderTabKey;
    review?: { rating: number; text: string; images: string[] };
    cancelInfo?: { requestBy: string; requestAt: string; reason: string; refund: string };
    returnInfo?: { requestBy: string; requestAt: string; reason: string; description: string; refund: 'pending' | 'approved' | 'rejected'; rejectReason?: string };
}

const ORDER_TABS: { key: OrderTabKey; label: string }[] = [
    { key: 'pending', label: 'Chờ xác nhận' },
    { key: 'preparing', label: 'Đang chuẩn bị' },
    { key: 'delivering', label: 'Đang giao' },
    { key: 'delivered', label: 'Đã giao' },
    { key: 'cancelled', label: 'Đã hủy' },
    { key: 'returned', label: 'Trả hàng' },
];

const TAB_STYLE_ACTIVE: Record<OrderTabKey, string> = {
    pending: 'bg-[#d32f2f] text-white',
    preparing: 'border-2 border-[#333] text-black font-bold',
    delivering: 'border-2 border-[#333] text-black font-bold',
    delivered: 'border-2 border-[#333] text-black font-bold',
    cancelled: 'border border-[#d32f2f] text-[#d32f2f] font-bold',
    returned: 'border border-[#d32f2f] text-[#d32f2f] font-bold',
};

const STATUS_BADGE: Record<OrderTabKey, { text: string; cls: string }> = {
    pending: { text: '⏳ Chờ xác nhận', cls: 'border border-[#d32f2f] text-[#d32f2f]' },
    preparing: { text: 'Đang chuẩn bị', cls: 'border border-[#333] text-black' },
    delivering: { text: 'Đang giao', cls: 'border border-[#333] text-black' },
    delivered: { text: 'Đã giao', cls: 'bg-[#2e7d32] text-white' },
    cancelled: { text: 'Đã hủy', cls: 'bg-[#d32f2f] text-white' },
    returned: { text: 'Trả hàng', cls: 'bg-[#f0a050] text-white' },
};

const PROCESS_FILTER = ['Tất cả đơn', 'Đơn mới nhất', '⏳ Đơn sắp trễ', '🚨 Đơn quá giờ'] as const;
const REJECT_REASONS = ['Hết món', 'Quán quá tải', 'Ngoài khu vực phục vụ', 'Món tạm ngưng bán', 'Hết nguyên liệu', 'Khác'];
const REFUND_REJECT_REASONS = ['Không có bằng chứng hợp lệ', 'Món ăn vẫn đạt chất lượng khi giao', 'Thông tin khiếu nại không rõ ràng', 'Lỗi không thuộc về cửa hàng', 'Không liên hệ được với khách để xác minh', 'Khác'];
const PREP_TIMES = ['15 phút', '20 phút', '30 phút', 'Nhập thời gian'];
const EXTEND_TIMES = ['5 phút', '10 phút', '15 phút', 'Khác'];

const IMG = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=80&h=80&fit=crop';
const IMG2 = 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=80&h=80&fit=crop';

/* ═══════════════════════════════════════════
   INITIAL DATA
   ═══════════════════════════════════════════ */
const INITIAL_ORDERS: StoreOrder[] = [
    // Pending
    {
        id: 'p1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '05:00', tag: 'Mới', status: 'pending',
    },
    {
        id: 'p2', code: 'QA0035', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '02:15', tag: 'Mới', status: 'pending',
    },
    // Preparing
    {
        id: 'pr1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '25:00', tag: 'Mới', status: 'preparing',
    },
    {
        id: 'pr2', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '01:00', tag: 'Mới', status: 'preparing',
    },
    {
        id: 'pr3', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '25:00', tag: 'Mới', status: 'preparing',
    },
    // Delivering
    {
        id: 'd1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivering',
    },
    {
        id: 'd2', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivering',
    },
    {
        id: 'd3', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivering',
    },
    // Delivered
    {
        id: 'dv1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivered',
        review: { rating: 4, text: 'Ổn', images: [IMG, IMG2] },
    },
    {
        id: 'dv2', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivered',
        review: { rating: 5, text: 'Rất ngon!', images: [IMG] },
    },
    {
        id: 'dv3', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG,
        items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }],
        toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }],
        subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ',
        deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng',
        remainingMinutes: '', tag: 'Mới', status: 'delivered',
    },
    // Cancelled
    { id: 'c1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'cancelled', cancelInfo: { requestBy: 'Người mua', requestAt: '04/03/2026 10:03 SA', reason: 'Đặt nhầm', refund: 'Đã hoàn tiền' } },
    { id: 'c2', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'cancelled', cancelInfo: { requestBy: 'Chủ cửa hàng', requestAt: '04/03/2026 10:03 SA', reason: 'Hết món', refund: 'Đã hoàn tiền' } },
    { id: 'c3', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'cancelled', cancelInfo: { requestBy: 'Người mua', requestAt: '04/03/2026 10:03 SA', reason: 'Đặt nhầm', refund: 'Đã hoàn tiền' } },
    // Returned
    { id: 'r1', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '58.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'returned', returnInfo: { requestBy: 'Người mua', requestAt: '04/03/2026 10:45 SA', reason: 'Món bị hỏng', description: 'Bún bị đổ hết khi nhận', refund: 'approved' } },
    { id: 'r2', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'returned', returnInfo: { requestBy: 'Người mua', requestAt: '04/03/2026 10:45 SA', reason: 'Món bị hỏng', description: 'Bún bị đổ hết khi nhận', refund: 'pending' } },
    { id: 'r3', code: 'QA0034', customer: 'Nguyễn Văn A', customerPhone: '012*****02', customerDate: '04/03/2026 10:02 SA', customerImage: IMG, items: [{ name: 'Bún bò Huế số 1', qty: 1, price: '56.000đ' }], toppings: [{ name: 'Chả', qty: 1, price: '15.000đ' }], subtotal: '71.000đ', shippingFee: '31.000đ', discount: '0đ', paymentMethod: 'VN-Pay', totalValue: '143.000đ', deliveryAddress: '40 Nguyễn Như Hạnh, phường Hòa Khánh, Đà Nẵng', remainingMinutes: '', tag: 'Mới', status: 'returned', returnInfo: { requestBy: 'Người mua', requestAt: '04/03/2026 10:45 SA', reason: 'Món bị hỏng', description: 'Bún bị đổ hết khi nhận', refund: 'approved' } },
];

/* ═══════════════════════════════════════════
   CONFIRM ORDER MODAL
   ═══════════════════════════════════════════ */
function ConfirmOrderModal({ order, onClose, onConfirm, onReject }: {
    order: StoreOrder; onClose: () => void; onConfirm: () => void; onReject: () => void;
}) {
    const [prepTime, setPrepTime] = useState('15 phút');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div /><h3 className="text-[17px] font-bold text-[#2e7d32]">XÁC NHẬN ĐƠN HÀNG</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <div className="rounded-[10px] border border-[#e8e8e8] p-4">
                        <p className="text-[14px] font-bold text-black">Mã đơn : #{order.code}</p>
                        <div className="mt-3">
                            <p className="text-[13px] font-bold text-black">Chi tiết đơn :</p>
                            {order.items.map((item, i) => (
                                <div key={i} className="mt-1 flex justify-between text-[13px] text-black">
                                    <span>{item.name}   x{item.qty}</span><span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                        {order.toppings.length > 0 && (
                            <div className="mt-3">
                                <p className="text-[13px] font-bold text-black">Topping thêm :</p>
                                {order.toppings.map((t, i) => (
                                    <div key={i} className="mt-1 flex justify-between text-[13px] text-black">
                                        <span>{t.name} x{t.qty}</span><span>{t.price}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="mt-3">
                            <p className="text-[13px] font-bold text-black">Ghi chú của Khách hàng :</p>
                            <textarea readOnly defaultValue="không có" className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] bg-[#f8f8f8] px-3 py-2 text-[13px] text-[#555] outline-none" rows={2} />
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-[14px] font-bold text-black">Chọn thời gian chuẩn bị món</p>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                            {PREP_TIMES.map((t) => (
                                <label key={t} className="flex cursor-pointer items-center gap-2">
                                    <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${prepTime === t ? 'border-[#2e7d32]' : 'border-[#ccc]'}`}>
                                        {prepTime === t && <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />}
                                    </span>
                                    <span className="text-[13px] text-black">{t}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onConfirm} className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">Xác nhận</button>
                        <button type="button" onClick={onReject} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   REJECT REASON MODAL
   ═══════════════════════════════════════════ */
function RejectReasonModal({ onClose, onReject }: { onClose: () => void; onReject: () => void }) {
    const [reason, setReason] = useState('');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[460px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div /><h3 className="text-[17px] font-bold text-black">CHỌN LÝ DO</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <div className="rounded-[10px] border border-[#e8e8e8]">
                        {REJECT_REASONS.map((r) => (
                            <label key={r} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]">
                                <span className="text-[14px] text-black">{r}</span>
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${reason === r ? 'border-[#333]' : 'border-[#ccc]'}`}>
                                    {reason === r && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={onReject} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   EXTEND TIME MODAL
   ═══════════════════════════════════════════ */
function ExtendTimeModal({ onClose, onExtend }: { onClose: () => void; onExtend: () => void }) {
    const [time, setTime] = useState('');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[460px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div /><h3 className="text-[17px] font-bold text-black">Bạn muốn gia hạn thêm bao lâu ?</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <div className="rounded-[10px] border border-[#e8e8e8]">
                        {EXTEND_TIMES.map((t) => (
                            <label key={t} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]">
                                <span className="text-[14px] text-black">{t}</span>
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${time === t ? 'border-[#333]' : 'border-[#ccc]'}`}>
                                    {time === t && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={() => { onExtend(); onClose(); }} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Gia hạn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   REJECT REFUND MODAL
   ═══════════════════════════════════════════ */
function RejectRefundModal({ onClose, onReject }: { onClose: () => void; onReject: (reason: string) => void }) {
    const [reason, setReason] = useState('');
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div /><h3 className="text-[17px] font-bold text-black">CHỌN LÝ DO</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <div className="rounded-[10px] border border-[#e8e8e8]">
                        {REFUND_REJECT_REASONS.map((r) => (
                            <label key={r} className="flex cursor-pointer items-center justify-between border-b border-[#f0f0f0] px-4 py-3.5 last:border-b-0 hover:bg-[#f8f8f8]">
                                <span className="text-[14px] text-black">{r}</span>
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${reason === r ? 'border-[#333]' : 'border-[#ccc]'}`}>
                                    {reason === r && <span className="h-2.5 w-2.5 rounded-full bg-[#333]" />}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={() => onReject(reason)} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CUSTOMER REVIEW MODAL
   ═══════════════════════════════════════════ */
function ReviewModal({ order, onClose }: { order: StoreOrder; onClose: () => void }) {
    const review = order.review;
    if (!review) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[520px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div /><h3 className="text-[17px] font-bold text-black">Đánh giá của khách hàng</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    {/* Customer info + rating */}
                    <div className="flex items-center gap-3">
                        <img src={order.customerImage} alt={order.customer} className="h-12 w-12 rounded-full object-cover" />
                        <div className="flex-1">
                            <p className="text-[14px] font-semibold text-black">{order.customer}</p>
                            <p className="flex items-center gap-1 text-[12px] text-[#2e7d32]">📞 {order.customerPhone}</p>
                            <p className="text-[12px] text-[#888]">{order.items[0]?.name}   x{order.items[0]?.qty}</p>
                        </div>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`text-[20px] ${i < review.rating ? 'text-[#f0a050]' : 'text-[#ddd]'}`}>★</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 border-t border-[#f0f0f0] pt-4">
                        <p className="text-[13px] font-medium text-black">Phản hồi của khách hàng</p>
                        <textarea readOnly value={review.text} className="mt-2 w-full resize-none rounded-[8px] border border-[#e0e0e0] bg-[#f8f8f8] px-3 py-2 text-[14px] text-[#555] outline-none" rows={3} />
                        <p className="text-right text-[11px] text-[#999]">{review.text.length}/300</p>
                    </div>

                    {review.images.length > 0 && (
                        <div className="mt-3">
                            <p className="text-[13px] font-medium text-black">Hình ảnh</p>
                            <div className="mt-2 flex gap-3">
                                {review.images.map((img, i) => (
                                    <img key={i} src={img} alt={`review-${i}`} className="h-24 w-28 rounded-[8px] object-cover" />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   ORDER CARD
   ═══════════════════════════════════════════ */
function OrderCard({ order, onConfirm, onReject, onDeliver, onExtend, onViewReview, onViewDetail, onApproveRefund, onRejectRefund }: {
    order: StoreOrder;
    onConfirm: (id: string) => void;
    onReject: (id: string) => void;
    onDeliver: (id: string) => void;
    onExtend: (id: string) => void;
    onViewReview: (id: string) => void;
    onViewDetail: (id: string) => void;
    onApproveRefund: (id: string) => void;
    onRejectRefund: (id: string) => void;
}) {
    const tagColor = order.tag === 'Mới' ? 'bg-[#2e7d32] text-white' : order.tag === 'Sắp trễ' ? 'bg-[#f0a050] text-white' : 'bg-[#d32f2f] text-white';
    const badge = STATUS_BADGE[order.status];

    return (
        <div className="rounded-[12px] border border-[#e8e8e8] bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-3">
                <div className="flex items-center gap-3">
                    <span className="text-[18px]">{order.status === 'preparing' || order.status === 'delivering' || order.status === 'delivered' ? '✅' : '🔔'}</span>
                    <span className="text-[15px] font-bold text-black">Mã đơn : #{order.code}</span>
                    {order.status === 'pending' && <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${tagColor}`}>{order.tag}</span>}
                    {order.status === 'preparing' && <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${tagColor}`}>{order.tag}</span>}
                </div>
                <span className={`rounded-[6px] px-3 py-1 text-[12px] font-semibold ${badge.cls}`}>{badge.text}</span>
            </div>

            {/* Body */}
            <div className="flex gap-5 px-5 py-4">
                {/* Left */}
                <div className="flex-1">
                    <div className="flex items-start gap-3">
                        <img src={order.customerImage} alt={order.customer} className="h-14 w-14 rounded-[8px] object-cover" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-black">{order.customer}</span>
                                <span className="text-[11px] text-[#999]">{order.customerDate}</span>
                            </div>
                            {order.items.map((item, i) => (
                                <p key={i} className="mt-1 text-[13px] text-black">{item.name}   x{item.qty}<span className="ml-8 text-[#888]">{item.price}</span></p>
                            ))}
                            {order.toppings.length > 0 && (
                                <>
                                    <p className="mt-1 text-[12px] font-medium text-black">Topping thêm :</p>
                                    {order.toppings.map((t, i) => (
                                        <p key={i} className="text-[12px] text-black">{t.name} x{t.qty}<span className="ml-8 text-[#888]">{t.price}</span></p>
                                    ))}
                                </>
                            )}
                            <div className="mt-2 space-y-1 text-[12px] text-[#555]">
                                <div className="flex justify-between"><span>Tạm tính</span><span>{order.subtotal}</span></div>
                                <div className="flex justify-between"><span>Phí vận chuyển</span><span>{order.shippingFee}</span></div>
                                <div className="flex justify-between"><span>Giảm giá</span><span>{order.discount}</span></div>
                                <div className="flex justify-between"><span>Phương thức thanh toán</span><span>{order.paymentMethod}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex w-[240px] shrink-0 flex-col items-end gap-0">
                    {/* === PENDING / PREPARING / DELIVERING / DELIVERED === */}
                    {(order.status === 'pending' || order.status === 'preparing' || order.status === 'delivering' || order.status === 'delivered') && (
                        <>
                            <p className="text-[12px] text-[#555]">Tổng giá trị đơn :</p>
                            <p className="text-[18px] font-bold text-[#d32f2f]">{order.totalValue}</p>
                        </>
                    )}
                    {order.status === 'pending' && (
                        <div className="mt-2 flex gap-1.5">
                            <button type="button" onClick={() => onConfirm(order.id)} className="rounded-[6px] bg-[#2e7d32] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#256b28]">Xác nhận</button>
                            <button type="button" onClick={() => onReject(order.id)} className="rounded-[6px] bg-[#d32f2f] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                        </div>
                    )}
                    {order.status === 'preparing' && (
                        <div className="mt-2 flex gap-1.5">
                            <button type="button" onClick={() => onDeliver(order.id)} className="rounded-[6px] bg-[#2e7d32] px-4 py-1.5 text-[12px] font-bold uppercase text-white transition hover:bg-[#256b28]">GIAO</button>
                            <button type="button" onClick={() => onExtend(order.id)} className="rounded-[6px] border border-[#2e7d32] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#2e7d32] transition hover:bg-[#f6faf4]">Gia hạn</button>
                        </div>
                    )}
                    {order.status === 'delivering' && (
                        <button type="button" disabled className="mt-2 cursor-not-allowed rounded-[6px] bg-[#333] px-4 py-1.5 text-[12px] font-semibold text-white opacity-90">Chờ khách xác nhận</button>
                    )}
                    {order.status === 'delivered' && order.review && (
                        <button type="button" onClick={() => onViewReview(order.id)} className="mt-2 rounded-[6px] border border-[#d32f2f] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#d32f2f] transition hover:bg-[#fff3f3]">Xem đánh giá khách hàng</button>
                    )}

                    {/* === CANCELLED === */}
                    {order.status === 'cancelled' && order.cancelInfo && (
                        <div className="w-full">
                            <button type="button" onClick={() => onViewDetail(order.id)} className="mb-1.5 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
                            <h4 className="text-[13px] font-bold text-black">Lý do hủy món</h4>
                            <div className="mt-1.5 space-y-0.5 text-[12px]">
                                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.cancelInfo.requestBy}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu vào</span><span className="text-black">{order.cancelInfo.requestAt}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Lý do hủy</span><span className="text-black">{order.cancelInfo.reason}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Hoàn tiền</span><span className="text-[#2e7d32] font-semibold">{order.cancelInfo.refund}</span></div>
                            </div>
                        </div>
                    )}

                    {/* === RETURNED === */}
                    {order.status === 'returned' && order.returnInfo && (
                        <div className="w-full">
                            <button type="button" onClick={() => onViewDetail(order.id)} className="mb-1.5 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
                            <h4 className="text-[13px] font-bold text-black">Thông tin khiếu nại</h4>
                            <div className="mt-1.5 space-y-0.5 text-[12px]">
                                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu bởi</span><span className="text-black">{order.returnInfo.requestBy}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Yêu cầu vào</span><span className="text-black">{order.returnInfo.requestAt}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Lý do trả hàng</span><span className="text-black">{order.returnInfo.reason}</span></div>
                                <div className="flex justify-between"><span className="text-[#888]">Mô tả</span><span className="text-black">{order.returnInfo.description}</span></div>
                                {order.returnInfo.refund === 'approved' && (
                                    <div className="flex justify-between"><span className="text-[#888]">Hoàn tiền</span><span className="text-[#2e7d32] font-semibold">Đã hoàn tiền</span></div>
                                )}
                                {order.returnInfo.refund === 'rejected' && (
                                    <div className="flex justify-between"><span className="text-[#888]">Lý do từ chối</span><span className="text-black">{order.returnInfo.rejectReason}</span></div>
                                )}
                            </div>
                            {order.returnInfo.refund === 'pending' && (
                                <div className="mt-2 flex gap-1.5">
                                    <button type="button" onClick={() => onApproveRefund(order.id)} className="rounded-[6px] bg-[#2e7d32] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#256b28]">Duyệt hoàn tiền</button>
                                    <button type="button" onClick={() => onRejectRefund(order.id)} className="rounded-[6px] bg-[#d32f2f] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#b71c1c]">Từ chối</button>
                                </div>
                            )}
                        </div>
                    )}

                    {order.status !== 'cancelled' && order.status !== 'returned' && (
                        <button type="button" onClick={() => onViewDetail(order.id)} className="mt-2 text-[11px] text-[#555] underline transition hover:text-black">Xem chi tiết đơn hàng →</button>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-[#f0f0f0] px-5 py-3">
                <div className="flex items-center gap-2 text-[12px] text-[#555]">
                    <span>📍</span><span>Giao tới : {order.deliveryAddress}</span>
                </div>
                {order.status === 'pending' && order.remainingMinutes && (
                    <span className="text-[14px] font-bold text-[#d32f2f]">Còn {order.remainingMinutes} phút để xác nhận</span>
                )}
                {order.status === 'preparing' && order.remainingMinutes && (
                    <span className="text-[14px] font-bold text-[#d32f2f]">Còn {order.remainingMinutes} phút để chuẩn bị</span>
                )}
                {order.status === 'cancelled' && order.cancelInfo && (
                    <span className="text-[14px] font-bold text-[#2e7d32]">ĐÃ HOÀN TIỀN</span>
                )}
                {order.status === 'returned' && order.returnInfo?.refund === 'approved' && (
                    <span className="text-[14px] font-bold text-[#2e7d32]">ĐÃ HOÀN TIỀN</span>
                )}
                {order.status === 'returned' && order.returnInfo?.refund === 'rejected' && (
                    <span className="text-[14px] font-bold text-[#d32f2f]">TỪ CHỐI HOÀN TIỀN</span>
                )}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   ORDERS TAB
   ═══════════════════════════════════════════ */
export default function OrdersTab({ onViewOrderDetail }: { onViewOrderDetail?: (code: string) => void }) {
    const [orders, setOrders] = useState<StoreOrder[]>(INITIAL_ORDERS);
    const [activeTab, setActiveTab] = useState<OrderTabKey>('pending');
    const [searchText, setSearchText] = useState('');
    const [processFilter, setProcessFilter] = useState<string>(PROCESS_FILTER[0]);
    const [processOpen, setProcessOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [confirmOrder, setConfirmOrder] = useState<StoreOrder | null>(null);
    const [rejectOrder, setRejectOrder] = useState<StoreOrder | null>(null);
    const [extendOrder, setExtendOrder] = useState<StoreOrder | null>(null);
    const [reviewOrder, setReviewOrder] = useState<StoreOrder | null>(null);
    const [rejectRefundOrder, setRejectRefundOrder] = useState<StoreOrder | null>(null);

    const tabCounts = useMemo(() => {
        const counts: Record<OrderTabKey, number> = { pending: 0, preparing: 0, delivering: 0, delivered: 0, cancelled: 0, returned: 0 };
        orders.forEach((o) => counts[o.status]++);
        return counts;
    }, [orders]);

    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            if (o.status !== activeTab) return false;
            if (searchText && !o.code.toLowerCase().includes(searchText.toLowerCase()) && !o.customer.toLowerCase().includes(searchText.toLowerCase())) return false;
            return true;
        });
    }, [orders, activeTab, searchText]);

    const handleConfirm = (id: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'preparing' as OrderTabKey } : o)));
        setConfirmOrder(null);
    };
    const handleReject = (id: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' as OrderTabKey } : o)));
        setRejectOrder(null);
    };
    const handleDeliver = (id: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'delivering' as OrderTabKey } : o)));
    };
    const handleCustomerReceived = (id: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'delivered' as OrderTabKey } : o)));
    };
    const handleApproveRefund = (id: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id && o.returnInfo ? { ...o, returnInfo: { ...o.returnInfo, refund: 'approved' } } : o)));
    };
    const handleRejectRefund = (id: string, reason: string) => {
        setOrders((prev) => prev.map((o) => (o.id === id && o.returnInfo ? { ...o, returnInfo: { ...o.returnInfo, refund: 'rejected', rejectReason: reason } } : o)));
        setRejectRefundOrder(null);
    };

    // Build filter label based on tab
    const showProcessFilter = activeTab === 'pending';
    const showSortFilter = activeTab === 'delivering' || activeTab === 'delivered' || activeTab === 'cancelled' || activeTab === 'returned';

    return (
        <div>
            <h1 className="text-[22px] font-bold uppercase text-black">ĐƠN ĐẶT HÀNG</h1>

            {/* Tab bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
                {ORDER_TABS.map((tab) => {
                    const count = tabCounts[tab.key];
                    const isActive = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                                isActive ? TAB_STYLE_ACTIVE[tab.key] : 'border border-[#ddd] text-[#888] hover:border-[#999]'
                            }`}
                        >
                            {tab.label} ({count})
                        </button>
                    );
                })}
            </div>

            {/* Filters */}
            <div className="mt-4 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm mã đơn, tên khách..." className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]" />
                </div>
                <div className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
                    <span>{showSortFilter ? 'Thời gian' : 'Hôm nay'}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </div>
                <div className="relative">
                    <button type="button" onClick={() => setProcessOpen(!processOpen)} className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
                        <span>{showSortFilter ? 'Sắp xếp' : 'Đơn cần xử lý'}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {processOpen && showProcessFilter && (
                        <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[180px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                            {PROCESS_FILTER.map((f) => (
                                <button key={f} type="button" onClick={() => { setProcessFilter(f); setProcessOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${processFilter === f ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{f}</button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Orders */}
            <div className="mt-5 space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
                        <p className="text-[15px] text-[#999]">Không có đơn hàng nào</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onConfirm={(id) => { const o = orders.find((x) => x.id === id); if (o) setConfirmOrder(o); }}
                            onReject={(id) => { const o = orders.find((x) => x.id === id); if (o) setRejectOrder(o); }}
                            onDeliver={handleDeliver}
                            onExtend={(id) => { const o = orders.find((x) => x.id === id); if (o) setExtendOrder(o); }}
                            onViewReview={(id) => { const o = orders.find((x) => x.id === id); if (o) setReviewOrder(o); }}
                            onViewDetail={(id) => { const o = orders.find((x) => x.id === id); if (o && onViewOrderDetail) onViewOrderDetail(o.code); }}
                            onApproveRefund={handleApproveRefund}
                            onRejectRefund={(id) => { const o = orders.find((x) => x.id === id); if (o) setRejectRefundOrder(o); }}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
                <div className="mt-5 flex items-center justify-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">‹</button>
                    {[1, 2, 3, 4, 5, 6].map((p) => (
                        <button key={p} type="button" onClick={() => setCurrentPage(p)} className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage === p ? 'bg-[#2e7d32] font-bold text-white' : 'text-[#555] hover:bg-[#f0f0f0]'}`}>{p}</button>
                    ))}
                    <span className="px-1 text-[13px] text-[#999]">...</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">›</button>
                </div>
            )}

            {/* Modals */}
            {confirmOrder && (
                <ConfirmOrderModal
                    order={confirmOrder}
                    onClose={() => setConfirmOrder(null)}
                    onConfirm={() => handleConfirm(confirmOrder.id)}
                    onReject={() => { setConfirmOrder(null); setRejectOrder(confirmOrder); }}
                />
            )}
            {rejectOrder && <RejectReasonModal onClose={() => setRejectOrder(null)} onReject={() => handleReject(rejectOrder.id)} />}
            {extendOrder && <ExtendTimeModal onClose={() => setExtendOrder(null)} onExtend={() => {}} />}
            {reviewOrder && <ReviewModal order={reviewOrder} onClose={() => setReviewOrder(null)} />}
            {rejectRefundOrder && <RejectRefundModal onClose={() => setRejectRefundOrder(null)} onReject={(reason) => handleRejectRefund(rejectRefundOrder.id, reason)} />}
        </div>
    );
}
