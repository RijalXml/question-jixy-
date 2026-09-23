const fs = require('fs');
const path = require('path');

const ipaQuestions = [
  // Bab 1 - Tata Surya (1-10)
  {
    id: 1,
    subjectId: "ipa",
    indicator: "Menyebutkan urutan planet dalam tata surya dari yang terdekat dengan Matahari",
    topic: "Tata Surya",
    question: "Planet terdekat kedua dari Matahari yang sering dijuluki sebagai Bintang Fajar atau Bintang Kejora adalah...",
    options: ["Merkurius", "Venus", "Mars", "Jupiter"],
    correctAnswer: 1,
    explanation: "Venus adalah planet kedua dari Matahari setelah Merkurius. Karena atmosfer tebalnya memantulkan cahaya matahari dengan sangat baik, Venus tampak sangat terang di pagi atau sore hari sehingga dijuluki Bintang Fajar atau Bintang Kejora."
  },
  {
    id: 2,
    subjectId: "ipa",
    indicator: "Membedakan peristiwa akibat rotasi bumi",
    topic: "Tata Surya",
    question: "Peristiwa alam berikut ini yang diakibatkan secara langsung oleh rotasi Bumi adalah...",
    options: ["Perubahan musim di belahan bumi utara dan selatan", "Perbedaan lamanya waktu siang dan malam tahunan", "Gerak semu harian matahari dari timur ke barat", "Terlihatnya rasi bintang yang berbeda tiap bulan"],
    correctAnswer: 2,
    explanation: "Gerak semu harian matahari (matahari tampak terbit di timur dan tenggelam di barat) serta pergantian siang dan malam merupakan akibat dari rotasi Bumi (perputaran Bumi pada porosnya)."
  },
  {
    id: 3,
    subjectId: "ipa",
    indicator: "Menjelaskan fase-fase bulan",
    topic: "Tata Surya",
    question: "Pada fase bulan baru (new moon), posisi Bulan berada di antara...",
    options: ["Bumi dan Matahari sehingga sisi bulan yang menghadap bumi tidak terkena sinar matahari", "Bumi dan Mars sehingga memantulkan spektrum merah", "Di belakang bayangan umbra Bumi seutuhnya", "Di titik terjauh dari orbit tata surya"],
    correctAnswer: 0,
    explanation: "Saat fase bulan baru (new moon), Bulan berada tepat di antara Matahari dan Bumi. Bagian Bulan yang menghadap ke Bumi tidak mendapat sinar matahari langsung, sehingga Bulan tampak gelap dari Bumi."
  },
  {
    id: 4,
    subjectId: "ipa",
    indicator: "Menjelaskan terjadinya gerhana matahari",
    topic: "Tata Surya",
    question: "Gerhana matahari total terjadi ketika permukaan bumi berada persis pada daerah bayangan...",
    options: ["Penumbra Bulan", "Antumbra Matahari", "Atmosfer terluar Bumi", "Umbra Bulan"],
    correctAnswer: 3,
    explanation: "Gerhana matahari total dialami oleh daerah di permukaan Bumi yang berada persis di dalam jalur umbra (bayangan inti yang gelap pekat) dari Bulan."
  },
  {
    id: 5,
    subjectId: "ipa",
    indicator: "Karakteristik planet Mars",
    topic: "Tata Surya",
    question: "Mars dijuluki sebagai Planet Merah terutama disebabkan oleh...",
    options: ["Tingginya suhu lava aktif di seluruh permukaannya", "Kandungan besi(III) oksida (karat) yang melimpah pada batu dan debu permukaannya", "Pantulan gas metana di lapisan troposfernya", "Jaraknya yang sangat dekat dengan inti galaksi"],
    correctAnswer: 1,
    explanation: "Warna kemerahan pada Mars diakibatkan oleh melimpahnya debu dan bebatuan yang kaya senyawa oksida besi (iron oxide / karat) di permukaannya."
  },
  {
    id: 6,
    subjectId: "ipa",
    indicator: "Menjelaskan sabuk asteroid",
    topic: "Tata Surya",
    question: "Sabuk asteroid utama (asteroid belt) dalam tata surya kita terletak di antara orbit planet...",
    options: ["Bumi dan Mars", "Saturnus dan Uranus", "Mars dan Jupiter", "Jupiter dan Saturnus"],
    correctAnswer: 2,
    explanation: "Sabuk asteroid utama terletak di ruang antara orbit planet Mars (planet dalam terakhir) dan Jupiter (planet gas luar pertama)."
  },
  {
    id: 7,
    subjectId: "ipa",
    indicator: "Membedakan meteoroid, meteor, dan meteorit",
    topic: "Tata Surya",
    question: "Bongkahan batu luar angkasa yang berhasil menembus atmosfer Bumi dan sampai membentur permukaan tanah disebut...",
    options: ["Meteorit", "Meteor", "Meteoroid", "Komet"],
    correctAnswer: 0,
    explanation: "Meteoroid adalah batu di luar angkasa. Meteor adalah jejak pijar gas saat terbakar di atmosfer. Meteorit adalah sisa bongkahan batu yang berhasil mendarat di permukaan Bumi."
  },
  {
    id: 8,
    subjectId: "ipa",
    indicator: "Akibat revolusi bumi",
    topic: "Tata Surya",
    question: "Salah satu akibat dari revolusi Bumi mengelilingi Matahari dengan kemiringan sumbu 23,5 derajat adalah...",
    options: ["Pembelokan arah angin siklon dunia", "Perbedaan percepatan gravitasi bumi di khatulistiwa", "Pergantian siang dan malam secara cepat", "Pergantian empat musim di daerah beriklim sedang"],
    correctAnswer: 3,
    explanation: "Revolusi Bumi bersama dengan kemiringan poros rotasi Bumi sebesar 23,5 derajat menyebabkan pergeseran semu tahunan matahari dan perbedaan empat musim di wilayah subtropis."
  },
  {
    id: 9,
    subjectId: "ipa",
    indicator: "Posisi gerhana bulan",
    topic: "Tata Surya",
    question: "Peristiwa gerhana bulan hanya dapat terjadi pada saat fase...",
    options: ["Bulan sabit awal", "Bulan purnama", "Bulan mati / baru", "Kuartir pertama"],
    correctAnswer: 1,
    explanation: "Gerhana bulan hanya dapat terjadi saat Bulan Purnama, yaitu ketika posisi Bumi berada di antara Matahari dan Bulan dalam satu garis sejajar."
  },
  {
    id: 10,
    subjectId: "ipa",
    indicator: "Planet terbesar dan cincin",
    topic: "Tata Surya",
    question: "Planet dalam tata surya yang memiliki massa terbesar dan memiliki fenomena badai bintik merah raksasa (Great Red Spot) adalah...",
    options: ["Neptunus", "Uranus", "Jupiter", "Saturnus"],
    correctAnswer: 2,
    explanation: "Jupiter adalah planet terbesar dalam tata surya. Great Red Spot adalah badai antisiklon raksasa yang berputar kencang di atmosfer Jupiter."
  },

  // Bab 2 - Zat & Karakteristiknya (11-20)
  {
    id: 11,
    subjectId: "ipa",
    indicator: "Membedakan sifat partikel zat padat, cair, dan gas",
    topic: "Zat & Karakteristiknya",
    question: "Zat yang memiliki bentuk berubah sesuai wadahnya tetapi volumenya tetap serta gaya tarik antarpartikelnya relatif sedang adalah zat berwujud...",
    options: ["Gas", "Cair", "Padat", "Plasma"],
    correctAnswer: 1,
    explanation: "Zat cair memiliki volume tetap namun bentuknya menyesuaikan bentuk wadahnya karena partikel-partikelnya masih dapat meluncur bebas."
  },
  {
    id: 12,
    subjectId: "ipa",
    indicator: "Mengidentifikasi perubahan wujud zat",
    topic: "Zat & Karakteristiknya",
    question: "Peristiwa pembentukan jelaga hitam pada cerobong atau pembuatan dry ice merupakan contoh perubahan wujud...",
    options: ["Menguap", "Mencair", "Menyublim", "Mengkristal (deposisi)"],
    correctAnswer: 3,
    explanation: "Mengkristal atau deposisi adalah perubahan wujud dari gas langsung menjadi zat padat dengan melepaskan kalor."
  },
  {
    id: 13,
    subjectId: "ipa",
    indicator: "Perbedaan perubahan fisika dan kimia",
    topic: "Zat & Karakteristiknya",
    question: "Di antara peristiwa berikut, yang termasuk ke dalam contoh perubahan kimia adalah...",
    options: ["Beras ditumbuk menjadi tepung halus", "Besi mengalami perkaratan akibat kontak dengan oksigen dan air", "Es batu mencair di dalam gelas", "Lilin meleleh saat dipanaskan"],
    correctAnswer: 1,
    explanation: "Perkaratan besi menghasilkan zat baru berupa karat besi (Fe2O3.xH2O) yang sifat kimianya berbeda dari besi awal dan bersifat irreversible."
  },
  {
    id: 14,
    subjectId: "ipa",
    indicator: "Gas rumah kaca utama",
    topic: "Zat & Karakteristiknya",
    question: "Gas rumah kaca yang paling banyak dihasilkan dari pembakaran bahan bakar fosil dan menjadi pemicu utama pemanasan global adalah...",
    options: ["Karbon dioksida (CO2)", "Gas Oksigen (O2)", "Gas Nitrogen (N2)", "Gas Helium (He)"],
    correctAnswer: 0,
    explanation: "Karbon dioksida (CO2) adalah gas rumah kaca utama hasil emisi kendaraan dan industri yang menyerap radiasi inframerah dari permukaan bumi."
  },
  {
    id: 15,
    subjectId: "ipa",
    indicator: "Dampak pemanasan global",
    topic: "Zat & Karakteristiknya",
    question: "Salah satu dampak langsung dari meningkatnya suhu rata-rata global terhadap ekosistem lautan adalah...",
    options: ["Penurunan permukaan air laut secara drastis", "Pemutihan terumbu karang (coral bleaching) akibat naiknya suhu air laut", "Peningkatan jumlah ikan air tawar di laut", "Membekunya lapisan es di daerah tropis"],
    correctAnswer: 1,
    explanation: "Kenaikan suhu air laut menyebabkan alga simbiotik keluar dari jaringan karang, memicu pemutihan karang (coral bleaching) dan kerusakan terumbu karang."
  },
  {
    id: 16,
    subjectId: "ipa",
    indicator: "Kerapatan massa jenis",
    topic: "Zat & Karakteristiknya",
    question: "Sebuah balok bermassa 240 gram memiliki volume 60 cm3. Massa jenis balok tersebut adalah...",
    options: ["0,25 g/cm3", "180 g/cm3", "4 g/cm3", "14.400 g/cm3"],
    correctAnswer: 2,
    explanation: "Massa jenis (rho) = massa / volume = 240 gram / 60 cm3 = 4 g/cm3."
  },
  {
    id: 17,
    subjectId: "ipa",
    indicator: "Pemisahan campuran",
    topic: "Zat & Karakteristiknya",
    question: "Metode pemisahan campuran yang digunakan untuk memisahkan garam dari air laut dengan memanfaatkan perbedaan titik didih adalah...",
    options: ["Kromatografi", "Filtrasi", "Evaporasi (penguapan)", "Sublimasi"],
    correctAnswer: 2,
    explanation: "Petani garam memanfaatkan evaporasi atau penguapan air di bawah sinar matahari sehingga air menguap dan kristal garam tertinggal di tambak."
  },
  {
    id: 18,
    subjectId: "ipa",
    indicator: "Efek rumah kaca alami",
    topic: "Zat & Karakteristiknya",
    question: "Pada dasarnya, efek rumah kaca alami sangat penting bagi kelangsungan hidup di Bumi karena berfungsi untuk...",
    options: ["Menjaga suhu Bumi tetap hangat dan layak dihuni oleh makhluk hidup", "Memantulkan seluruh sinar ultraviolet agar tidak masuk ke bumi", "Menghilangkan seluruh kandungan uap air di udara", "Mencegah terjadinya gravitasi bumi"],
    correctAnswer: 0,
    explanation: "Tanpa efek rumah kaca alami, suhu rata-rata Bumi akan sangat dingin (mencapai sekitar minus 18 derajat Celsius) sehingga air akan membeku dan kehidupan punah."
  },
  {
    id: 19,
    subjectId: "ipa",
    indicator: "Sifat asam basa",
    topic: "Zat & Karakteristiknya",
    question: "Larutan yang dapat mengubah warna kertas lakmus merah menjadi biru memiliki sifat...",
    options: ["Asam", "Netral", "Garam murni", "Basa"],
    correctAnswer: 3,
    explanation: "Larutan basa memiliki pH di atas 7 dan memiliki sifat mengubah warna kertas lakmus merah menjadi warna biru."
  },
  {
    id: 20,
    subjectId: "ipa",
    indicator: "Upaya mitigasi pemanasan global",
    topic: "Zat & Karakteristiknya",
    question: "Tindakan penghijauan (reboisasi) di wilayah perkotaan dapat membantu menurunkan laju pemanasan global karena tumbuhan hijau mampu...",
    options: ["Menghasilkan gas metana dari tanah", "Menyerap gas karbon dioksida (CO2) dalam proses fotosintesis", "Menghalangi pergerakan angin malam", "Mengubah radiasi matahari menjadi uap minyak"],
    correctAnswer: 1,
    explanation: "Pohon dan tumbuhan hijau menyerap gas CO2 sebagai bahan fotosintesis dan melepaskan O2, bertindak sebagai penyerap karbon (carbon sink) alami."
  },

  // Bab 3 - Energi & Kelestariannya (21-30)
  {
    id: 21,
    subjectId: "ipa",
    indicator: "Membedakan energi terbarukan dan tak terbarukan",
    topic: "Energi",
    question: "Kelompok sumber energi berikut yang seluruhnya tergolong ke dalam sumber energi terbarukan adalah...",
    options: ["Minyak bumi, batu bara, dan gas alam", "Matahari, angin, dan panas bumi (geotermal)", "Nuklir, batu bara, dan air", "Bensin, biodiesel, dan solar"],
    correctAnswer: 1,
    explanation: "Matahari, angin, dan panas bumi (geotermal) merupakan sumber energi ramah lingkungan yang tidak akan habis dan dapat diperbarui secara alami."
  },
  {
    id: 22,
    subjectId: "ipa",
    indicator: "Prinsip kerja panel surya",
    topic: "Energi",
    question: "Panel surya (solar cell) bekerja dengan memanfaatkan efek fotovoltaik untuk mengubah langsung...",
    options: ["Energi angin menjadi energi gerak", "Energi panas menjadi energi kimia", "Energi cahaya matahari menjadi energi listrik", "Energi kimia menjadi energi nuklir"],
    correctAnswer: 2,
    explanation: "Sel fotovoltaik pada panel surya menyerap foton dari cahaya matahari dan melepaskan aliran elektron bebas yang menghasilkan energi listrik arus searah."
  },
  {
    id: 23,
    subjectId: "ipa",
    indicator: "Hukum Kekekalan Energi",
    topic: "Energi",
    question: "Hukum Kekekalan Energi menyatakan bahwa energi...",
    options: ["Dapat diciptakan dari kehampaan namun tidak dapat dimusnahkan", "Dapat dimusnahkan secara total oleh tumbukan partikel", "Hanya ada pada benda yang memiliki suhu sangat tinggi", "Tidak dapat diciptakan dan tidak dapat dimusnahkan, hanya dapat berubah bentuk"],
    correctAnswer: 3,
    explanation: "Hukum Kekekalan Energi menyatakan bahwa energi tidak dapat diciptakan dan tidak dapat dimusnahkan, melainkan hanya berpindah atau bertransformasi ke bentuk energi lain."
  },
  {
    id: 24,
    subjectId: "ipa",
    indicator: "Perubahan bentuk energi pada pembangkit listrik",
    topic: "Energi",
    question: "Pada Pembangkit Listrik Tenaga Air (PLTA), urutan perubahan energi yang terjadi secara berurutan adalah...",
    options: ["Energi potensial air -> energi kinetik turbin -> energi listrik generator", "Energi kimia -> energi panas -> energi listrik", "Energi listrik -> energi potensial -> energi gerak", "Energi nuklir -> energi kinetik -> energi cahaya"],
    correctAnswer: 0,
    explanation: "Ketinggian air bendungan menyimpan energi potensial. Air mengalir memutar turbin (energi kinetik), lalu generator mengonversinya menjadi energi listrik."
  },
  {
    id: 25,
    subjectId: "ipa",
    indicator: "Kelemahan energi fosil",
    topic: "Energi",
    question: "Kelemahan terbesar dari penggunaan batu bara sebagai sumber bahan bakar utama PLTU adalah...",
    options: ["Sulit disimpan dalam wadah terbuka", "Menghasilkan emisi sulfur dioksida dan karbon tinggi serta memicu hujan asam", "Memiliki efisiensi panas yang bernilai nol", "Tidak dapat menghasilkan uap air panas"],
    correctAnswer: 1,
    explanation: "Pembakaran batu bara menghasilkan polutan sulfur dioksida (SO2) penyebab hujan asam, partikel abu beracun, dan emisi gas rumah kaca yang sangat tinggi."
  },
  {
    id: 26,
    subjectId: "ipa",
    indicator: "Energi biomassa",
    topic: "Energi",
    question: "Gas metana yang dihasilkan dari proses fermentasi kotoran ternak atau limbah organik tanpa oksigen disebut...",
    options: ["Gas elpiji", "Minyak jelantah", "Biogas", "Batu bara muda"],
    correctAnswer: 2,
    explanation: "Biogas adalah bahan bakar gas ramah lingkungan yang didapat dari dekomposisi kotoran ternak atau limbah organik oleh mikroba anaerob."
  },
  {
    id: 27,
    subjectId: "ipa",
    indicator: "Energi kinetik benda bergerak",
    topic: "Energi",
    question: "Dua buah mobil A dan B memiliki massa yang sama. Jika mobil B melaju dengan kecepatan dua kali kecepatan mobil A, maka energi kinetik mobil B bernilai...",
    options: ["Sama dengan mobil A", "Dua kali mobil A", "Setengah dari mobil A", "Empat kali mobil A"],
    correctAnswer: 3,
    explanation: "Rumus energi kinetik adalah Ek = 1/2 * m * v kuadrat. Karena kecepatan (v) dikuadratkan, maka dua kali lipat kecepatan menghasilkan 2 kuadrat = 4 kali lipat energi kinetik."
  },
  {
    id: 28,
    subjectId: "ipa",
    indicator: "Konservasi energi listrik",
    topic: "Energi",
    question: "Pemanfaatan lampu LED lebih disarankan dibandingkan lampu pijar konvensional karena...",
    options: ["Lampu LED mengubah sebagian besar energi listrik menjadi cahaya dengan panas terbuang yang minimal", "Lampu LED menghasilkan sinar ultraviolet yang sangat panas", "Lampu LED tidak membutuhkan kabel penghantar", "Lampu LED dapat menyala tanpa sumber arus listrik"],
    correctAnswer: 0,
    explanation: "Lampu LED memiliki efisiensi konversi energi yang jauh lebih tinggi dibanding lampu pijar tradisional, menghemat daya dan menghasilkan panas yang jauh lebih sedikit."
  },
  {
    id: 29,
    subjectId: "ipa",
    indicator: "Energi panas bumi (geotermal)",
    topic: "Energi",
    question: "Indonesia memiliki potensi energi geotermal (panas bumi) yang sangat besar di dunia karena terletak pada jalur...",
    options: ["Khatulistiwa yang beriklim tropis", "Cincin Api Pasifik (Ring of Fire) dengan banyak gunung berapi aktif", "Pertemuan arus samudra kutub selatan", "Lempeng benua yang tidak pernah bergeser"],
    correctAnswer: 1,
    explanation: "Lokasi kepulauan Indonesia di sepanjang sabuk Cincin Api Pasifik (Ring of Fire) menyediakan sumber uap panas bumi dan magma aktif terbesar untuk pembangkit listrik tenaga panas bumi (PLTP)."
  },
  {
    id: 30,
    subjectId: "ipa",
    indicator: "Energi pasang surut air laut",
    topic: "Energi",
    question: "Energi pasang surut (tidal energy) memanfaatkan pergerakan naik turunnya permukaan air laut yang dipengaruhi gaya gravitasi...",
    options: ["Bulan dan Matahari", "Planet Mars dan Venus", "Bintang kutub utara", "Satelit buatan manusia"],
    correctAnswer: 0,
    explanation: "Fenomena pasang surut air laut samudra dipicu oleh tarikan gaya gravitasi Bulan yang kuat dikombinasikan dengan posisi rotasi dan revolusi Matahari terhadap Bumi."
  }
];

