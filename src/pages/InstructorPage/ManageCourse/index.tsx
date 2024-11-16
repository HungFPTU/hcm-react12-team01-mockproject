import { lazy, useState } from 'react';
const CourseTable = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Course/CourseTable"));
const SessionTable = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Session/TableSession"));
const LessonTable = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Lesson/TableLesson"));

import { Tabs } from 'antd';


const ManageCourse = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [refreshKey, setRefreshKey] = useState(0);

  const items = [
    {
      key: '1',
      label: 'Course',
      children: <CourseTable key={`${activeTabKey}-course-${refreshKey}`} />,
    },
    {
      key: '2',
      label: 'Session',
      children: <SessionTable key={`${activeTabKey}-session-${refreshKey}`} />,
    },
    {
      key: '3',
      label: 'Lesson',
      children: <LessonTable key={`${activeTabKey}-lesson-${refreshKey}`} />,
    },
  ];

  const handleTabChange = (key : string) => {
    if (key === activeTabKey) {
      // If the same tab is selected, refresh it
      setRefreshKey((prev) => prev + 1);
    } else {
      // Switch to the selected tab
      setActiveTabKey(key);
    }
  };

  return (
    <div className="manage-course-container">
      <Tabs items={items} activeKey={activeTabKey} onChange={handleTabChange} />
    </div>
  );
};

export default ManageCourse;
