/**
 * Google Apps Script Integration Helper
 * Berisi template Code.gs lengkap dan fungsi kirim data ke Google Sheets
 */

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ========================================================
 * SKRIP GOOGLE APPS SCRIPT (Code.gs)
 * E-LEARNING PERUBAHAN LINGKUNGAN SMP
 * ========================================================
 * 
 * PETUNJUK PEMASANGAN (HANYA 3 MENIT):
 * 1. Buat Google Spreadsheet baru di https://sheets.new
 * 2. Beri nama: "Data E-Learning Perubahan Lingkungan SMP"
 * 3. Buka menu: Ekstensi > Apps Script (Extensions > Apps Script)
 * 4. Hapus semua kode default, lalu salin dan tempelkan seluruh kode ini.
 * 5. Klik "Deploy" (Terapkan) > "New deployment" (Penerapan baru).
 * 6. Pilih jenis: "Web app" (Aplikasi Web).
 * 7. Isi keterangan: "E-Learning Perubahan Lingkungan API"
 * 8. Pada "Execute as": pilih "Me (email Anda)"
 * 9. PADA "Who has access": PILIH "Anyone" (Siapa saja) -> PENTING agar siswa bisa kirim tanpa login!
 * 10. Klik "Deploy" / Izinkan Akses akun Google Anda.
 * 11. Salin "Web app URL" (akhiran /exec) dan tempelkan di aplikasi web ini.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var tipe = data.tipe; // 'absensi', 'tugas', atau 'kuis'
    
    if (tipe === 'absensi') {
      var sheetAbsen = getOrCreateSheet(ss, 'Absensi', [
        'Waktu Rekam', 'Nama Siswa', 'Kelas', 'Status Kehadiran', 'Catatan/Kesiapan'
      ]);
      sheetAbsen.appendRow([
        new Date().toLocaleString('id-ID'),
        data.nama || '-',
        data.kelas || '-',
        data.status || 'Hadir',
        data.catatan || '-'
      ]);
      return createJsonResponse({ status: 'success', message: 'Data absensi berhasil dicatat!' });
      
    } else if (tipe === 'tugas') {
      var sheetTugas = getOrCreateSheet(ss, 'Tugas', [
        'Waktu Pengumpulan', 'Nama Siswa', 'Kelas', 'Judul Tugas / Sub-Materi', 'Jawaban / Laporan', 'Link Lampiran'
      ]);
      sheetTugas.appendRow([
        new Date().toLocaleString('id-ID'),
        data.nama || '-',
        data.kelas || '-',
        data.judulTugas || '-',
        data.jawaban || '-',
        data.linkLampiran || '-'
      ]);
      return createJsonResponse({ status: 'success', message: 'Tugas siswa berhasil dikirim!' });
      
    } else if (tipe === 'kuis') {
      var sheetKuis = getOrCreateSheet(ss, 'Kuis', [
        'Waktu Kuis', 'Nama Siswa', 'Kelas', 'Judul Kuis / Evaluasi', 'Skor (100)', 'Jawaban Benar', 'Total Soal'
      ]);
      sheetKuis.appendRow([
        new Date().toLocaleString('id-ID'),
        data.nama || '-',
        data.kelas || '-',
        data.judulKuis || '-',
        data.skor || 0,
        data.benar || 0,
        data.totalSoal || 0
      ]);
      return createJsonResponse({ status: 'success', message: 'Hasil kuis berhasil disimpan!' });
      
    } else {
      return createJsonResponse({ status: 'error', message: 'Tipe data tidak dikenali.' });
    }
    
  } catch (error) {
    return createJsonResponse({ status: 'error', error: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return createJsonResponse({
    status: 'online',
    app: 'E-Learning Perubahan Lingkungan SMP Webhook Endpoint',
    timestamp: new Date().toISOString()
  });
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    // Format Header tebal dan latar warna estetis
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#800000');
    headerRange.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

const LOCAL_STORAGE_KEY_SHEETS_URL = 'elearning_sheets_url';

export function getSavedSheetsUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LOCAL_STORAGE_KEY_SHEETS_URL) || '';
}

export function saveSheetsUrl(url: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY_SHEETS_URL, url.trim());
  }
}

export interface SheetsPayload {
  tipe: 'absensi' | 'tugas' | 'kuis';
  nama: string;
  kelas: string;
  [key: string]: unknown;
}

/**
 * Mengirim data ke Google Sheets Web App.
 * Menggunakan mode no-cors untuk kompatibilitas browser cross-origin dari client.
 */
export async function sendDataToGoogleSheets(payload: SheetsPayload): Promise<{ success: boolean; message: string }> {
  const url = getSavedSheetsUrl();
  
  if (!url) {
    return {
      success: false,
      message: 'URL Google Apps Script belum dikonfigurasi oleh Guru/Admin. Data disimpan secara lokal di perangkat.',
    };
  }

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      message: 'Data berhasil disinkronkan ke Google Sheets guru!',
    };
  } catch (err) {
    console.error('Error kirim ke Google Sheets:', err);
    return {
      success: false,
      message: 'Gagal menghubungi Google Apps Script. Pastikan koneksi internet stabil dan URL valid.',
    };
  }
}
