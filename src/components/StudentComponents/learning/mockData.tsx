export interface Course {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  sessions: number;
  lessons: number;
  duration: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    author: "Jane Doe",
    imageUrl: "https://via.placeholder.com/300x200?text=React",
    sessions: 10,
    lessons: 25,
    duration: "2h",
  },
  {
    id: 2,
    title: "Advanced Java Programming For Beginners",
    author: "Lê Minh Phú",
    imageUrl: "https://via.placeholder.com/300x200?text=Java",
    sessions: 20,
    lessons: 40,
    duration: "2h30p",
  },
  {
    id: 3,
    title: "Python for Data Science",
    author: "John Doe",
    imageUrl: "https://via.placeholder.com/300x200?text=Python",
    sessions: 12,
    lessons: 30,
    duration: "3h",
  },
  {
    id: 4,
    title: "Web Development with HTML & CSS",
    author: "Sarah Lee",
    imageUrl: "https://via.placeholder.com/300x200?text=HTML+CSS",
    sessions: 8,
    lessons: 20,
    duration: "1h30p",
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    author: "Alice Johnson",
    imageUrl: "https://via.placeholder.com/300x200?text=ML",
    sessions: 15,
    lessons: 35,
    duration: "4h",
  },
  {
    id: 6,
    title: "UI/UX Design Fundamentals",
    author: "Michael Brown",
    imageUrl: "https://via.placeholder.com/300x200?text=UI+UX",
    sessions: 10,
    lessons: 28,
    duration: "2h15p",
  },
  {
    id: 7,
    title: "DevOps Essentials",
    author: "Chris Martin",
    imageUrl: "https://via.placeholder.com/300x200?text=DevOps",
    sessions: 14,
    lessons: 32,
    duration: "3h30p",
  },
  {
    id: 8,
    title: "Cybersecurity for Beginners",
    author: "Robert Dow",
    imageUrl: "https://via.placeholder.com/300x200?text=Cybersecurity",
    sessions: 16,
    lessons: 40,
    duration: "5h",
  },
  {
    id: 9,
    title: "Agile Project Management",
    author: "Laura White",
    imageUrl: "https://via.placeholder.com/300x200?text=Agile",
    sessions: 10,
    lessons: 24,
    duration: "2h",
  },
  {
    id: 10,
    title: "Digital Marketing Strategy",
    author: "Sophia Green",
    imageUrl: "https://via.placeholder.com/300x200?text=Marketing",
    sessions: 18,
    lessons: 36,
    duration: "4h",
  },
];
