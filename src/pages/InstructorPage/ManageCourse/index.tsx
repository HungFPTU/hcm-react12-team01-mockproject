import React from 'react';
import Course from '../../../components/InstructorComponents/ManageCourse/Course';
const ManageCourse: React.FC = () => {
  return (
    <div className="manage-course-container">
      <h1>Quản lý khóa học</h1>
      <Course />
    </div>
  );
};

export default ManageCourse;
