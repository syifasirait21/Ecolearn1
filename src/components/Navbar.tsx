import React, { useState } from 'react';
import { 
  Home, 
  HelpCircle, 
  Target, 
  UserCheck, 
  BookOpen, 
  Award, 
  MessageSquare, 
  User, 
  Menu, 
  X, 
  FileSpreadsheet, 
  Sparkles,
  Leaf,
  ChevronDown
} from 'lucide-react';
import { MainTab, StudentProfile } from '../types';

interface NavbarProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  student: StudentProfile;
  onOpenStudentModal: () => void;
  onOpenSheetsModal: () => void;
  isSheetsConfigured: boolean;
  onSelectSubMaterial?: (subId: string) => void;
  selectedSubMaterialId?: string;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  student,
  onOpenStudentModal,
  onOpenSheetsModal,
  isSheetsConfigured,
  onSelectSubMaterial,
  selectedSubMaterialId,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [materiDropdownOpen, setMateriDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home' as MainTab, label: 'Beranda', icon: Home },
    { id: 'petunjuk' as MainTab, label: 'Petunjuk', icon: HelpCircle },
    { id: 'capaian' as MainTab, label: 'Capaian Pembelajaran', icon: Target },
    { id: 'absen' as MainTab, label: 'Absen', icon: UserCheck },
    { id: 'materi' as MainTab, label: 'Materi Pembelajaran', icon: BookOpen },
    { id: 'evaluasi' as MainTab, label: 'Evaluasi / Kuis', icon: Award },
    { id: 'forum' as MainTab, label: 'Forum Diskusi', icon: MessageSquare },
    { id: 'profil' as MainTab, label: 'Profil Penyusun', icon: User },
  ];

  const subMaterialItems = [
    { id: 'sub-1', label: 'Sub-Materi 1: Keseimbangan Ekosistem' },
    { id: 'sub-2', label: 'Sub-Materi 2: Pencemaran Lingkungan' },
    { id: 'sub-3', label: 'Sub-Materi 3: Pengelolaan Limbah (3R)' },
  ];

  const handleNavClick = (tabId: MainTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setMateriDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubMaterialClick = (subId: string) => {
    if (onSelectSubMaterial) {
      onSelectSubMaterial(subId);
    } else {
      setActiveTab('submateri');
    }
    setMobileMenuOpen(false);
    setMateriDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#800000] text-white shadow-md border-b-4 border-amber-400">
      {/* Top Banner Info for Junior High School */}
      <div className="bg-[#600000] px-3 sm:px-4 py-1.5 text-xs text-amber-200 flex justify-between items-center border-b border-amber-900/40 gap-2">
        <div className="flex items-center gap-1.5 font-medium truncate min-w-0">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate hidden md:inline">Media Pembelajaran Interaktif IPA SMP: <strong>Bab Perubahan Lingkungan</strong></span>
          <span className="truncate md:hidden text-[11px]">IPA SMP: <strong>Perubahan Lingkungan</strong></span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenSheetsModal}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer shrink-0 ${
              isSheetsConfigured
                ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-800'
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30'
            }`}
            title="Kelola Integrasi Google Sheets (Code.gs)"
          >
            <FileSpreadsheet className="w-3 h-3" />
            <span className="hidden sm:inline">Google Sheets</span>
            {isSheetsConfigured ? '✓' : '⚙️ Setup'}
          </button>

          <button
            onClick={onOpenStudentModal}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] transition-all cursor-pointer shadow-xs shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse shrink-0"></span>
            <span className="truncate max-w-[90px] min-[400px]:max-w-[120px] sm:max-w-[160px]">
              {student.nama ? `${student.nama} (${student.kelas})` : '👤 Profil Siswa'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-full bg-amber-400 group-hover:bg-amber-300 text-maroon-900 flex items-center justify-center font-black text-xl shadow-md border-2 border-white transition-transform group-hover:scale-105">
              🌿
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                E-ECO<span className="text-amber-300">LEARN</span>
              </span>
              <p className="text-[11px] font-semibold text-amber-200 tracking-wider uppercase">
                Perubahan Lingkungan SMP
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'materi' && activeTab === 'submateri');
              
              if (item.id === 'materi') {
                return (
                  <div 
                    key={item.id} 
                    className="relative group"
                    onMouseEnter={() => setMateriDropdownOpen(true)}
                    onMouseLeave={() => setMateriDropdownOpen(false)}
                  >
                    <button
                      id={`nav-${item.id}`}
                      onClick={() => handleNavClick('materi')}
                      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-amber-950 shadow-sm'
                          : 'text-amber-100 hover:bg-[#990000] hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-amber-950' : 'text-amber-300'}`} />
                      <span>{item.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform duration-200" />
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-amber-200 rounded-full" />
                      )}
                    </button>

                    {/* Dropdown Sub-Menu Terpisah untuk Setiap Sub-Materi */}
                    <div 
                      className={`absolute top-full left-0 mt-1 w-72 bg-[#750000] text-white rounded-2xl shadow-2xl border-2 border-amber-400 p-2 z-50 transition-all duration-200 ${
                        materiDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="px-3 py-1.5 text-[10px] font-black uppercase text-amber-300 tracking-wider border-b border-amber-600/40">
                        Pilih Halaman Sub-Materi:
                      </div>
                      <div className="py-1 space-y-1">
                        {subMaterialItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubMaterialClick(sub.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                              activeTab === 'submateri' && selectedSubMaterialId === sub.id
                                ? 'bg-amber-400 text-maroon-950 shadow-sm'
                                : 'text-amber-100 hover:bg-[#900000] hover:text-white'
                            }`}
                          >
                            <span>{sub.label}</span>
                            <span className="text-[10px] opacity-70">Buka →</span>
                          </button>
                        ))}
                        <div className="pt-1 border-t border-amber-600/40">
                          <button
                            onClick={() => handleNavClick('materi')}
                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-amber-200 hover:bg-[#900000] hover:text-white cursor-pointer"
                          >
                            📋 Ringkasan Semua Sub-Materi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-sm'
                      : 'text-amber-100 hover:bg-[#990000] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-950' : 'text-amber-300'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-amber-200 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#600000] text-amber-200 hover:text-white hover:bg-[#500000] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#700000] border-t border-amber-600/40 px-4 pt-2 pb-4 space-y-1 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'materi' && activeTab === 'submateri');
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-amber-950'
                      : 'text-amber-100 hover:bg-[#850000] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>

                {/* Sub-menu jika item adalah Materi */}
                {item.id === 'materi' && (
                  <div className="ml-4 pl-3 py-1 space-y-1 border-l-2 border-amber-400/50">
                    <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider px-2 py-0.5">
                      Sub-Menu Halaman:
                    </div>
                    {subMaterialItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubMaterialClick(sub.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                          activeTab === 'submateri' && selectedSubMaterialId === sub.id
                            ? 'bg-amber-400 text-maroon-950'
                            : 'text-amber-100 hover:bg-[#850000] hover:text-white'
                        }`}
                      >
                        • {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 mt-2 border-t border-amber-900/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSheetsModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-500/20 text-amber-200 text-xs font-semibold"
            >
              <FileSpreadsheet className="w-4 h-4" /> Integrasi Google Sheets (Code.gs)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudentModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-400 text-amber-950 text-xs font-bold"
            >
              👤 Ganti Identitas Siswa
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
