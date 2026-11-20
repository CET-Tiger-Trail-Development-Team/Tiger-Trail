export type Track = 'academic' | 'career' | 'out-of-classroom';
export type Term = 'fall' | 'spring' | 'summer';

export interface Quest {
  id: string;
  title: string;
  track: Track;
  year: number;
  term: Term;
  required: boolean;
  xp: number;
  prerequisites?: string[];
  isBranch?: boolean;
  description?: string;
  timing?: string;
  credits?: string;
  spanTerms?: number;
  recurring?: boolean;
  featured?: boolean;
  draggable?: boolean;
  startsInBank?: boolean;
  nodeType?: 'coop';
  programNote?: string;
  resourceUrl?: string;
}

export const QUESTS: Quest[] = [
  // Academic
  { id: 'a1', title: 'Build your academic foundation', track: 'academic', year: 1, term: 'fall', required: false, xp: 100 },
  { id: 'a2', title: 'Develop and build tangible products, with a focus on material science and behavior', track: 'academic', year: 1, term: 'fall', required: false, xp: 100 },
  { id: 'a3', title: 'Explore the Academic Success Center', track: 'academic', year: 1, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'a4f', title: 'First-Year Advising Meeting', track: 'academic', year: 1, term: 'fall', required: true, xp: 75, description: 'Meet with your academic advisor to review your transition to RIT, course plan, and first-year goals.', timing: 'Year 1 · Fall' },
  { id: 'a4', title: 'First-Year Advising Meeting', track: 'academic', year: 1, term: 'spring', required: true, xp: 75, description: 'Reconnect with your academic advisor to review progress and plan the next stage of your major map.', timing: 'Year 1 · Spring' },
  { id: 'a5', title: 'Calculus', track: 'academic', year: 2, term: 'fall', required: true, xp: 75, prerequisites: ['a1'], description: 'Complete the calculus milestone shown on the MCET major map.', timing: 'Year 2 · Fall', credits: 'See your degree audit' },
  { id: 'a5p', title: 'Physics', track: 'academic', year: 2, term: 'fall', required: true, xp: 75, prerequisites: ['a1'], description: 'Complete the physics milestone shown on the MCET major map.', timing: 'Year 2 · Fall', credits: 'See your degree audit' },
  { id: 'a6', title: 'Model and analyze mechanical and electrical systems', track: 'academic', year: 2, term: 'spring', required: false, xp: 100, prerequisites: ['a5'] },
  { id: 'a7', title: 'Second-Year Advising Meeting', track: 'academic', year: 2, term: 'fall', required: true, xp: 150, spanTerms: 3, description: 'Students meet with their advisor at any point during their second year.', timing: 'Any term in Year 2' },
  { id: 'a9', title: 'Develop dynamic systems and analytical tools for performance insights', track: 'academic', year: 3, term: 'spring', required: false, xp: 100, isBranch: true },
  { id: 'a10', title: 'Mid-Degree Advising Meeting', track: 'academic', year: 3, term: 'fall', required: true, xp: 150, spanTerms: 3, description: 'Can take place anytime during the third year.', timing: 'Any term in Year 3' },
  { id: 'a11', title: 'Explore technical and non-technical passions', track: 'academic', year: 4, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'a12', title: 'Design sensor-driven systems to optimize mechanical performance and energy conversion', track: 'academic', year: 4, term: 'spring', required: false, xp: 100 },
  { id: 'a13', title: 'Bring it all together', track: 'academic', year: 5, term: 'fall', required: false, xp: 100 },
  { id: 'a14', title: 'Design and validate complex systems using integrated knowledge and advanced computational analysis', track: 'academic', year: 5, term: 'spring', required: false, xp: 100, prerequisites: ['a13'] },
  { id: 'a15', title: 'Apply for Graduation', track: 'academic', year: 4, term: 'spring', required: true, xp: 100, description: 'Students should apply once they have completed roughly 90 credit hours.', timing: 'Year 4 · Spring' },

  // Career
  { id: 'c1', title: 'Career Fair', track: 'career', year: 1, term: 'fall', required: false, xp: 100, description: 'RIT career fairs connect students with employers recruiting for co-op and full-time roles. Events are typically held during fall and spring semesters. Prepare by updating your resume, researching attending employers, practicing your introduction, and planning professional attire.', timing: 'Fall and Spring', resourceUrl: 'https://www.rit.edu/careerservices/students/career-fairs' },
  { id: 'c2', title: 'Build your Career Map', track: 'career', year: 1, term: 'fall', required: false, xp: 100 },
  { id: 'c3', title: 'Build a time management calendar', track: 'career', year: 1, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'c4', title: 'Take Career Assessment', track: 'career', year: 1, term: 'spring', required: false, xp: 100 },
  { id: 'c5', title: 'Co-op Class', track: 'career', year: 2, term: 'fall', required: true, xp: 100, prerequisites: ['c2'], description: 'MCET students take ENGT-95 Career Seminar to prepare for the co-op search and professional workplace expectations.', timing: 'Year 2', credits: '0 credits', programNote: 'ECET option: ENGT-299 · 1 credit' },
  { id: 'coop-1', title: 'Co-op', track: 'career', year: 2, term: 'summer', required: true, xp: 150, nodeType: 'coop', draggable: true, startsInBank: true, description: 'Complete a full-time, paid, major-relevant cooperative education experience. This is one of four required co-op blocks.', timing: 'Any eligible term, including Summer' },
  { id: 'coop-2', title: 'Co-op', track: 'career', year: 3, term: 'spring', required: true, xp: 150, nodeType: 'coop', draggable: true, startsInBank: true, description: 'Complete a full-time, paid, major-relevant cooperative education experience. This is one of four required co-op blocks.', timing: 'Any eligible term, including Summer' },
  { id: 'coop-3', title: 'Co-op', track: 'career', year: 3, term: 'summer', required: true, xp: 150, nodeType: 'coop', draggable: true, startsInBank: true, description: 'Complete a full-time, paid, major-relevant cooperative education experience. This is one of four required co-op blocks.', timing: 'Any eligible term, including Summer' },
  { id: 'coop-4', title: 'Co-op', track: 'career', year: 4, term: 'fall', required: true, xp: 150, nodeType: 'coop', draggable: true, startsInBank: true, description: 'Complete a full-time, paid, major-relevant cooperative education experience. This is one of four required co-op blocks.', timing: 'Any eligible term, including Summer' },
  { id: 'c6', title: 'Investigate CABM opportunities', track: 'career', year: 2, term: 'spring', required: false, xp: 100, isBranch: true },
  { id: 'c7', title: 'Build your Academic Pathway', track: 'career', year: 2, term: 'spring', required: false, xp: 100 },
  { id: 'c8', title: 'Get support: join a study group and engage in faculty/student hours', track: 'career', year: 2, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'c9', title: 'Summer: part-time job/internship', track: 'career', year: 2, term: 'summer', required: false, xp: 100 },
  { id: 'c11', title: 'Explore minors and options, declare GE Immersion', track: 'career', year: 3, term: 'fall', required: false, xp: 100 },
  { id: 'c12', title: 'Revisit your Career Assessment and Map', track: 'career', year: 3, term: 'spring', required: false, xp: 100 },
  { id: 'c13', title: 'Explore undergrad research', track: 'career', year: 3, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'c14', title: 'ENGT 300', track: 'career', year: 2, term: 'fall', required: false, xp: 100, spanTerms: 6, description: 'A professional development opportunity to network and talk with alumni. Only offered to 20 to 30 students. Typically taken in Year 2 or 3.', timing: 'Year 2 or Year 3' },
  { id: 'c15', title: 'Revisit your Academic Pathway', track: 'career', year: 4, term: 'spring', required: false, xp: 100 },
  { id: 'c16', title: 'Land full-time job', track: 'career', year: 5, term: 'spring', required: true, xp: 100 },
  { id: 'c17', title: 'Finalize your Career Map', track: 'career', year: 5, term: 'fall', required: false, xp: 100 },
  { id: 'c18', title: 'Apply for Grad School', track: 'career', year: 5, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'c19', title: 'Finalize your Academic Pathway', track: 'career', year: 5, term: 'spring', required: false, xp: 100 },

  // Out of Classroom
  { id: 'o1', title: 'Brick City Weekend', track: 'out-of-classroom', year: 1, term: 'fall', required: false, xp: 100, featured: true, recurring: true, description: 'A featured first-year involvement opportunity that brings students, families, and alumni together for RIT homecoming traditions.', timing: 'Every Fall' },
  { id: 'o2', title: 'Imagine RIT', track: 'out-of-classroom', year: 1, term: 'spring', required: false, xp: 100, recurring: true, description: 'RIT’s spring creativity and innovation festival. Attend, volunteer, or return in a later year to exhibit your work.', timing: 'Every Spring', resourceUrl: 'https://www.rit.edu/imagine/' },
  { id: 'o-hockey', title: 'CET Hockey Night', track: 'out-of-classroom', year: 1, term: 'fall', required: false, xp: 100, recurring: true, description: 'Join the College of Engineering Technology community for an RIT hockey game.', timing: 'Every Fall · October or November' },
  { id: 'o3', title: 'Summer: Explore Study Abroad', track: 'out-of-classroom', year: 1, term: 'summer', required: false, xp: 100, isBranch: true },
  { id: 'o4', title: 'Apply to be a student leader and/or for an on-campus job', track: 'out-of-classroom', year: 1, term: 'spring', required: false, xp: 100, isBranch: true },
  { id: 'o5', title: 'Run for an E-board position with a club or organization', track: 'out-of-classroom', year: 2, term: 'fall', required: false, xp: 100, prerequisites: ['o1'] },
  { id: 'o7', title: 'Explore + Apply for Study Abroad', track: 'out-of-classroom', year: 2, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'o8', title: 'Apply to be a Teaching Assistant', track: 'out-of-classroom', year: 2, term: 'spring', required: false, xp: 100, isBranch: true },
  { id: 'o9', title: 'Pursue SolidWorks and GD&T certifications', track: 'out-of-classroom', year: 2, term: 'spring', required: false, xp: 100 },
  { id: 'o11', title: 'Apply + Go on Study Abroad', track: 'out-of-classroom', year: 3, term: 'spring', required: false, xp: 100, isBranch: true },
  { id: 'o12', title: 'Summer: REU', track: 'out-of-classroom', year: 3, term: 'summer', required: false, xp: 100, isBranch: true },
  { id: 'o13', title: 'Consider joining the Student Advisory Board or Student Government', track: 'out-of-classroom', year: 4, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'o15', title: 'Study Abroad', track: 'out-of-classroom', year: 4, term: 'fall', required: false, xp: 100, isBranch: true },
  { id: 'o16', title: 'Serve as a Teaching Assistant or Grader', track: 'out-of-classroom', year: 5, term: 'fall', required: false, xp: 100, isBranch: true },
];

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // will map to a Lucide icon name
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_steps', title: 'First Steps', description: 'Complete your first quest on the trail.', icon: 'Footprints' },
  { id: 'found_people', title: 'Found Your People', description: 'Complete "Explore student clubs and organizations".', icon: 'Users' },
  { id: 'coop_rookie', title: 'Co-op Rookie', description: 'Complete your first co-op.', icon: 'Briefcase' },
  { id: 'step_up', title: 'Step Up', description: 'Complete "Run for an E-board position".', icon: 'TrendingUp' },
  { id: 'on_stage', title: 'On Stage', description: 'Complete "Present at Imagine RIT!".', icon: 'Mic' },
  { id: 'globetrotter', title: 'Globetrotter', description: 'Complete "Study Abroad".', icon: 'Globe' },
  { id: 'tiger_grad', title: 'Tiger Grad', description: 'Complete "Apply for Graduation".', icon: 'GraduationCap' },
  { id: 'hired', title: 'Hired!', description: 'Complete "Land full-time job".', icon: 'CheckCircle' },
  { id: 'legend', title: 'Legend', description: 'Reach Level 5.', icon: 'Award' },
  { id: 'academic_scholar', title: 'Academic Scholar', description: 'Complete all Academic track quests.', icon: 'BookOpen' },
  { id: 'career_ready', title: 'Career Ready', description: 'Complete all Career track quests.', icon: 'Briefcase' },
  { id: 'campus_leader', title: 'Campus Leader', description: 'Complete all Out of Classroom track quests.', icon: 'Flag' },
  { id: 'freshman_finished', title: 'Freshman Finished', description: 'Complete all Year 1 quests.', icon: 'Star' },
  { id: 'master_trail', title: 'Master of the Trail', description: 'Achieve 100% completion.', icon: 'Crown' },
  { id: 'lore_master', title: 'Campus Scholar', description: 'Read all the secrets in the Field Guide.', icon: 'BookOpen' },
];


