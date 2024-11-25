import React, { useState, useEffect, useCallback } from "react";
import {Button, Row, Col, Progress, Form, Rate, Typography, Avatar, Input, List, message} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ReviewService } from "../../services/review/review.service";
import dayjs from "dayjs";
import { useAuth } from "../../context/AuthContent";


const { Title } = Typography;

const CourseReviews: React.FC<any & { courseId: string, course: any, reviewCount: number }> = ({ reviews, courseId, reviewCount }) => {
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [fetchedReviews, setFetchedReviews] = useState(reviews);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [form] = Form.useForm();
  const { userInfo } = useAuth();
   const [visibleReviews, setVisibleReviews] = useState(3);


   const fetchReviews = useCallback(async () => {
    try {
      const response = await ReviewService.searchForReview({
        searchCondition: {
          course_id: courseId,
          rating: 0,
          is_instructor: false,
          is_rating_order: false,
          is_delete: false,
        },
        pageInfo: {
          pageNum: 1,
          pageSize: 10,
        },
      });
      const reviewsData = response.data.data.pageData ;
      setFetchedReviews(reviewsData);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      message.error("Unable to fetch reviews. Please try again.");
    }
  }, [courseId]);
  

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  


  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentButtonClick = () => {
    setShowReviewForm(true);
  };

  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  const handleSubmit = useCallback(
    async (values: { rating: number; comment: string }) => {
      try {
        if (editingReview) {
          await ReviewService.updateReview(editingReview._id, {
            course_id: courseId,
            rating: values.rating,
            comment: values.comment,
          });
          message.success("Review updated successfully!");
          setEditingReview(null);
        } else {
          await ReviewService.createReview({
            course_id: courseId,
            rating: values.rating,
            comment: values.comment,
          });
          message.success("Review created successfully!");
        }
        setShowReviewForm(false);
        form.resetFields();
        await fetchReviews();
      } catch (error) {
        console.error("Failed to submit review", error);
        message.error("Failed to submit review. Please try again.");
      }
    },
    [editingReview, courseId, fetchReviews, form]
  );
  

  const starCounts = [0, 0, 0, 0, 0];
  
  fetchedReviews.forEach((review: any) => {
    if (review.rating >= 1 && review.rating <= 5) {
      starCounts[review.rating - 1]++;
    }
  });
  const calculateProgress = (star: number) => {
    const totalReviews = fetchedReviews.length;
    const starCount = fetchedReviews.filter((review:any) => review.rating === star).length;
    return totalReviews > 0 ? Math.round((starCount / totalReviews) * 100) : 0;
  };
  

  return (
    <div className="Reviews ml-9">
      <h1 className="text-3xl text-left font-bold pl-12">Review</h1>
      <div className="flex md:flex-row flex-col gap-8 border-b-1 border-neutral-200 pb-20 mt-5">
        {/* Review Summary */}
        <div className="reviewAll lg:w-[200px] md:w-[200px] xl:w-[200px] w-full">
          <div className="leftReview h-[144px] rounded-[12px] bg-[#ebedf1] flex flex-col items-center justify-center">
            <p className="reviewsNumber md:text-[36px] text-[30px] text-neutral-900 font-bold">5</p>
            <Rate disabled defaultValue={5} />
            <p className="reviews md:text-[16px] text-[14px] text-neutral-800">{reviewCount} reviews</p>
          </div>
          <Button
            className="commentButton rounded-full h-12 w-full flex items-center justify-center mt-4 bg-[#fae368]"
            onClick={handleCommentButtonClick}
          >
            <span className="comment font-semibold text-[16px]">Comment</span>
          </Button>
        </div>

        {/* Progress Bars */}
        <div className="proStar w-full flex flex-col justify-between border rounded-xl bg-[#fff1e4]">
          {[5, 4, 3, 2, 1].map((star) => {
            const starCount = fetchedReviews.filter((review: any) => review.rating === star).length;
            const percentage = calculateProgress(star);

            return (
              <div key={star} className="flex items-center gap-4 p-3">
                <p className="text-[20px]">{star}</p>
                <svg
                  height="24px"
                  width="24px"
                  viewBox="0 0 53.867 53.867"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#f2c307"
                >
                  <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182" />
                </svg>
                <Progress percent={percentage} showInfo={false} />
                <p className="md:text-16 text-14 text-[#5979F2]">{starCount}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
  <div className="ml-12">
    <Title level={3} className="text-gray-800 mb-4">
      Write Your Review
    </Title>
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="flex-shrink-0">
        <div className="bg-gray-100 h-28 w-28 rounded-full flex items-center justify-center shadow-md">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<UserOutlined />}
          />
        </div>
      </div>

      <Form form={form} layout="vertical" className="w-full" onFinish={handleSubmit}>
        <Row gutter={[14, 14]}>
          <Col span={24}>
            <Form.Item
              name="rating"
              valuePropName="value"
              rules={[{ required: true, message: "Rating is required!" }]}
            >
              <Rate allowHalf className="text-yellow-500" />
            </Form.Item>
          </Col>

          <Col span={24}>
          <Form.Item
              name="comment"
              rules={[
                { required: true, message: "Comment is required!" },
                { max: 200, message: "Comment cannot exceed 200 characters." },
              ]}
            >
              <Input.TextArea
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleChangeComment}
                showCount
                maxLength={200}
                size="large"
                className="rounded-md"
                style={{
                  borderColor: "#E5E7EB",
                  padding: "12px",
                  backgroundColor: "#F9FAFB",
                }}
              />
            </Form.Item>

          </Col>

          <Col span={24}>
            <Button
              htmlType="submit"
              className="commentButton rounded-full h-12 w-full flex items-center justify-center mt-4 bg-[#fae368]"
              style={{ height: "45px", fontSize: "16px" }}
            >
              Submit Review
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
)}
      {/* Reviews List */}
      <div className="ml-9 mt-10">
      <h1 className="text-3xl text-left font-bold pl-12">Comment</h1>
      <List
          dataSource={fetchedReviews.slice(0, visibleReviews)}
          renderItem={(review: any, index: number) => (
            <List.Item key={review._id || index}>
              <div className="relative flex w-full flex-col rounded-xl bg-transparent text-gray-700">
                <div className="relative flex items-center gap-4 pt-0 pb-8">
                  <Avatar size={48} src={userInfo?.avatar_url} />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center">
                      <h5 className="text-sm font-medium">{review.reviewer_name || "Unknown User"}</h5>
                      <p className="text-xs mx-2 text-gray-500">
                        Reviewed on {dayjs(review.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <Rate disabled defaultValue={review.rating} />
                  </div>
                </div>
                <p className="text-gray-500 text-sm font-normal w-full">{review.comment}</p>
              </div>
            </List.Item>
          )}
        />

        {visibleReviews < reviewCount && (
            <Button onClick={handleViewMore}>View More Reviews</Button>
          )}
      </div>
    </div>
  );
};

export default CourseReviews;
