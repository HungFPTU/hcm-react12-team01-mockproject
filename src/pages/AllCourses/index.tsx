import React, { useState, useEffect } from "react";
import { Card, Button, Rate, Tooltip, Col, Row, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CourseService } from "../../services/CourseService/course.service";
import { GetPublicCourseResponse } from "../../model/admin/response/Course.response";
import { CartService } from "../../services/cart/cart.service";
import { toast } from "react-toastify";

const { Search } = Input;

interface CourseProps {
    pageSize?: number;
    pageNum?: number;
}

const fetchCoursePublic = async (searchCondition = {}, pageInfo = { pageNum: 1, pageSize: 14 }) => {
    const response = await CourseService.getPublicCourse({
        searchCondition: {
            keyword: "",
            category_id: "",
            is_delete: false,
            status: "active",
            ...searchCondition,
        },
        pageInfo: {
            ...pageInfo,
        },
    });
    return response.data;
};

const AllCourse: React.FC<CourseProps> = ({ pageSize = 14, pageNum = 1 }) => {
    const [courses, setCourses] = useState<GetPublicCourseResponse | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const user = localStorage.getItem("user");
            setIsLoggedIn(!!user);
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await fetchCoursePublic(
                    { keyword: searchKeyword },
                    { pageNum, pageSize }
                );
                setCourses(coursesData.data);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setError("Unable to fetch courses. Please try again later.");
            }
        };

        fetchCourses();
    }, [searchKeyword, pageNum, pageSize]);

    const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0
            ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
            : `${remainingMinutes}p`;
    };

    const handleAddToCart = async (course: any) => {
        if (!isLoggedIn) {
            toast.warning("Please log in to add courses to your cart.");
            navigate("/login");
            return;
        }
    
        try {
            if (course.is_in_cart) {
                navigate("/cart");
            } else {
                const response = await CartService.CreateCart({ course_id: course._id });
                if (response.data.data && response.data.data._id) {
                    toast.success("Course added to cart successfully!");
                    navigate("/cart");
                } else {
                    console.error("Failed to add to cart");
                    toast.error("Failed to add course to cart. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error handling cart operation:", error);
        }
    };

    const handleSearch = (value: string) => {
        setSearchKeyword(value);
    };

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    if (!courses?.pageData.length) {
        return (
            <div className="text-center">
                <p className="text-gray-500">No courses available.</p>
            </div>
        );
    }

    return (
        <div className="mt-20">
            <h1 className="text-center mb-7 font-bold text-4xl text-gray-800">All Courses</h1>
            <div className="container mx-auto px-4 mb-6">
                <div className="flex justify-between items-center">
                    <Search
                        placeholder="Search courses..."
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        className="w-1/3"
                    />
                </div>
            </div>
            <div className="container mx-auto px-4">
                <Row gutter={[24, 24]}>
                    {courses.pageData.map((course) => (
                        <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                className="rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                                cover={
                                    <Link to={`/course/${course._id}`}>
                                        <img
                                            alt={course.name}
                                            src={course.image_url || "/default-course.jpg"}
                                            className="rounded-t-xl"
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                    </Link>
                                }
                            >
                                <div className="course-info flex items-center justify-between mb-3">
                                    <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                                        {course.session_count} sessions
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                                        {course.lesson_count} lessons
                                    </div>
                                    <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                                        {formatTime(course.full_time)}
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    <Tooltip title={course.name}>
                                        <h2 className="text-lg font-semibold truncate">
                                            {course.name}
                                        </h2>
                                    </Tooltip>
                                    <p className="text-gray-500">{course.instructor_name}</p>
                                </div>
                                <Rate disabled defaultValue={course.average_rating} />
                                <div className="mt-3 flex items-center justify-between">
                                    {course.discount ? (
                                        <>
                                            <span className="text-red-500 font-bold">
                                                {formatPrice(course.price_paid)}
                                            </span>
                                            <span className="line-through text-gray-400">
                                                {formatPrice(course.price)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="font-bold text-lg">
                                            {formatPrice(course.price)}
                                        </span>
                                    )}
                                </div>
                                <Button
                                    type="primary"
                                    className="mt-4 w-full bg-pink-500 border-none hover:bg-pink-600"
                                    onClick={() => handleAddToCart(course)}
                                >
                                     {isLoggedIn ? (course.is_in_cart ? "View Cart" : "Add to Cart") : "Please Login or Register"}
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default AllCourse;
