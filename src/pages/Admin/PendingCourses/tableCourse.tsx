import { Table, Tag, Input, Button, Space,  Modal, Radio } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Pcourse } from "../../../model/PendingCourse";

// export type Pcourse = {
//   key: number;
//   name: string;
//   categoryName: string;
//   status: string;
//   price: number;
//   discount: number;
//   createdAt: string;
// };

const initialCourses: Pcourse[] = [
  {
    key: 1,
    name: "Introduction to Python Programming",
    categoryName: "Teaching Methods",
    status: "waiting_approve",
    price: 0,
    discount: 0,
    createdAt: "2024-07-08",
  },
  {
    key: 2,
    name: "Advanced JavaScript",
    categoryName: "Web Development",
    status: "active",
    price: 100,
    discount: 10,
    createdAt: "2024-05-15",
  },
  {
    key: 3,
    name: "Data Structures in C++",
    categoryName: "Computer Science",
    status: "reject",
    price: 50,
    discount: 5,
    createdAt: "2024-06-20",
  },
  {
    key: 4,
    name: "Machine Learning Basics",
    categoryName: "Artificial Intelligence",
    status: "waiting_approve",
    price: 150,
    discount: 20,
    createdAt: "2024-04-10",
  },
  {
    key: 5,
    name: "Introduction to Databases",
    categoryName: "Data Management",
    status: "active",
    price: 70,
    discount: 0,
    createdAt: "2024-03-22",
  },
  {
    key: 6,
    name: "Principles of Design",
    categoryName: "Graphic Design",
    status: "waiting_approve",
    price: 85,
    discount: 15,
    createdAt: "2024-07-01",
  },
];

const TableCoursesPending = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Pcourse | null>(null);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear message input after sending
  };

  const showModal = (course: Pcourse) => {
    setCurrentCourse(course);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (currentCourse) {
      const newCourses = courses.map((course) => {
        if (course.key === currentCourse.key) {
          return { ...course, status: currentCourse.status };
        }
        return course;
      });
      setCourses(newCourses);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleStatusChange = (e: any) => {
    if (currentCourse) {
      setCurrentCourse({ ...currentCourse, status: e.target.value });
    }
  };

  const columns: ColumnsType<Pcourse> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color =
          status === "waiting_approve"
            ? "gold"
            : status === "active"
            ? "green"
            : "volcano";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        record.status === "waiting_approve" && (
          <Button onClick={() => showModal(record)} type="primary">
            Change Status
          </Button>
        ),
    },
  ];

  const filteredCourses = courses.filter(
    (course) => course.status === "waiting_approve"
  );

  return (
    <div>
      <div style={{ paddingBottom: "12px" }}>
        <Space>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Space>
      </div>
      <Table dataSource={filteredCourses} columns={columns} />
      {currentCourse && (
        <Modal
          title="Change Course Status"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Radio.Group
            onChange={handleStatusChange}
            value={currentCourse.status}
          >
            <Radio value="active">Active</Radio>
            <Radio value="reject">Reject</Radio>
          </Radio.Group>
        </Modal>
      )}
    </div>
  );
};

export default TableCoursesPending;
