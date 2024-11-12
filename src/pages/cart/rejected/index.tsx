import { useState } from "react";
import { Empty, notification } from "antd";
import CartItem from "../../../components/StudentComponents/cart/item/index.tsx";
import { cartCourses } from "../../../components/StudentComponents/cart/mockCartData.ts";

const RejectedPage = () => {
    const [rejectedCourses, setRejectedCourses] = useState(cartCourses); // Initialize with mock data

    const handleRebuy = (id: number) => {
        // Show notification on rebuy
        notification.success({
            message: "Rebuy Successful",
            description: "The course has been added back to your cart.",
        });

        // Remove the course from the rejected list
        setRejectedCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== id)
        );
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-auto p-8">
                {rejectedCourses.length > 0 ? (
                    rejectedCourses.map((course) => (
                        <CartItem
                            key={course.id}
                            item={course}
                            onDeleteItem={handleRebuy} // Rebuy functionality
                            variant="rejected" // Optional variant for styling
                        />
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Empty description="No rejected courses" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RejectedPage;
