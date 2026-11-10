// components/NewsArticle.tsx
'use client';

import React from 'react';
import { 
  Share2, MessageCircle, Heart, Bookmark, Eye, 
  Clock, AlertTriangle, ShieldAlert, ChevronRight,
  TrendingUp, ThumbsUp, Send, UserCheck, Flame, Menu
} from 'lucide-react';

interface NewsArticleProps {
  newsData: any;
  onTriggerPrank: () => void;
}

export default function NewsArticle({ newsData, onTriggerPrank }: NewsArticleProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 pb-12 sm:pb-8">
      {/* Top Bar Portal */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 border-b border-slate-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-extrabold text-rose-600 uppercase tracking-tight">EDISI MAHASISWA</span>
            <span>•</span>
            <span className="truncate max-w-[140px] sm:max-w-none">{newsData.dateString}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
            <span className="hidden sm:inline hover:text-rose-600 cursor-pointer">Pedoman Siber</span>
            <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Pengaduan Kasus
            </span>
          </div>
        </div>

        {/* Main Logo & Navigation */}
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={onTriggerPrank}>
            <div className="bg-rose-700 text-white font-black text-xl sm:text-2xl tracking-tighter px-2.5 py-1 rounded shadow-sm shrink-0">
              KIP
            </div>
            <div className="min-w-0">
              <h1 className="font-black text-lg sm:text-2xl tracking-tight text-slate-900 leading-none truncate">
                {newsData.portalName}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide truncate">
                {newsData.portalTagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button 
              onClick={onTriggerPrank}
              className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] sm:text-xs font-extrabold px-2.5 sm:px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all active:scale-95 animate-pulse shadow-sm"
            >
              <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>LIVE BAP</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Bar (Smooth Horizontal Scroll on Mobile) */}
        <nav className="bg-[#1e293b] text-white overflow-x-auto scrollbar-none py-2 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-semibold whitespace-nowrap">
            <span className="text-rose-400 cursor-pointer">HOME</span>
            <span className="hover:text-rose-300 cursor-pointer">NASIONAL</span>
            <span className="text-amber-400 font-bold flex items-center gap-1.5 cursor-pointer bg-slate-800 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block"></span>
              {newsData.portalCategory}
            </span>
            <span className="hover:text-rose-300 cursor-pointer">KAMPUS</span>
            <span className="hover:text-rose-300 cursor-pointer">GIGS & KONSER</span>
            <span className="hover:text-rose-300 cursor-pointer">VIRAL</span>
          </div>
        </nav>
      </header>

      {/* Breaking News Ribbon */}
      <div className="bg-rose-50 border-y border-rose-200 py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 sm:gap-3 text-xs">
          <span className="bg-rose-600 text-white font-black px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] tracking-wider uppercase shrink-0 flex items-center gap-1">
            <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {newsData.badge}
          </span>
          <p className="text-rose-900 font-semibold text-[11px] sm:text-xs truncate cursor-pointer hover:underline" onClick={onTriggerPrank}>
            {newsData.headline}
          </p>
        </div>
      </div>

      {/* Article Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 bg-white p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-2 sm:mb-3 flex-wrap">
              <span className="hover:text-rose-600 cursor-pointer">Berita</span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="text-rose-600 font-semibold">{newsData.portalCategory}</span>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate max-w-[140px] sm:max-w-[200px] text-slate-400">Skandal UKM Musik</span>
            </div>

            {/* Headline (Responsive Typography) */}
            <h1 className="font-newspaper-headline text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-snug sm:leading-tight mb-3 sm:mb-4">
              {newsData.headline}
            </h1>

            {/* Subheadline / Lead */}
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-4 pb-3 sm:pb-4 border-b border-slate-100">
              {newsData.subheadline}
            </p>

            {/* Author & Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 sm:py-3 mb-4 sm:mb-6 border-b border-slate-100 text-[11px] sm:text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs uppercase border border-slate-300 shrink-0">
                  DP
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-tight">{newsData.author}</p>
                  <p className="text-[10px] text-slate-400">Editor: {newsData.editor}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] sm:text-[11px]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{newsData.dateString}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-slate-400" />
                  <span>{newsData.readCount}</span>
                </div>
              </div>
            </div>

            {/* Action Bar (Mobile-friendly buttons) */}
            <div className="flex items-center justify-between gap-2 mb-5 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={onTriggerPrank}
                  className="px-2.5 sm:px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg font-bold text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-medium text-xs pr-2">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> 1.8K
                </span>
                <span className="flex items-center gap-1 hidden sm:flex">
                  <Bookmark className="w-3.5 h-3.5" /> Simpan
                </span>
              </div>
            </div>

            {/* Featured Image: FOTO KETUA UKM MUSIK */}
            <div className="mb-5 rounded-xl overflow-hidden border border-slate-200 relative group shadow-sm">
              <div className="absolute top-2.5 left-2.5 bg-red-600/90 text-white text-[10px] sm:text-[11px] font-black uppercase px-2 py-0.5 sm:py-1 rounded shadow flex items-center gap-1 z-10 backdrop-blur-sm">
                <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>FOTO TERLAPOR: KETUA UKM MUSIK</span>
              </div>
              <img 
                src={newsData.coverImage || newsData.thumbnailImage || '/ketua-ukm.svg'} 
                alt="Foto Terlapor Ketua UKM Musik"
                onError={(e: any) => {
                  e.currentTarget.src = '/ketua-ukm.svg';
                }}
                className="w-full h-52 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={onTriggerPrank}
              />
              <div className="bg-slate-100 p-2 sm:p-2.5 text-[11px] sm:text-xs text-slate-600 border-t border-slate-200 italic leading-snug">
                {newsData.imageCaption}
              </div>
            </div>

            {/* Official Alert Banner in Article */}
            <div 
              onClick={onTriggerPrank}
              className="bg-amber-50 border-l-4 border-amber-500 p-3 sm:p-4 mb-5 rounded-r-xl cursor-pointer hover:bg-amber-100 transition-colors"
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] sm:text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold block uppercase tracking-wide mb-0.5">Pemberitahuan Khusus Kepolisian & Satgas:</span>
                  Kekasih (pacar) dari Ketua UKM Musik terlapor dihimbau agar segera kooperatif memberikan keterangan kepada penyidik sebelum status dinaikkan menjadi DPO nasional.
                </div>
              </div>
            </div>

            {/* Paragraphs */}
            <div className="article-content space-y-3.5 sm:space-y-4">
              {newsData.paragraphs.map((p: string, idx: number) => (
                <p key={idx} onClick={onTriggerPrank} className="cursor-pointer hover:text-slate-900 leading-relaxed text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
                <span>TOPIK TERKAIT:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {newsData.hotTopicTags.map((tag: string, idx: number) => (
                  <span 
                    key={idx}
                    onClick={onTriggerPrank}
                    className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 border border-slate-200 text-slate-700 text-[10px] sm:text-xs px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8 pt-6 border-t-2 border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                  Komentar Netizen ({newsData.comments.length + 52})
                </h3>
                <span className="text-[11px] text-slate-500">Terpopuler</span>
              </div>

              {/* Fake comment input */}
              <div className="flex gap-2 sm:gap-3 mb-5" onClick={onTriggerPrank}>
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  P
                </div>
                <div className="flex-1 flex gap-1.5">
                  <input 
                    type="text" 
                    placeholder="Beri tanggapan Anda tentang Ketua UKM..." 
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
                    readOnly
                  />
                  <button className="bg-rose-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center shrink-0">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {newsData.comments.map((comment: any) => (
                  <div key={comment.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${comment.avatarColor} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
                          {comment.author.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{comment.author}</span>
                        <span className="text-[10px] text-slate-400">• {comment.time}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-8 mb-1.5 text-xs">
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-4 pl-8 text-[10px] text-slate-500">
                      <button 
                        onClick={onTriggerPrank}
                        className="flex items-center gap-1 hover:text-rose-600"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                      <button 
                        onClick={onTriggerPrank}
                        className="hover:text-rose-600"
                      >
                        Balas
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Urgent Investigation Card */}
            <div 
              onClick={onTriggerPrank}
              className="bg-gradient-to-br from-red-600 to-rose-700 text-white p-4 sm:p-5 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-200 mb-1.5">
                <ShieldAlert className="w-4 h-4 text-white shrink-0" />
                <span>Pencarian Saksi & Pacar Terlapor</span>
              </div>
              <h4 className="font-bold text-sm sm:text-base mb-1.5 leading-snug">
                Daftar Saksi Kasus 'Rock Goes To Campuss'
              </h4>
              <p className="text-xs text-red-100 leading-relaxed mb-3">
                Bagi yang memiliki nomor kontak aktif atau mengetahui lokasi Ketua UKM Musik, klik di sini untuk melapor.
              </p>
              <div className="w-full bg-white text-rose-700 text-center py-2 rounded-xl text-xs font-extrabold shadow hover:bg-rose-50 transition-colors">
                VERIFIKASI HUBUNGAN DENGAN TERLAPOR
              </div>
            </div>

            {/* Popular News Sidebar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 pb-2.5 mb-3 border-b border-slate-200 flex items-center justify-between">
                <span>BERITA POPULER KAMPUS</span>
                <span className="text-[9px] bg-rose-100 text-rose-700 font-extrabold px-1.5 py-0.5 rounded">HARI INI</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    num: '01',
                    title: 'Kronologi Lengkap EO Free Time Way Laporkan Ketua UKM Musik ke Polisi',
                    cat: 'Hukum',
                    reads: '112k'
                  },
                  {
                    num: '02',
                    title: 'Beredar Chat Panitia: "Ketua UKM Musik Terakhir Pamit Ngedate Bareng Pacarnya"',
                    cat: 'Investigasi',
                    reads: '85k'
                  },
                  {
                    num: '03',
                    title: 'Akun Instagram UKM Musik Dibanjiri Komentar Tagihan Vendor Konser',
                    cat: 'Viral',
                    reads: '67k'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={onTriggerPrank}
                    className="flex items-start gap-2.5 cursor-pointer group pb-2.5 border-b border-slate-100 last:border-0 last:pb-0"
                  >
                    <span className="font-black text-base text-slate-300 group-hover:text-rose-600 transition-colors shrink-0">
                      {item.num}
                    </span>
                    <div>
                      <span className="text-[9px] font-bold text-rose-600 uppercase block">
                        {item.cat} • {item.reads} baca
                      </span>
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-rose-600 leading-snug transition-colors">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Portal Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-4 border-t border-slate-800 text-[11px] text-center sm:text-left">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-white font-black text-xs px-2 py-0.5 rounded">KIP</div>
            <span className="font-bold text-white">{newsData.portalName}</span>
            <span>© 2026 PT Berita Mahasiswa</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Redaksi</span>
            <span>Pedoman Media</span>
            <span>Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
