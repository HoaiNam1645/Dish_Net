'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        displayName: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push('/register/verify');
    };

    return (
        <div className="flex-1 w-full flex items-center justify-center px-4 py-8 sm:py-12">
            <div className="bg-white rounded-[15px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 sm:p-14 w-full max-w-[700px] animate-[fadeInUp_0.5s_ease]">
                <h1 className="text-3xl font-bold text-center mb-10 text-black">
                    Đăng Ký
                </h1>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* Mail Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                            required
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* Phone Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </span>
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                            required
                        />
                    </div>

                    {/* Display Name Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* User Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Tên hiển thị"
                            id="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                            required
                        />
                    </div>

                    {/* Address / Location Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* Map Pin Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Khu vực / Địa chỉ"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* Lock Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mật khẩu"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                            required
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

                    {/* Confirm Password Input */}
                    <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                        <span className="text-text-gray mr-3 flex items-center shrink-0">
                            {/* Lock Icon */}
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </span>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Xác nhận mật khẩu"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="ml-3 text-text-gray hover:text-green-primary transition-colors focus:outline-none flex-shrink-0 cursor-pointer"
                            aria-label={showConfirmPassword ? "Ẩn xác nhận mật khẩu" : "Hiện xác nhận mật khẩu"}
                        >
                            {showConfirmPassword ? (
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

                    <div className="text-center mt-2 mb-4">
                        <span className="text-base text-gray-500">Đã có tài khoản? </span>
                        <Link href="/login" className="text-base text-blue-link font-medium hover:text-green-primary transition-colors duration-200">
                            Đăng nhập
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-green-button text-white text-xl font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(97,175,94,0.3)] active:translate-y-0 active:shadow-none cursor-pointer"
                        id="register-submit-btn"
                    >
                        ĐĂNG KÝ
                    </button>
                </form>
            </div>
        </div>
    );
}
