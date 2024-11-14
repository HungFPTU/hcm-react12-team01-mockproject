import { Col, Row, Tabs } from "antd";
import type { TabsProps } from "antd";
import TableCourses from "./tableCourses";
import TableSession from "./tableSession";
import TableLession from "./tableLession";
import SearchCourse from "../../../components/InstructorComponents/ManageCourse/Course/SearchCourse";
import SearchSession from "../../../components/InstructorComponents/ManageCourse/Session/SearchSession";
import SearchLesson from "../../../components/InstructorComponents/ManageCourse/Lesson/SearchLesson";



const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Courses",
    children:
      <div className="manage-course-container max-w-full mx-auto px-4">
        <div className="mt-6 flex justify-between">

          <div className="flex gap-2">
            <div className="flex-1 max-w-full ">
              <SearchCourse onSearch={() => { }} />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <TableCourses />
        </div>

      </div>

  },
  {
    key: "2",
    label: "Session",
    children:
      <div className="manage-course-container">
        <Row gutter={16} align="middle"> {/* Use Row for horizontal layout */}
          <Col xs={24} sm={12} md={16}> {/* Adjust column widths as needed */}
            <SearchSession onSearch={() => { }} />
          </Col>
          <Col xs={24} sm={12} md={8} style={{ textAlign: 'right' }}>
            <></>
          </Col>
        </Row>
        <div className='mt-4'>
          <TableSession />
        </div>
      </div>
    ,
  },
  {
    key: "3",
    label: "Lession",
    children:
      <div className="manage-course-container">
        <Row gutter={16} align="middle">
          <Col xs={24} sm={12} md={16}>
            <SearchLesson onSearch={() => { }} />
          </Col>
          <Col xs={24} sm={12} md={8} style={{ textAlign: 'right' }}>
            <></>
          </Col>
        </Row>
        <div className='mt-4'>
          <TableLession />
        </div>
      </div>,
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
