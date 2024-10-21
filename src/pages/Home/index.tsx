import { Card, Button, Rate, Tooltip, Col, Row, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import asset from "../../assets/assets";
import { Carousel } from "antd";
import assets from "../../assets/assets"
import { useNavigate } from "react-router-dom";
import { RoleEnum } from "../../model/RouteConfig";
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
}

interface Categories {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  description: string;
  avatar: string;
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
  },
  {
    id: 3,
    title: "TypeScript Essentials",
    image: asset.typesript,
    price: 200000,
    rating: 4,
    discount: 199000,
    session_count: 12,
    lession_count: 25,
    fulltime: 120,
  },
  {
    id: 4,
    title: "Python for Data Science",
    image: asset.python,
    price: 250000,
    rating: 5,
    session_count: 20,
    lession_count: 35,
    fulltime: 180,
  },
];

const categories: Categories[] = [
  {
    id: 1,
    name: "Java",
  },
  {
    id: 2,
    name: "React",
  },
  {
    id: 3,
    name: "Typescript",
  },
  {
    id: 4,
    name: "Python",
  },
]

const user: User[] = [
  {
    id: 1,
    name: "name1",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },
  {
    id: 2,
    name: "name2",
    description: "giao su, tien si,...",
    avatar: asset.avatar
  },
  {
    id: 3,
    name: "name3",
    description: "giao su, tien si,...",
    avatar: asset.avatar
  },
  {
    id: 4,
    name: "name4",
    description: "giao su, tien si,...",
    avatar: asset.avatar
  },
]



const Home: React.FC = () => {
  const formatPrice = (price: number) => {
    localStorage.setItem('userRole', RoleEnum.Instructor);
    return price.toLocaleString("vi-VN") + "₫"; // Format for Vietnamese dong (₫)
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + 'p' : ''}` : `${remainingMinutes}p`;
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: 'auto', // Auto height for responsiveness
    objectFit: 'cover',
    borderRadius: "30px",
  };

  const carouselContainer: React.CSSProperties = {
    width: '85%',
    margin: '18px auto',
    marginTop: '100px',
  };

  const navigate = useNavigate();

  const goToAllCourses = () => {
    navigate('/all'); // Redirects to the "all courses" page
  };
  return (
    <div className="main mt-7 px-5">
      <div style={carouselContainer}>
        <Carousel arrows infinite={false} autoplay>
          <div>
            <img style={imgStyle} src={assets.petfood} alt="Pet Food" />
          </div>
        </Carousel>
      </div>
      <h1 className="text-center text-3xl mb-6 font-bold mt-14">All Courses</h1>
      <div className="categories mb-5 ">
        {categories.map((category: Categories) => (
          <Tag
            key={category.id}
            color="blue"
            className="text-lg cursor-pointer hover:bg-blue-200"
          >
            {category.name}
          </Tag>
        ))}
      </div>

      <Row gutter={[16, 16]}>
        {courses.map((course: Course) => (
          <Col
            key={course.id}
            span={24}
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <Card
              hoverable
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={
                <img
                  alt={course.title}
                  src={course.image}
                  className="course-image w-full h-[200px] object-cover"
                />
              }
            >
              <div className="course-info flex items-center justify-between mb-3">
                <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                  {course.session_count} sessions
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                  {course.lession_count} lessons
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                  {formatTime(course.fulltime)}
                </div>
              </div>

              <Tooltip placement="top" title={course.title}>
                <h2
                  className="text-lg font-semibold mb-2 truncate"
                  style={{ maxWidth: "250px" }}
                >
                  {course.title}
                </h2>
              </Tooltip>

              <Rate disabled defaultValue={course.rating} className="mb-3" />

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
                <Button type="primary" danger>
                  Buy Now
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-end mt-6">
        <Button type="default" icon={<ArrowRightOutlined />} onClick={goToAllCourses}>
          See all
        </Button>
      </div>

      <div className="instructor">
        <h1 className="text-center text-3xl mb-6 font-bold">Instructor</h1>
        <Row gutter={[16, 16]}>
          {user.map((user: User) => (
            <Col
              key={user.id}
              span={24}
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <Card
                hoverable
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center the content horizontally
                  justifyContent: "center", // Center the content vertically
                }}
                cover={
                  <img
                    alt="avatar"
                    src={user.avatar}
                    className="course-image w-full h-[200px] object-cover rounded-full"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      margin: "10px auto",
                      objectFit: "cover",
                    }}
                  />
                }
              >
                <div
                  className="text-lg font-semibold mb-2 truncate"
                  style={{ maxWidth: "250px", textAlign: "center" }}
                >
                  {user.name}
                </div>
                <div
                  className="text-lg font-semibold mb-2 truncate"
                  style={{ maxWidth: "250px", textAlign: "center" }}
                >
                  {user.description}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

      </div>

    </div>
  );
};

export default Home;
