import React from 'react';
import { Table, Button, Switch } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Course, CourseStatusEnum } from '../../../../../model/Course';

interface CourseTableProps {
  courses: Course[];
  onChangeStatus: (courseId: string, status: string) => void;
  onViewDetail: (courseId: string) => void;
}

const onChangeStatus = (id: string, status: CourseStatusEnum) => {
  console.log(`Changing status for course ${id} to ${status}`);
  // Xử lý logic thay đổi trạng thái ở đây, sử dụng id
};

const CourseTable: React.FC<CourseTableProps> = ({ courses, onViewDetail }) => {
  const columns: ColumnsType<Course> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sessions',
      dataIndex: 'sessionCount',
      key: 'sessionCount',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
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
      render: (_, record) => (
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
      render: (_, record) => (
        <Button onClick={() => onViewDetail(record.id)} className="bg-blue-500 hover:bg-blue-600 text-white">
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses}
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
