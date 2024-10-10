import Home from "../pages/Home";
import Student from "../pages/DashboardStudent";
import Login from "../pages/Login/Login";
import { DefaultLayout, InstructorLayout } from "../layout";
import { StudentLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import InstructorDashboard from "../pages/InstructorPage/InstructorDashboard";
import InstructorCourseLog from "../pages/InstructorPage/InstructorCourseLog";



const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/dashboard-student", component: Student, layout: StudentLayout, role: RoleEnum.Student },
  { path: "/dashboard-instructor", component: InstructorDashboard, layout: InstructorLayout, role: RoleEnum.Instructor },
  { path: "/course-log-instructor", component: InstructorCourseLog, layout: InstructorLayout, role: RoleEnum.Instructor },



];
const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
