
import { lazy } from 'react';
const ButtonCourse = lazy(() => import("./ButtonCourse"));
const CourseTable = lazy(() => import("./CourseTable"));  


const Course = () => {
  return (
    <div className="manage-course-container max-w-full mx-auto px-4">

      <div className="flex-shrink-0">
        <ButtonCourse />
      </div>

      <div className="mt-6">
        <CourseTable />
      </div>
    </div>
  );
};

export default Course;
