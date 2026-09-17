import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Video, 
  Play, 
  Award, 
  CheckCircle2, 
  Clock, 
  Send, 
  Sparkles, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Upload,
  BookOpen
} from 'lucide-react';
import { SubMaterial, StudentProfile, AssignmentSubmission, QuizResult } from '../types';
import EcosystemSim from './simulations/EcosystemSim';
import GreenhouseSim from './simulations/GreenhouseSim';
import WasteSortingSim from './simulations/WasteSortingSim';
import { sendDataToGoogleSheets } from '../utils/googleSheets';

interface MaterialDetailViewProps {
  subMaterial: SubMaterial;
  allSubMaterials: SubMaterial[];
  onNavigateToSubMaterial: (subId: string) => void;
  onBackToList: () => void;
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
  onMarkComplete: (subId: string) => void;
}

type SubSection = 'teks' | 'video' | 'simulasi' | 'tugas' | 'kuis';

export default function MaterialDetailView({
  subMaterial,
  allSubMaterials,
  onNavigateToSubMaterial,
  onBackToList,
  student,
  onUpdateStudent,
  onMarkComplete,
}: MaterialDetailViewProps) {
  const [activeSection, setActiveSection] = useState<SubSection>('teks');

  // State untuk form penugasan mandiri
  const [assignmentName, setAssignmentName] = useState(student.nama || '');
  const [assignmentClass, setAssignmentClass] = useState(student.kelas || '');
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentLink, setAssignmentLink] = useState('');
  const [assignmentSubmitting, setAssignmentSubmitting] = useState(false);
  const [assignmentSuccessMsg, setAssignmentSuccessMsg] = useState('');

  // State untuk kuis sub-materi interaktif
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCurrentIndex, setQuizCurrentIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizTimer, setQuizTimer] = useState(subMaterial.kuis.durasiMenit * 60);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizSubmitting, setQuizSubmitting] = useState(false);
  const [quizSyncMsg, setQuizSyncMsg] = useState('');

  // Sinkronkan nama & kelas jika student state berubah
  useEffect(() => {
    if (student.nama) setAssignmentName(student.nama);
    if (student.kelas) setAssignmentClass(student.kelas);
  }, [student.nama, student.kelas]);

  // Reset quiz jika subMaterial berubah
  useEffect(() => {
    setActiveSection('teks');
    setQuizStarted(false);
    setQuizCurrentIndex(0);
    setQuizAnswers({});
    setQuizFinished(false);
    setQuizScore(null);
    setQuizSyncMsg('');
    setAssignmentSuccessMsg('');
    setQuizTimer(subMaterial.kuis.durasiMenit * 60);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [subMaterial.id]);

  // Timer Kuis
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizFinished && quizTimer > 0) {
      interval = setInterval(() => {
        setQuizTimer(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizFinished, quizTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Navigasi prev & next sub-materi
  const currentIndex = allSubMaterials.findIndex(s => s.id === subMaterial.id);
  const prevSub = currentIndex > 0 ? allSubMaterials[currentIndex - 1] : null;
  const nextSub = currentIndex < allSubMaterials.length - 1 ? allSubMaterials[currentIndex + 1] : null;

  // Handle Penugasan Mandiri
  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignmentName.trim() || !assignmentClass.trim() || !assignmentText.trim()) {
      alert('Mohon lengkapi Nama, Kelas, dan Deskripsi Jawaban Tugas!');
      return;
    }

    setAssignmentSubmitting(true);
    setAssignmentSuccessMsg('');

    // Update global student profile
    onUpdateStudent({ nama: assignmentName.trim(), kelas: assignmentClass.trim() });

    const submission: AssignmentSubmission = {
      id: `tugas-${Date.now()}`,
      subMateriId: subMaterial.id,
      judulTugas: subMaterial.penugasan.judul,
      nama: assignmentName.trim(),
      kelas: assignmentClass.trim(),
      waktuKirim: new Date().toLocaleString('id-ID'),
      jawabanTeks: assignmentText.trim(),
      linkLampiran: assignmentLink.trim() || '-'
    };

    // Simpan ke localStorage
    const saved = JSON.parse(localStorage.getItem('elearning_tugas_submissions') || '[]');
    saved.push(submission);
    localStorage.setItem('elearning_tugas_submissions', JSON.stringify(saved));

    // Kirim ke Google Sheets (Tab: Tugas)
    const res = await sendDataToGoogleSheets({
      tipe: 'tugas',
      nama: assignmentName.trim(),
      kelas: assignmentClass.trim(),
      judulTugas: subMaterial.penugasan.judul,
      jawaban: assignmentText.trim(),
      linkLampiran: assignmentLink.trim() || '-'
    });

    setAssignmentSubmitting(false);
    setAssignmentSuccessMsg(res.message);
    onMarkComplete(subMaterial.id);
  };

  // Handle Kuis
  const handleSelectQuizAnswer = (soalId: number, pilihanIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [soalId]: pilihanIndex }));
  };

  const handleFinishQuiz = async () => {
    setQuizFinished(true);
    let correctCount = 0;
    subMaterial.kuis.soal.forEach(s => {
      if (quizAnswers[s.id] === s.kunciJawaban) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / subMaterial.kuis.soal.length) * 100);
    setQuizScore(calculatedScore);

    // Kirim ke Google Sheets (Tab: Kuis)
    const studentName = assignmentName || student.nama || 'Siswa SMP';
    const studentClass = assignmentClass || student.kelas || 'Kelas 7';

    setQuizSubmitting(true);
    const res = await sendDataToGoogleSheets({
      tipe: 'kuis',
      nama: studentName,
      kelas: studentClass,
      judulKuis: `Kuis Sub-Materi ${subMaterial.nomor}: ${subMaterial.judul}`,
      skor: calculatedScore,
      benar: correctCount,
      totalSoal: subMaterial.kuis.soal.length
    });
    setQuizSubmitting(false);
    setQuizSyncMsg(res.message);
    onMarkComplete(subMaterial.id);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setQuizCurrentIndex(0);
    setQuizAnswers({});
    setQuizScore(null);
    setQuizSyncMsg('');
    setQuizTimer(subMaterial.kuis.durasiMenit * 60);
  };

  return (
    <div id="sub-material-page-detail" className="space-y-6 pb-16">
      {/* Header Halaman Khusus Sub-Materi */}
      <div className="bg-gradient-to-r from-[#800000] via-[#8f0000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-amber-200 border border-amber-300/30 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Sub-Materi
          </button>
          <span className="text-xs font-semibold text-amber-300">
            • Sub-Materi 0{subMaterial.nomor} dari {allSubMaterials.length}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
          {subMaterial.judul}
        </h1>
        <p className="text-amber-100 text-sm sm:text-base mt-1 font-medium max-w-3xl">
          {subMaterial.subJudul}
        </p>

        {/* Tab-switching internal sub-halaman (Ikon kegiatan dihapus agar tampilan bersih dan rapi) */}
        <div className="mt-6 pt-4 border-t border-amber-500/40 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'teks', label: '1. Teks Konsep' },
            { id: 'video', label: '2. Video Pembelajaran' },
            { id: 'simulasi', label: '3. Simulasi Sains' },
            { id: 'tugas', label: '4. Tugas Mandiri' },
            { id: 'kuis', label: '5. Kuis Sub-Materi' },
          ].map((tabItem) => (
            <button
              key={tabItem.id}
              onClick={() => {
                setActiveSection(tabItem.id as SubSection);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                activeSection === tabItem.id
                  ? 'bg-amber-400 text-maroon-950 shadow-md ring-2 ring-amber-300'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* KONTEN AKTIF SUB-HALAMAN */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 border-2 border-amber-200 shadow-xs">
        {/* 1. TEKS MATERI & FAKTA SAINS */}
        {activeSection === 'teks' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                  Modul Teori & Konsep IPA SMP
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Uraian Materi: {subMaterial.judul}
                </h2>
              </div>
              <button
                onClick={() => setActiveSection('video')}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#800000] hover:underline cursor-pointer"
              >
                Lanjut ke Video Pembelajaran →
              </button>
            </div>

            {subMaterial.teksMateri.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#800000] bg-amber-50 px-4 py-2 rounded-xl border-l-4 border-[#800000]">
                  {sec.bagian}
                </h3>

                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {sec.paragraf.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {sec.poinPenting && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      📌 Poin-Poin Kunci yang Harus Diingat:
                    </div>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-1.5 pl-2">
                      {sec.poinPenting.map((pt, ptIdx) => (
                        <li key={ptIdx} className="leading-normal">{pt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sec.faktaMenarik && (
                  <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                        Tahukah Kamu? (Fakta Sains SMP)
                      </span>
                      <p className="text-xs sm:text-sm text-amber-950 mt-0.5 font-medium">
                        {sec.faktaMenarik}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  setActiveSection('video');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Lanjut ke Halaman 2: Video Pembelajaran →</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. AREA EMBED VIDEO */}
        {activeSection === 'video' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-black uppercase text-red-600 tracking-wider">
                Media Audiovisual Edukasi
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {subMaterial.video.judul}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {subMaterial.video.deskripsi}
              </p>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 bg-black shadow-lg">
              <iframe
                src={subMaterial.video.embedUrl}
                title={subMaterial.video.judul}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Rangkuman Poin Video */}
            <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2">
              <div className="text-xs font-black text-[#800000] uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Catatan Penting dari Video di Atas:
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 pl-1">
                {subMaterial.video.catatanPenting.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  setActiveSection('teks');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Kembali ke Halaman 1: Teks Konsep
              </button>
              <button
                onClick={() => {
                  setActiveSection('simulasi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Lanjut ke Halaman 3: Simulasi Sains →</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. AREA SIMULASI INTERAKTIF */}
        {activeSection === 'simulasi' && (
          <div className="space-y-6 animate-fadeIn">
            {subMaterial.jenisSimulasi === 'ekosistem' && <EcosystemSim />}
            {subMaterial.jenisSimulasi === 'rumah_kaca' && <GreenhouseSim />}
            {subMaterial.jenisSimulasi === 'pilah_sampah' && <WasteSortingSim />}

            <div className="pt-4 flex justify-between items-center border-t border-slate-200">
              <button
                onClick={() => {
                  setActiveSection('video');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Kembali ke Halaman 2: Video
              </button>
              <button
                onClick={() => {
                  setActiveSection('tugas');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Lanjut ke Halaman 4: Tugas Mandiri →</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. FORM PENUGASAN MANDIRI */}
        {activeSection === 'tugas' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-700 tracking-wider">
                <Clock className="w-4 h-4 text-rose-600" />
                <span>Batas Waktu Pengumpulan: <strong>{subMaterial.penugasan.deadline}</strong></span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {subMaterial.penugasan.judul}
              </h2>
            </div>

            {/* Petunjuk & Rubrik Tugas */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3">
              <h4 className="text-sm font-bold text-[#800000]">Instruksi Tugas:</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {subMaterial.penugasan.instruksi}
              </p>
              <div className="pt-2 border-t border-amber-200">
                <div className="text-xs font-bold text-slate-800 mb-1">Kriteria Penilaian Guru (Rubrik):</div>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-1">
                  {subMaterial.penugasan.rubrik.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form Pengumpulan Siswa (Tanpa Perlu Login) */}
            <form onSubmit={handleSubmitAssignment} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Lembar Pengumpulan Tugas Siswa
                </h4>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Tanpa Login (Cukup Nama & Kelas)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap Siswa <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kelas <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: VII-B / VIII-A"
                    value={assignmentClass}
                    onChange={(e) => setAssignmentClass(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Uraian Jawaban / Laporan Investigasi Lingkungan <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tuliskan hasil pengamatan, analisis komponen, dan alternatif solusi lingkungan yang kamu temukan di sini..."
                  value={assignmentText}
                  onChange={(e) => setAssignmentText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Link Dokumen Tambahan / Foto Tugas (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh link Google Drive, Canva, atau foto karya daur ulang"
                  value={assignmentLink}
                  onChange={(e) => setAssignmentLink(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
                />
              </div>

              {assignmentSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Tugas Berhasil Diserahkan! </strong>
                    {assignmentSuccessMsg}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={assignmentSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#800000] hover:bg-[#650000] text-amber-200 hover:text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{assignmentSubmitting ? 'Mengirim Data...' : 'Kirim Tugas Sekarang'}</span>
                </button>
              </div>
            </form>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  setActiveSection('simulasi');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ← Kembali ke Halaman 3: Simulasi
              </button>
              <button
                onClick={() => {
                  setActiveSection('kuis');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Lanjut ke Halaman 5: Kuis Sub-Materi →</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. KUIS INTERAKTIF SUB-MATERI */}
        {activeSection === 'kuis' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                  Uji Pemahaman Cepat Sub-Materi {subMaterial.nomor}
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-1">
                  Kuis Interaktif ({subMaterial.kuis.soal.length} Soal)
                </h2>
              </div>

              {quizStarted && !quizFinished && (
                <div className="bg-rose-100 text-rose-900 border border-rose-300 px-3.5 py-1.5 rounded-xl font-mono font-black text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
                  <span>Sisa Waktu: {formatTime(quizTimer)}</span>
                </div>
              )}
            </div>

            {!quizStarted && !quizFinished ? (
              /* Kartu Mulai Kuis */
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-2xl border-2 border-amber-200 text-center max-w-xl mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center text-2xl font-black mx-auto shadow-md">
                  ⏱️
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Siap Menguji Pemahaman Sub-Materi Ini?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kuis ini terdiri dari {subMaterial.kuis.soal.length} pertanyaan pilihan ganda dengan durasi {subMaterial.kuis.durasiMenit} menit. Skor dan pembahasan ilmiah akan langsung muncul setelah selesai!
                </p>
                <div className="text-xs bg-white py-2 px-4 rounded-xl border border-amber-200 text-slate-700">
                  Peserta: <strong>{student.nama || 'Siswa SMP'}</strong> ({student.kelas || 'Kelas 7'})
                </div>
                <button
                  onClick={() => {
                    setQuizStarted(true);
                    setQuizTimer(subMaterial.kuis.durasiMenit * 60);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#800000] text-amber-300 hover:text-white hover:bg-[#600000] font-black text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Mulai Kerjakan Kuis
                </button>
              </div>
            ) : !quizFinished ? (
              /* Lembar Pengerjaan Kuis */
              <div className="space-y-6">
                {/* Progres Soal */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Pertanyaan {quizCurrentIndex + 1} dari {subMaterial.kuis.soal.length}</span>
                  <span>Terjawab: {Object.keys(quizAnswers).length}/{subMaterial.kuis.soal.length}</span>
                </div>

                {/* Kartu Soal */}
                {(() => {
                  const q = subMaterial.kuis.soal[quizCurrentIndex];
                  return (
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {quizCurrentIndex + 1}. {q.pertanyaan}
                      </h4>

                      <div className="space-y-2.5">
                        {q.pilihan.map((pil, pilIdx) => {
                          const isSelected = quizAnswers[q.id] === pilIdx;
                          return (
                            <button
                              key={pilIdx}
                              onClick={() => handleSelectQuizAnswer(q.id, pilIdx)}
                              className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all flex items-center gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-amber-100 border-[#800000] text-slate-900 shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected ? 'bg-[#800000] text-white' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {String.fromCharCode(65 + pilIdx)}
                              </span>
                              <span>{pil}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Navigasi Soal Kuis */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={quizCurrentIndex === 0}
                    onClick={() => setQuizCurrentIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 disabled:opacity-30 cursor-pointer"
                  >
                    ← Soal Sebelumnya
                  </button>

                  <div className="flex gap-1.5">
                    {subMaterial.kuis.soal.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuizCurrentIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold cursor-pointer ${
                          quizCurrentIndex === idx
                            ? 'bg-[#800000] text-white'
                            : quizAnswers[s.id] !== undefined
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {quizCurrentIndex + 1 < subMaterial.kuis.soal.length ? (
                    <button
                      onClick={() => setQuizCurrentIndex(prev => prev + 1)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-maroon-950 hover:bg-amber-300 cursor-pointer"
                    >
                      Soal Berikutnya →
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishQuiz}
                      className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm cursor-pointer"
                    >
                      Selesai & Kumpulkan ✓
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Hasil & Pembahasan Kuis */
              <div className="space-y-6">
                <div className="bg-gradient-to-b from-amber-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-amber-300 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-2xl font-black text-slate-900">
                    Hasil Kuis Sub-Materi {subMaterial.nomor}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    Siswa: <strong>{student.nama || 'Siswa SMP'}</strong> ({student.kelas || 'Kelas 7'})
                  </p>

                  <div className="inline-block bg-white border-2 border-amber-400 rounded-2xl px-8 py-4 shadow-sm mb-4">
                    <div className="text-xs font-bold text-slate-500 uppercase">Nilai Akhir</div>
                    <div className="text-4xl font-black text-[#800000]">{quizScore} / 100</div>
                  </div>

                  {quizSyncMsg && (
                    <div className="max-w-md mx-auto p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{quizSyncMsg}</span>
                    </div>
                  )}

                  <div>
                    <button
                      onClick={handleRestartQuiz}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis
                    </button>
                  </div>
                </div>

                {/* Pembahasan Soal Ilmiah */}
                <div className="space-y-4">
                  <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Kunci Jawaban & Pembahasan Ilmiah:
                  </h4>

                  {subMaterial.kuis.soal.map((q, qIdx) => {
                    const studentAns = quizAnswers[q.id];
                    const isCorrect = studentAns === q.kunciJawaban;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border-2 text-xs sm:text-sm space-y-2 ${
                          isCorrect ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            {qIdx + 1}. {q.pertanyaan}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-black shrink-0 ${
                            isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                          }`}>
                            {isCorrect ? 'Benar ✓' : 'Salah ✗'}
                          </span>
                        </div>

                        <div className="text-slate-600">
                          Jawabanmu: <strong>{studentAns !== undefined ? `${String.fromCharCode(65 + studentAns)}. ${q.pilihan[studentAns]}` : 'Tidak dijawab'}</strong>
                        </div>

                        <div className="text-emerald-800 font-semibold">
                          Kunci Jawaban Benar: <strong>{String.fromCharCode(65 + q.kunciJawaban)}. {q.pilihan[q.kunciJawaban]}</strong>
                        </div>

                        <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs leading-relaxed">
                          <strong>Pembahasan: </strong>{q.pembahasan}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TOMBOL NAVIGASI NEXT & BACK DI BAGIAN BAWAH SESUAI SYARAT PROMPT */}
      <div 
        id="sub-materi-bottom-nav" 
        className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        {/* Tombol BACK Sub-Materi */}
        <div>
          {prevSub ? (
            <button
              onClick={() => onNavigateToSubMaterial(prevSub.id)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-xs group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">SEBELUMNYA (BACK)</span>
                <span className="truncate max-w-[140px] sm:max-w-[180px] block">Sub {prevSub.nomor}: {prevSub.judul}</span>
              </div>
            </button>
          ) : (
            <button
              onClick={onBackToList}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-50 text-slate-500 text-xs font-bold border border-slate-200 cursor-pointer hover:bg-slate-100"
            >
              <BookOpen className="w-3.5 h-3.5" /> Daftar Sub-Materi
            </button>
          )}
        </div>

        {/* Indikator Tengah */}
        <div className="text-center hidden md:block">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">
            Sub-Materi {subMaterial.nomor} dari {allSubMaterials.length}
          </span>
          <span className="text-xs font-bold text-[#800000]">{subMaterial.judul}</span>
        </div>

        {/* Tombol NEXT Sub-Materi */}
        <div>
          {nextSub ? (
            <button
              onClick={() => onNavigateToSubMaterial(nextSub.id)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md group"
            >
              <div className="text-right">
                <span className="block text-[10px] text-amber-900 font-bold uppercase">SELANJUTNYA (NEXT)</span>
                <span className="truncate max-w-[140px] sm:max-w-[180px] block">Sub {nextSub.nomor}: {nextSub.judul}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-maroon-950 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onBackToList}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-black shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Semua Sub-Materi Selesai!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
