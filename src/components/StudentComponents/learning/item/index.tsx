import { Card, Button } from "antd";

interface Course {
  id: number;
  title: string;
  author: string;
  originalPrice: number;
  discountPrice: number;
  finalPrice: number;
}

interface CourseItemProps {
  course: Course;
  onGoToDetail?: (id: number) => void;
  variant?: "waiting" | "checkout"; // Optional variant for UI differences
}

const CourseItem = ({
                      course,
                      onGoToDetail,
                      variant = "waiting",
                    }: CourseItemProps) => {
  return (
      <Card
          className="shadow-md hover:shadow-lg transition-all mb-4"
          bordered={false}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-500 mb-1">By {course.author}</p>
            <div className="flex space-x-2">
              <p className="line-through text-gray-400">${course.originalPrice}</p>
              <p className="text-green-500">Discount: ${course.discountPrice}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-red-500">${course.finalPrice}</p>
            {variant === "waiting" && (
                <Button
                    type="primary"
                    className="mt-2"
                    onClick={() => onGoToDetail?.(course.id)}
                >
                  Go to Course Detail
                </Button>
            )}
          </div>
        </div>
      </Card>
  );
};

export default CourseItem;
