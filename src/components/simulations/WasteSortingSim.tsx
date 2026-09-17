import React, { useState } from 'react';
import { Trash2, CheckCircle2, XCircle, RotateCcw, Award, Sparkles, AlertTriangle } from 'lucide-react';

interface WasteItem {
  id: number;
  nama: string;
  ikon: string;
  kategoriBenar: 'organik' | 'anorganik' | 'b3';
  penjelasan: string;
}

const ITEMS_LIST: WasteItem[] = [
  { id: 1, nama: 'Kulit Pisang & Buah', ikon: '🍌', kategoriBenar: 'organik', penjelasan: 'Berasal dari sisa makhluk hidup, mudah membusuk dan ideal untuk dijadikan pupuk kompos.' },
  { id: 2, nama: 'Botol Plastik Bekas', ikon: '🧴', kategoriBenar: 'anorganik', penjelasan: 'Bahan polimer sintetik PET yang sulit terurai (butuh 450 tahun), harus didaur ulang.' },
  { id: 3, nama: 'Baterai Jam Bekas', ikon: '🔋', kategoriBenar: 'b3', penjelasan: 'Mengandung logam berat beracun (merkuri, timbal, nikel) yang mencemari air tanah jika bocor.' },
  { id: 4, nama: 'Dedaunan Kering', ikon: '🍂', kategoriBenar: 'organik', penjelasan: 'Bahan organik alami kaya unsur karbon yang sangat baik untuk campuran media tanam.' },
  { id: 5, nama: 'Kaleng Minuman Soda', ikon: '🥫', kategoriBenar: 'anorganik', penjelasan: 'Logam aluminium yang dapat dilebur dan didaur ulang berkali-kali tanpa menurunkan mutu.' },
  { id: 6, nama: 'Botol Obat Nyamuk Semprot', ikon: '☣️', kategoriBenar: 'b3', penjelasan: 'Mengandung senyawa kimia insektisida beracun dan wadah aerosol yang berisiko meledak.' },
  { id: 7, nama: 'Kardus & Kertas Bekas', ikon: '📦', kategoriBenar: 'anorganik', penjelasan: 'Dapat didaur ulang menjadi bubur kertas untuk produk karton baru (Recycle).' },
  { id: 8, nama: 'Sisa Tulang Ikan Makanan', ikon: '🐟', kategoriBenar: 'organik', penjelasan: 'Sisa makanan hewani mudah terurai oleh mikroorganisme pengurai tanah.' },
  { id: 9, nama: 'Lampu Neon & Bohlam Rusak', ikon: '💡', kategoriBenar: 'b3', penjelasan: 'Mengandung uap raksa (merkuri) berbahaya bagi paru-paru jika pecah sembarangan.' },
  { id: 10, nama: 'Kantong Plastik Kresek', ikon: '🛍️', kategoriBenar: 'anorganik', penjelasan: 'Limbah plastik sekali pakai yang harus ditekan penggunaannya (Reduce) dan didaur ulang.' }
];

