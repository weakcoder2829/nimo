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
  authorAvatar: string;
  college: string;
  department: string;
  content: string;
  upvotes: number;
  commentsCount: number;
  timeAgo: string;
  tag?: string;
  isHot?: boolean;
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

export const INITIAL_POSTS: Post[] = [
  {
    id: "p1",
    author: "Night Owl CSE",
    authorAvatar: "🦉",
    college: "Aggarwal Clg",
    department: "CSE Dep",
    content: "Who decided to put the Computer Networks lab exam at 8:30 AM on a Monday? The Wi-Fi in Block C didn't even wake up yet 💀",
    upvotes: 84,
    commentsCount: 29,
    timeAgo: "12m ago",
    tag: "#examstress",
    isHot: true,
    comments: [
      { id: "c1-1", author: "Lab Assistant Anon", avatar: "🧪", text: "Even the server rack was yawning at 8:25 AM.", timeAgo: "8m ago", upvotes: 24 },
      { id: "c1-2", author: "Coffee Addict", avatar: "☕", text: "Took exam on 2% battery and 0% hope.", timeAgo: "5m ago", upvotes: 18 },
    ],
  },
  {
    id: "p2",
    author: "Anonymous Yak",
    authorAvatar: "🦬",
    college: "Aggarwal Clg",
    department: "Campus Wide",
    content: "The samosas at the back canteen today hit differently. Best ₹15 spent this semester. Don't tell the hostel mess committee.",
    upvotes: 142,
    commentsCount: 38,
    timeAgo: "45m ago",
    tag: "#canteen",
    isHot: true,
    comments: [
      { id: "c2-1", author: "Hostel Foodie", avatar: "🥟", text: "With green mint chutney or sweet tamarind? Details matter!", timeAgo: "30m ago", upvotes: 31 },
    ],
  },
  {
    id: "p3",
    author: "Silent Coder",
    authorAvatar: "🦊",
    college: "Aggarwal Clg",
    department: "CSE Dep",
    content: "To the girl wearing the navy blue oversized hoodie in the library 3rd floor reading 'Clean Code': you have impeccable taste in books. Please share chapter 4 notes.",
    upvotes: 215,
    commentsCount: 54,
    timeAgo: "1h ago",
    tag: "#confession",
    isHot: true,
    comments: [
      { id: "c3-1", author: "Library Warden Anon", avatar: "👀", text: "Library is for silent reading, not romance algorithms!", timeAgo: "45m ago", upvotes: 49 },
      { id: "c3-2", author: "Hoodie Girl Maybe", avatar: "🙈", text: "Clean Code was a trap, I'm just hiding my phone behind it lol", timeAgo: "22m ago", upvotes: 88 },
    ],
  },
  {
    id: "p4",
    author: "Lab Rat",
    authorAvatar: "🧪",
    college: "Aggarwal Clg",
    department: "ECE Dep",
    content: "Whoever left their scientific calculator (Casio fx-991EX) in Lab 204, I submitted it to Sharma Sir's desk. You're welcome.",
    upvotes: 49,
    commentsCount: 6,
    timeAgo: "2h ago",
    tag: "#lostandfound",
    comments: [],
  },
  {
    id: "p5",
    author: "Hostel Survivor",
    authorAvatar: "👻",
    college: "Aggarwal Clg",
    department: "Mech Dep",
    content: "Hostel 2 water heater is officially working again after 3 weeks of arctic showers. Nature is finally healing.",
    upvotes: 98,
    commentsCount: 17,
    timeAgo: "3h ago",
    tag: "#hostel",
    comments: [],
  },
  {
    id: "p6",
    author: "Gym Bro 404",
    authorAvatar: "💪",
    college: "Aggarwal Clg",
    department: "BBA Dep",
    content: "Anyone going to the campus gym around 5 PM? Need a spotter for bench press, promise I won't drop the barbell on your sneakers.",
    upvotes: 31,
    commentsCount: 11,
    timeAgo: "4h ago",
    tag: "#gym",
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
  { name: "Mukul", role: "CSE 3rd Year", avatar: "👨‍💻", karma: 1840, online: true },
  { name: "Priya S.", role: "ECE 2nd Year", avatar: "👩‍🔬", karma: 1420, online: true },
  { name: "Rohan V.", role: "BBA Finalist", avatar: "📈", karma: 980, online: false },
  { name: "Kavya M.", role: "BCA 1st Year", avatar: "🎨", karma: 650, online: true },
  { name: "Aman K.", role: "Mech Engineer", avatar: "⚙️", karma: 1210, online: false },
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
