import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import { DefaultLayout, InstructorLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import ManageCourse from "../pages/InstructorPage/ManageCourse";


const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/instructor", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
];

const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
