"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback, memo } from "react";
import { Link2, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function CouncilStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      stars.forEach(s => {
        const alpha = s.a * (0.4 + 0.6 * Math.sin(t * s.speed * 80 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,200,255,${alpha * 0.55})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

type Member = {
  name: string;
  role: string;
  dept: string;
  year?: string;
  linkedin?: string;
  email?: string;
  // Add real photo path here, e.g. "/council/rohit-sharma.jpg"
  photo?: string;
  // "contain" fits whole photo in card (no crop, letterboxed); default "cover" (crop to fill).
  fit?: "cover" | "contain";
  // Photo scale in card. <1 zooms out (even margin), >1 zooms in. Default 1.
  zoom?: number;
  // object-position for the photo. Default "top center".
  pos?: string;
};

// Ordering priority within a selected dept: leads first.
// Technical Lead ahead of Product Development Lead; then any other "Lead"; then the rest.
function leadRank(role: string): number {
  if (role === "Technical Lead") return 0;
  if (role === "Product Development Lead") return 1;
  if (role.includes("Lead")) return 2;
  return 3;
}

// Seniority order in both "All" and per-dept views: 4th, then 3rd, then 2nd.
// Anyone added without a year sorts last rather than silently joining the 2nd-years.
function yearRank(year?: string): number {
  if (year === "4th") return 0;
  if (year === "3rd") return 1;
  if (year === "2nd") return 2;
  return 3;
}

// Role text is whatever is set on the member — e.g. "Chairperson" for the
// actual dept chair(s), or their existing title for other 4th/3rd-years.
function displayRole(member: Member): string {
  return member.role;
}

type TeamSection = {
  team: string;
  color: string;
  description: string;
  members: Member[];
};


const studentLeadership: Member[] = [
  { name: "Ghanashyam Kodekandla", role: "President",                  dept: "Technical",            year: "2026-27", linkedin: "https://www.linkedin.com/in/ghanashyamkodekandla", email: "", photo: "/council/OPS/Ghanashyam Kodekandla.jpeg" },
  { name: "Mahima Tatineni",       role: "Vice President",             dept: "Operations & Finance", year: "2026-27", linkedin: "https://www.linkedin.com/in/mahima-tatineni/", email: "", photo: "/council/OPS/Mahima Tatineni.png" },
  { name: "Aarthi Reddy", role: "Secretary",                  dept: "Operations & Finance", year: "2026-27", linkedin: "https://www.linkedin.com/in/aarthi-reddy-b-626241350/", email: "", photo: "/council/OPS/Aarthi.png", pos: "center 30%", zoom: 1.2 },
  { name: "Keertan Kuppili",       role: "Chief Technical Executive",  dept: "Technical",            year: "2026-27", linkedin: "https://www.linkedin.com/in/keertan-kuppili-b652b2290/", email: "", photo: "/council/tech/Keertan Kuppili .png" },
  { name: "Jaikar Midithuri",      role: "Joint Secretary",            dept: "Technical",            year: "2026-27", linkedin: "https://www.linkedin.com/in/jaikar-midithuri-136614369/", email: "", photo: "/council/tech/Jaikar Midithuri.png" },
  { name: "Bhavana Inakollu",      role: "Internal Relations",         dept: "Operations & Finance", year: "2026-27", linkedin: "https://www.linkedin.com/in/bhavana-inakollu-8698a2395", email: "", photo: "/council/OPS/Bhavana .png" },
];


const teams: TeamSection[] = [
  {
    team: "Tech",
    color: "#4A7DFF",
    description: "Builds and maintains CIE's digital infrastructure — from the website and internal tools to AI experiments and mobile apps. The Tech team turns every idea into a working product.",
    members: [
      { name: "Ghanashyam Kodekandla", role: "President", dept: "Tech", photo: "/council/OPS/Ghanashyam Kodekandla.jpeg",linkedin:"https://www.linkedin.com/in/ghanashyamkodekandla" ,year:"4th"},
      { name: "Keertan Kuppili",       role: "Chairperson", dept: "Tech", photo: "/council/tech/Keertan Kuppili .png", linkedin: "https://www.linkedin.com/in/keertan-kuppili-b652b2290/",year:"4th"},
      { name: "Teja Jagathi",          role: "Chairperson", dept: "Tech", photo: "/council/tech/Teja Jagathi.jpg" ,linkedin: "https://www.linkedin.com/in/teja-jagathi",year:"4th"},
      { name: "T.S Siddarth",          role: "Chairperson", dept: "Tech", photo: "/council/tech/T.S Siddarth.png",linkedin: "https://www.linkedin.com/in/siddharth-t-s-a76655248/",year:"4th"},
      { name: "Abhiram Ganji",         role: "Product Development Lead", dept: "Tech", photo: "/council/tech/Abhiram Ganji.png" ,linkedin:"#",year:"3rd"},
      { name: "Anamika",               role: "Member", dept: "Tech", photo: "/council/tech/Anamika.jpeg" , linkedin: "https://www.linkedin.com/in/anamikak3131/",year:"3rd"},
      { name: "Guna Sai Marni",        role: "Member", dept: "Tech", photo: "/council/tech/Guna Sai Marni.png" ,linkedin: "#",year:"3rd"},
      { name: "Jaikar Midithuri",      role: "Joint Secretary", dept: "Tech", photo: "/council/tech/Jaikar Midithuri.png",linkedin: "https://www.linkedin.com/in/jaikar-midithuri-136614369/",year:"3rd"},
      { name: "Athava Sri Pavan",      role: "Project Manager", dept: "Tech", photo: "/council/tech/Athava Sri Pavan.jpeg",linkedin: "https://www.linkedin.com/in/a-sri-pavan-772b8b344/",year:"3rd"},
      { name: "Tribhuvan",   role: "Technical Lead", dept: "Tech", photo: "/council/tech/Katepally Tribhuvan.jpg",linkedin: "https://www.linkedin.com/in/tribhuvan-katepally-30639b335/",year:"3rd"},
      { name: "Yashwanth Abhishek",    role: "Member", dept: "Tech", photo: "/council/tech/yashwanth abhishek.jpg",linkedin: "https://www.linkedin.com/in/yashwanth-abhishek-4626a8323/",year:"3rd"},
      { name: "Abhinav Sai",           role: "Member", dept: "Tech", photo: "/council/tech/Abhinav Sai.jpeg",linkedin: "http://www.linkedin.com/in/abhiinavsaig",year:"3rd"},
      { name: "Guguloth Adithya Jadhav", role: "Inventory Lead", dept: "Tech", photo: "/council/tech/Guguloth Adithya Jadhav.jpeg",linkedin:"https://www.linkedin.com/in/adithyajadhav/" ,year:"3rd"},
      { name: "Gannoji Vedik",         role: "Member", dept: "Tech", photo: "/council/tech/Gannoji Vedik.jpeg" ,linkedin:"https://www.linkedin.com/in/vedik-gannoji/",year:"3rd"},
      { name: "Agasthya",              role: "Member", dept: "Tech", photo: "/council/tech/Agasthya.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Anshu",                 role: "Member", dept: "Tech", photo: "/council/tech/Anshu.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Faizaan",               role: "Member", dept: "Tech", photo: "/council/tech/Faizaan.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Himasri",               role: "Member", dept: "Tech", photo: "/council/tech/Himasri.jpg" ,linkedin:"#",year:"2nd"},
      { name: "K Abhiram Chandra",     role: "Member", dept: "Tech", photo: "/council/tech/K Abhiram Chandra.png" ,linkedin:"#",year:"2nd"},
      { name: "K Sai Ruthvik Reddy",   role: "Member", dept: "Tech", photo: "/council/tech/K Sai Ruthvik Reddy.jpg" ,linkedin:"#",year:"2nd", pos: "42% top"},
      { name: "Manas",                 role: "Member", dept: "Tech", photo: "/council/tech/Manas.jpg" ,linkedin:"#",year:"2nd", zoom: 0.88},
      { name: "Ramya Harini",          role: "Member", dept: "Tech", photo: "/council/tech/Ramya Harini.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Rithwik T",             role: "Member", dept: "Tech", photo: "/council/tech/Rithwik T.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Shanmukha",             role: "Member", dept: "Tech", photo: "/council/tech/Shanmukha.jpg" ,linkedin:"#",year:"2nd"},
      { name: "Sreecharan Guntru",     role: "Member", dept: "Tech", photo: "/council/tech/Sreecharan Guntru.jpeg" ,linkedin:"#",year:"2nd"},
      { name: "Nithya Nunavath", role: "Member", dept: "Tech", photo: "/council/tech/Nithya Nunavath.png", linkedin: "#", year: "2nd" },
    ],
  },
  {
    team: "Content",
    color: "#D9C500",
    description: "Produces all written and editorial output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content that tell our story across every channel.",
    members: [
      { name: "Jayadeep",        role: "Chairperson", dept: "Content", photo: "/council/content/Jayadeep.png",linkedin:"https://www.linkedin.com/in/jayadeep-tadakamalla-780077374/",year:"4th" },
      { name: "Prashansa",       role: "Chairperson", dept: "Content", photo: "/council/content/Prashansa .png",linkedin:"https://www.linkedin.com/in/prashansa-b-92218b2b6",year:"4th" },
      { name: "Haritha",         role: "Member", dept: "Content", photo: "/council/content/Haritha.png",linkedin:"#",year:"4th" },
      { name: "Harshitha",       role: "Member", dept: "Content", photo: "/council/content/Harshitha.png",linkedin:"https://www.linkedin.com/in/harshitha-bollepalli-a5b198345",year:"3rd" },
      { name: "Rithvik Ennawar", role: "Content Lead", dept: "Content", photo: "/council/content/Ennawar Rithvik .png",linkedin:"https://www.linkedin.com/in/rithvik-e-4a4936341/",year:"3rd" },
      { name: "Shiva",           role: "Member", dept: "Content", photo: "/council/content/Shiva.png",linkedin:"https://www.linkedin.com/in/jatavath-shiva-14099338a",year:"3rd" },
      { name: "K S Sreesanth",   role: "Member", dept: "Content", photo: "/council/content/K S Sreesanth.png",linkedin:"https://www.linkedin.com/in/sreesanth-ks-29ab92344",year:"3rd" },
      { name: "B Sathvika", role: "Member", dept: "Content", photo: "/council/content/B Sathvika.png", linkedin: "#", year: "2nd" },
      { name: "Bandi Kumar Swamy", role: "Member", dept: "Content", photo: "/council/content/Bandi Kumar Swamy.png", linkedin: "#", year: "2nd" },
      { name: "Supritha Reddy", role: "Member", dept: "Content", photo: "/council/content/Supritha Reddy.png", linkedin: "#", year: "2nd" },
      { name: "Sai Charan", role: "Member", dept: "Content", photo: "/council/content/Sai Charan.png", linkedin: "#", year: "2nd" },
      { name: "Tanushree", role: "Member", dept: "Content", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
    ],
  },
  {
    team: "Creative",
    color: "#B65CFF",
    description: "Drives CIE's creative direction and campaigns — ideating themes, managing brand consistency, and building the visual + conceptual identity behind every initiative.",
    members: [
         { name: "Harika Y",          role: "Chairperson", dept: "Creative", photo: "/council/creatives/Harika Y.png",linkedin:"https://www.linkedin.com/in/y-harika-34a391305",year:"4th" },
         { name: "Sai Krishna",       role: "Chairperson", dept: "Creative", photo: "/council/creatives/Sai Krishna.png",linkedin:"https://www.linkedin.com/in/varahala-sai-krishna-46a1b82a4",year:"4th" },
         { name: "Sushaanth",         role: "Chairperson", dept: "Creative", photo: "/council/creatives/sushaanth.png",linkedin:"https://www.linkedin.com/in/sushanth-mandumula-0496bb2b6",year:"4th" },
         { name: "Durga Mahesh",      role: "Member", dept: "Creative", photo: "/council/creatives/Durga Mahesh.png",linkedin:"https://www.linkedin.com/in/durgamahesh-kolukuri",year:"3rd" },
         { name: "Cheeda Shamilini",  role: "Member", dept: "Creative", photo: "/council/creatives/Cheeda Shamilini.png",linkedin:"https://www.linkedin.com/in/cheeda-shamilini-naidu-47419a345/",year:"3rd" },
         { name: "D Pearl Angelina",  role: "Inventory Lead", dept: "Creative", photo: "/council/creatives/D Pearl Angelina.png",linkedin:"https://www.linkedin.com/in/pearl-angelina-529705283",year:"3rd" },
         { name: "Sadwika Reddy Chedimala", role: "Creatives Lead", dept: "Creative", photo: "/council/creatives/Sadwika Chedimala.png",linkedin:"https://www.linkedin.com/in/sadwika-chedimala-758167387/" ,year:"3rd"},
         { name: "Hansika Jella",     role: "Member", dept: "Creative", photo: "/council/creatives/Hansika Jella.png",linkedin:"https://www.linkedin.com/in/hansika-jella-01b079380",year:"3rd" },
         { name: "Ratnavath Sandhya", role: "Member", dept: "Creative", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
         { name: "Saanvi Mancholla", role: "Member", dept: "Creative", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
         { name: "Lokesh Sharma", role: "Member", dept: "Creative", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
         { name: "Sai Susmita Nanduri", role: "Member", dept: "Creative", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
    ],
  },
  {
    team: "GD — Graphic Design",
    color: "#61D4F4",
    description: "Shapes the visual identity of CIE — designing posters, decks, social assets, UI mockups, and motion content that make every event and campaign look world-class.",
    members: [
      { name: "Vivek Vardhan",           role: "Chairperson", dept: "GD", photo: "/council/GD/Veivek vardhan.png",linkedin:"https://www.linkedin.com/in/muchinthala-vivek-vardhan-m-0086b9404/" ,year:"4th"},
      { name: "Avinash",                  role: "Chairperson", dept: "GD", photo: "/council/GD/Avinash.png",linkedin:"https://www.linkedin.com/in/avinash-avi-b49119254",year:"4th" },
      { name: "Chanikya",                 role: "Chairperson", dept: "GD", photo: "/council/GD/chanikya.png",linkedin:"https://www.linkedin.com/in/amancha-chanikya",year:"4th" },
       { name: "Sri Thejitha",             role: "Chairperson", dept: "GD", photo: "/council/GD/Sri Thejitha .png" , linkedin: "http://www.linkedin.com/in/sri-thejitha-76a712374",year:"4th" },
      { name: "Yeruva InduSri Varshitha Reddy",        role: "GD Lead", dept: "GD", photo: "/council/GD/Yeruva Indu Reddy.png",linkedin:"https://www.linkedin.com/in/yeruva-indu-972476345/",year:"3rd"
       },
      { name: "A Farhana Sultana",        role: "Member", dept: "GD", photo: "/council/GD/A Farhana Sultana.png",linkedin:"https://www.linkedin.com/in/achugatla-farhana-sultana-361b94344/",year:"3rd" },
      { name: "Mounith Varma Akkala",     role: "Project Manager", dept: "GD", photo: "/council/GD/Mounith Varma Akkala .png",linkedin:"https://www.linkedin.com/in/mounith-varma-akkala-in/",year:"3rd" },
      { name: "Bangari Nikitha",          role: "Member", dept: "GD", photo: "/council/GD/Bangari Nikitha.png",linkedin:"https://www.linkedin.com/in/bangari-nikitha-2b61aa345",year:"3rd" },
      { name: "Poloju RajaVivek",         role: "Member", dept: "GD", photo: "/council/GD/Poloju RajaVivek.png",linkedin:"https://www.linkedin.com/in/rajavivek-poloju-5a0ba3344/",year:"3rd" },
      { name: "Tannidi Durga Karthikeya", role: "Member", dept: "GD", photo: "/council/GD/Tannidi Durga Karthikeya .png",linkedin:"http://www.linkedin.com/in/karthik-undefined-1a972a314",year:"3rd" },
      { name: "Kodali Pranav Chandra",    role: "Member", dept: "GD", photo: "/council/GD/Kodali Pranav Chandra.png",linkedin:"https://www.linkedin.com/in/pranav-chandra-kodali-3566b033b/",year:"3rd" },
      { name: "Veera Sai Akhil", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
      { name: "N Chaitanya", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
      { name: "Sivaneni Venkata Veera Sri Gangadhar", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
      { name: "Kamal Panda", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
      { name: "Vatrapu Jyoshnika Reddy", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
      { name: "Sri Tejaswi Abbu", role: "Member", dept: "GD", photo: "/council/placeholder.png", linkedin: "#", year: "2nd" },
     
    ],
  },
  {
    team: "Photography and Media",
    color: "#FF7A1A",
    description: "Captures every moment of the CIE journey — from hackathon late nights to summit keynotes — through photography, videography, and professional post-production.",
    members: [
      { name: "Priyanshu Roy",     role: "Chairperson", dept: "Photography and Media", photo: "/council/photography/Priyanshu Roy.png", zoom: 1.25,linkedin:"https://www.linkedin.com/in/priyanshu-roy-154a39246" ,year:"4th"},
      { name: "Anguluri Shiva",    role: "Chairperson", dept: "Photography and Media", photo: "/council/photography/Anguluri Shiva.png",linkedin:"#" ,year:"4th"},
      { name: "Mattam Shivani",    role: "Chairperson", dept: "Photography and Media", photo: "/council/photography/Mattam Shivani.png",linkedin:"https://www.linkedin.com/in/shivani-mattam-91602b2a5/",year:"4th"},
      { name: "Vavilala Sai Ganesh", role: "Chairperson", dept: "Photography and Media", photo: "/council/photography/Vavilala Sai Ganesh.png",linkedin:"https://www.linkedin.com/in/vavilala-sai-ganesh-25028b3b5/",year:"4th" },
      { name: "Sai Varshith K", role: "Studios Lead", dept: "Photography and Media", photo: "/council/photography/K.SAI VARSHITH.png",linkedin:"https://www.linkedin.com/in/k-sai-varshith-123462345/",year:"3rd" },
      { name: "Mahesh Gorli",        role: "Photography Lead", dept: "Photography and Media", photo: "/council/photography/Gorli Mahesh.png",linkedin:"https://www.linkedin.com/in/mahesh-gorli-314b89344" ,year:"3rd" },
      { name: "Anam Mounika",      role: "Member", dept: "Photography and Media", photo: "/council/photography/Anam Mounika .png",linkedin:"https://www.linkedin.com/in/mounika-r-20a621316/" ,year:"3rd"},
      { name: "Gothuri Rishith",   role: "Member", dept: "Photography and Media", photo: "/council/photography/Gothuri Rishith.png",linkedin:"https://in.linkedin.com/in/gothuri-rishith-kumar-51390a3bb" ,year:"3rd"},
      { name: "Sai Vashist",       role: "Member", dept: "Photography and Media", photo: "/council/photography/Sai Vashist.png",linkedin:"https://www.linkedin.com/in/vashist23021409" ,year:"3rd"},
      { name: "Konthum Bhruhathi", role: "Member", dept: "Photography and Media", photo: "/council/photography/Konthum Bhruhathi.png",linkedin:"https://www.linkedin.com/in/bhruhathi-konthum-a50755387" ,year:"3rd"},
      { name: "Yashwanth Sai Pathi", role: "Member", dept: "Photography and Media", photo: "/council/photography/Yashwanth Sai Pathi.png", linkedin: "#", year: "2nd" },
      { name: "Chakrala Sahasra", role: "Member", dept: "Photography and Media", photo: "/council/photography/Chakrala Sahasra.png", linkedin: "#", year: "2nd" },
      { name: "Angala Mahesh", role: "Member", dept: "Photography and Media", photo: "/council/photography/Angala Mahesh.png", linkedin: "#", year: "2nd" },
      { name: "Vadla Vardhan", role: "Member", dept: "Photography and Media", photo: "/council/photography/Vadla Vardhan.png", linkedin: "#", year: "2nd" },
      { name: "Nacharam Praneeth", role: "Member", dept: "Photography and Media", photo: "/council/photography/Nacharam Praneeth.png", linkedin: "#", year: "2nd" },
    ],
  },
  {
    team: "P&S — Public Speaking",
    color: "#E53935",
    description: "Represents CIE in every room — anchoring events, running communication workshops, handling PR, and making sure CIE's message lands clearly with every audience.",
    members: [
      { name: "Yashashri Penikalapti", role: "Sponsorship Chairperson", dept: "P&S", photo: "/council/p&s/Yashashri Penikalapti.png",linkedin:"https://www.linkedin.com/in/yashashripenikalapati",year:"4th" },
      { name: "Bandaru Mahith Naidu",  role: "Promotions Chairperson", dept: "P&S", photo: "/council/p&s/Bandaru Mahith Naidu.png",linkedin:"https://www.linkedin.com/in/bandarumahithnaidu/",year:"4th" },
      { name: "Sai Mihir Ramaraju",    role: "Chairperson", dept: "P&S", photo: "/council/p&s/Sai Mihir Ramaraju.png",linkedin:"#",year:"4th" },
      { name: "Venkata Sanjana Kovuru", role: "Sponsorship Lead", dept: "P&S", photo: "/council/p&s/Sanjana Kovuru.png",linkedin:"https://www.linkedin.com/in/sanjana-kovuru-18b55b31a/",year:"3rd" },
      { name: "Adithya Ganesh",        role: "Studios Lead", dept: "P&S", photo: "/council/p&s/Adithya Ganesh.png",linkedin:"https://www.linkedin.com/in/adithya-ganesh-487860398/",year:"3rd" },
      { name: "Rithish Kumar",         role: "Promotions Lead", dept: "P&S", photo: "/council/placeholder.png",linkedin:"https://www.linkedin.com/in/rithish-kumar-418242363/",year:"3rd" },
      { name: "Gogula Vinay Reddy", role: "Member", dept: "P&S", photo: "/council/p&s/Gogula Vinay Reddy.png", linkedin: "#", year: "2nd" },
      { name: "Peddahothur Saniya", role: "Member", dept: "P&S", photo: "/council/p&s/Peddahothur Saniya.png", linkedin: "#", year: "2nd" },
      { name: "Talluri Laxmi Prasanna", role: "Member", dept: "P&S", photo: "/council/p&s/Talluri Laxmi Prasanna.png", linkedin: "#", year: "2nd" },
      { name: "Kojagori Biswas", role: "Member", dept: "P&S", photo: "/council/p&s/Kojagori Biswas.png", linkedin: "#", year: "2nd" },
      { name: "Karlapudi Goutham Kumar", role: "Member", dept: "P&S", photo: "/council/p&s/Karlapudi Goutham Kumar.png", linkedin: "#", year: "2nd" },
    ],
  },
  {
    team: "Operations & Finance",
    color: "#22C55E",
    description: "Keeps everything running — coordinating logistics for every event, managing budgets, vendor relations, and making sure no detail falls through the cracks.",
    members: [
      { name: "Mahima Tatineni",   role: "Chairperson", dept: "Operations & Finance", photo: "/council/OPS/Mahima Tatineni.png",linkedin:"https://www.linkedin.com/in/mahima-tatineni/" ,year:"4th"},
      { name: "Aarthi Reddy", role: "Chairperson", dept: "Operations & Finance", photo: "/council/OPS/Aarthi.png",linkedin:"https://www.linkedin.com/in/aarthi-reddy-b-626241350/" ,year:"4th", pos: "center 30%", zoom: 1.2},
      { name: "Vinay",             role: "Chairperson", dept: "Operations & Finance", photo: "/council/OPS/Vinay.png",linkedin:"https://www.linkedin.com/in/dsdvinay" ,year:"4th"},
       { name: "Dheeraj Kumar",     role: "Chairperson", dept: "Operations & Finance", photo: "/council/OPS/Dheeraj Kumar.png",linkedin:"#" ,year:"4th"},
      { name: "Bhavana",           role: "Internal Relations", dept: "Operations & Finance", photo: "/council/OPS/Bhavana .png",linkedin:"https://www.linkedin.com/in/bhavana-inakollu-8698a2395" ,year:"3rd"},
      { name: "Alleshwaram Sai Ganesh", role: "Operations Lead", dept: "Operations & Finance", photo: "/council/OPS/ASaiGanesh.png",linkedin:"https://www.linkedin.com/in/sai-ganesh-alleshwaram-a30832316" ,year:"3rd"},
      { name: "M.Tarun Kumar Reddy",    role: "Finance and Logistics", dept: "Operations & Finance", photo: "/council/OPS/Manukonda Tarun.png",linkedin:"https://www.linkedin.com/in/tarun-manukonda-9a5b97344" ,year:"3rd"},
      { name: "Tharun",            role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Tharun.png",linkedin:"https://www.linkedin.com/in/tharun-emmadisetti-590ba3344" ,year:"3rd"},
      { name: "M Vasanth Vardhan", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/M Vasanth vardhan.png",linkedin:"https://www.linkedin.com/in/vasanth-vardhan-maricherla-21783231a/" ,year:"3rd"},
      { name: "Anurag Yadav Yenugonda", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Anurag Yadav Yenugonda.png", linkedin: "#", year: "2nd" },
      { name: "Chetty Shreyas Goud", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Chetty Shreyas Goud.png", linkedin: "#", year: "2nd" },
      { name: "Moulya Paladugu", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Moulya Paladugu.png", linkedin: "#", year: "2nd" },
      { name: "Bapatla Prajith", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Bapatla Prajith.png", linkedin: "#", year: "2nd" },
      { name: "Manasvi Nannepamula", role: "Member", dept: "Operations & Finance", photo: "/council/OPS/Manasvi Nannepamula.png", linkedin: "#", year: "2nd" },
    ],
  },
];

const deptShort: Record<string, string> = {
  "Tech": "Technical & Product Development",
  "Content": "Content Writing",
  "Creative": "Creatives",
  "GD — Graphic Design": "Graphic Design",
  "Photography and Media": "Photography and Media",
  "P&S — Public Speaking": "Promotions & Sponsorship",
  "Operations & Finance": "Operations & Finance",
};

// ── Council Showcase — notched triangle cards ─────────────────────
const CS_NOTCH = "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)";
type ShowcaseMember = Member & { department: string; deptColor: string };

type CSCardProps = { m: ShowcaseMember; i: number; isActive: boolean;
  onToggle: (i: number) => void; onFlipDone: () => void };

// memo: without it one click re-renders every card in the grid (100+ flip
// subtrees) instead of only the two whose isActive changed.
const CSCard = memo(function CSCard({ m, i, isActive, onToggle, onFlipDone }: CSCardProps) {
          const encoded = m.photo
            ? m.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")
            : null;
          const flat = encoded
            ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=0a0a0a&color=9aa&size=400&bold=true&format=png`;
          const scatter = i % 2 === 0 ? -26 : 26;
          // Some depts get a comic-burst flip background with white text.
          const flipBgByDept: Record<string, string> = {
            "Tech": "/council/bg/tech-flip.jpg",
            "Content": "/council/bg/content-flip.webp",
            "Operations & Finance": "/council/bg/ops-flip.jpg",
            "Creative": "/council/bg/creative-flip.webp",
            "GD — Graphic Design": "/council/bg/gd-flip.jpg",
            "P&S — Public Speaking": "/council/bg/ps-flip.jpg",
            "Photography and Media": "/council/bg/photography-flip.webp",
          };
          const flipBg = flipBgByDept[m.department];
          const isContent = Boolean(flipBg);
          const backText = isContent ? "#ffffff" : m.deptColor;
          return (
            <div
              role="button"
              tabIndex={0}
              onClick={() => onToggle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(i); }
              }}
              aria-pressed={isActive}
              className="cs-card"
              style={{
                background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
                transform: `translateY(${isActive ? 0 : scatter}px)`,
                transition: "transform .55s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div style={{
                position: "relative", aspectRatio: "4 / 5", perspective: "1600px",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }}>
                <motion.div
                  initial={false}
                  animate={{ rotateY: isActive ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26, mass: 0.95 }}
                  style={{
                    position: "absolute", inset: 0, transformStyle: "preserve-3d",
                    transformOrigin: "center center",
                    transformPerspective: 1600,
                  }}
                  onAnimationComplete={onFlipDone}
                >
                  {/* FRONT — photo */}
                  <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "translateZ(0.1px)" }}>
                    <div style={{ position: "absolute", inset: 0, clipPath: CS_NOTCH, background: "rgba(255,255,255,0.16)" }} />
                    <div style={{ position: "absolute", inset: "1.5px", clipPath: CS_NOTCH, overflow: "hidden", background: "#05070F" }}>
                      <Image
                        src={flat}
                        alt={m.name}
                        fill
                        draggable={false}
                        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                        style={{ objectFit: m.fit ?? "cover", objectPosition: m.pos ?? "top center", transform: m.zoom ? `scale(${m.zoom})` : undefined, transformOrigin: m.zoom && m.zoom > 1 ? "top center" : "center" }}
                      />
<div className="cs-tap-hint">Tap for details</div>
                    </div>
                  </div>
                  {/* BACK — details */}
                  <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg) translateZ(0.1px)" }}>
                    <div style={{ position: "absolute", inset: 0, clipPath: CS_NOTCH, background: m.deptColor }} />
                    <div style={{
                      position: "absolute", inset: "1.5px", clipPath: CS_NOTCH, overflow: "hidden",
                      background: flipBg
                        ? `#111 url('${flipBg}') center/cover no-repeat`
                        : "#05070F",
                      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(14px,6%,20px)",
                    }}>
                      {/* subtle dept color top glow — none on comic-bg cards (show only the pic) */}
                      {!flipBg && (
                        <div style={{
                          position: "absolute", inset: 0, zIndex: 0,
                          background: `linear-gradient(180deg, ${m.deptColor}22 0%, transparent 40%)`,
                        }} />
                      )}
                      {/* large ghost CIE watermark — hidden on comic-bg cards (show only the pic) */}
                      {!flipBg && (
                        <span aria-hidden="true" style={{
                          position: "absolute", top: "50%", left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontFamily: "var(--font-heading)", fontWeight: 900,
                          fontSize: "clamp(60px,18vw,110px)", letterSpacing: "-0.06em",
                          color: "rgba(255,255,255,0.07)", whiteSpace: "nowrap",
                          userSelect: "none", pointerEvents: "none", zIndex: 0,
                          lineHeight: 1,
                        }}>CIE<span style={{ color: "rgba(232,82,26,0.18)" }}>.</span></span>
                      )}
                      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%" }}>
                        <span style={{
                          fontFamily: "var(--font-sora)", fontWeight: 800,
                          fontSize: "clamp(13px,2.6vw,32px)", lineHeight: 1.0,
                          textTransform: "uppercase", letterSpacing: "0.01em",
                          color: "#ffffff", overflowWrap: "anywhere",
                          background: isContent ? "rgba(0,0,0,0.42)" : `${m.deptColor}33`,
                          boxShadow: isContent
                            ? "0 0 0 1px rgba(255,255,255,0.35), 0 6px 22px rgba(0,0,0,0.45)"
                            : `0 0 0 1px ${m.deptColor}55, 0 6px 22px ${m.deptColor}55`,
                          padding: "6px 14px", borderRadius: "8px",
                          textShadow: isContent ? "0 1px 6px rgba(0,0,0,0.6)" : undefined,
                        }}>{m.name}</span>
                        <span style={{ width: "34px", height: "2px", borderRadius: "2px", background: backText }} />
                        <span style={{ fontFamily: "var(--font-sora)", fontWeight: 600, fontSize: "clamp(11px,2vw,22px)", lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.06em", color: backText, textShadow: isContent ? "0 1px 6px rgba(0,0,0,0.6)" : undefined }}>{deptShort[m.department] ?? m.department}</span>
                        <span style={{ fontFamily: "var(--font-sora)", fontWeight: 500, fontSize: "clamp(10px,1.4vw,18px)", lineHeight: 1.2, color: isContent ? "#ffffff" : "rgba(255,255,255,0.80)", letterSpacing: "0.01em", textShadow: isContent ? "0 1px 6px rgba(0,0,0,0.6)" : undefined }}>{displayRole(m)}{m.year ? ` · ${m.year}` : ""}</span>
                      </div>
                      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "7px", width: "100%", alignItems: "center" }}>
                        {m.linkedin && m.linkedin !== "#" && (
                          <a href={m.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="cs-link" style={{ background: m.deptColor }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {m.email ? (
                          <a href={`mailto:${m.email}`} onClick={(e) => e.stopPropagation()} className="cs-link" style={{ background: "rgba(255,255,255,0.14)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>
                            <span>Email</span>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", paddingTop: "12px", paddingInline: "4px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "13px", lineHeight: 1.2, color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.82)", transition: "color .3s ease", overflowWrap: "anywhere" }}>{m.name}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3px", color: isActive ? m.deptColor : "rgba(255,255,255,0.45)", transition: "color .3s ease" }}>{deptShort[m.department] ?? m.department}</span>
              </div>
            </div>
          );
});

function CouncilShowcase({ members }: { members: ShowcaseMember[] }) {
  const [active, setActive] = useState<number | null>(null);
  // ref, not state: the flip guard must not re-render the grid.
  const flipping = useRef(false);

  const toggleCard = useCallback((index: number) => {
    if (flipping.current) return;
    flipping.current = true;
    setActive((current) => (current === index ? null : index));
  }, []);
  const flipDone = useCallback(() => { flipping.current = false; }, []);

  return (
    <>
      <div className="cs-grid">
        {members.map((m, i) => (
          <CSCard
            key={`${m.department}-${m.name}-${i}`}
            m={m} i={i} isActive={active === i}
            onToggle={toggleCard} onFlipDone={flipDone}
          />
        ))}
      </div>
      <style>{`
        .cs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(16px,2.5vw,32px) clamp(14px,2vw,28px); padding-top: 30px; padding-bottom: 30px; align-items: start; width: 100%; }
        @media (max-width: 639px)  { .cs-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } .cs-card { transform: none !important; } }
        @media (max-width: 380px)  { .cs-grid { grid-template-columns: 1fr; } }
        @media (min-width: 640px)  { .cs-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .cs-grid { grid-template-columns: repeat(4, 1fr); } }
        .cs-tap-hint { position: absolute; left: 0; right: 0; bottom: 0; text-align: center; padding: 14px 0 10px; font-family: var(--font-body); font-size: 11px; font-weight: 700; letter-spacing: 0.04em; color: #fff; background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%); opacity: 0; transition: opacity 0.25s ease; pointer-events: none; }
        .cs-card:hover .cs-tap-hint { opacity: 1; }
        @media (hover: none) {
          .cs-tap-hint { opacity: 1; }
        }
        .cs-link { display: inline-flex; align-items: center; justify-content: center; gap: 7px; color: #fff; font-family: var(--font-body); font-size: 12px; font-weight: 700; padding: 10px 14px; min-height: 40px; border-radius: 8px; text-decoration: none; transition: filter 0.2s ease, transform 0.2s ease; }
        .cs-link:hover { filter: brightness(1.15); transform: translateX(2px); }
      `}</style>
    </>
  );
}

export default function CouncilPage() {
  const [activeTeam, setActiveTeam] = useState("All");

  // Remember the open tab across reloads. sessionStorage, so a fresh visit
  // still starts on "All" but F5 keeps you where you were.
  useEffect(() => {
    const saved = sessionStorage.getItem("cie-council-team");
    if (saved && (saved === "All" || teams.some((t) => t.team === saved))) setActiveTeam(saved);
  }, []);
  useEffect(() => { sessionStorage.setItem("cie-council-team", activeTeam); }, [activeTeam]);
  const allMembers = teams.flatMap((t) =>
    t.members.map((m) => ({ ...m, department: t.team, deptColor: t.color }))
  );

  // FIXED "All" order — the exact sequence from the live site, hardcoded by
  // NAME so it's stable across devices AND survives roster changes (no random
  // shuffle, no localStorage, no fragile indices). Any member not listed here
  // (newly added) is appended in declaration order.
  const ALL_ORDER_NAMES = [
    "Sai Varshith K", "Jaikar Midithuri", "Avinash", "Kodali Pranav Chandra",
    "Mahima Tatineni", "Bandaru Mahith Naidu", "Alleshwaram Sai Ganesh",
    "Tannidi Durga Karthikeya", "Durga Mahesh", "Cheeda Shamilini",
    "Anamika", "Sai Krishna", "Bhavana", "Yeruva InduSri Varshitha Reddy",
    "Shiva", "Prashansa", "Aarthi Reddy", "Sri Thejitha", "M.Tarun Kumar Reddy",
    "Teja Jagathi", "Yashashri Penikalapti", "Sai Mihir Ramaraju", "Tribhuvan", "Konthum Bhruhathi",
    "Athava Sri Pavan", "Hansika Jella", "Ghanashyam Kodekandla", "Adithya Ganesh",
    "Sai Vashist", "Tharun", "Vivek Vardhan", "Dheeraj Kumar", "Rithish Kumar", "Anguluri Shiva",
    "Anam Mounika", "A Farhana Sultana", "Guna Sai Marni", "Rithvik Ennawar",
    "Sadwika Reddy Chedimala", "Mahesh Gorli", "Bangari Nikitha", "Chanikya",
    "Jayadeep", "Haritha", "Poloju RajaVivek", "Priyanshu Roy", "D Pearl Angelina", "Harika Y",
    "M Vasanth Vardhan", "Keertan Kuppili", "K S Sreesanth", "Gannoji Vedik",
    "Guguloth Adithya Jadhav", "Abhiram Ganji", "Yashwanth Abhishek", "Vavilala Sai Ganesh",
    "Mattam Shivani", "Vinay", "Mounith Varma Akkala", "Sushaanth", "Abhinav Sai",
    "Gothuri Rishith", "Venkata Sanjana Kovuru", "Harshitha", "T.S Siddarth",
  ];
  const orderRank = new Map(ALL_ORDER_NAMES.map((n, i) => [n, i]));
  const allShuffled = [...allMembers].sort(
    (a, b) => (orderRank.get(a.name) ?? Infinity) - (orderRank.get(b.name) ?? Infinity)
  );
  // Mahima first, then a fixed cluster kept contiguous. (Row-boundary
  // alignment is gone: the year sort re-indexes everything afterwards.)
  const pinAll = <T extends { name: string }>(list: T[]): T[] => {
    let arr = [...list];
    // Mahima always first.
    const mah = arr.find((m) => m.name === "Mahima Tatineni");
    if (mah) {
      arr = arr.filter((m) => m !== mah);
      arr.unshift(mah);
    }
    // Jadhav sits right beside Bhavana.
    const bhav = arr.find((m) => m.name === "Bhavana");
    const jadhav = arr.find((m) => m.name === "Guguloth Adithya Jadhav");
    if (bhav && jadhav) {
      arr = arr.filter((m) => m !== jadhav);
      arr.splice(arr.indexOf(bhav) + 1, 0, jadhav);
    }
    // Aarthi is a 4th-year and now sorts into the top block on her own; the
    // rest are 3rd-years, so the cluster only holds together within one year.
    const clusterOrder = ["Tribhuvan", "Athava Sri Pavan", "Hansika Jella"];
    const cluster = clusterOrder
      .map((n) => arr.find((m) => m.name === n))
      .filter((m): m is T => Boolean(m));
    if (cluster.length) {
      const at = arr.findIndex((m) => m.name === clusterOrder[0]);
      arr = arr.filter((m) => !cluster.includes(m));
      arr.splice(at < 0 ? arr.length : Math.min(at, arr.length), 0, ...cluster);
    }
    return arr;
  };
  const visibleMembers = activeTeam === "All"
    // "All" view: 4th-years first, then 3rd, then 2nd. Within a year the
    // ALL_ORDER sequence (and the pins above) is preserved — Array.sort is stable.
    ? [...pinAll(allShuffled)].sort((a, b) => yearRank(a.year) - yearRank(b.year))
    : allMembers
        .filter((m) => m.department === activeTeam)
        // 4th-years (chairpersons) first; within same year, dept lead(s) first; stable for the rest
        .sort((a, b) => yearRank(a.year) - yearRank(b.year) || leadRank(a.role) - leadRank(b.role));

  // Horizontal-scroll affordance for the department filter row
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabEdges, setTabEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    const update = () => setTabEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  const scrollTabs = (dir: number) => tabsRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Our Team"
        line1="MEET"
        line2="THE"
        line3="COUNCIL"
        scriptText="— the people behind the mission"
        description="CIE is run by students who take responsibility for different parts of the organisation — technical work, projects, events, design, content, photography, promotions, sponsorship, operations, and finance. The Council works together to plan activities, guide teams, solve problems, and help ideas move from discussion to execution."
        stats={[
          { value: "2026–27", label: "Current Batch" },
        ]}
        watermark="TEAM"
      />

      {/* ── Shared container constant ── max-width 1400px, 32px inline padding */}

      {/* Student Leadership */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>
          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Leadership</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>Student Leadership 2026–27</h2>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.75, marginTop: "16px", maxWidth: "980px" }}>
              Leadership at CIE is not about having your name at the top of a page. It is about showing up when work needs to be done — taking responsibility when something goes wrong, helping your team when they are stuck, making decisions when necessary, and making sure the people working with you also get opportunities to grow.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 items-stretch" style={{ marginTop: "40px" }}>
            {studentLeadership.map((member, i) => (
              <FadeIn key={`${member.role}-${i}`} className="flex flex-col">
                <div className="rounded-2xl card-light relative overflow-hidden flex flex-col items-center"
                  style={{ flex: 1, borderColor: "rgba(255,94,44,0.20)", padding: "clamp(20px,4vw,44px) clamp(16px,3vw,36px)", textAlign: "center" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  {member.photo ? (
                    <div className="rounded-full mb-6 overflow-hidden shrink-0"
                      style={{ position: "relative", width: "clamp(96px,14vw,160px)", height: "clamp(96px,14vw,160px)", border: "3px solid rgba(255,94,44,0.25)" }}>
                      <Image
                        src={member.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")}
                        fill
                        draggable={false}
                        alt={member.name}
                        sizes="160px"
                        style={{ objectFit: "cover", objectPosition: member.pos ?? "top center" }}
                      />
                    </div>
                  ) : (
                    <div className="rounded-full flex items-center justify-center text-4xl font-black mb-6 shrink-0"
                      style={{ width: "clamp(96px,14vw,160px)", height: "clamp(96px,14vw,160px)", background: "rgba(255,94,44,0.10)", color: "#FF5E2C", border: "3px solid rgba(255,94,44,0.20)" }}>
                      {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                    </div>
                  )}
                  <h3 style={{ color: "#000000", fontSize: "clamp(16px,2vw,20px)", fontWeight: 800, marginBottom: "8px", lineHeight: 1.2 }}>{member.name}</h3>
                  <p style={{ color: "#FF5E2C", fontSize: "15px", fontWeight: 700, marginBottom: "8px" }}>{member.role}</p>
                  <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.6, marginBottom: "4px" }}>{member.dept}</p>
                  <p style={{ color: "#9CA3AF", fontSize: "12px", marginBottom: "24px" }}>Batch {member.year}</p>
                  <div className="flex gap-2 justify-center mt-auto">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
                        <Link2 size={12} /> LinkedIn
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
                        <Mail size={12} /> Email
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Teams — ChromaGrid */}
      <section style={{ background: "#000000", position: "relative", overflow: "hidden", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(40px,6vw,72px)" }}>

        {/* Noise texture */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045, pointerEvents: "none", zIndex: 0 }} aria-hidden="true">
          <filter id="council-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#council-noise)" />
        </svg>

        {/* Stars canvas */}
        <CouncilStars />

        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <FadeIn>
            <span className="section-tag" style={{ background: "rgba(255,94,44,0.12)", borderColor: "rgba(255,94,44,0.25)", color: "#FF5E2C", fontSize: "14px", letterSpacing: "1.5px" }}>
              Departments
            </span>
          </FadeIn>

          {/* Heading — 24px below badge */}
          <FadeIn delay={0.05}>
            <h2 className="font-black" style={{ color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>
              Department Members
            </h2>
            <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "16px", lineHeight: 1.75, marginTop: "16px", maxWidth: "980px" }}>
              CIE works because different teams handle different responsibilities — from Technical and Graphic Design to Photography, Content, Creatives, Promotions &amp; Sponsorship, and Operations &amp; Finance. Each department has a different role, but when an event, project, or initiative comes together, it&apos;s usually because several of these teams worked together.
            </p>
          </FadeIn>

          {/* Filter + ChromaGrid — no extra inner wrapper, inherit 1400px container */}
          <div>

            {/* Filter bar — 40px below heading, horizontally scrollable */}
            <FadeIn delay={0.1}>
              <div style={{ position: "relative", marginTop: "clamp(24px,3vw,40px)", width: "100%" }}>
              <div ref={tabsRef} className="council-tabs flex items-center gap-2" style={{ width: "100%", overflowX: "auto", scrollBehavior: "smooth", paddingBottom: "2px" }}>
                {[
                  { label: "All", key: "All" },
                  ...teams.map((t) => ({ label: deptShort[t.team] ?? t.team, key: t.team, color: t.color })),
                ].map((tab) => {
                  const isActive = activeTeam === tab.key;
                  const chipColor = (tab as { color?: string }).color ?? "#FF5E2C";
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTeam(tab.key)}
                      style={{
                        flex: "0 0 auto",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "clamp(44px,5vw,44px)",
                        padding: "0 clamp(12px,2vw,22px)",
                        borderRadius: "9999px",
                        fontSize: "clamp(12px,1.5vw,15px)",
                        fontWeight: 500,
                        letterSpacing: "0.15px",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        border: isActive ? `1px solid ${chipColor}` : "1px solid rgba(255,255,255,0.12)",
                        background: isActive ? chipColor : "rgba(255,255,255,0.04)",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                        boxShadow: isActive ? `0 2px 16px ${chipColor}55` : "none",
                        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                        outline: "none",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (!isActive) {
                          btn.style.background = "rgba(255,255,255,0.09)";
                          btn.style.color = "#FFFFFF";
                          btn.style.borderColor = "rgba(255,255,255,0.22)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (!isActive) {
                          btn.style.background = "rgba(255,255,255,0.04)";
                          btn.style.color = "rgba(255,255,255,0.5)";
                          btn.style.borderColor = "rgba(255,255,255,0.12)";
                        }
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {tabEdges.left && (
                <>
                  <div aria-hidden style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "52px", pointerEvents: "none", background: "linear-gradient(90deg, #000 25%, transparent)" }} />
                  <button onClick={() => scrollTabs(-1)} aria-label="Scroll departments left" className="council-tab-arrow" style={{ left: "4px" }}>‹</button>
                </>
              )}
              {tabEdges.right && (
                <>
                  <div aria-hidden style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52px", pointerEvents: "none", background: "linear-gradient(270deg, #000 25%, transparent)" }} />
                  <button onClick={() => scrollTabs(1)} aria-label="Scroll departments right" className="council-tab-arrow" style={{ right: "4px" }}>›</button>
                </>
              )}

              <style>{`
                .council-tabs { scrollbar-width: none; -ms-overflow-style: none; }
                .council-tabs::-webkit-scrollbar { display: none; }
                .council-tab-arrow {
                  position: absolute; top: 50%; transform: translateY(-50%);
                  width: 32px; height: 32px; border-radius: 9999px;
                  display: inline-flex; align-items: center; justify-content: center;
                  background: rgba(255,255,255,0.12); color: #fff;
                  border: 1px solid rgba(255,255,255,0.22); cursor: pointer;
                  font-size: 20px; line-height: 1; padding-bottom: 2px;
                  -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px);
                  transition: background 0.2s ease; z-index: 2;
                }
                .council-tab-arrow:hover { background: rgba(255,255,255,0.22); }
              `}</style>
              </div>
            </FadeIn>

            {/* Council cards — triangle notch shape + chroma mouse-proximity effect on desktop */}
            <motion.div
              key={activeTeam}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "40px" }}
            >
              <CouncilShowcase members={visibleMembers} />
            </motion.div>


          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>
        <FadeIn className="text-center">
          <span className="section-tag" style={{ marginBottom: "32px" }}>Join the Team</span>
          <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(22px,4vw,36px)", lineHeight: 1.15, marginBottom: "32px" }}>Want to Be Part of CIE Council?</h2>
          <p className="text-lg" style={{ color: "#374151", marginBottom: "40px" }}>
            Recruitment for the 2025–26 council opens in July. Apply to join any
            of our teams and help shape the future of innovation at MLRIT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary">Apply for Council</Link>
            <button className="btn-secondary-light">Learn More</button>
          </div>
        </FadeIn>
        </div>
      </section>
    </div>
  );
}
