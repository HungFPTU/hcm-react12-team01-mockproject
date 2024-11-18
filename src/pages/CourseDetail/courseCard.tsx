import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { CartCourseProps } from "../../model/cartCourseProps";
import { CartService } from "../../services/cart/cart.service";

const CourseSidebar: React.FC<CartCourseProps> = ({ course }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check login status on component mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  const handleAddToCart = async () => {
    try {
      if (course?.is_in_cart) {
        navigate("/cart");
      } else {
        const response = await CartService.CreateCart({course_id:course._id});
        if (response.data.data && response.data.data._id) {
          navigate("/cart");
        } else {
          console.error("Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Error handling cart operation:", error);
    }
  };

  const formatPrice = (price: number | undefined | null) =>
    price ? `${price.toLocaleString("vi-VN")}₫` : "0₫";

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0
      ? `${hours}h${remainingMinutes > 0 ? remainingMinutes + "p" : ""}`
      : `${remainingMinutes}p`;
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg backdrop-blur-md my-3 sticky">
      <img
        alt={course?.name}
        src={course?.image_url}
        className="w-full h-auto"
      />
      <h1 className="text-2xl">{course?.name}</h1>
      <p className="my-2">
        <ClockCircleOutlined className="mr-2" />
        <strong>Duration:</strong> {formatTime(course?.full_time)}
      </p>
      <div className="flex items-center mb-3">
        <span className="text-md font-medium">{course?.instructor_name}</span>
      </div>
      <p className="flex items-center gap-4 mt-2">
        {course?.discount && course?.price_paid ? (
          <>
            {course?.price !== undefined && (
              <p
                className="original-price text-lg"
                style={{
                  textDecoration: "line-through",
                  opacity: 0.5,
                }}
              >
                {formatPrice(course?.price)}
              </p>
            )}
            <p className="discounted-price text-lg text-red-500">
              {formatPrice(course?.price_paid)}
            </p>
          </>
        ) : (
          course?.price !== undefined && (
            <p className="price text-lg">{formatPrice(course?.price)}</p>
          )
        )}
      </p>
      <div className="flex justify-center mt-4">
        {isLoggedIn ? (
          course?.is_purchased ? (
            <div className="mb-6 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 p-4 text-center shadow-inner">
              <p className="text-xl font-semibold tracking-wide text-emerald-700">
                ✨ Congratulations! You own this course ✨
              </p>
              <p className="mt-2 text-sm text-emerald-600">
                Enjoy unlimited access to all course materials
              </p>
            </div>
          ) : (
            <Button
              className="bg-purple-900 text-white text-lg px-10 py-7"
              type="primary"
              onClick={handleAddToCart}
            >
              {course?.is_in_cart ? "View Cart" : "Add to Cart"}
            </Button>
          )
        ) : (
          <Button
            className="bg-purple-900 text-white text-xl px-24 py-6"
            type="default"
            onClick={() => navigate("/login")}
          >
            Login to learn
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CourseSidebar;
