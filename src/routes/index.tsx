import Home from "../pages/Home";
import Login from "../pages/Login";
// import ManageCourse from "../pages/InstructorPage/ManageCourse";
import { DefaultLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";


const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  // { path: "/instructorpage", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.User},
];

const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
