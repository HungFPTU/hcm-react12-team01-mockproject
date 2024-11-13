import { lazy, useState } from 'react';
const Course = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Course"));
const Session = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Session"));
const Lesson = lazy(() => import("../../../components/InstructorComponents/ManageCourse/Lesson"));

import { Tabs } from 'antd';

const ManageCourse = () => {
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [refreshKey, setRefreshKey] = useState(0);

  const items = [
    {
      key: '1',
      label: 'Course',
      children: <Course key={`${activeTabKey}-course-${refreshKey}`} />,
    },
    {
      key: '2',
      label: 'Session',
      children: <Session key={`${activeTabKey}-session-${refreshKey}`} />,
    },
    {
      key: '3',
      label: 'Lesson',
      children: <Lesson key={`${activeTabKey}-lesson-${refreshKey}`} />,
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
