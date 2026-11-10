// components/SettingsModal.tsx
'use client';

import React, { useState } from 'react';
import { Save, RotateCcw, X, Sliders, Check, Image as ImageIcon, Music } from 'lucide-react';

interface SettingsModalProps {
  currentData: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: any) => void;
  onResetDefault: () => void;
}

export default function SettingsModal({
  currentData,
  isOpen,
  onClose,
  onSave,
  onResetDefault
}: SettingsModalProps) {
  const [partnerName, setPartnerName] = useState(currentData.anniversary?.partnerName || 'Minyuk');
  const [userName, setUserName] = useState(currentData.anniversary?.userName || 'Mike (Ketua UKM Musik)');
  const [thumbnailImage, setThumbnailImage] = useState(
    currentData.news?.thumbnailImage || currentData.news?.coverImage || ''
  );
  const [bgmUrl, setBgmUrl] = useState(currentData.anniversary?.bgmUrl || '/music.mp3');
  const [anniversaryDate, setAnniversaryDate] = useState(currentData.anniversary?.anniversaryDate || '2023-11-10');
  const [waNumber, setWaNumber] = useState(currentData.anniversary?.whatsappConfig?.phoneNumber || '6281234567890');
  const [waMessage, setWaMessage] = useState(currentData.anniversary?.whatsappConfig?.prefilledMessage || '');
  const [newsHeadline, setNewsHeadline] = useState(currentData.news?.headline || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = {
      ...currentData,
      news: {
        ...currentData.news,
        headline: newsHeadline,
        thumbnailImage: thumbnailImage,
        coverImage: thumbnailImage
      },
      anniversary: {
        ...currentData.anniversary,
        partnerName,
        userName,
        anniversaryDate,
        bgmUrl,
        whatsappConfig: {
          phoneNumber: waNumber,
          prefilledMessage: waMessage
        }
      }
    };

    onSave(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-4 sm:p-7 animate-in fade-in zoom-in-95 my-auto">
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 text-rose-600">
            <Sliders className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <h3 className="font-bold text-base sm:text-lg text-slate-800">
              Pengaturan Prank & Lagu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
          {/* Backsound Lagu MP3 */}
          <div className="bg-purple-50 p-3 sm:p-3.5 rounded-xl border border-purple-200">
            <label className="block font-bold text-purple-900 mb-1 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
              <span>Backsound Lagu Anniversary (MP3):</span>
            </label>
            <input
              type="text"
              value={bgmUrl}
              onChange={(e) => setBgmUrl(e.target.value)}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-purple-300 bg-white rounded-lg focus:outline-none focus:border-purple-500 font-mono text-[11px] sm:text-xs"
              placeholder="/music.mp3 atau https://link-audio.mp3"
            />
            <p className="text-[10px] sm:text-[11px] text-purple-700 mt-1 leading-snug">
              🎵 <strong>Cara Pasang Lagu Sendiri:</strong> Simpan file lagumu (format MP3) di folder <code>public/music.mp3</code>, lalu isi <code>/music.mp3</code> di sini. Lagu otomatis berputar saat kejutan anniversary terbuka!
            </p>
          </div>

          {/* Thumbnail / Foto Ketua UKM Musik */}
          <div className="bg-rose-50 p-3 sm:p-3.5 rounded-xl border border-rose-200">
            <label className="block font-bold text-rose-900 mb-1 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-600 shrink-0" />
              <span>Foto Mike (Thumbnail & Berita):</span>
            </label>
            <input
              type="text"
              value={thumbnailImage}
              onChange={(e) => setThumbnailImage(e.target.value)}
              className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 border border-rose-300 bg-white rounded-lg focus:outline-none focus:border-rose-500 font-mono text-[11px] sm:text-xs"
              placeholder="Contoh: /ketua-ukm.svg atau /ketua-ukm.jpg"
            />
            <p className="text-[10px] sm:text-[11px] text-rose-700 mt-1 leading-snug">
              💡 Simpan foto kamu di <code>public/ketua-ukm.jpg</code> lalu ketik <code>/ketua-ukm.jpg</code> di sini.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Panggilan Pacar:
            </label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
              placeholder="Minyuk"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nama Kamu (Ketua UKM Musik):
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
              placeholder="Mike (Ketua UKM Musik)"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Tanggal Jadian / Anniversary (YYYY-MM-DD):
            </label>
            <input
              type="text"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
              placeholder="2023-11-10"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nomor WhatsApp Mike:
            </label>
            <input
              type="text"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
              placeholder="6281234567890"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Pesan Balasan WhatsApp Otomatis:
            </label>
            <textarea
              rows={2}
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-5 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
          <button
            onClick={onResetDefault}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleSave}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs text-white flex items-center gap-1.5 transition-all shadow active:scale-95 ${isSaved ? 'bg-emerald-600' : 'bg-rose-600 hover:bg-rose-700'
              }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Simpan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
