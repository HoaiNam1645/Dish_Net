'use client';

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

import { cancelReasonOptions, orderTabs, refundReasonOptions, stageLabels, type OrderTabKey, type UserOrder, userOrdersByTab } from '@/features/orders/data';

function canCancelOrder(order: UserOrder) {
    return order.statusLabel === 'Chờ xác nhận';
}

function CancelOrderModal({
    order,
    onClose,
    onConfirm,
}: {
    order: UserOrder;
    onClose: () => void;
    onConfirm: (payload: { reason: string; bankName: string; bankAccount: string; bankOwner: string }) => void;
}) {
    const [selectedReason, setSelectedReason] = useState(cancelReasonOptions[0]);
    const [bankName, setBankName] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankOwner, setBankOwner] = useState('');

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div
                className="w-full max-w-[950px] rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#e9ecef] px-10 py-6">
                    <h2 className="mx-auto text-[24px] font-bold uppercase text-black">Bạn muốn hủy đơn hàng này ?</h2>
                    <button type="button" onClick={onClose} className="text-[42px] leading-none text-[#3d3d3d]">
                        ×
                    </button>
                </div>

                <div className="px-12 py-6">
                    <div className="text-[20px] font-medium text-black">Chọn lý do hủy đơn</div>
                    <div className="mt-4 overflow-hidden rounded-[18px] border border-[#dde3e8]">
                        {cancelReasonOptions.map((reason) => (
                            <button
                                key={reason}
                                type="button"
                                onClick={() => setSelectedReason(reason)}
                                className="flex w-full items-center justify-between border-b border-[#e8edf1] px-5 py-4 text-left text-[16px] text-black last:border-b-0"
                            >
                                <span>{reason}</span>
                                <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${selectedReason === reason ? 'border-[#2f6f25] text-[#2f6f25]' : 'border-[#bababa] text-transparent'}`}>
                                    ●
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 text-[20px] font-bold text-black">Tài khoản ngân hàng bạn muốn tiền hoàn về</div>
                    <div className="mt-5 space-y-4">
                        <input
                            value={bankName}
                            onChange={(event) => setBankName(event.target.value)}
                            placeholder="Ngân hàng"
                            className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]"
                        />
                        <input
                            value={bankAccount}
                            onChange={(event) => setBankAccount(event.target.value)}
                            placeholder="Số tài khoản"
                            className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]"
                        />
                        <input
                            value={bankOwner}
                            onChange={(event) => setBankOwner(event.target.value)}
                            placeholder="Chủ tài khoản"
                            className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]"
                        />
                    </div>

                    <div className="mt-7 flex justify-center">
                        <button
                            type="button"
                            onClick={() => onConfirm({ reason: selectedReason, bankName, bankAccount, bankOwner })}
                            className="rounded-[10px] bg-[#299a2e] px-10 py-4 text-[18px] font-bold text-white transition hover:bg-[#208324]"
                        >
                            Xác nhận hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RefundRequestModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (payload: { reason: string; bankName: string; bankAccount: string; bankOwner: string }) => void;
}) {
    const [selectedReason, setSelectedReason] = useState(refundReasonOptions[0]);
    const [bankName, setBankName] = useState('');
    const [bankAccount, setBankAccount] = useState('');
    const [bankOwner, setBankOwner] = useState('');

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div className="w-full max-w-[950px] rounded-[24px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-[#e9ecef] px-10 py-6">
                    <h2 className="mx-auto text-[24px] font-bold uppercase text-black">Yêu cầu hoàn tiền</h2>
                    <button type="button" onClick={onClose} className="text-[42px] leading-none text-[#3d3d3d]">×</button>
                </div>
                <div className="px-12 py-6">
                    <div className="text-[20px] font-medium text-black">Chọn lý do</div>
                    <div className="mt-4 overflow-hidden rounded-[18px] border border-[#dde3e8]">
                        {refundReasonOptions.map((reason) => (
                            <button
                                key={reason}
                                type="button"
                                onClick={() => setSelectedReason(reason)}
                                className="flex w-full items-center justify-between border-b border-[#e8edf1] px-5 py-4 text-left text-[16px] text-black last:border-b-0"
                            >
                                <span>{reason}</span>
                                <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${selectedReason === reason ? 'border-[#2f6f25] text-[#2f6f25]' : 'border-[#bababa] text-transparent'}`}>●</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-8 text-[20px] font-bold text-black">Tài khoản ngân hàng bạn muốn tiền hoàn về</div>
                    <div className="mt-5 space-y-4">
                        <input value={bankName} onChange={(event) => setBankName(event.target.value)} placeholder="Ngân hàng" className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]" />
                        <input value={bankAccount} onChange={(event) => setBankAccount(event.target.value)} placeholder="Số tài khoản" className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]" />
                        <input value={bankOwner} onChange={(event) => setBankOwner(event.target.value)} placeholder="Chủ tài khoản" className="h-[58px] w-full rounded-[4px] border border-[#e5e7eb] px-5 text-[16px] placeholder:text-[#bcbcbc]" />
                    </div>
                    <div className="mt-7 flex justify-center">
                        <button type="button" onClick={() => onSubmit({ reason: selectedReason, bankName, bankAccount, bankOwner })} className="rounded-[10px] bg-[#299a2e] px-14 py-4 text-[18px] font-bold text-white transition hover:bg-[#208324]">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewModal({
    order,
    onClose,
    onSubmit,
}: {
    order: UserOrder;
    onClose: () => void;
    onSubmit: (payload: { rating: number; content: string; isAnonymous: boolean }) => void;
}) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div className="w-full max-w-[820px] rounded-[24px] bg-white px-10 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]" onClick={(event) => event.stopPropagation()}>
                <div className="relative border-b border-[#e9ecef] pb-4 text-center text-[28px] font-medium text-black">
                    Viết đánh giá
                    <button type="button" onClick={onClose} className="absolute right-0 top-0 text-[42px] leading-none text-[#3d3d3d]">×</button>
                </div>
                <div className="border-b border-[#e9ecef] py-6">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="text-[30px]">🏪</div>
                            <div>
                                <div className="text-[22px] font-semibold text-black">{order.storeName}</div>
                                <div className="mt-3 flex items-center gap-4">
                                    <img src={order.image} alt={order.itemName} className="h-[62px] w-[62px] rounded-[14px] object-cover" />
                                    <div className="text-[18px] text-black">{order.itemName}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[24px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} type="button" onClick={() => setRating(star)} className={star <= rating ? 'text-[#f6b600]' : 'text-[#4b4b4b]'}>
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <div className="text-[18px] font-medium text-black">Chia sẻ suy nghĩ của bạn</div>
                    <div className="mt-3 rounded-[4px] border border-[#e5e7eb] p-4">
                        <textarea
                            value={content}
                            onChange={(event) => setContent(event.target.value.slice(0, 300))}
                            placeholder="Bạn có thích món ăn này không ?"
                            className="h-[120px] w-full resize-none text-[16px] placeholder:text-[#c4c4c4]"
                        />
                        <div className="text-right text-[14px] text-[#c4c4c4]">{content.length}/300</div>
                    </div>
                    <div className="mt-5 text-[18px] font-medium text-black">Thêm ảnh hoặc video</div>
                    <button type="button" className="mt-3 flex h-[96px] w-full items-center justify-center rounded-[20px] border border-[#d4d4d4] bg-[#efefef] text-[54px] text-black">📷</button>
                    <label className="mt-6 flex items-center gap-3 text-[16px] text-black">
                        <input type="checkbox" checked={isAnonymous} onChange={(event) => setIsAnonymous(event.target.checked)} className="h-6 w-6 rounded border border-[#bdbdbd]" />
                        Đăng ẩn danh
                    </label>
                    <div className="mt-7 flex justify-center">
                        <button type="button" onClick={() => onSubmit({ rating, content, isAnonymous })} className="rounded-[999px] bg-[#299a2e] px-20 py-4 text-[18px] font-bold text-white transition hover:bg-[#208324]">
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EmptyOrdersState() {
    return (
        <div className="flex min-h-[620px] items-center justify-center rounded-[22px] bg-white px-8 text-center shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
            <div>
                <div className="mx-auto flex h-[116px] w-[116px] items-center justify-center rounded-[28px] bg-[#eef7ff] text-[52px]">
                    📝
                </div>
                <h2 className="mt-8 text-[24px] font-bold text-black">Quên chưa đặt món rồi nè bạn ơi ?</h2>
                <p className="mx-auto mt-4 max-w-[560px] text-[18px] leading-[1.55] text-[#5f6f60]">
                    Bạn sẽ nhìn thấy các món đang được chuẩn bị hoặc giao đi tại đây để kiểm tra đơn hàng nhanh hơn !
                </p>
            </div>
        </div>
    );
}

