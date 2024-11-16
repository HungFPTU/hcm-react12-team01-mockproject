import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bannerImage from "../../assets/bgrCourseDetail.jpg";
import {  Row, Col, Collapse } from "antd";
import { CourseService } from "../../services/CourseService/course.service";
import { GetPublicCourseDetailResponse } from "../../model/admin/response/Course.response";
import { ReviewService } from "../../services/review/review.service";
import CourseReviews from "./courseReviews"
import CourseCard from "./courseCard"

import {
    UserOutlined,
    StarFilled,
    CheckCircleFilled,
} from "@ant-design/icons";
const { Panel } = Collapse;



const CourseDetail =() => {
    const { id } = useParams();
    const [course, setCourse] = useState<any>(null);
    const [reviews, setReviews] = useState<any[]>([]);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [reviewCount, setReviewCount] = useState<number | null>(null);
    const [courseStatus, setCourseStatus] = useState({ is_in_cart: false, is_purchased: false });
    const [discountedPrice, setDiscountedPrice] = useState<string>("0.00");
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) {
        console.error("Course ID is undefined");
        return;
      }

      try {
        const response = await CourseService.getPublicCourseDetail(id);
        const courseData = response.data?.data as GetPublicCourseDetailResponse;

        setAverageRating(courseData.average_rating ?? 0);
        setReviewCount(courseData.review_count ?? 0);
        
        setCourseStatus({
          is_in_cart: courseData.is_in_cart,
          is_purchased: courseData.is_purchased
        });

        setDiscountedPrice(((courseData.price ?? 0) - ((courseData.discount ?? 0) * (courseData.price ?? 0)) / 100).toFixed(2));
        setCourse(courseData);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewService.searchForReview({
          searchCondition: {
            course_id: id as string,
            rating: 0,
            is_instructor: false,
            is_rating_order: false,
            is_delete: false
          },
          pageInfo: {
            pageNum: 1,
            pageSize: 10
          }
        });
        setReviews(response.data.data.pageData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

const renderLessons = (lessonList: GetPublicCourseDetailResponse["session_list"][0]["lesson_list"]) => {
    return lessonList.map((lesson) => (
      <div key={lesson._id} className="pl-6">
        <p>
          - {lesson.name} ({lesson.lesson_type}, {lesson.full_time} minutes)
        </p>
      </div>
    ));
  };

  return (
    <div className="w-full relative">
      <div
        className="w-full h-[450px] bg-cover bg-center relative mt-14 overflow-auto"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-start items-start pl-12 pt-14">
          <Row gutter={24} className="w-full">
            <Col span={14}>
              <h1 className="text-white text-6xl font-bold">
                {course?.name || "Course Name"}
              </h1>
              <p className="text-gray-400 text-xl py-3">
                {course?.description || "No description available."}
              </p>
            </Col>
          </Row>
          <div className="mt-auto flex items-center mb-6">
            <p className="text-white mr-8">
              <UserOutlined className="mr-2" />
              Instructor: {course?.instructor_name || "N/A"}
            </p>
            <p className="text-white flex items-center">
              Rating: {course?.average_rating || 0}{" "}
              <StarFilled className="ml-1 text-yellow-500" />
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
                                    {course?.description}
                                </p>
                            </div>

                            <h1 className="text-3xl text-left font-bold pl-12 mt-6">Course Content</h1>
                            <div className="courseContent ml-9 mt-5 ">
                            <Collapse accordion>
                                {course?.session_list.map((session) => (
                                    <Panel
                                    header={`${session.position_order}. ${session.name} (${session.full_time} minutes)`}
                                    key={session._id}
                                    >
                                    {renderLessons(session.lesson_list)}
                                    </Panel>
                                ))}
                                </Collapse>
                                    <br />
                            </div>

                              <CourseReviews
                                reviews={reviews}
                                courseId={course?._id}
                                course={course}
                                averageRating={averageRating}
                                reviewCount={reviewCount}
                              />
                        </Col>
                        <Col
                            span={8}
                            className="absolute top-56 left-3/4 transform -translate-x-1/2 w-full sm:top-44 sm:left-3/4 "
                        >
                          <CourseCard course={course} discountedPrice={discountedPrice} courseStatus={courseStatus} />
                        </Col>

                    </Row>
    </div>
  );
};

export default CourseDetail;
