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

export type VerticalMedia = {
  type: "image" | "video";
  src: string;
  caption?: string;
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
  timeline?: { step: string; title: string; desc: string }[];
  timelineLabel?: string;
  timelineHeading?: string;
  features?: { title: string; desc: string }[];
  featuresLabel?: string;
  featuresHeading?: string;
  media?: VerticalMedia[];
};

export const VERTICALS: Vertical[] = [
  {
    id: "mp",
    abbr: "MP",
    name: "MP",
    tagline: "Build Your First Idea",
    color: "#0891B2",
    textColor: "#0c4a6e",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 55%, #0891B2 100%)",
    lightBg: "rgba(8,145,178,0.07)",
    border: "rgba(8,145,178,0.22)",
    shortDesc:
      "Microprojects are where many students take their first step into hands-on work — small teams exploring a problem and trying to build a solution.",
    overview: [
      "Microprojects are where many students take their first step into hands-on work. Students work in small teams to explore a problem, understand the basics, and try building a solution.",
      "The project doesn't have to be groundbreaking. The goal is to learn how to start.",
      "Students learn how to divide work, research a problem, use tools, build prototypes, fix mistakes, and work together.",
      "For many students, a microproject is the first time an idea moves from paper to something they can actually see and test.",
    ],
    quote: "The best way to learn to build is to just start building — no matter how small.",
    stats: [
      { value: "80+", label: "Projects Completed" },
      { value: "8", label: "Week Sprints" },
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
    timeline: [
      { step: "01", title: "Apply & Form Team", desc: "Submit a project idea solo or as a team of 2–3. Open to all MLRIT students — no prior experience needed." },
      { step: "02", title: "Kickoff Session", desc: "Teams meet their assigned mentor, lock in the problem statement, and set clear sprint goals and deliverables." },
      { step: "03", title: "Sprint (8 Weeks)", desc: "Build, iterate, and prototype. Weekly async check-ins with mentors keep teams on track and unblocked." },
      { step: "04", title: "Mid-Sprint Review", desc: "Halfway checkpoint — mentors assess progress, course-correct, and give direct feedback on the build." },
      { step: "05", title: "Demo Day", desc: "Live showcase to peers, mentors, and CIE leadership. Each team presents their completed project and answers questions." },
      { step: "06", title: "Recognition & Next Steps", desc: "Top projects are featured in CIE's channels. Exceptional builds get fast-tracked into the Product Development vertical." },
    ],
    media: [
      // Add MP photos/videos here, e.g.:
      // { type: "image", src: "/verticals/mp/sprint-showcase.jpg", caption: "Sprint Showcase demo day" },
      // { type: "video", src: "/verticals/mp/kickoff-recap.mp4", caption: "MP Kickoff recap" },
    ],
  },
  {
    id: "cie-studios",
    abbr: "CS",
    name: "CIE Studios",
    tagline: "Stories Worth Sharing",
    color: "#7C3AED",
    textColor: "#3b0764",
    gradient: "linear-gradient(145deg, #3b0764 0%, #6d28d9 55%, #7c3aed 100%)",
    lightBg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.22)",
    shortDesc:
      "CIE Studios helps capture and share the stories behind the projects, events, and people that make up CIE — through photography, video, and digital content.",
    overview: [
      "A lot happens behind the scenes at CIE. Projects are built. Events are organised. People share their experiences. Teams spend weeks preparing for something that the audience sees for only a few hours.",
      "CIE Studios helps capture and share those stories.",
      "Through photography, video, interviews, podcasts, event coverage, and digital content, the team documents the people, ideas, and experiences that make up CIE.",
      "Because good work deserves to be seen, and good stories deserve to be told.",
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
    tagline: "Take an Idea Further",
    color: "#059669",
    textColor: "#064e3b",
    gradient: "linear-gradient(145deg, #064e3b 0%, #047857 55%, #059669 100%)",
    lightBg: "rgba(5,150,105,0.07)",
    border: "rgba(5,150,105,0.22)",
    shortDesc:
      "The Product Development vertical works on ideas and projects that have the potential to be developed further — from prototype to something genuinely useful.",
    overview: [
      "Building a prototype is one thing. Making it useful is another.",
      "The Product Development vertical works on ideas and projects that have the potential to be developed further. Teams think about the problem they are solving, who the solution is for, how it should work, what needs improvement, and how feedback can make the product better.",
      "The process involves research, design, building, testing, feedback, and a lot of iteration.",
      "Because good products are rarely built perfectly on the first try.",
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
    media: [
      // Add Product Development photos/videos here, e.g.:
      // { type: "image", src: "/verticals/product-development/demo-day.jpg", caption: "Product Demo Day" },
      // { type: "video", src: "/verticals/product-development/hardware-lab.mp4", caption: "Inside the Hardware Lab" },
    ],
  },
  {
    id: "startup-cohort",
    abbr: "SC",
    name: "Startup Cohort",
    tagline: "Explore What It Takes to Build a Startup",
    color: "#E11D48",
    textColor: "#881337",
    gradient: "linear-gradient(145deg, #881337 0%, #be123c 55%, #E11D48 100%)",
    lightBg: "rgba(225,29,72,0.07)",
    border: "rgba(225,29,72,0.22)",
    shortDesc:
      "For students who want to explore entrepreneurship beyond just pitching an idea — understanding problems, users, and how to communicate what they're building.",
    overview: [
      "Having an idea is exciting. But turning it into something people actually need requires patience, research, feedback, and a lot of learning.",
      "The Startup Cohort is for students who want to explore entrepreneurship beyond just pitching an idea.",
      "Students learn to understand problems, talk to potential users, question their assumptions, improve their ideas, understand basic business models, and communicate what they are building.",
      "The goal is not to tell every student to become a founder. The goal is to help students understand how entrepreneurship actually works.",
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
    timelineLabel: "Program Roadmap",
    timelineHeading: "Our Roadmap for Entrepreneurship",
    timeline: [
      { step: "I",   title: "Creative Thinking & Innovation",                  desc: "Exploring Entrepreneurial Spirit" },
      { step: "II",  title: "Emerging Technologies & Product Development",     desc: "Fundamentals of Financial Analysis" },
      { step: "III", title: "Understanding and Crafting Business Model",       desc: "Marketing Communication and Branding" },
      { step: "IV",  title: "Business Plan Writing and Pitching",              desc: "Seed Fund Support" },
      { step: "V",   title: "Start-up Mentoring & Registration",               desc: "Venture Growth Strategies" },
    ],
  },
  {
    id: "inventory",
    abbr: "INV",
    name: "Inventory",
    tagline: "The Team Behind the Resources",
    color: "#65A30D",
    textColor: "#365314",
    gradient: "linear-gradient(145deg, #365314 0%, #4d7c0f 55%, #65a30d 100%)",
    lightBg: "rgba(101,163,13,0.07)",
    border: "rgba(101,163,13,0.22)",
    shortDesc:
      "The Inventory Initiative gives students quick, reliable, and affordable access to the electronic components and modules needed to build micro-projects and prototypes.",
    overview: [
      "At the Centre for Innovation & Entrepreneurship (CIE), we believe that great ideas should never be limited by the availability of resources. Our Inventory Initiative is designed to provide students with quick, reliable, and affordable access to the electronic components and development modules required for building micro-projects, prototypes, and innovative solutions.",
      "Instead of spending valuable time searching across multiple vendors, students can obtain the components they need directly through the CIE Inventory. Every component is carefully verified and tested by experienced senior members to ensure quality, functionality, and reliability before it reaches the student. This allows project teams to focus on innovation rather than worrying about defective or incompatible parts.",
      "Our goal is to create a dependable ecosystem where every student can confidently begin building ideas without delays or uncertainty. By making quality components easily accessible, we aim to encourage experimentation, accelerate project development, and foster a stronger culture of innovation within CIE.",
      "Whether you're working on your first micro-project, preparing for a hackathon, developing an IoT prototype, or building a final-year innovation, the CIE Inventory is committed to being your trusted partner throughout your journey.",
    ],
    quote: "No one notices inventory until it's missing. We make sure that never happens.",
    featuresLabel: "Why Choose Us",
    featuresHeading: "Why Choose the CIE Inventory?",
    features: [
      { title: "Quality Assured", desc: "Components are inspected and tested by senior members before being issued." },
      { title: "Affordable Pricing", desc: "Cost-effective components to support student innovation without unnecessary expenses." },
      { title: "Easy Accessibility", desc: "Required parts are available within the campus ecosystem, reducing procurement time." },
      { title: "Student-Centric Support", desc: "Guidance in selecting suitable components for your project requirements." },
      { title: "Trusted Resource", desc: "Built by students, for students, with a focus on reliability and transparency." },
    ],
    stats: [
      { value: "300+", label: "Items Tracked" },
      { value: "6", label: "Studios & Labs Covered" },
      { value: "0", label: "Lost-Equipment Incidents" },
    ],
    roles: [
      { title: "Inventory Manager", desc: "Owns the full equipment catalog — stock counts, check-in/check-out logs, and audit schedules." },
      { title: "Procurement Coordinator", desc: "Sources new equipment and supplies, manages vendor relationships, and tracks purchase budgets." },
      { title: "Maintenance Lead", desc: "Inspects and services equipment, flags damage or wear, and coordinates repairs or replacements." },
      { title: "Studio Liaison", desc: "Coordinates with each studio/lab team to reconcile equipment usage and resolve discrepancies." },
    ],
    projects: [
      { name: "Inventory Management System", desc: "Internal tool managing CIE's equipment inventory, bookings, and maintenance logs.", status: "Active" },
      { name: "Equipment Audit Sprint", desc: "Full physical audit reconciling every studio and lab's stock against the digital catalog.", status: "Completed" },
      { name: "QR Asset Tagging", desc: "QR-code tagging system for fast equipment check-in/check-out scanning.", status: "Upcoming" },
    ],
    events: [
      { name: "Stock Audit Day", type: "Quarterly", desc: "Full physical count and reconciliation of equipment across all studios and labs." },
      { name: "Equipment Onboarding", type: "Each Semester", desc: "Training session for new members on check-out procedures and equipment handling." },
    ],
    achievements: [
      "300+ items cataloged across 6 studios and labs",
      "Zero lost-equipment incidents since digital tracking began",
      "Streamlined check-out turnaround to under 5 minutes",
    ],
    applyInfo:
      "Inventory recruits members each semester who are detail-oriented and reliable. No prior experience needed — training is provided on the tracking system and equipment handling procedures.",
  },
];

export function getVertical(id: string): Vertical | undefined {
  return VERTICALS.find((v) => v.id === id);
}

export function getAllVerticalIds(): string[] {
  return VERTICALS.map((v) => v.id);
}
