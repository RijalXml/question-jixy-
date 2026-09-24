// Data Materi Belajar & Latihan Soal Bahasa Arab Kelas 7 SMP/MTs
// 4 Topik Utama:
// 1. Tempat-tempat (أَمَاكِنُ)
// 2. Mata angin (الْجِهَاتُ)
// 3. Perkenalan (التَّعَارُفُ)
// 4. Fasilitas sekolah (مَرَافِقُ الْمَدْرَسَةِ)

export interface VocabItem {
  arabic: string;
  transliteration: string;
  meaning: string;
  notes?: string;
}

export interface SentenceExample {
  arabic: string;
  transliteration: string;
  translation: string;
  notes?: string;
}

export interface DialogueLine {
  speaker: string;
  speakerRole?: string;
  arabic: string;
  transliteration: string;
  translation: string;
}

export interface TopicMaterial {
  id: 'taaruf' | 'fasilitas' | 'tempat' | 'mata-angin';
  topicNumber: number;
  titleIndonesian: string;
  titleArabic: string;
  transliteration: string;
  badge: string;
  colorTheme: string;
  introduction: string;
  vocabularies: VocabItem[];
  sentences: SentenceExample[];
  dialogue?: DialogueLine[];
  extraSection?: {
    title: string;
    description: string;
    items: { label: string; arabic: string; transliteration: string; meaning: string }[];
  };
  memorizationTips: string[];
}

