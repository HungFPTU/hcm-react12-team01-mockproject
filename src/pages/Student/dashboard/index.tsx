import {
  BookOutlined,
  DashboardFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Card } from "antd";

const StudentDashboard = () => {
  return (
    <div className="p-8 mt-5 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <DashboardFilled className="mr-2" /> Student DashBoard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Purchased Courses Card */}
        <Card
          className="shadow-md hover:shadow-lg transition-transform"
          bordered={false}
        >
          <div className="flex items-center">
            <BookOutlined
              style={{ fontSize: "36px", color: "#eb2f96" }}
              className="mr-4"
            />
            <div>
              <h3 className="text-lg">Purchased Courses</h3>
              <span className="text-2xl font-bold">6</span>
            </div>
          </div>
        </Card>

        {/* Subscribed Card */}
        <Card
          className="shadow-md hover:shadow-lg transition-transform"
          bordered={false}
        >
          <div className="flex items-center">
            <UsergroupAddOutlined
              style={{ fontSize: "36px", color: "#eb2f96" }}
              className="mr-4"
            />
            <div>
              <h3 className="text-lg">Subscribed</h3>
              <span className="text-2xl font-bold">1</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default StudentDashboard;
