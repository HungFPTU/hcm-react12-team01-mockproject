// import { useState } from 'react';
import { Table, Button, Switch } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
import { Course, CourseStatusEnum } from '../../../../../model/Course';
import { useNavigate } from 'react-router-dom';
// import course from '../../../../../data/Courses.json';
import CourseData from '../../../../../data/CoursesData.json';


const CourseTable = ({ searchQuery }: { searchQuery: string}) => {
  const navigate = useNavigate();
  // const [courses, setCourses] = useState<CourseData[]>();

  const filteredCourses = CourseData.courses
  .filter((course) =>
  course.id.toLowerCase().includes(searchQuery.toLowerCase())|| 
  course.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .map((course) => ({
    ...course,
    key: course.id
  }))

  const handleViewDetails = (courseId: string) => {
    // Navigate to the user detail page
    navigate(`/instructor/course/${courseId}`);
  };

  const onChangeStatus = (id: string, status: CourseStatusEnum) => {
    console.log(`Changing status for course ${id} to ${status}`);
    // Xử lý logic thay đổi trạng thái ở đây
  };

  // const onViewDetail = (id: string) => {
  //   // Xử lý logic xem chi tiết ở đây, sử dụng id
  //   navigate(`/instructor/course/${id}`);
  // };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Sessions',
      dataIndex: 'sessionCount',
      key: 'sessionCount',
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
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => date.toLocaleDateString('vi-VN'),
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
      dataSource={filteredCourses.map((course) => ({
        ...course,
        createdAt: new Date(course.created_at),
        status: course.status as CourseStatusEnum,
        key: course.id
      }))}
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
