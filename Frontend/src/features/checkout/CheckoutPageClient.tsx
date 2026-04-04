'use client';

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import {
    formatCurrency,
    getCartDiscount,
    getCartShipping,
    getCartSubtotal,
    getCartTotal,
    readMockCart,
    type MockCart,
    type MockCartGroup,
    type MockCartItem,
} from '@/components/Cart/mockCart';

function ChevronLeftIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
            <path
                d="M15 5 8 12l7 7"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
            />
        </svg>
    );
}

function PencilIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M4 20h4l10-10-4-4L4 16v4Zm9.5-13.5 4 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.9"
            />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M5 7h14M9 7V5h6v2m-7 3v7m4-7v7m4-7v7M7 7l1 12h8l1-12"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function WalletIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M4 7.5A2.5 2.5 0 0 1 6.5 5H19v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Zm0 0h12.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
            <circle cx="15.5" cy="12" r="1.2" fill="currentColor" />
        </svg>
    );
}

function TicketIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
            <path
                d="M7 6h10a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8a2 2 0 0 1 2-2Zm4 0v12"
                fill="none"
                stroke="currentColor"
                strokeDasharray="2 2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
            />
        </svg>
    );
}

function SelectChevronIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#6b7280]">
            <path
                d="m7 10 5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
}

function OrderItemsCard({ groups }: { groups: MockCartGroup[] }) {
    const selectedItems = groups.flatMap((group) => group.items.map((item) => ({ ...item, groupName: group.name })));

    return (
        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
            <div className="border-b border-[#ececec] px-6 py-4 text-center text-[18px] font-bold text-black">
                Đơn hàng ({selectedItems.length})
            </div>

            <div className="divide-y divide-[#eeeeee] px-5">
                {selectedItems.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                ))}
            </div>

            <div className="border-t border-[#ececec] px-6 py-4 text-center">
                <button type="button" className="text-[16px] font-bold text-[#2185d5] transition hover:text-[#176ab1]">
                    Thêm món
                </button>
            </div>
        </section>
    );
}

function OrderItemRow({ item }: { item: MockCartItem & { groupName: string } }) {
    return (
        <article className="flex items-center gap-4 py-4">
            <img src={item.image} alt={item.name} className="h-[54px] w-[54px] rounded-[12px] object-cover" />
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[15px] text-black">
                    <h3 className="truncate font-medium">{item.name}</h3>
                    <button type="button" className="text-[#95a0b0] transition hover:text-[#5f6d82]" aria-label="Sửa món">
                        <PencilIcon />
                    </button>
                </div>
                <p className="mt-1 text-[14px] text-black">x{item.quantity}</p>
            </div>
            <button type="button" className="text-[#6b7280] transition hover:text-[#374151]" aria-label="Xóa món">
                <TrashIcon />
            </button>
            <div className="min-w-[88px] text-right text-[15px] font-medium text-black">{formatCurrency(item.price * item.quantity)}</div>
        </article>
    );
}

