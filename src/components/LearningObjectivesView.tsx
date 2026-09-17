import React from 'react';
import { Target, CheckCircle2, Award, Sparkles, BookOpen } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/evaluationData';

export default function LearningObjectivesView() {
  return (
    <div id="capaian-pembelajaran-container" className="space-y-6 pb-12">
      {/* Header Capaian Pembelajaran */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
          Kurikulum Merdeka Indonesia
        </span>
        <h1 className="text-2xl sm:text-3xl font-black">
          Capaian Pembelajaran (CP) & Tujuan Pembelajaran (TP)
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
          Panduan standar kompetensi sains IPA SMP Fase D pada tema Ekologi dan Perubahan Lingkungan Hidup.
        </p>
      </div>

      {/* Rincian CP Umum */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-bold">
            <Target className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            Capaian Pembelajaran Umum (Fase D)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-slate-500 font-bold block mb-0.5">Jenjang / Fase:</span>
            <span className="text-sm font-bold text-slate-900">{LEARNING_OBJECTIVES.fase}</span>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
            <span className="text-slate-500 font-bold block mb-0.5">Mata Pelajaran & Elemen:</span>
            <span className="text-sm font-bold text-slate-900">{LEARNING_OBJECTIVES.mataPelajaran}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-slate-900 font-bold block mb-1">Deskripsi Capaian Fase:</strong>
          {LEARNING_OBJECTIVES.capaianUmum}
        </div>
      </div>

      {/* 4 Tujuan Pembelajaran Spesifik */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#800000]" />
          Tujuan Pembelajaran (TP) Per Sub-Materi:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEARNING_OBJECTIVES.tujuanPembelajaran.map((tp, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-[#800000] text-amber-300 font-black text-xs font-mono">
                  {tp.kode}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Kompetensi Inti
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{tp.judul}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{tp.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dimensi Profil Pelajar Pancasila */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-3xl border-2 border-amber-300 space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Karakter Profil Pelajar Pancasila yang Dikembangkan:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LEARNING_OBJECTIVES.profilPelajarPancasila.map((dim, i) => (
            <div key={i} className="bg-white p-3.5 rounded-xl border border-amber-200 text-xs font-semibold text-slate-800 flex items-center gap-2.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{dim}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
