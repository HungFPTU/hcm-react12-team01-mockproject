import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Tabs,Button, Tooltip, Col, Row, Pagination } from "antd";
import React ,{useState} from "react";
import asset from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Business from "../../components/Demo/Business";
import Healthcare from "../../components/Demo/Healthcare";
import Music from "../../components/Demo/music";
import Painting from "../../components/Demo/design";
import Photo from "../../components/Demo/photo";
import Software from "../../components/Demo/software";
import Teaching from "../../components/Demo/teaching";

import { BaseService } from "../../services/config/base.service";
import {Course} from "../../model/Course"

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { TabPane } = Tabs;


interface User {
  id: number;
  name: string;
  description: string;
  avatar: string;
}

const users: User[] = [
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
    avatar: asset.avatar,
  },
  {
    id: 3,
    name: "name3",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },
  {
    id: 4,
    name: "name4",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },
  {
    id: 5,
    name: "name4",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },
  {
    id: 6,
    name: "name4",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },
  {
    id: 7,
    name: "name4",
    description: "giao su, tien si,...",
    avatar: asset.avatar,
  },

];

const Home: React.FC = () => {
  
const navigate = useNavigate();

const AllCourse = () => {
  navigate("/all");
}

const { id } = useParams<{ id: string }>();
const [courses, setCourses] = useState<Course[]>([]);

useEffect(() => {
  if (id) {
    BaseService.getById<Course>({ url: `/api/course/${id}`, isLoading: true })
      .then(response => {
        if (response) {
          setCourses([response.data]);
        }
      })
      .catch(() => {
        toast.error("Error fetching course details");
      });
  }
}, [id]);

const formatPrice = (price: number) => price.toLocaleString("vi-VN") + "₫";
// const formatTime = (minutes: number) => {
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;
//   return hours > 0 ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}` : `${remainingMinutes}p`;
// };
const [currentPage, setCurrentPage] = useState(1);
const pageSize = 4;
const totalCourses = courses.length;

const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

const paginatedCourses = courses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="main mt-7">
      {/* Carousel */}
      <div className="container mx-auto mt-[65px] bg-white rounded-b-3xl rounded-tr-3xl p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Column for Text */}
            <div className="lg:col-span-5">
              <h1 className="text-4xl sm:text-5xl ml-3 sm:ml-7 mt-4 font-bold">
                <span className="text-[#e673d4]">Online </span>
                <span className="text-[#ff8a55]">Course</span>
              </h1>
              <p className="text-base sm:text-xl ml-3 sm:ml-7 mt-6 sm:mt-8 font-normal leading-6 sm:leading-9">
                Find the right study abroad programme with FLearn. Get expert guidance and support every step of the way 
                from our trusted partners and take the first step to unlocking global academic, social, and career opportunities.
                Enquire now to open up your world of learning.
              </p>

              <div className="toCourse flex justify-center sm:justify-start w-full sm:w-[500px] mt-[30px] sm:mt-[50px] ml-7">
                <button className="click_course bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-full animate-pulse">
                  Go To Course
                </button>
              </div>
            </div>

            {/* Right Column for Image */}
            <div className="lg:col-span-7">
              <img 
                src={asset.banner} 
                alt="online course" 
                className="banner w-full rounded-tl-[80px] sm:rounded-tl-[150px] rounded-bl-[80px] sm:rounded-bl-[150px]"
              />
            </div>

          </div>
      </div>
       
       <div className="topCourse rounded-[50px] bg-[#f9eded] ml-auto mr-auto mt-9">
          <h2 className="text-center mb-11 relative text-3xl sm:text-5xl font-bold">Update Latest</h2>
          <div className="container mx-auto px-4">
        <Row gutter={[16, 16]}>
          {paginatedCourses.map((course: Course) => (
            <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                cover={
                  <img
                    alt="Picture"
                    src={course.image_url}
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
                    {/* {course.session_count} sessions */}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs">
                    {/* {course.lession_count} lessons */}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-600 text-xs">
                    {/* {formatTime(course.fulltime)} */}
                  </div>
                </div>

                <Tooltip title={course.name} placement="top">
                  <h2 className="text-lg font-semibold mb-2 truncate" style={{ maxWidth: "250px" }}>
                    {course.name}
                  </h2>
                </Tooltip>

                {/* <Rate disabled defaultValue={course.rating} className="mb-3" /> */}

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
          className="mb-3"
        />
      </div>
       </div>
      
      {/* Tabs */}
      <div className="demo w-full mt-9">
        <div className="demo-content rounded-[50px] bg-[#f9eded] ml-auto mr-auto">
          <div className="body_menu_content relative">
            <div className="viewall flex justify-end mr-9 text-pink-600 text-opacity-100 text-xl sm:text-2xl" onClick={AllCourse} > 
              <button>
                View all courses
              </button>
            </div>
            
            <h2 className="heading2 block text-center mb-11 relative text-3xl sm:text-5xl font-bold">
              Explore top subjects
            </h2>
            <div className="line mx-auto w-16 sm:w-24 h-1 bg-pink-500 rounded-full mb-8"></div>
            <Tabs defaultActiveKey="1" centered>
              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.investment}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Business & Management
                  </span>
                }
                key="1"
              >
                <Business />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.heartbeat}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Healthcare & Medicine
                  </span>
                }
                key="2"
              >
                <Healthcare />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.music}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Music
                  </span>
                }
                key="3"
              >
                <Music />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.brush}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Painting
                  </span>
                }
                key="4"
              >
                <Painting />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.picture}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Photo
                  </span>
                }
                key="5"
              >
                <Photo />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.software}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Software
                  </span>
                }
                key="6"
              >
                <Software />
              </TabPane>

              <TabPane
                tab={
                  <span
                    className="tab-title"
                    style={{
                      fontSize: "18px",
                      padding: "12px 16px",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={asset.teaching}
                      className="w-6 sm:w-8"
                      style={{ marginRight: "8px" }}
                    />
                    Teaching
                  </span>
                }
                key="7"
              >
                <Teaching />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

      <section className="w-screen flex flex-col justify-center m-auto items-center sm:w-[90%] md:px-[64px] pt-[64px] pb-[40px] md:pb-[129px] bg-glass h-auto default-spacing-section">
        <div className="container">
          <h2 className="heading2 text-7xl inline-block ml-[27px] lg:ml-[115px] relative text-fl-black after:block after:content-[''] after:w-20 after:h-[7px] after:bg-fl-pink-700 after:mt-4 after:ml-0">How does it work?</h2>
            <div className="mt-[44px] relative">
              <div className="w-full grid gap-5 px-[24px] md:px-0 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">1</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Find your degree</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">From undergraduate certificates to full masters degrees, browse our range of subjects and find a degree that can be completed 100% online.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">2</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Apply to study with a world-class university</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">Like the look of a degree? Request more info by filling in our form or click ‘Apply now’ to apply via the university’s own systems.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">3</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Learn flexibly online</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black">Work through your degree in your own time, whenever and wherever suits you. All you need is access to the internet and a device to learn on.</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-[33px] font-[700] mb-[16px] leading-[41.25px]">4</span>
                    <h3 className="heading2 text-3xl inline-block text-[22px] mb-[32px] md:mb-[40px] leading-[33px] text-fl-black font-normal">Gain your degree</h3>
                      <p className="text-[16px] leading-[24px] text-fl-black"> Complete all the programs, pass the assessments and exams, and you’ll be the proud owner of an internationally recognised qualification.</p>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Instructors Section */}


      <div className="instructor">
      <h1 className="text-center text-2xl sm:text-3xl mb-6 font-bold">
        Instructors
      </h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper pb-[32px] max-w-[1200px] relative my-0 mx-auto overflow-hidden touch-pan-y p-0 z-[1] block"
      >
        {users.map((user) => (
          <SwiperSlide key={user.id} className="swiperSlide bg-center bg-cover w-72 h-72">
            <Card
              hoverable
              style={{
                width: "90%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: "auto",
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default Home;