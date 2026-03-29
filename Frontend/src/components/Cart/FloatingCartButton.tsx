'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { readMockSession } from '@/components/Auth/mockSession';
import CartModal from '@/components/Cart/CartModal';
import { ensureMockCart, getMockCartUpdatedEventName, getSelectedItemCount, readMockCart } from '@/components/Cart/mockCart';

export default function FloatingCartButton() {
    const pathname = usePathname();
    const [shouldShow, setShouldShow] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const session = readMockSession();
        setShouldShow(session.isAuthenticated && session.accountType === 'user');

        const cart = ensureMockCart();
        setSelectedCount(getSelectedItemCount(cart));

        const handleCartUpdated = () => {
            setSelectedCount(getSelectedItemCount(readMockCart()));
        };

        window.addEventListener(getMockCartUpdatedEventName(), handleCartUpdated);
        window.addEventListener('storage', handleCartUpdated);

        return () => {
            window.removeEventListener(getMockCartUpdatedEventName(), handleCartUpdated);
            window.removeEventListener('storage', handleCartUpdated);
        };
    }, []);

    if (!shouldShow || pathname === '/checkout') return null;

    return (
        <>
            <button
                type="button"
                aria-label="Giỏ hàng"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-40 flex h-[92px] w-[92px] items-center justify-center rounded-full border border-[#d8d8d8] bg-white shadow-[0_14px_28px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(0,0,0,0.14)]"
            >
                <span className="text-[44px]">🛍️</span>
                <span className="absolute bottom-[8px] right-[8px] flex h-11 min-w-11 items-center justify-center rounded-full bg-[#ff5a2c] px-2 text-[18px] font-bold leading-none text-white">
                    {selectedCount}
                </span>
            </button>

            <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
