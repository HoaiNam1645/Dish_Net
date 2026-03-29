'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';

/* ═══════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════ */
type ItemStatus = 'Đang bán' | 'Hết món' | 'Tạm ngưng bán';

interface MenuItem {
    id: string;
    code: string;
    name: string;
    image: string;
    price: string;
    priceNum: number;
    sold: number;
    status: ItemStatus;
    category: string;
    description: string;
    toppings: { name: string; price: string }[];
}

const STATUS_COLORS: Record<ItemStatus, string> = {
    'Đang bán': 'text-[#2e7d32]',
    'Hết món': 'text-[#d32f2f]',
    'Tạm ngưng bán': 'text-[#f0a050]',
};

const CATEGORIES = [
    { key: 'all', label: 'Tất cả', count: 30 },
    { key: 'bun', label: 'Món bún', count: 12 },
    { key: 'com', label: 'Món cơm', count: 5 },
    { key: 'chao', label: 'Món cháo', count: 5 },
    { key: 'drink', label: 'Đồ uống', count: 5 },
    { key: 'extra', label: 'Đồ thêm', count: 3 },
];

const CATEGORY_OPTIONS = ['Món bún', 'Món cơm', 'Món cháo', 'Món nước', 'Đồ uống', 'Đồ thêm'];
const STATUS_OPTIONS: ItemStatus[] = ['Đang bán', 'Hết món', 'Tạm ngưng bán'];

const IMG1 = 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=80&h=80&fit=crop';
const IMG2 = 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=80&h=80&fit=crop';

const INITIAL_ITEMS: MenuItem[] = [
    { id: '1', code: 'MA001', name: 'Bún bò huế số 1', image: IMG1, price: '56.000đ', priceNum: 56000, sold: 500, status: 'Đang bán', category: 'bun', description: 'Bún bò Huế với tais, nạm, gân, giò heo, nước dùng đậm vị', toppings: [{ name: 'Thêm chả', price: '+15.000đ' }, { name: 'Thêm thịt bò', price: '+15.000đ' }] },
    { id: '2', code: 'MA002', name: 'Bún bò huế số 2', image: IMG2, price: '56.000đ', priceNum: 56000, sold: 400, status: 'Đang bán', category: 'bun', description: 'Bún bò Huế đặc biệt', toppings: [{ name: 'Thêm chả', price: '+15.000đ' }] },
    { id: '3', code: 'MA003', name: 'Bún bò huế số 3', image: IMG1, price: '56.000đ', priceNum: 56000, sold: 300, status: 'Hết món', category: 'bun', description: 'Bún bò Huế truyền thống', toppings: [] },
    { id: '4', code: 'MA004', name: 'Bún bò huế số 4', image: IMG2, price: '56.000đ', priceNum: 56000, sold: 200, status: 'Tạm ngưng bán', category: 'bun', description: '', toppings: [] },
    { id: '5', code: 'DU005', name: 'Nước ngọt 1', image: IMG1, price: '16.000đ', priceNum: 16000, sold: 50, status: 'Đang bán', category: 'drink', description: '', toppings: [] },
    { id: '6', code: 'DU006', name: 'Nước ngọt 1', image: IMG2, price: '16.000đ', priceNum: 16000, sold: 20, status: 'Hết món', category: 'drink', description: '', toppings: [] },
    { id: '7', code: 'DU007', name: 'Nước ngọt 1', image: IMG1, price: '16.000đ', priceNum: 16000, sold: 10, status: 'Tạm ngưng bán', category: 'drink', description: '', toppings: [] },
];

const SOLD_OUT_ITEMS = [
    { name: 'Bún bò huế số 10', image: IMG1, price: '56.000đ', sold: 50, status: 'Hết hàng' as const },
    { name: 'Bún bò huế số 11', image: IMG2, price: '56.000đ', sold: 50, status: 'Hết hàng' as const },
    { name: 'Bún bò huế số 12', image: IMG1, price: '56.000đ', sold: 50, status: 'Hết hàng' as const },
    { name: 'Bún bò huế số 10', image: IMG2, price: '56.000đ', sold: 50, status: 'Hết hàng' as const },
];

/* ═══════════════════════════════════════════
   EDIT ITEM MODAL
   ═══════════════════════════════════════════ */
