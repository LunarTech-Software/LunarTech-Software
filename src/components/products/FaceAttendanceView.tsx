"use client";

import ProductPage, { type ProductContent } from "./ProductPage";

const l = (en: string, id: string) => ({ en, id });

const C: ProductContent = {
  kicker: l("Face attendance / a LUNAR capability", "Absensi wajah / kemampuan LUNAR"),
  headline: l("Attendance that logs itself.", "Absensi yang mencatat dirinya sendiri."),
  lead: l("Recognition-based check-in on a phone, with the time, the place and the schedule checked in the same step. No sign-in sheet.", "Check-in berbasis pengenalan wajah di ponsel, dengan waktu, lokasi, dan jadwal diperiksa dalam satu langkah. Tanpa lembar tanda tangan."),
  photo: "/images/products/face-attendance.webp",
  photoPos: "50% 60%",
  imageNote: l("Product presentation image. The people and records shown are illustrative", "Gambar presentasi produk. Orang dan catatan yang ditampilkan bersifat ilustratif"),
  accent: "#E98459",
  capabilities: [
    { label: l("Face check-in on a phone with an on-screen guide to frame the face", "Check-in wajah di ponsel dengan panduan di layar untuk memosisikan wajah"), status: "implemented" },
    { label: l("Shows the face-match score and the distance from the office on success", "Menampilkan skor kecocokan wajah dan jarak dari kantor saat berhasil"), status: "implemented" },
    { label: l("Compares check-in with the schedule and the late tolerance, and flags lateness", "Membandingkan check-in dengan jadwal dan toleransi, dan menandai keterlambatan"), status: "implemented" },
    { label: l("Check-out, and a monthly attendance recap with present, needs-attention and leave", "Check-out, dan rekap kehadiran bulanan dengan hadir, perlu perbaikan, dan izin/cuti"), status: "implemented" },
    { label: l("A team view for a supervisor", "Tampilan tim untuk supervisor"), status: "implemented" },
    { label: l("Feeding attendance into payroll or site records in your own systems", "Menyalurkan absensi ke penggajian atau catatan lokasi di sistem Anda sendiri"), status: "custom" },
  ],
  notes: [
    { title: l("Consent and privacy first", "Persetujuan dan privasi lebih dahulu"), body: l("Face data is personal biometric data. Deploy it only with the employee's informed consent, a stated purpose, restricted access and a retention rule, and take legal advice for your country.", "Data wajah adalah data biometrik pribadi. Terapkan hanya dengan persetujuan karyawan yang diinformasikan, tujuan yang jelas, akses terbatas, dan aturan retensi, dan mintalah saran hukum sesuai negara Anda.") },
    { title: l("No performance claims", "Tanpa klaim kinerja"), body: l("We do not publish accuracy figures here. Accuracy depends on cameras, lighting and your workforce, so it is measured in a pilot on your site.", "Kami tidak menerbitkan angka akurasi di sini. Akurasi bergantung pada kamera, pencahayaan, dan tenaga kerja Anda, sehingga diukur dalam uji coba di lokasi Anda.") },
  ],
};

export default function FaceAttendanceView() {
  return <ProductPage c={C} path="/products/face-attendance" />;
}
