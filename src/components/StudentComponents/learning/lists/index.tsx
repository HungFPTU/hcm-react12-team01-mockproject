import CourseItem from "../item";
import { Course } from "../mockData";

interface CourseListProps {
    courses: Course[];
    onGoToDetail: (id: number) => void;
}

function CourseList({ courses, onGoToDetail }:CourseListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {courses.map((course) => (
                <CourseItem
                    key={course.id}
                    course={course}
                    onGoToDetail={onGoToDetail}
                />
            ))}
        </div>
    );
};

export default CourseList;
