export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timeAgo: string;
  upvotes: number;
}

export interface Post {
  id: string;
  author: string;
  handle: string;
  authorAvatar: string;
  college: string;
  department: string;
  content: string;
  upvotes: number;
  commentsCount: number;
  repostsCount?: number;
  likesCount?: number;
  timeAgo: string;
  tag?: string;
  isHot?: boolean;
  gradientBg?: string;
  likedBy?: string;
  comments?: PostComment[];
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  college: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  online?: boolean;
  messages: {
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
  }[];
}

export interface CampusStory {
  id: string;
  title: string;
  handle: string;
  location: string;
  avatar: string;
  activeCount: string;
  hasUnseen?: boolean;
  content: string;
  timeAgo: string;
  gradient: string;
}

export const CAMPUS_STORIES: CampusStory[] = [
  {
    id: "s0",
    title: "Your Story",
    handle: "@you",
    location: "Aggarwal College",
    avatar: "👨‍💻",
    activeCount: "Add to Story",
    hasUnseen: false,
    content: "Tap to broadcast what's happening around you right now on campus radar!",
    timeAgo: "Now",
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
  },
  {
    id: "s1",
    title: "Central Library",
    handle: "@library_2f",
    location: "2nd Floor Silent Zone",
    avatar: "📚",
    activeCount: "84 active",
    hasUnseen: true,
    content: "AC in reading hall 3 is finally fixed. Power sockets near table 12 are all working! ☕📖",
    timeAgo: "15m ago",
    gradient: "from-violet-600 via-purple-600 to-pink-500",
  },
  {
    id: "s2",
    title: "Back Canteen",
    handle: "@canteen_adda",
    location: "Campus Food Court",
    avatar: "☕",
    activeCount: "142 active",
    hasUnseen: true,
    content: "Fresh batch of hot samosas and adrak chai ready. Lines moving fast at counter 2! 🥟🔥",
    timeAgo: "32m ago",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
  },
  {
    id: "s3",
    title: "Hostel 2",
    handle: "@hostel_chronicles",
    location: "Block C Wing",
    avatar: "🌙",
    activeCount: "59 active",
    hasUnseen: true,
    content: "Late night Maggi tournament in Room 304. Bring your own bowl! 🍜🎮",
    timeAgo: "1h ago",
    gradient: "from-indigo-900 via-slate-800 to-blue-950",
  },
  {
    id: "s4",
    title: "YMCA Tech",
    handle: "@ymca_coders",
    location: "JC Bose UST",
    avatar: "💻",
    activeCount: "110 active",
    hasUnseen: true,
    content: "Hackathon registrations open till midnight. Teammates needed for Web3 track! 🚀",
    timeAgo: "2h ago",
    gradient: "from-cyan-600 via-teal-600 to-emerald-600",
  },
  {
    id: "s5",
    title: "Sector 15",
    handle: "@student_adda",
    location: "Faridabad Market",
    avatar: "🍕",
    activeCount: "220 active",
    hasUnseen: false,
    content: "Crowd at cold coffee spot is insane. Evening college vibes peak right now. ✨",
    timeAgo: "3h ago",
    gradient: "from-rose-500 via-pink-600 to-amber-500",
  },
  {
    id: "s6",
    title: "Gym Adda",
    handle: "@campus_fitness",
    location: "Sports Wing",
    avatar: "💪",
    activeCount: "38 active",
    hasUnseen: false,
    content: "New dumbbells arrived. Chest day squad assemble at 5 PM! 🏋️‍♂️",
    timeAgo: "4h ago",
    gradient: "from-fuchsia-600 to-indigo-700",
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Night Owl CSE",
    handle: "nightowl.cse",
    authorAvatar: "🦉",
    college: "Aggarwal College",
    department: "Faridabad • Sector 2",
    content: "Who decided to put the Computer Networks lab exam at 8:30 AM on a Monday? The Wi-Fi in Block C didn't even wake up yet 💀",
    upvotes: 84,
    commentsCount: 29,
    repostsCount: 14,
    likesCount: 184,
    likedBy: "mukul_cse",
    timeAgo: "12m ago",
    tag: "#examstress",
    isHot: true,
    gradientBg: "from-blue-700 via-indigo-700 to-purple-800",
    comments: [
      { id: "c1-1", author: "lab_assistant_anon", avatar: "🧪", text: "Even the server rack was yawning at 8:25 AM.", timeAgo: "8m ago", upvotes: 24 },
      { id: "c1-2", author: "coffee.addict", avatar: "☕", text: "Took exam on 2% battery and 0% hope.", timeAgo: "5m ago", upvotes: 18 },
    ],
  },
  {
    id: "p2",
    author: "Canteen Critic",
    handle: "canteen.critic",
    authorAvatar: "🦬",
    college: "Aggarwal College",
    department: "Faridabad • Food Court",
    content: "The samosas at the back canteen today hit differently. Best ₹15 spent this semester. Don't tell the hostel mess committee.",
    upvotes: 142,
    commentsCount: 38,
    repostsCount: 26,
    likesCount: 295,
    likedBy: "priya_s",
    timeAgo: "45m ago",
    tag: "#canteen",
    isHot: true,
    gradientBg: "from-amber-600 via-orange-600 to-rose-700",
    comments: [
      { id: "c2-1", author: "hostel_foodie", avatar: "🥟", text: "With green mint chutney or sweet tamarind? Details matter!", timeAgo: "30m ago", upvotes: 31 },
    ],
  },
  {
    id: "p3",
    author: "Silent Coder",
    handle: "silent.coder",
    authorAvatar: "🦊",
    college: "Aggarwal College",
    department: "Faridabad • Central Library",
    content: "To the girl wearing the navy blue oversized hoodie in the library 3rd floor reading 'Clean Code': you have impeccable taste in books. Please share chapter 4 notes.",
    upvotes: 215,
    commentsCount: 54,
    repostsCount: 42,
    likesCount: 480,
    likedBy: "rohan_bba",
    timeAgo: "1h ago",
    tag: "#confession",
    isHot: true,
    gradientBg: "from-fuchsia-700 via-pink-700 to-rose-600",
    comments: [
      { id: "c3-1", author: "library_warden_anon", avatar: "👀", text: "Library is for silent reading, not romance algorithms!", timeAgo: "45m ago", upvotes: 49 },
      { id: "c3-2", author: "hoodie_girl_maybe", avatar: "🙈", text: "Clean Code was a trap, I'm just hiding my phone behind it lol", timeAgo: "22m ago", upvotes: 88 },
    ],
  },
  {
    id: "p4",
    author: "Lab Rat",
    handle: "ece.soldier",
    authorAvatar: "🧪",
    college: "Aggarwal College",
    department: "Faridabad • Lab 204",
    content: "Whoever left their scientific calculator (Casio fx-991EX) in Lab 204, I submitted it to Sharma Sir's desk. You're welcome.",
    upvotes: 49,
    commentsCount: 6,
    repostsCount: 5,
    likesCount: 88,
    likedBy: "kavya_m",
    timeAgo: "2h ago",
    tag: "#lostandfound",
    gradientBg: "from-teal-700 via-cyan-800 to-blue-900",
    comments: [],
  },
  {
    id: "p5",
    author: "Hostel Survivor",
    handle: "block_c_hostel",
    authorAvatar: "👻",
    college: "Aggarwal College",
    department: "Faridabad • Hostel Wing",
    content: "Hostel 2 water heater is officially working again after 3 weeks of arctic showers. Nature is finally healing.",
    upvotes: 98,
    commentsCount: 17,
    repostsCount: 12,
    likesCount: 176,
    likedBy: "aman_mech",
    timeAgo: "3h ago",
    tag: "#hostel",
    gradientBg: "from-indigo-800 via-blue-900 to-slate-900",
    comments: [],
  },
  {
    id: "p6",
    author: "Gym Bro 404",
    handle: "gains.department",
    authorAvatar: "💪",
    college: "Aggarwal College",
    department: "Faridabad • Sports Complex",
    content: "Anyone going to the campus gym around 5 PM? Need a spotter for bench press, promise I won't drop the barbell on your sneakers.",
    upvotes: 31,
    commentsCount: 11,
    repostsCount: 2,
    likesCount: 64,
    likedBy: "mukul_cse",
    timeAgo: "4h ago",
    tag: "#gym",
    gradientBg: "from-violet-800 via-indigo-900 to-purple-950",
    comments: [],
  },
];

