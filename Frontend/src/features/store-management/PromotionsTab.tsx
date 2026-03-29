'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
type PromoStatus = 'active' | 'upcoming' | 'paused' | 'ended';
type PromoType = 'percent' | 'amount' | 'freeship';

interface Promo {
    id: string;
    name: string;
    code: string;
    status: PromoStatus;
    type: PromoType;
    discountValue: string;
    maxDiscount: string;
    minOrder: string;
    usedCount: number;
    maxUse: number;
    startDate: string;
    endDate: string;
    revenue?: string;
    image: string;
}

const STATUS_LABEL: Record<PromoStatus, string> = {
    active: 'Đang diễn ra',
    upcoming: 'Sắp diễn ra',
    paused: 'Tạm Dừng',
    ended: 'Đã kết thúc',
};

const STATUS_BADGE: Record<PromoStatus, string> = {
    active: 'bg-[#2e7d32] text-white',
    upcoming: 'border border-[#888] text-[#555]',
    paused: 'border border-[#f0a050] text-[#f0a050]',
    ended: 'bg-[#d32f2f] text-white',
};

const STORE_IMG = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop';

/* ═══════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════ */
const INITIAL_PROMOS: Promo[] = [
    {
        id: '1', name: 'GIẢM 20%', code: 'FOODIE20', status: 'active', type: 'percent',
        discountValue: '20', maxDiscount: '30k', minOrder: '100k',
        usedCount: 92, maxUse: 100,
        startDate: '21/02/2026 00:00 SA', endDate: '22/02/2026 00:00 SA',
        image: STORE_IMG,
    },
    {
        id: '2', name: 'MIỄN PHÍ VẬN CHUYỂN', code: 'FREESHIP', status: 'upcoming', type: 'freeship',
        discountValue: '', maxDiscount: '', minOrder: '50k',
        usedCount: 0, maxUse: 100,
        startDate: '05/03/2026 00:00 SA', endDate: '06/03/2026 00:00 SA',
        image: STORE_IMG,
    },
    {
        id: '3', name: 'GIẢM 15%', code: 'FOODIE10', status: 'ended', type: 'percent',
        discountValue: '15', maxDiscount: '10k', minOrder: '50k',
        usedCount: 100, maxUse: 100,
        startDate: '05/02/2026 00:00 SA', endDate: '06/02/2026 00:00 SA',
        revenue: '2.000.000đ', image: STORE_IMG,
    },
    {
        id: '4', name: 'GIẢM 15%', code: 'FOODIE10', status: 'ended', type: 'percent',
        discountValue: '15', maxDiscount: '10k', minOrder: '50k',
        usedCount: 100, maxUse: 100,
        startDate: '05/02/2026 00:00 SA', endDate: '06/02/2026 00:00 SA',
        revenue: '2.000.000đ', image: STORE_IMG,
    },
];

/* ═══════════════════════════════════════════
   ADD / EDIT MODAL
   ═══════════════════════════════════════════ */
