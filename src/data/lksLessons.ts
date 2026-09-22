import { LKSSubjectInfo, SubjectId } from '../types';

export const LKS_SUBJECTS_DATA: LKSSubjectInfo[] = [
  {
    id: 'ski',
    name: 'SKI',
    codeName: 'Sejarah Kebudayaan Islam',
    curriculum: 'Kurikulum Merdeka / Kemenag',
    icon: '🕌',
    tagline: 'Nilai Keteladanan Perjuangan & Sejarah Islam',
    description:
      'Mempelajari sejarah dakwah Rasulullah saw. di Mekah, kondisi bangsa Arab pra-Islam, serta nilai keteladanan yang relevan untuk kehidupan.',
    progressPercent: 75,
    totalMaterials: 12,
    chapters: [
      {
        id: 'ski-bab-1',
        chapterNumber: 'BAB I',
        title: "Rasulullah saw. sebagai Rahmatan Lil 'Alamin",
        description: 'Meneladani perjuangan, strategi, dan ketabahan dakwah Nabi Muhammad saw. di kota suci Mekah.',
        subchapters: [
          {
            id: 'ski-sub-a',
            code: 'A',
            title: 'Kondisi Masyarakat Arab sebelum Islam Datang',
            page: 'Halaman 6',
            readTime: '6 menit',
            summary:
              'Masyarakat Arab pra-Islam dikenal berada pada masa Jahiliyah (kebodohan moral dan spiritual). Walaupun memiliki tradisi luhur seperti kedermawanan dan kemahiran bersyair, mereka menyimpang jauh dari ajaran tauhid Nabi Ibrahim dengan menyembah patung berhala seperti Hubal, Latta, Uzza, dan Manat.',
            keyPoints: [
              'Kondisi Kepercayaan: Menyembah berhala yang diletakkan di sekeliling Ka\'bah, mempercayai ramalan nasib dengan panah (azlam), dan mempersembahkan sesaji.',
              'Kondisi Sosial Moral: Terjadi degradasi moral parah, seperti mengubur bayi perempuan hidup-hidup karena takut aib dan kemiskinan, perjudian, serta minuman keras.',
              'Kondisi Politik: Tidak memiliki pemerintahan terpusat; kekuasaan diatur oleh ikatan kabilah/kesukuan (ashabiyah) yang sering memicu peperangan berkepanjangan.',
              'Kondisi Ekonomi: Kegiatan utama adalah berniaga (perjalanan kafilah musim dingin ke Yaman dan musim panas ke Syam), beternak kambing/unta, serta bertani di oase subur seperti Thaif.'
            ],
            vocabulary: [
              { term: 'Jahiliyah', meaning: 'Zaman kebodohan spiritual dan moral sebelum datangnya bimbingan wahyu Islam.' },
              { term: 'Ashabiyah', meaning: 'Fanatisme kesukuan atau golongan yang membabi-buta.' },
              { term: 'Rihlah Syita\' wash-Shaif', meaning: 'Tradisi perjalanan dagang kaum Quraisy pada musim dingin dan musim panas.' }
            ],
            practicalTips: 'Ingat bahwa kebodohan kaum Jahiliyah bukan pada ilmu pengetahuan berniaga atau bersyair, melainkan pada moralitas dan tauhid.'
          },
          {
            id: 'ski-sub-b',
            code: 'B',
            title: 'Sejarah Dakwah Rasulullah saw. di Mekah',
            page: 'Halaman 11',
            readTime: '8 menit',
            summary:
              'Nabi Muhammad saw. lahir pada Tahun Gajah, diasuh oleh Halimah As-Sa\'diyah, kemudian kakeknya Abdul Muthalib, dan pamannya Abu Thalib. Beliau dikenal dengan gelar Al-Amin (terpercaya). Pada usia 40 tahun, beliau menerima wahyu pertama QS. Al-\'Alaq 1-5 di Gua Hira, menandai dimulainya kerasulan beliau.',
            keyPoints: [
              'Wahyu Pertama: QS. Al-\'Alaq ayat 1-5 memerintahkan membaca (Iqra\'), menuntut ilmu, dan mengenal Allah sang Pencipta.',
              'Dakwah Sembunyi-sembunyi (Sirriyah): Berlangsung selama 3 tahun dengan pusat pembinaan di rumah Al-Arqam bin Abi Al-Arqam (Darul Arqam).',
              'As-Sabiqunal Awwalun: Golongan orang pertama masuk Islam, antara lain Khadijah binti Khuwailid (wanita), Abu Bakar Ash-Shiddiq (pria dewasa), Ali bin Abi Thalib (anak-anak), dan Zaid bin Haritsah (budak yang dimerdekakan).',
              'Dakwah Terang-terangan (Jahriyah): Dimulai setelah turun QS. Al-Hijr ayat 94, diawali dengan mengumpulkan kaum Quraisy di Bukit Shafa.'
            ],
            vocabulary: [
              { term: 'Al-Amin', meaning: 'Gelar kejujuran yang disematkan masyarakat Quraisy kepada Muhammad saw.' },
              { term: 'Darul Arqam', meaning: 'Rumah sahabat Al-Arqam yang menjadi markas rahasia pembinaan tauhid pertama.' },
              { term: 'As-Sabiqunal Awwalun', meaning: 'Para perintis awal yang pertama kali menyambut dan memeluk Islam.' }
            ],
            practicalTips: 'Fokuskan ingatan pada urutan As-Sabiqunal Awwalun dan transisi dari dakwah sirriyah ke dakwah jahriyah.'
          },
          {
            id: 'ski-sub-c',
            code: 'C',
            title: 'Strategi dan Tantangan Dakwah Rasulullah saw. di Mekah',
            page: 'Halaman 14',
            readTime: '7 menit',
            summary:
              'Dakwah terang-terangan mendapatkan penentangan sangat keras dari para bangsawan Quraisy seperti Abu Jahal, Abu Lahab, dan Umayyah bin Khalaf. Penolakan mereka didorong oleh ketakutan hilangnya kekuasaan politik, persamaan derajat yang menghapus sistem kasta budak, serta ancaman terhadap industri pembuatan patung.',
            keyPoints: [
              'Bentuk Penindasan: Ancaman pembunuhan terhadap Nabi, pelemparan kotoran saat shalat, dan penyiksaan fisik kejam terhadap budak seperti Bilal bin Rabah dan keluarga Yasir.',
              'Pemboikotan Menyeluruh: Kaum Quraisy memboikot ekonomi dan sosial Bani Hasyim dan Bani Muthalib selama 3 tahun di Syi\'ib Abu Thalib hingga mereka kelaparan.',
              'Strategi Rasulullah saw.: Menunjukkan kesabaran teguh, tidak membalas kekerasan dengan kekerasan, dan memerintahkan sebagian sahabat hijrah sementara ke negeri Habasyah (Etiopia).',
              'Perlindungan Raja Najasyi: Kaum muslimin di bawah pimpinan Ja\'far bin Abi Thalib diterima dengan baik dan dilindungi oleh Raja Najasyi di Habasyah.'
            ],
            vocabulary: [
              { term: 'Syi\'ib Abu Thalib', meaning: 'Lembah tempat penampungan dan pemboikotan klan Nabi Muhammad saw.' },
              { term: 'Raja Najasyi', meaning: 'Raja Habasyah (Abisinia) yang adil dan memberikan suaka kepada kaum muslimin.' }
            ],
            practicalTips: 'Pahami alasan psikologis dan ekonomi mengapa pemuka Quraisy menolak keras ajaran persamaan derajat manusia.'
          },
          {
            id: 'ski-sub-d',
            code: 'D',
            title: 'Peristiwa Penting dan Keteladanan Dakwah Rasulullah saw. di Mekah',
            page: 'Halaman 18',
            readTime: '7 menit',
            summary:
              'Masa akhir dakwah di Mekah diwarnai dengan peristiwa \'Amul Huzni (tahun duka cita), perjalanan mukjizat agung Isra\' Mi\'raj, serta terbukanya jalan dakwah baru ke kota Yatsrib melalui ikrar Bai\'at \'Aqabah.',
            keyPoints: [
              '\'Amul Huzni: Wafatnya dua sosok pilar pelindung tercinta, yaitu Ummul Mukminin Khadijah dan sang paman pembela Abu Thalib.',
              'Mukjizat Isra\' Mi\'raj: Perjalanan malam dari Masjidil Haram ke Masjidil Aqsa lalu naik ke Sidratul Muntaha, menghasilkan perintah shalat 5 waktu.',
              'Bai\'at \'Aqabah I dan II: Perjanjian setia antara Rasulullah saw. dan utusan penduduk Yatsrib yang membuka jalan bagi hijrah akbar ke Madinah.',
              'Keteladanan Luhur: Konsistensi (istiqamah), kesabaran menghadapi cercaan, pemaaf kepada orang yang menyakiti, serta tawakal mutlak kepada Allah SWT.'
            ],
            vocabulary: [
              { term: '\'Amul Huzni', meaning: 'Tahun kesedihan karena wafatnya istri dan paman Nabi Muhammad saw.' },
              { term: 'Sidratul Muntaha', meaning: 'Tempat tertinggi di langit ketujuh tempat Nabi menerima perintah shalat.' },
              { term: 'Bai\'at', meaning: 'Janji setia ketaatan dan kesediaan membela perjuangan kebenaran.' }
            ],
            practicalTips: 'Shalat fardhu 5 waktu adalah oleh-oleh termulia dari peristiwa Isra\' Mi\'raj untuk seluruh umat Islam.'
          }
        ]
      }
    ]
  },
  {
    id: 'bahasa_inggris',
    name: 'Bahasa Inggris',
    codeName: 'English for Nusantara',
    curriculum: 'Kurikulum Merdeka',
    icon: '🔤',
    tagline: 'Communication, Vocabulary & Daily Expressions',
    description:
      'Mempelajari perkenalan diri, hobi dan kegiatan luang, deskripsi teman, serta makanan dan resep masakan nusantara sesuai modul LKS.',
    progressPercent: 60,
    totalMaterials: 10,
    chapters: [
      {
        id: 'eng-unit-1',
        chapterNumber: 'Unit 1',
        title: 'About Me',
        description: 'Introducing oneself, talking about hobbies, personal traits, and making new friends.',
        subchapters: [
          {
            id: 'eng-sub-1a',
            code: 'A',
            title: 'Galang from Kalimantan',
            page: 'Page 5',
            readTime: '5 menit',
            summary:
              'Unit ini mengenalkan cara menyapa (greetings), memperkenalkan diri secara sopan (self-introduction), menyebutkan asal daerah, usia, dan kelas. Contoh teks utama adalah Galang, siswa yang berasal dari Kalimantan.',
            keyPoints: [
              'Greeting Expressions: "Hello!", "Good morning!", "Nice to meet you."',
              'Self-Introduction Pattern: "My name is Galang. I am from Kalimantan. I am thirteen years old. I study at SMP Merdeka."',
              'Subject & Possessive Pronouns: I -> My, You -> Your, He -> His, She -> Her, We -> Our, They -> Their.',
              'To Be (Present Tense): am (I), is (he/she/it/singular), are (you/we/they/plural).'
            ],
            vocabulary: [
              { term: 'Introduce', meaning: 'Memperkenalkan' },
              { term: 'Origin / From', meaning: 'Asal daerah' },
              { term: 'Classmate', meaning: 'Teman sekelas' },
              { term: 'Pleasure', meaning: 'Kesenangan / senang berkenalan' }
            ],
            practicalTips: 'Gunakan "I am..." untuk menyatakan identitas/umur dan "My favorite..." untuk kesukaan.'
          },
          {
            id: 'eng-sub-1b',
            code: 'B',
            title: 'I Love Fishing',
            page: 'Page 9',
            readTime: '6 menit',
            summary:
              'Mempelajari ungkapan untuk membicarakan hobi, kegemaran waktu luang (free time activities), dan alasan menyukai hobi tersebut menggunakan kata kerja preference.',
            keyPoints: [
              'Talking About Hobbies: "What do you like to do on weekends?", "My hobby is fishing.", "I love fishing because it is relaxing."',
              'Common Hobbies: cycling (bersepeda), reading novels, playing badminton, cooking, painting.',
              'Verbs of Like: like + V-ing / to V, love + V-ing, enjoy + V-ing ("He enjoys cycling in the park").',
              'Adverbs of Frequency: always, usually, often, sometimes, rarely, never.'
            ],
            vocabulary: [
              { term: 'Relaxing', meaning: 'Menenangkan / santai' },
              { term: 'Fishing rod', meaning: 'Alat pancing' },
              { term: 'Free time', meaning: 'Waktu luang' },
              { term: 'Leisure', meaning: 'Waktu senggang' }
            ],
            practicalTips: 'Perhatikan penambahan -s/-es pada verb orang ketiga tunggal: "Galang likes fishing".'
          },
          {
            id: 'eng-sub-1c',
            code: 'C',
            title: 'My Friends and I',
            page: 'Page 13',
            readTime: '5 menit',
            summary:
              'Mendeskripsikan ciri-ciri fisik (physical appearances) dan kepribadian (personality traits) teman sebaya secara positif dan komunikatif.',
            keyPoints: [
              'Physical Appearance: tall, slim, curly hair, straight hair, bright smile, wearing glasses.',
              'Personality Adjectives: friendly, helpful, energetic, smart, polite, cheerful, kind.',
              'Sentence Pattern: "Andre is tall and has wavy hair. He is very helpful to his classmates."',
              'Plural Subjects: "Galang and Monita are close friends. They always study together."'
            ],
            vocabulary: [
              { term: 'Cheerful', meaning: 'Ceria / riang gembira' },
              { term: 'Helpful', meaning: 'Suka menolong' },
              { term: 'Appearance', meaning: 'Penampilan fisik' },
              { term: 'Traits', meaning: 'Sifat / karakter' }
            ],
            practicalTips: 'Gunakan "has/have" untuk mendeskripsikan rambut/mata: "She has curly black hair".'
          }
        ]
      },
      {
        id: 'eng-unit-2',
        chapterNumber: 'Unit 2',
        title: 'Culinary and Me',
        description: 'Exploring traditional Indonesian foods, snacks, tastes, textures, and recipe instructions.',
        subchapters: [
          {
            id: 'eng-sub-2a',
            code: 'A',
            title: 'My Favorite Food',
            page: 'Page 23',
            readTime: '6 menit',
            summary:
              'Mempelajari ragam makanan nusantara dan kosakata cita rasa (taste descriptors). Siswa diajak menjelaskan makanan favoritnya beserta cita rasanya.',
            keyPoints: [
              'Taste Descriptors: sweet (manis), savory/umami (gurih), salty (asin), spicy/hot (pedas), sour (masam), bitter (pahit).',
              'Favorite Dishes: chicken satay with peanut sauce, fried rice (nasi goreng), rendang, gado-gado.',
              'Describing Food: "Fried rice is savory and slightly spicy. It smells delicious."',
              'Asking Preferences: "What is your favorite dish?", "I really love sate ayam because the sauce is sweet and savory."'
            ],
            vocabulary: [
              { term: 'Savory', meaning: 'Gurih dan sedap' },
              { term: 'Spicy', meaning: 'Pedas' },
              { term: 'Delicious / Tasty', meaning: 'Sangat lezat' },
              { term: 'Flavor', meaning: 'Rasa / aroma rasa' }
            ],
            practicalTips: 'Bedakan "sweet" (manis gula) dan "savory" (gurih bumbu berempah).'
          },
          {
            id: 'eng-sub-2b',
            code: 'B',
            title: 'My Favorite Snack',
            page: 'Page 26',
            readTime: '5 menit',
            summary:
              'Mengenal aneka kudapan dan camilan khas Indonesia, serta mendeskripsikan tekstur makanan (crunchy, soft, chewy, warm).',
            keyPoints: [
              'Texture Descriptors: crunchy / crispy (renyah), soft (lembut), chewy (kenyal), greasy (berminyak).',
              'Indonesian Snacks: banana fritters (pisang goreng), cassava chips (keripik singkong), toast (roti bakar), martabak.',
              'Offering & Requesting: "Would you like some banana fritters?", "Yes, please! They smell so good and crispy."'
            ],
            vocabulary: [
              { term: 'Crispy', meaning: 'Renyah dan garing' },
              { term: 'Chewy', meaning: 'Kenyal saat dikunyah' },
              { term: 'Snack', meaning: 'Kudapan / makanan ringan' }
            ],
            practicalTips: 'Kata "chips" merujuk pada keripik garing seperti keripik singkong atau pisang.'
          },
          {
            id: 'eng-sub-2c',
            code: 'C',
            title: 'Secret Recipe',
            page: 'Page 30',
            readTime: '7 menit',
            summary:
              'Memahami teks prosedur (procedure text) berupa resep masakan sederhana, langkah-langkah membuat makanan, dan action verbs di dapur.',
            keyPoints: [
              'Text Structure: Goal/Title (Tujuan), Ingredients & Utensils (Bahan & Alat), Steps/Method (Langkah pembuatan).',
              'Imperative Cooking Verbs: chop (mencincang), slice (mengiris), peel (mengupas), boil (merebus), fry (menggoreng), stir (mengaduk), pour (menuangkan).',
              'Sequence Connectors: First (Pertama), Second, Next, Then, After that, Finally (Akhirnya).',
              'Kitchen Utensils: frying pan (wajan), spatula, pot (panci), bowl (mangkuk), tablespoon (sendok makan).'
            ],
            vocabulary: [
              { term: 'Recipe', meaning: 'Resep petunjuk memasak' },
              { term: 'Ingredients', meaning: 'Bahan-bahan makanan' },
              { term: 'Stir', meaning: 'Mengaduk rata' },
              { term: 'Serve', meaning: 'Menyajikan' }
            ],
            practicalTips: 'Kalimat perintah pada teks prosedur dimulai langsung dengan kata kerja dasar (misal: "Slice the onions").'
          }
        ]
      }
    ]
  },
  {
    id: 'bahasa_jawa',
    name: 'Bahasa Jawa',
    codeName: 'Sinau Basa Jawa',
    curriculum: 'Muatan Lokal Jawa',
    icon: 'ꦗ',
    tagline: 'Wacan Narasi, Crita Rakyat & Unggah-Ungguh Basa',
    description:
      'Sinau maca wacan narasi, mangerteni crita rakyat nusantara, struktur crita, lan nulis kanthi basa Jawa sing gampang, santun, lan akrab.',
    progressPercent: 80,
    totalMaterials: 8,
    chapters: [
      {
        id: 'jawa-wulangan-1',
        chapterNumber: 'Wulangan I',
        title: 'Wacan Narasi',
        description: 'Mangerteni jinis-jinis wacan, struktur wacan narasi, unsur pambangun, lan carane nulis narasi kanthi cetha.',
        subchapters: [
          {
            id: 'jawa-sub-1a',
            code: 'A',
            title: 'Jinis-Jinis Wacan',
            page: 'Halaman 4',
            readTime: '5 menit',
            summary:
              'Siswa sinau ngenal 5 jinis wacan (paragraf) ing basa Jawa. Wacan narasi dadi materi utamane amarga nyritakake prastawa adhedhasar urutan wektu (kronologis).',
            keyPoints: [
              'Wacan Narasi: Wacan sing nyritakake kedadeyan kanthi runtut saka wiwitan nganti pungkasan adhedhasar urutan wektu.',
              'Wacan Deskripsi: Wacan sing nggambarake kahanan, barang, utawa pawongan nganti sing maca kaya weruh lan ngrasakake dhewe.',
              'Wacan Eksposisi: Wacan sing menehi informasi utawa kawruh kanthi gamblang lan cetha.',
              'Wacan Persuasi: Wacan sing isine ngajak utawa ngrayu pamaca supaya gelem nurut apa karepe penulis.',
              'Wacan Argumentasi: Wacan sing ngemot alesan lan bukti kuwat kanggo ngukuhi panemu (pendapat).'
            ],
            vocabulary: [
              { term: 'Wacan', meaning: 'Teks wacanan / bacaan' },
              { term: 'Runtut', meaning: 'Urut lan tumata kanthi apik' },
              { term: 'Kedadeyan / Prastawa', meaning: 'Peristiwa atau kejadian' }
            ],
            practicalTips: 'Titenana yen wacan narasi kuwi mesthi ana paraga (tokoh) lan urutan kedadeyan wektune.'
          },
          {
            id: 'jawa-sub-1b',
            code: 'B',
            title: 'Struktur Wacan Narasi',
            page: 'Halaman 7',
            readTime: '6 menit',
            summary:
              'Wacan narasi sing apik nduweni 4 perangan struktur baku: Orientasi, Komplikasi, Resolusi, lan Koda.',
            keyPoints: [
              'Orientasi (Pambuka): Ngenalake paraga (tokoh), papan panggonan (latar panggonan), lan wektu dumadine crita.',
              'Komplikasi (Prakara): Wiwit muncul prakara, masalah, utawa dredah sing dialami dening paraga utama.',
              'Resolusi (Pangudhare Prakara): Masalah wiwit nemu dalan pungkasan utawa solusi cara ngudhari prakara.',
              'Koda (Pungkasan): Dudutan (kesimpulan) lan piwulang becik (amanat) sing bisa dadi tuladha kagem para pamaca.'
            ],
            vocabulary: [
              { term: 'Paraga', meaning: 'Tokoh sing ana ing crita' },
              { term: 'Dredah / Prakara', meaning: 'Konflik / masalah' },
              { term: 'Pangudhar', meaning: 'Penyelesaian masalah / resolusi' }
            ],
            practicalTips: 'Urutane struktur narasi gampang dieling-eling: Ngenalke -> Ana masalah -> Masalahe rampung -> Piwulang becik.'
          },
          {
            id: 'jawa-sub-1c',
            code: 'C',
            title: 'Unsur Pambangun Narasi',
            page: 'Halaman 10',
            readTime: '6 menit',
            summary:
              'Unsur intrinsik yaiku unsur sing mangun crita saka njero teks. Unsur iki ndadekake crita dadi urip lan nyenengake diwaca.',
            keyPoints: [
              'Tema: Gagasan baku utawa underaning crita.',
              'Paraga & Watak: Protagonis (watak becik/luhur), Antagonis (watak ala/dur angkara), Tritagonis (paraga penengah).',
              'Latar (Setting): Latar papan (ing ngendi), latar wektu (kapan), lan latar swasana (seneng, susah, medeni).',
              'Alur: Lakune kedadeyan ing crita (alur maju, alur mundur, alur campuran).',
              'Sudut Pandang (Pamawas): Wong kapisan nggunakake tembung "aku", wong katelu nggunakake tembung "dheweke" utawa jenenge paraga.',
              'Amanat: Pesen becik utawa pitutur luhur saka pengarang marang pamaca.'
            ],
            vocabulary: [
              { term: 'Underan', meaning: 'Tema / pokok pikiran utama' },
              { term: 'Watak', meaning: 'Sipat / kepribadian paraga' },
              { term: 'Pitutur luhur', meaning: 'Nasihat budi pekerti yang mulia' }
            ],
            practicalTips: 'Kanggo nggoleki amanat, delengen apa piwulang apik sing bisa ditiru saka tumindake paraga becik.'
          },
          {
            id: 'jawa-sub-1d',
            code: 'D',
            title: 'Nulis Wacan Narasi',
            page: 'Halaman 14',
            readTime: '5 menit',
            summary:
              'Langkah-langkah gampang nulis wacan narasi nggunakake basa Jawa sing bener lan komunikatif.',
            keyPoints: [
              'Langkah 1: Nemtokake tema crita sing narik kawigaten.',
              'Langkah 2: Nemtokake paraga lan watake paraga.',
              'Langkah 3: Gawe cengkorongan (kerangka karangan) kanthi urut.',
              'Langkah 4: Ngembangake cengkorongan dadi paragraf narasi wutuh nggunakake tembung sing trep.'
            ],
            vocabulary: [
              { term: 'Cengkorongan', meaning: 'Kerangka karangan' },
              { term: 'Narik kawigaten', meaning: 'Menarik perhatian pembaca' }
            ],
            practicalTips: 'Tulis dhisik garis gedhene nganggo cengkorongan supaya critane ora mlenceng saka tema.'
          }
        ]
      },
      {
        id: 'jawa-wulangan-2',
        chapterNumber: 'Wulangan II',
        title: 'Crita Rakyat',
        description: 'Mangerteni tegese crita rakyat, titikan, jinis-jinis crita rakyat nusantara, lan ngowahi dadi naskah drama.',
        subchapters: [
          {
            id: 'jawa-sub-2a',
            code: 'A',
            title: 'Mangerteni Crita Rakyat',
            page: 'Halaman 20',
            readTime: '5 menit',
            summary:
              'Crita rakyat yaiku crita saka jaman biyen sing urip lan ngrembaka ing satengahe bebrayan agung kanthi cara gethok tular (lesan/lisan).',
            keyPoints: [
              'Tegese Crita Rakyat: Warisan budaya lesan sing wis turun-temurun saka simbah buyut biyen.',
              'Titikan (Ciri-ciri): Ora kawentar sapa pengarange (anonim), asipat tradhisional, lan ngemot piwulang budi pekerti luhur.',
              'Fungsi Crita Rakyat: Minangka sarana panglipur (hiburan) lan mulangake piwulang moral becik marang para generasi mudha.'
            ],
            vocabulary: [
              { term: 'Gethok tular', meaning: 'Dicritakake saka cangkem menyang cangkem (lisan)' },
              { term: 'Bebrayan agung', meaning: 'Masyarakat umum' },
              { term: 'Panglipur', meaning: 'Penghibur hati / hiburan' }
            ],
            practicalTips: 'Amarga asipat anonim, crita rakyat asring nduweni pirang-pirang versi ing saben tlatah.'
          },
          {
            id: 'jawa-sub-2b',
            code: 'B',
            title: 'Jinis-Jinis Crita Rakyat',
            page: 'Halaman 24',
            readTime: '6 menit',
            summary:
              'Crita rakyat kapérang dadi pirang-pirang jinis adhedhasar isine, kayata fabel, legenda, mite, lan sage.',
            keyPoints: [
              'Fabel: Crita kewan sing bisa omong-omongan kaya manungsa. Tuladha: Kancil lan Baya, Kancil Nyolong Timun.',
              'Legenda: Crita asal-usul dumadine sawijining panggonan utawa papan. Tuladha: Asal-usul Rawa Pening, Candi Prambanan, Kutha Surabaya.',
              'Mite / Mitos: Crita babagan dewa-dewi utawa lelembut gaib sing dianggep sakral. Tuladha: Nyi Roro Kidul.',
              'Sage: Crita rakyat sing ngemot unsur sajarah kepahlawanan biyen. Tuladha: Crita Ken Arok lan Ken Dedes.'
            ],
            vocabulary: [
              { term: 'Legenda', meaning: 'Crita asal-usul panggonan' },
              { term: 'Fabel', meaning: 'Crita kewan kang duwe watak kaya manungsa' },
              { term: 'Tuladha', meaning: 'Contoh' }
            ],
            practicalTips: 'Yen nyritakake asal-usul panggonan jenenge Legenda; yen parogane sato kewan jenenge Fabel.'
          },
          {
            id: 'jawa-sub-2c',
            code: 'C',
            title: 'Ngowahi Crita Dadi Naskah Drama',
            page: 'Halaman 28',
            readTime: '6 menit',
            summary:
              'Crita rakyat awujud narasi bisa diowahi dadi teks pacelathon (dialog) kanggo dipentasake dadi naskah drama panggung.',
            keyPoints: [
              'Perangan Teks Drama: Jeneng paraga, pacelathon (omongan langsung), lan pituduh lakon / kramagung (tulisan sajroning tandha kurung sing njlentrehake solah bawa).',
              'Unggah-Ungguh Basa: Paraga marang kanca sapadha nggunakake Basa Ngoko; dene marang wong tuwa utawa guru nggunakake Basa Krama.',
              'Langkah Ngowahi: Maca crita nganti rampung -> nemtokake paraga utama -> ngowahi paragraf narasi dadi pacelathon sing komunikatif.'
            ],
            vocabulary: [
              { term: 'Pacelathon', meaning: 'Percakapan / dialog antar tokoh' },
              { term: 'Kramagung', meaning: 'Petunjuk gerak atau ekspresi dalam naskah drama' },
              { term: 'Solah bawa', meaning: 'Tingkah laku / gerak gerik' }
            ],
            practicalTips: 'Basa Krama digunakake kanthi sopan nalika paraga enom matur marang paraga sing luwih sepuh.'
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
  ski: {
    ...LKS_SUBJECTS_DATA[0],
    title: 'Sejarah Kebudayaan Islam (SKI)',
  },
  bahasa_inggris: {
    ...LKS_SUBJECTS_DATA[1],
    title: 'Bahasa Inggris',
  },
  bahasa_jawa: {
    ...LKS_SUBJECTS_DATA[2],
    title: 'Bahasa Jawa',
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

