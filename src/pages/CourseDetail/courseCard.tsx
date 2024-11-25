import React, { useState } from "react";
import { Button, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CartCourseProps } from "../../model/cartCourseProps";
import { CartService } from "../../services/cart/cart.service";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContent";
// Utility functions
const formatPrice = (price: number | undefined | null) =>
  price ? `${price.toLocaleString("vi-VN")}₫` : "0₫";

const formatTime = (minutes: number | undefined | null) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0
    ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
    : `${remainingMinutes}p`;
};

const CourseCard: React.FC<CartCourseProps> = ({ course }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { userInfo } = useAuth();
  const isLoggedIn = !!userInfo;
  const handleAddToCart = async () => {
    if (course?.is_in_cart) {
      navigate("/cart");
      return;
    }
    try {
      setIsLoading(true);
      const response = await CartService.CreateCart({ course_id: course?._id });
      if (response.data.data?._id) {
        toast.success("Course added to cart successfully!");
        getCartCount();
        navigate("/cart");
      } else {
        toast.error("Failed to add course to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding course to cart:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPriceSection = () => {
    if (course?.discount) {
      return (
        <>
          <span className="discounted-price text-lg text-red-500">
            -{course.discount}% Disc.
          </span>
          <span
            className="original-price text-lg font-medium text-red-700"
            style={{
              textDecoration: "line-through",
              opacity: 0.5,
            }}
          >
            {formatPrice(course?.price)}
          </span>
          <span className="discounted-price text-lg text-red-500">
            {formatPrice(course?.price_paid)}
          </span>
        </>
      );
    }
    return <span className="price text-lg">{formatPrice(course?.price)}</span>;
  };

  const renderActionButton = () => {
    if (isLoggedIn) {
      if (course?.is_purchased) {
        return (
          <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-300 to-purple-50 p-4 text-center shadow-inner">
            <p className="text-xl font-semibold tracking-wide text-emerald-700">
              Congratulations! Start learning your course.
            </p>
          </div>
        );
      }
      return (
        <Button
          type="primary"
          style={{
            backgroundColor: "rgb(222 0 165)",
            borderColor: "rgb(222 0 165)",
            color: "white",
            width: "100%",
          }}
          loading={isLoading}
          onClick={handleAddToCart}
        >
          {course?.discount && !course?.is_in_cart
            ? `🛒 Buy ${formatPrice(course?.price_paid)}`
            : "View Cart"}
        </Button>
      );
    }
    return (
      <Button
        className="bg-purple-900 text-white text-xl px-24 py-6"
        type="default"
        onClick={() => navigate("/login")}
      >
        Login to learn
      </Button>
    );
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg backdrop-blur-md my-3 sticky">
      {course?.image_url && (
        <img
          alt={course.name}
          src={course.image_url}
          className="w-full h-auto"
        />
      )}
      <h1 className="text-2xl">{course?.name || "Unnamed Course"}</h1>
      <p className="my-2">
        <ClockCircleOutlined className="mr-2" />
        <strong>Duration:</strong> {formatTime(course?.full_time)}
      </p>
      <div className="flex items-center mb-3">
        <span className="text-md font-medium">
          {course?.instructor_name || "Unknown Instructor"}
        </span>
      </div>
      <p className="flex items-center gap-4 mt-2">{renderPriceSection()}</p>
      <div className="flex justify-center mt-4">{renderActionButton()}</div>
    </Card>
  );
};

export default CourseCard;
