import ManageCourse from "../pages/InstructorPage/ManageCourse";
import ViewDetailCourse from "../components/InstructorComponents/ManageCourse/Course/ViewDetailCourse";
import ViewDetailSession from "../components/InstructorComponents/ManageCourse/Session/ViewDetailSession";
import ViewDetailLesson from "../components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson";
import SalesHistory from "../components/InstructorComponents/SalesHistory";
import Review from "../components/InstructorComponents/Review";
import InstructorDashboard from "../pages/InstructorPage/InstructorDashboard";
import InstructorCourseLog from "../pages/InstructorPage/InstructorCourseLog";
import {
  AdminLayout,
  DefaultLayout,
  StudentLayout,
  InstructorLayout,
} from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
import AllCourses from "../pages/Admin/allcourses";
import CoursesLog from "../pages/Admin/courselog";
import PendingCourses from "../pages/Admin/PendingCourses";
import PurchaseLog from "../pages/Admin/purchaselog";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
<<<<<<< HEAD
import Register from "../pages/Register/Register";
import CourseDetail from "../pages/CourseDetail/CourseDetail"; 

import CompletedOrderPage from "../pages/Student/completed";
=======
>>>>>>> 136ba8076c40c54825ccd2c4b9844cad2a278c13
import StudentDashboard from "../pages/Student/dashboard";
import OrderPage from "../pages/Student/order";
import SettingPage from "../pages/Student/setting";
import SubscriptionPage from "../pages/Student/view-subscription";
import Daskboard from "../pages/Admin/Daskboard";
import CategoryManagement from "../pages/Admin/CategoryManagement";
import RequestManagement from "../pages/Admin/RequestManagement";
import UserManagement from "../pages/Admin/UserManagement";
import PayoutManagement from "../pages/Admin/PayoutManagement";
import InstructorSub from "../pages/InstructorPage/InstructorSub";



import All from "../pages/AllCourses";
import PayoutInstructorPage from "../pages/InstructorPage/PayoutInstructorPage";
import CartPage from "../pages/Student/cart";
import CheckoutPage from "../pages/Student/order/checkout";
const publicRoute: RouteConfig[] = [
<<<<<<< HEAD
  { path: "/", component: Home, layout: DefaultLayout, role: RoleEnum.Guest },
  { path: "/login", component: Login, layout: null, role: RoleEnum.Guest },
  // { path: "/instructorpage", component: ManageCourse, layout: InstructorLayout, role: RoleEnum.User},
  {path: "/register", component: Register, layout: null, role: RoleEnum.Guest},
  { path: "/course/:id", component: CourseDetail, layout: DefaultLayout, role: RoleEnum.Guest },

=======
  {
    path: "/",
    component: Home,
    layout: DefaultLayout,
    role: RoleEnum.Guest

  },
  {
    path: "/login",
    component: Login,
    layout: null,
    role: RoleEnum.Guest

  },
  {
    path: "/manage-course",
    component: ManageCourse,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/instructor-payout",
    component: PayoutInstructorPage,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/:courseId",
    component: ViewDetailCourse,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/:sessionId",
    component: ViewDetailSession,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/:lessonId",
    component: ViewDetailLesson,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/sales-history",
    component: SalesHistory,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/review",
    component: Review,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
  {
    path: "/purchase-courses",
    component: PurchaseLog,
    layout: InstructorLayout,
    role: RoleEnum.Instructor
  },
>>>>>>> 136ba8076c40c54825ccd2c4b9844cad2a278c13
  {
    path: "/instructor",
    component: InstructorDashboard,
    layout: InstructorLayout,
    role: RoleEnum.Instructor,
  },
  {
    path: "/course-log-instructor",
    component: InstructorCourseLog,
    layout: InstructorLayout,
    role: RoleEnum.Instructor,
  },
  {
    path: "/all",
    component: All,
    layout: DefaultLayout,
    role: RoleEnum.Guest

  },
  {
    path: "/subcription-instructor",
    component: InstructorSub,
    layout: InstructorLayout,
    role: RoleEnum.Instructor

  },
  {
    path: "/student",
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
    path: "/cart",
    component: CartPage,
    layout: StudentLayout,
    role: RoleEnum.Student,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
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
    path: "/daskboard-admin",
    component: Daskboard,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/display-account",
    component: UserManagement,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/request-management",
    component: RequestManagement,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/category-management",
    component: CategoryManagement,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/payout-management",
    component: PayoutManagement,
    layout: AdminLayout,
    role: RoleEnum.Admin,
  },
  {
    path: "/admin",
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

const studentRoute: RouteConfig[] = [];
const adminRoute: RouteConfig[] = [];
const privateRoute: RouteConfig[] = [];

export { privateRoute, publicRoute, studentRoute, adminRoute };