const fikihQuestions = [
  // Bab 1 - Thaharah (1-10)
  {
    id: 31,
    subjectId: "fikih",
    indicator: "Memahami pengertian thaharah secara syariat",
    topic: "Thaharah",
    question: "Secara bahasa, kata thaharah memiliki arti bersuci. Sedangkan menurut istilah syariat Islam, thaharah adalah...",
    options: ["Menghilangkan bau badan setelah berolahraga", "Menyucikan badan, pakaian, dan tempat dari najis serta hadats agar ibadah menjadi sah", "Membersihkan debu rumah menggunakan sapu", "Mandi keramas memakai wewangian setiap Jumat"],
    correctAnswer: 1,
    explanation: "Secara syariat, thaharah adalah perbuatan membersihkan diri dari hadats dan menyucikan diri serta pakaian dan tempat dari najis sebagai prasyarat sahnya ibadah seperti salat."
  },
  {
    id: 32,
    subjectId: "fikih",
    indicator: "Menyebutkan rukun wudhu",
    topic: "Thaharah",
    question: "Di antara perbuatan berikut, yang termasuk ke dalam RUKUN wudhu (wajib dikerjakan dan tidak sah jika ditinggalkan) adalah...",
    options: ["Berkumur-kumur tiga kali", "Membaca basmalah di awal wudhu", "Membasuh muka disertai niat", "Mengusap kedua daun telinga"],
    correctAnswer: 2,
    explanation: "Rukun wudhu ada 6: niat bersamaan membasuh muka, membasuh muka, membasuh kedua tangan sampai siku, mengusap sebagian kepala, membasuh kedua kaki sampai mata kaki, dan tertib. Berkumur dan mengusap telinga adalah sunnah wudhu."
  },
  {
    id: 33,
    subjectId: "fikih",
    indicator: "Mengenal sebab diperbolehkannya tayamum",
    topic: "Thaharah",
    question: "Seseorang diperbolehkan mengganti wudhu atau mandi wajib dengan tayamum apabila...",
    options: ["Merasa malas untuk menyentuh air dingin di pagi hari", "Sakit yang dokter menyatakan terkena air akan memperparah lukanya, atau tidak ada air setelah berusaha mencari", "Waktu salat masih sangat panjang dan santai", "Sedang bepergian jarak dekat kurang dari 1 km"],
    correctAnswer: 1,
    explanation: "Tayamum disyariatkan sebagai rukhsah (keringanan) ketika tidak ada air meski sudah berikhtiar mencari, atau karena uzur sakit yang jika terkena air akan berbahaya bagi keselamatan."
  },
  {
    id: 34,
    subjectId: "fikih",
    indicator: "Media untuk tayamum",
    topic: "Thaharah",
    question: "Media suci yang digunakan untuk bertayamum sesuai dengan tuntunan Al-Qur'an adalah...",
    options: ["Debu tanah yang suci dan bersih", "Pasir pantai yang basah oleh air garam", "Serbuk kapur tulis", "Kain sutra yang dicelup minyak wangi"],
    correctAnswer: 0,
    explanation: "Al-Qur'an (QS. An-Nisa: 43) memerintahkan: fa tayammamuu sha'iidan thayyibaa (maka bertayamumlah dengan debu tanah yang suci dan bersih)."
  },
  {
    id: 35,
    subjectId: "fikih",
    indicator: "Hal yang membatalkan wudhu",
    topic: "Thaharah",
    question: "Hal berikut ini yang secara pasti membatalkan wudhu menurut kesepakatan ulama adalah...",
    options: ["Makan makanan yang masih panas", "Minum air es secara berlebihan", "Keluarnya sesuatu dari qubul atau dubur (seperti buang angin atau air kencing)", "Berbicara saat selesai mengambil wudhu"],
    correctAnswer: 2,
    explanation: "Keluarnya segala sesuatu dari dua jalan (qubul atau dubur), baik angin, air kencing, kotoran, atau cairan lainnya, membatalkan wudhu secara ijma."
  },
  {
    id: 36,
    subjectId: "fikih",
    indicator: "Jenis air mutlak",
    topic: "Thaharah",
    question: "Air yang suci dan dapat menyucikan (air mutlak) untuk berwudhu adalah...",
    options: ["Air kelapa muda segar", "Air teh manis dingin", "Air hujan yang belum terkontaminasi najis", "Air sabun mandi berbusa"],
    correctAnswer: 2,
    explanation: "Air mutlak adalah air murni alami dari langit atau bumi yang suci zatnya dan menyucikan yang lain, seperti air hujan, air sumur, air sungai, air laut, dan mata air."
  },
  {
    id: 37,
    subjectId: "fikih",
    indicator: "Najis mukhaffafah dan cara menyucikannya",
    topic: "Thaharah",
    question: "Air kencing bayi laki-laki yang belum makan apapun selain air susu ibu (ASI) tergolong najis mukhaffafah. Cara menyucikannya cukup dengan...",
    options: ["Mencucinya dengan sabun sebanyak tujuh kali", "Memercikkan air bersih secara merata pada tempat yang terkena kencing", "Membuang pakaian yang terkena kencing", "Menjemurnya di bawah terik matahari hingga kering tanpa dicuci"],
    correctAnswer: 1,
    explanation: "Najis mukhaffafah (ringan) cukup disucikan dengan memercikkan air ke seluruh area yang terkena najis hingga rata tanpa harus mengalirkan atau memerasnya."
  },
  {
    id: 38,
    subjectId: "fikih",
    indicator: "Najis mughalladhah",
    topic: "Thaharah",
    question: "Benda yang terkena jilatan anjing atau babi tergolong najis mughalladhah (berat). Syariat memerintahkan untuk membasuhnya sebanyak...",
    options: ["Tiga kali dengan air hangat", "Satu kali menggunakan deterjen", "Tujuh kali basuhan air dan salah satunya dicampur dengan tanah atau debu suci", "Sepuluh kali basuhan air bersih"],
    correctAnswer: 2,
    explanation: "Sesuai hadits Rasulullah saw., bejana atau tempat yang dijilat anjing disucikan dengan membasuhnya tujuh kali, dan salah satu basuhannya dicampur tanah suci."
  },
  {
    id: 39,
    subjectId: "fikih",
    indicator: "Rukun tayamum",
    topic: "Thaharah",
    question: "Anggota tubuh yang diusap dengan debu ketika bertayamum hanyalah...",
    options: ["Kedua telapak kaki dan kepala", "Wajah dan kedua tangan sampai siku", "Seluruh badan dari ujung rambut hingga kaki", "Telinga dan hidung"],
    correctAnswer: 1,
    explanation: "Rukun anggota tayamum hanya mengusap wajah dan mengusap kedua tangan sampai siku disertai niat dan tertib."
  },
  {
    id: 40,
    subjectId: "fikih",
    indicator: "Tidur yang tidak membatalkan wudhu",
    topic: "Thaharah",
    question: "Keadaan tidur yang TIDAK membatalkan wudhu adalah...",
    options: ["Tidur berbaring miring di atas kasur empuk", "Tidur terlentang sambil mendengarkan kajian", "Tidur dalam keadaan duduk yang kokoh pantatnya menetap di lantai tanpa bersandar", "Tidur telungkup di lantai masjid"],
    correctAnswer: 2,
    explanation: "Tidur dengan posisi duduk yang mantap di lantai tidak membatalkan wudhu karena posisinya menutup kemungkinan keluarnya angin tanpa disadari."
  },

  // Bab 2 - Salat (41-50)
  {
    id: 41,
    subjectId: "fikih",
    indicator: "Membedakan rukun salat dan syarat sah salat",
    topic: "Salat",
    question: "Manakah di bawah ini yang merupakan contoh SYARAT SAH salat (harus terpenuhi sebelum salat dimulai)?",
    options: ["Membaca Surat Al-Fatihah", "Takbiratul ihram", "Menutup aurat dan suci dari hadats serta najis", "Melakukan sujud dua kali"],
    correctAnswer: 2,
    explanation: "Syarat sah salat adalah perkara yang wajib dipenuhi sebelum masuk ke dalam salat, seperti suci dari hadats, menutup aurat, menghadap kiblat, dan masuk waktu salat."
  },
  {
    id: 42,
    subjectId: "fikih",
    indicator: "Rukun fi'li dalam salat",
    topic: "Salat",
    question: "Rukun salat yang berupa gerakan fisik anggota tubuh (rukun fi'li) antara lain adalah...",
    options: ["Membaca tahiyyat akhir", "Ruku' dengan thuma'ninah", "Membaca surat Al-Fatihah", "Membaca shalawat atas Nabi saw."],
    correctAnswer: 1,
    explanation: "Ruku' dengan thuma'ninah adalah rukun fi'li (gerakan tubuh nyata). Al-Fatihah dan shalawat tasyahhud akhir adalah rukun qauli (ucapan)."
  },
  {
    id: 43,
    subjectId: "fikih",
    indicator: "Makna thuma'ninah",
    topic: "Salat",
    question: "Istilah thuma'ninah dalam rukun salat memiliki arti...",
    options: ["Membaca doa dengan suara sekeras-kerasnya", "Berhenti sejenak sekadar ukuran membaca subhanallah hingga semua anggota tubuh tenang", "Mempercepat gerakan agar salat cepat selesai", "Menutup mata rapat-rapat saat rukuk"],
    correctAnswer: 1,
    explanation: "Thuma'ninah adalah diam sejenak dalam posisi ruku, iktidal, sujud, dan duduk di antara dua sujud minimal selama membaca satu kali kalimat 'subhanallah'."
  },
  {
    id: 44,
    subjectId: "fikih",
    indicator: "Salat berjamaah dan masbuq",
    topic: "Salat",
    question: "Makmum masbuq dianggap telah mendapatkan satu rakaat salat bersama imam jika ia mendapati imam sedang...",
    options: ["Sujud sahwi", "Duduk tasyahhud akhir", "Ruku' dan makmum sempat ruku' bersama imam dengan thuma'ninah", "Salam yang kedua"],
    correctAnswer: 2,
    explanation: "Batas mendapatkan satu rakaat sempurna bagi makmum masbuq adalah mendapati imam dalam keadaan ruku' dan sempat ikut ruku' dengan thuma'ninah sebelum imam bangkit iktidal."
  },
  {
    id: 45,
    subjectId: "fikih",
    indicator: "Salat jamak dan qashar",
    topic: "Salat",
    question: "Salat fardhu yang boleh di-qashar (diringkas dari 4 rakaat menjadi 2 rakaat) bagi seorang musafir adalah...",
    options: ["Subuh, Dzuhur, dan Isya", "Dzuhur, Ashar, dan Isya", "Maghrib dan Isya", "Subuh dan Ashar"],
    correctAnswer: 1,
    explanation: "Qashar hanya berlaku bagi salat fardhu yang asalnya 4 rakaat, yaitu Dzuhur, Ashar, dan Isya. Salat Subuh (2 rakaat) dan Maghrib (3 rakaat) tidak boleh diqashar."
  },
  {
    id: 46,
    subjectId: "fikih",
    indicator: "Salat sunnah rawatib mu'akkad",
    topic: "Salat",
    question: "Salat sunnah yang sangat dianjurkan dan tidak pernah ditinggalkan Rasulullah saw. bahkan saat bepergian jauh adalah...",
    options: ["Dua rakaat fajar (sebelum Subuh)", "Empat rakaat sebelum Maghrib", "Dua rakaat setelah Ashar", "Enam rakaat saat Dzuhur"],
    correctAnswer: 0,
    explanation: "Dua rakaat sebelum Subuh (salat sunnah fajar) memiliki keutamaan luar biasa, yaitu lebih baik daripada dunia beserta seluruh isinya."
  },
  {
    id: 47,
    subjectId: "fikih",
    indicator: "Sujud Sahwi",
    topic: "Salat",
    question: "Sujud sahwi dilakukan oleh orang yang salat karena sebab...",
    options: ["Melihat teman tersenyum di shaf sebelah", "Lupa atau ragu-ragu terhadap jumlah rakaat atau meninggalkan sunnah ab'adh", "Merasa pakaiannya terlalu longgar", "Mendengar suara gemuruh petir"],
    correctAnswer: 1,
    explanation: "Sujud sahwi (dua sujud sebelum atau sesudah salam) disyariatkan apabila terjadi kelupaan jumlah rakaat atau tidak sengaja meninggalkan sunnah ab'adh seperti tasyahud awal."
  },
  {
    id: 48,
    subjectId: "fikih",
    indicator: "Batas aurat laki-laki dalam salat",
    topic: "Salat",
    question: "Batas aurat minimal bagi laki-laki muslim saat melaksanakan salat adalah...",
    options: ["Seluruh tubuh kecuali muka", "Antara pusar sampai dengan lutut", "Dada sampai pergelangan kaki", "Hanya bagian punggung dan pundak"],
    correctAnswer: 1,
    explanation: "Aurat laki-laki dalam salat menurut mayoritas fuqaha adalah daerah antara pusar hingga lutut, dan dianjurkan memakai pakaian sopan yang menutup bahu."
  },
  {
    id: 49,
    subjectId: "fikih",
    indicator: "Sebab batalnya salat",
    topic: "Salat",
    question: "Hal berikut ini yang dapat membatalkan salat secara langsung adalah...",
    options: ["Menguap tanpa sengaja sambil menutup mulut", "Berbicara dengan sengaja yang bukan bacaan salat sebanyak dua huruf atau lebih", "Melirik sedikit dengan ekor mata tanpa memalingkan dada", "Menangis karena meresapi makna ayat suci Al-Qur'an"],
    correctAnswer: 1,
    explanation: "Berbicara perkataan biasa dengan sengaja membatalkan salat. Sedangkan tangisan karena khusyuk dan takut kepada Allah tidak membatalkan salat."
  },
  {
    id: 50,
    subjectId: "fikih",
    indicator: "Tertib dalam rukun salat",
    topic: "Salat",
    question: "Rukun salat yang terakhir adalah tertib, yang berarti...",
    options: ["Membaca doa dengan suara merdu", "Melakukan rukun-rukun salat secara berurutan sesuai tuntunan syariat", "Menyelesaikan salat dalam waktu kilat", "Berdiri di barisan shaf paling depan"],
    correctAnswer: 1,
    explanation: "Tertib artinya menjalankan setiap rukun salat secara berurutan (misalnya ruku' harus mendahului iktidal dan sujud, tidak boleh ditukar posisinya)."
  },

  // Bab 3 - Zakat & Puasa (51-60)
  {
    id: 51,
    subjectId: "fikih",
    indicator: "Waktu pembayaran zakat fitrah",
    topic: "Zakat & Puasa",
    question: "Waktu yang paling afdhal (utama) untuk mengeluarkan zakat fitrah adalah...",
    options: ["Pada awal malam pertama bulan Ramadhan", "Setelah khatam tadarus Al-Qur'an di masjid", "Setelah fajar terbit di hari raya Idul Fitri hingga sebelum salat Idul Fitri dilaksanakan", "Pada siang hari setelah salat Idul Fitri selesai"],
    correctAnswer: 2,
    explanation: "Waktu paling utama pembayaran zakat fitrah adalah sejak fajar hari raya Idul Fitri hingga sesaat sebelum salat Idul Fitri dimulai."
  },
  {
    id: 52,
    subjectId: "fikih",
    indicator: "Nisab dan haul zakat mal",
    topic: "Zakat & Puasa",
    question: "Ketentuan harta yang wajib dikeluarkan zakat malnya harus mencapai batas minimal yang disebut...",
    options: ["Nisab", "Haul", "Kafarat", "Fidyah"],
    correctAnswer: 0,
    explanation: "Nisab adalah batas minimal kepemilikan harta yang terkena kewajiban zakat mal, sedangkan haul adalah masa kepemilikan genap satu tahun."
  },
  {
    id: 53,
    subjectId: "fikih",
    indicator: "Mustahiq zakat (8 asnaf)",
    topic: "Zakat & Puasa",
    question: "Orang yang memiliki banyak hutang untuk mencukupi kebutuhan pokok yang halal dan tidak mampu melunasinya disebut...",
    options: ["Amil", "Muallaf", "Gharimin", "Ibnu Sabil"],
    correctAnswer: 2,
    explanation: "Gharimin adalah orang yang terlilit hutang untuk keperluan mubah/halal dan tidak mampu membayarnya; termasuk salah satu dari delapan asnaf penerima zakat."
  },
  {
    id: 54,
    subjectId: "fikih",
    indicator: "Rukun puasa Ramadhan",
    topic: "Zakat & Puasa",
    question: "Rukun puasa terdiri atas dua perkara pokok, yaitu...",
    options: ["Makan sahur dan berbuka dengan buah manis", "Niat di malam hari dan menahan diri dari segala pembatal puasa dari terbit fajar hingga terbenam matahari", "Mandi wajib di pagi hari dan iktikaf", "Salat tarawih 20 rakaat dan sedekah"],
    correctAnswer: 1,
    explanation: "Rukun puasa ada dua: berniat pada malam hari sebelum fajar terbit (tabyit an-niyyah) dan menahan diri (imsak) dari segala pembatal puasa dari fajar shadiq hingga terbenam matahari."
  },
  {
    id: 55,
    subjectId: "fikih",
    indicator: "Hal yang membatalkan puasa",
    topic: "Zakat & Puasa",
    question: "Berikut ini yang secara syariat membatalkan puasa seseorang adalah...",
    options: ["Muntah dengan sengaja", "Mandi di siang hari untuk menyegarkan badan", "Memakai obat tetes mata", "Tidur nyenyak dari dhuhur hingga menjelang maghrib"],
    correctAnswer: 0,
    explanation: "Muntah yang disengaja membatalkan puasa. Jika muntah terjadi tanpa sengaja karena sakit mual, maka puasanya tetap sah dan diteruskan."
  },
  {
    id: 56,
    subjectId: "fikih",
    indicator: "Keringanan tidak berpuasa (Fidyah)",
    topic: "Zakat & Puasa",
    question: "Orang yang sudah tua renta (jompo) dan tidak mampu lagi berpuasa diberikan keringanan untuk tidak puasa dan wajib menggantinya dengan...",
    options: ["Membayar fidyah berupa memberi makan satu orang miskin untuk setiap hari yang ditinggalkan", "Melakukan puasa pengganti di bulan Syawal", "Menyembelih seekor kambing", "Mengqadha puasa pada saat cuaca dingin"],
    correctAnswer: 0,
    explanation: "Orang tua renta dan orang sakit yang tidak ada harapan sembuh diperbolehkan tidak berpuasa dan menggantinya dengan membayar fidyah kepada fakir miskin."
  },
  {
    id: 57,
    subjectId: "fikih",
    indicator: "Besaran zakat fitrah",
    topic: "Zakat & Puasa",
    question: "Besaran zakat fitrah per jiwa yang wajib dikeluarkan menggunakan makanan pokok (seperti beras di Indonesia) adalah setara dengan...",
    options: ["1 kg beras", "2,5 kg atau 3,5 liter beras", "5 kg beras", "10 liter beras"],
    correctAnswer: 1,
    explanation: "Besaran zakat fitrah adalah 1 sha' gandum/kurma, yang dikonversikan oleh BAZNAS dan MUI menjadi 2,5 kg atau 3,5 liter beras makanan pokok per orang."
  },
  {
    id: 58,
    subjectId: "fikih",
    indicator: "Kafarat sengaja berhubungan suami istri di siang Ramadhan",
    topic: "Zakat & Puasa",
    question: "Kafarat uzma bagi orang yang sengaja merusak kehormatan puasa Ramadhan dengan berhubungan suami istri adalah berurutan...",
    options: ["Membayar uang denda kepada pengadilan", "Memerdekakan budak, atau puasa dua bulan berturut-turut, atau memberi makan 60 orang miskin", "Menyerahkan seluruh hewan ternaknya", "Berjalan kaki menuju tanah suci"],
    correctAnswer: 1,
    explanation: "Tingkatan kafarat uzma: memerdekakan budak; jika tak sanggup, berpuasa dua bulan berturut-turut; jika tak sanggup, memberi makan 60 orang fakir miskin."
  },
  {
    id: 59,
    subjectId: "fikih",
    indicator: "Hari yang diharamkan berpuasa",
    topic: "Zakat & Puasa",
    question: "Umat Islam diharamkan secara syariat untuk berpuasa pada...",
    options: ["Hari Senin dan Kamis", "Dua hari raya (Idul Fitri dan Idul Adha) serta hari Tasyrik (11, 12, 13 Dzulhijjah)", "Hari Asyura tanggal 10 Muharram", "Sepuluh hari pertama bulan Dzulhijjah"],
    correctAnswer: 1,
    explanation: "Hari yang diharamkan berpuasa dalam Islam adalah 1 Syawal (Idul Fitri), 10 Dzulhijjah (Idul Adha), dan hari-hari Tasyrik (11, 12, 13 Dzulhijjah)."
  },
  {
    id: 60,
    subjectId: "fikih",
    indicator: "Hikmah berzakat",
    topic: "Zakat & Puasa",
    question: "Salah satu hikmah sosial dari disyariatkannya zakat dalam kehidupan bermasyarakat adalah...",
    options: ["Membuat orang kaya dipuja masyarakat", "Mengurangi kesenjangan ekonomi dan menumbuhkan kasih sayang terhadap kaum dhuafa", "Menghapus seluruh kewajiban berusaha mandiri", "Menjadikan muzakki berkuasa atas mustahiq"],
    correctAnswer: 1,
    explanation: "Zakat menyucikan jiwa dan harta muzakki, sekaligus memperkecil kesenjangan ekonomi dan mempererat tali persaudaraan sosial antara kaum mampu dan dhuafa."
  }
];

