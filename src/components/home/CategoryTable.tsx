import { useState, useEffect, useRef } from "react";
import { Card, Button, Rate, Tooltip, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { CourseService } from "../../services/CourseService/course.service";
import { GetPublicCourseResponse } from "../../model/admin/response/Course.response";

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
            ...searchCondition
        },
        pageInfo: {
            ...pageInfo
        }
    });
    return response.data;
};

const CategoryTable: React.FC<CourseProps> = ({ pageSize = 10, pageNum = 1 }) => {
    const [courses, setCourses] = useState<GetPublicCourseResponse | null>(null);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;
        const fetchCourses = async () => {
            try {
                const coursesData = await fetchCoursePublic();
                setCourses(coursesData.data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();
    }, []);

    const formatPrice = (price: number) => {
        return price.toLocaleString("vi-VN") + "₫";
    };

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return hours > 0
            ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
            : `${remainingMinutes}p`;
    };

    return (
        <div className="container mx-auto px-4">
            <Row gutter={[16, 24]} >
                {courses?.pageData.slice((pageNum - 1) * pageSize, pageNum * pageSize).map((course) => {
                    // const user = users[course._id];
                    return (
                        <Col
                            key={course._id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "20px",
                            }}
                        >
                            <Link to={`/course/${course._id}`}>
                                <Card
                                    hoverable
                                    style={{
                                        width: "100%",
                                        maxWidth: "280px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}
                                    cover={
                                        <div className="relative">
                                            {course.discount && (
                                                <span
                                                    className="absolute top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-bold"
                                                    style={{
                                                        backgroundColor: "#ff4d4f",
                                                    }}
                                                >
                                                    {course.discount}%
                                                </span>
                                            )}
                                            <img
                                                alt={course.name}
                                                src={course.image_url}
                                                className="w-full"
                                                style={{
                                                    height: "180px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>
                                        
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
                                        <span className="text-md font-medium">{course.instructor_name}</span>
                                    </div>

                                    <Rate disabled defaultValue={course.average_rating} className="mb-3" />

                                    <div className="flex items-center justify-between mt-2">
                                        {course.discount ? (
                                            <>
                                                <p
                                                    className="original-price text-lg"
                                                    style={{
                                                        textDecoration: "line-through",
                                                        opacity: 0.5,
                                                    }}
                                                >
                                                    {formatPrice(course.price)}
                                                </p>
                                                <p className="discounted-price text-lg text-red-500">
                                                    {formatPrice(course.price_paid)}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="price text-lg">{formatPrice(course.price)}</p>
                                        )}
                                    </div>
                                    <div >
                                            <Button
                                                type="primary"
                                                style={{
                                                    backgroundColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                    borderColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                    color: "white",
                                                    width: "100%",
                                                }}>
                                                Buy Now
                                            </Button>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default CategoryTable;