function EditItemModal({ item, onClose, onSave }: { item: MenuItem; onClose: () => void; onSave: (updated: MenuItem) => void }) {
    const [name, setName] = useState(item.name);
    const [status, setStatus] = useState<ItemStatus>(item.status);
    const [desc, setDesc] = useState(item.description);
    const [price, setPrice] = useState(item.price);
    const [category, setCategory] = useState(item.category);
    const [toppings, setToppings] = useState(item.toppings);
    const [statusOpen, setStatusOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);

    const handleSave = () => {
        onSave({ ...item, name, status, description: desc, price, category, toppings });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[540px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5">
                    <div />
                    <h3 className="text-[17px] font-bold text-black">Sửa thông tin món</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>

                <div className="px-6 pb-6 pt-4">
                    {/* ⑨ Image + name */}
                    <div className="flex items-center gap-4 rounded-[10px] border border-[#e8e8e8] p-3">
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-[8px] object-cover" />
                        <span className="flex-1 text-[15px] font-medium text-black">{name}</span>
                        <button className="rounded-[8px] border border-[#ddd] px-4 py-1.5 text-[13px] font-medium text-black transition hover:bg-gray-50">Đổi ảnh</button>
                    </div>

                    {/* ⑩⑪ Name + Status */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-medium text-black">Tên Món</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                        </div>
                        <div className="relative">
                            <label className="text-[13px] font-medium text-black">Trạng thái món ăn</label>
                            <button type="button" onClick={() => setStatusOpen(!statusOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                                <span>{status}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {statusOpen && (
                                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {STATUS_OPTIONS.map((s) => (
                                        <button key={s} type="button" onClick={() => { setStatus(s); setStatusOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{s}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ⑫ Description */}
                    <div className="mt-4">
                        <label className="text-[13px] font-medium text-black">Mô tả</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 300))} rows={3} className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                        <p className="text-right text-[11px] text-[#999]">{desc.length}/300</p>
                    </div>

                    {/* ⑬⑭ Price + Category */}
                    <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-medium text-black">Giá</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none focus:border-[#2e7d32]" />
                        </div>
                        <div className="relative">
                            <label className="text-[13px] font-medium text-black">Phân loại</label>
                            <button type="button" onClick={() => setCatOpen(!catOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                                <span>{CATEGORY_OPTIONS.find((c) => c.toLowerCase().includes(category)) || 'Chọn loại'}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {catOpen && (
                                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {CATEGORY_OPTIONS.map((c) => (
                                        <button key={c} type="button" onClick={() => { setCategory(c); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{c}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ⑮ Toppings */}
                    <div className="mt-4">
                        <p className="flex items-center gap-1 text-[13px] font-medium text-black">Topping<span className="text-[#2e7d32]">⊕</span></p>
                        <div className="mt-2 space-y-2">
                            {toppings.map((t, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="h-3 w-3 rounded-full border-2 border-[#2e7d32]" />
                                    <span className="flex-1 text-[13px] text-black">{t.name}</span>
                                    <span className="text-[13px] text-black">{t.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ⑯⑰ Actions */}
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={handleSave} className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   DELETE MODAL
   ═══════════════════════════════════════════ */
function DeleteItemModal({ item, onClose, onDelete }: { item: MenuItem; onClose: () => void; onDelete: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[500px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div />
                    <h3 className="text-[17px] font-bold text-black">Xóa món</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <div className="flex items-center gap-4 rounded-[10px] border border-[#e8e8e8] p-4">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-[8px] object-cover" />
                        <div>
                            <p className="text-[15px] font-semibold text-black">{item.name}</p>
                            <p className="text-[13px] text-[#f0a050]">{item.price}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="text-[13px] font-medium text-black">Mô tả</label>
                        <textarea readOnly value={item.description} rows={3} className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] bg-[#f8f8f8] px-3 py-2 text-[14px] text-[#555] outline-none" />
                        <p className="text-right text-[11px] text-[#999]">{item.description.length}/300</p>
                    </div>
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={() => { onDelete(); onClose(); }} className="rounded-[10px] bg-[#d32f2f] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   ADD NEW ITEM MODAL
   ═══════════════════════════════════════════ */
function AddItemModal({ onClose, onAdd }: { onClose: () => void; onAdd: (item: MenuItem) => void }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState<ItemStatus>('Đang bán');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [toppings, setToppings] = useState([{ name: '', price: '' }, { name: '', price: '' }]);
    const [statusOpen, setStatusOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);

    const handleAdd = () => {
        const newItem: MenuItem = {
            id: Date.now().toString(),
            code: `NEW${Date.now().toString().slice(-3)}`,
            name: name || 'Món mới',
            image: IMG1,
            price: price || '0đ',
            priceNum: parseInt(price.replace(/\D/g, '')) || 0,
            sold: 0,
            status,
            category: category || 'bun',
            description: desc,
            toppings: toppings.filter((t) => t.name),
        };
        onAdd(newItem);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[540px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div />
                    <h3 className="text-[17px] font-bold text-black">Thông tin món mới</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    {/* ⑳ Image placeholder */}
                    <div className="flex items-center gap-4 rounded-[10px] border border-dashed border-[#ccc] p-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#f0f0f0] text-[24px] text-[#999]">+</div>
                        <div className="flex-1" />
                        <button className="rounded-[8px] border border-[#ddd] px-4 py-1.5 text-[13px] font-medium text-black transition hover:bg-gray-50">Thêm ảnh</button>
                    </div>

                    {/* ㉑㉒ Name + Status */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-medium text-black">Tên Món</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên món mới" className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
                        </div>
                        <div className="relative">
                            <label className="text-[13px] font-medium text-black">Trạng thái món ăn</label>
                            <button type="button" onClick={() => setStatusOpen(!statusOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                                <span className={status ? '' : 'text-[#bbb]'}>{status || 'Chọn trạng thái'}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {statusOpen && (
                                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {STATUS_OPTIONS.map((s) => (
                                        <button key={s} type="button" onClick={() => { setStatus(s); setStatusOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{s}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ㉓ Description */}
                    <div className="mt-4">
                        <label className="text-[13px] font-medium text-black">Mô tả</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value.slice(0, 300))} rows={3} placeholder="Mô tả ngắn gọn về món ăn" className="mt-1 w-full resize-none rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
                        <p className="text-right text-[11px] text-[#999]">{desc.length}/300</p>
                    </div>

                    {/* ㉔㉕ Price + Category */}
                    <div className="mt-3 grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-medium text-black">Giá</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0đ" className="mt-1 w-full rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black outline-none placeholder:text-[#bbb] focus:border-[#2e7d32]" />
                        </div>
                        <div className="relative">
                            <label className="text-[13px] font-medium text-black">Phân loại</label>
                            <button type="button" onClick={() => setCatOpen(!catOpen)} className="mt-1 flex w-full items-center justify-between rounded-[8px] border border-[#e0e0e0] px-3 py-2 text-[14px] text-black">
                                <span className={category ? '' : 'text-[#bbb]'}>{category || 'Chọn loại món ăn'}</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {catOpen && (
                                <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {CATEGORY_OPTIONS.map((c) => (
                                        <button key={c} type="button" onClick={() => { setCategory(c); setCatOpen(false); }} className="block w-full px-3 py-2 text-left text-[13px] text-black transition hover:bg-[#f6faf4]">{c}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ㉖ Toppings */}
                    <div className="mt-4">
                        <p className="flex items-center gap-1 text-[13px] font-medium text-black">Topping<span className="text-[#2e7d32]">⊕</span></p>
                        <div className="mt-2 space-y-2">
                            {toppings.map((t, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="h-3 w-3 rounded-full border-2 border-[#2e7d32]" />
                                    <input type="text" value={t.name} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], name: e.target.value }; setToppings(next); }} placeholder="Thêm topping" className="flex-1 text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                                    <input type="text" value={t.price} onChange={(e) => { const next = [...toppings]; next[i] = { ...next[i], price: e.target.value }; setToppings(next); }} placeholder="+0đ" className="w-20 text-right text-[13px] text-black outline-none placeholder:text-[#bbb]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ㉗㉘ Actions */}
                    <div className="mt-5 flex items-center justify-center gap-3">
                        <button type="button" onClick={onClose} className="rounded-[10px] border border-[#ddd] bg-white px-8 py-2.5 text-[14px] font-semibold text-black transition hover:bg-gray-50">Hủy</button>
                        <button type="button" onClick={handleAdd} className="rounded-[10px] bg-[#2e7d32] px-8 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   SOLD OUT ITEMS MODAL
   ═══════════════════════════════════════════ */
function SoldOutModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={onClose}>
            <div className="relative w-full max-w-[600px] rounded-[16px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-5">
                    <div />
                    <h3 className="text-[17px] font-bold text-black">Danh sách các món đã hết hôm nay</h3>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-[18px] text-[#555] transition hover:bg-[#e0e0e0]">×</button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                                <th className="py-3 font-medium" />
                                <th className="py-3 font-medium">Tên Món</th>
                                <th className="py-3 font-medium">Số lượng đã bán</th>
                                <th className="py-3 font-medium">Trạng thái món ăn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SOLD_OUT_ITEMS.map((item, i) => (
                                <tr key={i} className="border-b border-[#f0f0f0]">
                                    <td className="py-3 text-black">{i + 1}</td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded-[6px] object-cover" />
                                            <div>
                                                <p className="text-[13px] font-medium text-black">{item.name}</p>
                                                <p className="text-[12px] text-[#f0a050]">{item.price}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 text-black">Đã bán {item.sold}</td>
                                    <td className="py-3 font-semibold text-[#d32f2f]">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   MENU TAB
   ═══════════════════════════════════════════ */
export default function MenuTab() {
    const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
    const [searchText, setSearchText] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [statusFilter, setStatusFilter] = useState('Tất cả');
    const [statusDropdown, setStatusDropdown] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editItem, setEditItem] = useState<MenuItem | null>(null);
    const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [showSoldOut, setShowSoldOut] = useState(false);

    const filteredItems = useMemo(() => {
        return items.filter((i) => {
            if (activeCategory !== 'all' && i.category !== activeCategory) return false;
            if (statusFilter !== 'Tất cả' && i.status !== statusFilter) return false;
            if (searchText && !i.name.toLowerCase().includes(searchText.toLowerCase()) && !i.code.toLowerCase().includes(searchText.toLowerCase())) return false;
            return true;
        });
    }, [items, activeCategory, statusFilter, searchText]);

    const topItems = [...items].sort((a, b) => b.sold - a.sold).slice(0, 2);

    const handleSaveItem = (updated: MenuItem) => {
        setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    };

    const handleDeleteItem = (id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const handleAddItem = (newItem: MenuItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-[22px] font-bold uppercase text-black">QUẢN LÝ MENU</h1>
                <div className="flex items-center gap-3">
                    {/* ② Search */}
                    <div className="flex items-center gap-2 rounded-full border border-[#ddd] bg-white px-4 py-2">
                        <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm món" className="w-40 bg-transparent text-[14px] text-black outline-none placeholder:text-[#999]" />
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                    </div>
                    {/* ③ Add item */}
                    <button type="button" onClick={() => setShowAdd(true)} className="flex items-center gap-2 rounded-[10px] bg-[#2e7d32] px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#256b28]">
                        <span className="text-[16px]">+</span> Thêm món
                    </button>
                </div>
            </div>

            {/* Top selling + Sold out row */}
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                {/* Top selling */}
                <div className="rounded-[12px] bg-white p-5 shadow-sm">
                    <h3 className="text-[15px] font-bold text-black">Top món bán chạy hôm nay</h3>
                    <div className="mt-4 space-y-4">
                        {topItems.map((item, i) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <span className="text-[16px] font-bold text-[#555]">{i + 1} :</span>
                                <img src={item.image} alt={item.name} className="h-12 w-16 rounded-[6px] object-cover" />
                                <div className="flex-1">
                                    <p className="text-[14px] font-medium text-black">{item.name}</p>
                                    <p className="text-[12px] text-[#f0a050]">{item.price}</p>
                                </div>
                                <span className="text-[14px] font-semibold text-[#2e7d32]">{item.sold} Lượt bán</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sold out items */}
                <div className="rounded-[12px] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[15px] font-bold text-black">Danh sách các món đã hết</h3>
                        {/* ④ */}
                        <button type="button" onClick={() => setShowSoldOut(true)} className="text-[13px] font-medium text-[#1976d2] transition hover:underline">Xem thêm</button>
                    </div>
                    <div className="mt-4 space-y-3">
                        {SOLD_OUT_ITEMS.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-[14px] font-bold text-[#555]">{i + 1}</span>
                                <img src={item.image} alt={item.name} className="h-10 w-12 rounded-[6px] object-cover" />
                                <div className="flex-1">
                                    <p className="text-[13px] font-medium text-black">{item.name}</p>
                                    <p className="text-[11px] text-[#f0a050]">{item.price}</p>
                                </div>
                                <span className="text-[13px] font-semibold text-[#d32f2f]">Đã bán {item.sold}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Danh sách món */}
            <div className="mt-5 rounded-[12px] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-[15px] font-bold text-black">Danh sách món</h3>
                    <div className="flex items-center gap-3">
                        {/* ⑤ Sort */}
                        <div className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                            <span>Sắp xếp</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                        {/* Status filter */}
                        <div className="relative">
                            <button type="button" onClick={() => setStatusDropdown(!statusDropdown)} className="flex items-center gap-1 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5 text-[13px] text-black">
                                <span>Trạng thái món</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                            </button>
                            {statusDropdown && (
                                <div className="absolute right-0 top-[calc(100%+4px)] z-10 w-[160px] rounded-[8px] border border-[#ddd] bg-white shadow-lg">
                                    {['Tất cả', ...STATUS_OPTIONS].map((s) => (
                                        <button key={s} type="button" onClick={() => { setStatusFilter(s); setStatusDropdown(false); }} className={`block w-full px-3 py-2 text-left text-[13px] transition hover:bg-[#f6faf4] ${statusFilter === s ? 'font-bold text-[#2e7d32]' : 'text-black'}`}>{s}</button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* ⑥ Search */}
                        <div className="flex items-center gap-2 rounded-[8px] border border-[#ddd] bg-white px-3 py-1.5">
                            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm" className="w-20 bg-transparent text-[13px] text-black outline-none placeholder:text-[#999]" />
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                        </div>
                    </div>
                </div>

                {/* Category tabs */}
                <div className="mt-4 flex items-center gap-1">
                    <span className="mr-2 text-[13px] text-[#888]">Phân loại</span>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.key}
                            type="button"
                            onClick={() => setActiveCategory(cat.key)}
                            className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
                                activeCategory === cat.key
                                    ? 'bg-[#333] text-white'
                                    : 'border border-[#ddd] bg-white text-black hover:bg-gray-50'
                            }`}
                        >
                            {cat.label} ({cat.count})
                        </button>
                    ))}
                </div>

                {/* Table */}
                <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-[13px]">
                        <thead>
                            <tr className="border-b border-[#e8e8e8] text-left text-[#888]">
                                <th className="px-2 py-3 font-medium">STT</th>
                                <th className="px-2 py-3 font-medium">Mã món</th>
                                <th className="px-2 py-3 font-medium">Tên món</th>
                                <th className="px-2 py-3 font-medium">Đơn giá</th>
                                <th className="px-2 py-3 font-medium">Số lượng đã bán</th>
                                <th className="px-2 py-3 font-medium">Trạng thái món ăn</th>
                                <th className="px-2 py-3 font-medium" colSpan={2}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item, idx) => (
                                <tr key={item.id} className="border-b border-[#f0f0f0]">
                                    <td className="px-2 py-3 text-black">{idx + 1}</td>
                                    <td className="px-2 py-3 font-medium text-black">{item.code}</td>
                                    <td className="px-2 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="h-8 w-8 rounded-[4px] object-cover" />
                                            <span className="text-[13px] text-black">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-3 text-[#f0a050]">{item.price}</td>
                                    <td className="px-2 py-3 text-[#2e7d32]">{item.sold} lượt bán</td>
                                    <td className={`px-2 py-3 font-semibold ${STATUS_COLORS[item.status]}`}>{item.status}</td>
                                    <td className="px-2 py-3">
                                        {/* ⑦ Edit */}
                                        <button type="button" onClick={() => setEditItem(item)} className="rounded-[4px] bg-[#f0a050] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#e89030]">Sửa</button>
                                    </td>
                                    <td className="px-2 py-3">
                                        {/* ⑧ Delete */}
                                        <button type="button" onClick={() => setDeleteItem(item)} className="rounded-[4px] bg-[#d32f2f] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#b71c1c]">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-5 flex items-center justify-center gap-1">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">‹</button>
                    {[1, 2, 3, 4, 5, 6].map((p) => (
                        <button key={p} type="button" onClick={() => setCurrentPage(p)} className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition ${currentPage === p ? 'bg-[#2e7d32] font-bold text-white' : 'text-[#555] hover:bg-[#f0f0f0]'}`}>{p}</button>
                    ))}
                    <span className="px-1 text-[13px] text-[#999]">...</span>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] text-[#999] transition hover:bg-[#f0f0f0]">›</button>
                </div>
            </div>

            {/* Modals */}
            {editItem && <EditItemModal item={editItem} onClose={() => setEditItem(null)} onSave={handleSaveItem} />}
            {deleteItem && <DeleteItemModal item={deleteItem} onClose={() => setDeleteItem(null)} onDelete={() => handleDeleteItem(deleteItem.id)} />}
            {showAdd && <AddItemModal onClose={() => setShowAdd(false)} onAdd={handleAddItem} />}
            {showSoldOut && <SoldOutModal onClose={() => setShowSoldOut(false)} />}
        </div>
    );
}
