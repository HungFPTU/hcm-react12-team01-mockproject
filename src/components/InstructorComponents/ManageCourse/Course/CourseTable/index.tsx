import { useState } from 'react';
import { Table, Button, Switch } from 'antd';
import { Course, CourseStatusEnum } from '../../../../../model/Course';
import { useNavigate } from 'react-router-dom';
import Courses from '../../../../../data/Courses.json';


const CourseTable = () => {
  const navigate = useNavigate();
  const [coursesData] = useState<Course[]>(Courses.courses as unknown as Course[]);
  const [searchTerm] = useState<string>("");

  const filteredCourses = coursesData.filter((course) =>
  course.id.toLowerCase().includes(searchTerm.toLowerCase())|| 
  course.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleViewDetails = (courseId: string) => {
    // Navigate to the user detail page
    navigate(`/instructor/course/${courseId}`);
  };

  const onChangeStatus = (id: string, status: CourseStatusEnum) => {
    console.log(`Changing status for course ${id} to ${status}`);
    // Xử lý logic thay đổi trạng thái ở đây
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (category_id: string) => `${category_id}`,
    },
    {
      title: 'Sessions',
      dataIndex: 'session',
      key: 'session',
      render: (session: string) => `${session}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount: number) => `${discount}%`,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at: string) => `${created_at}`,
    },
    {
      title: 'Change Status',
      key: 'changeStatus',
      render: (_: unknown, record: Course) => (
        <Switch
          checked={record.status === CourseStatusEnum.Active}
          onChange={(checked) => onChangeStatus(record.id, checked ? CourseStatusEnum.Active : CourseStatusEnum.Inactive)}
          className="bg-blue-500"
        />
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (_: unknown, record: Course) => (
        <Button onClick={() => handleViewDetails(record.id)} className="bg-blue-500 hover:bg-blue-600 text-white">
          View Detail
        </Button>
      )
    },  
  ];

  return (
    <Table<Course>
      columns={columns}
      dataSource={filteredCourses}
      rowKey="id"
      className="w-full shadow-md rounded-lg overflow-hidden"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khóa học`,
      }}
    />
  );
};

export default CourseTable;
