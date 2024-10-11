import { Tabs } from "antd";
import type { TabsProps } from "antd";
import TableCourses from "./tableCourses";
import TableSession from "./tableSession";
import TableLession from "./tableLession";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Courses",
    children: <TableCourses />,
  },
  {
    key: "2",
    label: "Session",
    children: <TableSession />,
  },
  {
    key: "3",
    label: "Lession",
    children: <TableLession />,
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
