import Course from '../../../components/InstructorComponents/ManageCourse/Course';
import Session from '../../../components/InstructorComponents/ManageCourse/Session';
import Lesson from '../../../components/InstructorComponents/ManageCourse/Lesson';
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
