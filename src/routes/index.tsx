import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import { DefaultLayout, InstructorLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import ManageCourse from "../pages/InstructorPage/ManageCourse";
import ViewDetailCourse from "../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse";
import ViewDetailSession from "../components/InstructorComponents/ManageCourse/Session/ViewDetailSession";
import ViewDetailLesson from "../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson";
import SalesHistory from "../components/InstructorComponents/SalesHistory";
import Review from "../components/InstructorComponents/Review";

const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/manage-course", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/:courseId", component: ViewDetailCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/:sessionId", component: ViewDetailSession, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/:lessonId", component: ViewDetailLesson, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/sales-history", component: SalesHistory, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/review", component: Review, layout: InstructorLayout, role: RoleEnum.Instructor},
];  

const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
