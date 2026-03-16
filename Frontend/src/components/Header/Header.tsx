'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentQuery = searchParams.get('q') ?? '';
    const isHome = pathname === '/';
    const [searchValue, setSearchValue] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [recentSearches, setRecentSearches] = useState([
        'Bún bò',
        'Mỳ Quảng',
        'Khu AAA',
        'Cơm ngon bếp việt',
        'Cơm ngon hà thành',
        'chay express',
    ]);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const submitSearch = (query: string) => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        setRecentSearches((current) => [
            trimmedQuery,
            ...current.filter((entry) => entry.toLowerCase() !== trimmedQuery.toLowerCase()),
        ].slice(0, 6));
        setIsSearchOpen(false);
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    };

    return (
        <header className="flex items-center justify-between px-5 py-1.5 bg-white sticky top-0 z-50 border-b-2 border-border-green">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="DishNet Logo"
                        width={80}
                        height={80}
                        className="w-20 h-auto flex-shrink-0"
                        priority
                    />
                </Link>
                <div ref={searchRef} className="relative">
                    <div className={`flex items-center border rounded-full px-5 py-2.5 min-w-[300px] bg-white transition-all duration-200 ${isSearchOpen
                        ? 'border-green-primary shadow-[0_0_0_3px_rgba(40,94,25,0.08)]'
                        : 'border-border-gray focus-within:border-green-primary focus-within:shadow-[0_0_0_3px_rgba(40,94,25,0.1)]'
                        }`}>
                        <span className="text-text-gray mr-2.5">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Tìm kiếm trên DishNet"
                            value={isSearchOpen ? searchValue : currentQuery || searchValue}
                            onFocus={() => {
                                setSearchValue(currentQuery || searchValue);
                                setIsSearchOpen(true);
                            }}
                            onChange={(event) => setSearchValue(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    submitSearch(searchValue);
                                }
                            }}
                            className="flex-1 text-base bg-transparent placeholder:text-text-gray border-none"
                            id="search-input"
                        />
                    </div>

                    {isSearchOpen && (
                        <div className="absolute left-0 top-[calc(100%+18px)] z-50 w-[520px] overflow-hidden rounded-[20px] border border-[#edf2eb] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                            <div className="px-8 py-5 text-[22px] font-bold text-[#6f796f]">
                                Mới đây
                            </div>
                            <div className="pb-4">
                                {recentSearches.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-between gap-4 px-8 py-3 text-[18px] text-black transition hover:bg-[#f8faf8]"
                                    >
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cfd5cf] text-[#8b948b]">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="9" />
                                                    <path d="M12 7v5l3 3" />
                                                </svg>
                                            </span>
                                            <button
                                                onClick={() => submitSearch(item)}
                                                className="truncate text-left"
                                            >
                                                {item}
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => setRecentSearches((current) => current.filter((entry) => entry !== item))}
                                            className="text-[24px] leading-none text-[#909090] transition hover:text-black"
                                            aria-label={`Xóa ${item}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex items-center gap-3">
                <Link
                    href="/"
                    className={`text-lg font-bold px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 ${isHome
                        ? 'text-green-primary'
                        : 'text-text-gray hover:text-green-primary hover:bg-green-primary/5'
                        }`}
                >
                    Bảng Tin
                </Link>
                <Link
                    href="/"
                    className="text-lg font-bold text-text-gray px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 hover:text-green-primary hover:bg-green-primary/5"
                >
                    Bảng Xếp Hạng
                </Link>
                <Link
                    href="/"
                    className="text-lg font-bold text-text-gray px-5 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 hover:text-green-primary hover:bg-green-primary/5"
                >
                    Khám Phá
                </Link>
                <Link
                    href="/login"
                    className="bg-green-primary text-white text-base font-bold px-8 py-3 rounded-full border border-green-primary whitespace-nowrap transition-all duration-200 hover:bg-[#1e4a13] hover:-translate-y-0.5 active:translate-y-0"
                    id="header-login-btn"
                >
                    Đăng nhập
                </Link>
            </nav>
        </header>
    );
}
