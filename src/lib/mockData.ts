export interface Post {
  id: string;
  author: string;
  authorAvatar: string; // emoji or avatar identifier
  college: string;
  department: string;
  content: string;
  upvotes: number;
  commentsCount: number;
  timeAgo: string;
  tag?: string;
  isHot?: boolean;
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
  },
  {
    id: "p3",
    author: "Silent Coder",
    authorAvatar: "🦊",
    college: "Aggarwal Clg",
    department: "CSE Dep",
    content: "To the girl wearing the navy blue oversized hoodie in the library 3rd floor reading 'Clean Code': you have impeccable taste in books.",
    upvotes: 215,
    commentsCount: 54,
    timeAgo: "1h ago",
    tag: "#confession",
    isHot: true,
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
  },
  {
    id: "p6",
    author: "Gym Bro 404",
    authorAvatar: "💪",
    college: "Aggarwal Clg",
    department: "BBA Dep",
    content: "Anyone going to the campus gym around 5 PM? Need a spotter for bench press, promise I won't drop the barbell.",
    upvotes: 31,
    commentsCount: 11,
    timeAgo: "4h ago",
    tag: "#gym",
  },
];

export const TRENDING_TAGS = [
  { tag: "#confession", postsCount: "1.4k posts", isRising: true },
  { tag: "#examstress", postsCount: "940 posts", isRising: true },
  { tag: "#canteen", postsCount: "820 posts" },
  { tag: "#hostel", postsCount: "630 posts" },
  { tag: "#gym", postsCount: "410 posts" },
  { tag: "#lostandfound", postsCount: "250 posts" },
];

export const ACTIVE_COLLEGE_USERS = [
  { name: "Mukul", role: "CSE 3rd Year", avatar: "👨‍💻", karma: 1840, online: true },
  { name: "Sneha", role: "ECE 2nd Year", avatar: "🎨", karma: 1290, online: true },
  { name: "Aarav", role: "Mech 4th Year", avatar: "⚡", karma: 980, online: false },
  { name: "Pooja", role: "BBA 1st Year", avatar: "✨", karma: 640, online: true },
  { name: "Anonymous Yak", role: "Campus Pulse", avatar: "🦬", karma: 3420, online: true },
];

export const INITIAL_CHATS: ChatThread[] = [
  {
    id: "c1",
    name: "Mukul (CSE)",
    avatar: "👨‍💻",
    college: "Aggarwal Clg",
    lastMessage: "Did you finish the DBMS assignment questions?",
    time: "10:42 AM",
    unreadCount: 2,
    online: true,
    messages: [
      { id: "m1", sender: "them", text: "Hey! Are you in the library right now?", time: "10:38 AM" },
      { id: "m2", sender: "me", text: "Yeah, near the back stacks. What's up?", time: "10:40 AM" },
      { id: "m3", sender: "them", text: "Did you finish the DBMS assignment questions?", time: "10:42 AM" },
    ],
  },
  {
    id: "c2",
    name: "Anonymous Crush #204",
    avatar: "🦊",
    college: "Aggarwal Clg",
    lastMessage: "Haha that confession post was definitely about me 😂",
    time: "Yesterday",
    online: true,
    messages: [
      { id: "m21", sender: "them", text: "Saw your post on nimo feed!", time: "Yesterday 9:15 PM" },
      { id: "m22", sender: "them", text: "Haha that confession post was definitely about me 😂", time: "Yesterday 9:16 PM" },
    ],
  },
  {
    id: "c3",
    name: "Hostel 2 Wing B",
    avatar: "🏢",
    college: "Aggarwal Clg",
    lastMessage: "Who wants Maggi at 1 AM?",
    time: "2 days ago",
    online: false,
    messages: [
      { id: "m31", sender: "them", text: "Kettle is ready in room 214", time: "2 days ago" },
      { id: "m32", sender: "them", text: "Who wants Maggi at 1 AM?", time: "2 days ago" },
    ],
  },
  {
    id: "c4",
    name: "Gym Bros Faridabad",
    avatar: "💪",
    college: "Aggarwal Clg",
    lastMessage: "Leg day today, no excuses.",
    time: "3 days ago",
    online: false,
    messages: [
      { id: "m41", sender: "them", text: "Leg day today, no excuses.", time: "3 days ago" },
    ],
  },
];
