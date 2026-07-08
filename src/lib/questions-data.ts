import type { DeptKey } from "@/lib/departments";
import type { Question } from "@/types/apply";

// Canonical source of recruitment questions — no external Sheet/DB, just this file.
// To change questions: edit here and redeploy.
export const QUESTIONS_DATA: Record<DeptKey, Question[]> = {
  tech: [
    { id: "tech_q2", label: "Why do you want to join the CIE Technical Department?", type: "textarea", options: [], required: true, order: 1 },
    { id: "tech_domain", label: "Which domain(s) are you most interested in?", type: "checkbox", options: ["Web Development", "App Development", "Data Handling/Data Science", "AI/ML", "IoT", "Automation", "Cybersecurity", "Other"], required: true, order: 2 },
    { id: "tech_q3", label: "What programming languages, technologies, tools, or frameworks have you worked with?", type: "textarea", options: [], required: true, order: 3 },
    { id: "tech_q4", label: "Describe one technical project or learning experience you are most proud of. What did you build and what was your contribution?", type: "textarea", options: [], required: true, order: 4 },
    { id: "tech_q5", label: "What will be the output of the following Python program? If there is an error, identify it and explain why.", type: "textarea", options: [], required: true, order: 5, code: "def func(nums):\n    nums.append(4)\n\nnumbers = [1, 2, 3]\nfunc(numbers)\nprint(numbers)" },
    { id: "tech_q6", label: "What is one technology or technical skill you are currently learning, and why did you choose it?", type: "textarea", options: [], required: true, order: 6 },
    { id: "tech_q7", label: "Have you participated in any hackathons, coding competitions, workshops, or technical events? If yes, briefly describe your experience.", type: "textarea", options: [], required: true, order: 7 },
    { id: "tech_q8", label: "What is the most challenging bug or technical problem you have faced, and how did you solve it?", type: "textarea", options: [], required: true, order: 8 },
    { id: "tech_q9", label: "Why do you think you would be a good fit for the CIE Technical Department?", type: "textarea", options: [], required: true, order: 9 },
    { id: "tech_q10", label: "GitHub Profile URL", type: "text", options: [], required: true, order: 10 },
    { id: "tech_q11", label: "LinkedIn Profile URL", type: "text", options: [], required: true, order: 11 },
  ],

  content: [
    { id: "content_q1", label: "Why do you want to join the Content Writing Department?", type: "textarea", options: [], required: true, order: 1 },
    { id: "content_q2", label: "Do you have any prior experience in content writing? If yes, briefly mention your experience (write \"No\" if not applicable).", type: "textarea", options: [], required: true, order: 2 },
    { id: "content_q3", label: "Which type of content are you most interested in writing?", type: "checkbox", options: ["Social Media Captions", "Event Reports", "Articles & Blogs", "Official Emails & Letters", "Website Content", "Newsletters", "Creative Writing", "Other"], required: true, order: 3 },
    { id: "content_q4", label: "Please share links to any of your previous work (Google Drive, Medium, LinkedIn, Blog, Portfolio, etc.), write \"No\" if none available.", type: "text", options: [], required: true, order: 4 },
    { id: "content_q5", label: "Which writing tools are you familiar with?", type: "checkbox", options: ["Google Docs", "Microsoft Word", "Grammarly", "Notion", "ChatGPT/AI Writing Tools", "Other"], required: true, order: 5 },
    { id: "content_q6", label: "How would you rate your current writing skills?", type: "select", options: ["Beginner", "Intermediate", "Advanced"], required: true, order: 6 },
    { id: "content_q7", label: "How do you usually approach a new writing task?", type: "textarea", options: [], required: true, order: 7 },
    { id: "content_q8", label: "If you're assigned a topic you're unfamiliar with, how would you approach it?", type: "textarea", options: [], required: true, order: 8 },
    { id: "content_q9", label: "What do you think makes a piece of content engaging and effective?", type: "textarea", options: [], required: true, order: 9 },
    { id: "content_q10", label: "Why do you think you would be a good fit for the Content Writing Department?", type: "textarea", options: [], required: true, order: 10 },
  ],

  gd: [
    { id: "gd_q1", label: "Why do you want to join the Graphic Design Department?", type: "textarea", options: [], required: true, order: 1 },
    { id: "gd_q2", label: "Do you have any prior experience in graphic design? If yes, briefly mention your experience (write \"No\" if not applicable).", type: "textarea", options: [], required: true, order: 2 },
    { id: "gd_q3", label: "Which design tools are you familiar with?", type: "checkbox", options: ["Canva", "Figma", "Adobe Photoshop", "Other"], required: true, order: 3 },
    { id: "gd_q4", label: "Please share your portfolio or previous work (Google Drive, Behance, Figma, Instagram, etc.).", type: "text", options: [], required: true, order: 4 },
    { id: "gd_q5", label: "Which type of design interests you the most?", type: "checkbox", options: ["Social Media Design", "Posters & Banners", "Branding & Logo Design", "UI/UX Design", "Presentation Design", "Illustrations", "Other"], required: true, order: 5 },
    { id: "gd_q6", label: "How would you rate your current design skills?", type: "select", options: ["Beginner", "Intermediate", "Advanced"], required: true, order: 6 },
    { id: "gd_q7", label: "How do you usually approach a new design task?", type: "textarea", options: [], required: true, order: 7 },
    { id: "gd_q8", label: "If you had to learn a completely new design tool in one week, how would you approach it?", type: "textarea", options: [], required: true, order: 8 },
    { id: "gd_q9", label: "Imagine you can redesign one thing in our college. What would it be, and why?", type: "textarea", options: [], required: true, order: 9 },
    { id: "gd_q10", label: "Why do you think you would be a good fit for the Graphic Design Department?", type: "textarea", options: [], required: true, order: 10 },
  ],

  ps: [
    { id: "ps_q1", label: "Why should we select you for the P&S team? What qualities or experiences make you a good fit?", type: "textarea", options: [], required: true, order: 1 },
    { id: "ps_q2", label: "Imagine registrations for an event are very low, and only three days are left. What would be your plan to increase participation?", type: "textarea", options: [], required: true, order: 2 },
    { id: "ps_q3", label: "Have you ever promoted an event, managed a social media page, organized an event, or approached people for sponsorships/collaborations? If yes, briefly describe your experience.", type: "textarea", options: [], required: true, order: 3 },
    { id: "ps_q4", label: "Which social media platform do you think is the most effective for promoting college events, and why?", type: "textarea", options: [], required: true, order: 4 },
    { id: "ps_q5", label: "Rate your confidence: Public speaking (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 5 },
    { id: "ps_q6", label: "Rate your confidence: Appearing in promotional videos (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 6 },
    { id: "ps_q7", label: "Rate your confidence: Approaching strangers (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 7 },
    { id: "ps_q8", label: "Rate your confidence: Networking with professionals (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 8 },
    { id: "ps_q9", label: "Rate your confidence: Working in a team (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 9 },
    { id: "ps_q10", label: "Rate your confidence: Managing social media (1-5)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 10 },
    { id: "ps_q11", label: "How do you adapt your communication style to different audiences?", type: "textarea", options: [], required: true, order: 11 },
    { id: "ps_q12", label: "Tell us about a time when you took initiative without being asked. What was the situation, and what was the outcome?", type: "textarea", options: [], required: true, order: 12 },
  ],

  photography: [
    { id: "photography_q1", label: "Why do you want to join the Photography Department?", type: "textarea", options: [], required: true, order: 1 },
    { id: "photography_q2", label: "Which area are you most interested in? (can choose one or more)", type: "checkbox", options: ["Photography", "Videography", "Editing", "Content Creation", "All of the Above"], required: true, order: 2 },
    { id: "photography_q3", label: "How do you handle deadlines and pressure during events?", type: "textarea", options: [], required: true, order: 3 },
    { id: "photography_q4", label: "Share a link to your best photograph (Google Drive/Instagram/etc — upload isn't supported here, paste a link).", type: "text", options: [], required: true, order: 4, showIf: { id: "photography_q2", includesAny: ["Photography", "All of the Above"] } },
    { id: "photography_q5", label: "Briefly explain why you chose this photograph.", type: "textarea", options: [], required: true, order: 5, showIf: { id: "photography_q2", includesAny: ["Photography", "All of the Above"] } },
    { id: "photography_q6", label: "If you increase the ISO to a very high value, how will it affect the image?", type: "textarea", options: [], required: true, order: 6, showIf: { id: "photography_q2", includesAny: ["Photography", "All of the Above"] } },
    { id: "photography_q7", label: "If your image has too much noise (grain), what could be the reason?", type: "textarea", options: [], required: true, order: 7, showIf: { id: "photography_q2", includesAny: ["Photography", "All of the Above"] } },
    { id: "photography_q8", label: "How do you make a video more engaging for the audience?", type: "textarea", options: [], required: true, order: 8, showIf: { id: "photography_q2", includesAny: ["Videography", "All of the Above"] } },
    { id: "photography_q9", label: "What do you think is more important in videography: Camera quality or Creativity? Why?", type: "textarea", options: [], required: true, order: 9, showIf: { id: "photography_q2", includesAny: ["Videography", "All of the Above"] } },
    { id: "photography_q10", label: "Share links to your previous videography work (Google Drive, YouTube, Instagram, etc.).", type: "text", options: [], required: true, order: 10, showIf: { id: "photography_q2", includesAny: ["Videography", "All of the Above"] } },
    { id: "photography_q11", label: "Which editing techniques are you familiar with?", type: "checkbox", options: ["Keyframing (Animation)", "Motion Tracking", "Object Tracking", "Masking / Rotoscoping", "Color Correction", "Color Grading", "Speed Ramping", "Green Screen (Chroma Key)", "Text Animations / Typography", "Frame Blending / Optical Flow", "Basic Cuts & Trimming", "Transitions & Effects", "LUTs (Look-Up Tables)", "Export Settings (H.264, HEVC, etc.)", "None of the Above"], required: true, order: 11, showIf: { id: "photography_q2", includesAny: ["Editing", "All of the Above"] } },
    { id: "photography_q12", label: "How do you usually organize your editing workflow?", type: "textarea", options: [], required: true, order: 12, showIf: { id: "photography_q2", includesAny: ["Editing", "All of the Above"] } },
    { id: "photography_q13", label: "Which editing software are you comfortable using?", type: "checkbox", options: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut", "Other"], required: true, order: 13, showIf: { id: "photography_q2", includesAny: ["Editing", "All of the Above"] } },
    { id: "photography_q14", label: "Describe one editing project you have worked on and explain your contribution.", type: "textarea", options: [], required: true, order: 14, showIf: { id: "photography_q2", includesAny: ["Editing", "All of the Above"] } },
    { id: "photography_q15", label: "Share your best edited video or portfolio link.", type: "text", options: [], required: true, order: 15, showIf: { id: "photography_q2", includesAny: ["Editing", "All of the Above"] } },
  ],

  creative: [
    { id: "creative_q1", label: "What made you interested in joining the Creatives Team? (Maximum 100 words)", type: "textarea", options: [], required: true, order: 1 },
    { id: "creative_q2", label: "Have you previously worked on event decorations, art, DIY projects, or other creative activities? Share links/photos if available (Google Drive, Instagram, etc.), write \"No\" if none.", type: "text", options: [], required: true, order: 2 },
    { id: "creative_q3", label: "Are you good at being on time and keeping track of multiple tasks?", type: "radio", options: ["Yes", "No"], required: true, order: 3 },
    { id: "creative_q4", label: "Describe your decoration concept for a CIE event based on any one of these themes: Innovation, Startup Expo, or IPL Auction.", type: "textarea", options: [], required: true, order: 4 },
    { id: "creative_q5", label: "How comfortable are you speaking up with ideas during meetings? (1 = Not Comfortable, 5 = Very Comfortable)", type: "select", options: ["1", "2", "3", "4", "5"], required: true, order: 5 },
    { id: "creative_q6", label: "What factors would you consider while planning the decor?", type: "textarea", options: [], required: true, order: 6 },
    { id: "creative_q7", label: "What skills can you contribute to the Creatives Team? (Examples: Sketching, painting, calligraphy, crafting, etc.)", type: "textarea", options: [], required: true, order: 7 },
    { id: "creative_q8", label: "Are you comfortable with cutting, pasting, painting, and other hands-on décor work for extended hours?", type: "radio", options: ["Yes", "No"], required: true, order: 8 },
    { id: "creative_q9", label: "Imagine you're working on an event decoration. Your idea isn't selected, and one of your teammates isn't contributing much. How would you handle the situation while ensuring the team completes the work successfully? (100-120 words)", type: "textarea", options: [], required: true, order: 9 },
    { id: "creative_q10", label: "Why should we choose you over other applicants?", type: "textarea", options: [], required: true, order: 10 },
  ],

  ops: [
    { id: "ops_q2", label: "Why do you want to join the CIE Operations and Finance Department?", type: "textarea", options: [], required: true, order: 1 },
    { id: "ops_q3", label: "How do you prioritize tasks when multiple urgent activities arise?", type: "textarea", options: [], required: true, order: 2 },
    { id: "ops_q4", label: "You have only one week to organise a college technical fest. What would be your action plan?", type: "textarea", options: [], required: true, order: 3 },
    { id: "ops_q5", label: "A supplier fails to deliver essential materials on the event day. How would you respond?", type: "textarea", options: [], required: true, order: 4 },
    { id: "ops_q6", label: "During an event, heavy rain disrupts outdoor activities. What contingency plan would you implement?", type: "textarea", options: [], required: true, order: 5 },
    { id: "ops_q7", label: "How do you prepare a budget for an event?", type: "textarea", options: [], required: true, order: 6 },
    { id: "ops_q8", label: "What would you do if the event expenses exceeded the planned budget?", type: "textarea", options: [], required: true, order: 7 },
  ],
};
