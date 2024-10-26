import assets from "../../assets/assets"; // Fixed import
import { Card, Button, Rate, Tooltip, Col, Row, Pagination } from "antd";
import { useState } from "react";

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
  category_id: string;
}

const courses: Course[] = [
  {id: 1,
title: "Java Tutorials For Busy People",
image: assets.java,
price: 350000,
rating: 4,
session_count: 15,
lession_count: 30,
fulltime: 90,
category_id: '1'
},
{
id: 2,
title: "React for Beginners",
image: assets.react,
price: 450000,
rating: 5,
session_count: 10,
lession_count: 20,
fulltime: 60,
category_id: "2",
},
{
id: 3,
title: "TypeScript Essentials",
image: assets.typescript,
price: 200000,
rating: 4,
discount: 199000,
session_count: 12,
lession_count: 25,
fulltime: 120,
category_id: "3",
},
{
id: 4,
title: "Python for Data Science",
image: assets.python,
price: 250000,
rating: 5,
session_count: 20,
lession_count: 35,
fulltime: 180,
category_id: "4",
},
{
  id: 5,
title: "Python for Data Science",
image: assets.python,
price: 250000,
rating: 5,
session_count: 20,
lession_count: 35,
fulltime: 180,
category_id: "4",
}
];

function PendingCourses() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const totalCourses = courses.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}` : `${remainingMinutes}p`;
  };

  const paginatedCourses = courses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="mt-20">
      <h1 className="text-center mb-7 font-bold text-4xl text-gray-800">All Courses</h1>
      <div className="container mx-auto px-4">
        <Row gutter={[16, 16]}>
          {paginatedCourses.map((course: Course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                cover={
                  <img
                    alt={course.title}
                    src={course.image}
                    className="rounded-t-lg w-full h-[200px] object-cover"
                  />
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs">
                    {course.session_count} sessions
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs">
                    {course.lession_count} lessons
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs">
                    {formatTime(course.fulltime)}
                  </div>
                </div>

                <Tooltip title={course.title} placement="top">
                  <h2 className="text-lg font-semibold mb-2 truncate" style={{ maxWidth: "250px" }}>
                    {course.title}
                  </h2>
                </Tooltip>

                <Rate disabled defaultValue={course.rating} className="mb-3" />

                <div className="flex justify-between items-center mt-2">
                  {course.discount ? (
                    <div>
                      <p className="text-gray-500 line-through text-sm">{formatPrice(course.price)}</p>
                      <p className="text-red-500 text-lg font-bold">{formatPrice(course.discount)}</p>
                    </div>
                  ) : (
                    <p className="text-gray-800 text-lg font-bold">{formatPrice(course.price)}</p>
                  )}

                  <Button type="primary" danger className="rounded-lg">
                    Buy Now
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCourses}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PendingCourses;