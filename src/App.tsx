/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import MaterialsListView from './components/MaterialsListView';
import MaterialDetailView from './components/MaterialDetailView';
import AttendanceView from './components/AttendanceView';
import EvaluationView from './components/EvaluationView';
import DiscussionView from './components/DiscussionView';
import LearningObjectivesView from './components/LearningObjectivesView';
import InstructionsView from './components/InstructionsView';
import AuthorProfileView from './components/AuthorProfileView';
import GoogleSheetsModal from './components/GoogleSheetsModal';
import StudentProfileModal from './components/StudentProfileModal';
import { MainTab, StudentProfile, SubMaterial } from './types';
import { SUB_MATERIALS } from './data/learningData';
import { getSavedSheetsUrl } from './utils/googleSheets';
import { Leaf, Heart, BookOpen, UserCheck, Award, MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedSubMaterialId, setSelectedSubMaterialId] = useState<string>('sub-1');
  
  // Identitas Siswa tanpa login
  const [student, setStudent] = useState<StudentProfile>({
    nama: '',
    kelas: '',
  });

  // Track sub-materi yang telah diselesaikan siswa
  const [completedSubMaterials, setCompletedSubMaterials] = useState<string[]>([]);

  // State Modal
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [sheetsModalOpen, setSheetsModalOpen] = useState(false);
  const [isSheetsConfigured, setIsSheetsConfigured] = useState(false);

  // Muat data dari localStorage
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem('elearning_student_profile');
      if (savedStudent) {
        setStudent(JSON.parse(savedStudent));
      }

      const savedCompleted = localStorage.getItem('elearning_completed_materials');
      if (savedCompleted) {
        setCompletedSubMaterials(JSON.parse(savedCompleted));
      }

      const url = getSavedSheetsUrl();
      setIsSheetsConfigured(Boolean(url));
    } catch (e) {
      console.error('Error loading initial local storage:', e);
    }
  }, []);

  const handleUpdateStudent = (updated: StudentProfile) => {
    setStudent(updated);
    try {
      localStorage.setItem('elearning_student_profile', JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving student profile:', e);
    }
  };

  const handleMarkComplete = (subId: string) => {
    if (!completedSubMaterials.includes(subId)) {
      const updated = [...completedSubMaterials, subId];
      setCompletedSubMaterials(updated);
      try {
        localStorage.setItem('elearning_completed_materials', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving completed sub-material:', e);
      }
    }
  };

  const handleOpenSubMaterial = (subId: string) => {
    setSelectedSubMaterialId(subId);
    setActiveTab('submateri');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSubMaterial: SubMaterial = 
    SUB_MATERIALS.find(s => s.id === selectedSubMaterialId) || SUB_MATERIALS[0];

  const handleRefreshSheetsStatus = () => {
    setIsSheetsConfigured(Boolean(getSavedSheetsUrl()));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800 w-full max-w-full overflow-x-hidden">
      {/* Navbar Utama di Bagian Atas */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        onOpenStudentModal={() => setStudentModalOpen(true)}
        onOpenSheetsModal={() => setSheetsModalOpen(true)}
        isSheetsConfigured={isSheetsConfigured}
        onSelectSubMaterial={handleOpenSubMaterial}
        selectedSubMaterialId={selectedSubMaterialId}
      />

      {/* Konten Halaman SPA Terpisah (Tab-Switching Bersih) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* 1. Halaman Beranda (Home) */}
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSubMaterial={handleOpenSubMaterial}
            student={student}
            onOpenStudentModal={() => setStudentModalOpen(true)}
          />
        )}

        {/* 2. Halaman Petunjuk Penggunaan */}
        {activeTab === 'petunjuk' && (
          <InstructionsView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 3. Halaman Capaian Pembelajaran (CP/TP) */}
        {activeTab === 'capaian' && <LearningObjectivesView />}

        {/* 4. Halaman Absensi Siswa */}
        {activeTab === 'absen' && (
          <AttendanceView
            student={student}
            onUpdateStudent={handleUpdateStudent}
            onOpenSheetsModal={() => setSheetsModalOpen(true)}
            isSheetsConfigured={isSheetsConfigured}
          />
        )}

        {/* 5. Halaman Katalog Materi Pembelajaran (Sub-Menu) */}
        {activeTab === 'materi' && (
          <MaterialsListView
            onSelectSubMaterial={handleOpenSubMaterial}
            completedSubMaterials={completedSubMaterials}
          />
        )}

        {/* 6. Halaman KHUSUS Sub-Materi dengan Tombol Back & Next */}
        {activeTab === 'submateri' && (
          <MaterialDetailView
            subMaterial={currentSubMaterial}
            allSubMaterials={SUB_MATERIALS}
            onNavigateToSubMaterial={(subId) => {
              setSelectedSubMaterialId(subId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToList={() => {
              setActiveTab('materi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            student={student}
            onUpdateStudent={handleUpdateStudent}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {/* 7. Halaman Evaluasi / Kuis Komprehensif */}
        {activeTab === 'evaluasi' && (
          <EvaluationView
            student={student}
            onUpdateStudent={handleUpdateStudent}
          />
        )}

        {/* 8. Halaman Forum Diskusi */}
        {activeTab === 'forum' && (
          <DiscussionView
            student={student}
            onUpdateStudent={handleUpdateStudent}
          />
        )}

        {/* 9. Halaman Profil Penyusun / Pengembang */}
        {activeTab === 'profil' && <AuthorProfileView />}
      </main>

      {/* Footer Ceria Bertema Marun & Kuning Emas */}
      <footer className="bg-[#800000] text-white border-t-4 border-amber-400 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-amber-900/60 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-black text-xl shadow-md">
                🌿
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  E-ECO<span className="text-amber-300">LEARN</span> SMP
                </span>
                <p className="text-xs text-amber-200">
                  Media Pembelajaran Interaktif IPA SMP: Bab Perubahan Lingkungan
                </p>
              </div>
            </div>

            {/* Navigasi Footer Ringkas */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-amber-100">
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 cursor-pointer"
              >
                Beranda
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('materi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 cursor-pointer"
              >
                Materi
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('absen'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 cursor-pointer"
              >
                Absensi
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('evaluasi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 cursor-pointer"
              >
                Evaluasi
              </button>
              <span>•</span>
              <button 
                onClick={() => { setActiveTab('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-amber-300 cursor-pointer"
              >
                Profil
              </button>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-amber-200 text-center sm:text-left">
            <p>
              © 2026 E-Learning Perubahan Lingkungan SMP. Hak Cipta Dilindungi. Kurikulum Merdeka Fase D.
            </p>
            <div className="flex items-center gap-1.5 font-medium">
              <span>Dibuat dengan</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>untuk Pendidikan Sains Indonesia</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Identitas Siswa Cepat */}
      <StudentProfileModal
        isOpen={studentModalOpen}
        onClose={() => setStudentModalOpen(false)}
        student={student}
        onSave={handleUpdateStudent}
      />

      {/* Modal Panduan & Skrip Code.gs Google Sheets */}
      <GoogleSheetsModal
        isOpen={sheetsModalOpen}
        onClose={() => setSheetsModalOpen(false)}
        onSaved={handleRefreshSheetsStatus}
      />
    </div>
  );
}
