import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Sessions from '../../../../../data/Sessions.json';
import Courses from '../../../../../data/Courses.json';
import { Session } from '../../../../../model/Session';
import { Course } from '../../../../../model/Course';

const TableSession = () => {
  const navigate = useNavigate();
  const [sessionsData, setSessionsData] = useState<Session[]>([]);
  const [searchTerm] = useState<string>("");

  useEffect(() => {
    const courses = Courses.courses as unknown as Course[];
    const sessions = Sessions.sessions as unknown as Session[];

    // Gắn tên khóa học vào từng session
    const sessionsWithCourseName = sessions.map(session => ({
      ...session,
      courseName: courses.find(course => course.id === session.course_id)?.name || 'Không xác định',
    }));

    setSessionsData(sessionsWithCourseName);
  }, []);

  const filteredSessions = sessionsData.filter((session) =>
    session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (sessionId: string) => {
    navigate(`/instructor/${sessionId}`);
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
      title: 'Lesson',
      dataIndex: 'lesson',
      key: 'lesson',
      render: (text: string) => text,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: Session) => (
        <Button type="primary" onClick={() => handleViewDetails(record.id)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table<Session>
      dataSource={filteredSessions}
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

export default TableSession;
