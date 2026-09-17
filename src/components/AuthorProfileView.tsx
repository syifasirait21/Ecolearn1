import React from 'react';
import { User, Mail, School, Award, CheckCircle2, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { AUTHOR_INFO } from '../data/evaluationData';

export default function AuthorProfileView() {
  return (
    <div id="profil-penyusun-container" className="space-y-6 pb-12">
      {/* Header Profil */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
          Identitas Pengembang Media
        </span>
        <h1 className="text-2xl sm:text-3xl font-black">
          Profil Penyusun & Tim Validator
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
          Media pembelajaran digital ini dikembangkan untuk mendukung implementasi Kurikulum Merdeka mata pelajaran Ilmu Pengetahuan Alam (IPA) tingkat Sekolah Menengah Pertama (SMP).
        </p>
      </div>

      {/* Kartu Profil Utama Penyusun */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Lingkaran Estetik */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 border-4 border-[#800000] shadow-lg flex items-center justify-center text-4xl sm:text-5xl">
              👨‍🏫
            </div>
            <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-xs">
              ✓
            </span>
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#800000] bg-amber-100 px-3 py-0.5 rounded-full inline-block mb-1">
                Pengembang & Guru Pengampu
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {AUTHOR_INFO.namaPenyusun}
              </h2>
              <p className="text-sm font-semibold text-slate-600">
                {AUTHOR_INFO.profesi}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <School className="w-4 h-4 text-[#800000] shrink-0" />
                <span>{AUTHOR_INFO.instansi}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">{AUTHOR_INFO.email}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
              <strong className="text-slate-800">Fokus Keahlian: </strong>
              {AUTHOR_INFO.keahlian}
            </p>
          </div>
        </div>
      </div>

      {/* Tim Dosen Validator & Visi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Award className="w-5 h-5 text-[#800000]" />
            <h3 className="text-base font-black text-slate-900">
              Tim Validator Ahli & Pembimbing
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <span className="text-[10px] font-black uppercase text-[#800000] tracking-wider block">
                Validator Ahli Materi Sains
              </span>
              <p className="text-sm font-bold text-slate-900">{AUTHOR_INFO.validatorMateri}</p>
              <p className="text-slate-600">Memvalidasi kedalaman konsep sains, kebenaran terminologi, dan kesesuaian capaian pembelajaran SMP.</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1">
              <span className="text-[10px] font-black uppercase text-rose-900 tracking-wider block">
                Validator Ahli Media Pembelajaran
              </span>
              <p className="text-sm font-bold text-slate-900">{AUTHOR_INFO.validatorMedia}</p>
              <p className="text-slate-600">Memvalidasi kegunaan sistem navigasi (UI/UX), interaktivitas simulasi, serta kemudahan akses siswa.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-black text-slate-900">
                Visi Pengembangan Media
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-3">
              "{AUTHOR_INFO.visiPengembangan}"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold block">🌿 Komitmen Ramah Lingkungan:</span>
            <span>Media pembelajaran tanpa kertas (paperless) untuk mengurangi jejak karbon dan melatih kebiasaan digital positif siswa.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