function OrderListCard({
    order,
    activeTab,
    onViewDetail,
    onCancel,
    onRefund,
    onReview,
}: {
    order: UserOrder;
    activeTab: OrderTabKey;
    onViewDetail: () => void;
    onCancel: () => void;
    onRefund: () => void;
    onReview: () => void;
}) {
    if (activeTab === 'review') {
        return (
            <article className="rounded-[20px] bg-white px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[28px]">🏪</span>
                        <div>
                            <h3 className="text-[22px] font-semibold text-black">{order.storeName}</h3>
                            <p className="mt-1 text-[14px] text-[#777]">{order.timeLabel} {order.statusLabel}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[16px] font-semibold text-black">{order.totalPrice}</p>
                        <p className="mt-1 text-[14px] text-[#7a7a7a]">
                            {order.canReview ? 'Chưa đánh giá' : `Đã đánh giá ${order.quickRating ?? 5}/5`}
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex items-center gap-5 rounded-[18px] border border-[#edf0eb] bg-[#fafcf9] px-5 py-4">
                    <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                    <div className="min-w-0 flex-1">
                        <div className="text-[17px] text-black">{order.itemName}</div>
                        <div className="mt-1 text-[15px] text-[#4b4b4b]">x{order.quantity}</div>
                        <div className="mt-3 flex items-center gap-1 text-[20px]">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} type="button" onClick={onReview} className={star <= (order.quickRating ?? 0) ? 'text-[#f6b600]' : 'text-[#4b4b4b]'}>
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onReview}
                        className={`min-w-[170px] rounded-full px-6 py-2.5 text-[14px] font-semibold transition ${
                            order.canReview
                                ? 'bg-[#ff2f18] text-white hover:bg-[#e32813]'
                                : 'border border-[#d7d7d7] bg-white text-black hover:bg-[#f7f7f7]'
                        }`}
                    >
                        {order.canReview ? 'Thêm đánh giá' : 'Xem / sửa đánh giá'}
                    </button>
                </div>
            </article>
        );
    }

    if (order.statusLabel === 'Đã hủy') {
        return (
            <article className="rounded-[20px] bg-white px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[28px]">🏪</span>
                        <h3 className="text-[22px] font-semibold text-black">{order.storeName}</h3>
                    </div>
                    <p className="text-[18px] font-bold text-[#df2a1f]">Đã hủy</p>
                </div>

                <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_150px] items-center gap-5">
                    <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                    <div>
                        <div className="text-[17px] text-black">{order.itemName}</div>
                        <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[16px] text-black">{order.unitPrice}</div>
                        <div className="mt-3 text-[16px] text-black">Tổng: <span className="ml-3">{order.totalPrice}</span></div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-4">
                    <button type="button" onClick={onViewDetail} className="min-w-[200px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]">
                        Xem chi tiết đơn hủy
                    </button>
                    <button type="button" className="min-w-[160px] rounded-full border border-[#44aa4b] bg-[#e7f3e4] px-6 py-2.5 text-[14px] font-semibold text-[#2d992f]">
                        Mua lại
                    </button>
                </div>
            </article>
        );
    }

    if (order.refundStatus) {
        return (
            <article className="rounded-[20px] bg-white px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[28px]">🏪</span>
                        <h3 className="text-[22px] font-semibold text-black">{order.storeName}</h3>
                    </div>
                    <p className="text-[18px] font-bold text-[#df2a1f]">{order.statusLabel}</p>
                </div>

                <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_190px] items-center gap-5">
                    <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                    <div>
                        <div className="text-[17px] text-black">{order.itemName}</div>
                        <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[16px] text-black">{order.unitPrice}</div>
                        <div className="mt-3 text-[16px] text-black">Tổng số tiền hoàn: <span className="ml-3">{order.totalPrice}</span></div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-4">
                    <button type="button" onClick={onViewDetail} className="min-w-[200px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]">
                        Xem chi tiết đơn
                    </button>
                    <button type="button" className="min-w-[160px] rounded-full border border-[#44aa4b] bg-[#e7f3e4] px-6 py-2.5 text-[14px] font-semibold text-[#2d992f]">
                        Mua lại
                    </button>
                </div>
            </article>
        );
    }

    if (order.statusLabel === 'Đã giao đơn hàng') {
        return (
            <article className="rounded-[20px] bg-white px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[28px]">🏪</span>
                        <h3 className="text-[22px] font-semibold text-black">{order.storeName}</h3>
                    </div>
                    <p className="text-[15px] text-[#494949]">{order.timeLabel} {order.statusLabel}</p>
                </div>

                <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_150px] items-center gap-5">
                    <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                    <div>
                        <div className="text-[17px] text-black">{order.itemName}</div>
                        <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[16px] text-black">{order.unitPrice}</div>
                        <div className="mt-3 text-[16px] text-black">Tổng: <span className="ml-3">{order.totalPrice}</span></div>
                    </div>
                </div>

                <div className="mt-5 flex justify-end gap-4">
                    <button type="button" onClick={onViewDetail} className="min-w-[200px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]">
                        Xem chi tiết đơn
                    </button>
                    {order.canReview ? (
                        <button type="button" onClick={onReview} className="min-w-[160px] rounded-full bg-[#ff2f18] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#e32813]">
                            Viết đánh giá
                        </button>
                    ) : (
                        <button type="button" className="min-w-[160px] rounded-full bg-[#299a2e] px-6 py-2.5 text-[14px] font-semibold text-white">
                            Đã nhận
                        </button>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between rounded-[16px] bg-[#f5f5f5] px-8 py-3">
                    <span className="text-[15px] text-black">Đánh giá nhanh</span>
                    <div className="flex items-center gap-1 text-[22px] text-[#4b4b4b]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onClick={onReview} className={star <= (order.quickRating ?? 0) ? 'text-[#f6b600]' : ''}>
                                ★
                            </button>
                        ))}
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="rounded-[20px] bg-white px-7 py-6 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
            <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-[28px]">🏪</span>
                    <h3 className="text-[22px] font-semibold text-black">{order.storeName}</h3>
                </div>
                <p className="text-[15px] text-[#494949]">
                    {order.timeLabel} {order.statusLabel}
                </p>
            </div>

            <div className="mt-5 grid grid-cols-[84px_minmax(0,1fr)_150px] items-center gap-5">
                <img src={order.image} alt={order.itemName} className="h-[72px] w-[72px] rounded-[16px] object-cover" />
                <div>
                    <div className="text-[17px] text-black">{order.itemName}</div>
                    <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                </div>
                <div className="text-right">
                    <div className="text-[16px] text-black">{order.unitPrice}</div>
                    <div className="mt-3 text-[16px] text-black">
                        Tổng: <span className="ml-3">{order.totalPrice}</span>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onViewDetail}
                    className="min-w-[200px] rounded-full border border-[#d7d7d7] bg-white px-6 py-2.5 text-[15px] font-semibold text-black transition hover:bg-[#f7f7f7]"
                >
                    Xem chi tiết đơn
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={!canCancelOrder(order)}
                    className={`min-w-[160px] rounded-full border px-6 py-2.5 text-[14px] font-semibold ${
                        canCancelOrder(order)
                            ? 'border-[#d7d7d7] bg-white text-[#4a4a4a] transition hover:bg-[#f7f7f7]'
                            : 'cursor-not-allowed border-[#d7d7d7] bg-[#f1f1f1] text-[#a8a8a8]'
                    }`}
                >
                    Hủy đơn hàng
                </button>
            </div>
        </article>
    );
}

