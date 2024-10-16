import { Tabs } from "antd";
import type { TabsProps } from "antd";

import TableCoursesPending from "./tableCourse";
import TableSessionPending from "./tableSession";
import TableLessionPending from "./tableLession";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Courses",
    children: <TableCoursesPending />,
  },
  {
    key: "2",
    label: "Session",
    children: <TableSessionPending />,
  },
  {
    key: "3",
    label: "Lession",
    children: <TableLessionPending />,
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
