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
} from '@/components/Cart/mockCart';

export default function CheckoutPageClient() {
    const [cart, setCart] = useState<MockCart>(() => readMockCart());
    const [recipientName, setRecipientName] = useState('Vy');
    const [phone, setPhone] = useState('0123610243');
    const [address, setAddress] = useState('Clb Đa Năng, 143 Nguyễn Du, P.Bến Thành');
    const [driverNote, setDriverNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('VNPAY-QR');
    const [promoCode, setPromoCode] = useState('');

    useEffect(() => {
        setCart(readMockCart());
    }, []);

    const selectedGroups = useMemo(
        () => cart.groups.map((group) => ({
            ...group,
            items: group.items.filter((item) => item.selected),
        })).filter((group) => group.items.length > 0),
        [cart],
    );
    const subtotal = useMemo(() => getCartSubtotal(cart), [cart]);
    const shipping = useMemo(() => getCartShipping(cart), [cart]);
    const discount = getCartDiscount();
    const total = useMemo(() => getCartTotal(cart), [cart]);

    return (
        <div className="bg-[#f2f2f1]">
            <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-12 lg:px-16">
                <div className="flex items-center gap-4 pb-8">
                    <Link href="/" className="text-[42px] leading-none text-black">←</Link>
                    <h1 className="text-[42px] font-bold text-black lg:text-[46px]">Thanh toán</h1>
                </div>

                <div className="grid gap-10 xl:grid-cols-[minmax(0,1.6fr)_460px]">
                    <div className="space-y-8">
                        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                            <div className="border-b border-[#ebebeb] px-10 py-5 text-center text-[20px] font-bold text-black lg:text-[22px]">
                                Xác nhận thông tin giao hàng
                            </div>
                            <div className="space-y-6 px-10 py-6">
                                <label className="block">
                                    <div className="mb-2 text-[15px] font-semibold text-[#b0b0b0]">Tên người nhận</div>
                                    <input value={recipientName} onChange={(event) => setRecipientName(event.target.value)} className="h-[58px] w-full rounded-[14px] border border-[#e5e7eb] px-6 text-[16px]" />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[15px] font-semibold text-[#b0b0b0]">Số điện thoại</div>
                                    <input value={phone} onChange={(event) => setPhone(event.target.value)} className="h-[58px] w-full rounded-[14px] border border-[#e5e7eb] px-6 text-[16px]" />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[15px] font-semibold text-[#b0b0b0]">Địa chỉ</div>
                                    <input value={address} onChange={(event) => setAddress(event.target.value)} className="h-[58px] w-full rounded-[14px] border border-[#e5e7eb] px-6 text-[16px]" />
                                </label>
                                <label className="block">
                                    <div className="mb-2 text-[15px] font-semibold text-[#b0b0b0]">Ghi chú cho tài xế</div>
                                    <input value={driverNote} onChange={(event) => setDriverNote(event.target.value)} placeholder="VD: Bác tài vui lòng gọi trước khi giao" className="h-[58px] w-full rounded-[14px] border border-[#e5e7eb] px-6 text-[16px] placeholder:text-[#d2d2d2]" />
                                </label>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                            <div className="border-b border-[#ebebeb] px-10 py-5 text-center text-[20px] font-bold text-black lg:text-[22px]">
                                Đơn Hàng ({selectedGroups.reduce((sum, group) => sum + group.items.length, 0)})
                            </div>
                            <div className="divide-y divide-[#ededed] px-8">
                                {selectedGroups.flatMap((group) => group.items.map((item) => (
                                    <article key={item.id} className="flex items-center gap-5 py-5">
                                        <img src={item.image} alt={item.name} className="h-[74px] w-[74px] rounded-[14px] object-cover" />
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="truncate text-[16px] font-medium text-black">{item.name}</h3>
                                                <button type="button" className="text-[#8d98a8]">✎</button>
                                            </div>
                                            <div className="mt-1 text-[16px] text-black">x{item.quantity}</div>
                                        </div>
                                        <button type="button" className="text-[18px] text-[#2f2f2f]">🗑</button>
                                        <div className="text-[16px] font-medium text-black">{formatCurrency(item.price * item.quantity)}</div>
                                    </article>
                                )))}
                            </div>
                            <div className="border-t border-[#ededed] px-10 py-5 text-center">
                                <button type="button" className="text-[18px] font-bold text-[#1d8ce0]">Thêm món</button>
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                            <div className="border-b border-[#ebebeb] px-8 py-6 text-[20px] font-bold text-black lg:text-[22px]">
                                Hình thức thanh toán & ưu đãi
                            </div>
                            <div className="space-y-5 px-8 py-6">
                                <label className="block">
                                    <div className="flex h-[58px] items-center justify-between rounded-[14px] border border-[#d9dde3] px-5">
                                        <div className="flex items-center gap-3 text-[16px] text-[#4b5563]">
                                            <span className="text-[18px]">💳</span>
                                            <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="bg-transparent pr-8 text-[16px] text-[#4b5563]">
                                                <option>VNPAY-QR</option>
                                                <option>Tiền mặt</option>
                                                <option>Ví điện tử</option>
                                            </select>
                                        </div>
                                        <span className="text-[#6b7280]">⌄</span>
                                    </div>
                                </label>

                                <div className="rounded-[14px] border border-[#d9dde3] px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[18px] text-[#4b5563]">🎟</span>
                                        <input value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Nhập mã khuyến mãi" className="min-w-0 flex-1 text-[16px] placeholder:text-[#9ca3af]" />
                                        <button type="button" className="text-[16px] font-bold text-[#2563eb]">Chọn mã</button>
                                    </div>
                                    <p className="mt-3 text-[14px] text-[#6b7280]">Bạn có thể áp dụng nhiều mã giảm giá một lúc</p>
                                </div>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-[28px] bg-white shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                            <div className="border-b border-[#ebebeb] px-8 py-6 text-[20px] font-bold text-black lg:text-[22px]">
                                Thanh toán
                            </div>
                            <div className="space-y-4 px-8 py-5 text-[17px] text-[#2d2d2d]">
                                <div className="flex items-center justify-between">
                                    <span>Tạm tính</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Phí vận chuyển</span>
                                    <span>{formatCurrency(shipping)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Giảm giá</span>
                                    <span>{formatCurrency(discount)}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-[#ebebeb] px-8 py-5">
                                <span className="text-[20px] font-bold text-black">Tổng số tiền</span>
                                <span className="text-[24px] font-bold text-black">{formatCurrency(total)}</span>
                            </div>
                            <div className="px-8 pb-8">
                                <button type="button" className="w-full rounded-[16px] bg-[#e2231a] py-4 text-[20px] font-bold text-white transition hover:bg-[#cb1f17]">
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
