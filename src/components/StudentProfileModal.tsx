import React, { useState, useEffect } from 'react';
import { X, User, Check, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

export default function StudentProfileModal({
  isOpen,
  onClose,
  student,
  onSave,
}: StudentProfileModalProps) {
  const [nama, setNama] = useState(student.nama || '');
  const [kelas, setKelas] = useState(student.kelas || '');

  useEffect(() => {
    if (isOpen) {
      setNama(student.nama || '');
      setKelas(student.kelas || '');
    }
  }, [isOpen, student]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !kelas.trim()) {
      alert('Mohon isi Nama Lengkap dan Kelas!');
      return;
    }
    onSave({ nama: nama.trim(), kelas: kelas.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl border-4 border-amber-400 shadow-2xl overflow-hidden">
        {/* Header Modal */}
        <div className="bg-[#800000] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-bold">
              <User className="w-4 h-4 text-[#800000]" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Identitas Siswa</h3>
              <p className="text-[11px] text-amber-200">Sistem Cepat Tanpa Login</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-amber-200 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Nama dan kelasmu akan otomatis digunakan pada form <strong>Absensi</strong>, <strong>Tugas Mandiri</strong>, <strong>Kuis</strong>, dan <strong>Sertifikat</strong>.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap Siswa <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Siti Rahmawati"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kelas & Asal Sekolah <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: VII-B / SMP Negeri 2"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#800000] hover:bg-[#600000] text-amber-300 hover:text-white font-bold text-xs shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4" /> Simpan Identitas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
