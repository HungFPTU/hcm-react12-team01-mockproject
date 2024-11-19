import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Rate, Tooltip, Col, Row, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { CourseService } from "../../services/CourseService/course.service";
import { GetPublicCourseResponse } from "../../model/admin/response/Course.response";
import { CartService } from "../../services/cart/cart.service";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";

interface CourseProps {
    pageSize?: number;
    pageNum?: number;
}

const fetchCoursePublic = async (searchCondition = {}, pageInfo = { pageNum: 1, pageSize: 8 }) => {
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

const CategoryTable: React.FC<CourseProps> = ({ pageSize = 10, pageNum = 1 }) => {
    const [courses, setCourses] = useState<GetPublicCourseResponse | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(pageNum);
    const [pageSizeState, setPageSizeState] = useState<number>(pageSize);
    const navigate = useNavigate();
    const hasMounted = useRef(false);
    const { getCartCount } = useCart();


    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;
        const checkLoginStatus = () => {
            const user = localStorage.getItem("user");
            setIsLoggedIn(!!user);
        };
        checkLoginStatus();
    }, []);

    useEffect(() => {

        const fetchCourses = async () => {
            try {
                const coursesData = await fetchCoursePublic({}, { pageNum: currentPage, pageSize: pageSizeState });
                setCourses(coursesData.data);
                setError(null);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setError("Unable to fetch courses. Please try again later.");
            }
        };

        fetchCourses();
    }, [currentPage, pageSizeState]);

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSizeState(pageSize);
    };

    const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0
            ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
            : `${remainingMinutes}p`;
    };

    const handleAddToCart = async (course: any) => {
        try {
            if (course.is_in_cart) {
                navigate("/cart");
            } else {
                const response = await CartService.CreateCart({ course_id: course._id });
                if (response.data.data && response.data.data._id) {
                    toast.success("Course added to cart successfully!");
                    navigate("/cart");
                    getCartCount();
                } else {
                    console.error("Failed to add to cart");
                    toast.error("Failed to add course to cart. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error handling cart operation:", error);
        }
    };

    const handleButtonClick = (course: any) => {
        if (!isLoggedIn) {
            toast.warning("Please login to add course to cart");
        } else {
            handleAddToCart(course);
        }
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
        <div className="container mx-auto px-4">
            <Row gutter={[16, 24]}>
                {courses.pageData.map((course) => (
                    <Col
                        key={course._id}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}
                    >
                        <Card
                            style={{
                                width: "100%",
                                maxWidth: "280px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: "30px",
                            }}
                            cover={
                                <Link to={`/course/${course._id}`}>
                                    <div className="relative">
                                        {course.image_url ? (
                                            <img
                                                alt={course.name}
                                                src={course.image_url}
                                                className="w-full"
                                                style={{
                                                    height: "180px",
                                                    objectFit: "cover",
                                                    borderRadius: "30px 30px 0 0",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="w-full bg-gray-200 flex items-center justify-center"
                                                style={{
                                                    height: "180px",
                                                    borderRadius: "30px 30px 0 0",
                                                }}
                                            >
                                                <p className="text-gray-500">No Image Available</p>
                                            </div>
                                        )}
                                    </div>
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
                            <Tooltip placement="top" title={course.name}>
                                <h2
                                    className="text-lg font-semibold mb-2 truncate"
                                    style={{ maxWidth: "250px" }}
                                >
                                    {course.name}
                                </h2>
                            </Tooltip>
                            <div className="flex items-center mb-3">
                                <span className="text-md font-medium">
                                    Instructor: {course.instructor_name}
                                </span>
                            </div>
                            <Rate disabled defaultValue={course.average_rating} className="mb-3" />
                            <div className="flex items-center mt-2">
                                {course.discount ? (
                                    <>
                                        <p className="discounted-price text-lg text-red-500">
                                            -{course.discount}% Disc.
                                        </p>
                                        <p
                                            className="original-price text-lg font-medium text-red-700"
                                            style={{ textDecoration: "line-through", opacity: 0.5 }}
                                        >
                                            {formatPrice(course.price)}
                                        </p>
                                    </>
                                ) : (
                                    <p className="price text-lg">{formatPrice(course.price)}</p>
                                )}
                            </div>
                            <div>
                                {course?.is_purchased ? (
                                    <Link to={`/course/${course._id}`}>
                                        <Button
                                            type="primary"
                                            style={{
                                                backgroundColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                borderColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                color: "white",
                                                width: "100%",
                                            }}
                                        >
                                            Go To Course
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button
                                        type="primary"
                                        style={{
                                            backgroundColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                            borderColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                            color: "white",
                                            width: "100%",
                                        }}
                                        onClick={() => handleButtonClick(course)}
                                    >
                                        {course.discount && !course.is_in_cart
                                            ? `🛒 Buy ${formatPrice(course.price_paid)}`
                                            : "View Cart"}
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination
                current={currentPage}
                pageSize={pageSizeState}
                total={courses.pageData.length}

                onChange={handlePageChange}
                className="text-center mt-4 flex justify-center"
            />
        </div>
    );
};

CategoryTable.defaultProps = {
    pageSize: 10,
    pageNum: 1,
};

export default CategoryTable;
