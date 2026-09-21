# PTS MASTER — Latihan PTS Kelas 7 SMP

Aplikasi latihan interaktif Penilaian Tengah Semester (PTS) untuk siswa kelas 7 SMP dengan kurikulum terbaru (Kurikulum Merdeka). Dirancang dengan estetika modern, minimalis, dan clean terinspirasi dari developer tools / Claude Code (Dark/Light mode, tipografi presisi, border tipis, dan pengalaman mobile-first).

---

## 🚀 Fitur Utama

- **3 Pilihan Mata Pelajaran Lengkap (Total 90 Soal)**:
  - 📐 **Matematika (30 Soal)**: Operasi bilangan bulat & pecahan campuran, bentuk aljabar, persamaan linear satu variabel (PLSV), perbandingan senilai/berbalik nilai, skala peta, aritmatika sosial (diskon/untung/rugi), sudut & bangun datar segiempat/segitiga.
  - 📖 **Qur'an Hadis (30 Soal)**: Kedudukan Al-Qur'an dan Hadis nabi, kandungan Surah Asy-Syams dan Surah Al-Lail, hukum tajwid dasar (Alif Lam Syamsiyah/Qamariyah, Mad Thabi'i), hadis kewajiban menuntut ilmu & niat ikhlas.
  - 🎨 **Seni Rupa (30 Soal)**: Unsur-unsur seni rupa (titik, garis, bidang, bentuk, warna, tekstur, gelap-terang, ruang), prinsip-prinsip seni rupa, teori warna primer/sekunder/komplementer, seni murni & terapan 2D/3D, menggambar flora fauna alam benda, serta ragam hias & teknik berkarya (arsir, pointilis, kolase).
- **Simulasi Ujian Realistis**:
  - Timer mundur otomatis 30:00 dengan indikator visual.
  - Auto-submit ketika waktu habis tanpa menghilangkan jawaban yang sudah dipilih.
  - Lembar soal satu per satu dengan indikator progres & navigasi cepat (Question Palette 1–40).
  - Dialog konfirmasi pengumpulan ujian dengan deteksi jumlah soal belum terjawab.
- **Loading Screen Interaktif**:
  - Animasi transisi 1–2 detik setelah klik "Kumpulkan Ujian" dengan teks dinamis ("Memeriksa jawaban...", "Menghitung skor...", "Menyiapkan hasil...").
- **Halaman Hasil & Statistik**:
  - Skor otomatis skala 0–100, jumlah benar, salah, dan tidak dijawab.
  - Kategori prestasi: *Sangat Baik* (90–100), *Baik* (80–89), *Cukup* (70–79), dan *Perlu Belajar Lagi* (<70).
- **Review & Pembahasan Mendalam**:
  - Pembahasan kunci jawaban dan penjelasan pedagogis untuk setiap nomor.
  - Filter interaktif: *Semua*, *✅ Benar*, *❌ Salah*, dan *⚪ Tidak Dijawab*.
- **Ulangi Tes & Simpan Sesi**:
  - Opsi reset jawaban dan timer dengan nama siswa tetap tersimpan.
  - Terintegrasi dengan `localStorage`: progres ujian tidak hilang jika halaman direfresh tanpa sengaja.
- **Dark & Light Mode**:
  - Toggle tema instan dengan mode default dark bernuansa developer modern.

---

## 📁 Struktur Project

```text
/
├── index.html                  # Entry point HTML dengan font Plus Jakarta Sans & JetBrains Mono
├── package.json                # Dependensi & skrip Vite/React
├── vite.config.ts              # Konfigurasi Vite & Tailwind CSS
├── tsconfig.json               # Konfigurasi TypeScript
├── README.md                   # Dokumentasi instalasi dan deployment
└── src/
    ├── main.tsx                # Mount aplikasi React
    ├── App.tsx                 # Quiz engine, controller alur layar & state
    ├── index.css               # Import Tailwind CSS & styling global
    ├── types.ts                # Deklarasi tipe TypeScript (Question, ExamResult, Subject, dll.)
    ├── components/
    │   ├── Navbar.tsx          # Navigasi atas, live timer, badge nama & toggle tema
    │   ├── NameScreen.tsx      # Layar 1: Input nama siswa
    │   ├── SubjectScreen.tsx   # Layar 2: Pemilihan 3 mata pelajaran (Matematika, Qur'an Hadis, Seni Rupa)
    │   ├── QuizScreen.tsx      # Layar 3: Tampilan kuis 1 soal per layar & palette
    │   ├── ConfirmModal.tsx    # Modal konfirmasi submit
    │   ├── LoadingScreen.tsx   # Layar transisi loading animasi periksa hasil
    │   ├── ResultScreen.tsx    # Layar 4: Skor akhir & metrik evaluasi
    │   └── ReviewScreen.tsx    # Layar 5: Review & pembahasan soal lengkap
    ├── data/
    │   ├── matematika.ts       # 30 soal Matematika Kelas 7 SMP
    │   ├── quranHadis.ts       # 30 soal Qur'an Hadis Kelas 7 SMP
    │   └── seniRupa.ts         # 30 soal Seni Rupa Kelas 7 SMP
    └── utils/
        └── storage.ts          # Helper penyimpanan localStorage
```

---

## 💻 Cara Install & Menjalankan Lokal

Pastikan Anda telah menginstal **Node.js** (versi 18 atau lebih baru).

### 1. Clone atau Download Repository
```bash
git clone <url-repository-anda>
cd pts-master-kelas-7
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser di alamat `http://localhost:3000` (atau port yang ditampilkan di terminal).

---

## 🔨 Cara Build Project

Untuk menghasilkan file statis siap produksi:

```bash
npm run build
```

Hasil build akan otomatis berada di folder `dist/`.

Anda dapat menguji hasil build secara lokal dengan perintah:
```bash
npm run preview
```

---

## 🌐 Cara Deploy ke Vercel

Project ini siap di-deploy langsung ke Vercel tanpa konfigurasi tambahan:

### Metode 1: Deploy via Vercel CLI
1. Install Vercel CLI (jika belum ada):
   ```bash
   npm i -g vercel
   ```
2. Jalankan perintah di root project:
   ```bash
   vercel
   ```
3. Ikuti petunjuk singkat di terminal. Vercel akan otomatis mendeteksi preset **Vite**.
4. Untuk deploy ke production:
   ```bash
   vercel --prod
   ```

### Metode 2: Deploy via Vercel Dashboard (GitHub / Git)
1. Push project Anda ke repository GitHub / GitLab / Bitbucket.
2. Masuk ke [vercel.com](https://vercel.com) dan klik **"Add New Project"**.
3. Pilih repository Anda.
4. Pada bagian **Build and Output Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik **"Deploy"**. Dalam hitungan detik website Anda akan aktif online!

---

## ✏️ Cara Menambah atau Mengubah Soal

Data soal dipisahkan secara rapi di dalam folder `src/data/`:
- `src/data/indonesia.ts` untuk soal Bahasa Indonesia.
- `src/data/english.ts` untuk soal Bahasa Inggris.

### Format Data Soal:
Setiap soal memiliki struktur objek berikut:

```typescript
{
  id: 1,                                       // Nomor urut soal (number)
  indicator: "1. Menjelaskan tujuan teks...",  // Indikator kisi-kisi atau topik (string)
  topic: "Teks Deskripsi",                     // Topik umum (opsional)
  difficulty: "easy",                          // "easy" | "medium" | "challenging" (opsional)
  passage: "Kutipan teks bacaan...",           // Teks kutipan jika berbentuk bacaan (opsional)
  question: "Kalimat pertanyaan yang ditanyakan?",
  options: [                                   // Tepat 4 pilihan jawaban:
    "Pilihan jawaban A",
    "Pilihan jawaban B",
    "Pilihan jawaban C",
    "Pilihan jawaban D"
  ],
  correctAnswer: 0,                            // Indeks jawaban benar (0 = A, 1 = B, 2 = C, 3 = D)
  explanation: "Pembahasan mengapa pilihan tersebut benar..."
}
```

> **Catatan Penting**:
> Indeks `correctAnswer` menggunakan format angka berbasis 0:
> - `0` untuk pilihan **A**
> - `1` untuk pilihan **B**
> - `2` untuk pilihan **C**
> - `3` untuk pilihan **D**

---

## 🛡️ Lisensi & Hak Cipta
Aplikasi ini dikembangkan untuk media pembelajaran siswa dan penilaian tengah semester SMP. Bebas digunakan dan dimodifikasi untuk kepentingan pendidikan.