function PromoModal({ promo, onClose, onSave }: {
    promo: Promo | null;
    onClose: () => void;
    onSave: (data: Promo) => void;
}) {
    const isEdit = !!promo;
    const [name, setName] = useState(promo?.name || '');
    const [code, setCode] = useState(promo?.code || '');
    const [status, setStatus] = useState<PromoStatus>(promo?.status || 'upcoming');
    const [type, setType] = useState<PromoType>(promo?.type || 'percent');
    const [discountValue, setDiscountValue] = useState(promo?.discountValue || '');
    const [minOrder, setMinOrder] = useState(promo?.minOrder || '');
    const [maxUse, setMaxUse] = useState(String(promo?.maxUse || ''));
    const [startDate, setStartDate] = useState(promo?.startDate || '');
    const [endDate, setEndDate] = useState(promo?.endDate || '');

    const handleSave = () => {
        const newPromo: Promo = {
            id: promo?.id || String(Date.now()),
            name, code, status, type, discountValue,
            maxDiscount: type === 'percent' ? `${discountValue}k` : '',
            minOrder, usedCount: promo?.usedCount || 0,
            maxUse: Number(maxUse) || 100,
            startDate, endDate, image: STORE_IMG,
        };
        onSave(newPromo);
    };

    const statuses: { key: PromoStatus; label: string }[] = [
        { key: 'upcoming', label: 'Sắp diễn ra' },
        { key: 'active', label: 'Đang diễn ra' },
        { key: 'paused', label: 'Tạm Dừng' },
        { key: 'ended', label: 'Đã kết thúc' },
    ];

    const types: { key: PromoType; label: string }[] = [
        { key: 'percent', label: 'Giảm theo %' },
        { key: 'amount', label: 'Giảm theo số tiền' },
        { key: 'freeship', label: 'FreeShip' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[560px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <h3 className="text-[17px] font-bold text-black">{isEdit ? 'Sửa thông tin khuyến mãi' : 'Thêm mã khuyến mãi'}</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4 space-y-4">
                    {/* Name + Code */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-medium text-black">Tên chương trình</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên chương trình" className="mt-1 w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                        </div>
                        <div>
                            <label className="text-[13px] font-medium text-black">Mã khuyến mãi</label>
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã code" className="mt-1 w-full rounded-[8px] border border-[#ddd] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-[13px] font-bold text-black">Trạng thái</label>
                        <div className="mt-2 flex items-center gap-5">
                            {statuses.map((s) => (
                                <label key={s.key} className="flex cursor-pointer items-center gap-2">
                                    <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${status === s.key ? 'border-[#2e7d32]' : 'border-[#ccc]'}`}>
                                        {status === s.key && <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />}
                                    </span>
                                    <span className="text-[13px] text-black">{s.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="text-[13px] font-bold text-black">Loại khuyến mãi</label>
                        <div className="mt-2 space-y-2">
                            {types.map((t) => (
                                <div key={t.key} className="flex items-center gap-3">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 ${type === t.key ? 'border-[#2e7d32]' : 'border-[#ccc]'}`}>
                                            {type === t.key && <span className="h-2.5 w-2.5 rounded-full bg-[#2e7d32]" />}
                                        </span>
                                        <span className="w-[130px] text-[13px] text-black">{t.label}</span>
                                    </label>
                                    {t.key === 'percent' && (
                                        <div className="flex items-center gap-1">
                                            <input type="text" value={type === 'percent' ? discountValue : ''} onChange={(e) => setDiscountValue(e.target.value)} disabled={type !== 'percent'} className="w-full rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none disabled:bg-[#f8f8f8]" />
                                            <span className="text-[13px] text-[#555]">%</span>
                                        </div>
                                    )}
                                    {t.key === 'amount' && (
                                        <input type="text" value={type === 'amount' ? discountValue : ''} onChange={(e) => setDiscountValue(e.target.value)} disabled={type !== 'amount'} className="w-full rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none disabled:bg-[#f8f8f8]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conditions */}
                    <div>
                        <label className="text-[13px] font-bold text-black">Điều kiện áp dụng</label>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="w-[130px] text-[13px] text-black">Đơn tối thiểu</span>
                                <div className="flex flex-1 items-center gap-1">
                                    <input type="text" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} placeholder="" className="w-full rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                                    <span className="text-[13px] text-[#555]">Đ</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-[130px] text-[13px] text-black">Số lượt sử dụng</span>
                                <input type="text" value={maxUse} onChange={(e) => setMaxUse(e.target.value)} className="flex-1 rounded-[8px] border border-[#ddd] px-3 py-1.5 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <div>
                        <label className="text-[13px] font-bold text-black">Thời gian</label>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-black whitespace-nowrap">Ngày bắt đầu :</span>
                                <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="" className="w-full rounded-[8px] border border-[#ddd] px-2 py-1.5 text-[13px] text-black outline-none focus:border-[#2e7d32]" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-black whitespace-nowrap">Ngày kết thúc :</span>
                                <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="" className="w-full rounded-[8px] border border-[#ddd] px-2 py-1.5 text-[13px] text-black outline-none focus:border-[#2e7d32]" />
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={handleSave} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">{isEdit ? 'Lưu thay đổi' : 'Thêm'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   PROMO CARD
   ═══════════════════════════════════════════ */
function PromoCard({ promo, onEdit, onDelete, onPause, onActivate, onDuplicate }: {
    promo: Promo;
    onEdit: () => void;
    onDelete: () => void;
    onPause: () => void;
    onActivate: () => void;
    onDuplicate: () => void;
}) {
    return (
        <div className="rounded-[12px] border border-[#e8e8e8] bg-white p-5 shadow-sm">
            {/* Top row */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <img src={promo.image} alt={promo.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[16px] font-bold text-black">{promo.name}</span>
                            {promo.maxDiscount && (
                                <span className="rounded-full bg-[#e8f5e9] px-3 py-0.5 text-[11px] font-semibold text-[#2e7d32]">Tối đa {promo.maxDiscount}</span>
                            )}
                        </div>
                        <div className="mt-1 flex items-center gap-1">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#2e7d32] text-[10px] text-white">✓</span>
                            <span className="text-[13px] text-[#555]">Mã : {promo.code}</span>
                        </div>
                    </div>
                </div>
                <span className={`rounded-[8px] px-4 py-1.5 text-[13px] font-semibold ${STATUS_BADGE[promo.status]}`}>
                    {STATUS_LABEL[promo.status]}
                </span>
            </div>

            {/* Details row */}
            <div className="mt-4 flex items-end justify-between">
                <div className="space-y-1 text-[13px] text-[#555]">
                    <p>Áp dụng cho đơn từ {promo.minOrder}</p>
                    <p>Đã dùng : {promo.usedCount}/{promo.maxUse}</p>
                </div>
                <div className="space-y-1 text-[13px] text-[#555] text-right">
                    <p>Thời gian bắt đầu : {promo.startDate}</p>
                    <p>Thời gian kết thúc : {promo.endDate}</p>
                </div>

                {/* Stats for ended */}
                {promo.status === 'ended' && promo.revenue && (
                    <div className="rounded-[8px] border border-[#e8e8e8] px-4 py-2 text-[13px]">
                        <p className="text-black">Số đơn dùng mã : <span className="font-semibold">{promo.usedCount}</span></p>
                        <p className="text-black">Doanh thu thu về : <span className="font-semibold text-[#d32f2f]">{promo.revenue}</span></p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {(promo.status === 'active' || promo.status === 'upcoming') && (
                        <button type="button" onClick={onEdit} className="rounded-[8px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Sửa</button>
                    )}
                    {promo.status === 'active' && (
                        <button type="button" onClick={onPause} className="rounded-[8px] border border-[#ddd] bg-white px-4 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Tạm Dừng</button>
                    )}
                    {promo.status === 'upcoming' && (
                        <button type="button" onClick={onActivate} className="rounded-[8px] border border-[#2e7d32] bg-white px-4 py-2 text-[13px] font-semibold text-[#2e7d32] transition hover:bg-[#f6faf4]">Kích hoạt</button>
                    )}
                    {(promo.status === 'active' || promo.status === 'upcoming') && (
                        <button type="button" onClick={onDelete} className="rounded-[8px] bg-[#d32f2f] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
                    )}
                    {promo.status === 'ended' && (
                        <button type="button" onClick={onDuplicate} className="rounded-[8px] border border-[#ddd] bg-white px-5 py-2 text-[13px] font-semibold text-[#555] transition hover:bg-[#f8f8f8]">Nhân bản</button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   PROMOTIONS TAB
   ═══════════════════════════════════════════ */
export default function PromotionsTab() {
    const [promos, setPromos] = useState<Promo[]>(INITIAL_PROMOS);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [editPromo, setEditPromo] = useState<Promo | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const [statusDropOpen, setStatusDropOpen] = useState(false);
    const [typeDropOpen, setTypeDropOpen] = useState(false);

    const filtered = useMemo(() => {
        return promos.filter((p) => {
            if (searchText && !p.name.toLowerCase().includes(searchText.toLowerCase()) && !p.code.toLowerCase().includes(searchText.toLowerCase())) return false;
            if (statusFilter !== 'all' && p.status !== statusFilter) return false;
            if (typeFilter !== 'all' && p.type !== typeFilter) return false;
            return true;
        });
    }, [promos, searchText, statusFilter, typeFilter]);

    const handleSave = (data: Promo) => {
        if (editPromo) {
            setPromos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
        } else {
            setPromos((prev) => [...prev, data]);
        }
        setEditPromo(null);
        setShowAddModal(false);
    };

    const handleDelete = (id: string) => {
        setPromos((prev) => prev.filter((p) => p.id !== id));
    };

    const handlePause = (id: string) => {
        setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'paused' as PromoStatus } : p)));
    };

    const handleActivate = (id: string) => {
        setPromos((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'active' as PromoStatus } : p)));
    };

    const handleDuplicate = (id: string) => {
        const original = promos.find((p) => p.id === id);
        if (original) {
            const dup: Promo = { ...original, id: String(Date.now()), usedCount: 0, status: 'upcoming', startDate: '', endDate: '' };
            setPromos((prev) => [...prev, dup]);
        }
    };

    const statusOpts = [
        { key: 'all', label: 'Trạng thái mã' },
        { key: 'active', label: 'Đang diễn ra' },
        { key: 'upcoming', label: 'Sắp diễn ra' },
        { key: 'paused', label: 'Tạm dừng' },
        { key: 'ended', label: 'Đã kết thúc' },
    ];
    const typeOpts = [
        { key: 'all', label: 'Loại khuyến mãi' },
        { key: 'percent', label: 'Giảm theo %' },
        { key: 'amount', label: 'Giảm theo số tiền' },
        { key: 'freeship', label: 'FreeShip' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ KHUYẾN MÃI</h1>
                <button type="button" onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-[10px] bg-[#2e7d32] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">
                    <span className="text-[18px]">+</span> Thêm khuyến mãi
                </button>
            </div>

            {/* Filters */}
            <div className="mt-4 flex items-center gap-3">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
                    <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm tên mã, code khuyến mãi" className="flex-1 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]" />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                </div>

                {/* Status filter */}
                <div className="relative">
                    <button type="button" onClick={() => { setStatusDropOpen(!statusDropOpen); setTypeDropOpen(false); }} className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
                        <span>{statusOpts.find((s) => s.key === statusFilter)?.label}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {statusDropOpen && (
                        <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                            {statusOpts.map((s) => (
                                <button key={s.key} type="button" onClick={() => { setStatusFilter(s.key); setStatusDropOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === s.key ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{s.label}</button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Type filter */}
                <div className="relative">
                    <button type="button" onClick={() => { setTypeDropOpen(!typeDropOpen); setStatusDropOpen(false); }} className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
                        <span>{typeOpts.find((t) => t.key === typeFilter)?.label}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                    {typeDropOpen && (
                        <div className="absolute left-0 top-[calc(100%+4px)] z-10 w-[170px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                            {typeOpts.map((t) => (
                                <button key={t.key} type="button" onClick={() => { setTypeFilter(t.key); setTypeDropOpen(false); }} className={`block w-full px-4 py-2.5 text-left text-[13px] transition hover:bg-[#f6faf4] ${typeFilter === t.key ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{t.label}</button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-1 rounded-full border border-[#ddd] bg-white px-4 py-2 text-[13px] text-black">
                    <span>Sắp xếp</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                </div>
            </div>

            {/* Cards */}
            <div className="mt-5 space-y-4">
                {filtered.length === 0 ? (
                    <div className="flex min-h-[200px] items-center justify-center rounded-[12px] bg-white shadow-sm">
                        <p className="text-[15px] text-[#999]">Không có khuyến mãi nào</p>
                    </div>
                ) : (
                    filtered.map((promo) => (
                        <PromoCard
                            key={promo.id}
                            promo={promo}
                            onEdit={() => setEditPromo(promo)}
                            onDelete={() => handleDelete(promo.id)}
                            onPause={() => handlePause(promo.id)}
                            onActivate={() => handleActivate(promo.id)}
                            onDuplicate={() => handleDuplicate(promo.id)}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {filtered.length > 0 && (
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
            {showAddModal && <PromoModal promo={null} onClose={() => setShowAddModal(false)} onSave={handleSave} />}
            {editPromo && <PromoModal promo={editPromo} onClose={() => setEditPromo(null)} onSave={handleSave} />}
        </div>
    );
}
