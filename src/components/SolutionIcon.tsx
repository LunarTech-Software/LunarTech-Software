import { Globe, Boxes, Gauge, RadioTower, Sprout, Factory, GraduationCap, type LucideProps } from "lucide-react";

const icons: Record<string, React.ComponentType<LucideProps>> = {
  Globe,
  Boxes,
  Gauge,
  RadioTower,
  Sprout,
  Factory,
  GraduationCap,
};

export default function SolutionIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name] ?? Globe;
  return <Icon {...props} />;
}
