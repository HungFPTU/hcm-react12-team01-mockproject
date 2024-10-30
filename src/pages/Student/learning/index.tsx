import {Empty} from "antd";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {courses as mockCourses} from "../../../components/StudentComponents/learning/mockData";
import CourseList from "../../../components/StudentComponents/learning/lists";

const LearningPage = () => {
    const [courses] = useState(mockCourses);
    const navigate = useNavigate();

    const handleGoToDetail = (id: number) => {
        navigate(`/student/course/${id}`); // Navigate to course detail page
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1 overflow-auto p-8">
                {courses.length > 0 ? (
                    <CourseList
                        courses={courses}
                        onGoToDetail={handleGoToDetail}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Empty description="No courses available"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningPage;
