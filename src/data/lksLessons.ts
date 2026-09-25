import { LKSSubjectInfo, SubjectId, LKSSubchapter } from '../types';

export const LKS_SUBJECTS_DATA: LKSSubjectInfo[] = [
  {
    id: 'ips',
    name: 'IPS (Ilmu Pengetahuan Sosial)',
    codeName: 'IPS Terpadu Kelas 7 SMP/MTs',
    curriculum: 'Kurikulum Merdeka / Kemendikbudristek',
    icon: '🌏',
    tagline: 'Ruang Geografi, Interaksi Sosial, Dinamika Ekonomi & Jejak Sejarah Nusantara',
    description:
      'Mempelajari letak astronomis dan geografis Indonesia, potensi kemaritiman & SDA, interaksi sosial dan pranata kemasyarakatan, pemenuhan kebutuhan ekonomi, pasar, hingga corak kehidupan praaksara dan kerajaan nusantara.',
    progressPercent: 80,
    totalMaterials: 8,
    chapters: [
      {
        id: 'ips-bab-1',
        chapterNumber: 'BAB I',
        title: 'Manusia, Tempat, dan Lingkungan Indonesia',
        description: 'Memahami ruang muka bumi kepulauan Indonesia, potensi sumber daya alam maritim dan hutan, serta dinamika penduduk.',
        subchapters: [
          {
            id: 'ips-sub-1a',
            code: 'A',
            title: 'Letak Astronomis, Geografis, dan Wilayah Indonesia',
            page: 'Halaman 4',
            readTime: '5 menit',
            summary:
              'Indonesia terletak secara astronomis pada 6°LU – 11°LS dan 95°BT – 141°BT, serta berada di posisi silang strategis antara dua benua (Asia & Australia) dan dua samudra (Hindia & Pasifik).',
            keyPoints: [
              'Letak Lintang: Mengakibatkan iklim tropis dengan suhu stabil rata-rata 27°C, curah hujan tinggi, dan sinar matahari sepanjang tahun.',
              'Letak Bujur: Membagi Indonesia menjadi 3 zona waktu yaitu WIB (GMT+7), WITA (GMT+8), dan WIT (GMT+9).',
              'Letak Geografis: Menjadikan Indonesia sebagai poros maritim dunia dalam rute perdagangan internasional (Selat Malaka dan Selat Sunda).',
              'Letak Geologis: Berada di titik temu Lempeng Indo-Australia, Eurasia, dan Pasifik yang membentuk jalur pegunungan aktif (Ring of Fire).'
            ],
            vocabulary: [
              { term: 'Letak Astronomis', meaning: 'Posisi suatu tempat berdasarkan garis lintang dan garis bujur di bola bumi.' },
              { term: 'Poros Maritim', meaning: 'Kawasan strategis jalur pelayaran dan perhubungan dagang laut dunia.' },
              { term: 'Ring of Fire', meaning: 'Jalur cincin api sabuk gunung berapi aktif di sepanjang batas lempeng bumi.' }
            ],
            practicalTips: 'Ingat selisih zona waktu: Dari WIB ke WITA bertambah 1 jam, dan ke WIT bertambah 2 jam.'
          },
          {
            id: 'ips-sub-1b',
            code: 'B',
            title: 'Potensi Kemaritiman dan Sumber Daya Hutan',
            page: 'Halaman 10',
            readTime: '6 menit',
            summary:
              'Kekayaan alam Indonesia meliputi wilayah laut seluas dua pertiga teritori yang kaya ikan dan terumbu karang, serta hutan hujan tropis yang menyimpan biodiversitas terkaya di dunia.',
            keyPoints: [
              'Hutan Hujan Tropis: Memiliki keanekaragaman flora dan fauna tinggi, penghasil kayu meranti, rotan, dan paru-paru dunia.',
              'Hutan Mangrove: Berfungsi ekologis mencegah abrasi pantai dan menjadi habitat pemijahan ikan dan kepiting.',
              'Terumbu Karang: Indonesia berada di pusat Coral Triangle dunia dengan keanekaragaman karang terluas.',
              'Konservasi: Perlunya penangkapan ikan ramah lingkungan dan reboisasi untuk mencegah bencana banjir dan tanah longsor.'
            ],
            vocabulary: [
              { term: 'Abrasi', meaning: 'Pengikisan pantai oleh hantaman gelombang air laut.' },
              { term: 'Coral Triangle', meaning: 'Kawasan segitiga terumbu karang dunia dengan biodiversitas laut terkaya.' },
              { term: 'Reboisasi', meaning: 'Penanaman kembali hutan yang gundul atau rusak.' }
            ],
            practicalTips: 'Bedakan fungsi ekologis (pelindung pantai & habitat) dengan fungsi ekonomis (pariwisata & hasil kayu) pada hutan bakau.'
          },
          {
            id: 'ips-sub-1c',
            code: 'C',
            title: 'Dinamika Kependudukan dan Interaksi Antarruang',
            page: 'Halaman 16',
            readTime: '5 menit',
            summary:
              'Perubahan jumlah dan komposisi penduduk dipengaruhi oleh kelahiran (natalitas), kematian (mortalitas), dan perpindahan (migrasi). Interaksi antarruang dipicu oleh perbedaan potensi komoditas.',
            keyPoints: [
              'Karakteristik Penduduk: Komposisi usia, jenis kelamin, tingkat pendidikan, dan angka beban ketergantungan (dependency ratio).',
              'Regional Complementary: Saling melengkapi antardaerah penghasil barang yang berbeda (contoh sayuran dataran tinggi dan ikan pantai).',
              'Intervening Opportunity: Munculnya alternatif pilihan tempat lain yang lebih dekat atau lebih menguntungkan.',
              'Transferability: Kemudahan pengangkutan barang didukung infrastruktur jalan dan armada transportasi.'
            ],
            vocabulary: [
              { term: 'Natalitas', meaning: 'Tingkat angka kelahiran dalam suatu populasi.' },
              { term: 'Mortalitas', meaning: 'Tingkat angka kematian penduduk.' },
              { term: 'Dependency Ratio', meaning: 'Perbandingan antara penduduk usia non-produktif terhadap usia produktif.' }
            ],
            practicalTips: 'Tiga syarat interaksi antarruang menurut Edward Ullman: saling melengkapi, kesempatan antara, dan kemudahan transfer.'
          }
        ]
      },
      {
        id: 'ips-bab-2',
        chapterNumber: 'BAB II',
        title: 'Interaksi Sosial dan Lembaga Sosial',
        description: 'Menganalisis hubungan timbal balik antarindividu dan kelompok, bentuk asosiatif/disosiatif, serta pranata sosial pengatur ketertiban.',
        subchapters: [
          {
            id: 'ips-sub-2a',
            code: 'A',
            title: 'Hakikat dan Bentuk Interaksi Sosial',
            page: 'Halaman 24',
            readTime: '6 menit',
            summary:
              'Interaksi sosial adalah hubungan timbal balik yang dinamis antarindividu, individu dengan kelompok, atau antarkelompok dengan syarat kontak sosial dan komunikasi.',
            keyPoints: [
              'Syarat Interaksi: Adanya kontak sosial (langsung/tidak langsung) dan komunikasi (penyampaian & penafsiran pesan).',
              'Faktor Pendorong: Imitasi (meniru), sugesti (terpengaruh pandangan), identifikasi (keinginan menjadi sama persis), simpati & empati.',
              'Bentuk Asosiatif (Menyatukan): Kerja sama (kooperasi), akomodasi (perdamaian), asimilasi (peleburan budaya), akulturasi.',
              'Bentuk Disosiatif (Perpecahan): Persaingan (kompetisi), kontravensi (sikap tidak suka tersembunyi), pertikaian / konflik terbuka.'
            ],
            vocabulary: [
              { term: 'Akomodasi', meaning: 'Upaya penyelesaian pertentangan atau konflik menuju kestabilan sosial.' },
              { term: 'Kontravensi', meaning: 'Bentuk proses sosial yang berada antara persaingan dan pertikaian terbuka.' },
              { term: 'Empati', meaning: 'Kemampuan merasakan perasaan orang lain secara mendalam disertai tindakan nyata.' }
            ],
            practicalTips: 'Mediasi menggunakan pihak ketiga sebagai penasihat, sedangkan Arbitrasi pihak ketiganya berhak memberi keputusan yang mengikat.'
          },
          {
            id: 'ips-sub-2b',
            code: 'B',
            title: 'Peran dan Fungsi Lembaga Sosial',
            page: 'Halaman 30',
            readTime: '5 menit',
            summary:
              'Lembaga sosial adalah sistem norma dan tata kelakuan yang terorganisasi untuk memenuhi kebutuhan mendasar hidup bermasyarakat.',
            keyPoints: [
              'Lembaga Keluarga: Pondasi pertama sosialisasi anak, fungsi afeksi (kasih sayang), proteksi, ekonomi, dan reproduksi.',
              'Lembaga Agama: Pedoman moral, tuntunan hidup benar, dan pengendali perilaku manusia terhadap Tuhan dan sesama.',
              'Lembaga Pendidikan: Mengembangkan potensi diri, menanamkan keterampilan kerja, dan sarana mobilitas sosial vertikal.',
              'Lembaga Ekonomi & Politik: Mengatur tata niaga produksi barang/jasa dan mengatur ketertiban kekuasaan hukum negara.'
            ],
            vocabulary: [
              { term: 'Sosialisasi', meaning: 'Proses belajar nilai dan norma masyarakat bagi pembentukan kepribadian.' },
              { term: 'Fungsi Afeksi', meaning: 'Pemberian rasa cinta, kasih sayang, dan kehangatan batin dalam keluarga.' },
              { term: 'Social Elevator', meaning: 'Saluran mobilitas sosial vertikal untuk menaikkan kedudukan status seseorang.' }
            ],
            practicalTips: 'Keluarga adalah lembaga sosial terkecil namun memiliki pengaruh terkuat dalam pembentukan karakter anak.'
          }
        ]
      },
      {
        id: 'ips-bab-3',
        chapterNumber: 'BAB III',
        title: 'Aktivitas Ekonomi dan Kebutuhan Manusia',
        description: 'Membahas prinsip kelangkaan, motif ekonomi, permintaan, penawaran, serta dinamika pembentukan harga di pasar.',
        subchapters: [
          {
            id: 'ips-sub-3a',
            code: 'A',
            title: 'Kelangkaan dan Pilihan Kebutuhan Hidup',
            page: 'Halaman 38',
            readTime: '6 menit',
            summary:
              'Manusia dihadapkan pada kelangkaan (scarcity) di mana kebutuhan tidak terbatas sedangkan alat pemuas barang dan jasa jumlahnya terbatas, sehingga memerlukan skala prioritas.',
            keyPoints: [
              'Tingkatan Kebutuhan: Kebutuhan primer (pokok/vital), sekunder (pelengkap), dan tersier (kemewahan).',
              'Jenis Barang: Barang substitusi (saling menggantikan seperti beras dan jagung) dan barang komplementer (saling melengkapi seperti motor dan bensin).',
              'Prinsip Ekonomi: Dengan pengorbanan tertentu berupaya meraih hasil sebesar-besarnya, atau hasil tertentu dengan pengorbanan sekecil mungkin.',
              'Motif Ekonomi: Motif intrinsik (kesadaran diri sendiri) dan motif ekstrinsik (dorongan pengaruh dari pihak luar).'
            ],
            vocabulary: [
              { term: 'Kelangkaan', meaning: 'Kesenjangan antara kebutuhan manusia tak terbatas dengan ketersediaan sumber daya.' },
              { term: 'Skala Prioritas', meaning: 'Urutan daftar kebutuhan dari yang paling mendesak hingga yang dapat ditunda.' },
              { term: 'Barang Substitusi', meaning: 'Barang yang fungsinya dapat menggantikan barang lainnya.' }
            ],
            practicalTips: 'Selalu dahulukan kebutuhan primer (sandang, pangan, papan, pendidikan dasar) sebelum kebutuhan sekunder dan tersier.'
          },
          {
            id: 'ips-sub-3b',
            code: 'B',
            title: 'Permintaan, Penawaran, dan Harga Keseimbangan Pasar',
            page: 'Halaman 44',
            readTime: '6 menit',
            summary:
              'Mekanisme pasar bekerja melalui tarik-menarik antara daya beli pembeli (permintaan) dan kesediaan penjual menawarkan barang pada berbagai tingkat harga.',
            keyPoints: [
              'Hukum Permintaan: Jika harga barang naik, maka jumlah barang yang diminta akan turun (ceteris paribus). Kurva miring ke bawah dari kiri atas ke kanan bawah.',
              'Hukum Penawaran: Jika harga barang naik, maka jumlah barang yang ditawarkan produsen akan bertambah. Kurva miring ke atas dari kiri bawah ke kanan atas.',
              'Harga Keseimbangan (Ekuilibrium): Titik temu di mana jumlah yang diminta sama persis dengan jumlah yang ditawarkan penjual.',
              'Peran Pasar: Sebagai sarana distribusi, promosi, dan pembentuk harga efisien bagi produsen dan konsumen.'
            ],
            vocabulary: [
              { term: 'Ceteris Paribus', meaning: 'Asumsi bahwa faktor-faktor lain di luar harga dianggap konstan atau tidak berubah.' },
              { term: 'Harga Keseimbangan', meaning: 'Tingkat harga di mana kurva permintaan dan kurva penawaran berpotongan.' },
              { term: 'E-commerce', meaning: 'Perniagaan barang dan jasa melalui jaringan internet elektronik.' }
            ],
            practicalTips: 'Perhatikan arah kurva: Permintaan bergradien negatif (turun), Penawaran bergradien positif (naik).'
          }
        ]
      },
      {
        id: 'ips-bab-4',
        chapterNumber: 'BAB IV',
        title: 'Masyarakat Indonesia Masa Praaksara hingga Kerajaan Islam',
        description: 'Melacak jejak peradaban nenek moyang bangsa Indonesia dari zaman batu, pengaruh Hindu-Buddha, hingga islamisasi nusantara.',
        subchapters: [
          {
            id: 'ips-sub-4a',
            code: 'A',
            title: 'Periodisasi Masa Praaksara dan Peninggalan Budaya',
            page: 'Halaman 52',
            readTime: '6 menit',
            summary:
              'Zaman Praaksara terbagi menurut alat perkakas: Paleolitikum (berburu sederhana), Mesolitikum (kjokkenmoddinger & abris sous roche), Neolitikum (bercocok tanam), Megalitikum (batu besar), dan Zaman Logam (Perundagian).',
            keyPoints: [
              'Paleolitikum: Hidup nomaden, berburu dan mengumpulkan makanan (food gathering), perkakas batu kasar seperti kapak perimbas.',
              'Mesolitikum: Mulai menetap semi-permanen di ceruk gua, ditemukan bukit sampah kerang (kjokkenmoddinger).',
              'Neolitikum: Revolusi bercocok tanam (food producing), menetap di perkampungan, kapak persegi dan kapak lonjong halus.',
              'Megalitikum: Menhir (tugu batu pemujaan roh), Dolmen (meja sesaji), Sarkofagus (peti batu), dan Punden Berundak.'
            ],
            vocabulary: [
              { term: 'Praaksara', meaning: 'Masa kehidupan manusia sebelum mengenal tulisan.' },
              { term: 'Menhir', meaning: 'Tugu batu tegak peninggalan megalitikum untuk sarana pemujaan nenek moyang.' },
              { term: 'Food Producing', meaning: 'Kemampuan manusia menghasilkan makanannya sendiri melalui bercocok tanam.' }
            ],
            practicalTips: 'Kjokkenmoddinger adalah tumpukan sampah dapur kerang/siput, Abris Sous Roche adalah gua tempat tinggal purba.'
          },
          {
            id: 'ips-sub-4b',
            code: 'B',
            title: 'Perkembangan Kerajaan Hindu-Buddha dan Islam',
            page: 'Halaman 60',
            readTime: '7 menit',
            summary:
              'Masuknya pengaruh kebudayaan India melahirkan kerajaan tertua Kutai, Tarumanagara, kejayaan maritim Sriwijaya, dan kemegahan Majapahit. Dilanjutkan oleh berkembangnya kerajaan Islam seperti Samudera Pasai dan Demak.',
            keyPoints: [
              'Kerajaan Kutai: Kerajaan Hindu tertua di Muara Kaman, Kaltim, dibuktikan oleh 7 prasasti tiang batu bertulis (Yupa) Raja Mulawarman.',
              'Kerajaan Sriwijaya: Kerajaan maritim dan pusat agama Buddha terkemuka di Palembang yang menguasai Selat Malaka.',
              'Kerajaan Majapahit: Mencapai masa keemasan di bawah Raja Hayam Wuruk dan Mahapatih Gajah Mada dengan Sumpah Palapa.',
              'Penyebaran Islam: Terjadi damai melalui jalur perdagangan, perkawinan, pendidikan pesantren, dan akulturasi kesenian (Wali Songo).'
            ],
            vocabulary: [
              { term: 'Prasasti Yupa', meaning: 'Tiang batu prasasti peninggalan Kerajaan Kutai bertuliskan huruf Pallawa.' },
              { term: 'Sumpah Palapa', meaning: 'Ikrar Mahapatih Gajah Mada untuk menyatukan wilayah Nusantara di bawah Majapahit.' },
              { term: 'Akulturasi', meaning: 'Perpaduan dua kebudayaan tanpa menghilangkan unsur asli budaya setempat.' }
            ],
            practicalTips: 'Menara Masjid Kudus adalah contoh nyata akulturasi arsitektur Hindu-Jawa dengan fungsi ibadah Islam.'
          }
        ]
      }
    ]
  },
  {
    id: 'pjok',
    name: 'PJOK (Pendidikan Jasmani & Olahraga)',
    codeName: 'PJOK Terpadu Kelas 7 SMP/MTs',
    curriculum: 'Kurikulum Merdeka / Kemendikbudristek',
    icon: '⚽',
    tagline: 'Keterampilan Gerak Bola, Atletik, Kebugaran Jasmani, Senam & Hidup Sehat',
    description:
      'Mempelajari teknik spesifik permainan bola besar dan kecil, cabang olahraga atletik (jalan cepat, lari sprint, lompat jauh, tolak peluru), seni beladiri pencak silat, senam lantai, pola hidup sehat gizi seimbang, serta P3K.',
    progressPercent: 70,
    totalMaterials: 8,
    chapters: [
      {
        id: 'pjok-bab-1',
        chapterNumber: 'BAB I',
        title: 'Gerak Spesifik Permainan Bola Besar & Bola Kecil',
        description: 'Menguasai gerak dasar passing, dribbling, shooting bola besar, serta teknik pukulan dan grip pada bola kecil.',
        subchapters: [
          {
            id: 'pjok-sub-1a',
            code: 'A',
            title: 'Keterampilan Gerak Sepak Bola dan Bola Voli',
            page: 'Halaman 4',
            readTime: '6 menit',
            summary:
              'Sepak bola menitikberatkan pada penguasaan kaki bagian dalam untuk passing akurat, serta bola voli mengandalkan passing bawah dan passing atas untuk menyusun serangan.',
            keyPoints: [
              'Sepak Bola (Passing): Menggunakan kaki bagian dalam untuk operan jarak pendek mendatar presisi, dan punggung kaki untuk tendangan jauh keras.',
              'Dribbling & Throw In: Menggiring bola dengan sentuhan ritmis, dan lemparan ke dalam wajib dengan kedua tangan melewati atas kepala.',
              'Bola Voli (Passing Bawah): Kedua lengan lurus dirapatkan ke depan bawah, lutut mengeper, bola mengenai area pergelangan tangan.',
              'Peran Libero: Pemain bertahan seragam berbeda di baris belakang yang bertugas menahan smes lawan tanpa boleh menyervis.'
            ],
            vocabulary: [
              { term: 'Passing Bawah', meaning: 'Operan bola voli dengan merapatkan kedua lengan lurus ke depan bawah.' },
              { term: 'Throw In', meaning: 'Lemparan ke dalam dari sisi lapangan sepak bola dengan kedua tangan di atas kepala.' },
              { term: 'Libero', meaning: 'Pemain spesialis bertahan pada bola voli yang bergerak bebas di garis belakang.' }
            ],
            practicalTips: 'Saat passing bawah bola voli, hindari mengayunkan lengan terlalu tinggi melebihi dada agar bola tidak liar ke belakang.'
          },
          {
            id: 'pjok-sub-1b',
            code: 'B',
            title: 'Variasi Gerak Bola Basket, Bulu Tangkis & Tenis Meja',
            page: 'Halaman 12',
            readTime: '6 menit',
            summary:
              'Bola basket mengandalkan operan dada (chest pass) dan pantul (bounce pass), sedangkan bulu tangkis dan tenis meja menuntut kecermatan pegangan raket/bet dan ketepatan pukulan.',
            keyPoints: [
              'Bola Basket: Chest pass (operan dada), bounce pass (operan pantul ke lantai mengelabui lawan tinggi), pivot (berputar satu kaki poros).',
              'Lay-up Shoot: Tembakan melayang dari jarak dekat yang didahului lari dua langkah teratur ke arah papan pantul.',
              'Bulu Tangkis: Pukulan smash (menukik deras mematikan), pukulan lob (melambung jauh ke baseline belakang), rally point 21.',
              'Tenis Meja: Shakehand grip (seperti berjabat tangan) dan penhold grip (seperti memegang pena), teknik pukulan push dan drive.'
            ],
            vocabulary: [
              { term: 'Bounce Pass', meaning: 'Operan memantulkan bola ke lantai dalam permainan bola basket.' },
              { term: 'Pivot', meaning: 'Gerakan memutar badan dengan bertumpu pada salah satu kaki poros tanpa bergeser.' },
              { term: 'Rally Point', meaning: 'Sistem hitungan skor di mana setiap bola mati langsung menghasilkan poin.' }
            ],
            practicalTips: 'Pelanggaran traveling terjadi bila pemain membawa bola melangkah lebih dari 2 langkah tanpa memantulkan bola (dribble).'
          }
        ]
      },
      {
        id: 'pjok-bab-2',
        chapterNumber: 'BAB II',
        title: 'Gerak Spesifik Atletik dan Seni Beladiri',
        description: 'Mendalami nomor lari cepat, jalan cepat, lompat jauh, tolak peluru, serta keterampilan jurus dan tangkisan pencak silat.',
        subchapters: [
          {
            id: 'pjok-sub-2a',
            code: 'A',
            title: 'Keterampilan Jalan Cepat dan Lari Sprint',
            page: 'Halaman 20',
            readTime: '5 menit',
            summary:
              'Jalan cepat mewajibkan salah satu kaki tetap menempel di tanah setiap saat, sedangkan lari jarak pendek (sprint) menuntut akselerasi eksplosif diawali start jongkok.',
            keyPoints: [
              'Jalan Cepat: Kaki depan harus menyentuh tanah sebelum kaki belakang terangkat (tidak boleh ada fase melayang).',
              'Start Jongkok: Digunakan pada lari 100m, 200m, dan 400m dengan aba-aba "Bersedia", "Siap" (angkat pinggul), dan "Ya / Letusan Pistol".',
              'Teknik Lari Sprint: Ayunan lengan 90 derajat seirama, langkah kaki lebar dan cepat, condongkan badan saat melewati garis finis.'
            ],
            vocabulary: [
              { term: 'Start Jongkok', meaning: 'Posisi start membungkuk bertumpu pada start block untuk lari jarak pendek.' },
              { term: 'Aba-aba Siap', meaning: 'Tahapan mengangkat pinggul sedikit lebih tinggi dari bahu bersiap melakukan dorongan.' },
              { term: 'Fase Tumpuan Ganda', meaning: 'Momen singkat kedua kaki menyentuh tanah pada nomor jalan cepat.' }
            ],
            practicalTips: 'Pada aba-aba "Siap", berat badan dipindahkan ke depan menumpu pada kedua telapak tangan di belakang garis start.'
          },
          {
            id: 'pjok-sub-2b',
            code: 'B',
            title: 'Keterampilan Lompat Jauh, Tolak Peluru & Pencak Silat',
            page: 'Halaman 28',
            readTime: '7 menit',
            summary:
              'Mempelajari 4 fase lompat jauh (awalan, tolakan, melayang, mendarat), tolak peluru gaya membelakangi (O\'Brien), dan pertahanan beladiri pencak silat warisan leluhur bangsa.',
            keyPoints: [
              'Lompat Jauh: Tolakan harus menggunakan satu kaki terkuat tepat di papan tumpu, mendarat dengan kedua kaki mengeper bersamaan.',
              'Tolak Peluru: Peluru diletakkan di pangkal leher di bawah telinga. Gaya O\'Brien dilakukan dengan membelakangi sektor sasaran sebelum meluncur.',
              'Pencak Silat: Kuda-kuda tengah (kaki melebar seimbang), tendangan T (sisi samping lurus), tangkisan luar/dalam menghalau serangan lawan.'
            ],
            vocabulary: [
              { term: 'Gaya O\'Brien', meaning: 'Teknik tolak peluru dengan meluncur membelakangi arah lemparan.' },
              { term: 'Kuda-Kuda Tengah', meaning: 'Sikap dasar kaki melebar dengan kedua lutut ditekuk sejajar dan berat seimbang di tengah.' },
              { term: 'Tendangan T', meaning: 'Tendangan menggunakan tumit menyamping lurus menyerupai huruf T.' }
            ],
            practicalTips: 'Peluru didorong (bukan dilempar) dari pangkal bahu agar tidak menimbulkan cedera sendi bahu.'
          }
        ]
      },
      {
        id: 'pjok-bab-3',
        chapterNumber: 'BAB III',
        title: 'Pembinaan Kebugaran Jasmani dan Senam Lantai',
        description: 'Meningkatkan daya tahan kardiovaskular, kekuatan otot, kelenturan tubuh, serta penguasaan teknik dasar senam ketangkasan matras.',
        subchapters: [
          {
            id: 'pjok-sub-3a',
            code: 'A',
            title: 'Komponen dan Bentuk Latihan Kebugaran Jasmani',
            page: 'Halaman 36',
            readTime: '6 menit',
            summary:
              'Kebugaran jasmani adalah kesanggupan tubuh melakukan aktivitas sehari-hari tanpa kelelahan berarti serta masih memiliki cadangan tenaga.',
            keyPoints: [
              'Komponen Kebugaran: Daya tahan jantung-paru (kardiorespiratori), kekuatan otot, kelenturan (fleksibilitas), kelincahan (agility), dan kecepatan.',
              'Latihan Kekuatan: Push up (otot dada & lengan), Sit up (otot perut), Back up (punggung), Pull up (otot sayap).',
              'Latihan Kelincahan: Shuttle run (lari bolak-balik mengubah arah cepat), zig-zag run melewati rintangan cone.',
              'Pentingnya Pendinginan: Menurunkan detak jantung secara bertahap dan menguraikan asam laktat pencegah kram.'
            ],
            vocabulary: [
              { term: 'Kebugaran Jasmani', meaning: 'Kemampuan fisik melakukan pekerjaan tanpa kelelahan berlebih.' },
              { term: 'Shuttle Run', meaning: 'Latihan lari bolak-balik mengukur dan meningkatkan kelincahan tubuh.' },
              { term: 'Asam Laktat', meaning: 'Zat sisa pembakaran energi otot yang memicu rasa pegal dan nyeri setelah olahraga berat.' }
            ],
            practicalTips: 'Lakukan pemanasan (stretching) minimal 10 menit sebelum latihan dan akhiri dengan pendinginan yang cukup.'
          },
          {
            id: 'pjok-sub-3b',
            code: 'B',
            title: 'Senam Lantai: Guling Depan, Belakang & Sikap Lilin',
            page: 'Halaman 44',
            readTime: '6 menit',
            summary:
              'Senam lantai melatih kelenturan, keberanian, dan kesadaran kinestetik tubuh di atas matras dengan mengutamakan keselamatan leher dan tulang belakang.',
            keyPoints: [
              'Guling Depan (Forward Roll): Dagu dirapatkan menempel dada, bagian pertama menyentuh matras adalah tengkuk leher belakang.',
              'Guling Belakang (Back Roll): Berguling membulat ke belakang dengan dorongan kedua telapak tangan di samping telinga.',
              'Sikap Lilin: Tidur terlentang, kedua kaki diangkat lurus rapat tegak ke atas, pinggang ditopang kedua tangan untuk keseimbangan.'
            ],
            vocabulary: [
              { term: 'Tengkuk', meaning: 'Leher bagian belakang yang menjadi tumpuan berguling depan di matras.' },
              { term: 'Sikap Lilin', meaning: 'Gerakan senam lantai mengangkat kedua kaki tegak lurus ke atas ditopang tangan.' },
              { term: 'Matras Senam', meaning: 'Alas busa empuk pengaman saat melakukan aktivitas senam lantai.' }
            ],
            practicalTips: 'Jangan sekali-kali mendaratkan puncak kepala (ubun-ubun) saat guling depan karena dapat mencederai tulang leher.'
          }
        ]
      },
      {
        id: 'pjok-bab-4',
        chapterNumber: 'BAB IV',
        title: 'Aktivitas Air, Pola Hidup Sehat & Pertolongan Pertama (P3K)',
        description: 'Mengenal renang gaya dada, pedoman gizi seimbang Isi Piringku, pencegahan zat adiktif rokok, serta penanganan cedera terkilir R.I.C.E.',
        subchapters: [
          {
            id: 'pjok-sub-4a',
            code: 'A',
            title: 'Aktivitas Renang dan Keselamatan di Air',
            page: 'Halaman 52',
            readTime: '5 menit',
            summary:
              'Renang gaya dada (breaststroke) meniru gerak katak berenang dengan koordinasi kayuhan lengan, tendangan kaki melingkar, dan pernapasan saat kepala terangkat.',
            keyPoints: [
              'Renang Gaya Dada: Tarikan lengan ke samping mengangkat kepala ke permukaan untuk menghirup napas lewat mulut.',
              'Gerak Kaki Katak: Kaki ditarik mendekati pantat, lalu ditendang melecut memutar ke belakang untuk menghasilkan daya dorong.',
              'Keselamatan Air: Selalu lakukan pemanasan untuk mencegah kram, perhatikan kedalaman kolam, dan jangan panik bila kemasukan air.'
            ],
            vocabulary: [
              { term: 'Breaststroke', meaning: 'Renang gaya dada menyerupai gerakan katak di air.' },
              { term: 'Water Safety', meaning: 'Prinsip kehati-hatian dan penyelamatan diri di lingkungan perairan.' },
              { term: 'Kram Otot', meaning: 'Kontraksi otot mendadak dan menyakitkan yang dapat membahayakan perenang.' }
            ],
            practicalTips: 'Keluarkan napas perlahan melalui hidung di dalam air, dan ambil oksigen dengan mulut saat kepala naik ke permukaan.'
          },
          {
            id: 'pjok-sub-4b',
            code: 'B',
            title: 'Pola Makan Bergizi Seimbang, Bahaya Zat Adiktif & P3K',
            page: 'Halaman 60',
            readTime: '7 menit',
            summary:
              'Kesehatan prima ditopang oleh gizi seimbang sesuai panduan Isi Piringku, menjauhi rokok dan narkoba, serta kesiapsiagaan P3K menangani cedera olahraga dengan metode R.I.C.E.',
            keyPoints: [
              'Isi Piringku: 2/3 dari setengah piring makanan pokok, 1/3 lauk-pauk protein, 2/3 sayuran berserat, 1/3 buah bervitamin, dan cukup air putih.',
              'Bahaya Rokok: Nikotin memicu kecanduan, tar merusak paru-paru, dan karbon monoksida mengikat sel darah merah penghantar oksigen.',
              'Metode R.I.C.E pada Cedera Terkilir: Rest (istirahatkan), Ice (kompres es 15 menit), Compression (bebat tekan elastis), Elevation (tinggikan di atas jantung).'
            ],
            vocabulary: [
              { term: 'Nikotin', meaning: 'Zat alkaloid adiktif dalam rokok yang membuat kecanduan dan merusak pembuluh darah.' },
              { term: 'Metode R.I.C.E', meaning: 'Prosedur pertolongan pertama pada cedera terkilir (Rest, Ice, Compression, Elevation).' },
              { term: 'Sedentary Lifestyle', meaning: 'Gaya hidup minim gerak fisik yang memicu obesitas dan penyakit kronis.' }
            ],
            practicalTips: 'Pada cedera terkilir baru, jangan langsung dipijat keras atau diolesi minyak panas karena akan memperparah perdarahan dan radang jaringan dalam.'
          }
        ]
      }
    ]
  }
];

// Helper maps for quick lookup in components
export const LKS_SUBJECTS: Record<SubjectId, LKSSubjectInfo> = {
  ips: LKS_SUBJECTS_DATA[0],
  pjok: LKS_SUBJECTS_DATA[1],
  // Fallbacks for any legacy cached localStorage subject keys
  taaruf: LKS_SUBJECTS_DATA[0],
  adawat: LKS_SUBJECTS_DATA[1],
  usrah: LKS_SUBJECTS_DATA[1],
  ipa: LKS_SUBJECTS_DATA[0],
  fikih: LKS_SUBJECTS_DATA[1],
  pkn: LKS_SUBJECTS_DATA[0],
};

export const LKS_CHAPTERS_DETAIL: Record<string, LKSSubchapter> = {};
LKS_SUBJECTS_DATA.forEach((subj) => {
  subj.chapters.forEach((chap) => {
    chap.subchapters.forEach((sub) => {
      LKS_CHAPTERS_DETAIL[sub.id] = sub;
    });
  });
});