export default function WasteSortingSim() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    item: WasteItem | null;
  }>({ status: null, message: '', item: null });
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const currentItem = ITEMS_LIST[currentIndex];

  const handleSort = (chosenCategory: 'organik' | 'anorganik' | 'b3') => {
    if (!currentItem || gameFinished) return;

    if (chosenCategory === currentItem.kategoriBenar) {
      const addedPoints = 10 + (streak * 2);
      setScore(prev => prev + addedPoints);
      setStreak(prev => prev + 1);
      setFeedback({
        status: 'correct',
        message: `Tepat Sekali! (+${addedPoints} Poin) ${currentItem.penjelasan}`,
        item: currentItem
      });
    } else {
      setStreak(0);
      const categoryNames = { organik: 'Tong Hijau (Organik)', anorganik: 'Tong Kuning (Anorganik)', b3: 'Tong Merah (Limbah B3)' };
      setFeedback({
        status: 'wrong',
        message: `Kurang Tepat. Seharusnya dimasukkan ke ${categoryNames[currentItem.kategoriBenar]}. ${currentItem.penjelasan}`,
        item: currentItem
      });
    }

    if (currentIndex + 1 < ITEMS_LIST.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback({ status: null, message: '', item: null });
    setGameFinished(false);
  };

  return (
    <div id="simulasi-pilah-sampah-container" className="bg-white rounded-2xl border-2 border-amber-200 p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-amber-100 pb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-900 text-xs font-bold rounded-full uppercase tracking-wider mb-1">
            Simulasi Interaktif Sub-Materi 3
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Tantangan Sains: Pilah Sampah Ceria 3 Kategori
          </h3>
          <p className="text-sm text-slate-600">
            Ayo bantu petugas kebersihan sekolah memilah 10 jenis sampah ke tong yang tepat!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-950 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-700" />
            Skor: <span className="text-base text-maroon-900">{score}</span>
          </div>
          {streak > 1 && (
            <div className="bg-rose-100 px-2.5 py-1.5 rounded-lg text-xs font-bold text-rose-800 animate-pulse">
              🔥 Combo x{streak}
            </div>
          )}
        </div>
      </div>

      {!gameFinished ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
              <span>Sampah ke-{currentIndex + 1} dari {ITEMS_LIST.length}</span>
              <span>Progres: {Math.round(((currentIndex) / ITEMS_LIST.length) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-full transition-all duration-300"
                style={{ width: `${((currentIndex) / ITEMS_LIST.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Kartu Sampah Aktif */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border-2 border-amber-200 p-6 text-center mb-6 shadow-inner">
            <div className="text-6xl sm:text-7xl mb-2 filter drop-shadow-md animate-bounce">
              {currentItem.ikon}
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
              {currentItem.nama}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Ke tong manakah sampah ini harus dimasukkan?
            </p>
          </div>

          {/* 3 Tong Sampah Interaktif */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Tong 1: Organik (Hijau) */}
            <button
              onClick={() => handleSort('organik')}
              className="group flex flex-col items-center p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 hover:border-emerald-500 transition-all transform hover:-translate-y-1 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-600 group-hover:bg-emerald-700 text-white flex items-center justify-center mb-3 shadow-md transition-transform group-hover:scale-110">
                <Trash2 className="w-8 h-8" />
              </div>
              <span className="text-base font-black text-emerald-950">TONG HIJAU</span>
              <span className="text-xs font-bold text-emerald-800 mt-0.5">Sampah Organik</span>
              <span className="text-[11px] text-emerald-700 mt-1">Sisa makanan, dedaunan, bahan mudah membusuk/kompos</span>
            </button>

            {/* Tong 2: Anorganik (Kuning) */}
            <button
              onClick={() => handleSort('anorganik')}
              className="group flex flex-col items-center p-5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 hover:border-amber-500 transition-all transform hover:-translate-y-1 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500 group-hover:bg-amber-600 text-white flex items-center justify-center mb-3 shadow-md transition-transform group-hover:scale-110">
                <Trash2 className="w-8 h-8" />
              </div>
              <span className="text-base font-black text-amber-950">TONG KUNING</span>
              <span className="text-xs font-bold text-amber-800 mt-0.5">Anorganik Daur Ulang</span>
              <span className="text-[11px] text-amber-700 mt-1">Botol plastik, kaleng, kardus, kaca, kertas</span>
            </button>

            {/* Tong 3: B3 (Merah) */}
            <button
              onClick={() => handleSort('b3')}
              className="group flex flex-col items-center p-5 rounded-2xl bg-rose-50 hover:bg-rose-100 border-2 border-rose-300 hover:border-rose-500 transition-all transform hover:-translate-y-1 shadow-sm text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-700 group-hover:bg-rose-800 text-white flex items-center justify-center mb-3 shadow-md transition-transform group-hover:scale-110">
                <Trash2 className="w-8 h-8" />
              </div>
              <span className="text-base font-black text-rose-950">TONG MERAH</span>
              <span className="text-xs font-bold text-rose-800 mt-0.5">Limbah B3 Berbahaya</span>
              <span className="text-[11px] text-rose-700 mt-1">Baterai, neon, racun serangga, jarum, zat beracun</span>
            </button>
          </div>
        </div>
      ) : (
        /* Tampilan Selesai Game */
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl p-6 sm:p-8 text-center border-2 border-amber-300 mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-400 text-amber-950 flex items-center justify-center mb-3 shadow-lg">
            <Award className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-black text-slate-900 mb-2">
            Hebat! Kamu Menyelesaikan Tantangan Pemilahan!
          </h4>
          <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
            Kamu telah belajar membedakan limbah organik, anorganik, dan B3 berbahaya untuk melindungi bumi kita.
          </p>
          <div className="inline-block bg-white border-2 border-amber-200 rounded-xl px-6 py-3 mb-6 shadow-sm">
            <div className="text-xs font-bold text-slate-500 uppercase">Total Skor Akhirmu</div>
            <div className="text-3xl font-black text-maroon-800">{score} Poin</div>
          </div>
          <div>
            <button
              onClick={restartGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#800000] text-white font-bold hover:bg-[#600000] shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Mainkan Lagi
            </button>
          </div>
        </div>
      )}

      {/* Box Penjelasan Feedback Interaktif */}
      {feedback.status && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs md:text-sm transition-all ${
          feedback.status === 'correct'
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
            : 'bg-rose-50 text-rose-900 border-rose-300'
        }`}>
          {feedback.status === 'correct' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold mb-0.5">
              {feedback.status === 'correct' ? 'Jawaban Benar!' : 'Catatan Pembelajaran:'}
            </div>
            <div>{feedback.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}