export default function CheckoutPageClient() {
    const [cart, setCart] = useState<MockCart>(() => readMockCart());
    const [recipientName, setRecipientName] = useState('Vy');
    const [phone, setPhone] = useState('0123610243');
    const [address, setAddress] = useState('Clb Đà Nẵng, 143 Nguyễn Du, P.Bến Thành');
    const [driverNote, setDriverNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('VNPAY-QR');
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        setCart(readMockCart());
    }, []);

    const selectedGroups = useMemo(
        () =>
            cart.groups
                .map((group) => ({
                    ...group,
                    items: group.items.filter((item) => item.selected),
                }))
                .filter((group) => group.items.length > 0),
        [cart],
    );
    const subtotal = useMemo(() => getCartSubtotal(cart), [cart]);
    const shipping = useMemo(() => getCartShipping(cart), [cart]);
    const discount = getCartDiscount();
    const total = useMemo(() => getCartTotal(cart), [cart]);

    return (
        <div className="bg-[#f2f2f1]">
            <section className="mx-auto w-full max-w-[1160px] px-5 pb-14 pt-6 lg:px-8">
                <div className="mb-6 flex items-center gap-3">
                    <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full text-black transition hover:bg-white" aria-label="Quay lại trang chủ">
                        <ChevronLeftIcon />
                    </Link>
                    <h1 className="text-[28px] font-bold leading-none text-black lg:text-[30px]">Thanh toán</h1>
                </div>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_320px]">
                    <div className="space-y-6">
                        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                            <div className="border-b border-[#ececec] px-6 py-4 text-center text-[18px] font-bold text-black">
                                Xác nhận thông tin giao hàng
                            </div>
                            <div className="space-y-4 px-6 py-5">
                                <label className="block">
                                    <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Tên người nhận</div>
                                    <input
                                        value={recipientName}
                                        onChange={(event) => setRecipientName(event.target.value)}
                                        className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                    />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Số điện thoại</div>
                                    <input
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                        className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                    />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Địa chỉ</div>
                                    <input
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
                                        className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition focus:border-[#cfd6df]"
                                    />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[13px] font-semibold text-[#a8adb7]">Ghi chú cho tài xế</div>
                                    <input
                                        value={driverNote}
                                        onChange={(event) => setDriverNote(event.target.value)}
                                        placeholder="VD: Bác tài vui lòng gọi trước khi giao"
                                        className="h-[42px] w-full rounded-[10px] border border-[#e3e6eb] px-4 text-[14px] text-black outline-none transition placeholder:text-[#c8ccd3] focus:border-[#cfd6df]"
                                    />
                                </label>
                            </div>
                        </section>

                        <OrderItemsCard groups={selectedGroups} />
                    </div>

                    <aside className="space-y-6">
                        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                            <div className="border-b border-[#ececec] px-5 py-4 text-[18px] font-bold leading-snug text-black">
                                Hình thức thanh toán & ưu đãi
                            </div>
                            <div className="space-y-4 px-5 py-5">
                                <div className="relative">
                                    <select
                                        value={paymentMethod}
                                        onChange={(event) => setPaymentMethod(event.target.value)}
                                        className="h-[46px] w-full appearance-none rounded-[10px] border border-[#d8dde4] bg-white pl-10 pr-10 text-[14px] text-[#495467] outline-none"
                                    >
                                        <option>VNPAY-QR</option>
                                        <option>Tiền mặt</option>
                                        <option>Ví điện tử</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#7d8898]">
                                        <WalletIcon />
                                    </div>
                                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                        <SelectChevronIcon />
                                    </div>
                                </div>

                                <div className="rounded-[12px] border border-[#d8dde4] px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="text-[#6b7280]">
                                            <TicketIcon />
                                        </div>
                                        <input
                                            value={promoCode}
                                            onChange={(event) => setPromoCode(event.target.value)}
                                            placeholder="Nhập mã khuyến mãi"
                                            className="min-w-0 flex-1 text-[14px] text-black outline-none placeholder:text-[#a7afb9]"
                                        />
                                        <button type="button" className="text-[14px] font-bold text-[#2563eb] transition hover:text-[#1d4ed8]">
                                            Chọn mã
                                        </button>
                                    </div>
                                    <p className="mt-3 text-[12px] leading-5 text-[#7b8593]">Bạn có thể áp dụng nhiều mã giảm giá một lúc</p>
                                </div>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-[20px] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                            <div className="border-b border-[#ececec] px-5 py-4 text-[18px] font-bold text-black">Thanh toán</div>
                            <div className="space-y-3 px-5 py-4 text-[15px] text-[#2d2d2d]">
                                <div className="flex items-center justify-between gap-4">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatCurrency(shipping)}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span>Giảm giá</span>
                                    <span>{formatCurrency(discount)}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-4 border-t border-[#ececec] px-5 py-4">
                                <span className="text-[18px] font-bold text-black">Tổng số tiền</span>
                                <span className="text-[19px] font-bold text-black">{formatCurrency(total)}</span>
                            </div>
                            <div className="px-5 pb-5">
                                <button
                                    type="button"
                                    className="w-full rounded-[12px] bg-[#ef2018] py-3 text-[16px] font-bold text-white transition hover:bg-[#d91e17]"
                                >
                                    ĐẶT ĐƠN
                                </button>
                            </div>
                        </section>
                    </aside>
                </div>
            </section>
        </div>
    );
}
