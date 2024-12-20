import { useState, useEffect, useRef } from "react";
import { Card, Button, Rate, Tooltip, Col, Row, Avatar } from "antd";
import { Link } from "react-router-dom";
import { CourseService } from "../../../services/CourseService/course.service";
import { GetPublicCourseResponse } from "../../../model/admin/response/Course.response";
import { UserService } from "../../../services/UserService/user.service";

interface CourseProps {
    pageSize?: number;
    pageNum?: number;
}

const fetchCoursePublic = async (searchCondition = {}, pageInfo = { pageNum: 1, pageSize: 10 }) => {
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
    const [users, setUsers] = useState<{ [key: string]: any }>({});
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) return;
        hasMounted.current = true;
        const fetchCourses = async () => {
            try {
                const coursesData = await fetchCoursePublic();
                setCourses(coursesData.data);

                // Fetch user details for each course
                const userPromises = coursesData.data.pageData.map(async (course) => {
                    const userData = await UserService.getUserDetails(course.instructor_id);
                    return { courseId: course._id, user: userData.data.data };
                });

                const usersData = await Promise.all(userPromises);
                const usersMap = usersData.reduce((acc: { [key: string]: any }, { courseId, user }) => {
                    acc[courseId as string] = user;
                    return acc;
                }, {});

                setUsers(usersMap);
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
        <div className="w-full mb-14">
            <Row style={{ marginLeft: "5%" }}>
                <Col xs={24} md={8}>
                    <h3 className="heading3 text-4xl md:text-5xl font-bold">
                        Business & Management
                    </h3>
                    <div className="body text-lg md:text-xl w-full">
                        <div className="titleText block mt-4 m-0 w-full font-normal">
                            <span>
                                Boss it in business with our specialist upskilling courses,
                                industry certifications, and high-flying degrees.
                            </span>
                        </div>
                        <div className="titleText block mt-4 m-0 w-full font-normal">
                            <span>
                                No matter what your goals are, leading experts from the likes of
                                Accenture, AWS, and Deakin University will guide you to achieve them.
                                From data analytics to digital marketing, start learning from the
                                best.
                            </span>
                        </div>
                    </div>
                </Col>

                <Col xs={24} md={16}>
                    <div
                        style={{
                            overflowX: "scroll",
                            width: "100%",
                            scrollbarWidth: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <Row style={{ maxWidth: "1200px", width: "max-content" }}>
                            {courses?.pageData.slice((pageNum - 1) * pageSize, pageNum * pageSize).map((course) => {
                                const user = users[course._id];
                                return (
                                    <Col
                                        key={course._id}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginBottom: "20px",
                                            padding: "0 10px",
                                        }}
                                    >
                                        <Link to={`/course/${course._id}`}>
                                            <Card
                                                hoverable
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                }}
                                                cover={
                                                    <img
                                                        alt={course.name}
                                                        src={course.image_url}
                                                        className="course-image w-full"
                                                        style={{
                                                            height: "200px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
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
                                                    <Avatar
                                                        src={user?.avatar}
                                                        alt={user?.name}
                                                        size={32}
                                                        className="mr-2"
                                                    />
                                                    <span className="text-md font-medium">{user?.name}</span>
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
                                                                {formatPrice(course.discount)}
                                                            </p>
                                                        </>
                                                    ) : (
                                                        <p className="price text-lg">{formatPrice(course.price)}</p>
                                                    )}
                                                    <Button
                                                        type="primary"
                                                        style={{
                                                            backgroundColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                            borderColor: "rgb(222 0 165 / var(--tw-bg-opacity, 1))",
                                                            color: "white",
                                                        }}
                                                    >
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
                </Col>
            </Row>
        </div>
    );
};

export default CategoryTable;
