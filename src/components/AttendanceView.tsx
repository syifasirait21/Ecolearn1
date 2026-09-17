import React, { useState, useEffect } from 'react';
import { UserCheck, Clock, CheckCircle2, AlertCircle, FileSpreadsheet, RefreshCw, Send, User } from 'lucide-react';
import { StudentProfile, AttendanceRecord } from '../types';
import { sendDataToGoogleSheets } from '../utils/googleSheets';

interface AttendanceViewProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
  onOpenSheetsModal: () => void;
  isSheetsConfigured: boolean;
}

export default function AttendanceView({
  student,
  onUpdateStudent,
  onOpenSheetsModal,
  isSheetsConfigured,
}: AttendanceViewProps) {
  const [nama, setNama] = useState(student.nama || '');
  const [kelas, setKelas] = useState(student.kelas || '');
  const [status, setStatus] = useState<'Hadir' | 'Izin' | 'Sakit'>('Hadir');
  const [catatan, setCatatan] = useState('Siap mengikuti pembelajaran IPA perubahan lingkungan dengan sungguh-sungguh.');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  // Sinkronkan realtime clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ambil riwayat dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem('elearning_absensi_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Error parse absensi:', e);
      }
    }
  }, []);

  // Update form jika student profile berubah
  useEffect(() => {
    if (student.nama) setNama(student.nama);
    if (student.kelas) setKelas(student.kelas);
  }, [student.nama, student.kelas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !kelas.trim()) {
      alert('Nama dan Kelas wajib diisi!');
      return;
    }

    setLoading(true);
    setFeedback(null);

    // Update identitas siswa di parent
    onUpdateStudent({ nama: nama.trim(), kelas: kelas.trim() });

    const newRecord: AttendanceRecord = {
      id: `absen-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      nama: nama.trim(),
      kelas: kelas.trim(),
      status,
      catatan: catatan.trim() || '-'
    };

    // Kirim ke Google Sheets (Tab: Absensi)
    const res = await sendDataToGoogleSheets({
      tipe: 'absensi',
      nama: nama.trim(),
      kelas: kelas.trim(),
      status,
      catatan: catatan.trim() || '-'
    });

    newRecord.syncedToSheets = res.success;

    // Simpan ke local history
    const updatedHistory = [newRecord, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('elearning_absensi_history', JSON.stringify(updatedHistory));

    setLoading(false);
    setFeedback({
      type: res.success ? 'success' : 'error',
      message: res.message
    });
  };

  return (
    <div id="attendance-page-container" className="space-y-6 pb-12">
      {/* Header Presensi */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
              Presensi Belajar Digital
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Absensi Kehadiran Siswa
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Isi data kehadiranmu sebelum memulai pembelajaran IPA. Data absensi otomatis tersimpan secara aman dan tersinkron ke Google Sheets guru.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs px-4 py-3 rounded-2xl border border-amber-300/30 text-right shrink-0">
            <div className="text-[11px] text-amber-200 font-semibold flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5" /> Waktu Saat Ini
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5">
              {currentTimeStr || 'Memuat waktu...'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Presensi Siswa */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Formulir Presensi Siswa
              </h2>
            </div>
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
              Sistem Tanpa Login
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kelas & Nomor Absen <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: VII-B / Absen 12"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Status Kehadiran <span className="text-rose-600">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Hadir', 'Izin', 'Sakit'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      status === st
                        ? st === 'Hadir'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-xs'
                          : st === 'Izin'
                          ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-xs'
                          : 'bg-rose-50 border-rose-600 text-rose-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{st === 'Hadir' ? '✅' : st === 'Izin' ? '📝' : '🏥'}</span>
                    <span>{st}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catatan / Kesiapan Belajar
              </label>
              <textarea
                rows={3}
                placeholder="Tuliskan kesiapan belajar atau alasan izin/sakit..."
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
              />
            </div>

            {feedback && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="font-bold">{feedback.type === 'success' ? 'Presensi Berhasil Direkam!' : 'Pemberitahuan Sistem:'} </strong>
                  {feedback.message}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#800000] hover:bg-[#600000] text-amber-300 hover:text-white font-black text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Merekam Presensi...' : 'Kirim Presensi Sekarang'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info & Status Sinkronisasi */}
        <div className="space-y-5">
          {/* Card Info Google Sheets */}
          <div className="bg-amber-50/80 rounded-3xl p-5 border-2 border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-900 uppercase flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                Sinkronisasi Spreadsheet
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isSheetsConfigured ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
              }`}>
                {isSheetsConfigured ? 'Terhubung ✓' : 'Belum Diatur'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Guru dapat melihat seluruh rekap presensi siswa di tab <strong>'Absensi'</strong> pada Google Sheets secara real-time.
            </p>

            <button
              onClick={onOpenSheetsModal}
              className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-white hover:bg-amber-100 text-[#800000] border border-amber-300 transition-colors cursor-pointer text-center"
            >
              Lihat Skrip Code.gs & Konfigurasi URL
            </button>
          </div>

          {/* Riwayat Absensi Terakhir di Perangkat Ini */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
              <span>Riwayat Presensi Lokal</span>
              <span className="text-[10px] text-slate-500 font-normal">{history.length} catatan</span>
            </h3>

            {history.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6 bg-slate-50 rounded-2xl">
                Belum ada rekaman presensi pada sesi ini.
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {history.map((rec) => (
                  <div key={rec.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{rec.nama}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        rec.status === 'Hadir' ? 'bg-emerald-100 text-emerald-800' :
                        rec.status === 'Izin' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>{rec.kelas}</span>
                      <span>{rec.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
