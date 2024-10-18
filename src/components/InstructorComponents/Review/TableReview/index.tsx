import { useState } from 'react';
import { Table } from 'antd';
import { Review } from '../../../../model/Review';
import Reviews from '../../../../data/Reviews.json';
import { StarFilled, StarOutlined } from '@ant-design/icons'; // Import icon ngôi sao

const ReviewTable = () => {
  const [reviewsData, setReviewsData] = useState<Review[]>(Reviews.reviews as unknown as Review[]);
  const [searchTerm] = useState<string>("");

  const filteredReviews = reviewsData.filter((review) =>
    review.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRatingChange = (id: string, newRating: number) => {
    const updatedReviews = reviewsData.map(review =>
      review.id === id ? { ...review, current_rating: newRating } : review
    );
    setReviewsData(updatedReviews);
  };

  const columns = [
    {
      title: 'Reviewer Name',
      dataIndex: 'user_id', // Cập nhật thành user_id để lấy tên người dùng
      key: 'user_id',
      render: (user_id: string) => `${user_id}`,
    },
    {
      title: 'Course Name',
      dataIndex: 'course_id',
      key: 'course_id',
      render: (course_id: string) => `${course_id}`,
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      render: (comment: string) => `${comment}`,
    },
    {
      title: 'Rating',
      key: 'rating',
      render: (_: unknown, review: Review) => (
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            star <= (review.current_rating ?? review.rating) ? (
              <StarFilled 
                key={star} 
                onClick={() => handleRatingChange(review.id, star)} 
                style={{ color: 'gold', cursor: 'pointer' }} 
              />
            ) : (
              <StarOutlined 
                key={star} 
                onClick={() => handleRatingChange(review.id, star)} 
                style={{ color: 'gray', cursor: 'pointer' }} 
              />
            )
          ))}
        </div>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => `${created_at}`,
    },
  ];

  return (
    <Table<Review>
      columns={columns}
      dataSource={filteredReviews}
      rowKey="id"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đánh giá`,
      }}
    />
  );
};

export default ReviewTable;
