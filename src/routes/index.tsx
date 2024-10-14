import InstructorDashboard from "../pages/InstructorPage/InstructorDashboard";
import InstructorCourseLog from "../pages/InstructorPage/InstructorCourseLog";
import { AdminLayout, DefaultLayout, StudentLayout, InstructorLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import AllCourses from "../pages/Admin/allcourses";
import CoursesLog from "../pages/Admin/courselog";
import PendingCourses from "../pages/Admin/PendingCourses";
import PurchaseLog from "../pages/Admin/purchaselog";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import CompletedOrderPage from "../pages/Student/completed";
import StudentDashboard from "../pages/Student/dashboard";
import OrderPage from "../pages/Student/order";
import SettingPage from "../pages/Student/setting";
import SubscriptionPage from "../pages/Student/view-subscription";

const publicRoute: RouteConfig[] = [
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  { path: "/dashboard-instructor", component: InstructorDashboard, layout: InstructorLayout, role: RoleEnum.Instructor },
  { path: "/course-log-instructor", component: InstructorCourseLog, layout: InstructorLayout, role: RoleEnum.Instructor },
  {
    path: "/dashboard-student",
    component: StudentDashboard,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  
  {
    path: "/view-order",
    component: OrderPage,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  {
    path: "/view-order/completed-orders",
    component: CompletedOrderPage,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  {
    path: "/list-subscription",
    component: SubscriptionPage,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  {
    path: "/setting",
    component: SettingPage,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  {
    path: "/all-courses",
    component: AllCourses,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/pending-courses",
    component: PendingCourses,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/courses-log",
    component: CoursesLog,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/pruchase-courses",
    component: PurchaseLog,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },

];

const studentRoute: RouteConfig[] = [
  
];
const adminRoute: RouteConfig[] = [
  
];
const privateRoute: RouteConfig[] = [];

export { privateRoute, publicRoute, studentRoute, adminRoute };
