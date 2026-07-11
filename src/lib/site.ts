// Shared site data for LUNAR. Copy follows the brand messaging brief —
// do not invent alternate taglines or headlines.

// --- Contact & CTA endpoints (PLACEHOLDERS — replace before launch) ---
export const contact = {
  whatsapp: "https://wa.me/60000000000",
  whatsappText:
    "https://wa.me/60000000000?text=Hi%20LUNAR%2C%20I%27d%20like%20to%20discuss%20a%20project.",
  email: "hello@lunartech.my",
  mailto: "mailto:hello@lunartech.my",
  catalogue: "/catalogue",
  location: "Malaysia",
};

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
  "Workshops",
  "F&B",
  "Cold Storage",
  "Distributors",
  "Institutions",
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
  visual: string;
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
    visual: "Clean device mockups on a dark UI, generous whitespace, a subtle teal accent line.",
  },
  {
    slug: "business-systems",
    name: "Custom Business Systems",
    icon: "Boxes",
    promise: "Software that fits how you actually work.",
    oneLiner: "Custom software shaped to a specific operation — not a template forced on top.",
    whatItIs: "Internal tools that replace spreadsheets and paper with a single source of truth.",
    whoFor: "Distributors, workshops, and SMEs outgrowing spreadsheets.",
    problems: ["Data re-keyed across files", "Version chaos", "No single source of truth", "Manual processes that don't scale"],
    whatWeBuild: ["Inventory and stock control", "Records and workflows", "Roles and approvals", "Reporting", "Integrations with tools you already use"],
    visual: "Clean interface screens; a simple 'spreadsheet → system' before/after.",
  },
  {
    slug: "dashboards-reporting",
    name: "Dashboards & Reporting",
    icon: "Gauge",
    promise: "See your whole operation on one screen.",
    oneLiner: "Live dashboards that replace manual checking with real-time figures.",
    whatItIs: "A single, real-time view of the metrics an operation actually depends on.",
    whoFor: "Any owner or manager flying blind on their numbers.",
    problems: ["No real-time visibility", "Reports built by hand", "Decisions on stale data", "Metrics buried across tools"],
    whatWeBuild: ["Real-time KPIs", "Alerts and thresholds", "Multi-source views", "Exports and scheduled reports", "Role-based views"],
    visual: "Premium dashboard mockups — clean charts, status tiles, clear alerts on dark UI.",
  },
  {
    slug: "automation-iot-monitoring",
    name: "Automation & IoT Monitoring",
    icon: "RadioTower",
    promise: "Catch problems before they cost you.",
    oneLiner: "Sensors and automation that catch problems before they become losses.",
    whatItIs: "Connected sensors, dashboards, and alerts watching the conditions that matter.",
    whoFor: "Factories, cold storage, and facilities that rely on conditions staying in range.",
    problems: ["Manual checks and logs", "Problems found too late", "Repetitive tasks eating staff time", "No record of what happened when"],
    whatWeBuild: ["Live sensor feeds", "Threshold alerts (SMS / WhatsApp / email)", "Automated tasks and routines", "Event logs and history", "Escalation rules"],
    visual: "Live-status tiles with a subtle pulse; sensor/device imagery; alert timeline.",
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
    visual: "Map / estate views; field imagery; environmental status tiles.",
  },
  {
    slug: "factory-facility-monitoring",
    name: "Factory & Facility Monitoring",
    icon: "Factory",
    promise: "Real-time visibility across the floor.",
    oneLiner: "Real-time visibility across the factory floor and facility conditions.",
    whatItIs: "Monitoring across equipment, temperature, and downtime, in one view.",
    whoFor: "Manufacturers, cold storage operators, and facility managers.",
    problems: ["Unplanned downtime", "Cold-chain risk", "Manual rounds", "No early warning", "Fragmented equipment data"],
    whatWeBuild: ["Equipment and temperature monitoring", "Downtime alerts", "Live floor status", "Reporting", "Maintenance history"],
    visual: "Floor / facility status board; equipment tiles; temperature trend charts.",
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
    visual: "Lab / device imagery; milestone strip (Fundamentals → Applied build → System check).",
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
  { title: "Full span", body: "Websites, systems, dashboards, automation, and IoT monitoring under one partner." },
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
];

// --- Selected work (placeholder / demo / prototype — never presented as client delivery) ---
export type WorkLabel = "Platform" | "Demo" | "Prototype" | "Concept";

export type ProjectVisualKind = "dashboard" | "sensor" | "map" | "floor" | "devices" | "portal";

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
    slug: "inventory-dashboard",
    title: "Inventory Dashboard",
    category: "Business System",
    label: "Demo",
    tags: ["business systems", "dashboards"],
    visual: "dashboard",
    problem: "Stock tracked across spreadsheets, with low-stock caught too late.",
    solutionText: "A live inventory system with real-time stock levels and low-stock alerts.",
    value: "One source of truth for stock, replacing fragile spreadsheets.",
    features: ["Real-time stock levels", "Low-stock threshold alerts", "Multi-location views", "Exportable reports"],
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
    slug: "factory-visibility-board",
    title: "Factory Visibility Board",
    category: "Facility Monitoring",
    label: "Concept",
    tags: ["factory", "dashboards"],
    visual: "floor",
    problem: "Floor status, equipment health, and downtime scattered and unseen.",
    solutionText: "One view of floor status, equipment health, and downtime alerts.",
    value: "See the whole floor at a glance; act on downtime faster.",
    features: ["Live floor status", "Equipment health tiles", "Downtime alerts", "Maintenance history"],
  },
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
];

export const workFilters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Business Systems", value: "business systems" },
  { label: "Dashboards", value: "dashboards" },
  { label: "Automation / IoT", value: "automation-iot" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Factory", value: "factory" },
  { label: "Education", value: "education" },
];
