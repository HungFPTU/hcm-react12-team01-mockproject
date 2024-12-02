import { Col, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import TableCourses from "./tableCourses";
import TableSession from "./tableSession";
import TableLession from "./tableLession";
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Courses",
    children: (
      <div className="manage-course-container max-w-full mx-auto px-4">
        <div className="mt-6 flex justify-between">
          <div className="flex">
            <div className="flex-1 max-w-full "></div>
          </div>
        </div>
        <div className="mt-6">
          <TableCourses />
        </div>
      </div>
    ),
  },
  {
    key: "2",
    label: "Session",
    children: (
      <div className="manage-course-container">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={16}>
          </Col>
          <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
            <></>
          </Col>
        </Row>
        <div className="mt-4">
          <TableSession />
        </div>
      </div>
    ),
  },
  {
    key: "3",
    label: "Lession",
    children: (
      <div className="manage-course-container">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={16}></Col>
          <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
            <></>
          </Col>
        </Row>
        <div className="mt-4">
          <TableLession />
        </div>
      </div>
    ),
  },
];
function AllCourses() {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default AllCourses;