const pknQuestions = [
  // Bab 1 - Peraturan Perundang-undangan (1-10)
  {
    id: 61,
    subjectId: "pkn",
    indicator: "Hierarki peraturan perundang-undangan di Indonesia",
    topic: "Peraturan Perundang-undangan",
    question: "Menurut UU No. 12 Tahun 2011, peraturan yang menempati hierarki tertinggi dalam sistem hukum Republik Indonesia adalah...",
    options: ["Ketetapan MPR", "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945", "Peraturan Pemerintah", "Undang-Undang / Perppu"],
    correctAnswer: 1,
    explanation: "UUD NRI Tahun 1945 merupakan hukum dasar tertulis tertinggi di Indonesia yang menjadi landasan dan sumber bagi semua peraturan perundang-undangan di bawahnya."
  },
  {
    id: 62,
    subjectId: "pkn",
    indicator: "Asas hierarki hukum (Lex Superior)",
    topic: "Peraturan Perundang-undangan",
    question: "Asas hukum yang menyatakan bahwa peraturan perundang-undangan yang lebih rendah tidak boleh bertentangan dengan peraturan yang lebih tinggi di atasnya adalah...",
    options: ["Lex posterior derogat legi priori", "Lex specialis derogat legi generali", "Lex superior derogat legi inferiori", "Pacta sunt servanda"],
    correctAnswer: 2,
    explanation: "Lex superior derogat legi inferiori adalah asas hukum fundamental bahwa peraturan yang derajatnya lebih tinggi mengalahkan dan membatalkan peraturan yang lebih rendah jika bertentangan."
  },
  {
    id: 63,
    subjectId: "pkn",
    indicator: "Lembaga pembuat Undang-Undang",
    topic: "Peraturan Perundang-undangan",
    question: "Undang-Undang (UU) dibentuk oleh Dewan Perwakilan Rakyat (DPR) dengan persetujuan bersama...",
    options: ["Presiden", "Mahkamah Agung", "Mahkamah Konstitusi", "Dewan Perwakilan Daerah"],
    correctAnswer: 0,
    explanation: "Berdasarkan Pasal 20 ayat (2) UUD 1945, setiap rancangan undang-undang dibahas oleh DPR dan Presiden untuk mendapatkan persetujuan bersama sebelum disahkan."
  },
  {
    id: 64,
    subjectId: "pkn",
    indicator: "Uji materiil undang-undang (Judicial Review)",
    topic: "Peraturan Perundang-undangan",
    question: "Lembaga peradilan di Indonesia yang memiliki wewenang untuk menguji kesesuaian undang-undang terhadap UUD 1945 adalah...",
    options: ["Komisi Yudisial", "Kejaksaan Agung", "Mahkamah Agung", "Mahkamah Konstitusi"],
    correctAnswer: 3,
    explanation: "Mahkamah Konstitusi (MK) berwenang menguji materi undang-undang terhadap Undang-Undang Dasar 1945. Sementara Mahkamah Agung berwenang menguji peraturan di bawah undang-undang terhadap undang-undang."
  },
  {
    id: 65,
    subjectId: "pkn",
    indicator: "Peraturan Pemerintah Pengganti Undang-Undang (Perppu)",
    topic: "Peraturan Perundang-undangan",
    question: "Presiden berhak mengeluarkan Peraturan Pemerintah Pengganti Undang-Undang (Perppu) apabila terjadi keadaan...",
    options: ["Kegentingan yang memaksa", "Keinginan sebagian anggota dewan", "Pergantian susunan menteri kabinet", "Masa libur sidang parlemen"],
    correctAnswer: 0,
    explanation: "Pasal 22 ayat (1) UUD 1945 menyebutkan bahwa dalam hal ikhwal kegentingan yang memaksa, Presiden berhak menetapkan Peraturan Pemerintah sebagai Pengganti Undang-Undang (Perppu)."
  },
  {
    id: 66,
    subjectId: "pkn",
    indicator: "Fungsi hukum dalam masyarakat",
    topic: "Peraturan Perundang-undangan",
    question: "Salah satu fungsi utama peraturan perundang-undangan dalam kehidupan berbangsa dan bernegara adalah...",
    options: ["Membatasi hak warga negara untuk menuntut ilmu", "Menciptakan kepastian hukum, ketertiban, dan keadilan sosial bagi seluruh rakyat", "Memperkaya para pejabat pembuat regulasi", "Menghapus tradisi budaya lokal yang ada"],
    correctAnswer: 1,
    explanation: "Hukum dan peraturan berfungsi sebagai pedoman bertindak dan pengendali sosial guna mewujudkan kepastian hukum, ketertiban umum, serta keadilan sosial."
  },
  {
    id: 67,
    subjectId: "pkn",
    indicator: "Kewenangan Peraturan Daerah (Perda)",
    topic: "Peraturan Perundang-undangan",
    question: "Peraturan Daerah Provinsi dibentuk oleh Dewan Perwakilan Rakyat Daerah (DPRD) Provinsi bersama dengan...",
    options: ["Bupati atau Walikota", "Gubernur", "Menteri Dalam Negeri", "Jaksa Agung"],
    correctAnswer: 1,
    explanation: "Perda Provinsi dibentuk oleh DPRD Provinsi dengan persetujuan bersama Gubernur selaku kepala daerah provinsi."
  },
  {
    id: 68,
    subjectId: "pkn",
    indicator: "Sikap taat hukum",
    topic: "Peraturan Perundang-undangan",
    question: "Contoh sikap patuh terhadap peraturan perundang-undangan yang relevan bagi pelajar adalah...",
    options: ["Membuang sampah plastik di laci meja kelas", "Menggunakan helm SNI dan memiliki SIM ketika mengendarai motor", "Datang terlambat saat upacara bendera hari Senin", "Mencontek jawaban tugas teman saat ujian"],
    correctAnswer: 1,
    explanation: "Menggunakan helm berstandar SNI dan memiliki SIM saat berkendara di jalan raya merupakan wujud nyata kepatuhan hukum undang-undang lalu lintas."
  },
  {
    id: 69,
    subjectId: "pkn",
    indicator: "Pengundangan peraturan",
    topic: "Peraturan Perundang-undangan",
    question: "Agar setiap orang mengetahuinya secara sah, undang-undang harus diundangkan dengan penempatannya dalam...",
    options: ["Koran harian nasional", "Lembaran Negara Republik Indonesia", "Papan pengumuman kantor pos", "Majalah dinding kantor kelurahan"],
    correctAnswer: 1,
    explanation: "Setiap undang-undang yang telah disahkan harus diundangkan dalam Lembaran Negara Republik Indonesia agar memiliki kekuatan hukum mengikat secara publik."
  },
  {
    id: 70,
    subjectId: "pkn",
    indicator: "Norma hukum dibandingkan norma lain",
    topic: "Peraturan Perundang-undangan",
    question: "Ciri khas norma hukum yang membedakannya dengan norma kesopanan dan kesusilaan adalah...",
    options: ["Sifatnya mengikat dan sanksinya tegas serta dapat dipaksakan oleh aparat negara berwenang", "Hanya berlaku untuk kelompok orang tertentu", "Tidak pernah tertulis dan mudah berganti", "Hanya berlaku di lingkungan keluarga"],
    correctAnswer: 0,
    explanation: "Norma hukum bersifat memaksa (imperatif) dengan sanksi nyata dan tegas yang ditegakkan secara resmi oleh aparat penegak hukum negara."
  },

  // Bab 2 - Sumpah Pemuda & Kebangkitan Nasional (71-80)
  {
    id: 71,
    subjectId: "pkn",
    indicator: "Lahirnya Kebangkitan Nasional",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Hari Kebangkitan Nasional yang diperingati setiap tanggal 20 Mei bertepatan dengan berdirinya organisasi pergerakan modern pertama yaitu...",
    options: ["Sarekat Islam", "Indische Partij", "Budi Utomo", "Perhimpunan Indonesia"],
    correctAnswer: 2,
    explanation: "Organisasi Budi Utomo didirikan oleh dr. Soetomo dan para pelajar STOVIA pada 20 Mei 1908 atas prakarsa dr. Wahidin Soedirohoesodo, yang menjadi tonggak Hari Kebangkitan Nasional."
  },
  {
    id: 72,
    subjectId: "pkn",
    indicator: "Pelaksanaan Kongres Pemuda II",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Ikrar Sumpah Pemuda dibacakan pada penutupan Kongres Pemuda II yang berlangsung di Jakarta pada tanggal...",
    options: ["17 Agustus 1945", "28 Oktober 1928", "1 Juni 1945", "10 November 1945"],
    correctAnswer: 1,
    explanation: "Kongres Pemuda II berlangsung pada tanggal 27-28 Oktober 1928 di Batavia (Jakarta) dan melahirkan ikrar persatuan bangsa yaitu Sumpah Pemuda pada 28 Oktober 1928."
  },
  {
    id: 73,
    subjectId: "pkn",
    indicator: "Ketua Kongres Pemuda II",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Tokoh pemuda yang memimpin jalannya Kongres Pemuda II sebagai Ketua Kongres adalah...",
    options: ["Sugondo Djojopuspito", "Mohammad Yamin", "Wage Rudolf Soepratman", "Soekarno"],
    correctAnswer: 0,
    explanation: "Sugondo Djojopuspito dari Perhimpunan Pelajar-Pelajar Indonesia (PPPI) memimpin Kongres Pemuda II dengan penuh wibawa hingga melahirkan keputusan bersejarah."
  },
  {
    id: 74,
    subjectId: "pkn",
    indicator: "Perumus Teks Sumpah Pemuda",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Tokoh sekretaris kongres yang merumuskan teks Ikrar Sumpah Pemuda pada secarik kertas adalah...",
    options: ["Chairil Anwar", "Mohammad Hatta", "Mohammad Yamin", "Amir Sjarifoeddin"],
    correctAnswer: 2,
    explanation: "Mohammad Yamin merumuskan naskah Sumpah Pemuda dalam secarik kertas yang kemudian diserahkan kepada Sugondo Djojopuspito dan disetujui bersama oleh seluruh peserta kongres."
  },
  {
    id: 75,
    subjectId: "pkn",
    indicator: "Lagu Kebangsaan Indonesia Raya pertama kali dikumandangkan",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Pada peristiwa Sumpah Pemuda 1928, lagu Indonesia Raya pertama kali diperdengarkan oleh W.R. Soepratman menggunakan instrumen...",
    options: ["Piano akustik", "Biola", "Gitar spanyol", "Terompet kuningan"],
    correctAnswer: 1,
    explanation: "W.R. Soepratman memainkan lagu Indonesia Raya secara instrumental dengan gesekan biolanya di hadapan kongres tanpa lirik untuk menghindari sensor intelijen Belanda."
  },
  {
    id: 76,
    subjectId: "pkn",
    indicator: "Isi Ikrar Sumpah Pemuda",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Inti dari ikrar ketiga Sumpah Pemuda menegaskan komitmen untuk menjunjung bahasa persatuan yaitu...",
    options: ["Bahasa Sansekerta", "Bahasa Kawi", "Bahasa Indonesia", "Bahasa Melayu Tradisional"],
    correctAnswer: 2,
    explanation: "Ikrar ketiga berbunyi: 'Kami putra dan putri Indonesia, menjunjung bahasa persatuan, bahasa Indonesia.' Ini mengangkat martabat bangsa menjadi satu kesatuan komunikasi nasional."
  },
  {
    id: 77,
    subjectId: "pkn",
    indicator: "Pergeseran paradigma perjuangan",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Perbedaan mendasar antara perjuangan bangsa sebelum 1908 dengan setelah 1908 adalah...",
    options: ["Sebelum 1908 sudah bersatu, setelah 1908 terpecah-pecah", "Sebelum 1908 bersifat kedaerahan dan bergantung figur, setelah 1908 bersifat nasional dan terorganisir", "Sebelum 1908 menggunakan diplomasi politik internasional", "Sebelum 1908 dipimpin oleh kaum cendekiawan universitas"],
    correctAnswer: 1,
    explanation: "Perjuangan sebelum 1908 bersifat kedaerahan fisik, sedangkan setelah 1908 menggunakan wadah organisasi modern, dipelopori kaum terpelajar, dan berorientasi persatuan Indonesia."
  },
  {
    id: 78,
    subjectId: "pkn",
    indicator: "Nilai kejuangan Sumpah Pemuda",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Sikap yang mencerminkan pengamalan nilai persatuan Sumpah Pemuda di masa kini adalah...",
    options: ["Membanggakan suku sendiri dan memandang rendah suku lain", "Menghargai keberagaman budaya teman dan rukun bertoleransi", "Membanggakan bahasa asing serta meremehkan bahasa Indonesia", "Membuat kelompok eksklusif berdasarkan kedaerahan"],
    correctAnswer: 1,
    explanation: "Menghargai keberagaman, berteman dengan siapa saja tanpa diskriminasi suku/agama, serta mencintai bahasa Indonesia adalah cerminan sejati nilai Sumpah Pemuda."
  },
  {
    id: 79,
    subjectId: "pkn",
    indicator: "Arti penting Tri Koro Dharmo",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Organisasi pemuda kedaerahan Tri Koro Dharmo yang berdiri tahun 1915 kemudian berganti nama menjadi...",
    options: ["Jong Java", "Jong Sumatranen Bond", "Jong Ambon", "Jong Celebes"],
    correctAnswer: 0,
    explanation: "Tri Koro Dharmo (Tiga Tujuan Mulia) didirikan tahun 1915 oleh R. Satiman Wirjosandjojo dkk. dan kemudian berganti nama menjadi Jong Java pada tahun 1918."
  },
  {
    id: 80,
    subjectId: "pkn",
    indicator: "Makna Satu Tumpah Darah",
    topic: "Sumpah Pemuda & Kebangkitan Nasional",
    question: "Pernyataan 'Satu Tumpah Darah, Tanah Air Indonesia' dalam ikrar Sumpah Pemuda menegaskan kesadaran bahwa...",
    options: ["Pulau Jawa adalah pusat segalanya", "Seluruh kepulauan Nusantara dari Sabang sampai Merauke merupakan satu kesatuan geopolitik tanah air yang utuh", "Wilayah kepulauan harus dipisah-pisahkan", "Hanya daerah daratan yang berharga"],
    correctAnswer: 1,
    explanation: "Ikrar satu tumpah darah menegaskan bahwa seluruh daratan dan lautan Nusantara adalah satu kesatuan kedaulatan tanah air yang harus dijaga bersama."
  },

  // Bab 3 - Bhinneka Tunggal Ika (81-90)
  {
    id: 81,
    subjectId: "pkn",
    indicator: "Asal usul semboyan Bhinneka Tunggal Ika",
    topic: "Bhinneka Tunggal Ika",
    question: "Semboyan 'Bhinneka Tunggal Ika' diambil dari karya sastra Empu Tantular pada zaman Kerajaan Majapahit, yaitu kitab...",
    options: ["Negarakertagama", "Kakawin Sutasoma", "Pararaton", "Arjunawiwaha"],
    correctAnswer: 1,
    explanation: "Semboyan Bhinneka Tunggal Ika tercantum dalam Kakawin Sutasoma pupuh 139 bait 5 karya Empu Tantular pada era keemasan Majapahit."
  },
  {
    id: 82,
    subjectId: "pkn",
    indicator: "Makna harfiah Bhinneka Tunggal Ika",
    topic: "Bhinneka Tunggal Ika",
    question: "Arti dari semboyan 'Bhinneka Tunggal Ika, Tan Hana Dharma Mangrwa' secara utuh adalah...",
    options: ["Bersatu kita teguh bercerai kita runtuh", "Berbeda-beda tetapi tetap satu jua, tiada kebenaran yang mendua", "Kemenangan diperoleh dari persaingan", "Kekuasaan sejati ada di tangan penguasa"],
    correctAnswer: 1,
    explanation: "Bhinneka Tunggal Ika bermakna berbeda-beda tetapi hakikatnya tetap satu, dan 'Tan Hana Dharma Mangrwa' berarti tiada kebenaran yang mendua dalam pengabdian kepada Tuhan."
  },
  {
    id: 83,
    subjectId: "pkn",
    indicator: "Hakikat Gotong Royong",
    topic: "Bhinneka Tunggal Ika",
    question: "Gotong royong merupakan ciri khas kepribadian bangsa Indonesia yang mengandung nilai luhur...",
    options: ["Individualisme dan persaingan bebas", "Kebersamaan, kekeluargaan, dan tolong-menolong tanpa pamrih", "Paksaan bekerja tanpa istirahat", "Pembayaran upah secara komersial"],
    correctAnswer: 1,
    explanation: "Gotong royong berakar pada nilai ketulusan tolong-menolong, solidaritas sosial, dan rasa kekeluargaan untuk mencapai kesejahteraan bersama."
  },
  {
    id: 84,
    subjectId: "pkn",
    indicator: "Sikap toleransi dalam keberagaman",
    topic: "Bhinneka Tunggal Ika",
    question: "Perilaku yang menunjukkan toleransi antarumat beragama dalam kehidupan sehari-hari adalah...",
    options: ["Mengikuti ibadah ritual agama lain", "Memberikan rasa aman dan saling menghormati saat pemeluk agama lain beribadah", "Memaksa kawan memeluk ajaran agama kita", "Menutup diri dari pergaulan dengan orang berbeda keyakinan"],
    correctAnswer: 1,
    explanation: "Toleransi beragama tercermin dari sikap menghormati hak beribadah orang lain, menjaga kerukunan, dan tidak memaksakan keyakinan pribadi."
  },
  {
    id: 85,
    subjectId: "pkn",
    indicator: "Istilah kearifan lokal gotong royong di daerah",
    topic: "Bhinneka Tunggal Ika",
    question: "Istilah kearifan lokal tradisi gotong royong dalam masyarakat Sunda di Jawa Barat dikenal dengan sebutan...",
    options: ["Gugur Gunung", "Subak", "Rambu Solo", "Rereongan"],
    correctAnswer: 3,
    explanation: "Rereongan adalah tradisi gotong royong saling membantu dalam masyarakat Sunda. Gugur Gunung di Jawa Tengah/Yogyakarta, Subak di Bali, dan Rambu Solo upacara Toraja."
  },
  {
    id: 86,
    subjectId: "pkn",
    indicator: "Landasan konstitusional persatuan Indonesia",
    topic: "Bhinneka Tunggal Ika",
    question: "Sila dalam Pancasila yang menjadi landasan utama persatuan dan kesatuan di tengah kemajemukan bangsa Indonesia adalah...",
    options: ["Sila Pertama", "Sila Kedua", "Sila Ketiga (Persatuan Indonesia)", "Sila Kelima"],
    correctAnswer: 2,
    explanation: "Sila ke-3 'Persatuan Indonesia' berlambangkan Pohon Beringin yang menaungi seluruh keragaman suku bangsa di bawah naungan NKRI."
  },
  {
    id: 87,
    subjectId: "pkn",
    indicator: "Faktor pembentuk keberagaman di Indonesia",
    topic: "Bhinneka Tunggal Ika",
    question: "Kondisi geografis Indonesia sebagai negara kepulauan yang terletak di jalur silang perdagangan internasional menyebabkan...",
    options: ["Masyarakat Indonesia seragam tanpa perbedaan budaya", "Terbentuknya keragaman suku, bahasa daerah, adat istiadat, dan agama", "Mata pencaharian seluruh penduduk identik", "Terputusnya komunikasi antarpulau"],
    correctAnswer: 1,
    explanation: "Posisi silang strategis dan kondisi ribuan pulau menciptakan interaksi dengan berbagai peradaban dunia, membentuk kekayaan suku, bahasa, dan budaya Indonesia."
  },
  {
    id: 88,
    subjectId: "pkn",
    indicator: "Ancaman etnosentrisme",
    topic: "Bhinneka Tunggal Ika",
    question: "Sikap memandang kebudayaan sukunya sendiri jauh lebih unggul dan merendahkan kebudayaan suku bangsa lain disebut...",
    options: ["Etnosentrisme", "Nasionalisme", "Patriotisme", "Pluralisme"],
    correctAnswer: 0,
    explanation: "Etnosentrisme adalah sikap fanatisme sempit yang mengagungkan budayanya sendiri secara berlebihan dan meremehkan budaya suku lain."
  },
  {
    id: 89,
    subjectId: "pkn",
    indicator: "Bela Negara dalam konteks pelajar",
    topic: "Bhinneka Tunggal Ika",
    question: "Wujud nyata upaya bela negara yang dapat diamalkan oleh seorang siswa dalam kehidupan sehari-hari adalah...",
    options: ["Membeli senjata tajam untuk berjaga-jaga", "Belajar dengan tekun, berprestasi, serta menjaga kerukunan antarteman", "Mengikuti aksi demonstrasi anarkis di jalanan", "Menolak mempelajari mata pelajaran sejarah"],
    correctAnswer: 1,
    explanation: "Bela negara bagi pelajar diwujudkan lewat kedisiplinan belajar, berakhlak mulia, berprestasi, mencintai tanah air, dan menjaga persatuan lingkungan sekolah."
  },
  {
    id: 90,
    subjectId: "pkn",
    indicator: "Prinsip integrasi nasional",
    topic: "Bhinneka Tunggal Ika",
    question: "Prinsip Bhinneka Tunggal Ika mengajarkan bahwa perbedaan suku dan budaya di Indonesia hendaknya dipandang sebagai...",
    options: ["Sumber kelemahan dan perpecahan nasional", "Beban sosial yang menghambat pembangunan", "Kekayaan dan aset peradaban bangsa yang saling melengkapi", "Hambatan menuju kemajuan peradaban"],
    correctAnswer: 2,
    explanation: "Kemajemukan dan keberagaman adalah anugerah terindah serta kekuatan pemersatu peradaban yang memperkaya identitas nasional Indonesia di mata dunia."
  }
];

// Write ipa.ts
const ipaContent = `import { Question } from "../types";\n\nexport const questionsIpa: Question[] = ` + JSON.stringify(ipaQuestions, null, 2) + `;\n`;
fs.writeFileSync(path.join(process.cwd(), "src/data/ipa.ts"), ipaContent, "utf8");

// Write fikih.ts
const fikihContent = `import { Question } from "../types";\n\nexport const questionsFikih: Question[] = ` + JSON.stringify(fikihQuestions, null, 2) + `;\n`;
fs.writeFileSync(path.join(process.cwd(), "src/data/fikih.ts"), fikihContent, "utf8");

// Write pkn.ts
const pknContent = `import { Question } from "../types";\n\nexport const questionsPkn: Question[] = ` + JSON.stringify(pknQuestions, null, 2) + `;\n`;
fs.writeFileSync(path.join(process.cwd(), "src/data/pkn.ts"), pknContent, "utf8");

console.log("SEEDED ALL QUESTIONS SUCCESSFULLY!");
