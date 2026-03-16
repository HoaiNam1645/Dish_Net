'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterVerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [countdown, setCountdown] = useState(60);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (countdown > 0 && !showSuccessModal) {
            const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [countdown, showSuccessModal]);

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
            const next = document.getElementById(`reg-otp-${index + 1}`);
            next?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prev = document.getElementById(`reg-otp-${index - 1}`);
            prev?.focus();
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setShowSuccessModal(true);
    };

    return (
        <>
            <div className="flex-1 w-full flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="bg-white rounded-[15px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 sm:p-14 w-full max-w-[700px] animate-[fadeInUp_0.5s_ease]">
                    <h1 className="text-3xl font-bold text-center mb-10 text-black">
                        Đăng ký
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col items-center">
                        <p className="text-lg text-gray-500 mb-2 font-medium">Mã xác nhận</p>

                        <div className="flex gap-3 mb-4">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`reg-otp-${i}`}
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
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]">
                    <div className="bg-white rounded-xl p-10 sm:p-12 max-w-md w-full mx-4 text-center shadow-2xl animate-[fadeInUp_0.3s_ease]">
                        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-button/10 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#61AF5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-green-primary mb-6">
                            BẠN ĐÃ TẠO TÀI KHOẢN THÀNH CÔNG
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
