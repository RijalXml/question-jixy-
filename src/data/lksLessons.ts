import { LKSSubjectInfo, SubjectId, LKSSubchapter } from '../types';

export const LKS_SUBJECTS_DATA: LKSSubjectInfo[] = [
  {
    id: 'taaruf',
    name: 'B. Arab: Ta\'aruf',
    codeName: 'Bahasa Arab Kelas 7 - Unit 1',
    curriculum: 'Kurikulum Merdeka / Kemenag KMA 183',
    icon: '🤝',
    tagline: 'التَّعَارُفُ وَالْمَرَافِقُ الْمَدْرَسِيَّة — Perkenalan & Lingkungan Madrasah',
    description:
      'Mempelajari tata cara sapaan santun (Tahiyyat), ungkapan perkenalan identitas diri, kata ganti dhomir munfashil, isim isyarah, serta kosakata fasilitas madrasah lengkap dengan dhorof makan.',
    progressPercent: 75,
    totalMaterials: 6,
    chapters: [
      {
        id: 'taaruf-bab-1',
        chapterNumber: 'BAB I',
        title: 'التَّعَارُفُ (Perkenalan Diri & Kata Sapaan)',
        description: 'Mengenal salam pembuka perjumpaan, cara memperkenalkan diri, profesi, serta penggunaan kata ganti dhomir dan kata tunjuk.',
        subchapters: [
          {
            id: 'taaruf-sub-1a',
            code: 'A',
            title: 'التحيات والتعارف (Ungkapan Sapaan & Salam Perkenalan)',
            page: 'Halaman 4',
            readTime: '5 menit',
            summary:
              'Dalam percakapan bahasa Arab, terdapat tata krama sapaan resmi dan santun yang memiliki pasangan jawaban khusus, seperti sapaan pagi, sore, ucapan selamat datang, terima kasih, dan perpisahan.',
            keyPoints: [
              'Selamat Pagi: صَبَاحَ الخَيْرِ (Shabaahal khoir) dijawab dengan صَبَاحَ النُّوْرِ (Shabaahan nuur).',
              'Selamat Sore/Malam: مَسَاءَ الخَيْرِ (Masaa-al khoir) dijawab dengan مَسَاءَ النُّوْرِ (Masaa-an nuur).',
              'Selamat Datang: أَهْلًا وَسَهْلًا (Ahlan wa sahlan) dijawab أَهْلًا بِكَ (untuk laki-laki) atau أَهْلًا بِكِ (untuk perempuan).',
              'Menanyakan Kabar: كَيْفَ حَالُكَ؟ (Kaifa haaluka?) dijawab بِخَيْرٍ وَالحَمْدُ لِلَّهِ (Bikhoirin walhamdulillaah).',
              'Terima Kasih & Respon: شُكْرًا (Syukran) dijawab عَفْوًا (\'Afwan). Perpisahan: مَعَ السَّلَامَةِ (Ma\'as salaamah) dijawab إِلَى اللِّقَاءِ (Ilal liqaa\').'
            ],
            vocabulary: [
              { term: 'صَبَاحُ الخَيْرِ', meaning: 'Selamat pagi' },
              { term: 'كَيْفَ حَالُكَ؟', meaning: 'Bagaimana kabarmu?' },
              { term: 'شُكْرًا كَثِيْرًا', meaning: 'Terima kasih banyak' },
              { term: 'إِلَى اللِّقَاءِ', meaning: 'Sampai jumpa lagi' }
            ],
            practicalTips: 'Selalu bedakan harakat akhir untuk laki-laki (fathah/ka) dan perempuan (kasrah/ki), contoh: كَيْفَ حَالُكَ؟ vs كَيْفَ حَالُكِ؟'
          },
          {
            id: 'taaruf-sub-1b',
            code: 'B',
            title: 'الضمائر المنفصلة (Kata Ganti Orang / Isim Dhomir)',
            page: 'Halaman 8',
            readTime: '6 menit',
            summary:
              'Dhomir Munfashil adalah kata ganti orang yang berdiri sendiri untuk subjek dalam kalimat nominal (jumlah ismiyyah).',
            keyPoints: [
              'أَنَا (Ana = Saya): Digunakan untuk mutakallim tunggal (bisa laki-laki maupun perempuan).',
              'أَنْتَ (Anta = Kamu laki-laki): Mukhatab mudzakkar tunggal.',
              'أَنْتِ (Anti = Kamu perempuan): Mukhatab mu\'annats tunggal.',
              'هُوَ (Huwa = Dia laki-laki): Gha\'ib mudzakkar tunggal.',
              'هِيَ (Hiya = Dia perempuan): Gha\'ibah mu\'annats tunggal.',
              'نَحْنُ (Nahnu = Kami / Kita): Mutakallim jamak.'
            ],
            vocabulary: [
              { term: 'طَالِبٌ / طَالِبَةٌ', meaning: 'Siswa / Siswi' },
              { term: 'مُدَرِّسٌ / مُدَرِّسَةٌ', meaning: 'Guru laki-laki / Guru perempuan' },
              { term: 'صَدِيْقِيْ / صَدِيْقَتِيْ', meaning: 'Temanku laki-laki / Temanku perempuan' }
            ],
            practicalTips: 'Jika kata benda berakhiran ta\' marbuthah (ة), gunakan dhomir perempuan seperti هِيَ atau أَنْتِ.'
          },
          {
            id: 'taaruf-sub-1c',
            code: 'C',
            title: 'أسماء الإشارة (Kata Tunjuk Dekat & Jauh)',
            page: 'Halaman 12',
            readTime: '6 menit',
            summary:
              'Isim Isyarah digunakan untuk menunjuk suatu objek atau benda, terbagi berdasarkan jarak (dekat/jauh) dan jenis kelamin kata (mudzakkar/mu\'annats).',
            keyPoints: [
              'هٰذَا (Haadza = Ini lk): Untuk menunjuk objek dekat jenis mudzakkar (contoh: هٰذَا كِتَابٌ).',
              'هٰذِهِ (Haadzihi = Ini pr): Untuk menunjuk objek dekat jenis mu\'annats (contoh: هٰذِهِ مَدْرَسَةٌ).',
              'ذٰلِكَ (Dzaalika = Itu lk): Untuk menunjuk objek jauh jenis mudzakkar (contoh: ذٰلِكَ مَسْجِدٌ).',
              'تِلْكَ (Tilka = Itu pr): Untuk menunjuk objek jauh jenis mu\'annats (contoh: تِلْكَ سَبُّوْرَةٌ).'
            ],
            vocabulary: [
              { term: 'هٰذَا / هٰذِهِ', meaning: 'Ini (laki-laki / perempuan)' },
              { term: 'ذٰلِكَ / تِلْكَ', meaning: 'Itu (laki-laki / perempuan)' },
              { term: 'مَنْ هٰذَا؟', meaning: 'Siapakah ini?' },
              { term: 'مَا هٰذِهِ؟', meaning: 'Apakah ini?' }
            ],
            practicalTips: 'Gunakan kata tanya "مَنْ" untuk manusia/orang, dan gunakan "مَا" untuk benda mati atau hewan.'
          }
        ]
      },
      {
        id: 'taaruf-bab-2',
        chapterNumber: 'BAB II',
        title: 'المَرَافِقُ الْمَدْرَسِيَّةُ (Fasilitas & Lingkungan Madrasah)',
        description: 'Mempelajari ruang-ruang dan sarana di madrasah, kata depan lokasi (dhorof makan), serta mendeskripsikan keadaan sekolah.',
        subchapters: [
          {
            id: 'taaruf-sub-2a',
            code: 'A',
            title: 'مفردات المرافق (Kosakata Fasilitas Sekolah)',
            page: 'Halaman 16',
            readTime: '6 menit',
            summary:
              'Mengenal nama-nama ruangan dan sarana utama di lingkungan sekolah/madrasah dalam bahasa Arab beserta artinya.',
            keyPoints: [
              'مَدْرَسَةٌ (Madrasah = Sekolah), فَصْلٌ (Fashl = Ruang kelas).',
              'مَكْتَبَةٌ (Maktabah = Perpustakaan tempat membaca dan meminjam buku).',
              'إِدَارَةٌ (Idaarah = Kantor kepala madrasah/guru/tata usaha).',
              'مَقْصَفٌ (Maqshaf = Kantin sekolah tempat jajan dan makan minum).',
              'مَسْجِدٌ / مُصَلَّى (Masjid / Mushalla tempat shalat berjamaah).',
              'مَيْدَانٌ / مَلْعَبٌ (Maidaan / Mal\'ab = Lapangan olahraga dan upacara).'
            ],
            vocabulary: [
              { term: 'مُخْتَبَرٌ', meaning: 'Laboratorium (IPA / Bahasa / Komputer)' },
              { term: 'حَمَّامٌ / دَوْرَةُ مِيَاهٍ', meaning: 'Kamar mandi / Toilet' },
              { term: 'سَاحَةُ المَدْرَسَةِ', meaning: 'Halaman sekolah' }
            ],
            practicalTips: 'Hafalkan pasangan ruangan: Fashl (kelas) berpasangan dengan Maktabah (perpustakaan) dan Maqshaf (kantin).'
          },
          {
            id: 'taaruf-sub-2b',
            code: 'B',
            title: 'ظروف المكان وحروف الجر (Keterangan Tempat & Posisi)',
            page: 'Halaman 20',
            readTime: '7 menit',
            summary:
              'Dhorof makan dan huruf jar digunakan untuk menunjukkan posisi atau letak fasilitas sekolah secara presisi.',
            keyPoints: [
              'فِي (Fii = Di dalam): contoh الفَصْلُ فِي الطَّابَقِ الثَّانِي (Kelas di lantai dua).',
              'عَلَى (\'Alaa = Di atas menempel): contoh الكِتَابُ عَلَى المَكْتَبِ (Buku di atas meja).',
              'أَمَامَ (Amaama = Di depan): contoh المَيْدَانُ أَمَامَ المَدْرَسَةِ (Lapangan di depan sekolah).',
              'وَرَاءَ (Waraa-a = Di belakang): contoh المَقْصَفُ وَرَاءَ الفُصُوْلِ (Kantin di belakang deretan kelas).',
              'بِجَانِبِ / جَانِبَ (Bijaanibi = Di samping/sebelah): contoh المَكْتَبَةُ بِجَانِبِ المُخْتَبَرِ.'
            ],
            vocabulary: [
              { term: 'فَوْقَ', meaning: 'Di atas (melayang tidak menempel)' },
              { term: 'تَحْتَ', meaning: 'Di bawah' },
              { term: 'بَيْنَ', meaning: 'Di antara dua tempat' }
            ],
            practicalTips: 'Kata benda yang terletak setelah huruf jar (فِي، عَلَى، إِلَى، مِنْ) selalu berharakat akhir kasrah (majrur).'
          },
          {
            id: 'taaruf-sub-2c',
            code: 'C',
            title: 'النعت والمنعوت في وصف المرافق (Mendeskripsikan Fasilitas)',
            page: 'Halaman 24',
            readTime: '6 menit',
            summary:
              'Kaidah Na\'at (kata sifat) dan Man\'ut (kata yang disifati) harus selalu sejalan dalam jenis gender (mudzakkar/mu\'annats) dan kejelasan kata.',
            keyPoints: [
              'Kesesuaian Mudzakkar: مَسْجِدٌ كَبِيْرٌ (Masjid besar) -> keduanya mudzakkar tanpa ta\' marbuthah.',
              'Kesesuaian Mu\'annats: مَدْرَسَةٌ كَبِيْرَةٌ (Sekolah besar) -> keduanya mu\'annats berakhiran ta\' marbuthah.',
              'Kesesuaian Alif Lam (Al-): إِذَا كَانَ المَنْعُوْتُ فِيهِ (الـ) فَإِنَّ النَّعْتَ فِيهِ (الـ)، contoh: المَكْتَبَةُ النَّظِيْفَةُ.',
              'Kata Sifat Umum: نَظِيْفٌ (bersih), وَاسِعٌ (luas), جَمِيْلٌ (indah), جَدِيْدٌ (baru).'
            ],
            vocabulary: [
              { term: 'وَاسِعٌ / وَاسِعَةٌ', meaning: 'Luas' },
              { term: 'نَظِيْفٌ / نَظِيْفَةٌ', meaning: 'Bersih' },
              { term: 'مُنَظَّمٌ / مُنَظَّمَةٌ', meaning: 'Rapi dan teratur' }
            ],
            practicalTips: 'Ingat rumus: Benda laki-laki + Sifat laki-laki. Benda perempuan (ada ta marbuthah) + Sifat perempuan.'
          }
        ]
      }
    ]
  },
  {
    id: 'adawat',
    name: 'B. Arab: Adawat',
    codeName: 'Bahasa Arab Kelas 7 - Unit 2',
    curriculum: 'Kurikulum Merdeka / Kemenag KMA 183',
    icon: '🎒',
    tagline: 'الأَدَوَاتُ الْمَدْرَسِيَّةُ وَالأَلْوَانُ وَالعُنْوَان — Perlengkapan, Warna & Alamat',
    description:
      'Menguasai kosakata perlengkapan sekolah (alat tulis, buku, tas), rumus warna mudzakkar-mu\'annats, cara menanyakan alamat tempat tinggal, serta pelafalan angka 1 sampai 100.',
    progressPercent: 70,
    totalMaterials: 6,
    chapters: [
      {
        id: 'adawat-bab-1',
        chapterNumber: 'BAB III',
        title: 'الأَدَوَاتُ الْمَدْرَسِيَّةُ وَالأَلْوَانُ (Peralatan Belajar & Ragam Warna)',
        description: 'Mengenal perkakas belajar harian, isi tas sekolah, serta aturan gramatika penggunaan warna dalam bahasa Arab.',
        subchapters: [
          {
            id: 'adawat-sub-1a',
            code: 'A',
            title: 'الأدوات المدرسية في الحقيبة (Perlengkapan Belajar Siswa)',
            page: 'Halaman 28',
            readTime: '6 menit',
            summary:
              'Mufrodat alat tulis dan peralatan belajar yang selalu dibawa di dalam tas siswa sehari-hari.',
            keyPoints: [
              'كِتَابٌ (Buku paket / buku cetak pelajara), دَفْتَرٌ (Buku tulis catatan).',
              'قَلَمٌ (Pena / pulpen), قَلَمُ الرَّصَاصِ (Pensil hitam untuk menggambar/menulis).',
              'مِمْحَاةٌ (Penghapus karet pensil), طَلَّاسَةٌ (Penghapus whiteboard/blackboard).',
              'مِسْطَرَةٌ (Penggaris lurus), مِبْرَاةٌ (Rautan peruncing pensil).',
              'حَقِيْبَةٌ / مِحْفَظَةٌ (Tas ransel sekolah), سَبُّوْرَةٌ (Papan tulis di kelas).'
            ],
            vocabulary: [
              { term: 'قَلَمُ حِبْرٍ', meaning: 'Spidol / tinta' },
              { term: 'مِقَصٌّ', meaning: 'Gunting kertas' },
              { term: 'مِقْلَمَةٌ', meaning: 'Tempat pensil / tepak' }
            ],
            practicalTips: 'Bedakan "مِمْحَاةٌ" (penghapus kertas kecil di kotak pensil) dengan "طَلَّاسَةٌ" (penghapus besar papan tulis).'
          },
          {
            id: 'adawat-sub-1b',
            code: 'B',
            title: 'الألوان للمذكر والمؤنث (Pola Warna Mudzakkar & Mu\'annats)',
            page: 'Halaman 32',
            readTime: '7 menit',
            summary:
              'Warna dalam bahasa Arab memiliki dua bentuk gramatika: pola أَفْعَلُ untuk mudzakkar dan pola فَعْلَاءُ untuk mu\'annats.',
            keyPoints: [
              'Merah: أَحْمَرُ (mudzakkar) -> حَمْرَاءُ (mu\'annats). Contoh: قَلَمٌ أَحْمَرُ vs حَقِيْبَةٌ حَمْرَاءُ.',
              'Putih: أَبْيَضُ (mudzakkar) -> بَيْضَاءُ (mu\'annats). Contoh: ثَوْبٌ أَبْيَضُ vs سَبُّوْرَةٌ بَيْضَاءُ.',
              'Hitam: أَسْوَدُ (mudzakkar) -> سَوْدَاءُ (mu\'annats). Contoh: شَعْرٌ أَسْوَدُ vs مِمْحَاةٌ سَوْدَاءُ.',
              'Biru: أَزْرَقُ (mudzakkar) -> زَرْقَاءُ (mu\'annats).',
              'Hijau: أَخْضَرُ (mudzakkar) -> خَضْرَاءُ (mu\'annats).',
              'Kuning: أَصْفَرُ (mudzakkar) -> صَفْرَاءُ (mu\'annats).'
            ],
            vocabulary: [
              { term: 'لَوْنٌ / أَلْوَانٌ', meaning: 'Warna / Macam-macam warna' },
              { term: 'مَا لَوْنُ هٰذَا؟', meaning: 'Apakah warna benda ini?' },
              { term: 'لَوْنُهُ جَمِيْلٌ', meaning: 'Warnanya indah' }
            ],
            practicalTips: 'Kata "لَوْن" adalah mudzakkar, jadi jika bertanya warna: "مَا لَوْنُ السَّبُّوْرَةِ؟" jawabannya: "لَوْنُهَا أَبْيَضُ".'
          },
          {
            id: 'adawat-sub-1c',
            code: 'C',
            title: 'تركيب الجملة مع الألوان والأدوات (Menyusun Kalimat Warna)',
            page: 'Halaman 36',
            readTime: '6 menit',
            summary:
              'Mempraktikkan penggabungan kata tunjuk, nama perkakas belajar, dan warna yang berkesesuaian.',
            keyPoints: [
              'Pola Mudzakkar: هٰذَا + [Isim Mudzakkar] + [Warna Mudzakkar], contoh: هٰذَا دَفْتَرٌ أَزْرَقُ.',
              'Pola Mu\'annats: هٰذِهِ + [Isim Mu\'annats] + [Warna Mu\'annats], contoh: هٰذِهِ مِسْطَرَةٌ صَفْرَاءُ.',
              'Kepemilikan Warna: لِي قَلَمٌ أَحْمَرُ (Saya mempunyai sebuah pena merah).',
              'Di dalam tas ada perlengkapan: فِي الحَقِيْبَةِ كُتُبٌ وَأَقْلَامٌ مُتَنَوِّعَةٌ.'
            ],
            vocabulary: [
              { term: 'مُتَنَوِّعٌ', meaning: 'Bermacam-macam / beraneka ragam' },
              { term: 'جَدِيْدٌ', meaning: 'Baru' },
              { term: 'قَدِيْمٌ', meaning: 'Lama / usang' }
            ],
            practicalTips: 'Warna mengikuti kata bendanya: jika bendanya mu\'annats (ada ta\' marbuthah), warnanya wajib berakhiran hamzah mamdudah (حمراء).'
          }
        ]
      },
      {
        id: 'adawat-bab-2',
        chapterNumber: 'BAB IV',
        title: 'العُنْوَانُ وَالأَرْقَامُ ١ - ١٠٠ (Alamat Tempat Tinggal & Angka)',
        description: 'Menanyakan dan menerangkan alamat domisili, nama jalan, nomor rumah, nomor telepon, serta penguasaan berhitung angka Arab.',
        subchapters: [
          {
            id: 'adawat-sub-2a',
            code: 'A',
            title: 'مفردات العنوان (Kosakata Terkait Alamat)',
            page: 'Halaman 40',
            readTime: '6 menit',
            summary:
              'Mufrodat baku yang digunakan untuk mendeskripsikan alamat tempat tinggal dan lokasi madrasah.',
            keyPoints: [
              'عُنْوَانٌ (\'Unwaan = Alamat). Pertanyaan: مَا عُنْوَانُكَ؟ (Apa alamatmu?).',
              'شَارِعٌ (Syaari\' = Jalan raya / nama jalan). Contoh: فِي شَارِعِ سُوْدِيْرْمَان.',
              'رَقْمٌ (Raqm = Nomor). Contoh: رَقْمُ ٧ (Nomor 7).',
              'بَيْتٌ / مَنْزِلٌ (Bait / Manzil = Rumah tempat tinggal).',
              'مَدِيْنَةٌ (Madiinah = Kota) vs قَرْيَةٌ (Qoryah = Desa).',
              'هَاتِفٌ / جَوَّالٌ (Haatif / Jawwaal = Telepon rumah / Handphone).'
            ],
            vocabulary: [
              { term: 'بِطَاقَةُ شَخْصِيَّة', meaning: 'Kartu tanda identitas / Kartu pelajar' },
              { term: 'قَرِيْبٌ مِنْ', meaning: 'Dekat dari...' },
              { term: 'بَعِيْدٌ عَنْ', meaning: 'Jauh dari...' }
            ],
            practicalTips: 'Rumus kalimat alamat: عُنْوَانِي فِي شَارِعِ [Nama Jalan] رَقْمُ [Angka] [Nama Kota].'
          },
          {
            id: 'adawat-sub-2b',
            code: 'B',
            title: 'الأرقام من ١ إلى ٢٠ (Angka Satuan & Belasan)',
            page: 'Halaman 44',
            readTime: '7 menit',
            summary:
              'Menghafal bentuk lambang angka Arab dan pelafalannya dari 1 sampai 20 sebagai dasar menyebutkan nomor rumah dan telepon.',
            keyPoints: [
              '١ (وَاحِدٌ = 1), ٢ (اِثْنَانِ = 2), ٣ (ثَلَاثَةٌ = 3), ٤ (أَرْبَعَةٌ = 4), ٥ (خَمْسَةٌ = 5).',
              '٦ (سِتَّةٌ = 6), ٧ (سَبْعَةٌ = 7), ٨ (ثَمَانِيَةٌ = 8), ٩ (تِسْعَةٌ = 9), ١٠ (عَشَرَةٌ = 10).',
              'Angka Belasan: ١١ (أَحَدَ عَشَرَ), ١٢ (اِثْنَا عَشَرَ), ١٣ (ثَلَاثَةَ عَشَرَ), ١٥ (خَمْسَةَ عَشَرَ).',
              'Nomor Telepon: Diucapkan per digit angka atau kelipatan puluhan.'
            ],
            vocabulary: [
              { term: 'صِفْرٌ ( ٠ )', meaning: 'Nol (0)' },
              { term: 'عِشْرُوْنَ ( ٢٠ )', meaning: 'Dua puluh (20)' },
              { term: 'مِائَةٌ ( ١٠٠ )', meaning: 'Seratus (100)' }
            ],
            practicalTips: 'Perhatikan tulisan angka Arab: angka ٥ mirip lingkaran/huruf O (artinya 5), sedangkan angka ٠ titik kecil (artinya 0).'
          },
          {
            id: 'adawat-sub-2c',
            code: 'C',
            title: 'حوار في بطاقة الهوية (Percakapan Identitas Siswa)',
            page: 'Halaman 48',
            readTime: '6 menit',
            summary:
              'Simulasi tanya jawab identitas kartu pelajar: nama, asal sekolah, alamat lengkap, dan nomor kontak yang bisa dihubungi.',
            keyPoints: [
              'Tanya Nama: مَا اسْمُكَ؟ -> اسْمِي فَارُوْق.',
              'Tanya Asal: مِنْ أَيْنَ أَنْتَ؟ -> أَنَا مِنْ سُوْرَابَايَا.',
              'Tanya Alamat: أَيْنَ بَيْتُكَ؟ -> بَيْتِي فِي شَارِعِ إِمَام بُوْنْجُوْل رَقْمُ ٥.',
              'Tanya Nomor HP: كَمْ رَقْمُ هَاتِفِكَ؟ -> رَقْمُ هَاتِفِي: ٠٨١٢٣٤٥٦٧٨.'
            ],
            vocabulary: [
              { term: 'المِهْنَةُ', meaning: 'Profesi / Pekerjaan (طالب = pelajar)' },
              { term: 'المَوْلِدُ', meaning: 'Tempat dan tanggal lahir' },
              { term: 'التَّوْقِيْعُ', meaning: 'Tanda tangan' }
            ],
            practicalTips: 'Saat menyebutkan nomor telepon dalam bahasa Arab, sebutkan digit demi digit dari kiri ke kanan: shifr, tsamaniyah, wahid, itsnan...'
          }
        ]
      }
    ]
  },
  {
    id: 'usrah',
    name: 'B. Arab: Usrah',
    codeName: 'Bahasa Arab Kelas 7 - Unit 3',
    curriculum: 'Kurikulum Merdeka / Kemenag KMA 183',
    icon: '🏡',
    tagline: 'البَيْتُ وَالْأُسْرَةُ وَالْيَوْمِيَّات — Rumah, Keluarga & Keseharian',
    description:
      'Mengenal silsilah anggota keluarga (usrah), tata ruang rumah (bait), dhomir muttashil kepemilikan, susunan khabar muqaddam-mubtada mu\'akhkhar, serta tashrif fi\'il mudhari\' aktivitas harian.',
    progressPercent: 80,
    totalMaterials: 6,
    chapters: [
      {
        id: 'usrah-bab-1',
        chapterNumber: 'BAB V',
        title: 'البَيْتُ وَالْأُسْرَةُ (Rumah & Susunan Anggota Keluarga)',
        description: 'Mempelajari sebutan kerabat keluarga, ruangan dan perabotan di rumah, serta kepemilikan benda dengan dhomir muttashil.',
        subchapters: [
          {
            id: 'usrah-sub-1a',
            code: 'A',
            title: 'أفراد الأسرة (Silsilah Anggota Keluarga)',
            page: 'Halaman 52',
            readTime: '6 menit',
            summary:
              'Sebutan kekerabatan keluarga inti dan keluarga besar dalam bahasa Arab.',
            keyPoints: [
              'أَبٌ / وَالِدٌ (Ayah / bapak), أُمٌّ / وَالِدَةٌ (Ibu / bunda).',
              'أَخٌ كَبِيْرٌ (Kakak laki-laki), أَخٌ صَغِيْرٌ (Adik laki-laki).',
              'أُخْتٌ كَبِيْرَةٌ (Kakak perempuan), أُخْتٌ صَغِيْرَةٌ (Adik perempuan).',
              'جَدٌّ (Kakek tercinta), جَدَّةٌ (Nenek penyayang).',
              'عَمٌّ (Paman dari jalur ayah), عَمَّةٌ (Bibi dari jalur ayah).',
              'خَالٌ (Paman dari jalur ibu), خَالَةٌ (Bibi dari jalur ibu).'
            ],
            vocabulary: [
              { term: 'أُسْرَةٌ سَعِيْدَةٌ', meaning: 'Keluarga yang bahagia' },
              { term: 'وَالِدَانِ', meaning: 'Kedua orang tua' },
              { term: 'ابْنٌ / بِنْتٌ', meaning: 'Anak laki-laki / Anak perempuan' }
            ],
            practicalTips: 'Hafalkan perbedaan: \'Ammun (paman saudara ayah) vs Khaalun (paman saudara ibu).'
          },
          {
            id: 'usrah-sub-1b',
            code: 'B',
            title: 'غرف البيت وأثاثه (Ruangan Rumah & Perabotannya)',
            page: 'Halaman 56',
            readTime: '7 menit',
            summary:
              'Mufrodat nama ruangan di dalam rumah dan perabotan yang lazim berada di dalamnya.',
            keyPoints: [
              'غُرْفَةُ الجُلُوْسِ (Ruang tamu / ruang duduk keluarga untuk menyambut tamu).',
              'غُرْفَةُ النَّوْمِ (Kamar tidur), di dalamnya terdapat سَرِيْرٌ (ranjang/tempat tidur) dan وِسَادَةٌ (bantal).',
              'غُرْفَةُ المُذَاكَرَةِ (Ruang belajar untuk mengulang pelajaran dan mengerjakan PR).',
              'غُرْفَةُ الأَكْلِ (Ruang makan keluarga).',
              'المَطْبَخُ (Dapur tempat ibu memasak makanan), ada فُرْنٌ (kompor/oven).',
              'الحَمَّامُ (Kamar mandi tempat bersuci dan membersihkan badan).'
            ],
            vocabulary: [
              { term: 'حَدِيْقَةُ البَيْتِ', meaning: 'Taman / kebun halaman rumah' },
              { term: 'مِرْآةٌ', meaning: 'Cermin kaca' },
              { term: 'خِزَانَةٌ', meaning: 'Lemari pakaian / perabotan' }
            ],
            practicalTips: 'Kata "غُرْفَة" berarti ruangan. Gabungkan dengan kata kerja atau kata benda untuk membentuk nama ruangan spesifik.'
          },
          {
            id: 'usrah-sub-1c',
            code: 'C',
            title: 'الضمائر المتصلة بالاسم (Kata Ganti Kepemilikan)',
            page: 'Halaman 60',
            readTime: '6 menit',
            summary:
              'Dhomir muttashil disambungkan langsung di akhir kata benda untuk menyatakan kepemilikan (milikku, milikmu, miliknya).',
            keyPoints: [
              'Milikku (ـِي): بَيْتِي (Rumahku), كِتَابِي (Bukuku), أَبِي (Ayahku).',
              'Milikmu lk (ـكَ): بَيْتُكَ (Rumahmu laki-laki).',
              'Milikmu pr (ـكِ): بَيْتُكِ (Rumahmu perempuan).',
              'Miliknya lk (ـهُ): بَيْتُهُ (Rumahnya laki-laki).',
              'Miliknya pr (ـهَا): بَيْتُهَا (Rumahnya perempuan).',
              'Milik kami (ـنَا): بَيْتُنَا (Rumah kami).'
            ],
            vocabulary: [
              { term: 'أُسْرَتِي', meaning: 'Keluargaku' },
              { term: 'غُرْفَتُكَ', meaning: 'Kamarmu' },
              { term: 'أُمُّهُ', meaning: 'Ibunya' }
            ],
            practicalTips: 'Rumus: Kata Benda + Akhiran Dhomir. Contoh: Qalam (pena) + ii = Qalamii (penaku).'
          }
        ]
      },
      {
        id: 'usrah-bab-2',
        chapterNumber: 'BAB VI',
        title: 'الأَنْشِطَةُ وَاليَوْمِيَّاتُ (Aktivitas Sehari-hari & Fi\'il Mudhari\')',
        description: 'Mendeskripsikan rutinitas harian mulai bangun tidur, ibadah, belajar di sekolah hingga tidur malam menggunakan fi\'il mudhari\'.',
        subchapters: [
          {
            id: 'usrah-sub-2a',
            code: 'A',
            title: 'الأنشطة الصباحية (Rutinitas Pagi Hari)',
            page: 'Halaman 64',
            readTime: '6 menit',
            summary:
              'Urutan aktivitas pagi hari seorang muslim dari bangun tidur hingga tiba di madrasah.',
            keyPoints: [
              'يَسْتَيْقِظُ مِنَ النَّوْمِ: Bangun dari tidur pada waktu subuh (الساعة الرابعة).',
              'يَتَوَضَّأُ وَيُصَلِّي الصُّبْحَ: Berwudhu dan mendirikan shalat Subuh berjamaah.',
              'يَقْرَأُ القُرْآنَ الكَرِيْمَ: Membaca ayat-ayat suci Al-Qur\'an.',
              'يَسْتَحِمُّ فِي الحَمَّامِ: Mandi membersihkan badan dan bersiap mengenakan seragam.',
              'يَتَنَاوَلُ الفُطُوْرَ: Menyantap sarapan pagi bersama keluarga di ruang makan.',
              'يَذْهَبُ إِلَى المَدْرَسَةِ: Berangkat ke madrasah dengan penuh semangat.'
            ],
            vocabulary: [
              { term: 'الفُطُوْرُ', meaning: 'Sarapan pagi' },
              { term: 'الغَدَاءُ', meaning: 'Makan siang' },
              { term: 'العَشَاءُ', meaning: 'Makan malam' }
            ],
            practicalTips: 'Hafalkan urutan waktu makan: Al-Futhuur (sarapan), Al-Ghadaa\' (makan siang), Al-\'Asyaa\' (makan malam).'
          },
          {
            id: 'usrah-sub-2b',
            code: 'B',
            title: 'الفعل المضارع وتصريفه (Kaidah Fi\'il Mudhari\' Sederhana)',
            page: 'Halaman 68',
            readTime: '7 menit',
            summary:
              'Fi\'il mudhari\' menunjukkan pekerjaan yang sedang atau akan dilakukan, dengan perubahan huruf awalan (huruf mudhara\'ah: أ - ن - ي - ت).',
            keyPoints: [
              'أَنَا (Saya): diawali Hamzah (أَ-), contoh: أَنَا أَذْهَبُ إِلَى المَدْرَسَةِ.',
              'نَحْنُ (Kami): diawali Nun (نَ-), contoh: نَحْنُ نَذْهَبُ إِلَى المَدْرَسَةِ.',
              'أَنْتَ (Kamu lk): diawali Ta\' (تَ-), contoh: أَنْتَ تَذْهَبُ.',
              'أَنْتِ (Kamu pr): diawali Ta\' dan diakhiri Ya-Nun (تَـ ... ـِيْنَ), contoh: أَنْتِ تَذْهَبِيْنَ.',
              'هُوَ (Dia lk): diawali Ya\' (يَ-), contoh: هُوَ يَذْهَبُ.',
              'هِيَ (Dia pr): diawali Ta\' (تَ-), contoh: هِيَ تَذْهَبُ.'
            ],
            vocabulary: [
              { term: 'يَقْرَأُ / تَقْرَأُ', meaning: 'Dia laki-laki / perempuan sedang membaca' },
              { term: 'يَكْتُبُ / تَكْتُبُ', meaning: 'Dia sedang menulis' },
              { term: 'يَرْجِعُ / تَرْجِعُ', meaning: 'Dia sedang pulang' }
            ],
            practicalTips: 'Ingat jembatan keledai huruf mudhara\'ah: "أَنَيْتُ" (Hamzah, Nun, Ya, Ta).'
          },
          {
            id: 'usrah-sub-2c',
            code: 'C',
            title: 'نص قرائي: يوميات تلميذ (Teks Bacaan: Keseharian Siswa)',
            page: 'Halaman 72',
            readTime: '7 menit',
            summary:
              'Latihan membaca dan memahami teks narasi pendek bahasa Arab tentang rutinitas murid berprestasi.',
            keyPoints: [
              'Teks: اِسْمِي إِبْرَاهِيْم. أَنَا تِلْمِيْذٌ فِي الصَّفِّ السَّابِعِ (Kelas 7).',
              'Di Sekolah: أَدْرُسُ فِي الفَصْلِ بِجِدٍّ، وَأَقْرَأُ الكُتُبَ فِي المَكْتَبَةِ وَقْتَ الرَّاحَةِ.',
              'Sore Hari: أَرْجِعُ إِلَى البَيْتِ فِي السَّاعَةِ الثَّانِيَةِ نَهَارًا، ثُمَّ أُصَلِّي الظُّهْرَ.',
              'Malam Hari: أُذَاكِرُ الدُّرُوْسَ وَأَعْمَلُ الوَاجِبَ المَنْزِلِيَّ (PR), ثُمَّ أَنَامُ فِي السَّاعَةِ التَّاسِعَةِ لَيْلًا.'
            ],
            vocabulary: [
              { term: 'الصَّفُّ السَّابِعُ', meaning: 'Kelas 7 (Tujuh)' },
              { term: 'الوَاجِبُ المَنْزِلِيُّ (PR)', meaning: 'Pekerjaan rumah / tugas sekolah' },
              { term: 'بِجِدٍّ وَاجْتِهَادٍ', meaning: 'Dengan sungguh-sungguh dan rajin' }
            ],
            practicalTips: 'Membaca teks cerita berulang kali membantu melatih intonasi waqaf dan kelancaran membaca tulisan Arab berharakat.'
          }
        ]
      }
    ]
  }
];

// Helper maps for quick lookup in components
export const LKS_SUBJECTS: Record<SubjectId, LKSSubjectInfo> = {
  taaruf: LKS_SUBJECTS_DATA[0],
  adawat: LKS_SUBJECTS_DATA[1],
  usrah: LKS_SUBJECTS_DATA[2],
  // Fallbacks for any legacy cached localStorage subject keys
  ipa: LKS_SUBJECTS_DATA[0],
  fikih: LKS_SUBJECTS_DATA[1],
  pkn: LKS_SUBJECTS_DATA[2],
};

export const LKS_CHAPTERS_DETAIL: Record<string, LKSSubchapter> = {};
LKS_SUBJECTS_DATA.forEach((subj) => {
  subj.chapters.forEach((chap) => {
    chap.subchapters.forEach((sub) => {
      LKS_CHAPTERS_DETAIL[sub.id] = sub;
    });
  });
});
