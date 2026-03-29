'use client';
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { useRef, useState } from 'react';

import type { UserProfile } from '@/features/profile/data';

/* ═══════════════════════════════════════════
   EDIT PROFILE CLIENT COMPONENT
   ═══════════════════════════════════════════ */
export default function EditProfilePageClient({ profile }: { profile: UserProfile }) {
    const [name, setName] = useState(profile.name);
    const [handle, setHandle] = useState(profile.handle);
    const [gender, setGender] = useState(profile.gender);
    const [birthday, setBirthday] = useState(profile.birthday);
    const [showBadge, setShowBadge] = useState(profile.showBadge);
    const [showTrustScore, setShowTrustScore] = useState(profile.showTrustScore);
    const [isPrivate, setIsPrivate] = useState(profile.isPrivate);
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }, 800);
    };

    return (
        <div className="bg-[#f1f2f1] py-8">
            <section className="mx-auto w-full max-w-[1280px] overflow-hidden rounded-[28px] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
                {/* ── Header ── */}
                <div className="flex items-center justify-between border-b border-[#e2e3e2] px-10 py-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/user/profile"
                            className="flex h-10 w-10 items-center justify-center rounded-full text-[#777] transition hover:bg-gray-100"
                            id="btn-back-profile"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 12H5" />
                                <path d="m12 19-7-7 7-7" />
                            </svg>
                        </Link>
                        <h1 className="text-[24px] font-bold text-black">Sửa trang cá nhân</h1>
                    </div>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`rounded-[10px] px-8 py-3 text-[16px] font-bold transition ${
                            saved
                                ? 'bg-[#EAF8EB] text-[#258F22]'
                                : 'bg-green-primary text-white hover:bg-[#1e4a13]'
                        } disabled:opacity-60`}
                        id="btn-save-profile"
                    >
                        {isSaving ? 'Đang lưu...' : saved ? '✓ Đã lưu' : 'Lưu thay đổi'}
                    </button>
                </div>

                <div className="px-10 py-8">
                    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
                        {/* ── LEFT: Avatar section ── */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-[#f6f1ca] p-4">
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="h-[150px] w-[150px] rounded-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => avatarInputRef.current?.click()}
                                    className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#333] text-white shadow-lg transition hover:bg-[#555]"
                                    id="btn-change-avatar"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                </button>
                                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" id="input-avatar" />
                            </div>

                            <button
                                type="button"
                                onClick={() => coverInputRef.current?.click()}
                                className="mt-4 rounded-[10px] bg-[#333] px-5 py-2.5 text-[14px] font-bold text-white transition hover:bg-[#555]"
                                id="btn-change-cover"
                            >
                                Đổi ảnh
                            </button>
                            <input ref={coverInputRef} type="file" accept="image/*" className="hidden" id="input-cover" />

                            {/* Badges */}
                            <div className="mt-6 flex flex-col gap-3">
                                {profile.isTopReviewer && (
                                    <span className="rounded-full bg-[#FAEACD] px-5 py-2 text-center text-[13px] font-bold text-[#1a1a1a]">
                                        ⭐ TOP 10 REVIEWER
                                    </span>
                                )}
                                <span className="rounded-full bg-[#FAD3CD] px-5 py-2 text-center text-[13px] font-bold text-[#1a1a1a]">
                                    ĐỘ UY TÍN <span className="ml-1 text-[#F50B0B]">{profile.trustScore}</span>
                                </span>
                            </div>
                        </div>

                        {/* ── RIGHT: Edit form fields ── */}
                        <div className="space-y-7">
                            {/* Tên tài khoản */}
                            <div>
                                <label className="mb-2 block text-[16px] font-bold text-[#616462]">
                                    Tên tài khoản
                                </label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="flex-1 rounded-[10px] border border-[#B7AFAF] bg-white px-4 py-3 text-[16px] text-black outline-none transition focus:border-green-primary"
                                        placeholder="Tên hiển thị"
                                        id="input-name"
                                    />
                                    <input
                                        type="text"
                                        value={handle}
                                        onChange={(e) => setHandle(e.target.value)}
                                        className="flex-1 rounded-[10px] border border-[#B7AFAF] bg-white px-4 py-3 text-[16px] text-black outline-none transition focus:border-green-primary"
                                        placeholder="Handle"
                                        id="input-handle"
                                    />
                                </div>
                            </div>

                            {/* Chế độ tài khoản riêng tư */}
                            <div className="flex items-center justify-between">
                                <label className="text-[16px] font-bold text-[#616462]">
                                    Chế độ tài khoản riêng tư
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsPrivate(!isPrivate)}
                                    className={`relative h-8 w-14 rounded-full transition-colors ${
                                        isPrivate ? 'bg-green-primary' : 'bg-[#ccc]'
                                    }`}
                                    id="toggle-private"
                                >
                                    <span
                                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                                            isPrivate ? 'left-7' : 'left-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Hiển thị huy hiệu */}
                            <div className="rounded-[12px] border border-[#e8e8e8] px-5 py-4">
                                <h3 className="mb-4 text-[16px] font-bold text-[#616462]">
                                    Hiển thị huy hiệu
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="rounded-full bg-[#FAEACD] px-3 py-1 text-[12px] font-bold text-[#1a1a1a]">⭐</span>
                                            <span className="text-[15px] text-black">Hiển thị huy hiệu Top Reviewer</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowBadge(!showBadge)}
                                            className={`relative h-8 w-14 rounded-full transition-colors ${
                                                showBadge ? 'bg-green-primary' : 'bg-[#ccc]'
                                            }`}
                                            id="toggle-badge"
                                        >
                                            <span
                                                className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                                                    showBadge ? 'left-7' : 'left-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="rounded-full bg-[#FAD3CD] px-3 py-1 text-[12px] font-bold text-[#1a1a1a]">⭐</span>
                                            <span className="text-[15px] text-black">Hiển thị độ uy tín</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowTrustScore(!showTrustScore)}
                                            className={`relative h-8 w-14 rounded-full transition-colors ${
                                                showTrustScore ? 'bg-green-primary' : 'bg-[#ccc]'
                                            }`}
                                            id="toggle-trust"
                                        >
                                            <span
                                                className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                                                    showTrustScore ? 'left-7' : 'left-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Giới tính */}
                            <div>
                                <label className="mb-2 block text-[16px] font-bold text-[#616462]">
                                    Giới tính
                                </label>
                                <div className="flex gap-4">
                                    {['Nam', 'Nữ', 'Khác'].map((g) => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setGender(g)}
                                            className={`flex-1 rounded-[10px] border px-4 py-3 text-[16px] font-medium transition ${
                                                gender === g
                                                    ? 'border-green-primary bg-[#DCEBDC] text-green-primary'
                                                    : 'border-[#B7AFAF] bg-white text-[#616462] hover:border-gray-400'
                                            }`}
                                            id={`gender-${g.toLowerCase()}`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Giới tính (text field fallback) */}
                            <div>
                                <label className="mb-2 block text-[16px] font-bold text-[#616462]">
                                    Giới tính
                                </label>
                                <input
                                    type="text"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full rounded-[10px] border border-[#B7AFAF] bg-white px-4 py-3 text-[16px] text-black outline-none transition focus:border-green-primary"
                                    placeholder="Nhập giới tính"
                                    id="input-gender"
                                />
                            </div>

                            {/* Ngày sinh */}
                            <div>
                                <label className="mb-2 block text-[16px] font-bold text-[#616462]">
                                    Ngày sinh
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        placeholder="dd/mm/yyyy"
                                        className="w-full rounded-[10px] border border-[#B7AFAF] bg-white px-4 py-3 pr-12 text-[16px] text-black outline-none transition focus:border-green-primary"
                                        id="input-birthday"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
