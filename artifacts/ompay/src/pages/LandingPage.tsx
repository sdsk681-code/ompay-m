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
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #130f00 100%)' }}
      >
        {/* OMPAY logo */}
        <div className="flex justify-center pt-7 pb-1 shrink-0">
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase">
            OMPAY
          </h1>
        </div>

        {/* Full image — object-contain shows every pixel, no cropping */}
        <div className="flex-1 w-full min-h-0">
          <img
            src={prizesImg}
            alt="جوائز مميزة"
            className="w-full h-full object-contain object-center"
            style={{ display: 'block' }}
          />
        </div>

        {/* CTA button */}
        <div
          className="px-6 pt-4 pb-8 flex flex-col items-center gap-3 shrink-0"
        >
          <button
            onClick={onNext}
            className="w-full py-[18px] rounded-[22px] text-xl font-bold transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #D4A845 0%, #f5d060 50%, #b8881e 100%)',
              color: '#1a0f00',
              boxShadow: '0 0 32px rgba(212,168,69,0.5)',
            }}
          >
            اربح الآن
          </button>

          <div className="flex items-center gap-1.5 text-slate-500">
            <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-xs">مشاركة آمنة ومضمونة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
