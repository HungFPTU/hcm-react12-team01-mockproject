import CourseItem from "../item"; // Import the new CourseItem component
import { Course } from "../mockData"; // Import Course type or mock data as needed

interface CourseListProps {
  courses: Course[]; // List of courses
  onGoToDetail: (id: number) => void; // Callback for course detail navigation
}

const CourseList = ({ courses, onGoToDetail }: CourseListProps) => {
  return (
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
            <CourseItem
                key={course.id}
                course={course}
                onGoToDetail={onGoToDetail}
                variant="waiting"
            />
        ))}
      </div>
  );
};

export default CourseList;
