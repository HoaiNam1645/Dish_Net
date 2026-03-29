'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function LoginRequiredModal({
    isOpen,
    onClose,
    title = 'Đăng nhập để tiếp tục nhé',
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}) {
    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/45 px-4" onClick={onClose}>
            <div
                className="relative w-full max-w-[860px] rounded-[20px] bg-white px-8 pb-12 pt-14 shadow-[0_28px_80px_rgba(0,0,0,0.2)]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-6 top-4 text-[52px] leading-none text-black transition hover:opacity-65"
                    aria-label="Đóng đăng nhập bắt buộc"
                >
                    ×
                </button>

                <h2 className="text-center text-[48px] font-bold leading-tight text-[#172554]">
                    {title}
                </h2>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/login"
                        className="inline-flex min-w-[280px] items-center justify-center rounded-full border border-[#cfd5df] px-10 py-4 text-[22px] font-bold text-[#1f2937] transition hover:bg-[#f8fafc]"
                    >
                        Đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
}
