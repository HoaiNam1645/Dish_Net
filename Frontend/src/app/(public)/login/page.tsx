'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { mockAccounts, type MockAccountType, writeMockSession } from '@/components/Auth/mockSession';

const accountOptions: Array<{
    type: MockAccountType;
    title: string;
    subtitle: string;
    description: string;
    gradient: string;
    previewLabel: string;
}> = [
    {
        type: 'user',
        title: 'Đi Ăn Thôi',
        subtitle: 'Tài khoản người dùng',
        description: 'Dùng để xem bảng tin, khám phá quán, theo dõi review và trải nghiệm luồng mua hàng.',
        gradient: 'from-green-300 to-green-500',
        previewLabel: 'UX cho user',
    },
    {
        type: 'store',
        title: 'Nét Huế - Hàng Bông',
        subtitle: 'Tài khoản cửa hàng',
        description: 'Dùng để xem giao diện phía cửa hàng trong app, vào trang cửa hàng mẫu và kiểm tra các màn public theo ngữ cảnh chủ quán.',
        gradient: 'from-orange-300 to-red-400',
        previewLabel: 'UX cho cửa hàng',
    },
];

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
    const [selectedAccountType, setSelectedAccountType] = useState<MockAccountType>('user');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Show account switcher popup after login
        setShowAccountSwitcher(true);
    };

    const loginAs = (accountType: MockAccountType) => {
        writeMockSession(mockAccounts[accountType]);
        setShowAccountSwitcher(false);
        router.push(accountType === 'store' ? '/explore/store/nearby-1' : '/');
    };

    return (
        <>
            <div className="flex-1 w-full flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="bg-white rounded-[15px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 sm:p-14 w-full max-w-[700px] animate-[fadeInUp_0.5s_ease]">
                    <h1 className="text-3xl font-bold text-center mb-10 text-black">
                        Đăng Nhập
                    </h1>

                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-t-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:z-10 focus-within:relative">
                            <span className="text-text-gray mr-3 flex items-center shrink-0">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Tên đăng nhập hoặc Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                                id="login-email"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex items-center border border-gray-200 border-t-0 px-5 py-4 bg-white rounded-b-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:z-10 focus-within:relative">
                            <span className="text-text-gray mr-3 flex items-center shrink-0">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                                id="login-password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="ml-3 text-text-gray hover:text-green-primary transition-colors focus:outline-none flex-shrink-0 cursor-pointer"
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Options Row */}
                        <div className="flex items-center justify-between mt-6 mb-3 flex-wrap gap-2">
                            <label className="flex items-center gap-2.5 cursor-pointer text-base text-gray-600 select-none">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 accent-green-button cursor-pointer"
                                    id="remember-me"
                                />
                                Lưu thông tin đăng nhập
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-base font-medium text-blue-link hover:text-green-primary hover:underline transition-colors duration-200"
                                id="forgot-password-link"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Link
                            href="/register"
                            className="block text-right text-base text-blue-link mb-8 hover:text-green-primary hover:underline transition-colors duration-200"
                            id="register-link"
                        >
                            Bạn chưa có tài khoản ?
                        </Link>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-4 bg-green-button text-white text-xl font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(97,175,94,0.3)] active:translate-y-0 active:shadow-none cursor-pointer"
                            id="login-submit-btn"
                        >
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
            </div>

            {/* Account Switcher Popup */}
            {showAccountSwitcher && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]">
                    <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-full mx-4 shadow-2xl animate-[fadeInUp_0.3s_ease]">
                        <h2 className="text-xl font-bold text-center text-black mb-2">
                            Chọn kiểu tài khoản để fake đăng nhập
                        </h2>
                        <p className="mb-6 text-center text-sm leading-6 text-[#6b7280]">
                            Bạn có thể vào thử ngay cả luồng người dùng lẫn luồng cửa hàng để kiểm tra UI/UX.
                        </p>
                        <div className="h-px bg-gray-200 mb-6" />

                        <div className="space-y-3">
                            {accountOptions.map((account) => (
                                <button
                                    key={account.type}
                                    onClick={() => setSelectedAccountType(account.type)}
                                    className={`w-full rounded-2xl border-2 p-4 text-left transition-all duration-200 ${
                                        selectedAccountType === account.type
                                            ? 'border-green-button bg-green-button/5 shadow-[0_10px_30px_rgba(97,175,94,0.15)]'
                                            : 'border-transparent hover:border-green-button hover:bg-green-button/5'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${account.gradient} text-white`}>
                                            {account.type === 'user' ? (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            ) : (
                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                                    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                                                    <rect width="20" height="5" x="2" y="7" rx="1" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-lg font-bold text-black">{account.title}</p>
                                                    <p className="text-sm font-medium text-[#6b7280]">{account.subtitle}</p>
                                                </div>
                                                <span className="rounded-full bg-[#f3f7f2] px-3 py-1 text-xs font-bold text-[#2f7d32]">
                                                    {account.previewLabel}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-sm leading-6 text-[#6b7280]">{account.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => loginAs(selectedAccountType)}
                            className="mt-6 w-full rounded-xl bg-green-button py-4 text-base font-bold tracking-wide text-white transition hover:bg-green-hover"
                        >
                            VÀO VỚI {selectedAccountType === 'store' ? 'TÀI KHOẢN CỬA HÀNG' : 'TÀI KHOẢN NGƯỜI DÙNG'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
