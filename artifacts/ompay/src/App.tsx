import React, { useState } from 'react';
import { Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import watchImg from './assets/watch.png';

const colors = [
  { id: 'black', name: 'أسود', bgColor: 'bg-[#1a1a1a]' },
  { id: 'silver', name: 'فضي', bgColor: 'bg-[#e3e3e3]' },
  { id: 'blue', name: 'أزرق', bgColor: 'bg-[#1e3a8a]' },
  { id: 'gold', name: 'ذهبي', bgColor: 'bg-[#d4a845]' },
];

export default function App() {
  const [selectedColor, setSelectedColor] = useState('black');

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 dark:bg-zinc-950 font-sans" dir="rtl">
      <div className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] bg-gradient-to-b from-[#0b1426] to-[#1a2b4c] flex flex-col relative sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl shadow-none">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4 z-20">
          <button className="text-white cursor-pointer hover:opacity-80 transition-opacity w-8 flex justify-start">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase text-center flex-1">OMPAY</h1>
          <div className="w-8" /> {/* spacer for centering */}
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center pt-2 relative z-10 px-4">
          <h2 className="text-white text-3xl font-bold text-center leading-[1.3]">
            اختر الساعة<br />المناسبة لك
          </h2>
          <p className="text-slate-300 text-sm mt-2 text-center opacity-80">
            ساعة دفع ذكية. أسلوبك، حريتك.
          </p>
          
          <div className="relative w-full flex-1 flex items-center justify-center my-6 min-h-[220px]">
            {/* Arrows */}
            <button className="absolute right-2 w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md z-20 hover:bg-white/10 transition-colors">
              <ChevronRight className="w-6 h-6 text-white opacity-80" />
            </button>
            <button className="absolute left-2 w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md z-20 hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-6 h-6 text-white opacity-80" />
            </button>

            {/* Watch Image */}
            <img 
              src={watchImg} 
              alt="OMPAY Watch Pro" 
              className="w-[220px] h-[220px] object-contain z-10 filter drop-shadow-[0_15px_30px_rgba(37,99,235,0.4)]"
            />
          </div>

          <div className="text-center mb-6 z-20 w-full">
            <h3 className="text-white text-2xl font-semibold tracking-wide">OMPAY Watch Pro</h3>
            <p className="text-slate-300 text-sm mt-1.5 opacity-80">دفع فوري وآمن أينما كنت</p>
            
            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2.5 mt-5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
              <div className="w-2 h-2 rounded-full border border-slate-400 opacity-60"></div>
              <div className="w-2 h-2 rounded-full border border-slate-400 opacity-60"></div>
              <div className="w-2 h-2 rounded-full border border-slate-400 opacity-60"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white w-full rounded-t-[32px] pt-7 pb-10 px-6 flex flex-col relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <h4 className="text-slate-900 font-bold text-lg mb-5 text-start">اختر اللون</h4>
          
          <div className="flex items-center justify-between gap-3 mb-8 w-full px-1">
            {colors.map((color) => {
              const isSelected = selectedColor === color.id;
              return (
                <div 
                  key={color.id} 
                  className="flex flex-col items-center gap-2 cursor-pointer group" 
                  onClick={() => setSelectedColor(color.id)}
                >
                  <div className={`w-[60px] h-[60px] rounded-2xl ${color.bgColor} relative flex items-center justify-center transition-all duration-200 border-4 ${isSelected ? 'border-blue-600 shadow-md' : 'border-[#f0f0f0] group-hover:border-slate-300'}`}>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-blue-600 rounded-full flex items-center justify-center border-[2.5px] border-white shadow-sm z-10">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>{color.name}</span>
                </div>
              );
            })}
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-[20px] py-4 text-xl font-bold transition-all shadow-lg shadow-blue-600/25 mt-2">
            متابعة
          </button>
          
          <div className="mt-5 flex items-center justify-center gap-1.5 text-slate-400">
            <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs font-medium">ضمان لمدة سنتين</span>
          </div>
        </div>
      </div>
    </div>
  );
}
