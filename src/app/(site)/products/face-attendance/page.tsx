import type { Metadata } from "next";
import FaceAttendanceView from "@/components/products/FaceAttendanceView";

export const metadata: Metadata = {
  title: "Face attendance — LUNAR",
  description: "Recognition-based check-in with location and schedule checks, deployed with consent and privacy controls.",
};

export default function FaceAttendancePage() {
  return <FaceAttendanceView />;
}
