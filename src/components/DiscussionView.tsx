import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, MessageCircle, Sparkles, User, Filter, AlertCircle } from 'lucide-react';
import { StudentProfile, ForumComment } from '../types';

interface DiscussionViewProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

const DEFAULT_COMMENTS: ForumComment[] = [
  {
    id: 'c-1',
    nama: 'Aisyah Putri',
    kelas: 'VII-A',
    peran: 'Siswa',
    waktu: 'Kemarin, 14.30 WIB',
    topik: 'Solusi Sampah Plastik Kantin',
    pesan: 'Di kantin sekolah kita masih banyak yang pakai bungkus plastik sekali pakai untuk gorengan dan es. Kira-kira kalau kita bawa wadah makan (lunch box) sendiri dari rumah, apakah dapat poin Adiwiyata ya teman-teman?',
    suka: 12,
    balasan: [
      {
        id: 'r-1',
        nama: 'Rifki Hidayat, M.Pd.',
        peran: 'Guru',
        waktu: 'Kemarin, 15.10 WIB',
        pesan: 'Ide yang luar biasa Aisyah! Itu adalah penerapan nyata prinsip REDUCE (mengurangi timbulan sampah). Sekolah sangat mengapresiasi siswa yang membawa tumbler dan kotak makan sendiri.'
      }
    ]
  },
  {
    id: 'c-2',
    nama: 'Bima Satria',
    kelas: 'VII-C',
    peran: 'Siswa',
    waktu: '2 hari lalu',
    topik: 'Tanya Jawab Sains',
    pesan: 'Pak Guru, setelah coba simulasi Rumah Kaca tadi, ternyata kalau konsentrasi CO2 di atas 700 ppm suhu bumi naik drastis ya. Kenapa pohon bisa menyerap CO2 dan mengubahnya jadi oksigen?',
    suka: 8,
    balasan: [
      {
        id: 'r-2',
        nama: 'Rifki Hidayat, M.Pd.',
        peran: 'Guru',
        waktu: '2 hari lalu',
        pesan: 'Tepat sekali Bima! Melalui proses fotosintesis di kloroplas daun, tumbuhan menyerap CO2 dan H2O dengan bantuan cahaya matahari untuk menghasilkan glukosa (makanan) dan melepas gas oksigen (O2).'
      }
    ]
  }
];

