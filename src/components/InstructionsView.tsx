import React from 'react';
import { HelpCircle, UserCheck, Compass, BookOpen, ArrowRightLeft, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { USAGE_GUIDE } from '../data/evaluationData';
import { MainTab } from '../types';

interface InstructionsViewProps {
  onNavigate: (tab: MainTab) => void;
}

export default function InstructionsView({ onNavigate }: InstructionsViewProps) {
  const iconMap: Record<string, React.ElementType> = {
    UserCheck,
    Compass,
    BookOpen,
    ArrowRightLeft,
    Award
  };

  return (
    <div id="petunjuk-penggunaan-container" className="space-y-6 pb-12">
      {/* Header Petunjuk */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
          Panduan Interaktif Siswa
        </span>
        <h1 className="text-2xl sm:text-3xl font-black">
          Petunjuk Penggunaan Media E-Learning
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
          Pelajari tata cara mengakses seluruh modul materi, simulasi virtual laboratorium, serta pengumpulan tugas mandiri dengan mudah dan nyaman.
        </p>
      </div>

      {/* Langkah-langkah Belajar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {USAGE_GUIDE.map((step) => {
          const Icon = iconMap[step.icon] || HelpCircle;
          return (
            <div
              key={step.nomor}
              className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-black text-lg shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-black text-[#800000] bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                  Langkah {step.nomor}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900">
                {step.judul}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.deskripsi}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tombol Aksi Cepat */}
      <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-300 text-center space-y-3">
        <h4 className="text-base font-black text-slate-900">
          Sudah Memahami Panduannya?
        </h4>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Mulailah dengan mengisi absensi kehadiran atau langsung menjelajahi 3 sub-materi perubahan lingkungan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => onNavigate('absen')}
            className="px-5 py-2.5 rounded-full bg-[#800000] hover:bg-[#600000] text-amber-300 hover:text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Menuju Halaman Absensi
          </button>
          <button
            onClick={() => onNavigate('materi')}
            className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-bold text-xs shadow-md cursor-pointer"
          >
            Buka Materi Pembelajaran
          </button>
        </div>
      </div>
    </div>
  );
}
