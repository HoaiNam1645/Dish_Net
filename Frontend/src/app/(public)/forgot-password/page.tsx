'use client';

import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Countdown timer for OTP
    useEffect(() => {
        if (step === 2 && countdown > 0) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [step, countdown]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        if (value && index < 5) {
            const next = document.getElementById(`otp-${index + 1}`);
            next?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            prev?.focus();
        }
    };

    const handleStep1 = (e: FormEvent) => {
        e.preventDefault();
        setCountdown(60);
        setStep(2);
    };

    const handleStep2 = (e: FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const handleStep3 = (e: FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        if (newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu không khớp ! Vui lòng nhập lại.');
            return;
        }
        setShowSuccessModal(true);
    };

    // Eye icon component
    const EyeIcon = ({ show, onClick, label }: { show: boolean; onClick: () => void; label: string }) => (
        <button
            type="button"
            onClick={onClick}
            className="ml-3 text-text-gray hover:text-green-primary transition-colors focus:outline-none flex-shrink-0 cursor-pointer"
            aria-label={label}
        >
            {show ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            )}
        </button>
    );

    return (
        <>
            <div className="flex-1 w-full flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="bg-white rounded-[15px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 sm:p-14 w-full max-w-[700px] animate-[fadeInUp_0.5s_ease]">

                    {/* ========== STEP 1: Enter Email ========== */}
                    {step === 1 && (
                        <>
                            <h1 className="text-3xl font-bold text-center mb-10 text-black">
                                Quên Mật Khẩu
                            </h1>
                            <form onSubmit={handleStep1} className="flex flex-col">
                                <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                                    <span className="text-text-gray mr-3 flex items-center shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                                        id="forgot-email"
                                        required
                                    />
                                </div>

                                <Link
                                    href="/register"
                                    className="block text-right text-base text-blue-link mt-4 mb-8 hover:text-green-primary hover:underline transition-colors duration-200"
                                >
                                    Bạn chưa có tài khoản ?
                                </Link>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-green-button text-white text-xl font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(97,175,94,0.3)] active:translate-y-0 active:shadow-none cursor-pointer"
                                >
                                    GỬI
                                </button>
                            </form>
                        </>
                    )}

                    {/* ========== STEP 2: Enter OTP ========== */}
                    {step === 2 && (
                        <>
                            <h1 className="text-3xl font-bold text-center mb-10 text-black">
                                Quên Mật Khẩu
                            </h1>
                            <form onSubmit={handleStep2} className="flex flex-col items-center">
                                <p className="text-lg text-gray-500 mb-2 font-medium">Mã xác nhận</p>

                                <div className="flex gap-3 mb-4">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl bg-white focus:border-green-button focus:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus:outline-none transition-all duration-200"
                                        />
                                    ))}
                                </div>

                                <p className="text-sm text-gray-400 mb-8">
                                    Mã xác nhận chỉ có hiệu lực trong vòng 01 tiếng.{' '}
                                    <span className="font-bold text-green-primary">{formatTime(countdown)}</span>
                                </p>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-green-button text-white text-xl font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(97,175,94,0.3)] active:translate-y-0 active:shadow-none cursor-pointer"
                                >
                                    GỬI
                                </button>
                            </form>
                        </>
                    )}

                    {/* ========== STEP 3: New Password ========== */}
                    {step === 3 && (
                        <>
                            <h1 className="text-3xl font-bold text-center mb-10 text-black">
                                Quên Mật Khẩu
                            </h1>
                            <form onSubmit={handleStep3} className="flex flex-col gap-4">
                                {/* New Password */}
                                <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                                    <span className="text-text-gray mr-3 flex items-center shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        placeholder="Mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                                        required
                                    />
                                    <EyeIcon show={showNewPassword} onClick={() => setShowNewPassword(!showNewPassword)} label={showNewPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} />
                                </div>

                                {/* Confirm New Password */}
                                <div className="flex items-center border border-gray-200 px-5 py-4 bg-white rounded-lg transition-all duration-200 focus-within:border-green-button focus-within:shadow-[0_0_0_3px_rgba(97,175,94,0.1)] focus-within:relative">
                                    <span className="text-text-gray mr-3 flex items-center shrink-0">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                    </span>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Xác nhận mật khẩu mới"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="flex-1 text-lg bg-transparent placeholder:text-text-gray border-none focus:outline-none"
                                        required
                                    />
                                    <EyeIcon show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} label={showConfirmPassword ? 'Ẩn xác nhận' : 'Hiện xác nhận'} />
                                </div>

                                {/* Error message */}
                                {passwordError && (
                                    <p className="text-red-500 text-base font-medium animate-[fadeInUp_0.3s_ease]">
                                        {passwordError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full mt-4 py-4 bg-green-button text-white text-xl font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(97,175,94,0.3)] active:translate-y-0 active:shadow-none cursor-pointer"
                                >
                                    ĐẶT LẠI
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* ========== SUCCESS MODAL ========== */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]">
                    <div className="bg-white rounded-xl p-10 sm:p-12 max-w-md w-full mx-4 text-center shadow-2xl animate-[fadeInUp_0.3s_ease]">
                        {/* Checkmark icon */}
                        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-button/10 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61AF5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-green-primary mb-6">
                            BẠN ĐÃ ĐỔI MẬT KHẨU THÀNH CÔNG
                        </h2>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full py-3 bg-green-button text-white text-lg font-bold rounded-lg tracking-wider transition-all duration-200 hover:bg-green-hover cursor-pointer"
                        >
                            ĐĂNG NHẬP
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
