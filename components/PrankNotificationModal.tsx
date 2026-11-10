// components/PrankNotificationModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, AlertTriangle, X, Terminal, Skull, Siren, Heart, Lock } from 'lucide-react';
import { soundCtrl } from '@/lib/sound';

interface PrankNotificationModalProps {
  prankConfig: any;
  onPrankComplete: () => void;
}

export default function PrankNotificationModal({ prankConfig, onPrankComplete }: PrankNotificationModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [closeBtnPos, setCloseBtnPos] = useState({ x: 0, y: 0 });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isBlackout, setIsBlackout] = useState(false);
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [dodgeCount, setDodgeCount] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const steps = prankConfig.dialogSequence || [];
  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    // Sound when popup first appears
    soundCtrl.playWindowsAlert();

    // Prevent closing browser tab
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Yakin mau keluar? Pemeriksaan kasus pacarmu belum selesai lho!';
      return e.returnValue;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Play alert sound on step change
  useEffect(() => {
    soundCtrl.playWindowsAlert();
    // Reset positions
    setNoButtonPos({ x: 0, y: 0 });
    setCloseBtnPos({ x: 0, y: 0 });
  }, [currentStepIndex]);

  // Dodge function for the "NO" / "TUTUP" button (Touch + Mouse support)
  const handleNoButtonDodge = (e?: React.TouchEvent | React.MouseEvent) => {
    if (e && 'touches' in e) {
      e.preventDefault();
    }
    soundCtrl.playDodge();
    setDodgeCount(prev => prev + 1);

    // On mobile screens, constrain distance so button doesn't fly outside viewport!
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxDistanceX = isMobile ? 80 : 130;
    const maxDistanceY = isMobile ? 50 : 90;

    const randomX = (Math.random() - 0.5) * (maxDistanceX * 2);
    const randomY = (Math.random() - 0.5) * (maxDistanceY * 2);
    setNoButtonPos({ x: randomX, y: randomY });

    const taunts = [
      "Eits, gak kena! 😜",
      "Mau kabur kemana? 😂",
      "Tombol ini licin banget wlee~",
      "Dosa lho bohongin polisi! 😝",
      "Jangan kabur dong sayang!",
      "Gak bisa diklik wkwk!"
    ];
    setToastMessage(taunts[Math.floor(Math.random() * taunts.length)]);

    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  // Dodge function for the [X] Close button
  const handleCloseButtonDodge = (e?: React.TouchEvent | React.MouseEvent) => {
    if (e && 'touches' in e) {
      e.preventDefault();
    }
    soundCtrl.playDodge();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const randomX = (Math.random() - 0.5) * (isMobile ? 60 : 100);
    const randomY = Math.random() * (isMobile ? 40 : 60);
    setCloseBtnPos({ x: randomX, y: randomY });
    setToastMessage("Tombol [X] dikunci oleh cinta cowokmu! Gak bisa diclose! 🔒❤️");
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCloseClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    soundCtrl.playErrorBeep();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
    setToastMessage("❌ AKSES DITOLAK: Tombol close dikunci oleh sistem investigasi cinta!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  // When user clicks YES:
  // User thinks clicking YES will close it, but YES leads to the NEXT annoying notif!
  const handleYesClick = () => {
    soundCtrl.playWindowsAlert();

    // If it's the final step
    if (currentStepIndex >= steps.length - 1) {
      triggerDramaticTransition();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);

      // Advance to next step in sequence!
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  // If user manages to tap the NO button
  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundCtrl.playErrorBeep();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);

    setToastMessage(currentStep.reactionOnNo || "Sistem mendeteksi Anda berusaha mengelak! Pilihan otomatis dialihkan ke YES!");
    
    // Automatically force to next step after 1.2s!
    setTimeout(() => {
      setToastMessage(null);
      if (currentStepIndex >= steps.length - 1) {
        triggerDramaticTransition();
      } else {
        setCurrentStepIndex(prev => prev + 1);
      }
    }, 1200);
  };

  // Dramatic Transition from Prank to Anniversary Reveal
  const triggerDramaticTransition = () => {
    soundCtrl.playAlarm(700);
    setCountdownNum(3);
    setIsShaking(true);

    const timer1 = setTimeout(() => {
      soundCtrl.playAlarm(800);
      setCountdownNum(2);
    }, 1000);

    const timer2 = setTimeout(() => {
      soundCtrl.playAlarm(950);
      setCountdownNum(1);
    }, 2000);

    const timer3 = setTimeout(() => {
      soundCtrl.playHeartbeat();
      setIsBlackout(true);
      setCountdownNum(null);
      setIsShaking(false);
    }, 3000);

    // After blackout, reveal anniversary!
    const timer4 = setTimeout(() => {
      onPrankComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  // If Blackout screen is active
  if (isBlackout) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white px-4 text-center">
        <div className="space-y-4 max-w-sm mx-auto">
          <div className="w-14 h-14 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-300 animate-pulse">
            SISTEM REBOOTING... MENGHAPUS BERKAS KASUS...
          </p>
          <div className="text-rose-500 font-mono text-[11px]">
            [==========================] 100%
          </div>
          <p className="text-[10px] text-slate-500 font-mono">
            Membuka saluran transmisi cinta rahasia...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Toast Warning floating on top */}
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto z-50 bg-rose-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl border-2 border-white animate-bounce flex items-center justify-center gap-2 text-center">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Prank Dialog Box (Optimized for Mobile & Desktop) */}
      <div 
        ref={modalRef}
        className={`w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border-3 sm:border-4 border-rose-600 overflow-hidden transform transition-transform duration-100 my-auto ${isShaking ? 'shake-hard' : ''}`}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between select-none relative">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="p-1 bg-white/20 rounded shrink-0">
              <Siren className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
            </span>
            <span className="font-extrabold text-[11px] sm:text-xs md:text-sm tracking-wide truncate">
              {currentStep.title}
            </span>
          </div>

          {/* Dodging / Unclosable [X] Button */}
          <button
            onMouseEnter={handleCloseButtonDodge}
            onTouchStart={handleCloseButtonDodge}
            onClick={handleCloseClick}
            style={{
              transform: `translate(${closeBtnPos.x}px, ${closeBtnPos.y}px)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-red-800/90 active:bg-black text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors shrink-0 shadow-sm"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 text-slate-800 space-y-3.5 sm:space-y-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-100 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              {countdownNum ? (
                <span className="font-black text-xl sm:text-2xl animate-ping text-red-600">{countdownNum}</span>
              ) : (
                <ShieldAlert className="w-5 h-5 sm:w-7 sm:h-7" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="inline-block bg-rose-100 text-rose-800 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded mb-1 uppercase tracking-wider">
                Status: Notifikasi Ke-{currentStepIndex + 1} dari {steps.length}
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line text-slate-800 break-words">
                {currentStep.message}
              </p>
            </div>
          </div>

          {/* Anti-Close notice badge */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-2 sm:p-2.5 text-[10px] sm:text-[11px] text-amber-900 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="leading-snug">
              Sistem Anti-Close Aktif: Mengklik tombol tidak akan menutup dialog secara instan!
            </span>
          </div>

          {/* Action Buttons (Mobile-friendly stacked & side-by-side) */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-2.5 sm:gap-3 relative min-h-[50px] sm:min-h-[55px]">
            
            {/* The YES button */}
            <button
              onClick={handleYesClick}
              className="w-full sm:w-auto px-5 py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 touch-manipulation"
            >
              <span className="truncate">{currentStep.yesText}</span>
              <span className="text-[10px] bg-rose-700 px-1.5 py-0.5 rounded shrink-0">✓</span>
            </button>

            {/* The NO button (Dodges on touch & hover) */}
            <button
              onMouseEnter={handleNoButtonDodge}
              onTouchStart={handleNoButtonDodge}
              onClick={handleNoClick}
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-all touch-manipulation"
            >
              {currentStep.noText}
            </button>
          </div>

          {/* Humorous Footer */}
          <div className="text-[9px] sm:text-[10px] text-center text-slate-400 pt-2 border-t border-slate-50 flex items-center justify-center gap-1">
            <span>Kabur: {dodgeCount}x</span>
            <span>•</span>
            <span className="text-rose-500 font-medium">Anti-Close Mobile v3.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
