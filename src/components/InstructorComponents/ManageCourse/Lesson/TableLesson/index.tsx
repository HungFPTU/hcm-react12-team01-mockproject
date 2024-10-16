import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Lessons from '../../../../../data/Lessons.json';
import Courses from '../../../../../data/Courses.json';
import { Lesson } from '../../../../../model/Lesson';
import { Course } from '../../../../../model/Course';

const TableLesson = () => {
  const navigate = useNavigate();
  const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
  const [searchTerm] = useState<string>("");

  useEffect(() => {
    const courses = Courses.courses as Course[];
    const lessons = Lessons.lessons as unknown as Lesson[];

    // Gắn tên khóa học vào từng session
    const lessonsWithCourseName = lessons.map(lesson => ({
      ...lesson,
      courseName: courses.find(course => course.id === lesson.course_id)?.name || 'Không xác định',
    }));
    
    setLessonsData(lessonsWithCourseName);
  }, []);

  const filteredLessons = lessonsData.filter((lesson) =>
    lesson.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())  
  );

  const handleViewDetails = (lessonId: string) => {
    navigate(`/${lessonId}`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      render: (text: string) => text,
    },
    {
      title: 'Lesson Type',
      dataIndex: 'lesson_type',
      key: 'lesson_type',
    },
    {
      title: 'Full Time',
      dataIndex: 'full_time',
      key: 'full_time',
      render: (text: string) => text,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Media',
      dataIndex: 'media',
      key: 'media',
      render: (text: string) => text,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Lesson) => (
        <Button type="primary" onClick={() => handleViewDetails(record.id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table<Lesson>
      dataSource={filteredLessons}
      columns={columns}
      rowKey="id"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      }}
    />
  );
};

export default TableLesson;
