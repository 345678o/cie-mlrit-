export type VerticalRole = {
  title: string;
  desc: string;
};

export type VerticalProject = {
  name: string;
  desc: string;
  status: "Active" | "Completed" | "Upcoming";
};

export type VerticalEvent = {
  name: string;
  desc: string;
  type: string;
};

export type Vertical = {
  id: string;
  abbr: string;
  name: string;
  tagline: string;
  color: string;
  textColor: string;
  gradient: string;
  lightBg: string;
  border: string;
  shortDesc: string;
  overview: string[];
  quote: string;
  stats: { value: string; label: string }[];
  roles: VerticalRole[];
  projects: VerticalProject[];
  events: VerticalEvent[];
  achievements: string[];
  applyInfo?: string;
};

export const VERTICALS: Vertical[] = [
  {
    id: "mp",
    abbr: "MP",
    name: "MP",
    tagline: "Build Small. Think Big.",
    color: "#0891B2",
    textColor: "#0c4a6e",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 55%, #0891B2 100%)",
    lightBg: "rgba(8,145,178,0.07)",
    border: "rgba(8,145,178,0.22)",
    shortDesc:
      "Microprojects empowers students to build focused, real-world solutions in short sprints. Small in scope, big in learning.",
    overview: [
      "MP (Microprojects) is CIE's flagship hands-on learning vertical. It gives students a low-barrier entry point into building real things — no big teams, no long timelines, just a focused idea and 2–4 weeks to execute it.",
      "Each sprint begins with a defined problem statement and ends with a live demo to peers and mentors. Projects span web apps, IoT prototypes, data tools, design systems, and more.",
      "MP is designed to build the habit of shipping. Whether it's a first project or a fiftieth, every microproject adds to a student's portfolio and sharpens their ability to execute under constraints.",
    ],
    quote: "The best way to learn to build is to just start building — no matter how small.",
    stats: [
      { value: "80+", label: "Projects Completed" },
      { value: "2–4", label: "Week Sprints" },
      { value: "200+", label: "Students Involved" },
    ],
    roles: [
      { title: "Project Lead", desc: "Owns the sprint — sets the problem statement, drives the timeline, and ensures the team ships on time." },
      { title: "Developer", desc: "Builds the core product — frontend, backend, or firmware depending on the project type." },
      { title: "Designer", desc: "Handles UX/UI, user research, and visual output for product-facing work." },
      { title: "QA & Documentation", desc: "Tests deliverables and maintains project records, READMEs, and demo materials." },
      { title: "Vertical Coordinator", desc: "Manages MP operations — sprint scheduling, mentor allocation, and showcase logistics." },
    ],
    projects: [
      { name: "Campus Food Waste Tracker", desc: "IoT-based system tracking daily food waste in the MLRIT canteen with a live dashboard.", status: "Completed" },
      { name: "CIE Member Portal", desc: "Internal web app for CIE members to track their project submissions and activity history.", status: "Active" },
      { name: "AR Campus Map", desc: "Augmented reality navigation layer for the MLRIT campus built with ARCore.", status: "Completed" },
      { name: "Smart Attendance System", desc: "Face-recognition based attendance marking integrated with the college ERP.", status: "Completed" },
      { name: "Peer Review Platform", desc: "Web platform for structured peer feedback on microproject demos.", status: "Upcoming" },
    ],
    events: [
      { name: "Sprint Showcase", type: "Monthly", desc: "End-of-sprint demo event where teams present their completed microprojects to peers and mentors." },
      { name: "Skill Blitz", type: "Bi-monthly", desc: "Focused 48-hour challenge targeting one specific skill — UI design, API wrangling, ML inference, etc." },
      { name: "MP Kickoff", type: "Each Cohort", desc: "Onboarding session where new teams form, pick problem statements, and get matched with mentors." },
    ],
    achievements: [
      "80+ microprojects shipped across 10+ domains",
      "3 projects selected for MLRIT's Innovation Showcase",
      "200+ students onboarded since inception",
      "5 projects evolved into full Product Dev vertical builds",
    ],
    applyInfo:
      "MP is open to all MLRIT students. To join, submit a project idea (solo or team of 2–3) during the next sprint window. No prior experience required — just the intent to build something.",
  },
  {
    id: "cie-studios",
    abbr: "CS",
    name: "CIE Studios",
    tagline: "Build Without Limits",
    color: "#7C3AED",
    textColor: "#3b0764",
    gradient: "linear-gradient(145deg, #3b0764 0%, #6d28d9 55%, #7c3aed 100%)",
    lightBg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.22)",
    shortDesc:
      "Six purpose-built creative workspaces for design, film, audio, and more. A creative infrastructure for students who make things.",
    overview: [
      "CIE Studios is the creative infrastructure of the Centre — six purpose-built workspaces that give MLRIT students access to professional-grade tools, equipment, and environments they wouldn't otherwise have.",
      "Each studio is designed for a specific discipline: product design, content creation, photography, podcast recording, video production, and open fabrication. Studios are managed by a dedicated team and open 24/7 to active CIE members.",
      "Beyond providing space, Studios runs workshops, masterclasses, and collaborative projects that connect students across disciplines — turning isolated creators into a cohesive creative community.",
    ],
    quote: "Every great product started with the right tools and the right space.",
    stats: [
      { value: "6", label: "Specialized Studios" },
      { value: "200+", label: "Monthly Users" },
      { value: "24/7", label: "Access for Members" },
    ],
    roles: [
      { title: "Studio Manager", desc: "Oversees day-to-day operations of all six studios — equipment maintenance, bookings, and member access." },
      { title: "Design Lead", desc: "Runs the Design Studio — conducts UX/branding workshops and supports product design projects." },
      { title: "Content Creator", desc: "Produces video, reels, and multimedia content for CIE's social channels and internal campaigns." },
      { title: "Photographer", desc: "Manages the Photo Studio and shoots events, portraits, and product photography for CIE." },
      { title: "Audio Engineer", desc: "Operates the Podcast & Audio Studio — records, mixes, and produces CIE's audio content." },
    ],
    projects: [
      { name: "CIE Brand Identity System", desc: "A comprehensive visual identity guide covering logo usage, color palettes, typography, and templates.", status: "Completed" },
      { name: "Campus Stories Podcast", desc: "A fortnightly podcast featuring founders, faculty, and students from the MLRIT ecosystem.", status: "Active" },
      { name: "Startup Photography Archive", desc: "A curated photo library documenting all CIE startups, events, and team milestones.", status: "Active" },
      { name: "Motion Design Pack", desc: "Reusable motion design templates for CIE's social media, presentations, and event branding.", status: "Upcoming" },
    ],
    events: [
      { name: "Design Sprint Workshop", type: "Monthly", desc: "Full-day workshop taking participants from brief to prototype using design thinking methodology." },
      { name: "Reel Workshop", type: "Quarterly", desc: "Hands-on session on shooting and editing short-form video for social media and storytelling." },
      { name: "Open Studio Day", type: "Bi-monthly", desc: "Open-door sessions where any MLRIT student can walk in, explore the studios, and use the equipment." },
    ],
    achievements: [
      "Brand identity created for 12+ CIE startups",
      "200+ monthly active studio users",
      "30+ podcast episodes recorded and published",
      "Covered 50+ CIE events with professional photography",
    ],
    applyInfo:
      "Active CIE members get 24/7 studio access. To join the Studios team as a creator, designer, or operator, apply through the CIE portal during open recruitment cycles.",
  },
  {
    id: "product-development",
    abbr: "PD",
    name: "Product Development",
    tagline: "Ship Real Things",
    color: "#059669",
    textColor: "#064e3b",
    gradient: "linear-gradient(145deg, #064e3b 0%, #047857 55%, #059669 100%)",
    lightBg: "rgba(5,150,105,0.07)",
    border: "rgba(5,150,105,0.22)",
    shortDesc:
      "From napkin sketch to deployed product. The methodology, mentorship, and infrastructure to build software, hardware, and everything in between.",
    overview: [
      "Product Development is where ideas become real, scalable products. Unlike Microprojects' sprint format, PD takes a longer view — guiding teams through full product lifecycles from initial discovery to market-ready deployment.",
      "Teams work on software (web, mobile, SaaS), hardware (IoT, embedded systems, PCB), or hybrid products. Every team gets a dedicated mentor, access to the Hardware Lab, and bi-weekly sprint reviews to stay on track.",
      "The vertical prioritizes quality and real-world impact over speed. Products that come out of PD are live, functional, and used by real people — not just demos.",
    ],
    quote: "Idea to product in 8 weeks. That's the Product Development standard.",
    stats: [
      { value: "40+", label: "Products Built" },
      { value: "15", label: "Live Deployments" },
      { value: "₹20L+", label: "Products Funded" },
    ],
    roles: [
      { title: "Product Manager", desc: "Drives the product roadmap — user research, feature prioritization, sprint planning, and stakeholder communication." },
      { title: "Full-Stack Developer", desc: "Builds and maintains the software core — frontend, backend, APIs, and cloud infrastructure." },
      { title: "Hardware Engineer", desc: "Designs, fabricates, and tests physical product components using the Hardware Lab." },
      { title: "UX Designer", desc: "Owns the user experience — wireframes, prototypes, usability testing, and final visual design." },
      { title: "QA & DevOps", desc: "Ensures product stability — automated testing, CI/CD pipelines, and deployment management." },
    ],
    projects: [
      { name: "CIE Mobile App", desc: "Cross-platform app for CIE members — event updates, project submissions, and community feed.", status: "Active" },
      { name: "Smart Campus Sensor Network", desc: "IoT network monitoring energy consumption across MLRIT buildings with a real-time dashboard.", status: "Active" },
      { name: "InvestorMatch Platform", desc: "Web platform connecting student startups with angel investors and seed-stage VCs.", status: "Upcoming" },
      { name: "MLRIT Alumni Network", desc: "Platform enabling alumni-student mentorship, job referrals, and community connections.", status: "Completed" },
      { name: "Inventory Management System", desc: "Internal tool managing CIE's equipment inventory, bookings, and maintenance logs.", status: "Completed" },
    ],
    events: [
      { name: "Sprint Review", type: "Bi-weekly", desc: "Teams demo their latest sprint output to mentors for structured feedback and direction." },
      { name: "Product Demo Day", type: "Quarterly", desc: "Showcase event where PD teams present completed products to investors, alumni, and faculty." },
      { name: "Hardware Hackathon", type: "Annual", desc: "48-hour hardware build event using the CIE Hardware Lab — open to all MLRIT students." },
    ],
    achievements: [
      "40+ products built and documented",
      "15 products deployed to live users",
      "₹20L+ in grants and seed funding secured",
      "3 products licensed by MLRIT for institutional use",
    ],
    applyInfo:
      "Submit a product proposal with your team (2–5 members), problem statement, and target users. Selected teams are onboarded at the start of each semester and assigned a mentor and resources.",
  },
  {
    id: "startup-cohort",
    abbr: "SC",
    name: "Startup Cohort",
    tagline: "Zero to One",
    color: "#E11D48",
    textColor: "#881337",
    gradient: "linear-gradient(145deg, #881337 0%, #be123c 55%, #E11D48 100%)",
    lightBg: "rgba(225,29,72,0.07)",
    border: "rgba(225,29,72,0.22)",
    shortDesc:
      "A structured 12-week program taking founding teams from raw idea to fundable startup through mentorship, pitch training, and milestone reviews.",
    overview: [
      "The Startup Cohort is CIE's most intensive program — a 12-week journey designed for students who are serious about building a company, not just a project.",
      "Each cohort selects 8–12 founding teams through a competitive application process. Teams go through structured phases: idea validation, customer discovery, MVP development, business model design, pitch preparation, and investor connect.",
      "Every team is paired with a dedicated mentor from CIE's network of founders, VCs, and domain experts. The program culminates in a Demo Day where teams pitch to a curated audience of investors and industry leaders.",
    ],
    quote: "We don't build startups. We build founders who build startups.",
    stats: [
      { value: "3", label: "Cohorts Run" },
      { value: "25+", label: "Startups Mentored" },
      { value: "₹15L+", label: "Funding Facilitated" },
    ],
    roles: [
      { title: "Cohort Lead", desc: "Manages end-to-end cohort operations — selection, scheduling, mentor coordination, and Demo Day production." },
      { title: "Startup Mentor", desc: "A senior founder or industry expert paired 1-on-1 with a cohort team for the full 12 weeks." },
      { title: "Pitch Coach", desc: "Runs pitch preparation workshops and gives structured feedback on decks, storytelling, and delivery." },
      { title: "Finance & Legal Advisor", desc: "Guides teams on term sheets, equity structure, financial modeling, and legal entity formation." },
      { title: "Community Manager", desc: "Runs alumni networks, founder circles, and inter-cohort knowledge-sharing sessions." },
    ],
    projects: [
      { name: "Cohort 1 — EdTech Track", desc: "First cohort focused on education technology — produced 3 funded ventures in the K-12 and skilling space.", status: "Completed" },
      { name: "Cohort 2 — Sustainability Track", desc: "Focused on climate tech and sustainable consumer products — 5 teams, 2 with active funding.", status: "Completed" },
      { name: "Cohort 3 — Open Track", desc: "Open theme cohort with teams across SaaS, health, and hardware — currently in progress.", status: "Active" },
      { name: "Startup Alumni Network", desc: "A living network of CIE cohort graduates for peer support, referrals, and co-founder matching.", status: "Active" },
    ],
    events: [
      { name: "Cohort Demo Day", type: "End of Cohort", desc: "The flagship event — teams pitch to a curated audience of investors, mentors, and CIE alumni." },
      { name: "Pitch Night", type: "Monthly", desc: "Practice pitch sessions with feedback from peers and a rotating panel of mentors." },
      { name: "Founder Fireside", type: "Bi-weekly", desc: "Informal conversations with successful founders on their journey, failures, and lessons." },
      { name: "Cohort Kickoff", type: "Each Cohort", desc: "Opening boot camp — team building, cohort goals, mentor matching, and first milestone setting." },
    ],
    achievements: [
      "3 cohorts completed, 4th in planning",
      "25+ startups mentored and supported",
      "₹15L+ in funding facilitated across cohort graduates",
      "2 ventures currently backed by external investors",
    ],
    applyInfo:
      "Applications open once per semester. Teams of 2–4 with a startup idea, at least one technical co-founder, and genuine commitment to the 12-week program are encouraged to apply. Solo founders may apply but team formation is strongly recommended.",
  },
  {
    id: "events",
    abbr: "EV",
    name: "Events",
    tagline: "Make It Happen",
    color: "#D97706",
    textColor: "#78350f",
    gradient: "linear-gradient(145deg, #78350f 0%, #b45309 55%, #d97706 100%)",
    lightBg: "rgba(217,119,6,0.07)",
    border: "rgba(217,119,6,0.22)",
    shortDesc:
      "Designing and executing transformative events — from 200-person hackathons to intimate mentorship circles and industry speaker series.",
    overview: [
      "The Events vertical is responsible for the full lifecycle of every CIE event — from concept and design to logistics, production, and post-event documentation. With 50+ events per year, it is the most visible vertical at CIE.",
      "The team runs events across five formats: hackathons, Demo Days, speaker series, workshops, and large-scale summits. Each format requires distinct skills — and the Events team develops them all.",
      "Beyond execution, the vertical drives community building at CIE. Events are where students meet mentors, where teams form, where ideas get challenged, and where CIE's culture gets defined.",
    ],
    quote: "An event isn't a calendar entry — it's a moment that changes trajectories.",
    stats: [
      { value: "50+", label: "Events Per Year" },
      { value: "5K+", label: "Total Attendees" },
      { value: "3", label: "National Events" },
    ],
    roles: [
      { title: "Event Lead", desc: "Owns the event end-to-end — concept, planning, execution, and post-event review." },
      { title: "Logistics Coordinator", desc: "Manages venue, equipment, catering, registrations, and day-of operations." },
      { title: "Creative & Branding", desc: "Designs all event visuals — posters, social assets, stage design, and documentation." },
      { title: "Tech & AV", desc: "Sets up and operates all technical infrastructure — live streaming, AV, and digital tools." },
      { title: "Marketing & Outreach", desc: "Drives awareness and attendance — social media, email campaigns, and cross-college promotions." },
    ],
    projects: [
      { name: "Hustle Mania", desc: "CIE's flagship 24-hour entrepreneurship hackathon — 200+ participants, 40+ teams, live judging.", status: "Active" },
      { name: "B2B — Business to Brand", desc: "Brand strategy competition where teams develop a complete brand identity for a real brief.", status: "Active" },
      { name: "CIE Speaker Series", desc: "Monthly speaker sessions bringing founders, VCs, and industry leaders to MLRIT campus.", status: "Active" },
      { name: "Annual Innovation Summit", desc: "CIE's largest event — a full-day summit featuring keynotes, panels, demos, and awards.", status: "Upcoming" },
    ],
    events: [
      { name: "Hustle Mania", type: "Annual", desc: "24-hour startup hackathon — CIE's biggest and most anticipated event of the year." },
      { name: "Demo Day", type: "Quarterly", desc: "Student teams pitch their products and startups to a live audience of investors and alumni." },
      { name: "Speaker Series", type: "Monthly", desc: "Curated talks from founders, investors, and practitioners — online and on-campus." },
      { name: "Workshop Carnival", type: "Semester", desc: "Multi-day skill workshop series across tech, design, business, and communication." },
    ],
    achievements: [
      "50+ events executed in the 2024–25 academic year",
      "5,000+ total attendees across all events",
      "3 national-level events organized",
      "10+ industry speakers hosted on campus",
    ],
    applyInfo:
      "The Events team recruits each semester. Roles span creative, technical, logistics, and marketing. If you enjoy bringing ideas to life and working under pressure, apply during the next recruitment cycle.",
  },
];

export function getVertical(id: string): Vertical | undefined {
  return VERTICALS.find((v) => v.id === id);
}

export function getAllVerticalIds(): string[] {
  return VERTICALS.map((v) => v.id);
}
