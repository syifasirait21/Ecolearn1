import { QuizQuestion } from '../types';

export const LEARNING_OBJECTIVES = {
  fase: 'Fase D (SMP / MTs - Kelas VII / VIII)',
  mataPelajaran: 'Ilmu Pengetahuan Alam (IPA Terpadu)',
  elemen: 'Pemahaman IPA & Keterampilan Proses Sains',
  capaianUmum: 'Pada akhir Fase D, peserta didik mampu melakukan analisis untuk menemukan keterkaitan sistem organ dengan fungsinya serta kelainan atau gangguan yang muncul pada sistem organ tersebut. Peserta didik dapat mengidentifikasi interaksi dan saling ketergantungan antar komponen biotik dan abiotik dalam ekosistem, serta merumuskan upaya mitigasi dan solusi pemecahan masalah pencemaran lingkungan dalam kehidupan sehari-hari.',
  tujuanPembelajaran: [
    {
      kode: 'TP 1.1',
      judul: 'Analisis Keseimbangan Ekosistem',
      deskripsi: 'Peserta didik mampu menganalisis interaksi antara komponen biotik dan abiotik serta pengaruh terganggunya rantai makanan terhadap keseimbangan lingkungan.'
    },
    {
      kode: 'TP 1.2',
      judul: 'Identifikasi Polutan & Pencemaran',
      deskripsi: 'Peserta didik mampu mengidentifikasi karakteristik dan dampak pencemaran air, udara, dan tanah terhadap organisme hidup dan kesehatan manusia.'
    },
    {
      kode: 'TP 1.3',
      judul: 'Simulasi Efek Rumah Kaca & Pemanasan Global',
      deskripsi: 'Peserta didik mampu menjelaskan proses terjadinya efek rumah kaca dan meramalkan dampak kenaikan suhu bumi terhadap perubahan iklim.'
    },
    {
      kode: 'TP 1.4',
      judul: 'Aksi Nyata Pengelolaan Limbah (3R)',
      deskripsi: 'Peserta didik mampu mengklasifikasikan limbah (organik, anorganik, B3) dan merancang produk atau aksi nyata daur ulang berbasis prinsip 3R.'
    }
  ],
  profilPelajarPancasila: [
    'Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia (Menjaga alam ciptaan-Nya)',
    'Bernalar Kritis (Menganalisis data polutan dan menarik kesimpulan berbasis bukti)',
    'Kreatif (Menghasilkan karya daur ulang dari barang bekas)',
    'Gotong Royong (Berdiskusi dan berkolaborasi dalam forum lingkungan)'
  ]
};

export const USAGE_GUIDE = [
  {
    nomor: 1,
    judul: 'Identitas Siswa Cepat (Tanpa Login)',
    deskripsi: 'Kamu tidak perlu membuat akun atau mendaftar password rumit. Cukup ketikkan Nama Lengkap dan Kelasmu di bagian bilah atas. Identitas ini otomatis tersimpan untuk seluruh form kuis, tugas, dan absensi.',
    icon: 'UserCheck'
  },
  {
    nomor: 2,
    judul: 'Navigasi Tab Halaman Terpisah',
    deskripsi: 'Website ini menggunakan sistem navigasi halaman khusus. Gunakan Navbar di bagian paling atas atau tombol ikon melingkar di Beranda untuk berpindah antar halaman secara fokus tanpa harus scroll panjang.',
    icon: 'Compass'
  },
  {
    nomor: 3,
    judul: 'Belajar Terstruktur di Halaman Materi',
    deskripsi: 'Masuk ke menu "Materi Pembelajaran" dan pilih salah satu dari 3 sub-materi. Di setiap sub-materi, kamu dapat membaca teks fakta sains, menonton video, menjalankan simulasi sains interaktif, mengumpulkan tugas mandiri, dan menguji pemahaman dengan kuis!',
    icon: 'BookOpen'
  },
  {
    nomor: 4,
    judul: 'Tombol BACK dan NEXT Sub-Materi',
    deskripsi: 'Di bagian bawah setiap halaman sub-materi tersedia tombol navigasi untuk berpindah ke sub-materi berikutnya atau sebelumnya tanpa harus bolak-balik ke menu utama.',
    icon: 'ArrowRightLeft'
  },
  {
    nomor: 5,
    judul: 'Absensi & Evaluasi Akhir Terintegrasi',
    deskripsi: 'Lakukan absensi di menu "Absen" sebelum belajar. Setelah menyelesaikan ketiga sub-materi, ujilah kemampuanmu di menu "Evaluasi/Kuis" untuk mendapatkan Sertifikat Kelulusan Digital instan!',
    icon: 'Award'
  }
];

