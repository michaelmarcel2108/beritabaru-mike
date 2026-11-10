// components/AnniversaryReveal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart, Sparkles, Volume2, VolumeX, Gift,
  CheckCircle2, MessageCircle, RotateCcw,
  Sliders, Music
} from 'lucide-react';
import { soundCtrl } from '@/lib/sound';

interface AnniversaryRevealProps {
  anniversaryData: any;
  onResetPrank: () => void;
  onOpenSettings: () => void;
}

export default function AnniversaryReveal({
  anniversaryData,
  onResetPrank,
  onOpenSettings
}: AnniversaryRevealProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [vouchers, setVouchers] = useState(anniversaryData.vouchers || []);
  const [isMuted, setIsMuted] = useState(false);
  const [timeTogether, setTimeTogether] = useState({
    years: 3,
    days: 1095,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Trigger celebration on mount
  useEffect(() => {
    // Play custom song if provided, else synthesizer fallback
    const song = anniversaryData.bgmUrl || '/music.mp3';
    soundCtrl.playMusic(song);
    soundCtrl.playRomanticChime();

    // Fire fireworks / confetti cannons!
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 28, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } });
    }, 300);

    return () => {
      clearInterval(interval);
      soundCtrl.stopMusic();
    };
  }, [anniversaryData.bgmUrl]);

  // Relationship live counter calculation
  useEffect(() => {
    const startDate = new Date(anniversaryData.anniversaryDate || '2023-11-10T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();

      if (diffMs > 0) {
        const totalSeconds = Math.floor(diffMs / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const years = Math.floor(totalDays / 365);
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;
        const seconds = totalSeconds % 60;

        setTimeTogether({
          years: years >= 3 ? years : 3,
          days: totalDays,
          hours,
          minutes,
          seconds
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [anniversaryData.anniversaryDate]);

  // Handle Voucher claim
  const handleClaimVoucher = (voucherId: string) => {
    soundCtrl.playClaimSound();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });

    setVouchers((prev: any[]) =>
      prev.map(v => v.id === voucherId ? { ...v, claimed: true } : v)
    );
  };

  // Toggle Audio
  const handleToggleSound = () => {
    const muted = soundCtrl.toggleMute();
    setIsMuted(muted);
  };

  // Generate WhatsApp link
  const waNumber = anniversaryData.whatsappConfig?.phoneNumber || '6281234567890';
  const waMsg = encodeURIComponent(
    anniversaryData.whatsappConfig?.prefilledMessage ||
    'Mikeeee!! Parah banget pranknya bikin Minyuk jantungan!! Tapi Happy 3rd Anniversary ya Mike pacarku tersayang... ❤️'
  );
  const waUrl = `https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=${waMsg}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 text-slate-800 pb-16 selection:bg-rose-500 selection:text-white">
      {/* Top Floating Controls */}
      <div className="sticky top-3 z-40 px-3 flex items-center justify-end gap-2 max-w-4xl mx-auto pointer-events-none">
        <button
          onClick={handleToggleSound}
          className="px-3 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur shadow-lg border border-pink-200 text-xs font-bold text-rose-600 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 pointer-events-auto"
          title={isMuted ? "Nyalakan Musik" : "Matikan Musik"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />}
          <span className="text-[11px] font-semibold">{isMuted ? "Musik Mati" : "Lagu Aktif 🎵"}</span>
        </button>
        <button
          onClick={onOpenSettings}
          className="px-3 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur shadow-lg border border-pink-200 text-xs font-bold text-slate-700 hover:text-rose-600 active:scale-95 transition-transform flex items-center gap-1.5 pointer-events-auto"
        >
          <Sliders className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden xs:inline sm:inline">Ganti Lagu & Data</span>
          <span className="xs:hidden sm:hidden">Edit</span>
        </button>
      </div>

      {/* Hero Banner Section (Mobile Optimized) */}
      <section className="relative overflow-hidden pt-4 sm:pt-10 pb-8 sm:pb-14 px-3 sm:px-4 text-center">
        {/* Animated Background Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <div className="absolute top-8 left-4 text-rose-300 animate-float text-3xl">❤️</div>
          <div className="absolute top-16 right-6 text-pink-300 animate-float text-2xl" style={{ animationDelay: '1s' }}>🎸</div>
          <div className="absolute bottom-6 left-8 text-purple-300 animate-float text-4xl" style={{ animationDelay: '2s' }}>💖</div>
          <div className="absolute bottom-12 right-8 text-rose-400 animate-float text-2xl" style={{ animationDelay: '1.5s' }}>✨</div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-700 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-3 sm:mb-4 shadow-sm animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">PRANK SUKSES 100% — SELAMAT KENA JEBAK!</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-3 sm:mb-4 px-2">
            🎉 WOWW!! HAPPY <span className="text-rose-600 text-glow">3RD ANNIVERSARY</span> MINYUK SAYANG! ❤️🎸
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6 font-medium px-2">
            WLEKKK KENA PRANK MINYUUKKK!!! MAAF SAYANG PRANK NYA KECIL KECILAN SOALNYA YANG BESAR CINTAKU PADAMU. MAAF CUMA BISA BIKIN KEJUTAN KECIL GINI CINTAKUU AKU SAYANGG BANGETT SAMA KAMU. SELAMAT ANNIVERSARY YANG KE 3 YAA SAYANG AKU PERCAYA KITA SAMPE SELAMANYAAA. LOVE YOU SO MUCHH CINTAKUUU</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 px-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />
              <span>Marahin Mike di WhatsApp Sekarang! 😜</span>
            </a>

            <button
              onClick={() => {
                soundCtrl.playRomanticChime();
                setIsLetterOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-3 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-full font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
              <span>Buka Surat Cinta Spesial 💌</span>
            </button>
          </div>
        </div>
      </section>

      {/* Relationship Counter Section (Mobile 2x2 Grid) */}
      <section className="max-w-4xl mx-auto px-3 sm:px-4 mb-8 sm:mb-12">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl border border-pink-200">
          <div className="text-center mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-rose-500 block mb-1">
              Perjalanan Kisah Kita
            </span>
            <h2 className="text-base sm:text-2xl font-black text-slate-800 leading-snug">
              Kita Sudah Bersama & Saling Mencintai Selama:
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-center">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <span className="block text-2xl sm:text-4xl font-black">{timeTogether.years}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-rose-100 tracking-wider">Tahun Indah</span>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <span className="block text-2xl sm:text-4xl font-black">{timeTogether.days}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-pink-100 tracking-wider">Total Hari</span>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <span className="block text-2xl sm:text-4xl font-black">{timeTogether.hours}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-purple-100 tracking-wider">Jam</span>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <span className="block text-2xl sm:text-4xl font-black">{timeTogether.seconds}</span>
              <span className="text-[10px] sm:text-xs uppercase font-extrabold text-indigo-100 tracking-wider">Detik Cinta</span>
            </div>
          </div>

          <p className="text-center text-[10px] sm:text-xs text-slate-400 mt-3 sm:mt-4 italic">
            *Dihitung sejak hari jadian resmi ({anniversaryData.anniversaryDate}) sampai selamanya!
          </p>
        </div>
      </section>

      {/* Love Letter Modal (Mobile Friendly) */}
      {isLetterOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#fffdfa] rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-3 sm:border-4 border-rose-200 relative animate-in fade-in zoom-in-95 my-auto">
            <button
              onClick={() => setIsLetterOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-700 rounded-full flex items-center justify-center font-bold text-base transition-colors"
            >
              ✕
            </button>

            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-block p-2.5 bg-rose-100 text-rose-600 rounded-full mb-1.5">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-rose-600" />
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-slate-800 px-4 leading-snug">
                {anniversaryData.loveLetter?.greeting}
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed font-serif text-justify px-1 sm:px-2">
              <p>{anniversaryData.loveLetter?.p1}</p>
              <p>{anniversaryData.loveLetter?.p2}</p>
              <p>{anniversaryData.loveLetter?.p3}</p>
              <p>{anniversaryData.loveLetter?.p4}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-rose-100 flex flex-col items-end text-right">
              <span className="text-[11px] sm:text-xs text-slate-500 italic font-serif">
                {anniversaryData.loveLetter?.closing}
              </span>
              <span className="text-xs sm:text-sm font-bold text-rose-600 font-serif mt-0.5">
                {anniversaryData.loveLetter?.senderName}
              </span>
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={() => setIsLetterOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-full font-bold text-xs uppercase tracking-wider"
              >
                Tutup Surat Cinta ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Love Vouchers Section (Mobile Ergonomic) */}
      <section className="max-w-4xl mx-auto px-3 sm:px-4 mb-10 sm:mb-16">
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-xl">
          <div className="text-center mb-5 sm:mb-8">
            <span className="inline-block bg-white/20 px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
              Kupon Hadiah Spesial dari Cowokmu
            </span>
            <h2 className="text-xl sm:text-3xl font-black leading-tight">
              Klaim Kupon Anniversary Minyuk! 🎁
            </h2>
            <p className="text-[11px] sm:text-xs text-pink-100 mt-1">
              Setiap kupon berlaku seumur hidup dan wajib dipenuhi oleh Mike sang Ketua UKM Musik!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {vouchers.map((v: any) => (
              <div
                key={v.id}
                className="bg-white text-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border-2 border-dashed border-rose-300 flex flex-col justify-between relative overflow-hidden"
              >
                {v.claimed && (
                  <div className="absolute top-2.5 right-2.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> KLAIM BERHASIL
                  </div>
                )}

                <div>
                  <h4 className="font-black text-sm sm:text-base text-rose-700 mb-1 pr-14 leading-snug">
                    {v.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed mb-3">
                    {v.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleClaimVoucher(v.id)}
                  disabled={v.claimed}
                  className={`w-full py-2.5 sm:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 touch-manipulation active:scale-95 ${v.claimed
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-rose-600 hover:bg-rose-700 text-white shadow'
                    }`}
                >
                  {v.claimed ? (
                    <span>Sudah Masuk Antrean Klaim</span>
                  ) : (
                    <>
                      <Gift className="w-3.5 h-3.5" />
                      <span>Klaim Kupon Ini Sekarang!</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Reset Section */}
      <section className="max-w-xl mx-auto px-3 text-center">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-pink-200 space-y-3">
          <p className="text-xs text-slate-600 font-medium">
            Mau coba ulangi prank dari awal untuk lihat lagi reaksi paniknya?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={onResetPrank}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-900 active:scale-95 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-transform"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Prank Dari Awal</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Kirim Pesan WhatsApp</span>
            </a>
          </div>
        </div>

        <p className="text-[10px] sm:text-[11px] text-slate-400 mt-5">
          Dibuat dengan cinta & keisengan oleh Mike (Ketua UKM Musik) untuk Minyuk tercinta ❤️🎸
        </p>
      </section>
    </div>
  );
}
