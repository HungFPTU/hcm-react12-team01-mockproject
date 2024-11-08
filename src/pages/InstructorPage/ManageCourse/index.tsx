import { lazy } from 'react';
const Course = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Course"));
const Session = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Session"));
const Lesson = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Lesson"));

import { Tabs } from 'antd';
const ManageCourse = () => {
  const items = [
    {
      key: '1',
      label: 'Course',
      children: <Course/>,
    },
    {
      key: '2',
      label: 'Session',
      children: <Session/>,
    },
    {
      key: '3',
      label: 'Lesson',
      children: <Lesson/>,
    },
  ];
  return (
    <div className="manage-course-container">
      <Tabs items={items} />
    </div>
  );
};

export default ManageCourse;
