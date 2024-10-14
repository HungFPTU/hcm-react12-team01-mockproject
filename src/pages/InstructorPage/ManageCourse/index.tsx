import React from 'react';
import CourseTable from '../../../components/InstructorComponents/ManageCourse/Course/CourseTable';
import ButtonCourse from '../../../components/InstructorComponents/ManageCourse/Course/ButtonCourse';
import SearchCourse from '../../../components/InstructorComponents/ManageCourse/Course/SearchCourse';
// import Course from '../../../components/InstructorComponents/ManageCourse/Course';
const ManageCourse = () => {
  return (
    <div className="manage-course-container">
      <h1>Quản lý khóa học</h1>
      <div className='mt-4'>
        <ButtonCourse/>
      </div>
      <div className='mt-4'>
        <SearchCourse onSearch={() => {}}/>
      </div>
      <div className='mt-4'>
        <CourseTable/>
      </div>
    </div>
  );
};

export default ManageCourse;