export interface Resource {
  title: string;
  description: string;
  url?: string;
}

export const TOPIC_RESOURCES: Record<string, Resource[]> = {
  "Build Your Academic Foundation / Finish Calculus & Physics": [
    { title: "Academic Success Center (ASC)", description: "Hub for tutoring, study skills, and success coaching.", url: "https://www.rit.edu/studentaffairs/asc/" },
    { title: "Math & Science Support", description: "Free drop-in help for calculus, physics, and chemistry; includes Saturday Math Academy." },
    { title: "Bates & Sol Tutoring Centers", description: "Walk-in peer tutoring, no appointment needed (Mon–Thu 9am–8pm, Fri 9am–4pm)." },
    { title: "Tutoring at RIT", description: "Directory of all tutoring options across campus.", url: "https://www.rit.edu/studentaffairs/asc/tutoring" }
  ],
  "Advising": [
    { title: "CET Academic Advising", description: "Every CET student gets an assigned advisor (listed in SIS); clear your advising holds each year. Questions: 585-475-4758." },
    { title: "MMET Student Resources", description: "Department-level forms, contacts, and program info for MCET students." }
  ],
  "Hands-On Coursework": [
    { title: "MCET Program & Curriculum", description: "Full course sequence for each year of the major map." },
    { title: "Mechanical & Mechatronics Engineering Technology Dept. (MMET)", description: "Your home department; faculty, labs, and project opportunities." }
  ],
  "Open Electives & Minors": [
    { title: "Immersions & Minors", description: "Browse all options; every BS student must declare a 3-course immersion.", url: "https://www.rit.edu/study/immersions" },
    { title: "General Education Immersions", description: "How immersions fit GE requirements; many convert to a minor with just 2 more courses." }
  ],
  "Graduation": [
    { title: "Commencement FAQs", description: "Apply through SIS once eligible (the Registrar emails you); apply early to appear in the printed program." },
    { title: "Office of the Registrar", description: "Forms, deadlines, and enrollment questions (registrar@rit.edu)." }
  ],
  "Career Fairs": [
    { title: "University-Wide Career Fair", description: "Held every fall and spring; open to all students seeking co-ops and full-time roles." },
    { title: "Get Career Fair Ready", description: "Prep checklist: resume, elevator pitch, employer research." },
    { title: "Career Services Events", description: "College-specific fairs, STEM Affinity Expo, and networking events year-round." }
  ],
  "Career Map": [
    { title: "Career Services and Co-op", description: "Book a career counselor appointment for assessments (interests, values, personality)." },
    { title: "Career Readiness Roadmap", description: "RIT’s step-by-step career planning framework by year." }
  ],
  "Co-ops": [
    { title: "RIT Career Connect", description: "The primary platform for co-op, internship, and full-time job postings.", url: "https://www.rit.edu/careerservices/students/career-connect" },
    { title: "Cooperative Education", description: "Co-op policies, registration, and your assigned co-op advisor. MCET typically requires one spring, one fall, and two summer blocks." }
  ],
  "ENGT 300": [
    { title: "Required co-op prep course", description: "Register in SIS before your first co-op. Covers resumes, LinkedIn, interviewing, and workplace skills." },
    { title: "Career Services Student Programming", description: "How co-op prep courses work at each college." }
  ],
  "Study Groups": [
    { title: "Sol Study Center", description: "Group study space with tutors on hand." },
    { title: "Attend your professors’ office hours", description: "Times are posted in each course syllabus and myCourses." }
  ],
  "CABM": [
    { title: "CABM Degrees Overview", description: "Earn a BS + MS faster and with a guaranteed 40% graduate tuition scholarship." },
    { title: "CABM FAQs", description: "Apply through your academic department, typically after year 2 or 3." }
  ],
  "Research": [
    { title: "RIT Undergraduate Research Symposium", description: "Present your work; talk to MMET faculty about joining their research." },
    { title: "NSF REU Program", description: "Paid summer research at universities nationwide; most applications due January–March." }
  ],
  "Grad School": [
    { title: "RIT Graduate Admission", description: "100+ programs; application instructions and deadlines." },
    { title: "Graduate School Toolkit", description: "Resources for current students considering grad school." }
  ],
  "Summer Jobs": [
    { title: "Student Employment Office", description: "On-campus job policies and postings (studentemployment@rit.edu)." },
    { title: "Summer courses", description: "Talk to your CET advisor about catching up or getting ahead on calculus/physics." }
  ],
  "Clubs": [
    { title: "CET Affiliated Student Clubs", description: "Engineering technology clubs tied to your college." },
    { title: "CampusGroups", description: "RIT’s hub for all 300+ clubs, events, and E-board elections.", url: "https://campusgroups.rit.edu/" },
    { title: "Baja SAE and Formula SAE", description: "Performance teams perfect for MCET students; also Hot Wheelz, clean snowmobile, and rocket teams." }
  ],
  "Imagine RIT": [
    { title: "Imagine RIT: Creativity and Innovation Festival", description: "Attend year 1, exhibit your projects in later years (450+ exhibits).", url: "https://www.rit.edu/imagine/" }
  ],
  "Study Abroad": [
    { title: "RIT Study Abroad", description: "Faculty-led, exchange, and affiliate programs.", url: "https://www.rit.edu/academicaffairs/global/" },
    { title: "RIT Global", description: "Easiest option: RIT’s own campuses in Croatia, Dubai, and Kosovo (global@rit.edu)." }
  ],
  "Student Leadership": [
    { title: "Student Leadership", description: "Orientation leader, peer mentor, and other leadership roles." },
    { title: "Resident Advisors", description: "RA applications open each November via the MyLife portal." },
    { title: "On-Campus Employment", description: "Search “Find Student Jobs” in Workday." }
  ],
  "Teaching Assistant": [
    { title: "ASC — Work for Us", description: "Become a paid peer tutor." },
    { title: "For TA/grader roles", description: "Contact your professors or the MMET department office directly." }
  ],
  "Certifications": [
    { title: "CETEMS Student Resources", description: "CET’s student resource hub, including certification info." },
    { title: "SOLIDWORKS Academic Certification (CSWA)", description: "Entry-level cert; students at approved schools can get free exam vouchers — ask your CAD instructor." }
  ],
  "Student Gov": [
    { title: "Find RIT Student Government and the CET Student Advisory Board", description: "Elections and applications are posted there each spring." }
  ]
};

