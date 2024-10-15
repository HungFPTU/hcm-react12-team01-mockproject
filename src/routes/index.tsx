import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import { DefaultLayout, InstructorLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import ManageCourse from "../pages/InstructorPage/ManageCourse";
import ViewDetailCourse from "../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse";
import Course from "../components/InstructorComponents/ManageCourse/Course";
import Session from "../components/InstructorComponents/ManageCourse/Session";
import ViewDetailSession from "../components/InstructorComponents/ManageCourse/Session/ViewDetailSession";
import Lesson from "../components/InstructorComponents/ManageCourse/Lesson";
import ViewDetailLesson from "../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson";
import SalesHistory from "../components/InstructorComponents/SalesHistory";
import Review from "../components/InstructorComponents/Review";

const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/instructor/manage-course", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/course", component: Course, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/course/:courseId", component: ViewDetailCourse, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/session", component: Session, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/session/:sessionId", component: ViewDetailSession, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/lesson", component: Lesson, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/manage-course/lesson/:lessonId", component: ViewDetailLesson, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/sales-history", component: SalesHistory, layout: InstructorLayout, role: RoleEnum.Instructor},
  { path: "/instructor/review", component: Review, layout: InstructorLayout, role: RoleEnum.Instructor},
];  

const privateRoute: RouteConfig[] = [];

export { publicRoute, privateRoute };