export const COMPREHENSIVE_EVALUATION_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    pertanyaan: 'Komponen dalam ekosistem yang bertugas mengubah energi cahaya matahari menjadi energi kimia yang tersimpan dalam zat makanan adalah...',
    pilihan: [
      'Konsumen primer',
      'Produsen (Autotrof)',
      'Dekomposer pengurai',
      'Detritivor tanah'
    ],
    kunciJawaban: 1,
    pembahasan: 'Produsen (tumbuhan hijau, alga) memiliki klorofil untuk melangsungkan fotosintesis dengan memanfaatkan sinar matahari dan CO2.'
  },
  {
    id: 2,
    pertanyaan: 'Peristiwa masuknya zat pencemar ke dalam rantai makanan yang konsentrasinya semakin meningkat pada tingkatan trofik yang lebih tinggi disebut...',
    pilihan: [
      'Eutrofikasi',
      'Biomagnifikasi (Pemekatan hayati)',
      'Bioremediasi',
      'Denitrifikasi'
    ],
    kunciJawaban: 1,
    pembahasan: 'Biomagnifikasi terjadi ketika racun kimia yang sulit terurai (seperti pestisida DDT atau merkuri) terakumulasi semakin pekat dari konsumen tingkat rendah hingga predator puncak.'
  },
  {
    id: 3,
    pertanyaan: 'Berikut ini adalah dampak negatif yang timbul akibat pencemaran detergen yang mengandung fosfat tinggi di danau, KECUALI...',
    pilihan: [
      'Kadar oksigen terlarut (DO) di dalam air menurun drastis',
      'Terjadinya ledakan populasi tanaman air (eutrofikasi)',
      'Kematian massal ikan akibat kekurangan oksigen',
      'Air danau menjadi sangat jernih dan kaya ikan nila'
    ],
    kunciJawaban: 3,
    pembahasan: 'Air danau yang mengalami eutrofikasi justru menjadi keruh kehijauan, berbau busuk, dan menyebabkan kematian ikan karena oksigen terlarut habis.'
  },
  {
    id: 4,
    pertanyaan: 'Gas buang kendaraan bermotor yang sangat berbahaya bagi manusia karena berikatan kuat dengan hemoglobin darah dan menghalangi suplai oksigen adalah...',
    pilihan: [
      'Gas Karbon Monoksida (CO)',
      'Gas Oksigen murni (O2)',
      'Gas Nitrogen (N2)',
      'Uap air kondensasi (H2O)'
    ],
    kunciJawaban: 0,
    pembahasan: 'Gas CO memiliki afinitas ikatan dengan hemoglobin sekitar 200–250 kali lebih kuat dibanding oksigen, memicu pusing, sesak napas, hingga kematian.'
  },
  {
    id: 5,
    pertanyaan: 'Hujan asam memiliki nilai pH yang berada di bawah angka...',
    pilihan: [
      'pH 7,0',
      'pH 8,5',
      'pH 5,6',
      'pH 11,0'
    ],
    kunciJawaban: 2,
    pembahasan: 'Air hujan alami biasanya agak asam (pH sekitar 5,6 karena CO2 terlarut). Hujan asam didefinisikan sebagai hujan dengan pH di bawah 5,6 akibat asam sulfat dan asam nitrat.'
  },
  {
    id: 6,
    pertanyaan: 'Lapisan ozon (O3) di stratosfer sangat penting bagi kelangsungan hidup makhluk bumi karena berfungsi untuk...',
    pilihan: [
      'Menahan radiasi ultraviolet UV-B yang berbahaya dari matahari',
      'Menyerap gas karbondioksida dari bumi',
      'Menurunkan curah hujan lebat',
      'Mencegah terjadinya angin topan'
    ],
    kunciJawaban: 0,
    pembahasan: 'Lapisan ozon berfungsi sebagai pelindung alami bumi dari paparan sinar UV-B matahari berlebih yang dapat memicu kanker kulit dan katarak.'
  },
  {
    id: 7,
    pertanyaan: 'Penggunaan styrofoam dan plastik sekali pakai sebaiknya dihindari karena...',
    pilihan: [
      'Sangat mudah membusuk dalam waktu 2 hari',
      'Membutuhkan waktu ratusan tahun untuk terurai dan dapat melepaskan senyawa karsinogenik',
      'Mengurangi suhu udara di atmosfer',
      'Menambah kadar oksigen dalam tanah'
    ],
    kunciJawaban: 1,
    pembahasan: 'Styrofoam dan plastik konvensional adalah polimer sintetis yang sangat sulit diurai mikroorganisme dan bisa bertahan ratusan tahun.'
  },
  {
    id: 8,
    pertanyaan: 'Seorang siswa mengumpulkan kaleng bekas susu, mencucinya, mengecatnya dengan warna ceria, lalu menjadikannya wadah alat tulis di meja belajarnya. Tindakan ini mencerminkan prinsip...',
    pilihan: [
      'Reuse (Memanfaatkan kembali barang tanpa mengubah wujud kimia aslinya)',
      'Recycle (Mendaur ulang menjadi bahan mentah pabrik)',
      'Biomassa',
      'Incineration'
    ],
    kunciJawaban: 0,
    pembahasan: 'Reuse adalah memanfaatkan kembali barang bekas untuk fungsi yang sama atau fungsi baru tanpa proses daur ulang industri peleburan.'
  },
  {
    id: 9,
    pertanyaan: 'Cara penanganan sampah organik dapur (seperti kulit buah dan sisa sayuran) yang paling ramah lingkungan dan bermanfaat adalah...',
    pilihan: [
      'Dibakar di kebun saat malam hari',
      'Dibuang ke selokan air depan rumah',
      'Diolah menjadi pupuk kompos atau eco-enzyme',
      'Dibungkus kantong plastik tebal lalu ditimbun di semen'
    ],
    kunciJawaban: 2,
    pembahasan: 'Sampah organik dapat didekomposisi oleh bakteri atau cacing menjadi pupuk kompos yang menyuburkan tanah tanaman tanpa mencemari udara.'
  },
  {
    id: 10,
    pertanyaan: 'Limbah rumah tangga berikut ini yang WAJIB dimasukkan ke dalam wadah khusus Limbah B3 adalah...',
    pilihan: [
      'Baterai bekas remote TV dan lampu neon rusak',
      'Kulit semangka dan kulit apel',
      'Kertas buram dan buku tulis bekas',
      'Daun mangga yang gugur di halaman'
    ],
    kunciJawaban: 0,
    pembahasan: 'Baterai dan lampu neon mengandung logam beracun (merkuri, timbal) yang berbahaya jika bocor dan mencemari air tanah, sehingga harus dipisah sebagai limbah B3.'
  }
];

export const AUTHOR_INFO = {
  namaPenyusun: 'Rifki Hidayat, S.Pd., M.Pd.',
  profesi: 'Guru IPA SMP & Pengembang Media Pembelajaran Digital',
  instansi: 'SMP Negeri 1 Adiwiyata / Universitas Pendidikan Indonesia',
  email: 'rifki.edupendidikan@guru.smp.belajar.id',
  keahlian: 'Inovasi Pembelajaran Sains SMP, Kurikulum Merdeka, & Pendidikan Lingkungan Hidup',
  validatorMateri: 'Dr. Sri Wahyuni, M.Si. (Pakar Pendidikan Ekologi & Biologi Lingkungan)',
  validatorMedia: 'Ahmad Fauzan, M.Kom. (Dosen Teknologi Pendidikan & Rekayasa Perangkat Lunak)',
  visiPengembangan: 'Menghadirkan media pembelajaran sains yang interaktif, menyenangkan, dan berdaya guna untuk membangkitkan kepedulian ekologis generasi muda Indonesia sejak bangku SMP.'
};
