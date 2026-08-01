import React from 'react';
import prizesImg from '../assets/prizes.jpg';

interface Props {
  onNext: () => void;
}

export default function LandingPage({ onNext }: Props) {
  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center font-sans"
      style={{ background: '#0a0a0a' }}
      dir="rtl"
    >
      <div
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col relative sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1200 100%)' }}
      >
        {/* Logo top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-10 z-20">
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase drop-shadow-lg">
            OMPAY
          </h1>
        </div>

        {/* Prize Image — fills top 70% */}
        <div className="relative flex-1">
          <img
            src={prizesImg}
            alt="جوائز مميزة"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          {/* Gradient fade at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-36"
            style={{
              background: 'linear-gradient(to top, #1a1200 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Bottom CTA section */}
        <div className="px-6 pb-10 pt-4 flex flex-col items-center gap-4 z-10"
          style={{ background: 'linear-gradient(180deg, #1a1200 0%, #0d0d0d 100%)' }}
        >
          <p className="text-[#c8a84b] text-sm text-center font-medium tracking-wide">
            فرصتك للفوز بجوائز مذهلة
          </p>

          <button
            onClick={onNext}
            className="w-full py-4 rounded-[20px] text-xl font-bold text-[#1a0f00] transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(212,168,69,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #D4A845 0%, #f0c84a 50%, #b8881e 100%)',
            }}
          >
            اربح الآن
          </button>

          <div className="flex items-center gap-2 text-slate-500">
            <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs">مشاركة آمنة ومضمونة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
