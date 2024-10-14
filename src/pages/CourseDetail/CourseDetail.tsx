import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col } from "antd";
import asset from "../../assets/assets";
import bannerImage from "../../assets/bgrCourseDetail.jpg";
import { ReadOutlined, ScheduleOutlined, ClockCircleOutlined, UserOutlined, StarFilled, CheckCircleFilled } from '@ant-design/icons';

interface Course {
    id: number;
    title: string;
    image: string;
    price: number;
    rating: number;
    discount?: number;
    session_count: number;
    lession_count: number;
    fulltime: number;
    introduction: string;
    description: {
        desfirst: string;
        dessecond: string;
        desthird: string;
    };
    instructor: {
        name: string;
        avatar: string;
        bio: string;
    };
}

const courses: Course[] = [
    {
        id: 1,
        title: "Java Tutorials For Busy People",
        image: asset.java,
        price: 350000,
        rating: 4,
        session_count: 15,
        lession_count: 30,
        fulltime: 90,
        introduction: "Khóa học này cung cấp kiến thức Java từ cơ bản đến nâng cao. Khóa học sẽ giúp bạn hiểu rõ về các khái niệm lập trình và cách áp dụng chúng trong thực tế.",
        description: {
            desfirst: "Nắm được kiến thức java cơ bản cũng như kiến thức về lập trình hướng đối tượng.",
            dessecond: "Có thể viết được các chương trình java cơ bản như các ứng dụng Console App, Desktop App.",
            desthird: "Làm nền tảng để học tiếp các khóa học nâng cao về java (Java advance, Java web, Android...).",
        },
        instructor: {
            name: "Thái Trần Minh Quân",
            avatar: asset.avatar,
            bio: "Giảng viên có 10 năm kinh nghiệm trong lĩnh vực lập trình.",
        },
    },
    {
        id: 2,
        title: "React for Beginners",
        image: asset.react,
        price: 450000,
        rating: 5,
        session_count: 10,
        lession_count: 20,
        fulltime: 60,
        introduction: "React là một kho thư viện JavaScript đồ sộ và mạnh mẽ, được sử dụng rất nhiều để xây dựng lên các ứng dụng trên nền tảng web và mobile. Nếu bạn muốn học React JS từ cơ bản đến nâng cao, biết cách áp dụng ReactJS để phục vụ có hiệu quả cho nhu cầu công việc thì đừng bỏ qua khóa học ReactJS Online của Giảng viên Thái Trần Minh Quân mà chúng tôi sẽ giới thiệu ngay sau đây. Lợi ích nhận được từ khóa học: Trong giai đoạn cuộc sống số hiện nay, gần như mọi lĩnh vực thiết yếu của xã hội đều có ít nhiều sự liên quan đến khoa học và công nghệ. Chính vì vậy, những người am hiểu công nghệ thông tin, rành rẽ về các ngôn ngữ lập trình sẽ có lợi thế rất lớn. Khóa học ReactJS online mà chúng tôi đang nói đến là một trong những khóa học cung cấp cho bạn nhiều kiến thức bổ ích về lập trình theo hướng hiện đại, cụ thể học viên sẽ nhận được nhiều lợi ích như: Được học ReactJS cơ bản với những kiến thức tổng quát giúp học viên có được cái nhìn tổng thể về ReactJS.",
        description: {
            desfirst: "Có kiến thức cơ bản về ReactJs.",
            dessecond: "Biết cách cài đặt ReactJs cho ứng dụng.",
            desthird: "Xây dựng các ứng dụng ReactJs cơ bản.",
        },
        instructor: {
            name: "Thái Trần Minh Quân",
            avatar: asset.avatar,
            bio: "Giảng viên có 20 năm kinh nghiệm trong lĩnh vực lập trình.",
        },
    },
];

const CourseDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const course = courses.find((course) => course.id === Number(id));
    const [isExpanded, setIsExpanded] = useState(false);

    const formatPrice = (price: number) => {
        return price.toLocaleString("vi-VN") + "₫";
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const renderIntroduction = () => {
        const maxLength = 150;
        if (!course) return null;

        if (isExpanded) {
            return (
                <>
                    {course.introduction}{" "}
                    <span onClick={toggleExpand} className="text-blue-500 cursor-pointer ">
                        Thu gọn
                    </span>
                </>
            );
        }

        if (course.introduction.length > maxLength) {
            return (
                <>
                    {course.introduction.slice(0, maxLength)}...{" "}
                    <span onClick={toggleExpand} className="text-blue-500 cursor-pointer ">
                        Xem thêm
                    </span>
                </>
            );
        }

        return course.introduction;
    };

    const isLoggedIn = false;

    return (
        <div className="w-full relative">
            {course ? (
                <>
                   <div className="w-full h-[450px] bg-cover bg-center relative mt-14 overflow-auto" style={{ backgroundImage: `url(${bannerImage})` }}>

                        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-start items-start pl-12 pt-14">
                            <Row gutter={24} className="w-full">
                                <Col span={14} >
                                    <h1 className="text-white text-6xl font-bold ">{course.title}</h1>
                                    <p className="text-gray-400 text-xl py-3">{renderIntroduction()}</p>
                                </Col>
                            </Row>
                            
                            <div className="mt-auto flex items-center mb-6 ">
                                <p className="text-white mr-8">
                                    <UserOutlined className="mr-2" />
                                    Instructor: {course.instructor.name}
                                </p>
                                <p className="text-white flex items-center">
                                    Rating: {course.rating} <StarFilled className="ml-1 text-yellow-500" />
                                </p>
                            </div>
                        </div>
                    </div>

                    <Row gutter={24} className="w-full mt-2">
                        <Col span={14} className="w-full mt-4">
                            <h1 className="text-3xl text-left font-bold pl-12">What will you learn in this course?</h1>
                            <div className="text-lg mt-4 text-left pl-12">
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.desfirst}
                                </p>
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.dessecond}
                                </p>
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.desthird}
                                </p>
                            </div>
                        </Col>

                        <Col span={8} className="absolute top-56 left-3/4 transform -translate-x-1/2 w-full sm:top-44 sm:left-3/4">
                            <Card className="max-w-lg mx-auto shadow-lg backdrop-blur-md my-3">
                                <img alt={course.title} src={course.image} className="w-full h-auto" />
                                <p className="text-3xl font-semibold my-2">{formatPrice(course.discount ? course.discount : course.price)}</p>
                                <p className="my-2">
                                    <ReadOutlined className="mr-2" />
                                    <strong>Curriculum:</strong> {course.lession_count} lessons
                                </p>
                                <p className="my-2">
                                    <ScheduleOutlined className="mr-2" />
                                    <strong>Session:</strong> {course.session_count}
                                </p>
                                <p className="my-2">
                                    <ClockCircleOutlined className="mr-2" />
                                    <strong>Duration:</strong> {course.fulltime}m
                                </p>
                                <div className="flex justify-center mt-4">
                                    {isLoggedIn ? (
                                        <Button className="bg-purple-900 text-white text-lg px-10 py-7" type="primary">
                                            Add to cart
                                        </Button>
                                    ) : (
                                        <Button className="bg-purple-900 text-white text-xl px-24 py-6" type="default">
                                            Login to learn
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <p>Không tìm thấy khoá học.</p>
            )}
        </div>
    );
};

export default CourseDetail;
