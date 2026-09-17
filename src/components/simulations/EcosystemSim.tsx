import React, { useState } from 'react';
import { Trees, Factory, Bird, RefreshCw, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function EcosystemSim() {
  const [trees, setTrees] = useState<number>(75);
  const [pollutants, setPollutants] = useState<number>(25);
  const [wildlife, setWildlife] = useState<number>(60);

  // Perhitungan ilmiah sederhana
  const iklScore = Math.max(0, Math.min(100, Math.round((trees * 0.5) + (wildlife * 0.3) - (pollutants * 0.6) + 30)));
  const estimatedTemp = (25 + (pollutants * 0.12) - (trees * 0.06)).toFixed(1);
  const oxygenPpm = Math.max(12, Math.min(23, (16 + (trees * 0.08) - (pollutants * 0.05)))).toFixed(1);

  const getStatusBadge = () => {
    if (iklScore >= 75) {
      return {
        label: 'Ekosistem Seimbang & Lestari',
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        desc: 'Daya lenting lingkungan bekerja optimal. Keseimbangan biotik-abiotik terjaga harmonis.'
      };
    } else if (iklScore >= 50) {
      return {
        label: 'Ekosistem Mengalami Tekanan Ringan',
        color: 'bg-amber-100 text-amber-800 border-amber-300',
        desc: 'Lingkungan masih mampu bertahan, namun membutuhkan peningkatan vegetasi dan pengendalian polusi.'
      };
    } else {
      return {
        label: 'Ekosistem Rusak Kritis (Degradasi)',
        color: 'bg-rose-100 text-rose-800 border-rose-300',
        desc: 'Daya dukung terlampaui! Rantai makanan terganggu, suhu mikro naik, dan flora fauna terancam punah.'
      };
    }
  };

  const status = getStatusBadge();

  const resetPreset = (mode: 'ideal' | 'tercemar' | 'sedang') => {
    if (mode === 'ideal') {
      setTrees(90);
      setPollutants(15);
      setWildlife(85);
    } else if (mode === 'tercemar') {
      setTrees(20);
      setPollutants(85);
      setWildlife(20);
    } else {
      setTrees(60);
      setPollutants(45);
      setWildlife(50);
    }
  };

  return (
    <div id="simulasi-ekosistem-container" className="bg-white rounded-2xl border-2 border-amber-200 p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-amber-100 pb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider mb-1">
            Simulasi Interaktif Sub-Materi 1
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Laboratorium Virtual: Daya Dukung & Keseimbangan Lingkungan
          </h3>
          <p className="text-sm text-slate-600">
            Geser tuas parameter di bawah ini untuk melihat dampaknya terhadap kesehatan ekosistem secara langsung!
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => resetPreset('ideal')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            🌿 Kondisi Asri
          </button>
          <button
            onClick={() => resetPreset('sedang')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
          >
            ⚖️ Kondisi Seimbang
          </button>
          <button
            onClick={() => resetPreset('tercemar')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            ⚠️ Kondisi Kritis
          </button>
        </div>
      </div>

      {/* Visual Kanvas Animasi */}
      <div className={`relative h-48 sm:h-60 rounded-xl overflow-hidden mb-6 border-2 transition-colors duration-700 ${
        iklScore >= 75 ? 'bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 border-emerald-200' :
        iklScore >= 50 ? 'bg-gradient-to-b from-amber-200 via-amber-50 to-amber-200 border-amber-200' :
        'bg-gradient-to-b from-stone-400 via-stone-300 to-amber-950 border-rose-300'
      }`}>
        {/* Matahari & Langit */}
        <div className="absolute top-4 right-6 transition-all duration-700">
          {pollutants > 60 ? (
            <div className="w-12 h-12 rounded-full bg-amber-600/60 blur-xs border border-amber-700 flex items-center justify-center text-xs font-bold text-white shadow-lg">
              Kabut
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-yellow-400 shadow-md animate-pulse border-2 border-yellow-200 flex items-center justify-center text-amber-900 text-xs font-bold">
              ☀️ Cerah
            </div>
          )}
        </div>

        {/* Pabrik & Polutan Asap */}
        {pollutants > 20 && (
          <div className="absolute bottom-16 left-4 sm:left-10 flex flex-col items-center">
            <div className="flex gap-1 mb-1">
              {[...Array(Math.min(5, Math.ceil(pollutants / 20)))].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-slate-500/80 animate-ping"
                  style={{ animationDuration: `${1.5 + i * 0.3}s` }}
                />
              ))}
            </div>
            <div className="w-12 h-16 bg-slate-700 rounded-t-md flex items-center justify-center text-white text-xs">
              <Factory className="w-6 h-6 text-slate-300" />
            </div>
          </div>
        )}

        {/* Pohon & Rerumputan */}
        <div className="absolute bottom-0 left-0 right-0 h-16 transition-colors duration-700 flex items-end justify-around px-4 pb-2 z-10"
             style={{ backgroundColor: iklScore >= 75 ? '#15803d' : iklScore >= 50 ? '#854d0e' : '#57534e' }}>
          {/* Barisan Pohon */}
          <div className="flex items-end gap-2 sm:gap-4 overflow-hidden">
            {[...Array(Math.max(2, Math.floor(trees / 12)))].map((_, i) => (
              <div key={i} className="flex flex-col items-center transition-all duration-500 transform hover:scale-110">
                <Trees className={`w-8 h-8 sm:w-10 sm:h-10 ${
                  iklScore >= 75 ? 'text-emerald-300 drop-shadow' :
                  iklScore >= 50 ? 'text-amber-300' : 'text-stone-400'
                }`} />
              </div>
            ))}
          </div>

          {/* Satwa Liar / Burung */}
          <div className="flex items-center gap-2">
            {[...Array(Math.max(1, Math.floor(wildlife / 25)))].map((_, i) => (
              <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                <Bird className={`w-6 h-6 sm:w-7 sm:h-7 ${iklScore >= 50 ? 'text-white' : 'text-stone-300'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Badge Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Suhu Mikro Lingkungan</div>
          <div className="text-lg font-bold text-slate-800">{estimatedTemp} °C</div>
        </div>
      </div>

      {/* Kontrol Slider Parameter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-emerald-600" /> Luas Vegetasi Pohon
            </span>
            <span className="text-xs font-black bg-emerald-600 text-white px-2 py-0.5 rounded-md">
              {trees}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={trees}
            onChange={(e) => setTrees(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <p className="text-xs text-emerald-700 mt-1.5">Menghasilkan oksigen dan menyerap polutan udara.</p>
        </div>

        <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-rose-900 flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-rose-600" /> Beban Polutan & Pabrik
            </span>
            <span className="text-xs font-black bg-rose-600 text-white px-2 py-0.5 rounded-md">
              {pollutants}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={pollutants}
            onChange={(e) => setPollutants(Number(e.target.value))}
            className="w-full accent-rose-600 cursor-pointer"
          />
          <p className="text-xs text-rose-700 mt-1.5">Gas buang, jelaga karbon, dan buangan limbah cair.</p>
        </div>

        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
              <Bird className="w-4 h-4 text-amber-600" /> Populasi Satwa & Fauna
            </span>
            <span className="text-xs font-black bg-amber-600 text-white px-2 py-0.5 rounded-md">
              {wildlife}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={wildlife}
            onChange={(e) => setWildlife(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer"
          />
          <p className="text-xs text-amber-700 mt-1.5">Indikator rantai makanan dan keanekaragaman hayati.</p>
        </div>
      </div>

      {/* Output Metrik dan Analisis Ilmiah */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Indeks Kualitas Lingkungan</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{iklScore} / 100</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Estimasi Oksigen O2</div>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">{oxygenPpm} ppm</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200 text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase">Status Ekologis</div>
            <div className="text-sm font-bold text-slate-800 mt-1.5">{status.label}</div>
          </div>
        </div>

        <div className={`p-3 rounded-lg border ${status.color} flex items-start gap-2 text-xs md:text-sm`}>
          {iklScore >= 75 ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <strong className="font-bold">Analisis Pembelajaran IPA: </strong>
            {status.desc}
          </div>
        </div>
      </div>
    </div>
  );
}
