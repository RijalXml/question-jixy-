import { LKSSubjectInfo, SubjectId } from '../types';

export const LKS_SUBJECTS_DATA: LKSSubjectInfo[] = [
  {
    id: 'ipa',
    name: 'IPA',
    codeName: 'Ilmu Pengetahuan Alam',
    curriculum: 'Kurikulum Merdeka / SMP-MTs',
    icon: '🔭',
    tagline: 'Eksplorasi Kosmik Tata Surya, Materi & Energi Masa Depan',
    description:
      'Menjelajahi keajaiban tata surya, dinamika orbit planet dan gerhana, sifat partikel zat, pencegahan pemanasan global, hingga revolusi energi terbarukan.',
    progressPercent: 65,
    totalMaterials: 11,
    chapters: [
      {
        id: 'ipa-bab-1',
        chapterNumber: 'BAB I',
        title: 'Tata Surya & Fenomena Astronomi',
        description: 'Mempelajari susunan planet tata surya, rotasi dan revolusi bumi, fase bulan, serta mekanisme gerhana matahari dan bulan.',
        subchapters: [
          {
            id: 'ipa-sub-1a',
            code: 'A',
            title: 'Susunan Planet dalam Tata Surya',
            page: 'Halaman 4',
            readTime: '6 menit',
            summary:
              'Tata surya kita terdiri dari Matahari sebagai pusat orbit serta delapan planet utama yang terbagi menjadi Planet Terestrial/Dalam (Merkurius, Venus, Bumi, Mars) dan Planet Jovian/Luar (Jupiter, Saturnus, Uranus, Neptunus) yang dipisahkan oleh Sabuk Asteroid.',
            keyPoints: [
              'Planet Dalam (Terestrial): Berbatu dan padat, berukuran relatif lebih kecil, terletak dekat matahari (Merkurius, Venus, Bumi, Mars).',
              'Planet Luar (Jovian/Gas Raksasa): Tersusun dominan atas gas hidrogen dan helium berukuran raksasa, memiliki banyak cincin dan satelit (Jupiter, Saturnus, Uranus, Neptunus).',
              'Sabuk Asteroid: Kumpulan jutaan batuan antariksa yang mengorbit matahari di antara jalur Mars dan Jupiter.',
              'Karakteristik Khas: Venus dijuluki Bintang Fajar/Kejora dengan atmosfer tebal efek rumah kaca ekstrem; Jupiter adalah planet terbesar dengan bintik merah raksasa; Saturnus memiliki cincin spektakuler dari partikel es.'
            ],
            vocabulary: [
              { term: 'Jovian', meaning: 'Planet raksasa gas yang menyerupai karakter planet Jupiter.' },
              { term: 'Terestrial', meaning: 'Planet yang berstruktur batuan padat mirip komposisi mineral Bumi.' },
              { term: 'Sabuk Kuiper', meaning: 'Wilayah di luar orbit Neptunus yang dipenuhi objek es dan planet kerdil seperti Pluto.' }
            ],
            practicalTips: 'Hafalkan urutan planet dengan jembatan keledai: Me-Ve-Bu-Ma-Ju-Sa-U-Ne (Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus).'
          },
          {
            id: 'ipa-sub-1b',
            code: 'B',
            title: 'Rotasi dan Revolusi Bumi',
            page: 'Halaman 9',
            readTime: '7 menit',
            summary:
              'Bumi bergerak dalam dua pola utama: berputar pada porosnya (rotasi) selama 23 jam 56 menit, serta beredar mengelilingi Matahari (revolusi) selama 365,25 hari dengan kemiringan sumbu rotasi 23,5 derajat.',
            keyPoints: [
              'Akibat Rotasi Bumi: Terjadinya pergantian siang dan malam, gerak semu harian benda langit dari timur ke barat, perbedaan zona waktu di muka bumi, serta pembelokan arah angin siklon (Gaya Coriolis).',
              'Akibat Revolusi Bumi: Pergantian empat musim di wilayah subtropis, perbedaan lamanya waktu siang dan malam sepanjang tahun, gerak semu tahunan matahari, dan perubahan penampakan rasi bintang.',
              'Kemiringan 23,5 Derajat: Faktor penentu mengapa intensitas sinar matahari yang diterima belahan bumi utara dan selatan berfluktuasi secara periodik.'
            ],
            vocabulary: [
              { term: 'Gaya Coriolis', meaning: 'Gaya semu pembelokan arah gerak fluida/angin akibat perputaran rotasi Bumi.' },
              { term: 'Ekliptika', meaning: 'Bidang edar semu matahari jika dilihat dari pengamatan di permukaan Bumi.' }
            ],
            practicalTips: 'Jika soal menanyakan peristiwa harian (siang-malam, gerak timur-barat), jawabannya Rotasi. Jika tahunan atau musiman, jawabannya Revolusi.'
          },
          {
            id: 'ipa-sub-1c',
            code: 'C',
            title: 'Fase-Fase Bulan dan Orbitnya',
            page: 'Halaman 14',
            readTime: '6 menit',
            summary:
              'Bulan adalah satelit alami Bumi yang mengelilingi Bumi sambil berputar pada porosnya dengan kala rotasi dan revolusi yang sama (sinkron), sehingga permukaan bulan yang menghadap bumi selalu sisi yang sama.',
            keyPoints: [
              'Rotasi Sinkron: Periode rotasi bulan sama dengan revolusinya mengelilingi bumi (sekitar 27,3 hari), menyebabkan sisi jauh bulan tidak pernah terlihat langsung dari bumi.',
              'Fase Bulan: Perubahan penampakan bentuk bulan yang disinari matahari dilihat dari bumi: Fase Bulan Baru (New Moon) -> Bulan Sabit Awal -> Kuartir Pertama -> Bulan Cembung -> Bulan Purnama (Full Moon) -> Kuartir Akhir -> Sabit Akhir.',
              'Pengaruh Gravitasi: Gaya gravitasi Bulan adalah pemicu utama pasang naik dan pasang surut air laut di samudera Bumi.'
            ],
            vocabulary: [
              { term: 'Pasang Purnama', meaning: 'Pasang laut tertinggi saat posisi Matahari, Bulan, dan Bumi berada dalam satu garis lurus.' },
              { term: 'Pasang Perbani', meaning: 'Pasang laut terendah saat posisi Bulan dan Matahari membentuk sudut siku-siku 90 derajat terhadap Bumi.' }
            ],
            practicalTips: 'Bulan tidak memancarkan cahaya sendiri, melainkan hanya memantulkan pantulan cahaya dari Matahari.'
          },
          {
            id: 'ipa-sub-1d',
            code: 'D',
            title: 'Mekanisme Gerhana Matahari & Gerhana Bulan',
            page: 'Halaman 18',
            readTime: '7 menit',
            summary:
              'Gerhana terjadi ketika bayangan satu benda langit menutupi benda langit lain saat berada dalam satu garis sejajar (syzygy). Bayangan terbagi menjadi umbra (bayangan gelap inti) dan penumbra (bayangan kabur).',
            keyPoints: [
              'Gerhana Matahari: Terjadi saat siang hari pada fase Bulan Baru (Matahari - Bulan - Bumi). Bulan menghalangi cahaya matahari menuju bumi.',
              'Jenis Gerhana Matahari: Total (daerah umbra bulan), Sebagian (daerah penumbra), dan Cincin (saat bulan berada di titik terjauh/apogee sehingga piringan bulan tampak lebih kecil dari matahari).',
              'Gerhana Bulan: Terjadi pada malam hari saat fase Bulan Purnama (Matahari - Bumi - Bulan). Bumi menghalangi cahaya matahari sehingga bulan tertutup bayangan umbra bumi, membiaskan spektrum kemerahan (Blood Moon).'
            ],
            vocabulary: [
              { term: 'Umbra', meaning: 'Daerah bayangan inti yang gelap pekat tempat cahaya terhalang total.' },
              { term: 'Penumbra', meaning: 'Daerah bayangan kabur atau sebagian tempat sinar matahari terhalang sebagian.' }
            ],
            practicalTips: 'Ingat posisi kuncinya: Gerhana Matahari = Bulan di tengah. Gerhana Bulan = Bumi di tengah.'
          }
        ]
      },
      {
        id: 'ipa-bab-2',
        chapterNumber: 'BAB II',
        title: 'Zat, Karakteristik & Krisis Iklim',
        description: 'Mempelajari wujud zat, sifat partikel materi, perubahan fisika-kimia, fenomena efek rumah kaca, dan mitigasi pemanasan global.',
        subchapters: [
          {
            id: 'ipa-sub-2a',
            code: 'A',
            title: 'Wujud Zat dan Sifat Partikelnya',
            page: 'Halaman 24',
            readTime: '6 menit',
            summary:
              'Materi di alam berwujud padat, cair, dan gas. Perbedaan sifat fisik ketiganya ditentukan oleh kerapatan susunan partikel dan kekuatan gaya tarik-menarik antarmolekulnya.',
            keyPoints: [
              'Zat Padat: Bentuk dan volume tetap, susunan partikel sangat teratur dan rapat, gaya tarik antarpartikel sangat kuat, hanya bergetar di tempatnya.',
              'Zat Cair: Volume tetap namun bentuk menyesuaikan wadah, partikel agak renggang dan dapat meluncur saling melewati.',
              'Zat Gas: Bentuk dan volume berubah memenuhi seluruh ruangan, susunan partikel sangat berjauhan, gaya tarik sangat lemah, bergerak bebas dan acak dengan kecepatan tinggi.'
            ],
            vocabulary: [
              { term: 'Kohesi', meaning: 'Gaya tarik-menarik antara partikel-partikel zat yang sejenis.' },
              { term: 'Adhesi', meaning: 'Gaya tarik-menarik antara partikel-partikel zat yang tidak sejenis.' }
            ],
            practicalTips: 'Massa jenis zat cair dan padat umumnya jauh lebih tinggi daripada gas karena kerapatan susunan molekulnya.'
          },
          {
            id: 'ipa-sub-2b',
            code: 'B',
            title: 'Perubahan Fisika vs Perubahan Kimia',
            page: 'Halaman 28',
            readTime: '7 menit',
            summary:
              'Zat dapat mengalami perubahan fisika (hanya perubahan wujud/ukuran tanpa menghasilkan zat baru) atau perubahan kimia (reaksi yang menghasilkan zat baru dengan sifat kimia berbeda).',
            keyPoints: [
              'Perubahan Fisika: Mencair (es menjadi air), membeku, menguap, mengembun, menyublim (kapur barus), dan deposisi/mengkristal (jelaga cerobong, dry ice). Tidak timbul zat baru dan dapat kembali.',
              'Perubahan Kimia: Pembakaran kayu menjadi abu, perkaratan besi oleh oksigen dan kelembaban, fermentasi singkong menjadi tape, serta pembusukan buah. Terbentuk zat baru dan bersifat tetap (irreversibel).',
              'Tanda Reaksi Kimia: Terjadinya perubahan warna, perubahan suhu/panas, timbulnya endapan, atau terbentuknya gas.'
            ],
            vocabulary: [
              { term: 'Deposisi', meaning: 'Perubahan wujud zat dari fasa gas langsung menjadi zat padat tanpa melalui fasa cair.' },
              { term: 'Oksidasi', meaning: 'Reaksi pengikatan oksigen yang memicu perubahan kimia seperti perkaratan besi.' }
            ],
            practicalTips: 'Jika suatu peristiwa menghasilkan bau/endapan/karat baru yang tidak bisa dikembalikan seperti semula, itu adalah perubahan kimia.'
          },
          {
            id: 'ipa-sub-2c',
            code: 'C',
            title: 'Pemanasan Global & Gas Rumah Kaca',
            page: 'Halaman 34',
            readTime: '8 menit',
            summary:
              'Efek rumah kaca alami menjaga bumi pada suhu layak huni. Namun, aktivitas industri yang membakar bahan bakar fosil berlebih memicu efek rumah kaca berlebih yang menyebabkan pemanasan global.',
            keyPoints: [
              'Gas Rumah Kaca Utama: Karbon dioksida (CO2) dari cerobong pabrik dan knalpot, Metana (CH4) dari limbah ternak dan pembusukan sampah organik, Dinitrogen oksida (N2O), dan CFC/Freon dari pendingin.',
              'Mekanisme Pemanasan Global: Sinar matahari masuk ke bumi diserap lalu dipantulkan kembali sebagai radiasi inframerah. Gas rumah kaca yang terlalu tebal memerangkap radiasi panas ini di atmosfer sehingga suhu rata-rata global terus merangkak naik.',
              'Dampak Nyata: Mencairnya gletser es kutub, naiknya permukaan air laut, gelombang panas ekstrem, kekeringan berkepanjangan, serta pemutihan terumbu karang (coral bleaching).'
            ],
            vocabulary: [
              { term: 'Coral Bleaching', meaning: 'Kematian alga simbiotik karang akibat naiknya suhu laut yang membuat terumbu karang memutih dan mati.' },
              { term: 'Carbon Footprint', meaning: 'Jejak karbon total emisi gas rumah kaca yang dihasilkan oleh individu, produk, atau kegiatan.' }
            ],
            practicalTips: 'Pemanasan global bukan disebabkan oleh hilangnya oksigen, melainkan terperangkapnya radiasi panas inframerah oleh akumulasi gas rumah kaca.'
          },
          {
            id: 'ipa-sub-2d',
            code: 'D',
            title: 'Mitigasi & Adaptasi Perubahan Iklim',
            page: 'Halaman 39',
            readTime: '6 menit',
            summary:
              'Upaya penyelamatan bumi menuntut tindakan nyata mitigasi emisi karbon melalui reboisasi, penghematan energi listrik, dan penerapan prinsip 3R (Reduce, Reuse, Recycle).',
            keyPoints: [
              'Reboisasi Hutan & Ruang Terbuka Hijau: Tumbuhan berperan sebagai penyerap karbon (carbon sink) alami melalui proses fotosintesis yang menyerap CO2 dan melepaskan O2.',
              'Efisiensi Energi: Mengganti lampu pijar boros panas dengan lampu LED hemat energi, mencabut colokan listrik saat tidak digunakan, dan beralih ke transportasi publik ramah lingkungan.',
              'Ekonomi Sirkular: Pengurangan sampah plastik sekali pakai untuk mencegah penumpukan gas metana di tempat pembuangan akhir.'
            ],
            vocabulary: [
              { term: 'Carbon Sink', meaning: 'Penyerap dan penyimpan alami karbon dioksida dari atmosfer, seperti hutan dan terumbu karang.' },
              { term: 'Mitigasi', meaning: 'Upaya aktif mengurangi penyebab emisi gas rumah kaca untuk memperlambat perubahan iklim.' }
            ],
            practicalTips: 'Lampu LED dapat menghemat energi hingga 80% lebih efisien daripada lampu pijar konvensional karena membuang sangat sedikit kalor panas.'
          }
        ]
      },
      {
        id: 'ipa-bab-3',
        chapterNumber: 'BAB III',
        title: 'Energi, Transformasi & Energi Alternatif',
        description: 'Mempelajari hukum kekekalan energi, ragam sumber energi terbarukan, prinsip konversi listrik, dan teknologi ramah lingkungan.',
        subchapters: [
          {
            id: 'ipa-sub-3a',
            code: 'A',
            title: 'Klasifikasi Sumber Energi',
            page: 'Halaman 45',
            readTime: '7 menit',
            summary:
              'Energi dikelompokkan menjadi tak terbarukan (memerlukan jutaan tahun terbentuk dan akan habis) serta terbarukan (melimpah lestari di alam dan tidak habis dieksploitasi).',
            keyPoints: [
              'Energi Tak Terbarukan: Minyak bumi, gas alam, dan batu bara (bahan bakar fosil dari endapan jasad renik jutaan tahun lalu), serta uranium/nuklir fisi.',
              'Energi Terbarukan: Cahaya matahari (surya), embusan angin, aliran air deras (hidro), panas bumi (geotermal), pasang surut laut (tidal), dan biomassa/biogas.',
              'Dilema Energi Fosil: Pembakarannya menghasilkan sulfur dioksida (SO2) pemicu hujan asam dan emisi gas karbon tinggi yang merusak biosfer.'
            ],
            vocabulary: [
              { term: 'Geotermal', meaning: 'Energi panas alami yang tersimpan di dalam perut bumi akibat aktivitas magma dan hidrotermal.' },
              { term: 'Hujan Asam', meaning: 'Hujan dengan tingkat keasaman tinggi (pH < 5,6) akibat polusi sulfur dioksida dan nitrogen oksida.' }
            ],
            practicalTips: 'Indonesia memiliki cadangan panas bumi (geotermal) terbesar di dunia karena berada di lintasan Cincin Api Pasifik (Ring of Fire).'
          },
          {
            id: 'ipa-sub-3b',
            code: 'B',
            title: 'Hukum Kekekalan Energi & Konversi',
            page: 'Halaman 50',
            readTime: '7 menit',
            summary:
              'Hukum Kekekalan Energi menyatakan bahwa energi tidak dapat diciptakan maupun dimusnahkan oleh manusia, melainkan hanya dapat diubah dari satu bentuk ke bentuk energi lainnya.',
            keyPoints: [
              'Energi Mekanik: Gabungan antara energi potensial (energi akibat kedudukan/ketinggian: Ep = m.g.h) dan energi kinetik (energi akibat gerakan kelajuan: Ek = 0.5.m.v kuadrat).',
              'Konversi Energi PLTA: Ketinggian air waduk (potensial) -> aliran air memutar sudu turbin (kinetik) -> putaran poros memutar kumparan generator magnetik -> menghasilkan energi listrik.',
              'Efek Fotovoltaik: Panel surya mengubah energi foton cahaya matahari langsung menjadi energi listrik arus searah (DC) tanpa melalui proses mekanik turbin.'
            ],
            vocabulary: [
              { term: 'Fotovoltaik', meaning: 'Fenomena semikonduktor silikon yang menghasilkan tegangan listrik saat terpapar foton cahaya matahari.' },
              { term: 'Generator', meaning: 'Alat pengubah energi kinetik putaran menjadi energi listrik berdasarkan induksi elektromagnetik.' }
            ],
            practicalTips: 'Jika kelajuan suatu mobil diperbesar 2 kali lipat, energi kinetiknya akan berlipat menjadi 4 kali lipat karena kecepatan dikuadratkan.'
          },
          {
            id: 'ipa-sub-3c',
            code: 'C',
            title: 'Energi Alternatif Masa Depan',
            page: 'Halaman 55',
            readTime: '6 menit',
            summary:
              'Transisi energi global mengarah ke kemandirian energi hijau: biogas dari pengolahan limbah organik ternak, turbin angin lepas pantai, dan baterai ramah lingkungan.',
            keyPoints: [
              'Biogas Ramah Lingkungan: Fermentasi kotoran sapi atau limbah organik oleh bakteri anaerob menghasilkan gas metana bersih untuk memasak dan listrik skala pedesaan.',
              'Energi Pasang Surut (Tidal): Memanfaatkan perbedaan ketinggian muka air laut saat pasang dan surut akibat gaya tarik gravitasi Bulan untuk memutar generator bawah laut.',
              'Mobil Listrik & Hidrogen: Menggantikan mesin pembakaran internal fosil untuk mengurangi emisi knalpot perkotaan secara signifikan.'
            ],
            vocabulary: [
              { term: 'Anaerobik', meaning: 'Proses biologis dekomposisi organik yang berlangsung tanpa memerlukan gas oksigen bebas.' },
              { term: 'Biomassa', meaning: 'Bahan organik nabati dan hewani yang dapat dikonversi menjadi bahan bakar nabati (bioetanol, biodiesel).' }
            ],
            practicalTips: 'Biogas bukan hanya memproduksi energi bersih tetapi juga menghasilkan sisa pupuk organik cair yang sangat subur bagi pertanian.'
          }
        ]
      }
    ]
  },
  {
    id: 'fikih',
    name: 'Fikih',
    codeName: 'Fikih Ibadah Praktis',
    curriculum: 'Kurikulum Kemenag / MTs-SMP',
    icon: '🕌',
    tagline: 'Panduan Praktis Bersuci, Hakikat Salat, Zakat & Berpuasa',
    description:
      'Mendalami tata cara bersuci (wudhu, tayamum, mandi), rukun dan kekhusyukan salat, kewajiban zakat, serta keutamaan ibadah puasa sesuai sunnah.',
    progressPercent: 70,
    totalMaterials: 12,
    chapters: [
      {
        id: 'fikih-bab-1',
        chapterNumber: 'BAB I',
        title: 'Thaharah (Ketentuan Bersuci)',
        description: 'Memahami konsep kesucian lahir batin, macam-macam najis dan hadats, rukun wudhu, tayamum sebagai rukhsah, dan pembatal thaharah.',
        subchapters: [
          {
            id: 'fikih-sub-1a',
            code: 'A',
            title: 'Konsep Thaharah, Macam Najis & Hadats',
            page: 'Halaman 5',
            readTime: '6 menit',
            summary:
              'Thaharah secara bahasa berarti bersih atau suci. Menurut syariat, thaharah adalah perbuatan menyucikan diri dari hadats dan najis sebagai prasyarat wajib sebelum melaksanakan ibadah seperti salat dan thawaf.',
            keyPoints: [
              'Najis Mukhaffafah (Ringan): Air kencing bayi laki-laki yang belum memakan apapun selain ASI. Disucikan cukup dengan memercikkan air bersih secara merata.',
              'Najis Mutawassithah (Sedang): Darah, nanah, bangkai hewan (kecuali ikan dan belalang), tinja, kotoran hewan, dan minuman keras. Disucikan dengan membasuhnya sampai hilang bau, warna, dan rasanya.',
              'Najis Mughalladhah (Berat): Jilatan atau kotoran anjing dan babi. Wajib dibasuh sebanyak 7 kali dengan air bersih dan salah satu basuhannya dicampur tanah/debu suci.',
              'Hadats Kecil vs Hadats Besar: Hadats kecil dihilangkan dengan wudhu atau tayamum; hadats besar (janabat, haid, nifas) disucikan dengan mandi wajib.'
            ],
            vocabulary: [
              { term: 'Air Mutlak', meaning: 'Air murni yang suci zatnya dan menyucikan yang lain (air hujan, sumur, laut, sungai, mata air).' },
              { term: 'Rukhsah', meaning: 'Keringanan hukum syariat yang diberikan kepada mukallaf karena kondisi uzur tertentu.' }
            ],
            practicalTips: 'Bangkai ikan dan belalang dalam syariat Islam dihukumi suci dan halal dimakan tanpa perlu disucikan.'
          },
          {
            id: 'fikih-sub-1b',
            code: 'B',
            title: 'Tata Cara & Rukun Wudhu',
            page: 'Halaman 10',
            readTime: '7 menit',
            summary:
              'Wudhu memiliki 6 rukun yang wajib dikerjakan secara berurutan (tertib). Jika salah satu rukun terlewat, wudhu tidak sah dan salat tidak diterima.',
            keyPoints: [
              'Enam Rukun Wudhu: (1) Niat saat pertama kali membasuh muka, (2) Membasuh seluruh wajah, (3) Membasuh kedua tangan sampai siku, (4) Mengusap sebagian kepala, (5) Membasuh kedua kaki sampai mata kaki, dan (6) Tertib berurutan.',
              'Sunnah-Sunnah Wudhu: Membaca basmalah, mencuci kedua telapak tangan di awal, bersiwak/menggosok gigi, berkumur-kumur, istinsyaq (menghirup air ke hidung), membasuh masing-masing 3 kali, mengusap kedua telinga, dan berdoa setelah wudhu.',
              'Adab Wudhu: Menghadap kiblat, tidak boros air meskipun berwudhu di sungai mengalir, dan tidak berbicara hal sia-sia saat berwudhu.'
            ],
            vocabulary: [
              { term: 'Istinsyaq', meaning: 'Sunnah menghirup air ke dalam lubang hidung lalu menyemburkannya (istintsar) untuk membersihkan saluran pernapasan.' },
              { term: 'Tertib', meaning: 'Menjalankan rukun ibadah secara berurutan sesuai syariat tanpa membalik urutannya.' }
            ],
            practicalTips: 'Niat wudhu wajib dihadirkan di dalam hati tepat saat air pertama kali menyentuh kulit wajah.'
          },
          {
            id: 'fikih-sub-1c',
            code: 'C',
            title: 'Tayamum sebagai Keringanan (Rukhsah)',
            page: 'Halaman 15',
            readTime: '6 menit',
            summary:
              'Tayamum adalah pengganti wudhu dan mandi wajib ketika ada halangan syar\'i berupa tidak ditemukannya air setelah berikhtiar mencari, atau karena sakit yang membahayakan jiwa bila terkena air.',
            keyPoints: [
              'Sebab Diperbolehkannya Tayamum: Tidak ada air sama sekali, jumlah air sangat sedikit hanya cukup untuk minum mempertahankan nyawa, atau sakit parah berdasarkan rekomendasi dokter.',
              'Media Tayamum: Harus menggunakan debu atau tanah yang suci, kering, dan belum pernah dipakai (bukan pasir kotor berlumut).',
              'Rukun Tayamum: (1) Niat untuk diperbolehkan salat, (2) Mengusap seluruh permukaan wajah dengan debu, (3) Mengusap kedua tangan sampai siku, dan (4) Tertib.',
              'Ketentuan: Satu kali tayamum hanya berlaku untuk satu kali salat fardhu menurut jumhur ulama.'
            ],
            vocabulary: [
              { term: 'Sha\'idan Thayyiba', meaning: 'Debu tanah yang bersih dan suci di permukaan bumi yang disyariatkan untuk bertayamum.' },
              { term: 'Mubihus Shalah', meaning: 'Niat bertayamum bukan untuk menghilangkan hadats tetapi untuk memperbolehkan diri mendirikan salat.' }
            ],
            practicalTips: 'Tayamum tidak mengusap kepala atau kaki; anggota tayamum hanyalah wajah dan kedua tangan.'
          },
          {
            id: 'fikih-sub-1d',
            code: 'D',
            title: 'Hal-Hal yang Membatalkan Thaharah',
            page: 'Halaman 19',
            readTime: '6 menit',
            summary:
              'Mengetahui hal-hal yang membatalkan wudhu penting untuk menjaga keabsahan salat yang didirikan.',
            keyPoints: [
              'Keluarnya Sesuatu dari Dua Jalan: Segala yang keluar dari qubul maupun dubur (air seni, kotoran, buang angin/kentut, madzi, wadi).',
              'Hilangnya Kesadaran/Akal: Tidur nyenyak berbaring, mabuk, pingsan, gila, atau terbius total.',
              'Pengecualian Tidur: Tidur dalam posisi duduk yang kokoh pantatnya menempel mantap di atas lantai tidak membatalkan wudhu.',
              'Menyentuh Kemaluan: Menyentuh kemaluan manusia (qubul atau dubur) secara langsung dengan telapak tangan bagian dalam tanpa pembatas kain.'
            ],
            vocabulary: [
              { term: 'Madzi', meaning: 'Cairan bening lengket yang keluar saat syahwat bergejolak, hukumnya najis dan membatalkan wudhu.' },
              { term: 'Wadi', meaning: 'Cairan putih keruh kental yang keluar setelah buang air kecil atau kelelahan mengangkat beban berat, hukumnya najis.' }
            ],
            practicalTips: 'Jika ragu apakah sudah buang angin atau belum di tengah salat, jangan batalkan salat hingga mendengar suara atau mencium baunya.'
          }
        ]
      },
      {
        id: 'fikih-bab-2',
        chapterNumber: 'BAB II',
        title: 'Salat Fardhu, Sunnah & Disiplin Ibadah',
        description: 'Mendalami syarat sah dan syarat wajib salat, 13 rukun salat, thuma\'ninah, salat berjamaah, serta ketentuan musafir jamak-qashar.',
        subchapters: [
          {
            id: 'fikih-sub-2a',
            code: 'A',
            title: 'Syarat Wajib & Syarat Sah Salat',
            page: 'Halaman 25',
            readTime: '6 menit',
            summary:
              'Syarat wajib adalah kriteria seseorang diwajibkan salat, sedangkan syarat sah adalah kondisi yang wajib dipenuhi sebelum salat dikerjakan agar bernilai sah di sisi Allah.',
            keyPoints: [
              'Syarat Wajib Salat: Beragama Islam, telah mencapai usia baligh, berakal sehat, dan telah sampai dakwah Islam kepadanya.',
              'Syarat Sah Salat: Suci dari hadats kecil dan besar, suci badan/pakaian/tempat dari najis, menutup aurat secara sempurna, telah masuk waktu salat, dan menghadap kiblat (Ka\'bah).',
              'Aurat Laki-Laki & Perempuan: Laki-laki antara pusar dan lutut; perempuan seluruh tubuh kecuali wajah dan kedua telapak tangan.'
            ],
            vocabulary: [
              { term: 'Baligh', meaning: 'Tercapainya kedewasaan biologis (mimpi basah bagi laki-laki atau haid bagi wanita) yang menandai berlakunya taklif hukum.' },
              { term: 'Kiblat', meaning: 'Arah menghadap Ka\'bah di Masjidil Haram, Mekah al-Mukarramah saat mendirikan salat.' }
            ],
            practicalTips: 'Syarat sah harus ada sebelum memulai salat dan harus tetap terjaga hingga salam kedua selesai.'
          },
          {
            id: 'fikih-sub-2b',
            code: 'B',
            title: 'Rukun Salat dan Thuma\'ninah',
            page: 'Halaman 30',
            readTime: '8 menit',
            summary:
              'Rukun salat berjumlah 13 (atau 17 dalam sebagian hitungan madzhab Syafi\'i) yang terbagi menjadi rukun qalbi (hati), qauli (ucapan), dan fi\'li (gerakan tubuh).',
            keyPoints: [
              'Rukun Qalbi & Qauli: Niat di hati saat takbiratul ihram; Takbiratul ihram; Membaca Surat Al-Fatihah dengan benar tajwid dan tasydidnya; Duduk tasyahud akhir; Membaca bacaan tasyahud akhir; Membaca shalawat atas Nabi saw.; Salam pertama.',
              'Rukun Fi\'li: Berdiri bagi yang mampu; Ruku\' dengan thuma\'ninah; I\'tidal dengan thuma\'ninah; Sujud dua kali dengan thuma\'ninah; Duduk di antara dua sujud dengan thuma\'ninah; Duduk tasyahud akhir; Tertib.',
              'Hakikat Thuma\'ninah: Diam dan tenangnya seluruh sendi tubuh pada posisinya minimal selama membaca satu kali "Subhanallah". Tidak ada salat bagi yang tidak thuma\'ninah.'
            ],
            vocabulary: [
              { term: 'Thuma\'ninah', meaning: 'Ketenangan fisik sejenak saat ruku, iktidal, sujud, dan duduk agar salat tidak tergesa-gesa.' },
              { term: 'Takbiratul Ihram', meaning: 'Ucapan takbir pembuka salat yang mengharamkan perbuatan lain yang boleh dilakukan di luar salat.' }
            ],
            practicalTips: 'Rukun qauli seperti takbir, Al-Fatihah, dan salam harus dilafalkan oleh lisan minimal terdengar oleh telinga sendiri, tidak sah jika hanya dibatin.'
          },
          {
            id: 'fikih-sub-2c',
            code: 'C',
            title: 'Salat Berjamaah & Makmum Masbuq',
            page: 'Halaman 36',
            readTime: '7 menit',
            summary:
              'Salat berjamaah memiliki pahala 27 derajat dibanding salat sendirian. Makmum wajib mengikuti imam dan menjaga kerapian shaf.',
            keyPoints: [
              'Keutamaan Berjamaah: Melipatgandakan pahala menjadi 27 derajat, mempererat ukhuwah islamiyah, dan melatih kedisiplinan sosial umat.',
              'Ketentuan Makmum Masbuq: Makmum yang tertinggal bacaan Al-Fatihah atau rakaat imam. Dihitung mendapatkan rakaat sempurna jika sempat ikut ruku\' bersama imam dengan thuma\'ninah.',
              'Kerapian Shaf: Meluruskan dan merapatkan shaf bahu dengan bahu, tumit dengan tumit adalah kesempurnaan salat berjamaah.'
            ],
            vocabulary: [
              { term: 'Masbuq', meaning: 'Makmum yang datang terlambat saat imam sudah memulai salat fardhu.' },
              { term: 'Muwafiq', meaning: 'Makmum yang mendapati imam dari awal dan memiliki cukup waktu membaca Al-Fatihah secara sempurna.' }
            ],
            practicalTips: 'Jangan bergerak mendahului imam, bergeraklah sesaat setelah imam selesai berpindah posisi takbir.'
          },
          {
            id: 'fikih-sub-2d',
            code: 'D',
            title: 'Keringanan Musafir: Jamak & Qashar Salat',
            page: 'Halaman 41',
            readTime: '7 menit',
            summary:
              'Islam memberikan keringanan bagi musafir yang menempuh perjalanan jauh (minimal 80–84 km untuk tujuan baik/mubah) untuk menjamak dan mengqashar salatnya.',
            keyPoints: [
              'Jamak Taqdim: Mengumpulkan dua salat dalam satu waktu di waktu salat yang pertama (misal Dzuhur dan Ashar dikerjakan di waktu Dzuhur; Maghrib dan Isya dikerjakan di waktu Maghrib).',
              'Jamak Ta\'khir: Mengumpulkan dua salat di waktu salat yang kedua (misal Dzuhur dan Ashar dikerjakan di waktu Ashar).',
              'Qashar Salat: Meringkas salat yang berjumlah 4 rakaat (Dzuhur, Ashar, Isya) menjadi masing-masing 2 rakaat saja. Salat Subuh (2 rakaat) dan Maghrib (3 rakaat) tidak dapat diqashar.',
              'Sujud Sahwi: Dua kali sujud sebelum salam untuk menambal kelupaan jumlah rakaat atau tertinggalnya tasyahud awal.'
            ],
            vocabulary: [
              { term: 'Qashar', meaning: 'Keringanan memendekkan salat fardhu empat rakaat menjadi dua rakaat bagi musafir.' },
              { term: 'Sujud Sahwi', meaning: 'Dua sujud yang dilakukan karena kelupaan atau keraguan rakaat dalam salat.' }
            ],
            practicalTips: 'Salat yang boleh dijamak hanyalah pasangan Dzuhur-Ashar dan Maghrib-Isya. Salat Subuh tidak boleh dijamak dengan salat apapun.'
          }
        ]
      },
      {
        id: 'fikih-bab-3',
        chapterNumber: 'BAB III',
        title: 'Zakat, Sedekah & Ibadah Puasa',
        description: 'Memahami hakikat zakat mal dan fitrah, delapan asnaf mustahiq, rukun puasa Ramadhan, rukhsah fidyah, dan sanksi kafarat.',
        subchapters: [
          {
            id: 'fikih-sub-3a',
            code: 'A',
            title: 'Zakat Fitrah & Zakat Mal',
            page: 'Halaman 48',
            readTime: '7 menit',
            summary:
              'Zakat merupakan rukun Islam ketiga yang membersihkan harta dan jiwa. Terbagi menjadi zakat jiwa (fitrah) dan zakat harta kekayaan (mal).',
            keyPoints: [
              'Zat Fitrah: Kewajiban setiap jiwa muslim di bulan Ramadhan berupa makanan pokok seberat 1 sha\' (setara 2,5 kg atau 3,5 liter beras) sebelum salat Idul Fitri.',
              'Waktu Zakat Fitrah: Waktu mubah (awal Ramadhan), waktu wajib (terbenam matahari akhir Ramadhan), waktu afdhal (pagi hari raya sebelum salat Idul Fitri).',
              'Syarat Zakat Mal: Kepemilikan penuh, harta berkembang, mencapai batas minimal (Nisab setara 85 gram emas), dan telah genap dimiliki selama satu tahun hijriyah (Haul). Kadar zakat emas/perak/perdagangan adalah 2,5%.'
            ],
            vocabulary: [
              { term: 'Nisab', meaning: 'Batas minimal jumlah harta kekayaan yang terkena kewajiban zakat mal.' },
              { term: 'Haul', meaning: 'Masa kepemilikan harta kekayaan selama genap satu tahun hijriyah (354 hari).' }
            ],
            practicalTips: 'Hasil pertanian tanaman pangan tidak menunggu haul satu tahun, melainkan wajib dizakati setiap kali panen (kadar 5% bila dengan irigasi berbayar, 10% bila tadah hujan).'
          },
          {
            id: 'fikih-sub-3b',
            code: 'B',
            title: 'Delapan Asnaf Mustahiq Zakat',
            page: 'Halaman 54',
            readTime: '6 menit',
            summary:
              'Al-Qur\'an Surat At-Taubah ayat 60 secara tegas menetapkan 8 golongan yang berhak menerima penyaluran dana zakat (mustahiq).',
            keyPoints: [
              '1. Fakir: Orang yang tidak memiliki harta atau mata pencaharian dan kebutuhan hidupnya tidak tercukupi sama sekali.',
              '2. Miskin: Orang yang memiliki pekerjaan/harta tetapi penghasilannya belum mencukupi kebutuhan pokok sehari-hari.',
              '3. Amil: Petugas resmi yang bertugas mengumpulkan, mencatat, dan mendistribusikan zakat.',
              '4. Muallaf: Orang yang baru memeluk Islam atau dilembutkan hatinya untuk memperkuat keimanan.',
              '5. Riqab (memerdekakan budak), 6. Gharimin (orang berhutang untuk kebaikan), 7. Fisabilillah (pejuang jalan Allah), 8. Ibnu Sabil (musafir kehabisan bekal halal).'
            ],
            vocabulary: [
              { term: 'Mustahiq', meaning: 'Golongan orang yang berhak menerima penyaluran dana zakat sesuai ketentuan Al-Qur\'an.' },
              { term: 'Muzakki', meaning: 'Orang yang berkewajiban mengeluarkan zakat dari harta kekayaannya yang telah mencapai nisab.' }
            ],
            practicalTips: 'Zakat tidak boleh diberikan kepada orang kaya, orang yang mampu bekerja keras, serta orang tua atau anak kandung yang menjadi tanggungan nafkah langsung.'
          },
          {
            id: 'fikih-sub-3c',
            code: 'C',
            title: 'Rukun & Syarat Sah Puasa Ramadhan',
            page: 'Halaman 59',
            readTime: '7 menit',
            summary:
              'Puasa (Shiyam) adalah menahan diri dari segala pembatal puasa mulai dari terbit fajar shadiq hingga terbenam matahari dengan niat ibadah kepada Allah SWT.',
            keyPoints: [
              'Dua Rukun Puasa: (1) Niat pada malam hari sebelum fajar shadiq (tabyit an-niyyah) untuk puasa fardhu, dan (2) Menahan diri (imsak) dari makan, minum, syahwat, dan hal yang membatalkan puasa.',
              'Syarat Wajib Puasa: Islam, baligh, berakal, suci dari haid dan nifas, serta mampu menjalankannya (tidak sakit berat / jompo).',
              'Sunnah Puasa: Mengakhirkan makan sahur, menyegerakan berbuka saat tiba adzan maghrib, berbuka dengan ruthab/kurma basah atau air putih, membaca doa buka, dan memperbanyak sedekah serta tadarus.'
            ],
            vocabulary: [
              { term: 'Fajar Shadiq', meaning: 'Cahaya fajar putih melintang di ufuk timur penanda masuknya waktu Subuh dan dimulainya waktu imsak puasa.' },
              { term: 'Imsak', meaning: 'Menahan diri secara total dari segala hal yang membatalkan puasa demi mengharap ridha Allah SWT.' }
            ],
            practicalTips: 'Niat puasa Ramadhan wajib diperbarui setiap malam sebelum adzan Subuh berkumandang.'
          },
          {
            id: 'fikih-sub-3d',
            code: 'D',
            title: 'Hal Pembatal Puasa, Fidyah & Kafarat',
            page: 'Halaman 64',
            readTime: '7 menit',
            summary:
              'Menjaga kesucian puasa dari pembatalan dan memahami ketentuan ganti rugi syariat bila puasa terpaksa ditinggalkan.',
            keyPoints: [
              'Pembatal Puasa: Memasukkan benda dengan sengaja ke dalam lubang tubuh yang terbuka (mulut, hidung, telinga), muntah dengan sengaja, berhubungan suami istri di siang hari, keluar darah haid/nifas, gila mendadak, atau murtad.',
              'Bukan Pembatal: Menelan ludah suci yang tidak bercampur benda lain, mimpi basah di siang hari tanpa sengaja, obat tetes mata, mandi mendinginkan badan, atau makan/minum karena lupa.',
              'Keringanan & Fidyah: Orang tua renta/jompo dan orang sakit menahun yang tak kunjung sembuh boleh tidak puasa dan wajib membayar fidyah (memberi makan 1 orang miskin tiap hari 1 mud/beras).',
              'Kafarat Uzma: Pelanggaran berat bersetubuh di siang Ramadhan dikenai kafarat berurutan: memerdekakan budak; puasa 2 bulan berturut-turut; atau memberi makan 60 fakir miskin.'
            ],
            vocabulary: [
              { term: 'Fidyah', meaning: 'Denda tebusan makanan pokok bagi mereka yang tidak sanggup puasa karena uzur permanen.' },
              { term: 'Kafarat', meaning: 'Denda berat sebagai penebus dosa pelanggaran syariat tertentu yang disengaja.' }
            ],
            practicalTips: 'Hari diharamkan berpuasa adalah 1 Syawal (Idul Fitri), 10 Dzulhijjah (Idul Adha), dan 11, 12, 13 Dzulhijjah (Hari Tasyrik).'
          }
        ]
      }
    ]
  },
  {
    id: 'pkn',
    name: 'PKn',
    codeName: 'Pendidikan Pancasila & Kewarganegaraan',
    curriculum: 'Kurikulum Merdeka / PPKn',
    icon: '🏛️',
    tagline: 'Kedaulatan Hukum, Api Sejarah Pemuda & Kesatuan Bhinneka',
    description:
      'Memahami tata hierarki hukum Indonesia, sejarah heroisme Sumpah Pemuda 1928, serta memperkokoh kerukunan Bhinneka Tunggal Ika.',
    progressPercent: 60,
    totalMaterials: 9,
    chapters: [
      {
        id: 'pkn-bab-1',
        chapterNumber: 'BAB I',
        title: 'Hierarki Peraturan Perundang-undangan',
        description: 'Mempelajari tata urutan peraturan hukum nasional menurut UU No. 12 Tahun 2011, asas hukum lex superior, proses legislasi, dan budaya taat hukum.',
        subchapters: [
          {
            id: 'pkn-sub-1a',
            code: 'A',
            title: 'Tata Urutan Peraturan Perundang-undangan',
            page: 'Halaman 6',
            readTime: '7 menit',
            summary:
              'Indonesia adalah negara hukum (Pasal 1 ayat 3 UUD 1945). Tata urutan peraturan perundang-undangan diatur secara baku dalam Pasal 7 UU No. 12 Tahun 2011.',
            keyPoints: [
              'Hierarki Resmi Peraturan: (1) UUD Negara Republik Indonesia Tahun 1945, (2) Ketetapan Majelis Permusyawaratan Rakyat (Tap MPR), (3) Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang (Perppu), (4) Peraturan Pemerintah (PP), (5) Peraturan Presiden (Perpres), (6) Peraturan Daerah Provinsi (Perda Prov), dan (7) Peraturan Daerah Kabupaten/Kota (Perda Kab/Kota).',
              'UUD 1945 sebagai Hukum Tertinggi: Menjadi landasan filosofis dan sumber hukum konstitusional tertinggi; tidak boleh ada norma hukum yang bertentangan dengan UUD 1945.',
              'Asas Lex Superior Derogat Legi Inferiori: Norma hukum yang lebih tinggi derajatnya mengesampingkan atau membatalkan norma hukum yang lebih rendah bila terjadi pertentangan substansi.'
            ],
            vocabulary: [
              { term: 'Hierarki', meaning: 'Susunan berjenjang atau tata urutan tingkat kekuatan hukum peraturan dari puncak hingga dasar.' },
              { term: 'Lex Superior', meaning: 'Asas hukum bahwa aturan yang lebih tinggi mengesampingkan aturan yang lebih rendah derajatnya.' }
            ],
            practicalTips: 'UUD 1945 selalu menempati urutan pertama teratas, disusul Ketetapan MPR, lalu UU/Perppu.'
          },
          {
            id: 'pkn-sub-1b',
            code: 'B',
            title: 'Pembentukan Undang-Undang & Uji Materiil',
            page: 'Halaman 12',
            readTime: '7 menit',
            summary:
              'Undang-Undang dirancang dan disahkan melalui mekanisme demokratis checks and balances antara lembaga legislatif dan eksekutif serta diawasi oleh lembaga peradilan yudikatif.',
            keyPoints: [
              'Pembuat Undang-Undang: DPR memegang kekuasaan membentuk UU yang dibahas bersama Presiden untuk mendapat persetujuan bersama (Pasal 20 UUD 1945).',
              'Perppu (Kegentingan Memaksa): Dikeluarkan oleh Presiden saat negara menghadapi keadaan darurat atau mendesak tanpa sempat menunggu masa sidang panjang DPR.',
              'Judicial Review Mahkamah Konstitusi: MK berwenang menguji undang-undang terhadap UUD 1945. Jika suatu pasal UU melanggar konstitusi, MK dapat mencabut pasal tersebut.',
              'Kewenangan Mahkamah Agung: MA berwenang menguji peraturan di bawah undang-undang (seperti PP, Perpres, Perda) terhadap undang-undang.'
            ],
            vocabulary: [
              { term: 'Judicial Review', meaning: 'Hak uji materiil oleh lembaga peradilan untuk menilai keabsahan suatu regulasi hukum terhadap hukum yang lebih tinggi.' },
              { term: 'Lembaran Negara', meaning: 'Penerbitan resmi dokumen negara tempat diundangkannya undang-undang agar memiliki daya ikat publik sah.' }
            ],
            practicalTips: 'Ingat pemisahan wewenang uji materiil: Menguji UU terhadap UUD 1945 adalah tugas MK. Menguji peraturan di bawah UU terhadap UU adalah tugas MA.'
          },
          {
            id: 'pkn-sub-1c',
            code: 'C',
            title: 'Fungsi Hukum dan Budaya Taat Hukum',
            page: 'Halaman 17',
            readTime: '6 menit',
            summary:
              'Hukum dibuat untuk melindungi hak asasi manusia, menegakkan keadilan, dan menjamin ketertiban sosial dalam masyarakat majemuk.',
            keyPoints: [
              'Karakteristik Norma Hukum: Bersifat memaksa (imperatif) dengan sanksi tegas, mengikat seluruh warga negara tanpa pandang bulu, dan ditegakkan oleh aparatur berwenang.',
              'Fungsi Regulasi: Menjaga stabilitas, sarana rekayasa sosial ke arah kemajuan (social engineering), dan menyelesaikan konflik secara berkeadilan tanpa main hakim sendiri.',
              'Sikap Sadar Hukum Pelajar: Memiliki SIM dan menggunakan helm SNI saat berkendara, mematuhi tata tertib jam belajar sekolah, tidak melakukan perundungan (bullying), serta menghormati hak milik orang lain.'
            ],
            vocabulary: [
              { term: 'Imperatif', meaning: 'Sifat hukum yang mewajibkan dan memaksa untuk ditaati dengan konsekuensi sanksi hukum nyata.' },
              { term: 'Supremasi Hukum', meaning: 'Prinsip menempatkan hukum pada posisi tertinggi dalam penyelenggaraan tata kelola kenegaraan.' }
            ],
            practicalTips: 'Kepatuhan terhadap hukum bukan karena takut terhadap polisi, melainkan kesadaran moral demi keselamatan dan ketertiban bersama.'
          }
        ]
      },
      {
        id: 'pkn-bab-2',
        chapterNumber: 'BAB II',
        title: 'Sumpah Pemuda & Kebangkitan Nasional',
        description: 'Mempelajari lahirnya kesadaran kebangsaan 1908, Kongres Pemuda II 1928, ikrar persatuan bangsa, serta keteladanan para pahlawan pergerakan.',
        subchapters: [
          {
            id: 'pkn-sub-2a',
            code: 'A',
            title: 'Latar Belakang Kebangkitan Nasional 1908',
            page: 'Halaman 23',
            readTime: '7 menit',
            summary:
              'Sebelum abad ke-20, perjuangan bangsa Indonesia bersifat sporadis kedaerahan, persenjataan sederhana, dan mudah dipatahkan politik adu domba Belanda (Devide et Impera). Kebangkitan Nasional menandai babak baru perlawanan dengan organisasi modern.',
            keyPoints: [
              'Politik Etis Belanda: Kebijakan balas budi (Edukasi, Irigasi, Transmigrasi) yang melahirkan generasi terpelajar baru di sekolah kedokteran STOVIA.',
              'Kelahiran Budi Utomo: Didirikan pada 20 Mei 1908 oleh dr. Soetomo dkk. atas gagasan dr. Wahidin Soedirohoesodo; menjadi organisasi pergerakan nasional modern pertama dan diperingati sebagai Hari Kebangkitan Nasional.',
              'Transformasi Pola Perjuangan: Beralih dari pertempuran fisik bersenjata yang kedaerahan menjadi diplomasi, intelektual, penerbitan pers, dan konsolidasi persatuan nasional.'
            ],
            vocabulary: [
              { term: 'STOVIA', meaning: 'Sekolah pendidikan dokter pribumi di Batavia masa kolonial yang melahirkan banyak tokoh pelopor pergerakan.' },
              { term: 'Devide et Impera', meaning: 'Strategi politik adu domba memecah-belah kerajaan atau suku lokal yang diterapkan penjajah kolonial.' }
            ],
            practicalTips: 'Hari Kebangkitan Nasional diperingati setiap 20 Mei, mengacu pada hari lahirnya organisasi Budi Utomo tahun 1908.'
          },
          {
            id: 'pkn-sub-2b',
            code: 'B',
            title: 'Kongres Pemuda II & Ikrar 28 Oktober 1928',
            page: 'Halaman 28',
            readTime: '8 menit',
            summary:
              'Puncak persatuan pemuda tercetus dalam Kongres Pemuda II di Batavia pada tanggal 27-28 Oktober 1928 yang menyatukan organisasi kedaerahan (Jong Java, Jong Sumatranen Bond, Jong Ambon, Jong Batak, Jong Celebes) dalam satu ikrar agung.',
            keyPoints: [
              'Tokoh Kunci: Sugondo Djojopuspito (Ketua Kongres dari PPPI), R.M. Djoko Marsaid (Wakil Ketua), Mohammad Yamin (Sekretaris perumus ikrar), dan Amir Sjarifoeddin (Bendahara).',
              'Tiga Butir Ikrar Sumpah Pemuda: (1) Mengaku bertumpah darah yang satu, tanah air Indonesia; (2) Mengaku berbangsa yang satu, bangsa Indonesia; (3) Menjunjung bahasa persatuan, bahasa Indonesia.',
              'Lagu Indonesia Raya: Dikumandangkan pertama kali secara instrumental biola oleh sang komponis Wage Rudolf Soepratman di depan para utusan kongres.',
              'Pengibaran Sang Merah Putih: Bendera kebangsaan Merah Putih pertama kali dikibarkan di forum publik sebagai lambang kehormatan bangsa.'
            ],
            vocabulary: [
              { term: 'PPPI', meaning: 'Perhimpunan Pelajar-Pelajar Indonesia yang memprakarsai penyelenggaraan Kongres Pemuda II.' },
              { term: 'Ikrar', meaning: 'Janji suci dan komitmen tekad yang diucapkan bersama dengan kesungguhan hati nurani.' }
            ],
            practicalTips: 'Perhatikan bunyi ikrar ketiga: menjunjung "bahasa persatuan, bahasa Indonesia", bukan mengaku "berbahasa satu".'
          },
          {
            id: 'pkn-sub-2c',
            code: 'C',
            title: 'Nilai Kejuangan & Keteladanan Masa Kini',
            page: 'Halaman 34',
            readTime: '6 menit',
            summary:
              'Sumpah Pemuda adalah manifestasi pelepasan sekat primordial kesukuan demi kepentingan bersama bangsa yang lebih besar dan bermartabat.',
            keyPoints: [
              'Nilai Patriotisme & Cinta Tanah Air: Kesediaan mendahulukan kepentingan bangsa dan negara di atas kepentingan pribadi atau kelompok kedaerahan.',
              'Nilai Menghargai Perbedaan: Kemampuan duduk bersama saling menghormati di tengah perbedaan latar belakang etnis, budaya, dan kepercayaan.',
              'Aplikasi Generasi Muda Era Digital: Menjaga persatuan di media sosial dengan tidak menyebarkan fitnah/hoaks adu domba bernuansa SARA, bangga berbahasa Indonesia yang santun, serta berprestasi di kancah global.'
            ],
            vocabulary: [
              { term: 'Primordialisme', meaning: 'Ikatan emosional kedaerahan atau kesukuan yang dibawa sejak lahir yang jika berlebihan dapat memecah persatuan.' },
              { term: 'SARA', meaning: 'Isu sensitif mengenai Suku, Agama, Ras, dan Antargolongan yang rentan dipolitisasi untuk memecah-belah bangsa.' }
            ],
            practicalTips: 'Semangat Sumpah Pemuda bukan sekadar menghafal teks ikrar, melainkan menjaga kerukunan nyata antarsesama teman di lingkungan kita.'
          }
        ]
      },
      {
        id: 'pkn-bab-3',
        chapterNumber: 'BAB III',
        title: 'Bhinneka Tunggal Ika & Semangat Kebangsaan',
        description: 'Mendalami filosofi semboyan Bhinneka Tunggal Ika dari Kakawin Sutasoma, integrasi nasional, sikap toleransi, serta budaya gotong royong.',
        subchapters: [
          {
            id: 'pkn-sub-3a',
            code: 'A',
            title: 'Asal Usul & Makna Bhinneka Tunggal Ika',
            page: 'Halaman 40',
            readTime: '7 menit',
            summary:
              'Semboyan Bhinneka Tunggal Ika dipetik dari kitab sastra klasik Kakawin Sutasoma pupuh 139 bait 5 gubahan Empu Tantular pada masa kejayaan Kerajaan Majapahit abad ke-14.',
            keyPoints: [
              'Makna Harfiah: Berasal dari bahasa Jawa Kuno: "Bhinneka" (beraneka ragam/berbeda), "Tunggal" (satu), "Ika" (itu). Kalimat lengkapnya berbunyi: "Bhinneka Tunggal Ika, Tan Hana Dharma Mangrwa" (Berbeda-beda tetapi tetap satu jua, tiada kebenaran yang mendua).',
              'Lambang Garuda Pancasila: Semboyan dicengkeram kokoh oleh kedua cakar burung Garuda Pancasila, dirancang oleh Sultan Hamid II dan disempurnakan Presiden Soekarno.',
              'Fondasi Integrasi: Mengakui eksistensi lebih dari 1.300 suku bangsa, ratusan bahasa daerah, dan beragam agama di Indonesia sebagai anugerah kekayaan peradaban yang dipersatukan oleh cita-cita kemerdekaan.'
            ],
            vocabulary: [
              { term: 'Kakawin Sutasoma', meaning: 'Karya sastra puisi epik bahasa Jawa Kuno abad ke-14 yang mengajarkan toleransi antara pemeluk Hindu dan Buddha.' },
              { term: 'Empu Tantular', meaning: 'Pujangga besar Majapahit pada era Raja Hayam Wuruk yang merumuskan kalimat Bhinneka Tunggal Ika.' }
            ],
            practicalTips: 'Semboyan Bhinneka Tunggal Ika bukan berarti menyeragamkan perbedaan, melainkan merajut harmoni di dalam keberagaman.'
          },
          {
            id: 'pkn-sub-3b',
            code: 'B',
            title: 'Harmoni Keberagaman & Bahaya Etnosentrisme',
            page: 'Halaman 46',
            readTime: '7 menit',
            summary:
              'Mempertahankan persatuan bangsa menuntut kedewasaan sikap dalam mengikis pandangan sempit yang berpotensi meretakkan sendi-sendi kebangsaan.',
            keyPoints: [
              'Bahaya Etnosentrisme: Sikap menganggap suku dan budayanya sendiri paling unggul secara mutlak sambil merendahkan tradisi suku bangsa lain.',
              'Bahaya Chauvinisme: Rasa cinta tanah air yang fanatik dan berlebihan hingga memandang bangsa lain dengan kebencian dan rasa rendah.',
              'Prinsip Toleransi (Tasamuh): Menghargai kebebasan memeluk keyakinan beragama, memberikan ketenangan saat pihak lain beribadah, dan tidak memaksakan kehendak.',
              'Landasan Sila Ke-3: "Persatuan Indonesia" dengan lambang Pohon Beringin yang rindang menaungi seluruh ragam rakyat tanpa diskriminasi.'
            ],
            vocabulary: [
              { term: 'Etnosentrisme', meaning: 'Kecenderungan menilai budaya kelompok lain berdasarkan standar ukuran norma kebudayaannya sendiri.' },
              { term: 'Chauvinisme', meaning: 'Nasionalisme sempit yang mengagungkan bangsanya secara buta dan memusuhi bangsa lain.' }
            ],
            practicalTips: 'Toleransi tidak berarti mencampuradukkan akidah ritual keagamaan, melainkan menghormati hak beribadah orang lain dalam ruang sosial.'
          },
          {
            id: 'pkn-sub-3c',
            code: 'C',
            title: 'Gotong Royong sebagai Jiwa Bangsa',
            page: 'Halaman 52',
            readTime: '6 menit',
            summary:
              'Presiden Soekarno menegaskan dalam sidang BPUPKI 1 Juni 1945 bahwa jika kelima sila Pancasila diperas menjadi satu kata inti, intinya adalah "Gotong Royong".',
            keyPoints: [
              'Makna Hakiki Gotong Royong: Bekerja bersama-sama bahu-membahu secara sukarela tanpa memikirkan imbalan uang untuk kemaslahatan masyarakat umum.',
              'Kearifan Lokal Gotong Royong Nusantara: "Rereongan" di Sunda, "Gugur Gunung" di Jawa, "Subak" di Bali, "Sikaduduk" di Minangkabau, "Masohi" di Maluku, dan "Bari" di Ternate.',
              'Wujud Konkret Pelajar: Kerja bakti membersihkan lingkungan sekolah, membantu teman yang tertimpa musibah duka, belajar kelompok saling melengkapi, dan aktif berkolaborasi dalam karya positif.'
            ],
            vocabulary: [
              { term: 'Gugur Gunung', meaning: 'Istilah kearifan lokal gotong royong masyarakat Jawa dalam menyelesaikan pekerjaan umum secara sukarela.' },
              { term: 'Subak', meaning: 'Sistem tata kelola irigasi pertanian komunal di Bali yang berlandaskan filosofi kebersamaan Tri Hita Karana.' }
            ],
            practicalTips: 'Gotong royong adalah vaksin terbaik melawan egoisme dan individualisme yang merusak tatanan kemasyarakatan.'
          }
        ]
      }
    ]
  }
];