export interface ExerciseChoice {
  id: number;
  question: string;
  arabicText?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExerciseMatch {
  id: number;
  arabic: string;
  transliteration: string;
  correctMeaning: string;
}

export interface ExerciseTranslate {
  id: number;
  arabic: string;
  transliteration: string;
  correctTranslation: string;
  hint?: string;
  explanation: string;
}

export interface ExerciseFillBlank {
  id: number;
  sentenceWithBlank: string;
  blankTransliteration: string;
  translation: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

export const MATERI_BAHASA_ARAB_KELAS_7: TopicMaterial[] = [
  // 1. PERKENALAN (التَّعَارُفُ)
  {
    id: 'taaruf',
    topicNumber: 1,
    titleIndonesian: 'Perkenalan',
    titleArabic: 'التَّعَارُفُ',
    transliteration: "At-Ta'āruf",
    badge: '🤝 Topik 1',
    colorTheme: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
    introduction:
      'Perkenalan (التَّعَارُفُ) adalah materi paling dasar dan utama saat mulai belajar Bahasa Arab di kelas 7. Materi ini mencakup kata sapaan harian (tahiyyat), salam perjumpaan, cara menyebutkan nama diri, menanyakan kabar, asal daerah, dan salam perpisahan yang santun.',
    vocabularies: [
      {
        arabic: 'السَّلَامُ عَلَيْكُمْ',
        transliteration: "Assalāmu 'alaikum",
        meaning: 'Semoga keselamatan tercurah untuk kalian (Salam perjumpaan)',
      },
      {
        arabic: 'صَبَاحُ الْخَيْرِ',
        transliteration: 'Shabāhul khair',
        meaning: 'Selamat pagi',
        notes: 'Dijawab: صَبَاحُ النُّوْرِ (Shabāhun nūr)',
      },
      {
        arabic: 'مَسَاءُ الْخَيْرِ',
        transliteration: 'Masā-ul khair',
        meaning: 'Selamat sore',
        notes: 'Dijawab: مَسَاءُ النُّوْرِ (Masā-un nūr)',
      },
      {
        arabic: 'أَهْلًا وَسَهْلًا',
        transliteration: 'Ahlan wa sahlan',
        meaning: 'Selamat datang',
        notes: 'Dijawab: أَهْلًا بِكَ (Ahlan bika - lk) / أَهْلًا بِكِ (Ahlan biki - pr)',
      },
      {
        arabic: 'كَيْفَ حَالُكَ؟',
        transliteration: 'Kaifa hāluka?',
        meaning: 'Bagaimana kabarmu? (untuk laki-laki)',
        notes: 'Untuk perempuan gunakan: كَيْفَ حَالُكِ؟ (Kaifa hāluki?)',
      },
      {
        arabic: 'بِخَيْرٍ، وَالْحَمْدُ لِلّٰهِ',
        transliteration: 'Bikhairin, walhamdulillāh',
        meaning: 'Baik-baik saja, segala puji bagi Allah',
      },
      {
        arabic: 'مَا اسْمُكَ؟',
        transliteration: 'Mas muka?',
        meaning: 'Siapa namamu? (untuk laki-laki)',
        notes: 'Untuk perempuan: مَا اسْمُكِ؟ (Mas muki?)',
      },
      {
        arabic: 'اسْمِيْ ...',
        transliteration: 'Ismī ...',
        meaning: 'Namaku ...',
      },
      {
        arabic: 'مَنْ أَنْتَ؟ / مَنْ أَنْتِ؟',
        transliteration: 'Man anta? / Man anti?',
        meaning: 'Siapakah kamu? (kamu laki-laki / kamu perempuan)',
      },
      {
        arabic: 'أَنَا طَالِبٌ / طَالِبَةٌ',
        transliteration: 'Ana thālibun / thālibatun',
        meaning: 'Saya seorang siswa / siswi',
      },
      {
        arabic: 'مِنْ أَيْنَ أَنْتَ؟',
        transliteration: 'Min aina anta?',
        meaning: 'Dari mana kamu berasal?',
      },
      {
        arabic: 'شُكْرًا / عَفْوًا',
        transliteration: "Syukran / 'Afwan",
        meaning: 'Terima kasih / Sama-sama',
      },
      {
        arabic: 'إِلَى اللِّقَاءِ / مَعَ السَّلَامَةِ',
        transliteration: "Ilal liqā' / Ma'as salāmah",
        meaning: 'Sampai jumpa / Selamat jalan (semoga selamat)',
      },
    ],
    dialogue: [
      {
        speaker: 'أَحْمَدُ (Ahmad)',
        arabic: 'السَّلَامُ عَلَيْكُمْ يَا أَخِيْ.',
        transliteration: "Assalāmu 'alaikum yā akhī.",
        translation: 'Assalamu alaikum wahai saudaraku.',
      },
      {
        speaker: 'حَسَنٌ (Hasan)',
        arabic: 'وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ.',
        transliteration: "Wa 'alaikumus salām wa rahmatullāh.",
        translation: 'Waalaikumsalam warahmatullahi.',
      },
      {
        speaker: 'أَحْمَدُ (Ahmad)',
        arabic: 'صَبَاحُ الْخَيْرِ! مَا اسْمُكَ؟',
        transliteration: 'Shabāhul khair! Mas muka?',
        translation: 'Selamat pagi! Siapakah namamu?',
      },
      {
        speaker: 'حَسَنٌ (Hasan)',
        arabic: 'صَبَاحُ النُّوْرِ! اسْمِيْ حَسَنٌ، وَمَا اسْمُكَ أَنْتَ؟',
        transliteration: 'Shabāhun nūr! Ismī Hasan, wa mas muka anta?',
        translation: 'Selamat pagi juga! Namaku Hasan, dan siapa namamu?',
      },
      {
        speaker: 'أَحْمَدُ (Ahmad)',
        arabic: 'اسْمِيْ أَحْمَدُ. هَلْ أَنْتَ طَالِبٌ جَدِيْدٌ هُنَا؟',
        transliteration: 'Ismī Ahmad. Hal anta thālibun jadīdun hunā?',
        translation: 'Namaku Ahmad. Apakah kamu murid baru di sini?',
      },
      {
        speaker: 'حَسَنٌ (Hasan)',
        arabic: 'نَعَمْ، أَنَا طَالِبٌ فِي الصَّفِّ السَّابِعِ.',
        transliteration: "Na'am, ana thālibun fish shaffis sābi'i.",
        translation: 'Ya, saya murid di kelas 7.',
      },
      {
        speaker: 'أَحْمَدُ (Ahmad)',
        arabic: 'أَهْلًا وَسَهْلًا يَا حَسَنُ! كَيْفَ حَالُكَ الْيَوْمَ؟',
        transliteration: 'Ahlan wa sahlan yā Hasan! Kaifa hāluka al-yaum?',
        translation: 'Selamat datang wahai Hasan! Bagaimana kabarmu hari ini?',
      },
      {
        speaker: 'حَسَنٌ (Hasan)',
        arabic: 'أَهْلًا بِكَ يَا أَحْمَدُ، أَنَا بِخَيْرٍ وَالْحَمْدُ لِلّٰهِ. شُكْرًا لَكَ.',
        transliteration: "Ahlan bika yā Ahmad, ana bikhairin walhamdulillāh. Syukran laka.",
        translation: 'Selamat datang juga wahai Ahmad, saya sehat walhamdulillah. Terima kasih kepadamu.',
      },
      {
        speaker: 'أَحْمَدُ (Ahmad)',
        arabic: 'عَفْوًا، إِلَى اللِّقَاءِ فِي الْفَصْلِ!',
        transliteration: "Afwan, ilal liqā'i fil fashli!",
        translation: 'Sama-sama, sampai jumpa di kelas!',
      },
      {
        speaker: 'حَسَنٌ (Hasan)',
        arabic: 'مَعَ السَّلَامَةِ!',
        transliteration: "Ma'as salāmah!",
        translation: 'Selamat jalan!',
      },
    ],
    sentences: [
      {
        arabic: 'أَنَا طَالِبٌ فِي الْمَدْرَسَةِ الْمُتَوَسِّطَةِ.',
        transliteration: 'Ana thālibun fil madrasatil mutawassithati.',
        translation: 'Saya seorang siswa di Sekolah Menengah Pertama (SMP/MTs).',
      },
      {
        arabic: 'هَذَا صَدِيْقِيْ، اسْمُهُ عَلِيٌّ.',
        transliteration: "Hādzā shadīqī, ismuhu 'Alī.",
        translation: 'Ini temanku (laki-laki), namanya Ali.',
      },
      {
        arabic: 'هَذِهِ صَدِيْقَتِيْ، اسْمُهَا عَائِشَةُ.',
        transliteration: "Hādzihi shadīqatī, ismuhā 'Āisyah.",
        translation: 'Ini temanku (perempuan), namanya Aisyah.',
      },
      {
        arabic: 'كَيْفَ حَالُكَ يَا أُسْتَاذُ؟',
        transliteration: 'Kaifa hāluka yā ustādz?',
        translation: 'Bagaimana kabarmu wahai Bapak Guru?',
      },
    ],
    memorizationTips: [
      'Ingat Pasangan Sapaan: صَبَاحُ الْخَيْرِ pasangannya صَبَاحُ النُّوْرِ (kata "Nuur" berarti cahaya, membalas kebaikan dengan cahaya).',
      'Ingat Sapaan Datang & Respon: أَهْلًا وَسَهْلًا dibalas أَهْلًا بِكَ (bika untuk pria) atau أَهْلًا بِكِ (biki untuk wanita).',
      'Bedakan Harakat Akhir Ka/Ki: كَ (Ka) untuk laki-laki, contoh: كَيْفَ حَالُكَ؟; sedangkan كِ (Ki) untuk perempuan, contoh: كَيْفَ حَالُكِ؟.',
      'Kepemilikan "Ku": Cukup tambahkan huruf Ya sukun (ـيْ) di akhir kata. Ismun (nama) -> Ismii (namaku); Shadiiqun (teman) -> Shadiiqii (temanku).',
    ],
  },

  // 2. FASILITAS SEKOLAH (مَرَافِقُ الْمَدْرَسَةِ)
  {
    id: 'fasilitas',
    topicNumber: 2,
    titleIndonesian: 'Fasilitas Sekolah',
    titleArabic: 'مَرَافِقُ الْمَدْرَسَةِ',
    transliteration: 'Marāfiqul Madrasah',
    badge: '🏫 Topik 2',
    colorTheme: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-300',
    introduction:
      'Fasilitas sekolah (مَرَافِقُ الْمَدْرَسَةِ) adalah ruangan, sarana, dan prasarana yang digunakan siswa dan guru setiap hari di lingkungan sekolah/madrasah. Kosakata pada topik ini sangat sering keluar dalam ulangan harian dan ujian semester kelas 7.',
    vocabularies: [
      {
        arabic: 'مَدْرَسَةٌ',
        transliteration: 'Madrasatun',
        meaning: 'Sekolah / Madrasah',
      },
      {
        arabic: 'فَصْلٌ',
        transliteration: 'Fashlun',
        meaning: 'Kelas / Ruang kelas',
      },
      {
        arabic: 'مَكْتَبَةٌ',
        transliteration: 'Maktabatun',
        meaning: 'Perpustakaan',
        notes: 'Tempat membaca & meminjam buku',
      },
      {
        arabic: 'مَسْجِدٌ / مُصَلًّى',
        transliteration: 'Masjidun / Mushallan',
        meaning: 'Masjid / Mushalla',
        notes: 'Tempat ibadah shalat berjamaah',
      },
      {
        arabic: 'مَقْصَفٌ',
        transliteration: 'Maqshafun',
        meaning: 'Kantin sekolah',
        notes: 'Tempat membeli makanan & minuman',
      },
      {
        arabic: 'مَعْمَلٌ / مُخْتَبَرٌ',
        transliteration: "Ma'malun / Mukhtabarun",
        meaning: 'Laboratorium (Komputer / IPA / Bahasa)',
      },
      {
        arabic: 'مَيْدَانٌ / مَلْعَبٌ',
        transliteration: "Maidānun / Mal'abun",
        meaning: 'Lapangan sekolah / Lapangan olahraga',
      },
      {
        arabic: 'غُرْفَةُ الْمُدَرِّسِ',
        transliteration: 'Ghurfatul mudarrisi',
        meaning: 'Ruang guru',
      },
      {
        arabic: 'غُرْفَةُ النَّاظِرِ / الْمُدِيْرِ',
        transliteration: 'Ghurfatun nāzhiri / almudiiri',
        meaning: 'Ruang Kepala Sekolah',
      },
      {
        arabic: 'حَمَّامٌ / دَوْرَةُ الْمِيَاهِ',
        transliteration: 'Hammāmun / Dauratul miyāh',
        meaning: 'Kamar mandi / Toilet',
      },
      {
        arabic: 'سَاحَةٌ',
        transliteration: 'Sāhatun',
        meaning: 'Halaman sekolah',
      },
      {
        arabic: 'بَوَّابَةٌ',
        transliteration: 'Bawwābatun',
        meaning: 'Gerbang / Pintu gerbang sekolah',
      },
    ],
    sentences: [
      {
        arabic: 'هَذَا فَصْلٌ وَاسِعٌ وَنَظِيْفٌ.',
        transliteration: 'Hādzā fashlun wāsi\'un wa nazhīfun.',
        translation: 'Ini adalah ruang kelas yang luas dan bersih.',
      },
      {
        arabic: 'هَذِهِ مَكْتَبَةٌ كَبِيْرَةٌ، فِيْهَا كُتُبٌ كَثِيْرَةٌ.',
        transliteration: 'Hādzihi maktabatun kabīratun, fīhā kutubun katsīratun.',
        translation: 'Ini adalah perpustakaan yang besar, di dalamnya terdapat banyak buku.',
      },
      {
        arabic: 'الطُّلَّابُ يَشْتَرُوْنَ الطَّعَامَ فِي الْمَقْصَفِ.',
        transliteration: 'Ath-thullābu yasytarūna ath-tha\'āma fil maqshafi.',
        translation: 'Para siswa membeli makanan di kantin sekolah.',
      },
      {
        arabic: 'نَحْنُ نُصَلِّيْ صَلَاةَ الظُّهْرِ فِي الْمَسْجِدِ.',
        transliteration: 'Nahnu nushallī shalātazh zhuhri fil masjidi.',
        translation: 'Kami menunaikan shalat Dzuhur di masjid.',
      },
      {
        arabic: 'التَّلَامِيْذُ يَلْعَبُوْنَ كُرَةَ الْقَدَمِ فِي الْمَيْدَانِ.',
        transliteration: 'At-talāmīdz yal\'abūna kuratal qadami fil maidāni.',
        translation: 'Murid-murid bermain sepak bola di lapangan.',
      },
    ],
    memorizationTips: [
      'Pola Awalan Tempat "Ma-" (مَـ): Banyak nama fasilitas bahasa Arab diawali huruf mim berharakat fathah (مَـ) karena berasal dari kata kerja penunjuk tempat: Kataba (menulis) -> Maktabatun (perpustakaan); ' +
        'Qashafa (makan/santai) -> Maqshafun (kantin); ' +
        "'Amila (bekerja/praktik) -> Ma'malun (laboratorium); " +
        'La\'iba (bermain) -> Mal\'abun (lapangan bermain).',
      'Aturan Kata Tunjuk (Isim Isyarah): ' +
        'Gunakan هَذَا (Hādzā = ini) untuk kata tanpa ta marbuthah (فَصْلٌ, مَسْجِدٌ, مَقْصَفٌ, مَيْدَانٌ). ' +
        'Gunakan هَذِهِ (Hādzihi = ini) untuk kata berakhiran ta marbuthah ة (مَدْرَسَةٌ, مَكْتَبَةٌ, سَاحَةٌ, بَوَّابَةٌ).',
      'Asosiasi Fungsi: Hubungkan kata dengan kegiatanmu di sekolah: Baca buku = Maktabah, Jajan gorengan = Maqshaf, Upacara/olahraga = Maidan, Belajar = Fashl.',
    ],
  },

  // 3. TEMPAT-TEMPAT (أَمَاكِنُ)
  {
    id: 'tempat',
    topicNumber: 3,
    titleIndonesian: 'Tempat-tempat',
    titleArabic: 'أَمَاكِنُ',
    transliteration: "Amākin",
    badge: '🏘️ Topik 3',
    colorTheme: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
    introduction:
      'Tempat-tempat (أَمَاكِنُ - bentuk jamak dari مَكَانٌ/makānun) membahas lingkungan tempat tinggal, fasilitas umum di perkotaan dan pedesaan, serta lokasi-lokasi penting yang sering dikunjungi oleh siswa dan keluarga.',
    vocabularies: [
      {
        arabic: 'بَيْتٌ',
        transliteration: 'Baitun',
        meaning: 'Rumah (tempat tinggal)',
      },
      {
        arabic: 'مَسْجِدٌ',
        transliteration: 'Masjidun',
        meaning: 'Masjid (tempat ibadah)',
      },
      {
        arabic: 'سُوْقٌ',
        transliteration: 'Sūqun',
        meaning: 'Pasar (tempat jual beli)',
      },
      {
        arabic: 'حَدِيْقَةٌ',
        transliteration: 'Hadīqatun',
        meaning: 'Taman / Kebun',
      },
      {
        arabic: 'مُسْتَشْفَى',
        transliteration: 'Mustasyfā',
        meaning: 'Rumah Sakit',
      },
      {
        arabic: 'مَحَطَّةٌ',
        transliteration: 'Mahaththathun',
        meaning: 'Stasiun kereta / Halte bus',
      },
      {
        arabic: 'قَرْيَةٌ',
        transliteration: 'Qaryatun',
        meaning: 'Desa / Perkampungan',
      },
      {
        arabic: 'مَدِيْنَةٌ',
        transliteration: 'Madīnatun',
        meaning: 'Kota / Wilayah perkotaan',
      },
      {
        arabic: 'شَارِعٌ',
        transliteration: "Syāri'un",
        meaning: 'Jalan raya / Alamat jalan',
      },
      {
        arabic: 'مَطْعَمٌ',
        transliteration: "Math'amun",
        meaning: 'Rumah makan / Restoran',
      },
    ],
    sentences: [
      {
        arabic: 'بَيْتِيْ قَرِيْبٌ مِنَ الْمَدْرَسَةِ.',
        transliteration: 'Baitī qarībun minal madrasati.',
        translation: 'Rumahku dekat dari sekolah.',
      },
      {
        arabic: 'أُمِّيْ تَذْهَبُ إِلَى السُّوْقِ فِي الصَّبَاحِ.',
        transliteration: 'Ummī tadzhabu ilas sūqi fish shabāhi.',
        translation: 'Ibuku pergi ke pasar pada waktu pagi.',
      },
      {
        arabic: 'الْمَسْجِدُ يَقَعُ أَمَامَ بَيْتِيْ.',
        transliteration: 'Al-masjidu yaqa\'u amāma baitī.',
        translation: 'Masjid terletak di depan rumahku.',
      },
      {
        arabic: 'أَحْمَدُ يَجْلِسُ فِي الْحَدِيْقَةِ الْجَمِيْلَةِ.',
        transliteration: 'Ahmadu yajlisu fil hadīqatil jamīlati.',
        translation: 'Ahmad duduk di taman yang indah.',
      },
      {
        arabic: 'هَذِهِ مَدِيْنَةٌ كَبِيْرَةٌ وَمُزْدَحِمَةٌ.',
        transliteration: 'Hādzihi madīnatun kabīratun wa muzdahimatun.',
        translation: 'Ini adalah kota yang besar dan ramai.',
      },
    ],
    memorizationTips: [
      'Kombinasikan dengan Huruf Jar (حُرُوْفُ الْجَرِّ): Hubungkan kata tempat dengan kata depan sederhana: فِي (di/di dalam), إِلَى (ke), مِنْ (dari). Contoh: فِي الْبَيْتِ (di rumah), إِلَى السُّوْقِ (ke pasar), مِنَ الْمَسْجِدِ (dari masjid).',
      'Cerita Rute Sehari-hari: Bayangkan perjalananmu dari بَيْتٌ (rumah), menyusuri شَارِعٌ (jalan), melihat مَسْجِدٌ (masjid), mampir ke حَدِيْقَةٌ (taman), lalu sampai di مَدْرَسَةٌ (sekolah).',
      'Ingat Kata Berlawanan: قَرْيَةٌ (Desa yang sejuk & tenang) lawan katanya مَدِيْنَةٌ (Kota yang ramai & besar).',
    ],
  },

  // 4. MATA ANGIN (الْجِهَاتُ)
  {
    id: 'mata-angin',
    topicNumber: 4,
    titleIndonesian: 'Mata Angin',
    titleArabic: 'الْجِهَاتُ',
    transliteration: 'Al-Jihāt',
    badge: '🧭 Topik 4',
    colorTheme: 'from-purple-500/20 to-violet-500/10 border-purple-500/30 text-purple-300',
    introduction:
      'Mata angin (الْجِهَاتُ / al-Jihāt) digunakan untuk menunjukkan arah mata angin dan letak geografis suatu tempat. Untuk siswa kelas 7, kita mempelajari 4 arah utama (utara, selatan, timur, barat) dan 4 arah tambahan (timur laut, tenggara, barat daya, barat laut), sehingga totalnya ada 8 arah mata angin lengkap.',
    vocabularies: [
      // 4 Arah Utama
      {
        arabic: 'شَمَالٌ',
        transliteration: 'Syamālun',
        meaning: 'Utara (Arah mata angin utama ke atas)',
        notes: 'Arah mata angin utama 1',
      },
      {
        arabic: 'جَنُوْبٌ',
        transliteration: 'Janūbun',
        meaning: 'Selatan (Arah mata angin utama ke bawah)',
        notes: 'Arah mata angin utama 2',
      },
      {
        arabic: 'شَرْقٌ',
        transliteration: 'Syarqun',
        meaning: 'Timur (Arah terbitnya matahari)',
        notes: 'Arah mata angin utama 3',
      },
      {
        arabic: 'غَرْبٌ',
        transliteration: 'Gharbun',
        meaning: 'Barat (Arah terbenamnya matahari / arah kiblat di Indonesia)',
        notes: 'Arah mata angin utama 4',
      },
      // 4 Arah Tambahan
      {
        arabic: 'شَمَالٌ شَرْقِيٌّ',
        transliteration: 'Syamālun syarqiyyun',
        meaning: 'Timur Laut (antara Utara dan Timur)',
        notes: 'Arah tambahan 1',
      },
      {
        arabic: 'جَنُوْبٌ شَرْقِيٌّ',
        transliteration: 'Janūbun syarqiyyun',
        meaning: 'Tenggara (antara Selatan dan Timur)',
        notes: 'Arah tambahan 2',
      },
      {
        arabic: 'جَنُوْبٌ غَرْبِيٌّ',
        transliteration: 'Janūbun gharbiyyun',
        meaning: 'Barat Daya (antara Selatan dan Barat)',
        notes: 'Arah tambahan 3',
      },
      {
        arabic: 'شَمَالٌ غَرْبِيٌّ',
        transliteration: 'Syamālun gharbiyyun',
        meaning: 'Barat Laut (antara Utara dan Barat)',
        notes: 'Arah tambahan 4',
      },
    ],
    extraSection: {
      title: 'Tabel Lengkap 8 Arah Mata Angin (الْجِهَاتُ الثَّمَانِيَةُ)',
      description:
        'Berikut adalah ringkasan sistematis 8 arah mata angin dari Utara searah jarum jam untuk memudahkan belajar dan ulangan:',
      items: [
        { label: '1. Utara', arabic: 'شَمَالٌ', transliteration: 'Syamāl', meaning: 'Utara (0° / Atas)' },
        {
          label: '2. Timur Laut',
          arabic: 'شَمَالٌ شَرْقِيٌّ',
          transliteration: 'Syamāl Syarqī',
          meaning: 'Timur Laut (antara utara & timur)',
        },
        { label: '3. Timur', arabic: 'شَرْقٌ', transliteration: 'Syarq', meaning: 'Timur (Tempat terbit matahari)' },
        {
          label: '4. Tenggara',
          arabic: 'جَنُوْبٌ شَرْقِيٌّ',
          transliteration: 'Janūb Syarqī',
          meaning: 'Tenggara (antara selatan & timur)',
        },
        { label: '5. Selatan', arabic: 'جَنُوْبٌ', transliteration: 'Janūb', meaning: 'Selatan (180° / Bawah)' },
        {
          label: '6. Barat Daya',
          arabic: 'جَنُوْبٌ غَرْبِيٌّ',
          transliteration: 'Janūb Gharbī',
          meaning: 'Barat Daya (antara selatan & barat)',
        },
        {
          label: '7. Barat',
          arabic: 'غَرْبٌ',
          transliteration: 'Gharb',
          meaning: 'Barat (Tempat terbenam matahari / Kiblat RI)',
        },
        {
          label: '8. Barat Laut',
          arabic: 'شَمَالٌ غَرْبِيٌّ',
          transliteration: 'Syamāl Gharbī',
          meaning: 'Barat Laut (antara utara & barat)',
        },
      ],
    },
    sentences: [
      {
        arabic: 'الشَّمْسُ تَطْلُعُ مِنَ الشَّرْقِ.',
        transliteration: 'Asy-syamsu tathlu\'u minasy syarqi.',
        translation: 'Matahari terbit dari arah timur.',
      },
      {
        arabic: 'الشَّمْسُ تَغْرُبُ فِي الْغَرْبِ.',
        transliteration: 'Asy-syamsu taghrubu fil gharbi.',
        translation: 'Matahari terbenam di arah barat.',
      },
      {
        arabic: 'جَاكَرْتَا تَقَعُ فِي جَاوَى الْغَرْبِيَّةِ.',
        transliteration: 'Jākartā taqa\'u fī Jāwā al-gharbiyyati.',
        translation: 'Jakarta terletak di (wilayah) Jawa bagian Barat.',
      },
      {
        arabic: 'الْمَسْجِدُ يَقَعُ فِي جِهَةِ الشَّمَالِ مِنَ الْمَدْرَسَةِ.',
        transliteration: 'Al-masjidu yaqa\'u fī jihatisy syamāli minal madrasati.',
        translation: 'Masjid terletak di sebelah utara dari sekolah.',
      },
      {
        arabic: 'الْمَيْدَانُ فِي جَنُوْبِ الْفَصْلِ.',
        transliteration: 'Al-maidānu fī janūbil fashli.',
        translation: 'Lapangan berada di sebelah selatan ruang kelas.',
      },
    ],
    memorizationTips: [
      'Rumus Mudah Membentuk Arah Tambahan: Selalu sebutkan kata poros vertikal terlebih dahulu (شَمَالٌ = Utara atau جَنُوْبٌ = Selatan), kemudian tambahkan kata poros horizontal berakhiran Ya Nisbah (شَرْقِيٌّ = Timur atau غَرْبِيٌّ = Barat). ' +
        'Contoh: Utara + Timur = شَمَالٌ شَرْقِيٌّ (Timur Laut). Selatan + Barat = جَنُوْبٌ غَرْبِيٌّ (Barat Daya).',
      'Asosiasi Alam Sekitar: ' +
        'Syarq (شَرْقٌ) = terbit (isyraq / matahari muncul). ' +
        'Gharb (غَرْبٌ) = terbenam (maghrib / matahari tenggelam). ' +
        'Syamal (شَمَالٌ) = utara. ' +
        'Janub (جَنُوْبٌ) = selatan.',
      'Hubungkan dengan Nama Daerah di Indonesia: ' +
        'Jawa Barat = جَاوَى الْغَرْبِيَّةِ (Gharbiyyah = barat). ' +
        'Jawa Timur = جَاوَى الشَّرْقِيَّةِ (Syarqiyyah = timur). ' +
        'Sumatera Utara = سُوْمَطْرَة الشَّمَالِيَّةِ (Syamaaliyyah = utara). ' +
        'Sulawesi Selatan = سُولَاوِيْسِي الْجَنُوْبِيَّةِ (Januubiyyah = selatan).',
    ],
  },
];

// ==========================================
// BANK LATIHAN SOAL KELAS 7 (TOTAL 25 SOAL)
// ==========================================

// Bagian 1: 10 Soal Pilihan Ganda
export const LATIHAN_PILIHAN_GANDA: ExerciseChoice[] = [
  {
    id: 1,
    question: 'Sapaan pagi dalam Bahasa Arab "صَبَاحُ الْخَيْرِ" direspon dengan ucapan...',
    arabicText: 'صَبَاحُ الْخَيْرِ',
    options: ['مَسَاءُ النُّوْرِ', 'صَبَاحُ النُّوْرِ', 'أَهْلًا بِكَ', 'مَعَ السَّلَامَةِ'],
    correctIndex: 1,
    explanation:
      'Ucapan selamat pagi "صَبَاحُ الْخَيْرِ" (Shabaahul khair) selalu dijawab dengan "صَبَاحُ النُّوْرِ" (Shabaahun nuur) yang artinya "Selamat pagi juga".',
  },
  {
    id: 2,
    question: 'Arti dari fasilitas sekolah "مَكْتَبَةٌ" adalah...',
    arabicText: 'مَكْتَبَةٌ',
    options: ['Laboratorium Komputer', 'Ruang Kelas', 'Perpustakaan', 'Kantin Sekolah'],
    correctIndex: 2,
    explanation:
      'Kata "مَكْتَبَةٌ" (Maktabatun) artinya perpustakaan sekolah, tempat para siswa membaca dan meminjam buku.',
  },
  {
    id: 3,
    question: 'Arah mata angin utama untuk "Selatan" dalam Bahasa Arab adalah...',
    arabicText: 'Selatan = ...',
    options: ['شَمَالٌ', 'غَرْبٌ', 'شَرْقٌ', 'جَنُوْبٌ'],
    correctIndex: 3,
    explanation:
      '"جَنُوْبٌ" (Januubun) artinya Selatan. Sedangkan Syamaal = Utara, Syarq = Timur, dan Gharb = Barat.',
  },
  {
    id: 4,
    question: 'Perhatikan kalimat: "أَنَا طَالِبٌ فِي الْمَدْرَسَةِ". Arti kata "طَالِبٌ" adalah...',
    arabicText: 'أَنَا طَالِبٌ فِي الْمَدْرَسَةِ',
    options: ['Siswa / Murid laki-laki', 'Guru / Pengajar', 'Kepala Sekolah', 'Penjaga Perpustakaan'],
    correctIndex: 0,
    explanation:
      '"طَالِبٌ" (Thaalibun) berarti murid atau siswa laki-laki. Jika siswi perempuan disebut "طَالِبَةٌ" (Thaalibatun).',
  },
  {
    id: 5,
    question: 'Fasilitas di sekolah yang digunakan siswa untuk membeli jajanan saat istirahat adalah...',
    arabicText: '... يَشْتَرِي الطُّلَّابُ فِيهِ الطَّعَامَ',
    options: ['مَسْجِدٌ', 'مَقْصَفٌ', 'مَلْعَبٌ', 'فَصْلٌ'],
    correctIndex: 1,
    explanation:
      '"مَقْصَفٌ" (Maqshafun) artinya kantin sekolah, tempat membeli makanan dan minuman.',
  },
  {
    id: 6,
    question: 'Ketika temanmu mengucapkan terima kasih "شُكْرًا", jawaban yang paling santun dan tepat adalah...',
    arabicText: 'شُكْرًا',
    options: ['نَعَمْ', 'إِلَى اللِّقَاءِ', 'عَفْوًا', 'أَهْلًا وَسَهْلًا'],
    correctIndex: 2,
    explanation:
      'Ucapan "شُكْرًا" (Syukran = terima kasih) dijawab dengan "عَفْوًا" (\'Afwan = sama-sama / terima kasih kembali).',
  },
  {
    id: 7,
    question: 'Arti dari arah mata angin gabungan "شَمَالٌ شَرْقِيٌّ" adalah...',
    arabicText: 'شَمَالٌ شَرْقِيٌّ',
    options: ['Barat Daya', 'Timur Laut', 'Barat Laut', 'Tenggara'],
    correctIndex: 1,
    explanation:
      '"شَمَالٌ" (Utara) + "شَرْقِيٌّ" (Timur) menghasilkan arah "Timur Laut" (antara utara dan timur).',
  },
  {
    id: 8,
    question: 'Kata tunjuk (isim isyarah) yang tepat untuk melengkapi kalimat "... مَدْرَسَةٌ كَبِيْرَةٌ" adalah...',
    arabicText: '... مَدْرَسَةٌ كَبِيْرَةٌ',
    options: ['هَذَا', 'هَذِهِ', 'هُوَ', 'أَنْتَ'],
    correctIndex: 1,
    explanation:
      'Kata "مَدْرَسَةٌ" berakhiran ta marbuthah (ة) yang menunjukkan jenis mu\'annats (perempuan), sehingga kata tunjuk dekat yang tepat adalah "هَذِهِ" (Hadzihi).',
  },
  {
    id: 9,
    question: 'Kosakata tempat "Rumah" dalam Bahasa Arab adalah...',
    arabicText: 'Rumah = ...',
    options: ['بَيْتٌ', 'سُوْقٌ', 'شَارِعٌ', 'قَرْيَةٌ'],
    correctIndex: 0,
    explanation:
      '"بَيْتٌ" (Baitun) artinya rumah. Sedangkan Suuqun = pasar, Syaari\'un = jalan, dan Qaryatun = desa.',
  },
  {
    id: 10,
    question: 'Arti dari kalimat: "الشَّمْسُ تَطْلُعُ مِنَ الشَّرْقِ" adalah...',
    arabicText: 'الشَّمْسُ تَطْلُعُ مِنَ الشَّرْقِ',
    options: [
      'Matahari terbenam di barat',
      'Matahari terbit dari timur',
      'Bulan bersinar di langit selatan',
      'Angin bertiup kencang dari utara',
    ],
    correctIndex: 1,
    explanation:
      '"الشَّمْسُ" (Matahari) "تَطْلُعُ" (terbit / muncul) "مِنَ الشَّرْقِ" (dari arah timur).',
  },
];

// Bagian 2: 5 Soal Mencocokkan (Matching)
export const LATIHAN_MENCOCOKKAN: ExerciseMatch[] = [
  {
    id: 1,
    arabic: 'مَسْجِدٌ',
    transliteration: 'Masjidun',
    correctMeaning: 'Masjid (tempat ibadah shalat)',
  },
  {
    id: 2,
    arabic: 'غَرْبٌ',
    transliteration: 'Gharbun',
    correctMeaning: 'Barat (arah terbenamnya matahari)',
  },
  {
    id: 3,
    arabic: 'مَيْدَانٌ',
    transliteration: 'Maidānun',
    correctMeaning: 'Lapangan (tempat upacara & olahraga)',
  },
  {
    id: 4,
    arabic: 'جَنُوْبٌ شَرْقِيٌّ',
    transliteration: 'Janūbun syarqiyyun',
    correctMeaning: 'Tenggara (antara selatan dan timur)',
  },
  {
    id: 5,
    arabic: 'حَدِيْقَةٌ',
    transliteration: 'Hadīqatun',
    correctMeaning: 'Taman / Kebun yang asri',
  },
];

// Bagian 3: 5 Soal Menerjemahkan B. Arab ke B. Indonesia
export const LATIHAN_MENERJEMAHKAN: ExerciseTranslate[] = [
  {
    id: 1,
    arabic: 'مَا اسْمُكَ؟',
    transliteration: 'Mas muka?',
    correctTranslation: 'Siapakah namamu? (untuk laki-laki)',
    hint: 'Pertanyaan untuk menanyakan nama seseorang',
    explanation:
      '"مَا" = apa/siapa, "اسْمُكَ" = namamu (untuk laki-laki). Jadi artinya: "Siapa namamu?"',
  },
  {
    id: 2,
    arabic: 'هَذَا فَصْلٌ نَظِيْفٌ.',
    transliteration: 'Hādzā fashlun nazhīfun.',
    correctTranslation: 'Ini adalah ruang kelas yang bersih.',
    hint: 'Kata tunjuk benda maskulin + fasilitas sekolah + sifat bersih',
    explanation:
      '"هَذَا" = Ini, "فَصْلٌ" = ruang kelas, "نَظِيْفٌ" = bersih. Artinya: "Ini ruang kelas yang bersih."',
  },
  {
    id: 3,
    arabic: 'بَيْتِيْ قَرِيْبٌ مِنَ الْمَدْرَسَةِ.',
    transliteration: 'Baitī qarībun minal madrasati.',
    correctTranslation: 'Rumahku dekat dari sekolah.',
    hint: 'Kosakata tempat tinggal + jarak dekat + sekolah',
    explanation:
      '"بَيْتِيْ" = rumahku, "قَرِيْبٌ" = dekat, "مِنَ الْمَدْرَسَةِ" = dari sekolah. Artinya: "Rumahku dekat dari sekolah."',
  },
  {
    id: 4,
    arabic: 'الْجِهَاتُ: شَمَالٌ، جَنُوْبٌ، شَرْقٌ، غَرْبٌ.',
    transliteration: 'Al-jihātu: syamālun, janūbun, syarqun, gharbun.',
    correctTranslation: 'Arah mata angin: utara, selatan, timur, barat.',
    hint: 'Empat arah mata angin utama',
    explanation:
      '"الْجِهَاتُ" = arah-arah mata angin: "شَمَالٌ" = utara, "جَنُوْبٌ" = selatan, "شَرْقٌ" = timur, "غَرْبٌ" = barat.',
  },
  {
    id: 5,
    arabic: 'أَهْلًا وَسَهْلًا يَا صَدِيْقِيْ!',
    transliteration: 'Ahlan wa sahlan yā shadīqī!',
    correctTranslation: 'Selamat datang wahai temanku!',
    hint: 'Ucapan salam penyambutan kepada teman laki-laki',
    explanation:
      '"أَهْلًا وَسَهْلًا" = selamat datang, "يَا" = wahai, "صَدِيْقِيْ" = temanku.',
  },
];

// Bagian 4: 5 Soal Melengkapi Kalimat
export const LATIHAN_MELENGKAPI_KALIMAT: ExerciseFillBlank[] = [
  {
    id: 1,
    sentenceWithBlank: 'أَنَا طَالِبٌ، وَاسْمِيْ ...',
    blankTransliteration: 'Ana thālibun, wasmī ...',
    translation: 'Saya seorang siswa, dan namaku ...',
    options: ['حَسَنٌ', 'مَكْتَبَةٌ', 'سُوْقٌ'],
    correctOption: 'حَسَنٌ',
    explanation:
      'Kalimat ini menyatakan nama orang ("namaku ..."), maka pilihan yang tepat adalah nama orang yaitu "حَسَنٌ" (Hasan), bukan nama tempat.',
  },
  {
    id: 2,
    sentenceWithBlank: 'الطُّلَّابُ يَقْرَؤُوْنَ الْكُتُبَ فِيْ ...',
    blankTransliteration: 'Ath-thullābu yaqra-ūnal kutuba fī ...',
    translation: 'Murid-murid membaca buku-buku di ...',
    options: ['الْمَكْتَبَةِ', 'الْمَيْدَانِ', 'الْحَمَّامِ'],
    correctOption: 'الْمَكْتَبَةِ',
    explanation:
      'Aktivitas membaca buku (يَقْرَؤُوْنَ الْكُتُبَ) bertempat di perpustakaan yaitu "الْمَكْتَبَةِ".',
  },
  {
    id: 3,
    sentenceWithBlank: 'مَسَاءُ الْخَيْرِ، يُجَابُ بِـ ...',
    blankTransliteration: 'Masā-ul khair, yujābu bi-...',
    translation: 'Selamat sore, dijawab dengan ...',
    options: ['مَسَاءُ النُّوْرِ', 'صَبَاحُ النُّوْرِ', 'إِلَى اللِّقَاءِ'],
    correctOption: 'مَسَاءُ النُّوْرِ',
    explanation:
      'Sapaan sore "مَسَاءُ الْخَيْرِ" selalu dijawab pasangannya yaitu "مَسَاءُ النُّوْرِ" (Selamat sore juga).',
  },
  {
    id: 4,
    sentenceWithBlank: 'الشَّمْسُ تَغْرُبُ فِيْ جِهَةِ ...',
    blankTransliteration: 'Asy-syamsu taghrubu fī jihati ...',
    translation: 'Matahari terbenam di arah ...',
    options: ['الْغَرْبِ', 'الشَّرْقِ', 'الشَّمَالِ'],
    correctOption: 'الْغَرْبِ',
    explanation:
      'Matahari terbenam (تَغْرُبُ) di sebelah barat yaitu "الْغَرْبِ".',
  },
  {
    id: 5,
    sentenceWithBlank: 'هَذِهِ ... نَظِيْفَةٌ.',
    blankTransliteration: 'Hādzihi ... nazhīfatun.',
    translation: 'Ini adalah ... yang bersih.',
    options: ['مَدْرَسَةٌ', 'بَيْتٌ', 'فَصْلٌ'],
    correctOption: 'مَدْرَسَةٌ',
    explanation:
      'Karena kata tunjuknya "هَذِهِ" (mu\'annats) dan kata sifatnya "نَظِيْفَةٌ" (mu\'annats berakhiran ة), maka bendanya harus berakhiran ta marbuthah yaitu "مَدْرَسَةٌ".',
  },
];

// Ringkasan Kunci Jawaban Lengkap
export const KUNCI_JAWABAN_LENGKAP = {
  bagianA: [
    { no: 1, ans: 'B', text: 'صَبَاحُ النُّوْرِ' },
    { no: 2, ans: 'C', text: 'Perpustakaan' },
    { no: 3, ans: 'D', text: 'جَنُوْبٌ' },
    { no: 4, ans: 'A', text: 'Siswa / Murid laki-laki' },
    { no: 5, ans: 'B', text: 'مَقْصَفٌ' },
    { no: 6, ans: 'C', text: 'عَفْوًا' },
    { no: 7, ans: 'B', text: 'Timur Laut' },
    { no: 8, ans: 'B', text: 'هَذِهِ' },
    { no: 9, ans: 'A', text: 'بَيْتٌ' },
    { no: 10, ans: 'B', text: 'Matahari terbit dari timur' },
  ],
  bagianB: [
    { no: 1, arab: 'مَسْجِدٌ', arti: 'Masjid (tempat ibadah shalat)' },
    { no: 2, arab: 'غَرْبٌ', arti: 'Barat (arah terbenamnya matahari)' },
    { no: 3, arab: 'مَيْدَانٌ', arti: 'Lapangan (tempat upacara & olahraga)' },
    { no: 4, arab: 'جَنُوْبٌ شَرْقِيٌّ', arti: 'Tenggara (antara selatan dan timur)' },
    { no: 5, arab: 'حَدِيْقَةٌ', arti: 'Taman / Kebun yang asri' },
  ],
  bagianC: [
    { no: 1, arab: 'مَا اسْمُكَ؟', arti: 'Siapakah namamu? (untuk laki-laki)' },
    { no: 2, arab: 'هَذَا فَصْلٌ نَظِيْفٌ.', arti: 'Ini adalah ruang kelas yang bersih.' },
    { no: 3, arab: 'بَيْتِيْ قَرِيْبٌ مِنَ الْمَدْرَسَةِ.', arti: 'Rumahku dekat dari sekolah.' },
    {
      no: 4,
      arab: 'الْجِهَاتُ: شَمَالٌ، جَنُوْبٌ، شَرْقٌ، غَرْبٌ.',
      arti: 'Arah mata angin: utara, selatan, timur, barat.',
    },
    { no: 5, arab: 'أَهْلًا وَسَهْلًا يَا صَدِيْقِيْ!', arti: 'Selamat datang wahai temanku!' },
  ],
  bagianD: [
    { no: 1, isi: 'حَسَنٌ', kalimatLengkap: 'أَنَا طَالِبٌ، وَاسْمِيْ حَسَنٌ' },
    { no: 2, isi: 'الْمَكْتَبَةِ', kalimatLengkap: 'الطُّلَّابُ يَقْرَؤُوْنَ الْكُتُبَ فِي الْمَكْتَبَةِ' },
    { no: 3, isi: 'مَسَاءُ النُّوْرِ', kalimatLengkap: 'مَسَاءُ الْخَيْرِ، يُجَابُ بِـ مَسَاءُ النُّوْرِ' },
    { no: 4, isi: 'الْغَرْبِ', kalimatLengkap: 'الشَّمْسُ تَغْرُبُ فِي جِهَةِ الْغَرْبِ' },
    { no: 5, isi: 'مَدْرَسَةٌ', kalimatLengkap: 'هَذِهِ مَدْرَسَةٌ نَظِيْفَةٌ' },
  ],
};
