// Shared site data for LUNAR. Copy follows the brand messaging brief —
// do not invent alternate taglines or headlines.

// --- Contact & CTA endpoints ---
const WHATSAPP_NUMBER = "62819880388";
const WHATSAPP_DEFAULT_TEXT =
  "Hello LUNAR, I would like to enquire about your digital engineering and automation solutions.";

export const contact = {
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappText: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_DEFAULT_TEXT)}`,
  whatsappCatalogueText: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello LUNAR, I would like to request your catalogue.")}`,
  email: "by.lunartech@gmail.com",
  mailto: "mailto:by.lunartech@gmail.com",
  catalogue: "/catalogue",
  location: "Indonesia",
};

/** Prefilled WhatsApp link for a given service-selector choice. */
export function whatsappForService(service: string) {
  const messages: Record<string, string> = {
    Website: "Hello LUNAR, I am interested in a website / digital presence project.",
    "Business System": "Hello LUNAR, I am interested in a custom business system for my operation.",
    "Automation / IoT": "Hello LUNAR, I am interested in automation or IoT monitoring for my operation.",
    "Farm / Plantation": "Hello LUNAR, I am interested in farm or plantation monitoring.",
    "Factory / Facility": "Hello LUNAR, I am interested in factory or facility monitoring.",
    "Education / STEM": "Hello LUNAR, I am interested in an education or STEM solution.",
    "Service Sector": "Hello LUNAR, I am interested in a digital system for my service business.",
    Other: WHATSAPP_DEFAULT_TEXT,
  };
  const text = messages[service] ?? `Hello LUNAR, I'd like to scope: ${service}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const tagline = "The Orbit of Intelligent Operations";

// --- Navigation ---
export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Solutions", to: "/solutions" },
  { label: "Our Work", to: "/our-work" },
  { label: "Clients", to: "/clients" },
  { label: "Process", to: "/process" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "Contact", to: "/contact" },
];

// --- Industries served ---
export const industries = [
  "SMEs",
  "Factories",
  "Farms",
  "Plantations",
  "Schools",
  "Institutions",
  "Workshops",
  "F&B Businesses",
  "Cold Storage",
  "Distributors",
  "Professional Services",
  "Clinics & Salons",
  "Contractors",
];

// --- Solution pillars (7) ---
export interface Solution {
  slug: string;
  name: string;
  icon: string; // lucide-react icon name
  promise: string;
  oneLiner: string;
  whatItIs: string;
  whoFor: string;
  problems: string[];
  whatWeBuild: string[];
}

export const solutions: Solution[] = [
  {
    slug: "web-digital-presence",
    name: "Web & Digital Presence",
    icon: "Globe",
    promise: "Look credible. Be found. Convert.",
    oneLiner: "Professional websites and digital foundations that look as capable as the business really is.",
    whatItIs: "Custom websites and digital foundations built to convert and to last.",
    whoFor: "SMEs, professional services, and institutions that need a serious online presence.",
    problems: [
      "Outdated or no website",
      "Poor search visibility",
      "No clear way for customers to enquire",
      "A brand that looks smaller than the business really is",
    ],
    whatWeBuild: ["Responsive websites", "Content management", "Lead-capture forms", "Catalogue integration", "SEO fundamentals", "Analytics"],
  },
  {
    slug: "business-systems",
    name: "Custom Business Systems",
    icon: "Boxes",
    promise: "Software that fits how you actually work.",
    oneLiner: "Custom software shaped to a specific operation — including the dashboards and reports you need to run it.",
    whatItIs: "Internal tools that replace spreadsheets and paper with a single source of truth, plus the reporting to see it clearly.",
    whoFor: "Distributors, workshops, and SMEs outgrowing spreadsheets.",
    problems: ["Data re-keyed across files", "Version chaos", "No single source of truth", "Manual processes that don't scale", "No real-time visibility into the numbers"],
    whatWeBuild: [
      "Inventory and stock control",
      "Records and workflows",
      "Roles, approvals, and admin panels",
      "KPI dashboards and analytics views",
      "Exports and scheduled reports (including PDF)",
      "Finance, tax, and operational summaries",
      "Integrations with tools you already use",
    ],
  },
  {
    slug: "automation-iot-monitoring",
    name: "Automation & IoT Monitoring",
    icon: "RadioTower",
    promise: "Catch problems before they cost you.",
    oneLiner: "Sensors, automation, and monitoring that catch problems before they become losses.",
    whatItIs: "Connected sensors, dashboards, and alerts watching the conditions that matter — including CCTV and site monitoring where relevant.",
    whoFor: "Factories, cold storage, and facilities that rely on conditions staying in range.",
    problems: ["Manual checks and logs", "Problems found too late", "Repetitive tasks eating staff time", "No record of what happened when", "No visibility into the site when nobody's there"],
    whatWeBuild: [
      "Live sensor feeds",
      "Threshold alerts (SMS / WhatsApp / email)",
      "Automated tasks and routines",
      "CCTV and camera-based monitoring integration",
      "Event logs and history",
      "Escalation rules",
    ],
  },
  {
    slug: "agriculture-plantation-monitoring",
    name: "Agriculture & Plantation Monitoring",
    icon: "Sprout",
    promise: "Field-level visibility, from anywhere.",
    oneLiner: "Field-level visibility for farms and plantations, from anywhere.",
    whatItIs: "Monitoring for conditions, equipment, and yields — mapped and watched in real time.",
    whoFor: "Farms, plantations, and estates managing land and assets at scale.",
    problems: ["Conditions checked on foot", "Issues spotted late", "Scattered records", "Hard to see the whole estate at once"],
    whatWeBuild: ["Environmental sensors", "Field / estate mapping", "Status dashboards", "Alerts", "Yield and activity records"],
  },
  {
    slug: "factory-facility-monitoring",
    name: "Factory & Facility Monitoring",
    icon: "Factory",
    promise: "Real-time visibility across the floor.",
    oneLiner: "Real-time visibility across the factory floor and facility conditions.",
    whatItIs: "Monitoring across equipment, temperature, downtime, and site security, in one view.",
    whoFor: "Manufacturers, cold storage operators, and facility managers.",
    problems: ["Unplanned downtime", "Cold-chain risk", "Manual rounds", "No early warning", "Fragmented equipment data", "Limited visibility into site security"],
    whatWeBuild: ["Equipment and temperature monitoring", "Downtime alerts", "Live floor status", "CCTV and access monitoring integration", "Reporting", "Maintenance history"],
  },
  {
    slug: "education-stem-solutions",
    name: "Education & STEM Solutions",
    icon: "GraduationCap",
    promise: "Turn theory into things students can build.",
    oneLiner: "Digital portals and applied STEM platforms for schools and institutions.",
    whatItIs: "Learning portals and hands-on STEM/robotics platforms that turn theory into practice.",
    whoFor: "Schools, polytechnics, and institutions building real, industry-aligned labs.",
    problems: ["AI / robotics taught only on slides", "Fragmented DIY kits", "Outdated lab hardware", "A gap between theory and verifiable, hands-on skill"],
    whatWeBuild: ["Learning portals", "Monitoring dashboards", "Applied STEM curricula", "Milestone-based learning tracks"],
  },
  {
    slug: "service-sector-systems",
    name: "Service Sector Digital Systems",
    icon: "Sparkles",
    promise: "Run bookings, jobs, and clients from one place.",
    oneLiner: "Booking, scheduling, and client management systems for service-based businesses.",
    whatItIs: "Digital systems for clinics, salons, contractors, and other service businesses to manage bookings, jobs, and clients.",
    whoFor: "Clinics, salons, contractors, and other operational service businesses.",
    problems: ["Bookings tracked by phone or paper", "Double-bookings and missed appointments", "No record of client or job history", "No visibility into site or facility monitoring where relevant"],
    whatWeBuild: ["Booking and scheduling systems", "Client and job records", "Staff and resource management", "Facility and CCTV monitoring integration where relevant", "Reminders and notifications"],
  },
];

// --- Process steps (7) ---
export const processSteps = [
  { title: "Understand your operation", body: "How the business really runs, on the ground." },
  { title: "Map the problem", body: "Where time, data, and money leak." },
  { title: "Design the system", body: "A clear plan shaped to your workflow." },
  { title: "Build the first phase", body: "Start focused, deliver something working." },
  { title: "Test and refine", body: "Validate against real use." },
  { title: "Train and hand over", body: "Your team can actually run it." },
  { title: "Support and improve", body: "Keep it reliable and grow it." },
];

export const scopingNote =
  "Every project is scoped to your operation, requirements, and system complexity — we don't publish fixed prices.";

// --- What makes LUNAR different ---
export const differentiators = [
  { title: "Built around real operations", body: "Systems designed from the actual workflow, not a template." },
  { title: "Engineering discipline + modern software", body: "The reliability of engineering with the speed of modern tooling." },
  { title: "Full span", body: "Websites, systems, automation, IoT, and facility monitoring under one partner." },
  { title: "Understand-first process", body: "LUNAR learns the operation before building anything." },
  { title: "Honest and scoped", body: "Demos vs. delivered work are always clearly labelled; every project is scoped to the client." },
];

// --- Client segments (no real clients yet — never fabricate logos/testimonials) ---
export const clientSegments = [
  "SMEs",
  "Factories",
  "Farms & Plantations",
  "Schools & Institutions",
  "Workshops",
  "F&B and Cold Storage",
  "Professional Businesses",
  "Distributors",
  "Service Sector Businesses",
];

// --- Selected work (placeholder / demo / prototype — never presented as client delivery) ---
export type WorkLabel = "Platform" | "Demo" | "Prototype" | "Concept";

export type ProjectVisualKind = "dashboard" | "sensor" | "map" | "floor" | "devices" | "portal" | "booking" | "camera";

export interface Project {
  slug: string;
  title: string;
  category: string;
  label: WorkLabel;
  tags: string[];
  visual: ProjectVisualKind;
  problem: string;
  solutionText: string;
  value: string;
  features: string[];
}

export const projects: Project[] = [
  {
    slug: "company-website-build",
    title: "Company Website Build",
    category: "Web & Digital Presence",
    label: "Demo",
    tags: ["web"],
    visual: "devices",
    problem: "A brand that looked smaller online than the business really was.",
    solutionText: "A professional, responsive site with lead capture and clear enquiry paths.",
    value: "Credible presence that converts visitors into enquiries.",
    features: ["Responsive design", "Lead-capture forms", "Catalogue integration", "SEO fundamentals"],
  },
  {
    slug: "custom-business-system",
    title: "Custom Business System",
    category: "Business System",
    label: "Demo",
    tags: ["business systems"],
    visual: "dashboard",
    problem: "Stock and records tracked across spreadsheets, with issues caught too late.",
    solutionText: "A live inventory and records system with real-time dashboards and low-stock alerts.",
    value: "One source of truth, replacing fragile spreadsheets.",
    features: ["Real-time stock levels", "KPI dashboard", "Low-stock threshold alerts", "Exportable reports"],
  },
  {
    slug: "cold-storage-guardian",
    title: "Cold Storage Guardian",
    category: "Temperature Monitoring",
    label: "Demo",
    tags: ["automation-iot", "factory"],
    visual: "sensor",
    problem: "Cold-chain risk with no continuous record of temperature.",
    solutionText: "Continuous cold-chain monitoring with instant alerts on breach.",
    value: "Catch temperature excursions before stock is lost.",
    features: ["Live sensor feed", "Threshold breach alerts", "Historical temperature log", "WhatsApp/SMS escalation"],
  },
  {
    slug: "farm-watch-pilot",
    title: "Farm Watch Pilot",
    category: "IoT Monitoring",
    label: "Prototype",
    tags: ["agriculture", "automation-iot"],
    visual: "map",
    problem: "Field conditions checked on foot, with issues spotted late.",
    solutionText: "Field sensors streaming conditions with early-warning alerts.",
    value: "Field-level visibility without walking the estate.",
    features: ["Environmental sensor feed", "Estate map view", "Early-warning alerts", "Activity log"],
  },
  {
    slug: "factory-visibility-system",
    title: "Factory Visibility System",
    category: "Facility Monitoring",
    label: "Concept",
    tags: ["factory"],
    visual: "floor",
    problem: "Floor status, equipment health, and downtime scattered and unseen.",
    solutionText: "One view of floor status, equipment health, and downtime alerts.",
    value: "See the whole floor at a glance; act on downtime faster.",
    features: ["Live floor status", "Equipment health tiles", "Downtime alerts", "Maintenance history"],
  },
  {
    slug: "service-booking-system",
    title: "Service Booking System",
    category: "Service Sector",
    label: "Concept",
    tags: ["service-sector"],
    visual: "booking",
    problem: "Bookings tracked by phone and paper, with double-bookings and no client history.",
    solutionText: "A booking and client management system for clinics, salons, and service businesses.",
    value: "Fewer missed appointments and a full history for every client.",
    features: ["Online booking and scheduling", "Client and job records", "Automated reminders", "Staff scheduling"],
  },
  {
    slug: "tax-finance-tool",
    title: "Tax / Finance Tool",
    category: "Business System",
    label: "Prototype",
    tags: ["business systems"],
    visual: "dashboard",
    problem: "Finance and tax records kept in fragile, error-prone spreadsheets.",
    solutionText: "Structured records and workflows with exportable reports for finance and tax.",
    value: "Trustworthy records with less manual re-keying.",
    features: ["Structured financial records", "Approval workflows", "PDF report generation", "Role-based access"],
  },
  {
    slug: "school-stem-portal",
    title: "School STEM Portal",
    category: "Education System",
    label: "Demo",
    tags: ["education", "web"],
    visual: "portal",
    problem: "Learning materials and lab progress fragmented across tools.",
    solutionText: "A learning portal with monitoring dashboards for applied STEM.",
    value: "A single home for curriculum, progress, and lab data.",
    features: ["Learning portal", "Progress dashboards", "Milestone tracking", "Applied STEM curriculum"],
  },
  {
    slug: "smart-plant-monitor",
    title: "Smart Plant Monitor",
    category: "Facility Monitoring",
    label: "Prototype",
    tags: ["factory", "automation-iot"],
    visual: "sensor",
    problem: "Equipment health and environmental conditions checked manually, if at all.",
    solutionText: "Sensor-based monitoring of equipment and environmental conditions with alerts.",
    value: "Early warning on equipment issues before they cause downtime.",
    features: ["Equipment health sensors", "Environmental monitoring", "Threshold alerts", "Historical trends"],
  },
  {
    slug: "cctv-facility-monitoring-concept",
    title: "CCTV / Facility Monitoring Concept",
    category: "Facility Monitoring",
    label: "Concept",
    tags: ["automation-iot", "factory", "service-sector"],
    visual: "camera",
    problem: "No visibility into a site or facility outside working hours, and no unified view of cameras and sensors.",
    solutionText: "A concept for integrating CCTV and access monitoring into the same dashboard as equipment and environmental sensors.",
    value: "One place to see equipment status and site security together.",
    features: ["Camera-based monitoring integration", "Alert notifications", "Unified facility dashboard", "Access/event logs"],
  },
];

export const workFilters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Business Systems", value: "business systems" },
  { label: "Automation / IoT", value: "automation-iot" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Factory", value: "factory" },
  { label: "Education", value: "education" },
  { label: "Service Sector", value: "service-sector" },
];
