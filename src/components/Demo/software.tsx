import assets from "../../assets/assets"; // Ensure correct import
import { Card, Button, Rate, Tooltip, Col, Row } from "antd";
import { Link } from "react-router-dom";

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
    image: assets.python, // Ensure assets are correct
    price: 350000,
    rating: 4,
    session_count: 15,
    lession_count: 30,
    fulltime: 90,
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
  },
  {
    id: 3,
    title: "React for Beginners",
    image: assets.react,
    price: 450000,
    rating: 5,
    session_count: 10,
    lession_count: 20,
    fulltime: 60,
  },

];

const Software = () => {
  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "₫"; // Format for Vietnamese dong (₫)
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + 'p' : ''}` : `${remainingMinutes}p`;
  };

  return (
<div className="w-full mb-14">
      <Row style={{ marginLeft: "5%" }}>
        <Col span={8}>
          <h3 className="heading3 text-4xl md:text-5xl font-bold">Software</h3>
          <div className="body text-xl w-full">
            <div className="titleText block mt-4 m-0 w-full font-normal">
              <span>
              Specializations and courses in software development address the process of creating software, including development tools and methodologies such as
                Agile development, programming languages including Python, C, Java, and Scala, and software architecture and testing.       
                </span>    
                 </div>
            <div className="titleText block mt-4 m-0 w-full font-normal">
              <span>
              Learn software engineering online: earn a degree online, enroll in an online boot camp, or self-study through online tutorials and guides.        
               </span>
            </div>
          </div>
        </Col>

        <Col xs={24} md={16}>
        <div style={{overflowX: 'scroll',  width: '100%', scrollbarWidth: 'none', whiteSpace: 'nowrap' }}>
  <Row style={{ maxWidth: '1200px', width: 'max-content' }}> {/* Max width to limit row size */}
    {courses.map((course: Course) => (
      <Col
        key={course.id}
        xs={24} sm={12} md={8}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', padding: '0 10px' }} // Custom margin
      >
        <Link to={`/course/${course.id}`}>
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
                alt={course.title}
                src={course.image}
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
                {course.lession_count} lessons
              </div>
              <div className="bg-gray-100 px-2 py-1 rounded-full text-gray-500 text-sm">
                {formatTime(course.fulltime)}
              </div>
            </div>

            <Tooltip placement="top" title={course.title}>
              <h2 className="text-lg font-semibold mb-2 truncate" style={{ maxWidth: "250px" }}>
                {course.title}
              </h2>
            </Tooltip>

            <Rate disabled defaultValue={course.rating} className="mb-3" />

            <div className="flex items-center justify-between mt-2">
              {course.discount ? (
                <>
                  <p
                    className="original-price text-lg"
                    style={{ textDecoration: "line-through", opacity: 0.5 }}
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
                  backgroundColor: 'rgb(222 0 165 / var(--tw-bg-opacity, 1))',
                  borderColor: 'rgb(222 0 165 / var(--tw-bg-opacity, 1))',
                  color: 'white',
                }}
              >
                Buy Now
              </Button>
            </div>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
</div>

</Col>

      </Row>
    </div>
  );
};

export default Software;
