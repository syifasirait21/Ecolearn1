import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Printer, 
  Send, 
  Sparkles, 
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { StudentProfile, QuizQuestion } from '../types';
import { COMPREHENSIVE_EVALUATION_QUESTIONS } from '../data/evaluationData';
import { sendDataToGoogleSheets } from '../utils/googleSheets';

interface EvaluationViewProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

export default function EvaluationView({ student, onUpdateStudent }: EvaluationViewProps) {
  const [nama, setNama] = useState(student.nama || '');
  const [kelas, setKelas] = useState(student.kelas || '');
  const [examStarted, setExamStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(15 * 60); // 15 menit
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (student.nama) setNama(student.nama);
    if (student.kelas) setKelas(student.kelas);
  }, [student.nama, student.kelas]);

  // Timer Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (examStarted && !examFinished && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timerSeconds]);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    if (!nama.trim() || !kelas.trim()) {
      alert('Mohon lengkapi Nama dan Kelas terlebih dahulu sebelum memulai evaluasi!');
      return;
    }
    onUpdateStudent({ nama: nama.trim(), kelas: kelas.trim() });
    setExamStarted(true);
    setTimerSeconds(15 * 60);
    setAnswers({});
    setCurrentIdx(0);
    setExamFinished(false);
    setFinalScore(null);
    setSyncStatusMsg('');
  };

  const handleSelectAnswer = (soalId: number, pilihanIdx: number) => {
    setAnswers(prev => ({ ...prev, [soalId]: pilihanIdx }));
  };

  const handleFinishExam = async () => {
    setExamFinished(true);
    let correct = 0;
    COMPREHENSIVE_EVALUATION_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.kunciJawaban) {
        correct += 1;
      }
    });

    const score = Math.round((correct / COMPREHENSIVE_EVALUATION_QUESTIONS.length) * 100);
    setCorrectCount(correct);
    setFinalScore(score);

    // Kirim ke Google Sheets Tab: Kuis
    setSubmitting(true);
    const res = await sendDataToGoogleSheets({
      tipe: 'kuis',
      nama: nama.trim(),
      kelas: kelas.trim(),
      judulKuis: 'Ujian Evaluasi Akhir: Perubahan Lingkungan SMP',
      skor: score,
      benar: correct,
      totalSoal: COMPREHENSIVE_EVALUATION_QUESTIONS.length
    });
    setSubmitting(false);
    setSyncStatusMsg(res.message);
  };

  const getPredicate = (score: number) => {
    if (score >= 85) return { grade: 'A (Sangat Baik / Mahir)', color: 'text-emerald-700 bg-emerald-100', desc: 'Luar biasa! Pemahamanmu mengenai ekosistem, polusi, dan aksi 3R sangat mendalam.' };
    if (score >= 70) return { grade: 'B (Baik / Cakap)', color: 'text-amber-800 bg-amber-100', desc: 'Bagus sekali! Kamu telah menguasai indikator utama perubahan lingkungan SMP dengan baik.' };
    return { grade: 'C (Perlu Bimbingan)', color: 'text-rose-800 bg-rose-100', desc: 'Tetap semangat! Pelajari kembali modul materi dan tonton video pembahasannya ya.' };
  };

  const currentQuestion = COMPREHENSIVE_EVALUATION_QUESTIONS[currentIdx];

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div id="evaluation-page-container" className="space-y-6 pb-16">
      {/* Header Evaluasi */}
      <div className="bg-gradient-to-r from-[#800000] via-[#8c0a0a] to-[#a31212] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              Uji Kompetensi Sains SMP
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Evaluasi Akhir: Bab Perubahan Lingkungan
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Ujilah pemahamanmu terhadap seluruh sub-materi (ekosistem, pencemaran air, udara, tanah, serta aksi 3R). Dapatkan sertifikat kelulusan digital setelah menyelesaikan ujian!
            </p>
          </div>

          {examStarted && !examFinished && (
            <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-amber-300/40 text-center shrink-0">
              <div className="text-[11px] text-amber-200 font-semibold flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Sisa Waktu
              </div>
              <div className="text-2xl font-black font-mono text-amber-300 mt-0.5">
                {formatTimer(timerSeconds)}
              </div>
            </div>
          )}
        </div>
      </div>

      {!examStarted && !examFinished ? (
        /* Form Mulai Evaluasi */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center text-3xl mx-auto shadow-md">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Ujian Pemahaman Komprehensif
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Terdiri dari 10 butir soal pilihan ganda dengan durasi maksimal 15 menit. Pastikan identitasmu telah sesuai untuk pencetakan sertifikat.
            </p>
          </div>

          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap Siswa <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ketik nama lengkapmu..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kelas & Asal Sekolah <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: VII-B / SMP Negeri 1"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white font-medium"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartExam}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#800000] hover:bg-[#600000] text-amber-300 hover:text-white font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Award className="w-5 h-5 text-amber-400" />
              <span>Mulai Ujian Evaluasi Sekarang</span>
            </button>
          </div>
        </div>
      ) : !examFinished ? (
        /* Lembar Pengerjaan Soal */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs space-y-6">
          {/* Header Soal & Progres */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#800000] text-white font-black text-sm flex items-center justify-center">
                {currentIdx + 1}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Soal Nomor {currentIdx + 1} dari {COMPREHENSIVE_EVALUATION_QUESTIONS.length}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-500">
              Terjawab: {Object.keys(answers).length} / {COMPREHENSIVE_EVALUATION_QUESTIONS.length}
            </div>
          </div>

          {/* Pertanyaan */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQuestion.pertanyaan}
            </p>

            <div className="space-y-3 pt-2">
              {currentQuestion.pilihan.map((pil, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(currentQuestion.id, idx)}
                    className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium border-2 transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-[#800000] text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-[#800000] text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{pil}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Palet Nomor Soal */}
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
            <div className="text-xs font-bold text-slate-700 mb-2">Navigasi Nomor Soal:</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {COMPREHENSIVE_EVALUATION_QUESTIONS.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(i)}
                  className={`h-9 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    currentIdx === i
                      ? 'bg-[#800000] text-white ring-2 ring-amber-400'
                      : answers[q.id] !== undefined
                      ? 'bg-emerald-200 text-emerald-950 font-black'
                      : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Tombol Navigasi Bawah */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 disabled:opacity-30 cursor-pointer"
            >
              ← Soal Sebelumnya
            </button>

            {currentIdx + 1 < COMPREHENSIVE_EVALUATION_QUESTIONS.length ? (
              <button
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-400 text-maroon-950 hover:bg-amber-300 cursor-pointer"
              >
                Soal Berikutnya →
              </button>
            ) : (
              <button
                onClick={handleFinishExam}
                className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-emerald-600 text-white hover:bg-emerald-700 shadow-md cursor-pointer"
              >
                Kirim & Selesaikan Ujian ✓
              </button>
            )}
          </div>
        </div>
      ) : (
        /* HASIL EVALUASI & SERTIFIKAT DIGITAL */
        <div className="space-y-8 animate-fadeIn">
          {/* Ringkasan Skor */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 text-center shadow-xs space-y-4">
            <div className="text-5xl mb-1">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Selamat! Kamu Telah Menuntaskan Evaluasi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Berikut adalah rekapan nilai dan sertifikat hasil belajar sainsmu.
            </p>

            <div className="inline-flex items-center gap-6 bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-xs">
              <div className="text-center">
                <div className="text-xs font-bold text-slate-500 uppercase">Skor Nilai</div>
                <div className="text-4xl sm:text-5xl font-black text-[#800000]">{finalScore}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Skala 100</div>
              </div>
              <div className="h-12 w-px bg-amber-200" />
              <div className="text-center">
                <div className="text-xs font-bold text-slate-500 uppercase">Jawaban Benar</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {correctCount} <span className="text-sm text-slate-500 font-normal">/ {COMPREHENSIVE_EVALUATION_QUESTIONS.length}</span>
                </div>
              </div>
            </div>

            {finalScore !== null && (
              <div className="max-w-md mx-auto">
                {(() => {
                  const pred = getPredicate(finalScore);
                  return (
                    <div className={`p-4 rounded-2xl ${pred.color} border text-xs sm:text-sm font-medium text-left space-y-1`}>
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> Predikat: {pred.grade}
                      </div>
                      <p>{pred.desc}</p>
                    </div>
                  );
                })()}
              </div>
            )}

            {syncStatusMsg && (
              <div className="max-w-md mx-auto p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{syncStatusMsg}</span>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrintCertificate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-bold text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Cetak / Unduh Sertifikat (PDF)
              </button>
              <button
                onClick={() => setExamFinished(false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Ulangi Ujian
              </button>
            </div>
          </div>

          {/* DESAIN SERTIFIKAT DIGITAL SISWA */}
          <div 
            id="sertifikat-digital-siswa"
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-12 border-4 sm:border-8 border-amber-400 shadow-2xl relative overflow-hidden text-center max-w-3xl w-full mx-auto"
            style={{
              backgroundImage: 'radial-gradient(#fef3c7 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {/* Ornamen Sudut Marun */}
            <div className="absolute top-0 left-0 w-10 sm:w-16 h-10 sm:h-16 bg-[#800000] [clip-path:polygon(0_0,100%_0,0_100%)]" />
            <div className="absolute top-0 right-0 w-10 sm:w-16 h-10 sm:h-16 bg-[#800000] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
            <div className="absolute bottom-0 left-0 w-10 sm:w-16 h-10 sm:h-16 bg-[#800000] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
            <div className="absolute bottom-0 right-0 w-10 sm:w-16 h-10 sm:h-16 bg-[#800000] [clip-path:polygon(100%_0,0_100%,100%_100%)]" />

            <div className="relative z-10 space-y-4">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-amber-400 text-[#800000] flex items-center justify-center font-black text-xl sm:text-2xl mx-auto border-4 border-white shadow-md">
                🌿
              </div>

              <div className="space-y-1">
                <span className="text-[11px] sm:text-sm font-black uppercase text-[#800000] tracking-widest block">
                  SERTIFIKAT KELULUSAN PEMBELAJARAN
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  E-Learning IPA Perubahan Lingkungan
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 italic">Nomor: CERT-ECO/{Date.now().toString().slice(-6)}/SMP</p>
              </div>

              <div className="py-2">
                <p className="text-xs text-slate-600">Diberikan secara terhormat kepada:</p>
                <div className="text-xl sm:text-3xl font-black text-[#800000] underline decoration-amber-400 decoration-4 mt-1 break-words">
                  {nama || 'Nama Siswa'}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                  {kelas || 'Kelas Siswa SMP'}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Telah menyelesaikan seluruh rangkaian modul materi, laboratorium simulasi sains interaktif, serta evaluasi komprehensif Bab Perubahan Lingkungan dengan capaian nilai:
              </p>

              <div className="inline-block bg-amber-100 border-2 border-amber-400 px-5 sm:px-6 py-2 sm:py-2.5 rounded-2xl">
                <span className="text-lg sm:text-2xl font-black text-[#800000]">
                  Nilai: {finalScore} / 100
                </span>
              </div>

              {/* Tanda Tangan Digital */}
              <div className="pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs text-slate-700 border-t border-amber-200 mt-4 sm:mt-6">
                <div>
                  <div className="text-[11px] text-slate-500">Tanggal Terbit:</div>
                  <div className="font-bold">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Pengembang Media / Guru IPA:</div>
                  <div className="font-bold text-[#800000]">Rifki Hidayat, S.Pd., M.Pd.</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Verified Digital Badge ✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pembahasan Soal Evaluasi Lengkap */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              Pembahasan Lengkap 10 Soal Evaluasi:
            </h3>

            <div className="space-y-3">
              {COMPREHENSIVE_EVALUATION_QUESTIONS.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.kunciJawaban;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      isCorrect ? 'bg-emerald-50/60 border-emerald-300' : 'bg-rose-50/60 border-rose-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {idx + 1}. {q.pertanyaan}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                        isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        {isCorrect ? 'Benar ✓' : 'Salah ✗'}
                      </span>
                    </div>

                    <div className="text-slate-600">
                      Jawabanmu: <strong>{userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.pilihan[userAns]}` : 'Tidak dijawab'}</strong>
                    </div>

                    <div className="text-emerald-800 font-bold">
                      Kunci Jawaban: {String.fromCharCode(65 + q.kunciJawaban)}. {q.pilihan[q.kunciJawaban]}
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs">
                      <strong>Penjelasan Ilmiah: </strong>{q.pembahasan}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
