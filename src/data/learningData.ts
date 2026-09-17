import { SubMaterial } from '../types';

export const SUB_MATERIALS: SubMaterial[] = [
  {
    id: 'sub-1',
    nomor: 1,
    judul: 'Keseimbangan Ekosistem & Daya Dukung',
    subJudul: 'Interaksi Komponen Biotik-Abiotik dan Daya Lenting Lingkungan Hidup',
    estimasiWaktu: '45 Menit',
    ringkasan: 'Pelajari bagaimana makhluk hidup dan lingkungannya saling berinteraksi, apa itu daya dukung lingkungan, serta apa yang terjadi ketika keseimbangan tersebut terganggu.',
    iconName: 'Trees',
    warnaTema: 'emerald',
    teksMateri: [
      {
        bagian: '1. Konsep Dasar Ekosistem & Lingkungan',
        paragraf: [
          'Lingkungan hidup adalah kesatuan ruang dengan semua benda, daya, keadaan, dan makhluk hidup, termasuk manusia dan perilakunya, yang mempengaruhi kelangsungan perikehidupan dan kesejahteraan manusia serta makhluk hidup lain.',
          'Dalam suatu ekosistem, terdapat dua komponen utama: komponen biotik (makhluk hidup seperti tumbuhan, hewan, dan mikroorganisme) dan komponen abiotik (benda tak hidup seperti air, tanah, udara, cahaya matahari, dan suhu).'
        ],
        poinPenting: [
          'Produsen: Tumbuhan hijau yang menghasilkan energi melalui fotosintesis.',
          'Konsumen: Organisme yang memperoleh energi dengan memakan makhluk hidup lain.',
          'Dekomposer: Pengurai (bakteri dan jamur) yang mengembalikan nutrisi ke tanah.'
        ],
        faktaMenarik: 'Satu pohon rindang dewasa dapat menghasilkan oksigen bersih yang cukup untuk kebutuhan bernapas 4 orang manusia setiap harinya!'
      },
      {
        bagian: '2. Keseimbangan Lingkungan & Daya Lenting',
        paragraf: [
          'Keseimbangan lingkungan dapat terwujud apabila terjadi keselarasan dan kestabilan antara komponen biotik dan abiotik. Perubahan pada salah satu komponen akan memicu penyesuaian pada komponen lainnya.',
          'Daya dukung lingkungan (carrying capacity) adalah kemampuan lingkungan hidup untuk mendukung perikehidupan manusia dan makhluk hidup lain. Sedangkan daya lenting adalah kemampuan lingkungan untuk pulih kembali ke keadaan seimbang setelah mengalami gangguan alami maupun aktivitas manusia.'
        ],
        poinPenting: [
          'Jika gangguan melampaui daya lentingnya, lingkungan akan mengalami degradasi atau kerusakan permanen.',
          'Aktivitas manusia seperti alih fungsi hutan menjadi pemukiman secara berlebihan dapat merusak keseimbangan rantai makanan.'
        ]
      }
    ],
    video: {
      judul: 'Edukasi Ekosistem & Keseimbangan Alam',
      deskripsi: 'Video pembelajaran interaktif yang memvisualisasikan bagaimana aliran energi dan jaring-jaring makanan menjaga kestabilan bumi kita.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/bJEToQ49Yjc',
      catatanPenting: [
        'Perubahan kecil pada populasi predator dapat menyebabkan ledakan populasi hama.',
        'Hutan bertindak sebagai paru-paru dunia sekaligus spons penyimpan air tanah alami.',
        'Menjaga keanekaragaman hayati adalah kunci ketahanan pangan dan kestabilan ekologis.'
      ]
    },
    jenisSimulasi: 'ekosistem',
    penugasan: {
      id: 'tugas-sub-1',
      subMateriId: 'sub-1',
      judul: 'Tugas Mandiri 1: Observasi Ekosistem Mini di Sekitar Rumah/Sekolah',
      instruksi: 'Amati sebuah area kecil di sekitar rumah atau sekolahmu (misal: halaman, kebun, kolam kecil, atau pot tanaman). Catat minimal 3 komponen biotik dan 3 komponen abiotik yang kamu temukan, lalu jelaskan bagaimana hubungan ketergantungan antara keduanya!',
      deadline: 'Jumat, 23 Oktober 2026 - Pukul 23.59 WIB',
      rubrik: [
        'Kelengkapan identifikasi komponen biotik & abiotik (30 poin)',
        'Penjelasan interaksi rantai makanan/ketergantungan (40 poin)',
        'Sikap kritis dan kesimpulan upaya menjaga kelestarian area tersebut (30 poin)'
      ]
    },
    kuis: {
      durasiMenit: 5,
      soal: [
        {
          id: 1,
          pertanyaan: 'Kemampuan lingkungan untuk pulih kembali ke keadaan seimbang setelah menerima tekanan atau gangguan disebut...',
          pilihan: [
            'Daya dukung lingkungan',
            'Daya lenting lingkungan',
            'Kapasitas adaptasi populasi',
            'Homeostasis abiotik'
          ],
          kunciJawaban: 1,
          pembahasan: 'Daya lenting (resilience) lingkungan adalah kemampuan lingkungan hidup untuk pulih kembali menuju kondisi seimbang setelah mengalami gangguan.'
        },
        {
          id: 2,
          pertanyaan: 'Manakah di bawah ini yang merupakan contoh interaksi antara komponen biotik dan abiotik?',
          pilihan: [
            'Singa memangsa zebra di padang rumput',
            'Cacing tanah membuat rongga udara yang menyuburkan tanah',
            'Benalu hidup menumpang pada pohon inang',
            'Lebah mengisap nektar bunga matahari'
          ],
          kunciJawaban: 1,
          pembahasan: 'Cacing tanah (biotik) berinteraksi dengan tanah dan udara (abiotik) untuk memperbaiki aerasi dan kegemburan tanah.'
        },
        {
          id: 3,
          pertanyaan: 'Jika dalam suatu rantai makanan di sawah populasi katak menurun drastis akibat perburuan liar, maka dampak langsung yang terjadi adalah...',
          pilihan: [
            'Populasi padi akan meningkat pesat',
            'Populasi belalang hama akan meningkat tajam',
            'Populasi ular sawah akan bertambah banyak',
            'Kualitas air sawah akan menjadi sangat jernih'
          ],
          kunciJawaban: 1,
          pembahasan: 'Katak adalah predator belalang. Jika katak berkurang, populasi belalang pemakan padi tidak ada yang mengontrol sehingga akan melonjak pesat.'
        },
        {
          id: 4,
          pertanyaan: 'Peran utama jamur dan bakteri pembusuk dalam ekosistem adalah sebagai...',
          pilihan: [
            'Produsen energi kimia',
            'Konsumen tingkat pertama',
            'Dekomposer yang menguraikan zat organik menjadi anorganik',
            'Penjaga suhu lapisan udara'
          ],
          kunciJawaban: 2,
          pembahasan: 'Dekomposer menguraikan sisa-sisa makhluk hidup yang mati menjadi zat hara sederhana yang diserap kembali oleh tanah dan tumbuhan.'
        }
      ]
    }
  },
  {
    id: 'sub-2',
    nomor: 2,
    judul: 'Pencemaran Lingkungan: Air, Udara & Tanah',
    subJudul: 'Faktor Penyebab, Karakteristik Polutan, dan Indikator Kerusakan Alam',
    estimasiWaktu: '50 Menit',
    ringkasan: 'Pelajari 3 macam pencemaran utama: pencemaran air (eutrofikasi, limbah detergen), udara (emisi gas rumah kaca, hujan asam), dan tanah (pestisida, mikroplastik) serta cara mendeteksinya.',
    iconName: 'CloudFog',
    warnaTema: 'amber',
    teksMateri: [
      {
        bagian: '1. Pengertian Pencemaran & Polutan',
        paragraf: [
          'Pencemaran lingkungan (polusi) adalah masuk atau dimasukkannya makhluk hidup, zat, energi, dan/atau komponen lain ke dalam lingkungan hidup oleh kegiatan manusia sehingga kualitasnya turun sampai ke tingkat tertentu yang menyebabkan lingkungan tidak dapat berfungsi sesuai peruntukannya.',
          'Suatu zat disebut polutan apabila: jumlahnya melebihi batas normal, berada pada tempat yang tidak semestinya, dan berada pada waktu yang tidak tepat sehingga membahayakan organisme hidup.'
        ],
        poinPenting: [
          'Pencemaran Air: Ditandai perubahan warna, bau, rasa, penurunan kadar oksigen terlarut (DO), dan kenaikan BOD.',
          'Pencemaran Udara: Disebabkan oleh gas buang kendaraan (CO, CO2, NOx, SOx) dan partikel debu halus PM2.5.',
          'Pencemaran Tanah: Disebabkan oleh tumpukan sampah plastik yang sulit terurai, limbah industri kimia, dan pupuk berlebih.'
        ],
        faktaMenarik: 'Gas Karbon Monoksida (CO) tidak berbau dan tidak berwarna, tetapi 200 kali lebih cepat diikat oleh hemoglobin darah manusia dibandingkan dengan oksigen!'
      },
      {
        bagian: '2. Fenomena Hujan Asam & Efek Rumah Kaca',
        paragraf: [
          'Gas Sulfur Dioksida (SO2) dan Nitrogen Oksida (NOx) yang bereaksi dengan uap air di atmosfer akan membentuk asam sulfat dan asam nitrat, menyebabkan fenomena Hujan Asam dengan pH di bawah 5,6 yang dapat merusak bangunan dan mematikan biota air.',
          'Akumulasi gas rumah kaca (seperti CO2 dan Metana/CH4) menahan radiasi panas matahari di atmosfer bumi, menyebabkan pemanasan global (global warming) dan perubahan iklim ekstrem.'
        ]
      }
    ],
    video: {
      judul: 'Eksplorasi Pencemaran Lingkungan & Polutan Modern',
      deskripsi: 'Visualisasi bagaimana partikel polutan air, tanah, dan udara menyebar dan berdampak langsung pada rantai makanan kita.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/7qkaz8ChelI',
      catatanPenting: [
        'Eutrofikasi: Blooming alga akibat penumpukan fosfat detergen dan pupuk di perairan.',
        'Mikroplastik kini ditemukan di sedimen laut dalam bahkan pada air hujan.',
        'Kualitas udara dipantau menggunakan Indeks Standar Pencemar Udara (ISPU / AQI).'
      ]
    },
    jenisSimulasi: 'rumah_kaca',
    penugasan: {
      id: 'tugas-sub-2',
      subMateriId: 'sub-2',
      judul: 'Tugas Mandiri 2: Audit Jejak Karbon & Polutan di Lingkungan Sekitarku',
      instruksi: 'Lakukan pengamatan terhadap aktivitas di sekitar tempat tinggalmu yang menghasilkan polusi (misal: pembakaran sampah, kendaraan bermotor, penggunaan kantong kresek sekali pakai, atau pembuangan air cucian tanpa resapan). Tuliskan 3 sumber polusi tersebut dan berikan 1 alternatif tindakan ramah lingkungan untuk masing-masing sumber!',
      deadline: 'Senin, 26 Oktober 2026 - Pukul 23.59 WIB',
      rubrik: [
        'Kejelian dalam mengidentifikasi 3 sumber polusi riil di sekitar (30 poin)',
        'Analisis dampak polutan terhadap kesehatan/ekosistem (35 poin)',
        'Solusi alternatif yang realistis dan dapat diterapkan siswa SMP (35 poin)'
      ]
    },
    kuis: {
      durasiMenit: 5,
      soal: [
        {
          id: 1,
          pertanyaan: 'Fenomena ledakan pertumbuhan ganggang dan eceng gondok di perairan akibat akumulasi limbah detergen dan pupuk kaya fosfat disebut...',
          pilihan: [
            'Biomagnifikasi',
            'Eutrofikasi',
            'Sedimentasi vulkanik',
            'Bioremediasi'
          ],
          kunciJawaban: 1,
          pembahasan: 'Eutrofikasi adalah pengayaan nutrien berlebih (khususnya nitrogen dan fosfor) pada badan air yang memicu blooming tanaman air hingga menutupi sinar matahari dan mengurangi kadar oksigen.'
        },
        {
          id: 2,
          pertanyaan: 'Gas polutan yang paling banyak dihasilkan dari pembakaran bahan bakar fosil dan berkontribusi utama terhadap pemanasan global adalah...',
          pilihan: [
            'Oksigen (O2)',
            'Karbon Dioksida (CO2)',
            'Gas Helium (He)',
            'Uap Natrium (Na)'
          ],
          kunciJawaban: 1,
          pembahasan: 'Karbon Dioksida (CO2) adalah gas rumah kaca utama yang menyerap radiasi inframerah dari permukaan bumi dan memerangkap panas.'
        },
        {
          id: 3,
          pertanyaan: 'Zat kimia klorofluorokarbon (CFC) yang dulu banyak dipakai pada kulkas dan AC dapat menyebabkan kerusakan...',
          pilihan: [
            'Lapisan Ozon (O3) di stratosfer',
            'Air tanah dangkal',
            'Kesuburan humus tanah',
            'Kadar garam air laut'
          ],
          kunciJawaban: 0,
          pembahasan: 'Senyawa klorin dari CFC bereaksi menguraikan molekul ozon di stratosfer, menyebabkan penipisan lapisan pelindung dari sinar ultraviolet UV-B.'
        },
        {
          id: 4,
          pertanyaan: 'Organisme yang dapat digunakan sebagai bioindikator bahwa suatu perairan sungai masih bersih dan belum tercemar parah adalah...',
          pilihan: [
            'Larva lalat capung (Mayfly) dan lumut kerak',
            'Eceng gondok yang menutupi seluruh permukaan',
            'Cacing tubifex (cacing darah merah)',
            'Bakteri coliform dalam jumlah jutaan'
          ],
          kunciJawaban: 0,
          pembahasan: 'Larva capung dan nimfa lalat batu membutuhkan kadar oksigen terlarut yang tinggi dan sangat peka terhadap racun kimia, sehingga merupakan bioindikator air bersih.'
        }
      ]
    }
  },
  {
    id: 'sub-3',
    nomor: 3,
    judul: 'Pengelolaan Limbah & Aksi Konservasi (3R)',
    subJudul: 'Prinsip Reduce, Reuse, Recycle, Pemilahan Sampah, dan Inovasi Lingkungan',
    estimasiWaktu: '45 Menit',
    ringkasan: 'Kenali jenis limbah (organik, anorganik, B3), kuasai metode pemilahan yang tepat, praktikkan prinsip 3R dalam kehidupan sehari-hari, dan pelajari teknologi ramah lingkungan.',
    iconName: 'Recycle',
    warnaTema: 'rose',
    teksMateri: [
      {
        bagian: '1. Klasifikasi Jenis Limbah Berdasarkan Sifatnya',
        paragraf: [
          'Limbah adalah sisa suatu usaha atau kegiatan manusia. Berdasarkan sifat senyawanya, limbah dikelompokkan menjadi tiga kategori utama yang membutuhkan penanganan berbeda:',
          '1. Limbah Organik: Berasal dari sisa makhluk hidup, mudah membusuk (biodegradable) seperti sisa makanan, daun kering, dan sayuran. Dapat diolah menjadi pupuk kompos atau biogas.'
        ],
        poinPenting: [
          'Limbah Anorganik: Limbah yang sulit atau tidak dapat terurai alami oleh mikroorganisme, seperti botol plastik, kaca, kaleng aluminium, dan styrofoam.',
          'Limbah B3 (Bahan Berbahaya dan Beracun): Memiliki sifat beracun, mudah terbakar, korosif, atau infeksius, seperti baterai bekas, lampu neon, botol racun serangga, dan jarum suntik.'
        ],
        faktaMenarik: 'Kantong plastik membutuhkan waktu 20 hingga 500 tahun untuk terurai di alam, dan dalam prosesnya akan pecah menjadi mikroplastik yang termakan ikan!'
      },
      {
        bagian: '2. Prinsip 3R (Reduce, Reuse, Recycle) & Solusi Berkelanjutan',
        paragraf: [
          'Pengelolaan sampah modern mengutamakan pencegahan timbulan sampah sebelum memikirkan daur ulang:',
          '• Reduce (Mengurangi): Mengurangi penggunaan barang sekali pakai, membawa botol minum (tumbler) dan tas belanja kain sendiri.',
          '• Reuse (Menggunakan Kembali): Memanfaatkan kembali barang yang masih layak pakai, misalnya menggunakan toples bekas selai untuk wadah bumbu.',
          '• Recycle (Mendaur Ulang): Mengolah kembali sampah menjadi produk baru yang bernilai ekonomis, seperti biji plastik daur ulang atau kertas daur ulang.'
        ],
        poinPenting: [
          'Bioremediasi: Pemanfaatan bakteri atau jamur untuk membersihkan polutan berbahaya di tanah dan perairan tercemar.',
          'Bank Sampah: Inisiatif mengumpulkan dan menimbang sampah anorganik pilahan yang dapat ditukarkan menjadi tabungan.'
        ]
      }
    ],
    video: {
      judul: 'Aksi Nyata Generasi Muda Menyelamatkan Lingkungan',
      deskripsi: 'Inspirasi pengelolaan sampah terpadu dari sekolah dan komunitas pemuda peduli lingkungan hidup Indonesia.',
      embedUrl: 'https://www.youtube-nocookie.com/embed/OasbYWF4_S8',
      catatanPenting: [
        'Kunci utama pengelolaan sampah ada pada pemilahan langsung dari sumbernya (rumah dan sekolah).',
        'Limbah B3 tidak boleh dibuang sembarangan ke selokan atau dibakar di halaman terbuka.',
        'Gaya hidup minim sampah (Zero Waste) berawal dari kesadaran membawa wadah sendiri.'
      ]
    },
    jenisSimulasi: 'pilah_sampah',
    penugasan: {
      id: 'tugas-sub-3',
      subMateriId: 'sub-3',
      judul: 'Tugas Mandiri 3: Kreasi Daur Ulang atau Rencana Aksi 3R di Sekolah/Rumah',
      instruksi: 'Pilih salah satu proyek aksi nyata: (A) Buat satu produk kerajinan/karya guna dari sampah anorganik bekas di rumahmu (misal pot bunga dari botol plastik, tempat pensil dari kaleng), ATAU (B) Tuliskan proposal rencana gerakan "Sekolah Bebas Sampah Plastik" sebanyak 2-3 paragraf beserta langkah konkretnya!',
      deadline: 'Kamis, 29 Oktober 2026 - Pukul 23.59 WIB',
      rubrik: [
        'Kreativitas dan nilai manfaat karya/rencana aksi (40 poin)',
        'Penerapan tepat prinsip 3R (35 poin)',
        'Dokumentasi atau kerapian deskripsi laporan (25 poin)'
      ]
    },
    kuis: {
      durasiMenit: 5,
      soal: [
        {
          id: 1,
          pertanyaan: 'Tindakan seorang siswa yang selalu membawa botol minum (tumbler) sendiri dari rumah daripada membeli air kemasan sekali pakai merupakan penerapan prinsip...',
          pilihan: [
            'Recycle (Daur Ulang)',
            'Reduce (Mengurangi)',
            'Replace (Mengganti secara kimia)',
            'Remediasi'
          ],
          kunciJawaban: 1,
          pembahasan: 'Reduce berarti mengurangi penggunaan atau potensi timbulan sampah sejak awal, salah satunya dengan membawa wadah minum pakai ulang.'
        },
        {
          id: 2,
          pertanyaan: 'Manakah di bawah ini yang tergolong sebagai limbah B3 (Bahan Berbahaya dan Beracun) rumah tangga yang harus dipisahkan secara khusus?',
          pilihan: [
            'Kardus bekas mie instan',
            'Sisa kulit pisang dan apel',
            'Baterai bekas dan tabung obat nyamuk semprot',
            'Daun kering halaman'
          ],
          kunciJawaban: 2,
          pembahasan: 'Baterai mengandung logam berat (merkuri, timbal, kadmium) dan tabung insektisida mengandung racun kimia korosif/mudah meledak, sehingga masuk kategori limbah B3.'
        },
        {
          id: 3,
          pertanyaan: 'Tempat sampah berstandar nasional yang berwarna HIJAU ditujukan khusus untuk menampung sampah jenis...',
          pilihan: [
            'Organik (sisa makanan, dedaunan)',
            'Anorganik daur ulang (kaca, plastik)',
            'Logam dan kaleng',
            'Limbah medis dan jarum suntik'
          ],
          kunciJawaban: 0,
          pembahasan: 'Warna hijau adalah standar tempat sampah Organik (mudah terurai/kompos), kuning untuk Anorganik, dan merah untuk limbah B3/berbahaya.'
        },
        {
          id: 4,
          pertanyaan: 'Teknik pembersihan tanah yang tercemar tumpahan minyak dengan memanfaatkan mikroorganisme pengurai minyak disebut...',
          pilihan: [
            'Eutrofikasi biologis',
            'Bioremediasi',
            'Insinerasi termal',
            'Evaporasi selektif'
          ],
          kunciJawaban: 1,
          pembahasan: 'Bioremediasi adalah proses penggunaan mikroorganisme (seperti jamur, ragi, atau bakteri) untuk membersihkan atau menetralkan zat pencemar lingkungan.'
        }
      ]
    }
  }
];
