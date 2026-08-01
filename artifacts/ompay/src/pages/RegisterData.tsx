import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export interface UserData {
  name: string;
  phone: string;
  id: string;
}

interface Props {
  onBack: () => void;
  onNext: (data: UserData) => void;
}

export default function RegisterData({ onBack, onNext }: Props) {
  const [name, setName]   = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId]       = useState('');

  const isValid =
    name.trim().length > 0 &&
    phone.replace(/\D/g, '').length === 8 &&
    id.length === 9;

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
      dir="rtl"
    >
      <div
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col relative sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl"
        style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase">OMPAY</h1>
          <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
            <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-2 pb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 right-[calc(16.66%)] left-[calc(16.66%)] h-[2px] bg-[#1e3a8a]/60" />
            <div className="absolute top-4 right-1/2 left-[calc(16.66%)] h-[2px] bg-blue-600" />

            {/* Step 1 — done */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.6)]">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-400">اختيار الساعة</span>
            </div>

            {/* Step 2 — current */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-blue-600/25 shadow-[0_0_16px_rgba(37,99,235,0.7)]">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <span className="text-[11px] text-white font-semibold">تسجيل البيانات</span>
            </div>

            {/* Step 3 — upcoming */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full border-2 border-slate-600 bg-[#0b1426] flex items-center justify-center">
                <span className="text-slate-500 font-bold text-sm">3</span>
              </div>
              <span className="text-[11px] text-slate-500">تسجيل البطاقة</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col">
          <h2 className="text-white text-[2rem] font-bold mb-1">تسجيل البيانات</h2>
          <p className="text-slate-400 text-sm mb-6">يرجى إدخال بياناتك الشخصية</p>

          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="rounded-2xl border border-white/10 bg-[#111e35] px-4 pt-3 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">الاسم الكامل</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل الاسم الكامل"
                className="w-full bg-transparent text-slate-400 text-sm placeholder-slate-600 outline-none text-right"
              />
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-white/10 bg-[#111e35] px-4 pt-3 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">رقم الهاتف</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '');
                  const enforced = '9' + raw.replace(/^9/, '').slice(0, 7);
                  setPhone(enforced);
                }}
                placeholder="9xxxxxxx"
                maxLength={8}
                className="w-full bg-transparent text-slate-400 text-sm placeholder-slate-600 outline-none text-right"
                dir="ltr"
              />
            </div>

            {/* ID */}
            <div className="rounded-2xl border border-white/10 bg-[#111e35] px-4 pt-3 pb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">رقم الهوية</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              </div>
              <input
                type="tel"
                value={id}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                  setId(digits);
                }}
                placeholder="أدخل رقم الهوية"
                maxLength={9}
                className="w-full bg-transparent text-slate-400 text-sm placeholder-slate-600 outline-none text-right"
              />
            </div>

            {/* Info box */}
            <div className="rounded-2xl border border-blue-900/40 bg-[#0d1b30] px-4 py-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 text-right">
                <p className="text-white text-sm font-semibold mb-1">لماذا نطلب هذه المعلومات؟</p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  تستخدم بياناتك للتحقق من هويتك وتفعيل خدمة الدفع الذكية بأعلى مستويات الأمان.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1" />
        </div>

        {/* Bottom */}
        <div className="px-5 pb-10 pt-4 bg-gradient-to-t from-[#0b1426] to-transparent">
          <button
            onClick={isValid ? () => onNext({ name, phone, id }) : undefined}
            disabled={!isValid}
            className={`w-full rounded-[20px] py-4 text-xl font-bold transition-all ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-lg shadow-blue-600/30 cursor-pointer'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            متابعة
          </button>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-500">
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs font-medium">جميع البيانات محمية وآمنة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
