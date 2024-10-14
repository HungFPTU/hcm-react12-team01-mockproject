import Home from "../pages/Home";
// import Student from "../pages/DashboardStudent";
import Login from "../pages/Login/Login";
import { DefaultLayout, InstructorLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import ManageCourse from "../pages/InstructorPage/ManageCourse";
import ViewDetailCourse from "../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse";
import Course from "../components/InstructorComponents/ManageCourse/Course";
import Session from "../components/InstructorComponents/ManageCourse/Session";


const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/instructor/manage-course", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/course", component: Course, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/course/:courseId", component: ViewDetailCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/session", component: Session, layout: InstructorLayout, role: RoleEnum.Instructor},
];

const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