export const getResourcesForQuest = (questTitle: string): Resource[] => {
  const title = questTitle.toLowerCase();
  let keys: string[] = [];

  if (title.includes('academic foundation') || title.includes('calculus') || title.includes('physics') || title.includes('success center')) {
    keys.push("Build Your Academic Foundation / Finish Calculus & Physics");
  }
  if (title.includes('advising')) {
    keys.push("Advising");
  }
  if (title.includes('tangible products') || title.includes('model and analyze') || title.includes('dynamic systems') || title.includes('sensor-driven') || title.includes('bring it all together') || title.includes('complex systems')) {
    keys.push("Hands-On Coursework");
  }
  if (title.includes('minors') || title.includes('immersion') || title.includes('academic pathway')) {
    keys.push("Open Electives & Minors");
  }
  if (title.includes('graduation')) {
    keys.push("Graduation");
  }
  if (title.includes('career fair')) {
    keys.push("Career Fairs");
  }
  if (title.includes('career map') || title.includes('career assessment')) {
    keys.push("Career Map");
  }
  if (title.includes('co-op') && !title.includes('engt')) {
    keys.push("Co-ops");
  }
  if (title.includes('engt')) {
    keys.push("ENGT 300");
  }
  if (title.includes('study group') || title.includes('faculty/student')) {
    keys.push("Study Groups");
  }
  if (title.includes('cabm')) {
    keys.push("CABM");
  }
  if (title.includes('research') || title.includes('reu')) {
    keys.push("Research");
  }
  if (title.includes('grad school')) {
    keys.push("Grad School");
  }
  if (title.includes('summer') && title.includes('job')) {
    keys.push("Summer Jobs");
  }
  if (title.includes('club') || title.includes('e-board')) {
    keys.push("Clubs");
  }
  if (title.includes('imagine rit')) {
    keys.push("Imagine RIT");
  }
  if (title.includes('abroad')) {
    keys.push("Study Abroad");
  }
  if (title.includes('leader') || title.includes('on-campus job')) {
    keys.push("Student Leadership");
  }
  if (title.includes('teaching assistant') || title.includes('grader')) {
    keys.push("Teaching Assistant");
  }
  if (title.includes('solidworks') || title.includes('certification')) {
    keys.push("Certifications");
  }
  if (title.includes('student government') || title.includes('advisory board')) {
    keys.push("Student Gov");
  }

  let results: Resource[] = [];
  keys.forEach(k => {
    if (TOPIC_RESOURCES[k]) results.push(...TOPIC_RESOURCES[k]);
  });
  return results;
};


