import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Row, Col, Collapse,Progress } from "antd";
import {
    ReadOutlined,
    ScheduleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    StarFilled,
    CheckCircleFilled,
    SettingOutlined,
} from "@ant-design/icons";
import asset from "../../assets/assets";
import bannerImage from "../../assets/bgrCourseDetail.jpg";
import { Rate } from 'antd';

const { Panel } = Collapse;

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
        desfour: string;
        desfive: string;
        dessix: string;
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
        introduction: "Khóa học này cung cấp kiến thức Java từ cơ bản đến nâng cao...",
        description: {
            desfirst: "Basic Syntax and Structure: Understanding the fundamentals of Java programming.",
            dessecond: "Object-Oriented Programming (OOP): Concepts like classes, objects, inheritance, polymorphism...",
            desthird: "Data Types and Variables: Different types of data in Java and how to use them.",
            desfour: "Control Structures: Using loops, conditionals, and switch statements.",
            desfive: "Exception Handling: Managing errors and exceptions to build robust programs.",
            dessix: "Collections Framework: Working with lists, sets, maps, and other data structures.",
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
        introduction: "React là một kho thư viện JavaScript đồ sộ và mạnh mẽ...",
        description: {
            desfirst: "Có kiến thức cơ bản về ReactJs.",
            dessecond: "Biết cách cài đặt ReactJs cho ứng dụng.",
            desthird: "Xây dựng các ứng dụng ReactJs cơ bản.",
            desfour: "Control Structures: Using loops, conditionals, and switch statements.",
            desfive: "Exception Handling: Managing errors and exceptions to build robust programs.",
            dessix: "Collections Framework: Working with lists, sets, maps, and other data structures.",
        },
        instructor: {
            name: "Thái Trần Minh Quân",
            avatar: asset.avatar,
            bio: "Giảng viên có 20 năm kinh nghiệm trong lĩnh vực lập trình.",
        },
    },
];

// interface Reviews {
//     id: string;
//     course_id: string;
//     user_id: string;
//     comment: string;
//     rating: number;
//     created_at: string;
//     updated_at: string;
//     is_deleted: boolean;
// }