function OrderDetail({
    order,
    onBack,
    onCancel,
    onRefund,
    onReview,
}: {
    order: UserOrder;
    onBack: () => void;
    onCancel: () => void;
    onRefund: () => void;
    onReview: () => void;
}) {
    const activeStageIndex = stageLabels.findIndex((stage) => stage.key === order.activeStage);

    if (order.statusLabel === 'Đã hủy') {
        return (
            <div className="rounded-[22px] bg-white px-9 py-7 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <button type="button" onClick={onBack} className="flex items-center gap-3 text-[18px] text-black">
                    <span className="text-[30px] leading-none">←</span>
                    <span className="font-medium">Đơn Hàng : {order.storeName}</span>
                </button>

                <div className="mt-8 rounded-[18px] bg-[#f5f5f5] px-8 py-4">
                    <div className="text-[18px] font-bold text-black">Đã Hủy</div>
                    <div className="mt-2 text-[16px] font-semibold text-[#b9b9b9]">Đơn hàng của bạn đã được hủy vào {order.cancelledAt}</div>
                </div>

                <div className="mt-8 border-t border-[#dbdbdb] pt-6">
                    <div className="flex items-start gap-3">
                        <span className="text-[28px]">📍</span>
                        <div>
                            <div className="text-[18px] font-bold text-black">
                                {order.customerName} <span className="font-semibold text-[#b8b8b8]">{order.customerPhone}</span>
                            </div>
                            <div className="mt-2 text-[16px] text-black">{order.customerAddress}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-t border-[#dbdbdb] pt-5">
                    <div className="flex items-center gap-3 text-[18px] font-semibold text-black">
                        <span className="text-[28px]">🏪</span>
                        <span>{order.storeName}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5 border-b border-[#dbdbdb] pb-4">
                        <img src={order.image} alt={order.itemName} className="h-[76px] w-[76px] rounded-[16px] object-cover" />
                        <div>
                            <div className="text-[17px] text-black">{order.itemName}</div>
                            <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                        </div>
                        <div className="text-right text-[16px] text-black">{order.unitPrice}</div>
                    </div>
                    <div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black">
                        <span>Tổng:</span>
                        <span className="ml-10">{order.totalPrice}</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-y-5 pt-5 text-[16px] text-black">
                        <span>Yêu cầu bởi</span>
                        <span>{order.cancelledBy}</span>
                        <span>Yêu cầu vào</span>
                        <span>{order.cancelledAt}</span>
                        <span>Lý do</span>
                        <span>{order.cancelledReason}</span>
                        <span>Phương thức thanh toán</span>
                        <span>{order.paymentMethod}</span>
                        <span>Tổng tiền hoàn</span>
                        <span>{order.refundStatus}</span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button type="button" className="min-w-[180px] rounded-[12px] bg-[#e5e5e5] px-8 py-4 text-[18px] font-semibold text-black">
                        Mua lại
                    </button>
                </div>
            </div>
        );
    }

    if (order.refundStatus) {
        return (
            <div className="rounded-[22px] bg-white px-9 py-7 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <button type="button" onClick={onBack} className="flex items-center gap-3 text-[18px] text-black">
                    <span className="text-[30px] leading-none">←</span>
                    <span className="font-medium">Đơn Hàng : {order.storeName}</span>
                </button>

                <div className="mt-8 rounded-[18px] bg-[#edf8e8] px-8 py-4">
                    <div className="text-[18px] font-bold text-[#2f6f25]">{order.statusLabel === 'Đã hoàn tiền' ? 'Hoàn tiền thành công' : 'Đang xử lý hoàn tiền'}</div>
                    <div className="mt-2 text-[16px] text-[#2c2c2c]">
                        {order.statusLabel === 'Đã hoàn tiền'
                            ? 'Yêu cầu hoàn tiền của bạn đã được chấp nhận. Cảm ơn bạn đã trả hàng đúng thời hạn'
                            : 'Yêu cầu hoàn tiền của bạn đang được xử lý. DishNet sẽ sớm cập nhật kết quả cho bạn'}
                    </div>
                </div>

                <div className="mt-8 border-t border-[#dbdbdb] pt-6">
                    <div className="flex items-start gap-3">
                        <span className="text-[28px]">📍</span>
                        <div>
                            <div className="text-[18px] font-bold text-black">
                                {order.customerName} <span className="font-semibold text-[#b8b8b8]">{order.customerPhone}</span>
                            </div>
                            <div className="mt-2 text-[16px] text-black">{order.customerAddress}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-t border-[#dbdbdb] pt-5">
                    <div className="flex items-center gap-3 text-[18px] font-semibold text-black">
                        <span className="text-[28px]">🏪</span>
                        <span>{order.storeName}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5 border-b border-[#dbdbdb] pb-4">
                        <img src={order.image} alt={order.itemName} className="h-[76px] w-[76px] rounded-[16px] object-cover" />
                        <div>
                            <div className="text-[17px] text-black">{order.itemName}</div>
                            <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                        </div>
                        <div className="text-right text-[16px] text-black">{order.unitPrice}</div>
                    </div>
                    <div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black">
                        <span>Tổng:</span>
                        <span className="ml-10">{order.totalPrice}</span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-y-5 pt-5 text-[16px] text-black">
                        <span>Yêu cầu bởi</span>
                        <span>{order.cancelledBy}</span>
                        <span>Yêu cầu vào</span>
                        <span>{order.cancelledAt}</span>
                        <span>Lý do trả hàng/ hoàn tiền</span>
                        <span>{order.refundReason}</span>
                        <span>Phương thức thanh toán</span>
                        <span>{order.paymentMethod}</span>
                        <span>Tổng tiền hoàn</span>
                        <span>{order.refundStatus}</span>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button type="button" className="min-w-[180px] rounded-[12px] bg-[#e5e5e5] px-8 py-4 text-[18px] font-semibold text-black">
                        Mua lại
                    </button>
                </div>
            </div>
        );
    }

    if (order.statusLabel === 'Đã giao đơn hàng') {
        return (
            <div className="rounded-[22px] bg-white px-9 py-7 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                <button type="button" onClick={onBack} className="flex items-center gap-3 text-[18px] text-black">
                    <span className="text-[30px] leading-none">←</span>
                    <span className="font-medium">Đơn Hàng : {order.storeName}</span>
                </button>

                <div className="mt-8 rounded-[18px] bg-[#f5f5f5] px-8 py-4">
                    <div className="text-[18px] font-bold text-black">Đã Giao</div>
                    <div className="mt-2 text-[16px] font-semibold text-[#b9b9b9]">Đơn hàng của bạn đã được giao. Người nhận : {order.customerName}</div>
                </div>

                <div className="mt-8 border-t border-[#dbdbdb] pt-6">
                    <div className="flex items-start gap-3">
                        <span className="text-[28px]">📍</span>
                        <div>
                            <div className="text-[18px] font-bold text-black">
                                {order.customerName} <span className="font-semibold text-[#b8b8b8]">{order.customerPhone}</span>
                            </div>
                            <div className="mt-2 text-[16px] text-black">{order.customerAddress}</div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-t border-[#dbdbdb] pt-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-[18px] font-semibold text-black">
                            <span className="text-[28px]">🏪</span>
                            <span>{order.storeName}</span>
                        </div>
                        {order.canRefund ? (
                            <button type="button" onClick={onRefund} className="rounded-full border border-[#d7d7d7] bg-[#f7f7f7] px-8 py-2.5 text-[15px] font-semibold text-black transition hover:bg-[#efefef]">
                                Yêu cầu hoàn tiền
                            </button>
                        ) : null}
                    </div>

                    <div className="mt-4 grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5 border-b border-[#dbdbdb] pb-4">
                        <img src={order.image} alt={order.itemName} className="h-[76px] w-[76px] rounded-[16px] object-cover" />
                        <div>
                            <div className="text-[17px] text-black">{order.itemName}</div>
                            <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                        </div>
                        <div className="text-right text-[16px] text-black">{order.unitPrice}</div>
                    </div>

                    <div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black">
                        <span>Tổng:</span>
                        <span className="ml-10">{order.totalPrice}</span>
                    </div>

                    <div className="space-y-5 pt-5 text-[16px] text-black">
                        <div className="flex items-center justify-between">
                            <span>Mã đơn</span>
                            <div className="flex items-center gap-3">
                                <span>{order.orderNumber}</span>
                                <button type="button" className="text-[18px]">📋</button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Phương thức thanh toán</span>
                            <span>{order.paymentMethod}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Ngày đặt đơn</span>
                            <span>{order.orderedAt}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Thời gian thanh toán</span>
                            <span>{order.paidAt}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span>Ngày giao hàng</span>
                            <span>{order.deliveredAt}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6">
                    <button type="button" className="min-w-[180px] rounded-[12px] bg-[#e5e5e5] px-8 py-4 text-[18px] font-semibold text-black">
                        Mua lại
                    </button>
                    <button type="button" onClick={onReview} className="min-w-[200px] rounded-[12px] bg-[#ff2f18] px-8 py-4 text-[18px] font-semibold text-white transition hover:bg-[#e32813]">
                        Viết đánh giá
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-[22px] bg-white px-9 py-7 shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
            <button type="button" onClick={onBack} className="flex items-center gap-3 text-[18px] text-black">
                <span className="text-[30px] leading-none">←</span>
                <span className="font-medium">Đơn Hàng : {order.storeName}</span>
            </button>

            {activeStageIndex >= 0 ? (
                <div className="mx-auto mt-8 max-w-[660px]">
                    <div className="relative flex items-center justify-between">
                        <div className="absolute left-[34px] right-[34px] top-5 h-[6px] rounded-full bg-[#ececec]" />
                        <div
                            className="absolute left-[34px] top-5 h-[6px] rounded-full bg-[#64d8e6]"
                            style={{ width: `${Math.max(0, activeStageIndex) * 33.33}%` }}
                        />
                        {stageLabels.map((stage, index) => {
                            const isReached = index <= activeStageIndex;
                            const isActive = index === activeStageIndex;

                            return (
                                <div key={stage.key} className="relative z-10 flex w-[132px] flex-col items-center text-center">
                                    <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-full border-[3px] ${
                                        isActive
                                            ? 'border-[#2dc6cf] bg-[#2dc6cf] text-white'
                                            : isReached
                                                ? 'border-[#d6f5f7] bg-[#d6f5f7] text-[#63d3dd]'
                                                : 'border-[#ececec] bg-white text-[#a5a5a5]'
                                    }`}>
                                        {isActive ? '📦' : '•'}
                                    </div>
                                    <div className={`mt-3 text-[14px] leading-[1.25] ${
                                        isReached ? 'text-[#54cdd9]' : 'text-[#b5b5b5]'
                                    }`}>
                                        {stage.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}

            <div className="mt-8 border-t border-[#dbdbdb] pt-6">
                <div className="flex items-start gap-3">
                    <span className="text-[28px]">📍</span>
                    <div>
                        <div className="text-[18px] font-bold text-black">
                            {order.customerName} <span className="font-semibold text-[#b8b8b8]">{order.customerPhone}</span>
                        </div>
                        <div className="mt-2 text-[16px] text-black">{order.customerAddress}</div>
                    </div>
                </div>
            </div>

            <div className="mt-7 border-t border-[#dbdbdb] pt-5">
                <div className="flex items-center gap-3 text-[18px] font-semibold text-black">
                    <span className="text-[28px]">🏪</span>
                    <span>{order.storeName}</span>
                </div>

                <div className="mt-4 grid grid-cols-[94px_minmax(0,1fr)_150px] items-center gap-5 border-b border-[#dbdbdb] pb-4">
                    <img src={order.image} alt={order.itemName} className="h-[76px] w-[76px] rounded-[16px] object-cover" />
                    <div>
                        <div className="text-[17px] text-black">{order.itemName}</div>
                        <div className="mt-1 text-[16px] font-semibold text-black">x{order.quantity}</div>
                    </div>
                    <div className="text-right text-[16px] text-black">{order.unitPrice}</div>
                </div>

                <div className="flex justify-end border-b border-[#dbdbdb] py-3 text-[16px] text-black">
                    <span>Tổng:</span>
                    <span className="ml-10">{order.totalPrice}</span>
                </div>

                <div className="space-y-5 pt-5 text-[16px] text-black">
                    <div className="flex items-center justify-between">
                        <span>Số đơn hàng</span>
                        <div className="flex items-center gap-3">
                            <span>{order.orderNumber}</span>
                            <button type="button" className="text-[18px]">📋</button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Phương thức thanh toán</span>
                        <span>{order.paymentMethod}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={!canCancelOrder(order)}
                    className={`min-w-[220px] rounded-full border px-8 py-3 text-[15px] font-semibold ${
                        canCancelOrder(order)
                            ? 'border-[#d7d7d7] bg-white text-[#4a4a4a] transition hover:bg-[#f7f7f7]'
                            : 'cursor-not-allowed border-[#d7d7d7] bg-[#f1f1f1] text-[#a8a8a8]'
                    }`}
                >
                    Hủy đơn hàng
                </button>
            </div>
        </div>
    );
}

export default function UserOrdersPageClient() {
    const [activeTab, setActiveTab] = useState<OrderTabKey>('placed');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    const [ordersByTab, setOrdersByTab] = useState<Record<OrderTabKey, UserOrder[]>>(() => JSON.parse(JSON.stringify(userOrdersByTab)) as Record<OrderTabKey, UserOrder[]>);
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
    const [refundOrderId, setRefundOrderId] = useState<string | null>(null);
    const [reviewOrderId, setReviewOrderId] = useState<string | null>(null);

    const activeOrders = useMemo(() => {
        if (activeTab === 'review') {
            return ordersByTab.purchased;
        }

        return ordersByTab[activeTab];
    }, [activeTab, ordersByTab]);
    const selectedOrder = activeOrders.find((order) => order.id === selectedOrderId) ?? null;
    const cancellingOrder = ordersByTab.placed.find((order) => order.id === cancellingOrderId) ?? null;
    const refundOrder = ordersByTab.purchased.find((order) => order.id === refundOrderId) ?? null;
    const reviewOrder = ordersByTab.purchased.find((order) => order.id === reviewOrderId) ?? null;

    const handleConfirmCancel = ({
        reason,
    }: {
        reason: string;
        bankName: string;
        bankAccount: string;
        bankOwner: string;
    }) => {
        if (!cancellingOrder) return;

        const cancelledOrder: UserOrder = {
            ...cancellingOrder,
            statusLabel: 'Đã hủy',
            cancelledReason: reason,
            cancelledBy: 'Người mua',
            cancelledAt: '27 - 03 - 2026 07:35 CH',
            refundStatus: 'Đã xử lý hoàn tiền',
        };

        setOrdersByTab((current) => ({
            ...current,
            placed: current.placed.filter((order) => order.id !== cancellingOrder.id),
            cancelled: [cancelledOrder, ...current.cancelled],
        }));
        setCancellingOrderId(null);
        setSelectedOrderId(null);
        setActiveTab('cancelled');
    };

    const handleRefundSubmit = ({ reason }: { reason: string; bankName: string; bankAccount: string; bankOwner: string }) => {
        if (!refundOrder) return;

        const returnedOrder: UserOrder = {
            ...refundOrder,
            statusLabel: 'Chưa hoàn tiền',
            refundStatus: 'Chưa hoàn tiền',
            refundReason: reason,
            cancelledBy: 'Người mua',
            cancelledAt: '27 - 03 - 2026 07:35 CH',
            canRefund: false,
        };

        setOrdersByTab((current) => ({
            ...current,
            purchased: current.purchased.filter((order) => order.id !== refundOrder.id),
            returned: [returnedOrder, ...current.returned],
        }));

        setRefundOrderId(null);
        setSelectedOrderId(null);
        setActiveTab('returned');
    };

    const handleReviewSubmit = ({ rating }: { rating: number; content: string; isAnonymous: boolean }) => {
        if (!reviewOrder) return;

        setOrdersByTab((current) => ({
            ...current,
            purchased: current.purchased.map((order) =>
                order.id === reviewOrder.id
                    ? { ...order, canReview: false, received: true, quickRating: rating || 5 }
                    : order,
            ),
        }));
        setReviewOrderId(null);
    };

    const content = (() => {
        if (activeOrders.length === 0) return <EmptyOrdersState />;
        if (selectedOrder) {
            return (
                <OrderDetail
                    order={selectedOrder}
                    onBack={() => setSelectedOrderId(null)}
                    onCancel={() => setCancellingOrderId(selectedOrder.id)}
                    onRefund={() => setRefundOrderId(selectedOrder.id)}
                    onReview={() => setReviewOrderId(selectedOrder.id)}
                />
            );
        }

        return (
            <div className="space-y-6">
                {activeOrders.map((order) => (
                    <OrderListCard
                        key={order.id}
                        order={order}
                        activeTab={activeTab}
                        onViewDetail={() => setSelectedOrderId(order.id)}
                        onCancel={() => setCancellingOrderId(order.id)}
                        onRefund={() => setRefundOrderId(order.id)}
                        onReview={() => setReviewOrderId(order.id)}
                    />
                ))}
            </div>
        );
    })();

    return (
        <div className="bg-[#f4f4f3] py-8">
            <section className="mx-auto grid w-full max-w-[1440px] gap-6 px-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                <aside className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.03)]">
                    <div className="border-b border-[#e2ece0] px-8 py-9 text-[24px] font-bold text-black">Đơn Hàng</div>
                    <div>
                        {orderTabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => {
                                    setActiveTab(tab.key);
                                    setSelectedOrderId(null);
                                }}
                                className={`flex w-full items-center border-b border-[#e2ece0] px-8 py-6 text-left text-[18px] transition ${
                                    activeTab === tab.key
                                        ? 'bg-[#edf9ec] font-bold text-[#2f6f25]'
                                        : 'text-black hover:bg-[#fafcf9]'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </aside>

                <div>{content}</div>
            </section>

            {cancellingOrder ? (
                <CancelOrderModal
                    order={cancellingOrder}
                    onClose={() => setCancellingOrderId(null)}
                    onConfirm={handleConfirmCancel}
                />
            ) : null}

            {refundOrder ? (
                <RefundRequestModal
                    onClose={() => setRefundOrderId(null)}
                    onSubmit={handleRefundSubmit}
                />
            ) : null}

            {reviewOrder ? (
                <ReviewModal
                    order={reviewOrder}
                    onClose={() => setReviewOrderId(null)}
                    onSubmit={handleReviewSubmit}
                />
            ) : null}
        </div>
    );
}