export const TRENDING_TAGS = [
  { tag: "#confession", postsCount: "1.4k yaks", isRising: true },
  { tag: "#examstress", postsCount: "940 yaks", isRising: true },
  { tag: "#canteen", postsCount: "820 yaks" },
  { tag: "#hostel", postsCount: "630 yaks" },
  { tag: "#gym", postsCount: "410 yaks" },
  { tag: "#lostandfound", postsCount: "250 yaks" },
];

export const ACTIVE_COLLEGE_USERS = [
  { name: "Mukul", handle: "mukul_cse", role: "CSE 3rd Year", avatar: "👨‍💻", karma: 1840, online: true },
  { name: "Priya S.", handle: "priya_s", role: "ECE 2nd Year", avatar: "👩‍🔬", karma: 1420, online: true },
  { name: "Rohan V.", handle: "rohan_bba", role: "BBA Finalist", avatar: "📈", karma: 980, online: false },
  { name: "Kavya M.", handle: "kavya_m", role: "BCA 1st Year", avatar: "🎨", karma: 650, online: true },
  { name: "Aman K.", handle: "aman_mech", role: "Mech Engineer", avatar: "⚙️", karma: 1210, online: false },
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: "c1",
    name: "Mukul (CSE 3rd Year)",
    avatar: "👨‍💻",
    college: "Aggarwal Clg",
    lastMessage: "Did you solve question 4 of Computer Networks assignment?",
    time: "2m ago",
    unreadCount: 2,
    online: true,
    messages: [
      { id: "m1", sender: "them", text: "Hey! Are you studying for CN tomorrow?", time: "10:14 AM" },
      { id: "m2", sender: "me", text: "Yeah trying to wrap subnetting right now.", time: "10:15 AM" },
      { id: "m3", sender: "them", text: "Did you solve question 4 of Computer Networks assignment?", time: "10:17 AM" },
    ],
  },
  {
    id: "c2",
    name: "Silent Coder (Anon)",
    avatar: "🦊",
    college: "Aggarwal Clg",
    lastMessage: "Thanks for upvoting my confession! 😂",
    time: "1h ago",
    online: false,
    messages: [
      { id: "m4", sender: "them", text: "Thanks for upvoting my confession! 😂", time: "09:30 AM" },
    ],
  },
  {
    id: "c3",
    name: "Priya (Library 3F)",
    avatar: "👩‍🔬",
    college: "JC Bose UST",
    lastMessage: "Will share the notes PDF before 6 PM.",
    time: "3h ago",
    online: true,
    messages: [
      { id: "m5", sender: "them", text: "Will share the notes PDF before 6 PM.", time: "07:45 AM" },
    ],
  },
];
