import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Target, 
  UserCheck, 
  Award, 
  MessageSquare, 
  User, 
  FileSpreadsheet, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Recycle,
  Trees,
  CheckCircle2
} from 'lucide-react';
import { MainTab, StudentProfile } from '../types';

interface HomeViewProps {
  onNavigate: (tab: MainTab) => void;
  onOpenSubMaterial: (subId: string) => void;
  student: StudentProfile;
  onOpenStudentModal: () => void;
}

export default function HomeView({
  onNavigate,
  onOpenSubMaterial,
  student,
  onOpenStudentModal,
}: HomeViewProps) {
  // Grid tombol ikon menu melingkar yang estetik sesuai instruksi prompt!
  const circularMenuButtons = [
    {
      id: 'petunjuk',
      tab: 'petunjuk' as MainTab,
      label: 'Petunjuk',
      sublabel: 'Panduan Belajar',
      icon: HelpCircle,
      bgCircle: 'bg-amber-400 hover:bg-amber-300 text-maroon-950',
      borderRing: 'ring-4 ring-amber-200 shadow-md',
      emoji: '🧭'
    },
    {
      id: 'capaian',
      tab: 'capaian' as MainTab,
      label: 'Capaian CP/TP',
      sublabel: 'Kurikulum Merdeka',
      icon: Target,
      bgCircle: 'bg-[#800000] hover:bg-[#680000] text-amber-300',
      borderRing: 'ring-4 ring-rose-200 shadow-md',
      emoji: '🎯'
    },
    {
      id: 'absen',
      tab: 'absen' as MainTab,
      label: 'Absensi',
      sublabel: 'Presensi Siswa',
      icon: UserCheck,
      bgCircle: 'bg-amber-500 hover:bg-amber-400 text-white',
      borderRing: 'ring-4 ring-amber-300 shadow-md',
      emoji: '📝'
    },
    {
      id: 'materi',
      tab: 'materi' as MainTab,
      label: 'Materi IPA',
      sublabel: '3 Sub-Materi Lengkap',
      icon: BookOpen,
      bgCircle: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      borderRing: 'ring-4 ring-emerald-200 shadow-md',
      emoji: '🔬'
    },
    {
      id: 'evaluasi',
      tab: 'evaluasi' as MainTab,
      label: 'Evaluasi & Kuis',
      sublabel: 'Uji Pemahaman & Sertifikat',
      icon: Award,
      bgCircle: 'bg-[#990000] hover:bg-[#800000] text-amber-200',
      borderRing: 'ring-4 ring-amber-300 shadow-md',
      emoji: '🏆'
    },
    {
      id: 'forum',
      tab: 'forum' as MainTab,
      label: 'Forum Diskusi',
      sublabel: 'Tanya Jawab Sains',
      icon: MessageSquare,
      bgCircle: 'bg-sky-600 hover:bg-sky-500 text-white',
      borderRing: 'ring-4 ring-sky-200 shadow-md',
      emoji: '💬'
    },
    {
      id: 'profil',
      tab: 'profil' as MainTab,
      label: 'Profil Penyusun',
      sublabel: 'Identitas Pengembang',
      icon: User,
      bgCircle: 'bg-amber-400 hover:bg-amber-300 text-maroon-900',
      borderRing: 'ring-4 ring-amber-200 shadow-md',
      emoji: '👨‍🏫'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner Ceria */}
      <section 
        id="home-banner-ceria"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#800000] via-[#8c0a0a] to-[#a31212] text-white p-6 sm:p-10 shadow-xl border-4 border-amber-400"
      >
        {/* Ornamen Lingkaran Ceria di Latar Belakang */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-12 w-52 h-52 rounded-full bg-amber-300/15 blur-xl pointer-events-none" />
        <div className="absolute top-4 right-10 text-6xl select-none opacity-20 hidden md:block">
          🌍🌱☀️
        </div>

        <div className="relative z-10 max-w-3xl">
          {/* Tagline Ceria */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-amber-950 text-xs sm:text-sm font-extrabold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>MODUL PEMBELAJARAN DIGITAL IPA SMP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-3">
            Ayo Belajar <span className="text-amber-300 underline decoration-amber-400 decoration-wavy decoration-2">Perubahan Lingkungan!</span>
          </h1>

          <p className="text-amber-100 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl font-normal">
            Jelajahi ekosistem bumi, selidiki faktor penyebab pencemaran air, udara, dan tanah, jalankan laboratorium simulasi interaktif, serta temukan solusi nyata pengelolaan sampah 3R untuk masa depan bumi kita!
          </p>

          {/* Sapaan Siswa & Tombol Aksi Utama */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('materi')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-[#800000] font-extrabold text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-[#800000]" />
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#800000]" />
            </button>

            <button
              onClick={() => onNavigate('absen')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-amber-300/40 backdrop-blur-xs transition-colors cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>Isi Presensi Belajar</span>
            </button>
          </div>

          {/* Quick Info Bar Siswa */}
          <div className="mt-6 pt-4 border-t border-amber-400/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Status Belajar: {student.nama ? `Aktif (${student.nama} - ${student.kelas})` : 'Tamu (Belum input nama)'}</span>
            </div>
            {!student.nama && (
              <button
                onClick={onOpenStudentModal}
                className="underline text-amber-300 hover:text-white font-bold cursor-pointer"
              >
                Ketik Nama & Kelas
              </button>
            )}
          </div>
        </div>
      </section>

      {/* GRID TOMBOL IKON MENU MELINGKAR YANG ESTETIK */}
      <section id="menu-ikon-melingkar" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="px-3 py-1 bg-amber-100 text-[#800000] text-xs font-black rounded-full uppercase tracking-wider">
            Akses Cepat Pembelajaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Pusat Navigasi Belajar Interaktif
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Klik tombol ikon lingkaran di bawah untuk langsung berpindah ke halaman khusus yang kamu tuju.
          </p>
        </div>

        {/* The Aesthetic Circular Icon Grid */}
        <div className="grid grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-5 justify-items-center">
          {circularMenuButtons.map((btn) => {
            const Icon = btn.icon;
            return (
              <button
                key={btn.id}
                id={`btn-lingkaran-${btn.id}`}
                onClick={() => onNavigate(btn.tab)}
                className="group flex flex-col items-center text-center cursor-pointer transition-transform hover:-translate-y-1.5 focus:outline-hidden w-full max-w-[120px]"
              >
                {/* Lingkaran Ikon Estetik Berwarna Ceria */}
                <div 
                  className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full ${btn.bgCircle} ${btn.borderRing} flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 relative shrink-0`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 transition-transform group-hover:rotate-6" />
                  <span className="absolute -top-1 -right-1 text-sm sm:text-base">{btn.emoji}</span>
                </div>

                <span className="text-xs sm:text-sm font-black text-slate-800 mt-2 sm:mt-3 group-hover:text-[#800000] transition-colors leading-tight">
                  {btn.label}
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1 max-w-[110px] mt-0.5">
                  {btn.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* KARTU 3 SUB-MATERI PERUBAHAN LINGKUNGAN */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#800000]" /> 
              3 Modul Sub-Materi Pembelajaran
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Setiap sub-materi dilengkapi teks konsep, embed video, simulasi sains, tugas mandiri, dan kuis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('materi')}
            className="text-xs font-bold text-[#800000] hover:text-[#550000] flex items-center gap-1 cursor-pointer"
          >
            Buka Menu Materi Lengkap <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card Sub-1 */}
          <div 
            onClick={() => onOpenSubMaterial('sub-1')}
            className="group bg-gradient-to-b from-emerald-50/70 to-white rounded-2xl border-2 border-emerald-200 p-5 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                  01
                </span>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  ⏱️ 45 Menit
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-emerald-950 group-hover:text-emerald-700 transition-colors mb-2">
                Keseimbangan Ekosistem & Daya Dukung
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                Memahami interaksi komponen biotik-abiotik, daya lentur lingkungan hidup, dan efek terganggunya rantai makanan.
              </p>
            </div>
            <div className="pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span className="flex items-center gap-1">🌱 Simulasi Ekosistem</span>
              <span className="group-hover:translate-x-1 transition-transform">Buka →</span>
            </div>
          </div>

          {/* Card Sub-2 */}
          <div 
            onClick={() => onOpenSubMaterial('sub-2')}
            className="group bg-gradient-to-b from-amber-50/70 to-white rounded-2xl border-2 border-amber-200 p-5 hover:border-amber-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center">
                  02
                </span>
                <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full">
                  ⏱️ 50 Menit
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-amber-950 group-hover:text-amber-700 transition-colors mb-2">
                Pencemaran Air, Udara & Tanah
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                Menyelidiki limbah cair industri, eutrofikasi, emisi karbon kendaraan, fenomena hujan asam, dan penipisan ozon.
              </p>
            </div>
            <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span className="flex items-center gap-1">🔥 Simulasi Rumah Kaca</span>
              <span className="group-hover:translate-x-1 transition-transform">Buka →</span>
            </div>
          </div>

          {/* Card Sub-3 */}
          <div 
            onClick={() => onOpenSubMaterial('sub-3')}
            className="group bg-gradient-to-b from-rose-50/70 to-white rounded-2xl border-2 border-rose-200 p-5 hover:border-rose-400 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#800000] text-white font-black text-xs flex items-center justify-center">
                  03
                </span>
                <span className="text-[11px] font-bold bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full">
                  ⏱️ 45 Menit
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-rose-950 group-hover:text-rose-700 transition-colors mb-2">
                Pengelolaan Limbah & Aksi 3R
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                Praktik pemilahan sampah organik, anorganik, dan B3 berbahaya, metode daur ulang, serta inovasi bioremediasi.
              </p>
            </div>
            <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-xs font-bold text-rose-800">
              <span className="flex items-center gap-1">♻️ Game Pilah Sampah</span>
              <span className="group-hover:translate-x-1 transition-transform">Buka →</span>
            </div>
          </div>
        </div>
      </section>

      {/* FITUR UNGGULAN & KELEBIHAN MEDIA */}
      <section className="bg-amber-50/60 rounded-3xl p-6 border border-amber-200">
        <h4 className="text-base font-black text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          Kelebihan Media Pembelajaran E-Learning Ini:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <div className="text-2xl mb-1">⚡</div>
            <h5 className="text-sm font-bold text-slate-900">Tanpa Perlu Login</h5>
            <p className="text-xs text-slate-600 mt-1">Cukup ketikkan nama dan kelas, langsung siap belajar dan mengumpulkan tugas.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <div className="text-2xl mb-1">🎮</div>
            <h5 className="text-sm font-bold text-slate-900">Simulasi Interaktif</h5>
            <p className="text-xs text-slate-600 mt-1">Laboratorium virtual sains untuk bereksperimen langsung dengan parameter ekosistem.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <div className="text-2xl mb-1">📊</div>
            <h5 className="text-sm font-bold text-slate-900">Sinkron Google Sheets</h5>
            <p className="text-xs text-slate-600 mt-1">Rekap data absensi, tugas, dan nilai kuis otomatis masuk ke spreadsheet guru.</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200">
            <div className="text-2xl mb-1">📜</div>
            <h5 className="text-sm font-bold text-slate-900">Sertifikat Digital</h5>
            <p className="text-xs text-slate-600 mt-1">Dapatkan sertifikat hasil belajar instan setelah menuntaskan evaluasi akhir.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
