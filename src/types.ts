export type MainTab = 
  | 'home'
  | 'petunjuk'
  | 'capaian'
  | 'absen'
  | 'materi'
  | 'submateri'
  | 'evaluasi'
  | 'forum'
  | 'profil';

export interface StudentProfile {
  nama: string;
  kelas: string;
  nomorAbsen?: string;
}

export interface AttendanceRecord {
  id: string;
  timestamp: string;
  nama: string;
  kelas: string;
  status: 'Hadir' | 'Izin' | 'Sakit';
  catatan: string;
  syncedToSheets?: boolean;
}

export interface QuizQuestion {
  id: number;
  pertanyaan: string;
  pilihan: string[];
  kunciJawaban: number; // index 0-3
  pembahasan: string;
}

export interface AssignmentData {
  id: string;
  subMateriId: string;
  judul: string;
  instruksi: string;
  deadline: string;
  rubrik: string[];
}

export interface AssignmentSubmission {
  id: string;
  subMateriId: string;
  judulTugas: string;
  nama: string;
  kelas: string;
  waktuKirim: string;
  jawabanTeks: string;
  linkLampiran?: string;
  syncedToSheets?: boolean;
}

export interface SubMaterial {
  id: string;
  nomor: number;
  judul: string;
  subJudul: string;
  estimasiWaktu: string;
  ringkasan: string;
  iconName: string;
  warnaTema: string;
  teksMateri: {
    bagian: string;
    paragraf: string[];
    poinPenting?: string[];
    faktaMenarik?: string;
  }[];
  video: {
    judul: string;
    deskripsi: string;
    embedUrl: string;
    catatanPenting: string[];
  };
  jenisSimulasi: 'ekosistem' | 'rumah_kaca' | 'pilah_sampah';
  penugasan: AssignmentData;
  kuis: {
    durasiMenit: number;
    soal: QuizQuestion[];
  };
}

export interface QuizResult {
  id: string;
  subMateriId?: string;
  judulKuis: string;
  nama: string;
  kelas: string;
  tanggal: string;
  skor: number;
  totalSoal: number;
  benar: number;
  salah: number;
  syncedToSheets?: boolean;
}

export interface ForumComment {
  id: string;
  nama: string;
  kelas: string;
  peran: 'Siswa' | 'Guru' | 'Pengembang';
  waktu: string;
  pesan: string;
  suka: number;
  topik: string;
  balasan?: {
    id: string;
    nama: string;
    peran: 'Siswa' | 'Guru';
    pesan: string;
    waktu: string;
  }[];
}
