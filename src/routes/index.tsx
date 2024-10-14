import Home from "../pages/Home";
import Student from "../pages/DashboardStudent";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CourseDetail from "../pages/CourseDetail/CourseDetail"; 
import { DefaultLayout } from "../layout";
import { StudentLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";


const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  // { path: "/instructorpage", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.User},
  {path: "/register", component: Register, layout: null, role: RoleEnum.Guest},
  { path: "/dashboard-student",component: Student, layout: StudentLayout, role: RoleEnum.User },
  { path: "/course/:id", component: CourseDetail, layout: DefaultLayout, role: RoleEnum.Guest },


];
const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
