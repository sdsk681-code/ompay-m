import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import cardImg from '../assets/card-crop.jpg';

interface Props {
  onBack: () => void;
}

export default function RegisterCard({ onBack }: Props) {
  const [cardName,   setCardName]   = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry,     setExpiry]     = useState('');
  const [cvv,        setCvv]        = useState('');
  const [saveCard, setSaveCard] = useState(true);

  /* ── Luhn algorithm ── */
  const luhn = (num: string) => {
    const digits = num.replace(/\s/g, '');
    if (digits.length !== 16 || !/^\d+$/.test(digits)) return false;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = parseInt(digits[digits.length - 1 - i]);
      if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
      sum += d;
    }
    return sum % 10 === 0;
  };

  /* ── Expiry validation ── */
  const expiryValid = (val: string) => {
    const m = val.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!m) return false;
    const month = parseInt(m[1]);
    const year  = 2000 + parseInt(m[2]);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    return new Date(year, month, 0) >= new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const cardOk   = luhn(cardNumber);
  const expiryOk = expiryValid(expiry);
  const cvvOk    = cvv.length === 3;
  const nameOk   = cardName.trim().length > 0;

  const isValid = nameOk && cardOk && expiryOk && cvvOk;

  /* ── helpers ── */
  const handleCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    setCardNumber(digits.replace(/(.{4})/g, '$1 ').trim());
  };

  const handleExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) setExpiry(digits);
    else setExpiry(digits.slice(0, 2) + ' / ' + digits.slice(2));
  };

  const handleCvv = (v: string) => setCvv(v.replace(/\D/g, '').slice(0, 3));

  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
      dir="rtl"
    >
      <div
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col relative sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl overflow-y-auto"
        style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 flex-shrink-0">
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

        {/* ── Progress Steps ── */}
        <div className="px-6 pt-2 pb-5 flex-shrink-0">
          <div className="flex items-center justify-between relative">
            {/* connecting lines */}
            <div className="absolute top-4 right-[calc(16.66%)] left-[calc(16.66%)] h-[2px] bg-blue-600" />
            <div className="absolute top-4 right-1/2 left-[calc(16.66%)] h-[2px] bg-blue-600" />

            {/* Step 1 done */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-400">اختيار الساعة</span>
            </div>

            {/* Step 2 done */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-[11px] text-slate-400">تسجيل البيانات</span>
            </div>

            {/* Step 3 current */}
            <div className="flex flex-col items-center gap-1 z-10 w-1/3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-4 ring-blue-600/30 shadow-[0_0_18px_rgba(37,99,235,0.8)]">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <span className="text-[11px] text-white font-semibold">تسجيل البطاقة</span>
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 px-5 pb-6 flex flex-col">
          <h2 className="text-white text-[2rem] font-bold mb-1">تسجيل البطاقة</h2>
          <p className="text-slate-400 text-sm mb-5">أضف بطاقتك للاستمتاع بتجربة دفع سلسة وآمنة</p>

          {/* ── Card visual ── */}
          <div
            className="rounded-[20px] mb-5 overflow-hidden flex-shrink-0 w-full"
            style={{ boxShadow: '0 0 0 2px #c9a84c, 0 8px 32px rgba(201,168,76,0.35)' }}
          >
            <img
              src={cardImg}
              alt="VISA Card"
              className="w-full h-auto block"
            />
          </div>

          {/* ── Input Fields ── */}
          <div className="flex flex-col gap-3">

            {/* helper: border colour by field state */}
            {/* empty → neutral | typed+ok → green | typed+bad → red */}

            {/* Cardholder name */}
            <div className={`rounded-2xl border bg-[#111e35] px-4 pt-3 pb-3 transition-colors ${
              !cardName ? 'border-white/10' : nameOk ? 'border-green-500/60' : 'border-red-500/60'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">اسم حامل البطاقة</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="كما هو مكتوب على البطاقة"
                className="w-full bg-transparent text-slate-300 text-sm placeholder-slate-600 outline-none text-right"
              />
            </div>

            {/* Card number */}
            <div className={`rounded-2xl border bg-[#111e35] px-4 pt-3 pb-3 transition-colors ${
              !cardNumber ? 'border-white/10' : cardOk ? 'border-green-500/60' : 'border-red-500/60'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white text-sm font-semibold">رقم البطاقة</span>
                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              </div>
              <input
                type="tel"
                value={cardNumber}
                onChange={(e) => handleCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full bg-transparent text-slate-300 text-sm placeholder-slate-600 outline-none text-right tracking-widest"
                dir="ltr"
              />
              {cardNumber && !cardOk && (
                <p className="text-red-400 text-xs mt-1 text-right">رقم البطاقة غير صحيح</p>
              )}
            </div>

            {/* Expiry + CVV side by side */}
            <div className="flex gap-3">
              {/* CVV */}
              <div className={`flex-1 rounded-2xl border bg-[#111e35] px-4 pt-3 pb-3 transition-colors ${
                !cvv ? 'border-white/10' : cvvOk ? 'border-green-500/60' : 'border-red-500/60'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-semibold">CVV</span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={cvv}
                  onChange={(e) => handleCvv(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  className="w-full bg-transparent text-slate-300 text-sm placeholder-slate-600 outline-none text-right tracking-widest"
                  dir="ltr"
                />
              </div>

              {/* Expiry */}
              <div className={`flex-1 rounded-2xl border bg-[#111e35] px-4 pt-3 pb-3 transition-colors ${
                !expiry ? 'border-white/10' : expiryOk ? 'border-green-500/60' : 'border-red-500/60'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-semibold">تاريخ الانتهاء</span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={expiry}
                  onChange={(e) => handleExpiry(e.target.value)}
                  placeholder="MM / YY"
                  maxLength={7}
                  className="w-full bg-transparent text-slate-300 text-sm placeholder-slate-600 outline-none text-right tracking-widest"
                  dir="ltr"
                />
                {expiry.length >= 5 && !expiryOk && (
                  <p className="text-red-400 text-xs mt-1 text-right">تاريخ منتهي أو غير صحيح</p>
                )}
              </div>
            </div>

            {/* Save card toggle */}
            <div className="flex items-center justify-between px-1 py-1">
              <span className="text-slate-300 text-sm">حفظ البطاقة لاستخدام أسرع</span>
              {/* Toggle */}
              <button
                onClick={() => setSaveCard((v) => !v)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${saveCard ? 'bg-blue-600' : 'bg-slate-600'}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${saveCard ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="px-5 pb-10 pt-4 flex-shrink-0">
          <button
            disabled={!isValid}
            className={`w-full rounded-[20px] py-4 text-xl font-bold transition-all ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-lg shadow-blue-600/30 cursor-pointer'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            تسجيل البطاقة
          </button>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-500">
            <svg className="w-4 h-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-medium">جميع البيانات محمية</span>
          </div>
        </div>
      </div>
    </div>
  );
}
