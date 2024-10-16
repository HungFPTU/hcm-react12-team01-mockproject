export interface SubscribedInstructor {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
}

export const subscribedInstructors: SubscribedInstructor[] = [
  {
    id: 1,
    name: "Phan Hồng Yến Thao",
    phone: "0787867979",
    email: "yyenthao1507@gmail.com",
    avatarUrl: "https://example.com/avatar1.jpg",
  },
  // Add more mock instructors as needed
];