export interface GuideEntry {
  id: string;
  category: 'Survival' | 'Navigation' | 'Lore' | 'MCET' | 'Safety' | 'Accessibility';
  title: string;
  shortDesc: string;
  content: string;
  icon: string;
  url?: string;
  mapLocationId?: string;
  relatedQuestId?: string;
  image?: string;
  rare?: boolean;
  // Presentation extras (all optional — entries render fine without them).
  stats?: { value: string; label: string }[];
  facts?: { icon?: string; lead: string; detail: string }[];
  tip?: string;
  lastVerified?: string; // ISO date, e.g. "2026-09-18"
}

// Per-category fallback icon when an entry does not name its own.
export const CATEGORY_DEFAULT_ICON: Record<GuideEntry['category'], string> = {
  Survival: 'LifeBuoy',
  Navigation: 'Map',
  Lore: 'Landmark',
  MCET: 'Wrench',
  Safety: 'Shield',
  Accessibility: 'Accessibility',
};

// Curated onboarding deck — a view over existing entries, in fixed order.
export const STARTER_GUIDE_IDS = ['g21', 'g15', 'g22', 'g31', 'g26', 'g17', 'g27'];

// Named campus locations that Field Guide entries can point at.
// CampusMap.tsx reads ?focus={id} and highlights the matching entry.
export const CAMPUS_LOCATIONS: Record<string, string> = {
  gleason: 'Gleason Hall (Building 70) — MCET Labs',
  shed: 'The SHED — Student Hall for Exploration & Development',
  gracies: "Gracie's Dining Hall",
  tunnels: 'The Underground Tunnels',
  quartermile: 'The Quarter Mile',
};

