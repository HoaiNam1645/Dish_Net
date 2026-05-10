'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { chatboxApi, type ChatbotMessage } from '@/shared/chatboxApi';
import { useAuth } from '@/shared/AuthContext';

type Props = {
    variant?: 'bubble' | 'page';
    initialPhienId?: number;
    onClose?: () => void;
};

const GOI_Y_KHACH = [
    'Hôm nay ăn gì ngon?',
    'Tìm quán bún bò gần Quận 1',
    'Voucher đang có là gì?',
];

const GOI_Y_NGUOI_DUNG = [
    'Hôm nay ăn gì ngon?',
    'Đơn hàng gần nhất của tôi đang ở đâu?',
    'Có voucher nào đang dùng được không?',
];

const GOI_Y_CHU_CUA_HANG = [
    'Doanh thu cửa hàng 7 ngày qua',
    'Cho tôi xem các đánh giá tiêu cực gần đây',
    'Soạn caption cho món mới',
];

function formatTime(value?: string) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatboxPanel({ variant = 'bubble', initialPhienId, onClose }: Props) {
    const { nguoiDung, dangNhap } = useAuth();
    const [tinNhan, setTinNhan] = useState<ChatbotMessage[]>([]);
    const [draft, setDraft] = useState('');
    const [dangGui, setDangGui] = useState(false);
    const [idPhien, setIdPhien] = useState<number | undefined>(initialPhienId);
    const [loi, setLoi] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!initialPhienId) return;
        let huy = false;
        chatboxApi
            .layLichSu(initialPhienId)
            .then((data) => {
                if (huy) return;
                setTinNhan(data.tin_nhan);
                setIdPhien(data.phien.id);
            })
            .catch((err: Error) => setLoi(err.message));
        return () => {
            huy = true;
        };
    }, [initialPhienId]);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [tinNhan, dangGui]);

    const goiY =
        nguoiDung?.vai_tro === 'chu_cua_hang'
            ? GOI_Y_CHU_CUA_HANG
            : dangNhap
                ? GOI_Y_NGUOI_DUNG
                : GOI_Y_KHACH;

    async function gui(noiDung: string) {
        const text = noiDung.trim();
        if (!text || dangGui) return;
        setLoi(null);
        const tempId = -Date.now();
        setTinNhan((prev) => [
            ...prev,
            { id: tempId, vai_tro: 'user', noi_dung: text, thoi_gian: new Date().toISOString() },
        ]);
        setDraft('');
        setDangGui(true);
        try {
            const res = await chatboxApi.gui(text, idPhien);
            setIdPhien(res.id_phien);
            setTinNhan((prev) => [
                ...prev.map((m) =>
                    m.id === tempId ? { ...m, id: -m.id } : m,
                ),
                res.tin_nhan,
            ]);
        } catch (err) {
            setLoi(err instanceof Error ? err.message : 'Có lỗi xảy ra');
            setTinNhan((prev) => prev.filter((m) => m.id !== tempId));
        } finally {
            setDangGui(false);
        }
    }

    const isPage = variant === 'page';

    return (
        <div
            className={
                isPage
                    ? 'flex h-full w-full flex-col bg-white'
                    : 'flex h-[560px] w-[380px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10'
            }
        >
            <header className="flex items-center justify-between gap-2 border-b border-gray-200 bg-gradient-to-r from-[#2f6f25] to-[#56c194] px-4 py-3 text-white">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">🍜</div>
                    <div>
                        <p className="text-sm font-semibold leading-tight">Trợ lý DishNet</p>
                        <p className="text-[11px] opacity-90">Tư vấn món ăn, cửa hàng, đơn hàng</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {!isPage && (
                        <Link
                            href="/chatbox"
                            className="rounded px-2 py-1 text-xs hover:bg-white/15"
                            title="Mở trang chat đầy đủ"
                        >
                            Mở rộng
                        </Link>
                    )}
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded p-1 text-lg leading-none hover:bg-white/15"
                            aria-label="Đóng"
                        >
                            ×
                        </button>
                    )}
                </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-4">
                {tinNhan.length === 0 && !dangGui && (
                    <div className="space-y-3">
                        <div className="rounded-xl bg-white p-3 text-sm text-gray-700 shadow-sm">
                            Xin chào{nguoiDung ? ` ${nguoiDung.ten_hien_thi}` : ''}! Tôi có thể giúp bạn tìm món, tìm cửa hàng, tra đơn hàng và voucher trên DishNet.
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {goiY.map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => gui(g)}
                                    className="rounded-full border border-[#cfe6c4] bg-white px-3 py-1 text-xs text-[#2f6f25] hover:bg-[#eef8ea]"
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {tinNhan.map((m) => (
                    <div
                        key={m.id}
                        className={m.vai_tro === 'user' ? 'flex justify-end' : 'flex justify-start'}
                    >
                        <div
                            className={
                                m.vai_tro === 'user'
                                    ? 'max-w-[80%] rounded-2xl rounded-br-sm bg-[#2f6f25] px-3 py-2 text-sm text-white shadow'
                                    : 'max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-gray-800 shadow ring-1 ring-black/5'
                            }
                        >
                            {m.noi_dung}
                            <div className={m.vai_tro === 'user' ? 'mt-1 text-right text-[10px] opacity-80' : 'mt-1 text-[10px] text-gray-400'}>
                                {formatTime(m.thoi_gian)}
                            </div>
                        </div>
                    </div>
                ))}
                {dangGui && (
                    <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm text-gray-500 shadow ring-1 ring-black/5">
                            <span className="inline-flex gap-1">
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
                            </span>
                        </div>
                    </div>
                )}
                {loi && (
                    <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{loi}</div>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    void gui(draft);
                }}
                className="flex items-end gap-2 border-t border-gray-200 bg-white p-3"
            >
                <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            void gui(draft);
                        }
                    }}
                    placeholder="Hỏi tôi bất cứ điều gì về món ăn, cửa hàng, đơn hàng…"
                    className="max-h-32 min-h-[40px] flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#56c194] focus:outline-none focus:ring-1 focus:ring-[#56c194]"
                    rows={1}
                />
                <button
                    type="submit"
                    disabled={dangGui || !draft.trim()}
                    className="rounded-lg bg-[#2f6f25] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#245a1c] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Gửi
                </button>
            </form>
        </div>
    );
}
