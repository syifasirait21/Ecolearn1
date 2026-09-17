import React, { useState, useEffect } from 'react';
import { X, Copy, Check, FileSpreadsheet, ExternalLink, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE, getSavedSheetsUrl, saveSheetsUrl, sendDataToGoogleSheets } from '../utils/googleSheets';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function GoogleSheetsModal({ isOpen, onClose, onSaved }: GoogleSheetsModalProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUrl(getSavedSheetsUrl());
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSave = () => {
    saveSheetsUrl(url);
    onSaved();
    setTestResult({
      success: true,
      message: 'URL Google Apps Script berhasil disimpan!'
    });
  };

  const handleTestPing = async () => {
    if (!url.trim()) {
      alert('Masukkan URL Web App terlebih dahulu sebelum menguji!');
      return;
    }
    saveSheetsUrl(url);
    setTesting(true);
    setTestResult(null);

    const res = await sendDataToGoogleSheets({
      tipe: 'absensi',
      nama: 'Uji Coba Sistem Guru',
      kelas: 'Admin Test',
      status: 'Hadir',
      catatan: 'Verifikasi koneksi endpoint Google Sheets dari aplikasi e-learning.'
    });

    setTesting(false);
    setTestResult(res);
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5 text-[#800000]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Panduan Integrasi Google Sheets (Code.gs)
              </h3>
              <p className="text-[11px] text-amber-200">
                Pencatatan otomatis Tab Absensi, Tugas, & Kuis ke Spreadsheet Guru
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-amber-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Scrollable */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs sm:text-sm">
          {/* Langkah Cepat */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
            <h4 className="font-bold text-[#800000] flex items-center gap-1.5">
              <span>🚀</span> 3 Langkah Praktis untuk Guru / Pengembang:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-700 leading-relaxed text-xs">
              <li>Buat Spreadsheet baru di <strong>sheets.new</strong>, lalu klik menu <strong>Ekstensi &gt; Apps Script</strong>.</li>
              <li>Salin skrip <strong>Code.gs</strong> di bawah, tempelkan ke editor Apps Script, lalu klik simpan (ikon disket).</li>
              <li>Klik <strong>Deploy &gt; New deployment &gt; Web app</strong>. Atur "Execute as: Me" dan "Who has access: <strong>Anyone</strong>". Salin Web App URL dan tempelkan di kotak bawah!</li>
            </ol>
          </div>

          {/* Kotak Kode Code.gs dengan Tombol Copy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <span>📄</span> Skrip Google Apps Script (Code.gs)
              </label>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-maroon-950 font-bold text-xs shadow-xs cursor-pointer transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-900" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Kode Script'}</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-200 p-3 max-h-48 overflow-y-auto font-mono text-[11px] leading-relaxed">
              <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
            </div>
          </div>

          {/* Input URL Web App */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label className="block font-bold text-slate-800 text-xs">
              Tempelkan Web App URL (Deployment Akhiran <code>/exec</code>)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white font-mono"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Simpan URL
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              * URL ini otomatis tersimpan di perangkat lokal sehingga siswa tidak perlu memasukkan kembali.
            </p>
          </div>

          {/* Uji Koneksi */}
          {testResult && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              testResult.success ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <strong>{testResult.success ? 'Hasil Pengujian Sukses:' : 'Catatan Pengujian:'} </strong>
                {testResult.message}
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleTestPing}
            disabled={testing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testing ? 'Menguji Kirim...' : 'Uji Kirim Data Sampel'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-maroon-950 font-black text-xs cursor-pointer shadow-xs"
          >
            Selesai & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
