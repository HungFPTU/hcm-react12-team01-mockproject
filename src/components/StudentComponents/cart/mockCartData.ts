export interface MockCartData {
    id: number;
    title: string;
    author: string;
    price: number;
    discount: number;
    finalPrice: number;
    image: string;
}

export const cartCourses: MockCartData[] = [
    {
        id: 1,
        title: "Financial Analysis and Financial Modeling using MS Excel",
        author: "Ngô Thị Tuyết Trúc",
        price: 599000,
        discount: 137770,
        finalPrice: 461230,
        image: "https://via.placeholder.com/80", // Placeholder image
    },
    {
        id: 2,
        title: "Beginner Guitar Lessons",
        author: "Trần Văn Hùng",
        price: 549000,
        discount: 54900,
        finalPrice: 494100,
        image: "https://via.placeholder.com/80", // Placeholder image
    },
    {
        id: 3,
        title: "Advanced Java Programming",
        author: "Lê Minh Phú",
        price: 799000,
        discount: 100000,
        finalPrice: 699000,
        image: "https://via.placeholder.com/80", // Placeholder image
    },
];