export default function DiscussionView({ student, onUpdateStudent }: DiscussionViewProps) {
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [nama, setNama] = useState(student.nama || '');
  const [kelas, setKelas] = useState(student.kelas || '');
  const [pesan, setPesan] = useState('');
  const [topik, setTopik] = useState('Solusi Sampah Plastik Kantin');
  const [filterTopik, setFilterTopik] = useState('Semua');
  const [replyInput, setReplyInput] = useState<Record<string, string>>({});
  const [activeReplyBox, setActiveReplyBox] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('elearning_forum_comments');
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(DEFAULT_COMMENTS);
      }
    } else {
      setComments(DEFAULT_COMMENTS);
    }
  }, []);

  useEffect(() => {
    if (student.nama) setNama(student.nama);
    if (student.kelas) setKelas(student.kelas);
  }, [student.nama, student.kelas]);

  const saveToLocal = (updated: ForumComment[]) => {
    setComments(updated);
    localStorage.setItem('elearning_forum_comments', JSON.stringify(updated));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !kelas.trim() || !pesan.trim()) {
      alert('Nama, Kelas, dan Pesan Diskusi tidak boleh kosong!');
      return;
    }

    onUpdateStudent({ nama: nama.trim(), kelas: kelas.trim() });

    const newComment: ForumComment = {
      id: `comment-${Date.now()}`,
      nama: nama.trim(),
      kelas: kelas.trim(),
      peran: 'Siswa',
      waktu: 'Baru saja',
      topik,
      pesan: pesan.trim(),
      suka: 0,
      balasan: []
    };

    const updated = [newComment, ...comments];
    saveToLocal(updated);
    setPesan('');
  };

  const handleLike = (id: string) => {
    const updated = comments.map(c => {
      if (c.id === id) {
        return { ...c, suka: c.suka + 1 };
      }
      return c;
    });
    saveToLocal(updated);
  };

  const handleAddReply = (commentId: string) => {
    const replyText = replyInput[commentId];
    if (!replyText || !replyText.trim()) return;

    const replyAuthor = nama.trim() || 'Siswa SMP';

    const updated = comments.map(c => {
      if (c.id === commentId) {
        const replies = c.balasan || [];
        return {
          ...c,
          balasan: [
            ...replies,
            {
              id: `r-${Date.now()}`,
              nama: replyAuthor,
              peran: 'Siswa' as const,
              waktu: 'Baru saja',
              pesan: replyText.trim()
            }
          ]
        };
      }
      return c;
    });

    saveToLocal(updated);
    setReplyInput(prev => ({ ...prev, [commentId]: '' }));
    setActiveReplyBox(null);
  };

  const topicOptions = [
    'Solusi Sampah Plastik Kantin',
    'Tanya Jawab Sains',
    'Aksi 3R di Rumah',
    'Pencegahan Polusi Lingkungan'
  ];

  const filteredComments = filterTopik === 'Semua' 
    ? comments 
    : comments.filter(c => c.topik === filterTopik);

  return (
    <div id="forum-diskusi-container" className="space-y-6 pb-12">
      {/* Header Forum */}
      <div className="bg-gradient-to-r from-[#800000] to-[#990000] text-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md">
        <span className="inline-block px-3 py-1 bg-amber-400 text-maroon-950 text-xs font-black rounded-full uppercase tracking-wider mb-2">
          Ruang Kolaborasi Sains
        </span>
        <h1 className="text-2xl sm:text-3xl font-black">
          Forum Diskusi Perubahan Lingkungan
        </h1>
        <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl">
          Bagikan ide kreatif pelestarian alam, ajukan pertanyaan seputar materi IPA, dan berikan tanggapan inspiratif kepada rekan-rekan sekelasmu!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Kirim Pendapat */}
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs h-fit space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-maroon-950 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h2 className="text-base font-black text-slate-900">
              Tulis Pendapat / Pertanyaan
            </h2>
          </div>

          <form onSubmit={handlePostComment} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Nama kamu..."
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kelas</label>
              <input
                type="text"
                required
                placeholder="Contoh: VII-A"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Topik Diskusi</label>
              <select
                value={topik}
                onChange={(e) => setTopik(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white"
              >
                {topicOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pesan / Opini</label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan gagasan, pertanyaan, atau tanggapanmu..."
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#800000] hover:bg-[#600000] text-amber-300 hover:text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Kirim ke Forum Diskusi
            </button>
          </form>
        </div>

        {/* Daftar Komentar & Diskusi */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Topik */}
          <div className="bg-white p-3 rounded-2xl border border-amber-200 flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-amber-600" /> Filter:
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setFilterTopik('Semua')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                  filterTopik === 'Semua' ? 'bg-[#800000] text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Semua
              </button>
              {topicOptions.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTopik(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${
                    filterTopik === t ? 'bg-[#800000] text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Daftar Postingan Komentar */}
          <div className="space-y-4">
            {filteredComments.map(c => (
              <div key={c.id} className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 text-[#800000] font-black text-xs flex items-center justify-center">
                      {c.nama.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{c.nama}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                          {c.kelas}
                        </span>
                        {c.peran === 'Guru' && (
                          <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-md font-bold">
                            Guru / Pembimbing
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{c.waktu}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    {c.topik}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-1">
                  {c.pesan}
                </p>

                {/* Aksi Like & Balas */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-4 text-xs">
                  <button
                    onClick={() => handleLike(c.id)}
                    className="flex items-center gap-1 font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-50" />
                    <span>{c.suka} Suka</span>
                  </button>

                  <button
                    onClick={() => setActiveReplyBox(activeReplyBox === c.id ? null : c.id)}
                    className="flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Balas ({c.balasan?.length || 0})</span>
                  </button>
                </div>

                {/* Input Balasan */}
                {activeReplyBox === c.id && (
                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Tulis balasan untuk tanggapan ini..."
                      value={replyInput[c.id] || ''}
                      onChange={(e) => setReplyInput({ ...replyInput, [c.id]: e.target.value })}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-amber-500 bg-white"
                    />
                    <button
                      onClick={() => handleAddReply(c.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 text-maroon-950 font-bold text-xs hover:bg-amber-300 cursor-pointer"
                    >
                      Kirim
                    </button>
                  </div>
                )}

                {/* Daftar Balasan Terlampir */}
                {c.balasan && c.balasan.length > 0 && (
                  <div className="space-y-2 pt-1 pl-4 border-l-2 border-amber-300">
                    {c.balasan.map(r => (
                      <div key={r.id} className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#800000]">{r.nama}</span>
                          <span className="text-[10px] text-slate-400">{r.waktu}</span>
                        </div>
                        <p className="text-slate-700">{r.pesan}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