export const GUIDES: GuideEntry[] = [
  {
    id: 'g1',
    category: 'Navigation',
    title: 'The Underground Tunnels',
    shortDesc: 'Beat the Rochester winter.',
    content: '<p>RIT has a legendary underground tunnel system connecting the dorms to academic buildings. It is the ultimate hack for surviving the brutal Rochester winters without even putting on a coat!</p><h4 class="text-lg">Key Areas:</h4><ul><li><strong>Dorm Tunnels:</strong> Connects housing and houses the post office, laundry, and convenience stores.</li><li><strong>Academic Tunnels:</strong> Connects the main instructional buildings.</li></ul>',
    icon: 'Map',
    mapLocationId: 'tunnels',
    facts: [
      { icon: 'Home', lead: 'Dorm tunnels', detail: 'link housing to the post office, laundry, and convenience stores.' },
      { icon: 'GraduationCap', lead: 'Academic tunnels', detail: 'connect the main instructional buildings coat-free.' },
      { icon: 'Snowflake', lead: 'Winter hack', detail: 'cross campus without stepping outside once.' },
    ],
    tip: 'Learn the tunnel map early — it saves you daily once the lake-effect snow arrives.',
  },
  {
    id: 'g2',
    category: 'Survival',
    title: 'Gracie\'s Dining Hall',
    shortDesc: 'The freshman rite of passage.',
    content: '<p>Gracie\'s is the classic freshman dining hall. It is practically a rite of passage to eat here!</p><h4 class="text-lg">Pro Tips:</h4><ul><li>The Mongolian Grill station is highly rated.</li><li>The weekend brunch waffle makers are top-tier.</li><li>It is the only true "all-you-care-to-eat" facility on campus.</li></ul>',
    icon: 'Coffee',
    mapLocationId: 'gracies',
    facts: [
      { icon: 'Flame', lead: 'Mongolian Grill', detail: 'is the most-recommended station on the line.' },
      { icon: 'Utensils', lead: 'Weekend brunch', detail: 'brings out the top-tier made-to-order waffle makers.' },
      { icon: 'Infinity', lead: 'All-you-care-to-eat', detail: 'is unique to Gracie\'s among campus dining.' },
    ],
    tip: 'Go at off-peak hours to skip the rush and get the fresh grill batches.',
  },
  {
    id: 'g3',
    category: 'Navigation',
    title: 'The Quarter Mile',
    shortDesc: 'Prepare for the wind tunnel.',
    content: '<p>The Quarter Mile is the main artery of campus connecting the dorms to the academic side. (Fun fact: It is actually slightly longer than a quarter mile!)</p><h4 class="text-lg">Winter Warning:</h4><p>In the winter, the section near the library turns into an absolute wind tunnel. Brace yourself and bundle up!</p>',
    icon: 'Wind'
  },
  {
    id: 'g4',
    category: 'Lore',
    title: 'Brick City',
    shortDesc: 'Why so many bricks?',
    content: '<p>Welcome to Brick City! RIT uses a very specific proprietary brick color for almost all its buildings. It keeps the campus visually unified.</p><h4 class="text-lg">Campus Trivia:</h4><p>There are literally millions of bricks on campus. Tour guides love to joke about having students count them as punishment!</p>',
    icon: 'Mountain'
  },
  {
    id: 'g5',
    category: 'Lore',
    title: 'The Sentinel',
    shortDesc: 'What is that giant metal thing?',
    content: '<p>That massive metal structure in the center of the administrative quad is called The Sentinel.</p><h4 class="text-lg">The History:</h4><p>Created by artist Albert Paley, some say it looks like a knight on horseback. Regardless of what you see in it, it serves as the ultimate campus meeting spot and landmark.</p>',
    icon: 'Hexagon',
    rare: true
  },
  {
    id: 'g6',
    category: 'MCET',
    title: 'Lab Survival Guide',
    shortDesc: 'Mastering Building 70.',
    content: '<p>For MCET students, Building 70 (Gleason Hall) is your new home.</p><h4 class="text-lg">Keys to Success:</h4><ul><li><strong>Hours:</strong> Knowing your open lab hours is critical for finishing projects on time.</li><li><strong>Staff:</strong> Make friends with the lab technicians early—they are incredibly knowledgeable and will save your life!</li></ul>',
    icon: 'Wrench',
    mapLocationId: 'gleason',
    relatedQuestId: 'a5',
    stats: [
      { value: '70', label: 'Gleason Hall building #' },
    ],
    facts: [
      { icon: 'Clock', lead: 'Open lab hours', detail: 'are the difference between finishing a project and not.' },
      { icon: 'Users', lead: 'Lab technicians', detail: 'are your best allies — introduce yourself early.' },
      { icon: 'HardHat', lead: 'Safety first', detail: 'closed-toe shoes and PPE are non-negotiable in the shop.' },
    ],
  },
  {
    id: 'g7',
    category: 'Survival',
    title: 'Digital Systems Ecosystem',
    shortDesc: 'The 5 platforms every student touches.',
    content: '<p>Here is a breakdown of the software you will use every single day:</p><ul><li><strong>SIS:</strong> Official academic backend (registration, transcripts, final grades).</li><li><strong>Tiger Center:</strong> Student-built schedule planner and class search tool.</li><li><strong>myCourses:</strong> RIT\'s LMS (Brightspace) for assignments, quizzes, and in-progress grades.</li><li><strong>eServices:</strong> Financial hub (financial aid, tuition, housing payments).</li><li><strong>Career Connect:</strong> Job board and student life portal (powered by Symplicity).</li></ul>',
    icon: 'Map'
  },
  {
    id: 'g8',
    category: 'Navigation',
    title: 'The SHED',
    shortDesc: 'Student Hall for Exploration and Development',
    content: '<p>Opened in fall 2023, this $120 million building connected to Wallace Library is the hub for technology, art, and design.</p><h4 class="text-lg">Inside The SHED:</h4><ul><li><strong>Active Classrooms:</strong> Extra-large, flexible spaces built for group work.</li><li><strong>Makerspaces:</strong> Seven massive spaces (3D printing, woodworking, electronics) open to all majors!</li><li><strong>Project Teams:</strong> Home base for competitive teams (e-vehicle, robotics, rocket).</li><li><strong>The Arts:</strong> Sklarsky Glass Box Theater and multiple dance/music studios.</li></ul>',
    icon: 'Building2',
    url: 'https://www.rit.edu/shed',
    mapLocationId: 'shed',
    rare: true,
    stats: [
      { value: '$120M', label: 'Build cost' },
      { value: '7', label: 'Makerspaces' },
    ],
    facts: [
      { icon: 'Boxes', lead: 'Makerspaces', detail: 'cover 3D printing, woodworking, and electronics — open to all majors.' },
      { icon: 'Rocket', lead: 'Project teams', detail: 'call it home base: e-vehicle, robotics, and rocket.' },
      { icon: 'Palette', lead: 'The arts', detail: 'include the Sklarsky Glass Box Theater and studios.' },
    ],
  },
  {
    id: 'g9',
    category: 'MCET',
    title: 'The Co-op Requirement',
    shortDesc: 'Why MCET takes 5 years.',
    content: '<p>Cooperative Education (co-op) is a strict graduation requirement for MCET. It involves full-time (35+ hrs/week), paid, major-relevant work. <em>Bonus: You pay no RIT tuition during a co-op block!</em></p><h4 class="text-lg">The Four-Step Cycle:</h4><ol><li><strong>Complete Prerequisites:</strong> Maintain a 2.0+ GPA and pass the Co-op Prep Seminar.</li><li><strong>Search & Interview:</strong> Attend Career Fairs and apply via Career Connect.</li><li><strong>Accept & Report:</strong> Register the co-op block in SIS so you stay enrolled.</li><li><strong>Work & Evaluate:</strong> Complete 12-15 weeks of work and get an employer evaluation.</li></ol>',
    icon: 'Briefcase',
    url: 'https://www.rit.edu/careerservices/',
    relatedQuestId: 'coop-1',
    rare: true,
    stats: [
      { value: '35+', label: 'Hrs/week, paid' },
      { value: '$0', label: 'RIT tuition on co-op' },
    ],
    facts: [
      { icon: 'ClipboardCheck', lead: 'Prerequisites', detail: 'need a 2.0+ GPA and the Co-op Prep Seminar.' },
      { icon: 'Search', lead: 'Search & interview', detail: 'happen at Career Fairs and through Career Connect.' },
      { icon: 'CalendarCheck', lead: 'Register the block', detail: 'in SIS so you stay enrolled during co-op.' },
    ],
  },
  {
    id: 'g10',
    category: 'Navigation',
    title: 'Campus Geography',
    shortDesc: 'Tunnels, SIHs, and Off-Campus.',
    content: '<h4 class="text-lg">Special Interest Houses (SIHs)</h4><p>Themed living communities (CSH, Engineering House) that let you skip the standard dorm lottery.</p><h4 class="text-lg">NTID & Deaf Culture</h4><p>RIT hosts the National Technical Institute for the Deaf. ASL is the unofficial second language of campus, with interpreters in most large lectures.</p><h4 class="text-lg">Getting Off Campus</h4><p>No car? Take the free shuttles to Wegmans, Target, and Marketplace Mall.</p>',
    icon: 'Mountain'
  },
  {
    id: 'g11',
    category: 'Survival',
    title: 'RIT Housing',
    shortDesc: 'Dorms vs Apartments',
    content: '<h4 class="text-lg">Freshman Housing</h4><p>High-rise dorms (Ellingson, Gleason) are generally required along with a campus meal plan.</p><h4 class="text-lg">Upperclassman Housing</h4><ul><li><strong>Global Village:</strong> Modern suites on the academic side.</li><li><strong>University Commons (UC):</strong> Highly coveted 4-bedroom apartments with in-unit laundry.</li><li><strong>Perkins Green & Riverknoll:</strong> Traditional apartments and townhomes.</li></ul><p class="text-sm font-bold text-red-500 border-l-4 border-red-500 pl-3 bg-red-500/10 p-2 rounded-r-lg mt-4">Warning: If you sign a private off-campus lease (like Park Point), you must sublet it yourself when you leave for co-op!</p>',
    icon: 'Map',
    url: 'https://www.rit.edu/housing/myhousing'
  },
  {
    id: 'g12',
    category: 'Survival',
    title: 'Dining at RIT',
    shortDesc: 'Gracie\'s, Tiger Bucks, and Dining Dollars',
    content: '<p>RIT uses a declining-balance system rather than swipe-per-meal.</p><h4 class="text-lg">The Currencies:</h4><ul><li><strong>Dining Dollars:</strong> Tax-exempt funds for campus food.</li><li><strong>Tiger Bucks:</strong> Taxed funds that can be used off-campus or for laundry/printing.</li><li><strong>Gracie\'s Meals:</strong> Specific door swipes for the all-you-care-to-eat hall.</li></ul><p class="text-sm font-bold text-rit-orange border-l-4 border-rit-orange pl-3 bg-rit-orange/10 p-2 rounded-r-lg mt-4">Tip: Download the Mobile Ordering app to skip lunch-rush lines at Crossroads and The Commons!</p>',
    icon: 'CreditCard',
    url: 'https://tigerspend.rit.edu/',
    facts: [
      { icon: 'CircleDollarSign', lead: 'Dining Dollars', detail: 'are tax-exempt funds for campus food.' },
      { icon: 'Wallet', lead: 'Tiger Bucks', detail: 'are taxed and work off-campus, laundry, and printing.' },
      { icon: 'DoorOpen', lead: 'Gracie\'s meals', detail: 'are separate door swipes for the all-you-care-to-eat hall.' },
    ],
    tip: 'Download the Mobile Ordering app to skip lunch-rush lines at Crossroads and The Commons.',
  },
  {
    id: 'g13',
    category: 'Survival',
    title: 'Dietary Accommodations',
    shortDesc: 'Top allergy-friendly college.',
    content: '<p>RIT ranks in the Top 100 allergy-friendly colleges in the US.</p><ul><li><strong>Nut-Free:</strong> Gracie\'s is completely peanut and tree-nut free.</li><li><strong>"Simply Eats":</strong> A specific dining station free of 8 of the top 9 food allergens.</li><li><strong>Plant-Based:</strong> Over 50% of RIT menus are entirely vegan or vegetarian.</li><li><strong>Halal & Kosher:</strong> There is a Star-K certified Kosher deli on campus, and campus poultry is certified Halal.</li></ul><p class="text-sm font-bold text-rit-orange border-l-4 border-rit-orange pl-3 bg-rit-orange/10 p-2 rounded-r-lg mt-4">Use the NetNutrition app to filter menus by allergen before leaving your dorm!</p>',
    icon: 'Salad',
    url: 'https://www.rit.edu/dining/nutrition',
    stats: [
      { value: 'Top 100', label: 'Allergy-friendly' },
      { value: '50%+', label: 'Menus veg/vegan' },
    ],
    facts: [
      { icon: 'ShieldCheck', lead: 'Gracie\'s', detail: 'is completely peanut and tree-nut free.' },
      { icon: 'Utensils', lead: '"Simply Eats"', detail: 'is free of 8 of the top 9 food allergens.' },
      { icon: 'BadgeCheck', lead: 'Halal & Kosher', detail: 'options include a Star-K certified deli on campus.' },
    ],
    tip: 'Use the NetNutrition app to filter menus by allergen before leaving your dorm.',
  },
  {
    id: 'g14',
    category: 'Safety',
    title: 'Public Safety & Tiger Safe',
    shortDesc: 'Blue lights, escorts, and the app to keep on your phone.',
    content: '<p>RIT Public Safety operates 24/7 and is your first call for any campus emergency or safety concern.</p><h4 class="text-lg">Know Before You Need It:</h4><ul><li><strong>Emergency line:</strong> 585-475-3333 (save it now). For non-emergencies: 585-475-2853.</li><li><strong>Blue Light Phones:</strong> Scattered across campus with a bright blue light on top—press the button and Public Safety is dispatched to your exact location, even if you say nothing.</li><li><strong>Safety Escorts:</strong> Request a walking or vehicle escort anywhere on campus after dark, free of charge.</li><li><strong>Tiger Safe App:</strong> Download it for mobile blue-light calling, friend walk tracking, and instant emergency alerts.</li></ul>',
    icon: 'Shield',
    url: 'https://www.rit.edu/publicsafety/',
    mapLocationId: 'quartermile',
    stats: [
      { value: '24/7', label: 'Public Safety' },
      { value: '475-3333', label: 'Emergency line' },
    ],
    facts: [
      { icon: 'Lightbulb', lead: 'Blue Light phones', detail: 'dispatch Public Safety to your exact spot — even in silence.' },
      { icon: 'Footprints', lead: 'Safety escorts', detail: 'walk or drive you anywhere on campus after dark, free.' },
      { icon: 'Smartphone', lead: 'Tiger Safe app', detail: 'adds mobile blue-light calling and friend walk tracking.' },
    ],
    tip: 'Save 585-475-3333 in your phone now, before you ever need it.',
  },

  // ── Survival ──────────────────────────────────────────────
  {
    id: 'g15',
    category: 'Survival',
    title: 'Dining dollars and Tiger Spend',
    shortDesc: 'How campus money actually works.',
    content: '<p>RIT dining runs on a declining-balance system with a few different currencies.</p>',
    icon: 'Wallet',
    url: 'https://tigerspend.rit.edu/',
    stats: [{ value: '$0', label: 'refunded at year end' }],
    facts: [
      { icon: 'Coins', lead: 'Three currencies', detail: 'Dining dollars are tax-exempt and food-only; Tiger Bucks are taxed but work for laundry, printing, and the bookstore; Gracie\'s meals are entrance swipes.' },
      { icon: 'CircleSlash', lead: 'Nothing comes back', detail: 'Unused dining dollars are forfeited at the end of the year — you can add money, never withdraw it.' },
      { icon: 'PlusCircle', lead: 'Top up anywhere', detail: 'Add funds through the Tiger Spend site or the orange kiosks near dining locations.' },
    ],
    tip: 'Many students pick the basic Roar plan and add money as they go, rather than over-buying up front.',
    lastVerified: '2026-09-18',
  },
  {
    id: 'g16',
    category: 'Survival',
    title: 'Laundry lives in the tunnels',
    shortDesc: 'Where and how to do your wash.',
    content: '<p>Dormside laundry rooms sit in the tunnel system beneath the residence halls.</p>',
    icon: 'WashingMachine',
    facts: [
      { icon: 'MapPin', lead: 'Where', detail: 'Dormside laundry rooms are in the tunnel system beneath the residence halls.' },
      { icon: 'AlarmClock', lead: 'Set an alarm', detail: 'Students will move your clothes if a machine sits finished, so come back promptly.' },
      { icon: 'Droplet', lead: 'Detergent matters', detail: 'Do not use Tide pods or beaded detergent in these machines.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g17',
    category: 'Survival',
    title: 'What you cannot bring to a dorm',
    shortDesc: 'Before you pack, read this.',
    content: '<p>RIT housing has firm rules about appliances and belongings.</p>',
    icon: 'Ban',
    url: 'https://www.rit.edu/housing/',
    facts: [
      { icon: 'Flame', lead: 'No cooking appliances', detail: 'Nothing but an auto-shutoff coffee or tea maker — no hot plates, air fryers, or toasters.' },
      { icon: 'CookingPot', lead: 'No kitchen access', detail: 'Dorms have none without a dietitian accommodation, and you still cannot opt out of the meal plan.' },
      { icon: 'PawPrint', lead: 'Other restrictions', detail: 'No substances, no pets except approved ESAs and fish, no tapestries or ceiling attachments.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g18',
    category: 'Survival',
    title: 'Mail and packages',
    shortDesc: 'Where your deliveries land.',
    content: '<p>Student mail routes to one of three campus mailrooms based on your housing.</p>',
    icon: 'Package',
    stats: [{ value: '3', label: 'campus mailrooms' }],
    facts: [
      { icon: 'MapPin', lead: 'Three locations', detail: 'The DSP mail office on dormside, one at RIT Inn, and the Global Village mail office.' },
      { icon: 'Navigation', lead: 'Use the closest one', detail: 'Your packages route to the mailroom nearest your housing assignment.' },
      { icon: 'FileText', lead: 'Format matters', detail: 'RIT publishes a specific address format for student mail — follow it or your package may misroute.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g19',
    category: 'Survival',
    title: 'Parking on campus',
    shortDesc: 'Permits, lots, and exceptions.',
    content: '<p>Parking on campus requires a permit, and lots are assigned by housing.</p>',
    icon: 'Car',
    facts: [
      { icon: 'Ticket', lead: 'Permit required', detail: 'You must buy a permit for the semester or year to park on campus.' },
      { icon: 'SquareParking', lead: 'Lots are assigned', detail: 'Dorm residents park in lots B and K; Residence Hall A, Kate Gleason, and Frances Baker residents can use lot C.' },
      { icon: 'CircleSlash', lead: 'Some housing excludes parking', detail: '175 Jefferson and Perkins Green residents cannot park on the main campus.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g20',
    category: 'Survival',
    title: 'Free food and clothing',
    shortDesc: 'Resources at no cost.',
    content: '<p>RIT offers a free food pantry and a free professional-clothing closet.</p>',
    icon: 'HeartHandshake',
    url: 'https://www.rit.edu/lead/rit-foodshare',
    facts: [
      { icon: 'ShoppingBasket', lead: 'RIT FoodShare', detail: 'A free food pantry open to the whole community, including vegan and gluten-free items.' },
      { icon: 'Shirt', lead: 'Bern\'s Closet', detail: 'Free professional clothing for interviews and career fairs, plus winter coats, hats, gloves, and boots.' },
      { icon: 'CheckCircle', lead: 'No cost, no questions', detail: 'Both are free to community members; you just check out at the front desk.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g21',
    category: 'Survival',
    title: 'Getting your account working',
    shortDesc: 'Passwords, Duo, and IT help.',
    content: '<p>RIT Start is where you set up your account, network devices, and Duo.</p>',
    icon: 'Key',
    facts: [
      { icon: 'Settings', lead: 'RIT Start', detail: 'Where you change your password, add devices to the network, and set up Duo.' },
      { icon: 'ShieldCheck', lead: 'Duo is mandatory', detail: 'Two-factor authentication is required for myCourses, SIS, and every secure RIT site.' },
      { icon: 'LifeBuoy', lead: 'Help Center', detail: 'Submit a ticket at help.rit.edu when something breaks, rather than emailing individual staff.' },
    ],
    lastVerified: '2026-09-18',
  },

  // ── Navigation ────────────────────────────────────────────
  {
    id: 'g22',
    category: 'Navigation',
    title: 'The tunnel system',
    shortDesc: 'Two networks beneath campus.',
    content: '<p>RIT has two separate underground tunnel networks — one for dorms, one for academics.</p>',
    icon: 'ArrowDownCircle',
    mapLocationId: 'tunnels',
    stats: [{ value: '2', label: 'separate networks' }],
    facts: [
      { icon: 'Split', lead: 'Two networks', detail: 'One connects the residence halls, the other connects academic buildings — they are not joined.' },
      { icon: 'Store', lead: 'What\'s down there', detail: 'The dorm tunnels hold the post office, laundry, and convenience stores.' },
      { icon: 'Snowflake', lead: 'Winter route', detail: 'Download the tunnel map before the first snow; it is the difference between a five-minute walk and a cold one.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g23',
    category: 'Navigation',
    title: 'Reserve a study room',
    shortDesc: 'Book space before finals fill it.',
    content: '<p>Wallace Library and NTID offer bookable study rooms.</p>',
    icon: 'CalendarCheck',
    url: 'https://reserve.rit.edu/',
    stats: [{ value: '30+', label: 'bookable rooms in Wallace' }],
    facts: [
      { icon: 'Library', lead: 'Wallace Library', detail: 'More than thirty study rooms, bookable up to two weeks ahead for groups or solo work.' },
      { icon: 'Building', lead: 'Also NTID', detail: 'Reservable spaces exist on the NTID side as well.' },
      { icon: 'Clock', lead: 'Book early', detail: 'Rooms fill fast during midterms and finals weeks.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g24',
    category: 'Navigation',
    title: 'Getting off campus',
    shortDesc: 'Shuttles, apps, and limits.',
    content: '<p>Free shuttles loop to nearby Henrietta stores; downtown needs a car.</p>',
    icon: 'Bus',
    facts: [
      { icon: 'Bus', lead: 'Free shuttles', detail: 'Loop to Wegmans, Target, and Marketplace Mall in Henrietta at no cost.' },
      { icon: 'Smartphone', lead: 'Track them live', detail: 'The Tripshot app shows shuttle locations, routes, and service updates in real time.' },
      { icon: 'Car', lead: 'Downtown needs a car', detail: 'Shuttles stay local to Henrietta; South Wedge, Park Avenue, and the Public Market need a car or rideshare.' },
    ],
    lastVerified: '2026-09-18',
  },

  // ── Lore ──────────────────────────────────────────────────
  {
    id: 'g25',
    category: 'Lore',
    title: 'Brick City',
    shortDesc: 'Why it earned the nickname.',
    content: '<p>RIT\'s campus was built in the late 1960s under one unified brick plan.</p>',
    icon: 'Landmark',
    facts: [
      { icon: 'Building2', lead: 'One design', detail: 'Campus was built in the late 1960s with a single unified brick architectural plan.' },
      { icon: 'Sparkles', lead: 'The nickname stuck', detail: 'It earned RIT the name Brick City, now also the name of homecoming weekend.' },
      { icon: 'Search', lead: 'Look closer', detail: 'Student-run projects like the RIT Iceberg and Tunnelvisionaries document the campus\'s stranger corners.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g26',
    category: 'Lore',
    title: 'Deaf culture at RIT',
    shortDesc: 'NTID and how to be a good peer.',
    content: '<p>RIT hosts NTID, the first and largest technical college for Deaf students.</p>',
    icon: 'Hand',
    url: 'https://www.rit.edu/ntid/',
    stats: [{ value: '1st', label: 'and largest technical college for Deaf students' }],
    facts: [
      { icon: 'GraduationCap', lead: 'NTID is here', detail: 'The National Technical Institute for the Deaf shares this campus; you will have Deaf and hard-of-hearing classmates.' },
      { icon: 'MessageCircle', lead: 'Talk to the person', detail: 'If someone has an interpreter, speak to them, not the interpreter, and get attention with a hand wave, never a clap or snap.' },
      { icon: 'Hand', lead: 'Learn some sign', detail: 'No Voice Zone meets weekly at every skill level — learn from Deaf people and Deaf resources when you can.' },
    ],
    tip: 'Not all Deaf and hard-of-hearing people sign, and not all read lips. There is no single way people communicate.',
    lastVerified: '2026-09-18',
  },
  {
    id: 'g27',
    category: 'Lore',
    title: 'Traditions worth showing up for',
    shortDesc: 'The events that define the year.',
    content: '<p>A few campus traditions are worth putting on your calendar.</p>',
    icon: 'PartyPopper',
    facts: [
      { icon: 'Sparkles', lead: 'TigerFest', detail: 'A week-long welcome festival opening the fall semester, with fireworks.' },
      { icon: 'Home', lead: 'Brick City Homecoming', detail: 'Mid-October — families, alumni, and college-specific mixers where you can meet faculty outside class.' },
      { icon: 'Lightbulb', lead: 'Imagine RIT', detail: 'A spring innovation festival with hundreds of student exhibits across the entire campus.' },
    ],
    lastVerified: '2026-09-18',
  },

  // ── MCET ──────────────────────────────────────────────────
  {
    id: 'g28',
    category: 'MCET',
    title: 'The 45-mile rule',
    shortDesc: 'Housing math for co-op season.',
    content: '<p>RIT housing lets you pause your contract for co-op only past a distance threshold.</p>',
    icon: 'Ruler',
    stats: [
      { value: '45 mi', label: 'minimum distance to qualify' },
      { value: '50%', label: 'fall rent to hold your room' },
    ],
    facts: [
      { icon: 'Home', lead: 'RIT housing', detail: 'Break or pause your contract for free, but only if the co-op is more than 45 miles from campus.' },
      { icon: 'FileText', lead: 'Private complexes', detail: 'Twelve-month leases like Park Point, Province, and Apex will not pause — you must find a subletter.' },
      { icon: 'CalendarX', lead: 'Spring is harder', detail: 'No hold option in spring, and hundreds of students leave at once, flooding the sublet market.' },
    ],
    tip: 'Local or virtual co-ops do not qualify — you keep paying your normal contract.',
    lastVerified: '2026-09-18',
  },
  {
    id: 'g29',
    category: 'MCET',
    title: 'Immersions and minors',
    shortDesc: 'The required outside-your-major courses.',
    content: '<p>Every RIT student completes an immersion; minors are optional add-ons.</p>',
    icon: 'Library',
    url: 'https://www.rit.edu/study/immersions-and-minors',
    facts: [
      { icon: 'BookOpen', lead: 'Immersion is required', detail: 'Every RIT student completes a set of courses in a subject outside their major.' },
      { icon: 'Plus', lead: 'Minors are optional', detail: 'They complement your major and signal depth to employers.' },
      { icon: 'Users', lead: 'There is a fair', detail: 'The Immersion and Minor Fair runs each fall, and you can sign up on the spot.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g30',
    category: 'MCET',
    title: 'Study abroad',
    shortDesc: 'It works for MCET too.',
    content: '<p>With the right plan, any RIT major can study abroad.</p>',
    icon: 'Globe',
    stats: [
      { value: '600+', label: 'programs' },
      { value: '60+', label: 'countries' },
    ],
    facts: [
      { icon: 'GraduationCap', lead: 'Every major qualifies', detail: 'With the right plan, any RIT major can study abroad — start with your advisor.' },
      { icon: 'Building2', lead: 'Global campuses', detail: 'RIT Dubai, RIT Croatia, and RIT Kosovo are the most seamless option for staying on track.' },
      { icon: 'Users', lead: 'Go to a 101 session', detail: 'Led by students who have returned, offered several times a week.' },
    ],
    lastVerified: '2026-09-18',
  },

  // ── Safety ────────────────────────────────────────────────
  {
    id: 'g31',
    category: 'Safety',
    title: 'TigerSafe and blue lights',
    shortDesc: 'Get help fast, anywhere.',
    content: '<p>The TigerSafe app and campus blue-light phones connect you to Public Safety instantly.</p>',
    icon: 'Shield',
    facts: [
      { icon: 'Smartphone', lead: 'Virtual blue light', detail: 'The TigerSafe app summons immediate help and shares your location with Public Safety.' },
      { icon: 'Footprints', lead: 'Request a walk', detail: 'You can ask for a Public Safety officer to walk you to your dorm or class at any hour.' },
      { icon: 'Phone', lead: 'Save the numbers', detail: 'Emergency 585-475-3333, text line 585-205-8333 — put both in your phone before you need them.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g32',
    category: 'Safety',
    title: 'Walking safely at night',
    shortDesc: 'Simple habits after dark.',
    content: '<p>A few habits keep late walks across campus safer.</p>',
    icon: 'Footprints',
    facts: [
      { icon: 'Lightbulb', lead: 'Stay on lit paths', detail: 'The Quarter Mile and the center of campus are the best-lit routes; some paths are much darker.' },
      { icon: 'Headphones', lead: 'Keep one ear open', detail: 'If you wear headphones alone, leave one out or turn off noise cancellation.' },
      { icon: 'MapPin', lead: 'Share your location', detail: 'With people you trust, or just tell someone when you expect to be back.' },
    ],
    lastVerified: '2026-09-18',
  },

  // ── Accessibility ─────────────────────────────────────────
  {
    id: 'g33',
    category: 'Accessibility',
    title: 'Disability Services',
    shortDesc: 'Accommodations start here.',
    content: '<p>The Disability Services Office (DSO) processes academic, housing, and dining accommodations.</p>',
    icon: 'Accessibility',
    url: 'https://www.rit.edu/disabilityservices/',
    facts: [
      { icon: 'Laptop', lead: 'myDSO', detail: 'The portal where you request academic, housing, and dining accommodations.' },
      { icon: 'Clock', lead: 'Start early', detail: 'Accommodations take time to process — do not wait until a deadline is already a problem.' },
      { icon: 'Home', lead: 'Housing and dining too', detail: 'Accommodations cover more than exams; severe food allergies can qualify for a reduced meal plan or private kitchen access.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g34',
    category: 'Accessibility',
    title: 'Interpreters and captioning',
    shortDesc: 'Access beyond the classroom.',
    content: '<p>Access Services provides interpreting and real-time captioning across campus.</p>',
    icon: 'Hand',
    facts: [
      { icon: 'Captions', lead: 'Access Services', detail: 'Request interpreters or real-time captioning for classes, meetings, and events.' },
      { icon: 'CalendarDays', lead: 'Not just for class', detail: 'Coverage extends to campus events and club meetings, not only lectures.' },
      { icon: 'MessageCircle', lead: 'Tiger Chat', detail: 'An app built to make quick back-and-forth with Deaf students easier when signing is not an option.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g35',
    category: 'Accessibility',
    title: 'Spectrum Support Program',
    shortDesc: 'For autistic and neurodivergent students.',
    content: '<p>The Spectrum Support Program offers coaching and community alongside accommodations.</p>',
    icon: 'Users',
    url: 'https://www.rit.edu/spectrumsupport/apply',
    facts: [
      { icon: 'HeartHandshake', lead: 'Who it serves', detail: 'Support and community for autistic and neurodivergent students.' },
      { icon: 'Compass', lead: 'What it offers', detail: 'Coaching, peer connection, and structured support alongside academic accommodations.' },
      { icon: 'Split', lead: 'Separate from DSO', detail: 'You can use both — they serve different needs.' },
    ],
    lastVerified: '2026-09-18',
  },
  {
    id: 'g36',
    category: 'Accessibility',
    title: 'Getting around campus accessibly',
    shortDesc: 'Elevators, routes, and floor plans.',
    content: '<p>Student and official tools map accessible routes across campus.</p>',
    icon: 'MapPin',
    facts: [
      { icon: 'Map', lead: 'CampusPulse access map', detail: 'A student-built interactive map of elevators and accessible routes across campus.' },
      { icon: 'FileText', lead: 'Floor plans', detail: 'Official building and residence hall floor plans are published, some behind RIT login.' },
      { icon: 'Home', lead: 'Ask about housing', detail: 'Accessible room layouts exist, including units with private bathrooms and kitchens.' },
    ],
    lastVerified: '2026-09-18',
  }
];
