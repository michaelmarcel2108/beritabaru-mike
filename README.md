# 🎸 Website Kejutan Prank Anniversary ke-3: "Kasus Skandal Ketua UKM Musik"

Website kejutan anniversary romantis berkedok artikel berita skandal kriminal kampus yang ditujukan untuk **Minyuk**, di mana **Mike adalah Ketua UKM Musik** yang diberitakan terlibat kasus penggelapan dana event *Rock Goes To Campuss* oleh Event Organizer *Free Time Way*.

Dilengkapi dengan interaksi **"Anti-Close / Gak Bisa Diclose"** bertubi-tubi yang memicu kepanikan lucu sang pacar, sebelum akhirnya bertransformasi menjadi **Halaman Ucapan Happy 3rd Anniversary yang Romantis!** 🎉❤️

---

## 🎵 Cara Menambahkan Backsound Lagu Pilihanmu Sendiri (MP3)

Kamu bisa memutar lagu romantis favorit kalian (misalnya lagu kenangan berdua):

### Cara 1: Menggunakan File MP3 di Komputer (Paling Mudah)
1. Siapkan file lagu favoritmu (format `.mp3`).
2. Ganti nama filenya menjadi **`music.mp3`**.
3. Pindahkan file tersebut ke dalam folder:
   👉 **`public/music.mp3`**
4. Selesai! Saat halaman kejutan anniversary terbuka, lagu ini akan otomatis berputar mengiringi ucapan selamat! 🎶

### Cara 2: Menggunakan Link URL Lagu Online
1. Jika kamu memiliki link file MP3 online (misal dari hosting sendiri / CDN).
2. Buka website di browser, klik tombol **`⚙️ Ganti Lagu & Data`** di pojok kanan atas.
3. Masukkan link lagu di kolom **Backsound Lagu Anniversary (MP3)** lalu klik **Simpan**.

*(Catatan: Jika tidak ada file lagu yang dimasukkan, sistem otomatis memutar melodi instrumen romantis synthesizer bawaan)*.

---

## 📸 Cara Menambahkan Foto Kamu (Ketua UKM Musik) Sebagai Thumbnail Link

Agar saat link dikirimkan ke WhatsApp Minyuk muncul foto kamu dengan preview berita heboh:

1. Siapkan foto kamu (format JPG/PNG).
2. Simpan foto tersebut ke dalam folder:
   👉 `public/ketua-ukm.jpg`
3. Di file `data/prankData.json`, pastikan bagian `thumbnailImage` dan `coverImage` berisi `"/ketua-ukm.jpg"`.
4. Selesai! Saat website di-deploy dan linknya dikirim ke WhatsApp, foto wajahmu akan langsung muncul sebagai thumbnail berita!

---

## 🎭 Alur Cerita & Konsep Prank

1. **Fase 1: Link WhatsApp & Berita Skandal Mahasiswa**
   - Minyuk menerima link chat dengan thumbnail **FOTO MIKE (Ketua UKM Musik)** dan headline heboh:
     *"Geger! Diduga Gelapkan Dana EO 'Free Time Way' di Event 'Rock Goes To Campuss', Ketua UKM Musik (Mike) Resmi Dilaporkan ke Polisi"*.
   - Saat link dibuka, muncul artikel portal berita lengkap dengan badge foto terlapor, kutipan somasi kepolisian, dan peringatan bahwa **Minyuk ikut dicari penyidik sebagai saksi kunci!**

2. **Fase 2: Notifikasi "Anti-Close" yang Bikin Kesal & Panik**
   - Sistem mendeteksi bahwa perangkat ini adalah milik **MINYUK (Kekasih Mike)**.
   - **Trik Tombol:**
     - **Tombol `[X]` (Close):** Menghindar/kabur saat didekati jari/kursor.
     - **Tombol NO / KABUR:** Melompat ke koordinat acak (*dodge effect*) dengan kalimat ejekan usil.
     - **Tombol YES:** Jika Minyuk mengklik YES agar cepat selesai, **notifikasi berikutnya tetap muncul bertubi-tubi** menanyakan apakah dia mau putus atau mau menyerahkan Mike ke polisi!
     - Diakhiri dengan alarm *countdown* (3... 2... 1...) dan efek layar mati sesaat (*blackout*).

3. **Fase 3: The Grand Reveal — WOWW!! Happy 3rd Anniversary Minyuk Sayang! ❤️🎸**
   - Transisi dramatis diiringi ledakan konfeti (*canvas confetti*).
   - Lagu romantis / backsound berputar otomatis.
   - Pesan kejutan: *"Kena prank kan Minyuk!! Hahaha panik yaa? 😂 Maaf ya sayang bikin kamu jantungan ngeliat foto Mike cowokmu ini masuk portal kriminal! Mana mungkin Ketua UKM Musik kesayanganmu ini berbuat aneh-aneh! Uang kas aja Mike rawat, apalagi hati dan cinta Minyuk! 😘"*
   - **Fitur-Fitur Romantis:**
     - ⏱️ **Live Relationship Counter:** Menghitung otomatis tahun, total hari, jam, hingga detik kebersamaan (3 tahun cinta Mike & Minyuk).
     - 💌 **Surat Cinta Interaktif:** Amplop interaktif berisikan pesan manis dan ucapan anniversary dari Mike untuk Minyuk.
     - 🎁 **Kupon Hadiah dari Mike:** Traktiran makan bebas pilih (Mike yang bayar!), kupon bebas ngambek 24 jam, kupon peluk cium, dan tiket kencan konser gigs!
     - 📲 **Tombol WhatsApp Langsung:** Minyuk bisa langsung membalas chat ke WhatsApp Mike dengan pesan yang sudah terisi otomatis.

---

## 🚀 Cara Menjalankan Website (Lokal)

```bash
npm.cmd run dev
```
Buka browser di **http://localhost:3000**.
