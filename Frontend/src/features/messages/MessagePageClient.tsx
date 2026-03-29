'use client';
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';

import type { ReviewerConversation } from '@/features/ranking-reviewer-detail/data';

export default function MessagePageClient({
    conversation,
}: {
    conversation: ReviewerConversation;
}) {
    const [draft, setDraft] = useState('');

    return (
        <div className="bg-[#f4f6f3] px-4 py-5 pb-10 lg:px-6 lg:py-6 lg:pb-12">
            <section className="mx-auto grid h-[calc(100vh-280px)] min-h-[600px] max-h-[760px] max-w-[1480px] grid-cols-[84px_320px_minmax(0,1fr)] overflow-hidden rounded-[30px] border border-[#dfe9d9] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                <aside className="flex flex-col items-center gap-8 border-r border-[#e4efe0] bg-[#fbfdf9] py-8">
                    <button type="button" className="text-[30px] text-[#202020]">⌂</button>
                    <button type="button" className="text-[30px] text-[#202020]">◉</button>
                    <button type="button" className="text-[30px] text-[#ff3158]">➤</button>
                    <button type="button" className="relative text-[30px] text-[#202020]">
                        ☏
                        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff3158] text-[12px] font-bold text-white">1</span>
                    </button>
                </aside>

                <aside className="border-r border-[#e4efe0] bg-white">
                    <div className="border-b border-[#eef3eb] px-8 py-8">
                        <h1 className="text-[48px] font-bold text-black">Tin nhắn</h1>
                    </div>

                    <div className="p-4">
                        <button
                            type="button"
                            className="flex w-full items-center gap-4 rounded-[22px] bg-[#f5f6f3] px-5 py-5 text-left transition hover:bg-[#edf3ea]"
                        >
                            <img src={conversation.avatar} alt={conversation.reviewerName} className="h-16 w-16 rounded-full object-cover" />
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-[20px] font-bold text-[#171717]">{conversation.reviewerName}</div>
                                <div className="mt-1 text-[16px] text-[#7a7a7a]">{conversation.lastSeen}</div>
                            </div>
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3b30] text-[14px] font-bold text-white">1</span>
                        </button>
                    </div>
                </aside>

                <section className="grid min-h-0 grid-rows-[88px_minmax(0,1fr)_96px] bg-[radial-gradient(circle_at_top_left,_rgba(186,230,197,0.22),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fbf6_100%)]">
                    <header className="flex items-center justify-between border-b border-[#e5eee1] px-8">
                        <div className="flex items-center gap-4">
                            <img src={conversation.avatar} alt={conversation.reviewerName} className="h-12 w-12 rounded-full object-cover ring-4 ring-white" />
                            <div>
                                <div className="text-[20px] font-bold text-[#181818]">{conversation.reviewerName}</div>
                                <div className="text-[14px] text-[#5f8e55]">Đang hoạt động gần đây</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button type="button" className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-[#436b3b] shadow-[0_8px_20px_rgba(67,107,59,0.12)]">Xem hồ sơ</button>
                            <button type="button" className="rounded-full bg-[#eff6ec] px-4 py-2 text-[14px] font-semibold text-[#436b3b]">Tắt thông báo</button>
                        </div>
                    </header>

                    <div className="space-y-4 overflow-y-auto px-8 py-6">
                        <div className="mx-auto mb-4 w-max rounded-full bg-[#edf4ea] px-4 py-2 text-[13px] font-semibold text-[#6d7f68]">
                            Hôm nay
                        </div>
                        {conversation.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[560px] rounded-[24px] px-5 py-4 text-[16px] leading-8 shadow-[0_10px_24px_rgba(0,0,0,0.06)] ${
                                        message.from === 'me'
                                            ? 'rounded-br-[8px] bg-[#2f7f27] text-white'
                                            : 'rounded-bl-[8px] bg-white text-[#2f2f2f]'
                                    }`}
                                >
                                    <p>{message.text}</p>
                                    <div className={`mt-2 text-[12px] ${message.from === 'me' ? 'text-white/70' : 'text-[#8a8a8a]'}`}>
                                        {message.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="h-2" />
                    </div>

                    <div className="border-t border-[#e5eee1] bg-white/80 px-6 py-4 backdrop-blur">
                        <div className="flex items-end gap-4 rounded-[24px] border border-[#dbe7d6] bg-white p-3 shadow-[0_16px_30px_rgba(56,97,49,0.08)]">
                            <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f6ef] text-[22px] text-[#4f6b48]">＋</button>
                            <textarea
                                value={draft}
                                onChange={(event) => setDraft(event.target.value)}
                                placeholder="Gửi tin nhắn..."
                                className="max-h-36 min-h-[52px] flex-1 resize-none bg-transparent px-2 py-3 text-[16px] text-[#202020] outline-none placeholder:text-[#9aa69a]"
                            />
                            <div className="flex items-center gap-2">
                                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f6ef] text-[20px] text-[#4f6b48]">🖼</button>
                                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f6ef] text-[20px] text-[#4f6b48]">☺</button>
                                <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2f7f27] text-[20px] text-white">➤</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
