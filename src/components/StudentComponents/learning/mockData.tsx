export interface Course {
    id: number;
    title: string;
    author: string;
    originalPrice: number;
    discountPrice: number;
    finalPrice: number;
    status: "waitingPaid" | "completed";
  }
  
  export const courses: Course[] = [
    {
      id: 1,
      title: "Yoga for Kids Relaxation, Emotional Well-being With Poses",
      author: "Ngô Thị Tuyết Trúc",
      originalPrice: 499000,
      discountPrice: 35000,
      finalPrice: 464000,
      status: "waitingPaid",
    },
    {
      id: 2,
      title: "Beginner Guitar Lessons",
      author: "Trần Văn Hùng",
      originalPrice: 599000,
      discountPrice: 50000,
      finalPrice: 549000,
      status: "waitingPaid",
    },
    {
      id: 3,
      title: "Advanced Java Programming",
      author: "Lê Minh Phú",
      originalPrice: 799000,
      discountPrice: 100000,
      finalPrice: 699000,
      status: "completed",
    },
  ];
  