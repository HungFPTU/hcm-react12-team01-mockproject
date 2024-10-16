import assets from "../../assets/assets"; // Fixed import
import { Card, Button, Rate, Tooltip, Col, Row, Pagination } from "antd";
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

const courses: Course[] = [
  {
    id: 1,
    title: "Java Tutorials For Busy People",
    image: assets.java, // Fixed assets reference
    price: 350000,
    rating: 4,
    session_count: 15,
    lession_count: 30,
    fulltime: 90, 
  },
  {
    id: 2,
    title: "React for Beginners",
    image: assets.react, // Fixed assets reference
    price: 450000,
    rating: 5,
    session_count: 10,
    lession_count: 20,
    fulltime: 60, 
  },
  {
    id: 3,
    title: "TypeScript Essentials",
    image: assets.typesript, // Corrected image path
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
    image: assets.python, // Fixed assets reference
    price: 250000,
    rating: 5,
    session_count: 20,
    lession_count: 35,
    fulltime: 180,
  },
];

function PendingCourses() {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "₫"; // Format for Vietnamese dong (₫)
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
      : `${remainingMinutes}p`;
  };

  return (
    <div>
      <h1 className="text-center mb-7 font-semibold text-4xl">All Courses</h1>
      <Row gutter={[16, 16]}>
        {courses.map((course: Course) => (
          <Col key={course.id} span={24} xs={24} sm={12} md={8} lg={6}>
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
      <div className="pagination-container flex justify-center mt-5">
        <Pagination defaultCurrent={1} total={50} hideOnSinglePage />
      </div>
    </div>
  );
}

export default PendingCourses;
