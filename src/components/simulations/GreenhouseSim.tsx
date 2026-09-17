import React, { useState } from 'react';
import { Sun, CloudRain, Flame, Wind, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function GreenhouseSim() {
  const [co2Level, setCo2Level] = useState<number>(420); // ppm saat ini
  const [industrialActivity, setIndustrialActivity] = useState<number>(50);

  // Perhitungan ilmiah proporsional
  const tempIncrease = (((co2Level - 280) * 0.012) + (industrialActivity * 0.01)).toFixed(2);
  const globalTemp = (14.5 + parseFloat(tempIncrease)).toFixed(1);
  const seaLevelRise = Math.max(0, Math.round(parseFloat(tempIncrease) * 18));
  
  // AQI / ISPU
  const aqiValue = Math.min(500, Math.round((industrialActivity * 2.2) + ((co2Level - 300) * 0.25)));
  
  const getAqiCategory = (aqi: number) => {
    if (aqi <= 50) return { label: 'Baik (Sehat)', bg: 'bg-emerald-500', text: 'text-emerald-950', badge: 'bg-emerald-100 text-emerald-800' };
    if (aqi <= 100) return { label: 'Sedang', bg: 'bg-blue-500', text: 'text-blue-950', badge: 'bg-blue-100 text-blue-800' };
    if (aqi <= 150) return { label: 'Tidak Sehat Sensitif', bg: 'bg-amber-500', text: 'text-amber-950', badge: 'bg-amber-100 text-amber-800' };
    if (aqi <= 200) return { label: 'Tidak Sehat', bg: 'bg-rose-500', text: 'text-rose-950', badge: 'bg-rose-100 text-rose-800' };
    return { label: 'Sangat Berbahaya', bg: 'bg-purple-600', text: 'text-white', badge: 'bg-purple-100 text-purple-900' };
  };

  const aqiCategory = getAqiCategory(aqiValue);

  const applyScenario = (type: 'preindustrial' | 'current' | 'netzero' | 'extreme') => {
    if (type === 'preindustrial') {
      setCo2Level(280);
      setIndustrialActivity(10);
    } else if (type === 'current') {
      setCo2Level(420);
      setIndustrialActivity(55);
    } else if (type === 'netzero') {
      setCo2Level(350);
      setIndustrialActivity(25);
    } else {
      setCo2Level(750);
      setIndustrialActivity(95);
    }
  };

  return (
    <div id="simulasi-rumah-kaca-container" className="bg-white rounded-2xl border-2 border-amber-200 p-5 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-amber-100 pb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-900 text-xs font-bold rounded-full uppercase tracking-wider mb-1">
            Simulasi Interaktif Sub-Materi 2
          </span>
          <h3 className="text-xl font-bold text-slate-900">
            Laboratorium Fisika Atmosfer: Efek Rumah Kaca & Indeks AQI
          </h3>
          <p className="text-sm text-slate-600">
            Amati bagaimana gas rumah kaca (CO2 & polutan) menahan radiasi panas matahari di biosfer bumi.
          </p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => applyScenario('preindustrial')}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
          >
            Pra-Industri (280 ppm)
          </button>
          <button
            onClick={() => applyScenario('current')}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
          >
            Tahun 2026 (420 ppm)
          </button>
          <button
            onClick={() => applyScenario('extreme')}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200"
          >
            Krisis Ekstrem (750 ppm)
          </button>
        </div>
      </div>

      {/* Visual Animasi Atmosfer & Panas */}
      <div className="relative h-60 sm:h-72 rounded-xl overflow-hidden mb-6 bg-slate-900 border-2 border-slate-700 p-4 text-white flex flex-col justify-between">
        {/* Lapisan Atmosfer Atas & Matahari */}
        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-amber-900 font-bold shadow-lg shadow-yellow-500/50 animate-pulse">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-yellow-300 font-semibold">Radiasi Sinar Matahari</div>
              <div className="text-[11px] text-slate-300">Gelombang pendek menembus atmosfer</div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-700 text-right">
            <div className="text-[11px] text-slate-400">Konsentrasi CO2 Atmosfer</div>
            <div className="text-lg font-black text-amber-400">{co2Level} ppm</div>
          </div>
        </div>

        {/* Lapisan Gas Rumah Kaca (Menebal sesuai slider) */}
        <div 
          className="my-auto mx-auto w-full sm:w-11/12 rounded-xl border-2 border-dashed transition-all duration-500 p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-1"
          style={{
            backgroundColor: `rgba(225, 29, 72, ${Math.min(0.7, (co2Level - 250) / 700)})`,
            borderColor: co2Level > 500 ? '#f43f5e' : '#f59e0b'
          }}
        >
          <div className="flex items-center gap-2">
            <Flame className="w-4 sm:w-5 h-4 sm:h-5 text-amber-300 animate-bounce shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold text-amber-100">
              Lapisan Gas Rumah Kaca (CO2, CH4, N2O)
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono bg-black/40 px-2 py-0.5 rounded text-amber-200">
            Ketebalan: {Math.round((co2Level / 800) * 100)}%
          </span>
        </div>

        {/* Permukaan Bumi */}
        <div className="relative bg-emerald-950/90 rounded-lg p-2 sm:p-3 border border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
          <div>
            <div className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
              🌍 Permukaan Biosfer Bumi
            </div>
            <div className="text-[10px] sm:text-[11px] text-emerald-100 hidden sm:block">
              Panas inframerah dipantulkan kembali ke bumi karena terhalang gas emisi
            </div>
          </div>
          <div className="flex gap-4 sm:text-right justify-between sm:justify-end">
            <div>
              <div className="text-[10px] text-slate-300">Suhu Rata-rata</div>
              <div className="text-sm sm:text-base font-extrabold text-white">+{globalTemp} °C</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-300">Kenaikan Air Laut</div>
              <div className="text-sm sm:text-base font-extrabold text-sky-400">+{seaLevelRise} cm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Kontrol Slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-700" /> Kadar Emisi Karbon (CO2)
            </span>
            <span className="text-xs font-black bg-amber-700 text-white px-2 py-0.5 rounded-md font-mono">
              {co2Level} ppm
            </span>
          </div>
          <input
            type="range"
            min="280"
            max="800"
            step="10"
            value={co2Level}
            onChange={(e) => setCo2Level(Number(e.target.value))}
            className="w-full accent-amber-700 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-amber-800 mt-1 font-semibold">
            <span>280 (Pra-Industri)</span>
            <span>420 (Saat Ini)</span>
            <span>800 (Bencana)</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-slate-700" /> Kepadatan Transportasi & Pabrik
            </span>
            <span className="text-xs font-black bg-slate-800 text-white px-2 py-0.5 rounded-md font-mono">
              {industrialActivity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={industrialActivity}
            onChange={(e) => setIndustrialActivity(Number(e.target.value))}
            className="w-full accent-slate-800 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-semibold">
            <span>0% (Hutan Bersih)</span>
            <span>50% (Kota Sedang)</span>
            <span>100% (Megapolitan Padat)</span>
          </div>
        </div>
      </div>

      {/* Indikator AQI & Analisis IPA */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white rounded-lg border border-slate-200 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${aqiCategory.bg} flex items-center justify-center font-black text-white text-lg shadow-sm`}>
              {aqiValue}
            </div>
            <div>
              <div className="text-xs text-slate-500 font-bold uppercase">Indeks Kualitas Udara (ISPU / AQI)</div>
              <div className={`text-sm font-bold inline-block px-2.5 py-0.5 rounded-md mt-0.5 ${aqiCategory.badge}`}>
                {aqiCategory.label}
              </div>
            </div>
          </div>
          <div className="text-xs text-slate-600 max-w-xs text-center sm:text-right">
            Suhu global naik <strong className="text-rose-600 font-bold">+{tempIncrease} °C</strong> di atas batas pra-industri.
          </div>
        </div>

        <div className="text-xs text-slate-700 bg-amber-50/80 p-3 rounded-lg border border-amber-200 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Pelajaran Penting untuk Siswa: </strong>
            Efek rumah kaca pada dasarnya adalah fenomena alami yang membuat bumi hangat dan layak huni (suhu tanpa gas rumah kaca adalah -18°C). Namun, <em>akumulasi berlebihan</em> dari bahan bakar fosil menyebabkan pemanasan global tak terkendali, mencairkan es kutub, dan memicu cuaca ekstrem.
          </div>
        </div>
      </div>
    </div>
  );
}