export interface LKSSubject {
  id: SubjectId;
  name: string;
  codeName: string;
  title: string;
  curriculum: string;
  icon: string;
  tagline: string;
  description: string;
  progressPercent: number;
  totalMaterials: number;
  chapters: Array<{
    id: string;
    chapterNumber: string;
    title: string;
    description: string;
    subchapters: Array<{
      id: string;
      code: string;
      title: string;
      page?: string;
      readTime: string;
      summary: string;
      keyPoints: string[];
      vocabulary?: Array<{ term: string; meaning: string }>;
      practicalTips?: string;
    }>;
  }>;
}

export const LKS_SUBJECTS: Record<SubjectId, LKSSubject> = {
  ipa: {
    ...LKS_SUBJECTS_DATA[0],
    title: 'Ilmu Pengetahuan Alam (IPA)',
  },
  fikih: {
    ...LKS_SUBJECTS_DATA[1],
    title: 'Fikih Ibadah',
  },
  pkn: {
    ...LKS_SUBJECTS_DATA[2],
    title: 'Pendidikan Pancasila & Kewarganegaraan (PKn)',
  },
};

export const LKS_CHAPTERS_DETAIL: Record<string, any> = {};

LKS_SUBJECTS_DATA.forEach((subj) => {
  subj.chapters.forEach((chap) => {
    chap.subchapters.forEach((sub) => {
      LKS_CHAPTERS_DETAIL[sub.id] = {
        ...sub,
        subjectId: subj.id,
        chapterTitle: chap.title,
        estimatedReadTime: sub.readTime,
        vocabOrTerms: sub.vocabulary?.map((v) => `${v.term}: ${v.meaning}`) || [],
      };
    });
  });
});