// const reviews: Reviews[] =[
//     {
//         id: "1",
//         course_id: "101",
//         user_id: "user_01",
//         comment: "Khóa học rất bổ ích, giảng viên dạy dễ hiểu.",
//         rating: 5,
//         created_at: "2024-10-21T10:00:00Z",
//         updated_at: "2024-10-21T10:00:00Z",
//         is_deleted: false
//     },
//     {
//         id: "2",
//         course_id: "102",
//         user_id: "user_02",
//         comment: "Nội dung cần cải thiện, một số bài không rõ ràng.",
//         rating: 3,
//         created_at: "2024-10-21T11:00:00Z",
//         updated_at: "2024-10-21T11:00:00Z",
//         is_deleted: false
//     }
// ]





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
                    <span onClick={toggleExpand} className="text-blue-500 cursor-pointer">
                        Thu gọn
                    </span>
                </>
            );
        }

        if (course.introduction.length > maxLength) {
            return (
                <>
                    {course.introduction.slice(0, maxLength)}...{" "}
                    <span onClick={toggleExpand} className="text-blue-500 cursor-pointer">
                        Xem thêm
                    </span>
                </>
            );
        }

        return course.introduction;
    };

    const isLoggedIn = false;

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const genExtra = () => (
        <SettingOutlined
            onClick={(event) => {
                event.stopPropagation();
            }}
        />
    );

    return (
        <div className="w-full relative">
            {course ? (
                <>
                    <div
                        className="w-full h-[450px] bg-cover bg-center relative mt-14 overflow-auto"
                        style={{ backgroundImage: `url(${bannerImage})` }}
                    >
                        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-start items-start pl-12 pt-14">
                            <Row gutter={24} className="w-full">
                                <Col span={14}>
                                    <h1 className="text-white text-6xl font-bold">{course.title}</h1>
                                    <p className="text-gray-400 text-xl py-3">{renderIntroduction()}</p>
                                </Col>
                            </Row>
                            <div className="mt-auto flex items-center mb-6">
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
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.desfour}
                                </p>
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.desfive}
                                </p>
                                <p className="mb-2">
                                    <CheckCircleFilled className="mr-2" />
                                    {course.description.dessix}
                                </p>
                            </div>
{/* Course Content */}
                            <h1 className="text-3xl text-left font-bold pl-12 mt-6">Course Content</h1>
                            <div className="courseContent ml-9 mt-5 ">
                                <Collapse
                                        defaultActiveKey={['1']}
                                        onChange={onChange}
                                        className="bg-white"
                                        size="large"
                                    >
                                        <Panel header="This is panel header 1" key="1" extra={genExtra()}>
                                            <div>Panel content 1</div>
                                        </Panel>
                                        <Panel header="This is panel header 2" key="2" extra={genExtra()}>
                                            <div>Panel content 2</div>
                                        </Panel>
                                        <Panel header="This is panel header 3" key="3" extra={genExtra()}>
                                            <div>Panel content 3</div>
                                        </Panel>
                                    </Collapse>
                                    <br />
                            </div>

                            <div className="Reviews ml-9">
                                <h1 className="text-3xl text-left font-bold pl-12" >Review</h1>
                                <div className="flex md:flex-row flex-col gap-8 border-b-1 border-neutral-200 pb-20">
                                    <div className="reviewAll lg:w-[200px] md:w-[200px] xl:w-[200px] w-full">
                                        <div className="leftReview h-[144px] rounded-[12px] bg-[#ebedf1] flex flex-col items-center justify-center">
                                            <p className="reviewsNumber md:text-[36px] text-[30px] text-neutral-900 font-bold">5</p>
                                            <Rate disabled defaultValue={5} />
                                            <p className="reviews md:text-[16px] text-[14px] text-neutral-800">0 Reviews</p>
                                        </div>
                                        <Button className="commentButton rounded-full h-12 w-full flex items-center justify-center mt-4 bg-[#fae368]">
                                            <span className="comment font-semibold text-[16px]">Comment</span>
                                        </Button>
                                    </div>

                                    <div className="proStar w-full flex flex-col justify-between border rounded-xl bg-white">
                                        <div className="flex items-center gap-4 p-3">
                                            <p className="text-[20px]">5</p>
                                            <svg
                                                    height="24px" 
                                                    width="24px" 
                                                    viewBox="0 0 53.867 53.867" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="#f2c307"
                                                >
                                                    <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                                            </svg>
                                             <Progress percent={0} showInfo={false} />
                                             <p className="md:text-16 text-14 text-[#5979F2]">(0)</p>                                       
                                        </div>
                                        <div className="flex items-center gap-4 p-3">
                                            <p className="text-[20px]">4</p>
                                            <svg
                                                    height="24px" 
                                                    width="24px" 
                                                    viewBox="0 0 53.867 53.867" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="#f2c307"
                                                >
                                                    <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                                            </svg>
                                             <Progress percent={0} showInfo={false} />
                                             <p className="md:text-16 text-14 text-[#5979F2]">(0)</p>                                       
                                        </div>
                                        <div className="flex items-center gap-4 p-3">
                                            <p className="text-[20px]">3</p>
                                            <svg
                                                    height="24px" 
                                                    width="24px" 
                                                    viewBox="0 0 53.867 53.867" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="#f2c307"
                                                >
                                                    <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                                            </svg>
                                             <Progress percent={0} showInfo={false} />
                                             <p className="md:text-16 text-14 text-[#5979F2]">(0)</p>                                       
                                        </div>
                                        <div className="flex items-center gap-4 p-3">
                                            <p className="text-[20px]">2</p>
                                            <svg
                                                    height="24px" 
                                                    width="24px" 
                                                    viewBox="0 0 53.867 53.867" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="#f2c307"
                                                >
                                                    <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                                            </svg>
                                             <Progress percent={0} showInfo={false} />
                                             <p className="md:text-16 text-14 text-[#5979F2]">(0)</p>                                       
                                        </div>
                                        <div className="flex items-center gap-4 p-3">
                                            <p className="text-[20px]">1</p>
                                            <svg
                                                    height="24px" 
                                                    width="24px" 
                                                    viewBox="0 0 53.867 53.867" 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    fill="#f2c307"
                                                >
                                                    <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                                            </svg>
                                             <Progress percent={0} showInfo={false}  />
                                             <p className="md:text-16 text-14 text-[#5979F2]">(0)</p>                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
 
 
 
 {/* Card */}
                        <Col
                            span={8}
                            className="absolute top-56 left-3/4 transform -translate-x-1/2 w-full sm:top-44 sm:left-3/4 "
                        >
                            <Card className="max-w-lg mx-auto shadow-lg backdrop-blur-md my-3 sticky">
                                <img alt={course.title} src={course.image} className="w-full h-auto" />
                                <p className="text-3xl font-semibold my-2">
                                    {formatPrice(course.discount ? course.discount : course.price)}
                                </p>
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
