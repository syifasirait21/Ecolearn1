import React from 'react';
import { BookOpen, Clock, ArrowRight, CheckCircle, Sparkles, Video, Play, Award, FileText } from 'lucide-react';
import { SUB_MATERIALS } from '../data/learningData';

interface MaterialsListViewProps {
  onSelectSubMaterial: (id: string) => void;
  completedSubMaterials: string[];
}

export default function MaterialsListView({
  onSelectSubMaterial,
  completedSubMaterials,
}: MaterialsListViewProps) {
  return (
    <div id="materials-list-container" className="space-y-6 pb-12">
      {/* Header Halaman Materi */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] rounded-3xl p-6 sm:p-8 text-white border-4 border-amber-400 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              Daftar Modul Belajar IPA SMP
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Materi Pembelajaran: Perubahan Lingkungan
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Pilih salah satu sub-materi di bawah untuk membuka halaman khusus materi lengkap dengan laboratorium sains dan penugasan mandiri.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-amber-300/30 text-center shrink-0">
            <div className="text-xs text-amber-200">Progres Sub-Materi</div>
            <div className="text-2xl font-black text-amber-300">
              {completedSubMaterials.length} / {SUB_MATERIALS.length}
            </div>
            <div className="text-[10px] text-amber-200">Tuntas Dipelajari</div>
          </div>
        </div>
      </div>

      {/* Grid Sub-Materi */}
      <div className="grid grid-cols-1 gap-5">
        {SUB_MATERIALS.map((sub, index) => {
          const isCompleted = completedSubMaterials.includes(sub.id);
          const bgTheme = 
            index === 0 ? 'border-emerald-300 hover:border-emerald-500 bg-emerald-50/40' :
            index === 1 ? 'border-amber-300 hover:border-amber-500 bg-amber-50/40' :
            'border-rose-300 hover:border-rose-500 bg-rose-50/40';

          const badgeColor =
            index === 0 ? 'bg-emerald-600 text-white' :
            index === 1 ? 'bg-amber-600 text-white' :
            'bg-[#800000] text-white';

          return (
            <div
              key={sub.id}
              id={`card-submateri-${sub.id}`}
              onClick={() => onSelectSubMaterial(sub.id)}
              className={`rounded-3xl border-2 p-6 transition-all duration-300 hover:shadow-lg cursor-pointer bg-white ${bgTheme}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  {/* Nomor Melingkar */}
                  <div className={`w-14 h-14 rounded-full ${badgeColor} flex items-center justify-center font-black text-xl shadow-md shrink-0`}>
                    0{sub.nomor}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Sub-Materi {sub.nomor}
                      </span>
                      <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> {sub.estimasiWaktu}
                      </span>
                      {isCompleted && (
                        <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> Selesai
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 hover:text-[#800000] transition-colors">
                      {sub.judul}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold text-slate-700">
                      {sub.subJudul}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {sub.ringkasan}
                    </p>

                    {/* Tag Fitur di Dalam Sub-Materi (Ikon kegiatan dihapus) */}
                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
                        1. Teks Konsep
                      </span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
                        2. Video Edukasi
                      </span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
                        3. Simulasi Sains
                      </span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
                        4. Tugas Mandiri
                      </span>
                      <span className="text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
                        5. Kuis Sub-Materi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi Buka Halaman Khusus */}
                <div className="shrink-0 flex items-center justify-end">
                  <button
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
                  >
                    <span>Buka Sub-Materi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
