import { Question } from '../types';

const rawQuestionsSeniRupa: Omit<Question, 'subjectId'>[] = [
  // ==========================================
  // UNSUR-UNSUR SENI RUPA (1 - 8)
  // ==========================================
  {
    id: 1,
    topic: 'Unsur Seni Rupa',
    indicator: 'Unsur Seni Rupa Paling Dasar',
    question: 'Unsur seni rupa yang paling mendasar, berukuran kecil, dan menjadi titik tolak permulaan dari segala bentuk goresan garis maupun bidang adalah...',
    options: ['Titik', 'Garis', 'Bidang', 'Tekstur'],
    correctAnswer: 0,
    explanation: 'Titik (bintik) merupakan unsur seni rupa yang paling dasar. Kumpulan titik-titik yang berderet rapat akan membentuk garis, dan garis-garis yang bertemu ujungnya akan membentuk bidang.',
    difficulty: 'easy',
  },
  {
    id: 2,
    topic: 'Unsur Seni Rupa',
    indicator: 'Karakter dan Kesan Garis',
    question: 'Dalam seni rupa, garis vertikal lurus yang berdiri tegak lurus ke atas memberikan kesan psikologis berupa...',
    options: [
      'Ketenangan, kedamaian, dan istirahat',
      'Ketegasan, kekuatan, kestabilan, dan kemegahan',
      'Keluwesan, dinamika, dan kelenturan',
      'Keraguan, kegelisahan, dan ketidakpastian'
    ],
    correctAnswer: 1,
    explanation: 'Garis vertikal memberikan kesan tegas, kokoh, stabil, agung, dan megah. Sementara garis horizontal memberi kesan tenang dan pasif, sedangkan garis lengkung memberi kesan luwes dan dinamis.',
    difficulty: 'medium',
  },
  {
    id: 3,
    topic: 'Unsur Seni Rupa',
    indicator: 'Perbedaan Bidang dan Bentuk',
    question: 'Perbedaan mendasar antara "bidang" (shape) dan "bentuk" (form) dalam karya seni rupa adalah...',
    options: [
      'Bidang bersifat dua dimensi (hanya memiliki panjang dan lebar), sedangkan bentuk memiliki volume atau kedalaman tiga dimensi',
      'Bidang hanya berwarna hitam putih, sedangkan bentuk memiliki aneka warna',
      'Bidang hanya ada pada seni patung, sedangkan bentuk hanya ada pada lukisan',
      'Bidang selalu berukuran lebih besar daripada bentuk'
    ],
    correctAnswer: 0,
    explanation: 'Bidang adalah permukaan datar dua dimensi (panjang dan lebar) yang dibatasi garis, sedangkan bentuk (bangun ruang) memiliki dimensi ketiga yaitu ketebalan, kedalaman, atau volume.',
    difficulty: 'easy',
  },
  {
    id: 4,
    topic: 'Unsur Seni Rupa',
    indicator: 'Pengertian Tekstur Nyata dan Semu',
    question: 'Jika permukaan suatu lukisan tampak kasar dan bergerigi saat dilihat mata, namun ketika diraba menggunakan tangan ternyata permukaannya rata dan halus licin, maka lukisan tersebut memiliki tekstur...',
    options: ['Tekstur nyata', 'Tekstur semu (maya)', 'Tekstur alami', 'Tekstur mekanik'],
    correctAnswer: 1,
    explanation: 'Tekstur semu (maya) adalah tekstur yang tampak berbeda antara kesan penglihatan mata dengan perabaan tangan. Sedangkan tekstur nyata terasa sama persis antara yang dilihat dan diraba.',
    difficulty: 'easy',
  },
  {
    id: 5,
    topic: 'Unsur Seni Rupa',
    indicator: 'Fungsi Gelap-Terang',
    question: 'Pemberian efek gelap-terang (pencahayaan) pada sebuah gambar benda berfungsi utama untuk...',
    options: [
      'Menghemat penggunaan cat warna',
      'Memberikan kesan kedalaman, volume tiga dimensi, dan plastisitas pada gambar',
      'Mempercepat proses penyelesaian karya',
      'Membuat gambar terlihat datar dan transparan'
    ],
    correctAnswer: 1,
    explanation: 'Gelap-terang terjadi karena intensitas cahaya yang jatuh pada benda. Fungsinya adalah memunculkan kesan ruang, kedalaman, serta volume tiga dimensi sehingga gambar tampak plastis dan nyata.',
    difficulty: 'easy',
  },
  {
    id: 6,
    topic: 'Unsur Seni Rupa',
    indicator: 'Bidang Geometris vs Non-Geometris',
    question: 'Di bawah ini yang merupakan kelompok bidang geometris beraturan adalah...',
    options: [
      'Lingkaran, segitiga, persegi, dan trapesium',
      'Bentuk daun, batu karang, dan gumpalan awan',
      'Tumpahan tinta, semburan air, dan siluet pohon',
      'Bunga mawar, sayap burung, dan kelopak melati'
    ],
    correctAnswer: 0,
    explanation: 'Bidang geometris adalah bidang yang teratur dan dapat diukur secara matematis, seperti lingkaran, segitiga, persegi, trapesium, dan segi banyak lainnya.',
    difficulty: 'easy',
  },
  {
    id: 7,
    topic: 'Unsur Seni Rupa',
    indicator: 'Unsur Ruang dalam Seni 2 Dimensi',
    question: 'Ruang yang terdapat pada karya seni rupa dua dimensi seperti lukisan pemandangan alam disebut sebagai ruang semu (ilusi) karena...',
    options: [
      'Dapat ditembus dan diisi oleh benda nyata secara fisik',
      'Hanya dirasakan melalui penglihatan mata melalui perspektif dan permainan gelap-terang',
      'Dibuat menggunakan bahan kayu dan semen',
      'Bisa disentuh bagian dalam dan luarnya'
    ],
    correctAnswer: 1,
    explanation: 'Ruang pada karya 2D bersifat semu (ilusi) karena hanya rekayasa visual melalui teknik perspektif, perbedaan ukuran objek, dan gradasi warna, bukan ruang fisik yang nyata.',
    difficulty: 'medium',
  },
  {
    id: 8,
    topic: 'Unsur Seni Rupa',
    indicator: 'Kombinasi Unsur Seni Rupa',
    question: 'Susunan unsur-unsur rupa seperti garis, raut, warna, dan tekstur yang ditata dengan pertimbangan estetika dalam sebuah bidang gambar disebut...',
    options: ['Komposisi', 'Teknik cetak', 'Patung relief', 'Kriya terapan'],
    correctAnswer: 0,
    explanation: 'Komposisi adalah tata susunan dan penempatan berbagai unsur visual seni rupa secara terpadu agar menghasilkan kesatuan karya yang indah, selaras, dan menarik.',
    difficulty: 'easy',
  },

  // ==========================================
  // TEORI WARNA (9 - 14)
  // ==========================================
  {
    id: 9,
    topic: 'Teori Warna',
    indicator: 'Warna Primer',
    question: 'Warna pokok yang murni dan tidak dapat dihasilkan dari pencampuran warna-warna lain disebut warna primer. Ketiga warna primer pigmen tersebut adalah...',
    options: [
      'Merah, kuning, dan biru',
      'Merah, hijau, dan biru',
      'Jingga, hijau, dan ungu',
      'Hitam, putih, dan abu-abu'
    ],
    correctAnswer: 0,
    explanation: 'Tiga warna primer dalam lingkaran warna pigmen seni rupa adalah merah, kuning, dan biru. Dari ketiga warna inilah seluruh warna lain diturunkan.',
    difficulty: 'easy',
  },
  {
    id: 10,
    topic: 'Teori Warna',
    indicator: 'Pencampuran Warna Sekunder',
    question: 'Jika warna kuning dicampurkan dengan warna biru dalam perbandingan takaran yang seimbang, maka akan menghasilkan warna sekunder...',
    options: ['Jingga (oranye)', 'Hijau', 'Ungu (violet)', 'Cokelat'],
    correctAnswer: 1,
    explanation: 'Warna sekunder hijau diperoleh dari percampuran dua warna primer yaitu kuning dan biru.',
    difficulty: 'easy',
  },
  {
    id: 11,
    topic: 'Teori Warna',
    indicator: 'Warna Sekunder Ungu dan Jingga',
    question: 'Pencampuran antara warna merah dan biru menghasilkan warna (X), sedangkan merah dan kuning menghasilkan warna (Y). Warna (X) dan (Y) berturut-turut adalah...',
    options: [
      'Ungu dan Jingga (oranye)',
      'Hijau dan Cokelat',
      'Jingga dan Ungu',
      'Merah muda dan Nila'
    ],
    correctAnswer: 0,
    explanation: 'Merah + Biru = Ungu (violet). Merah + Kuning = Jingga (oranye). Keduanya merupakan warna sekunder.',
    difficulty: 'easy',
  },
  {
    id: 12,
    topic: 'Teori Warna',
    indicator: 'Kelompok Warna Dingin dan Hangat',
    question: 'Kelompok warna yang mampu menciptakan kesan sejuk, tenang, damai, dan menyegarkan (kelompok warna dingin) terdiri dari...',
    options: [
      'Merah, jingga, dan kuning',
      'Biru, hijau, dan ungu',
      'Kuning, cokelat, dan merah',
      'Hitam, putih, dan emas'
    ],
    correctAnswer: 1,
    explanation: 'Warna dingin (cool colors) terdiri dari warna biru, hijau, ungu kebiruan yang memberi kesan sejuk, tenang, dan rileks. Sedangkan merah, jingga, kuning tergolong warna hangat (warm colors).',
    difficulty: 'easy',
  },
  {
    id: 13,
    topic: 'Teori Warna',
    indicator: 'Warna Komplementer',
    question: 'Pasangan warna komplementer (warna kontras yang posisinya saling berseberangan dalam lingkaran warna) di bawah ini yang benar adalah...',
    options: [
      'Merah dengan hijau',
      'Biru dengan hijau',
      'Kuning dengan merah',
      'Hitam dengan abu-abu'
    ],
    correctAnswer: 0,
    explanation: 'Pasangan warna komplementer utama pada roda warna adalah: merah berseberangan dengan hijau, kuning berseberangan dengan ungu, dan biru berseberangan dengan oranye.',
    difficulty: 'medium',
  },
  {
    id: 14,
    topic: 'Teori Warna',
    indicator: 'Warna Netral',
    question: 'Warna yang berfungsi untuk menurunkan atau menaikkan intensitas warna lain serta memberikan keseimbangan visual dan tidak memuat pigmen spektrum warna adalah...',
    options: ['Warna primer', 'Warna netral (hitam dan putih)', 'Warna sekunder', 'Warna komplementer'],
    correctAnswer: 1,
    explanation: 'Warna netral adalah hitam dan putih. Campuran keduanya menghasilkan abu-abu. Putih digunakan untuk mencerahkan (tint) dan hitam untuk menggelapkan (shade).',
    difficulty: 'easy',
  },

  // ==========================================
  // PRINSIP-PRINSIP SENI RUPA (15 - 18)
  // ==========================================
  {
    id: 15,
    topic: 'Prinsip Seni Rupa',
    indicator: 'Prinsip Kesatuan (Unity)',
    question: 'Prinsip seni rupa yang menyatukan seluruh unsur rupa sehingga saling bertaut, mendukung satu sama lain, dan tidak tampak terpecah-belah disebut prinsip...',
    options: ['Kesatuan (Unity)', 'Keseimbangan (Balance)', 'Proporsi', 'Irama (Rhythm)'],
    correctAnswer: 0,
    explanation: 'Prinsip kesatuan (unity) adalah perpaduan unsur-unsur seni rupa yang tertata harmonis saling berhubungan erat sehingga menjadi satu keutuhan karya yang tidak terpisahkan.',
    difficulty: 'easy',
  },
  {
    id: 16,
    topic: 'Prinsip Seni Rupa',
    indicator: 'Keseimbangan Simetris dan Asimetris',
    question: 'Keseimbangan pada sebuah karya gambar di mana bagian sebelah kiri dan kanan memiliki bentuk, ukuran, dan jarak yang sama persis bagaikan cermin disebut keseimbangan...',
    options: ['Asimetris', 'Simetris', 'Radial (memusat)', 'Acak'],
    correctAnswer: 1,
    explanation: 'Keseimbangan simetris menampilkan elemen yang sama persis bentuk dan ukurannya pada kedua sisi sumbu bidang gambar.',
    difficulty: 'easy',
  },
  {
    id: 17,
    topic: 'Prinsip Seni Rupa',
    indicator: 'Prinsip Pusat Perhatian (Focal Point)',
    question: 'Upaya pelukis membuat satu bagian objek terlihat paling dominan, mencolok, dan langsung menarik pandangan mata pertama kali saat melihat karya dinamakan prinsip...',
    options: [
      'Proporsi ukuran',
      'Pusat perhatian (Center of Interest / Focal Point)',
      'Gradasi warna',
      'Keseimbangan tersembunyi'
    ],
    correctAnswer: 1,
    explanation: 'Pusat perhatian (center of interest / aksentuasi) adalah prinsip penonjolan salah satu bagian objek agar menjadi fokus utama daya tarik karya seni.',
    difficulty: 'easy',
  },
  {
    id: 18,
    topic: 'Prinsip Seni Rupa',
    indicator: 'Prinsip Proporsi',
    question: 'Saat menggambar manusia, perbandingan ukuran panjang kepala dengan tinggi badan keseluruhan harus tepat agar terlihat wajar dan tidak janggal. Hal ini menerapkan prinsip...',
    options: ['Irama', 'Proporsi', 'Gelap-terang', 'Tekstur semu'],
    correctAnswer: 1,
    explanation: 'Proporsi (kesebandingan) adalah perbandingan ukuran yang ideal dan harmonis antara bagian yang satu dengan bagian yang lain atau dengan keseluruhan objek gambar.',
    difficulty: 'medium',
  },

  // ==========================================
  // KARYA 2D & 3D, SENI MURNI & TERAPAN (19 - 22)
  // ==========================================
  {
    id: 19,
    topic: 'Bentuk Karya Seni Rupa',
    indicator: 'Karakteristik Karya Seni Rupa 3 Dimensi',
    question: 'Karya seni rupa tiga dimensi (3D) memiliki keistimewaan fisik dibandingkan karya dua dimensi (2D), yaitu...',
    options: [
      'Hanya memiliki ukuran panjang dan lebar',
      'Memiliki ukuran panjang, lebar, tinggi (volume), serta dapat dinikmati keindahannya dari berbagai arah pandang',
      'Hanya dapat dibuat di atas kertas menggunakan cat air',
      'Tidak memerlukan pencahayaan untuk menikmatinya'
    ],
    correctAnswer: 1,
    explanation: 'Karya 3D memiliki dimensi panjang, lebar, dan tinggi/tebal (menempati ruang fisik nyata) sehingga bisa dilihat dan disentuh dari arah depan, samping, maupun belakang.',
    difficulty: 'easy',
  },
  {
    id: 20,
    topic: 'Bentuk Karya Seni Rupa',
    indicator: 'Contoh Karya Seni Rupa 3 Dimensi',
    question: 'Di antara pilihan karya berikut, kelompok yang seluruhnya merupakan karya seni rupa tiga dimensi adalah...',
    options: [
      'Lukisan kanvas, poster, dan foto',
      'Patung, vas keramik, dan gantungan kunci kayu ukir',
      'Kain batik, kaligrafi dinding, dan karikatur',
      'Gambar sketsa, stempel cap, dan banner'
    ],
    correctAnswer: 1,
    explanation: 'Patung, vas keramik, dan gantungan kunci ukir adalah benda bervolume tiga dimensi, sedangkan lukisan, poster, batik, dan foto adalah karya dua dimensi.',
    difficulty: 'easy',
  },
  {
    id: 21,
    topic: 'Bentuk Karya Seni Rupa',
    indicator: 'Perbedaan Seni Murni dan Seni Terapan',
    question: 'Karya seni rupa yang diciptakan semata-mata untuk dinikmati nilai keindahan estetikanya tanpa mempertimbangkan kegunaan fungsi praktis sehari-hari disebut seni rupa...',
    options: ['Seni rupa terapan (applied art)', 'Seni rupa murni (fine art)', 'Seni kriya', 'Seni desain grafis'],
    correctAnswer: 1,
    explanation: 'Seni rupa murni (pure art / fine art) fokus pada ekspresi jiwa dan nilai keindahan semata (contoh: lukisan dan patung monumen). Sedangkan seni terapan mengutamakan fungsi pakai sehari-hari.',
    difficulty: 'easy',
  },
  {
    id: 22,
    topic: 'Bentuk Karya Seni Rupa',
    indicator: 'Contoh Seni Rupa Terapan',
    question: 'Contoh karya seni rupa terapan (applied art) yang memiliki fungsi guna praktis dalam kehidupan sehari-hari sekaligus bernilai seni tinggi adalah...',
    options: [
      'Lukisan abstrak yang dipajang di galeri seni',
      'Cangkir keramik motif hias yang digunakan untuk minum teh',
      'Patung pahlawan di alun-alun kota',
      'Karya instalasi seni kontemporer'
    ],
    correctAnswer: 1,
    explanation: 'Cangkir keramik digunakan secara nyata untuk minum (fungsi praktis) sekaligus memiliki motif seni yang memperindah tampilannya, menjadikannya contoh seni rupa terapan.',
    difficulty: 'easy',
  },

  // ==========================================
  // MENGGAMBAR FLORA, FAUNA & ALAM BENDA (23 - 26)
  // ==========================================
  {
    id: 23,
    topic: 'Menggambar Objek',
    indicator: 'Objek Alam Benda Buatan dan Alami',
    question: 'Dalam kegiatan menggambar alam benda (still life), objek yang termasuk ke dalam kategori alam benda buatan manusia adalah...',
    options: [
      'Gelas kaca, botol kecap, teko keramik, dan kotak pensil',
      'Batu kali, gundukan tanah, dan batang pohon tumbang',
      'Buah apel, buah mangga, dan bunga mawar',
      'Ikan arwana dan burung kakatua'
    ],
    correctAnswer: 0,
    explanation: 'Alam benda buatan manusia adalah perabot atau peralatan hasil rekayasa manusia seperti teko, gelas, botol, meja, dan kursi. Sedangkan batu, air, buah tergolong benda alami.',
    difficulty: 'easy',
  },
  {
    id: 24,
    topic: 'Menggambar Objek',
    indicator: 'Ragam Hias Nusantara',
    question: 'Motif ornamen tradisional yang mengambil inspirasi dasar dari bentuk dedaunan, sulur tanaman, dan kuntum bunga dinamakan ragam hias...',
    options: ['Geometris', 'Fauna', 'Flora (vegetal)', 'Figuratif'],
    correctAnswer: 2,
    explanation: 'Ragam hias flora (vegetal) bersumber dari bentuk tumbuhan (daun, bunga, buah, sulur pohon). Sedangkan fauna bersumber dari hewan, dan geometris bersumber dari garis matematika.',
    difficulty: 'easy',
  },
  {
    id: 25,
    topic: 'Menggambar Objek',
    indicator: 'Ragam Hias Figuratif',
    question: 'Ragam hias yang motif dasarnya berupa penggayaan atau stilasi bentuk tubuh manusia dengan busana adat khas daerah disebut ragam hias...',
    options: ['Poligonal', 'Figuratif', 'Fauna', 'Meander'],
    correctAnswer: 1,
    explanation: 'Ragam hias figuratif mengambil objek manusia yang digambar dengan penggayaan tertentu, sering ditemukan pada topeng tradisional, ukiran suku Asmat, atau batik wayang.',
    difficulty: 'medium',
  },
  {
    id: 26,
    topic: 'Menggambar Objek',
    indicator: 'Tahapan Awal Menggambar',
    question: 'Langkah pertama yang paling tepat dilakukan seorang siswa sebelum mulai mengarsir atau mewarnai gambar benda adalah...',
    options: [
      'Langsung mengecat tebal objek gambar',
      'Mengamati objek secara saksama dan membuat sketsa garis tipis bentuk dasar objek',
      'Memberikan bingkai pigura pada kertas kosong',
      'Menempelkan serbuk glitter pada seluruh permukaan kertas'
    ],
    correctAnswer: 1,
    explanation: 'Tahap awal menggambar adalah pengamatan objek (proporsi dan komposisi), dilanjutkan dengan pembuatan sketsa garis bantu tipis sebelum masuk ke tahap penggelapan dan pewarnaan akhir.',
    difficulty: 'easy',
  },

  // ==========================================
  // TEKNIK BERKARYA & ALAT BAHAN (27 - 30)
  // ==========================================
  {
    id: 27,
    topic: 'Teknik Seni Rupa',
    indicator: 'Teknik Pointilis',
    question: 'Teknik menggambar atau melukis yang memanfaatkan kumpulan ribuan titik-titik kecil yang ditata rapat dan renggang untuk membentuk wujud objek dan gelap-terang dinamakan teknik...',
    options: ['Arsir', 'Dussel', 'Pointilis', 'Aquarel'],
    correctAnswer: 2,
    explanation: 'Teknik pointilis (stippling) adalah teknik menggambar dengan menorehkan titik-titik berulang. Kerapatan titik menciptakan bagian gelap, sedangkan kerenggangan titik menciptakan bagian terang.',
    difficulty: 'easy',
  },
  {
    id: 28,
    topic: 'Teknik Seni Rupa',
    indicator: 'Teknik Arsir dan Cross-Hatching',
    question: 'Teknik menggambar menggunakan tarikan garis-garis sejajar atau menyilang saling bertumpuk untuk mewujudkan gradasi bayangan dan kesan gelap-terang disebut teknik...',
    options: ['Arsir (hatching / cross-hatching)', 'Siluet', 'Kolase', 'Plakat'],
    correctAnswer: 0,
    explanation: 'Teknik arsir membuat bayangan objek dengan goresan garis lurus, lengkung, atau silang (cross-hatching) yang rapat untuk bagian gelap dan jarang untuk bagian terang.',
    difficulty: 'easy',
  },
  {
    id: 29,
    topic: 'Teknik Seni Rupa',
    indicator: 'Teknik Kolase',
    question: 'Teknik membuat karya seni rupa dua dimensi dengan cara menempelkan berbagai serpihan bahan seperti potongan kertas warna, kain perca, daun kering, atau biji-bijian pada pola gambar disebut...',
    options: ['Mosaik', 'Kolase', 'Anyaman', 'Cetak saring'],
    correctAnswer: 1,
    explanation: 'Kolase adalah teknik berkarya seni rupa 2D dengan menempelkan berbagai macam bahan berpadu (kertas, kain, serutan kayu, daun) pada bidang permukaan gambar.',
    difficulty: 'medium',
  },
  {
    id: 30,
    topic: 'Teknik Seni Rupa',
    indicator: 'Kode Pensil Gambar',
    question: 'Pada alat pensil gambar grafit, arti kode huruf "H" dan "B" yang tercantum pada ujung pensil berturut-turut adalah...',
    options: [
      'H (Hard/keras goresan tipis) dan B (Black/lunak goresan hitam pekat)',
      'H (Hitam tebal) dan B (Biru muda)',
      'H (Halus mudah dihapus) dan B (Besar diameter batangnya)',
      'H (Hangat warnanya) dan B (Basah tintanya)'
    ],
    correctAnswer: 0,
    explanation: 'Kode "H" berarti Hard (tingkat kekerasan inti timbal tinggi, goresannya abu-abu tipis cocok untuk sketsa teknik), sedangkan "B" berarti Black (lunak dan bergores pekat hitam, cocok untuk arsir dan sketsa artistik).',
    difficulty: 'medium',
  },
];

export const questionsSeniRupa: Question[] = rawQuestionsSeniRupa.map((q) => ({
  ...q,
  subjectId: 'seni_rupa' as const,
  isActive: q.isActive !== false,
}));
