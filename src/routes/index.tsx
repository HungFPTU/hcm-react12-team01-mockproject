/* eslint-disable react-refresh/only-export-components */
import {
  AdminLayout,
  DefaultLayout,
  StudentLayout,
  InstructorLayout,
} from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
// const Unauthorized = lazy(() => import('./pages/Unauthorized')); // Lazy load the Unauthorized page
const Home = "./pages/Home";
const ManageCourse = "./pages/InstructorPage/ManageCourse";
const ViewDetailCourse = "./components/InstructorComponents/ManageCourse/Course/ViewDetailCourse";
const ViewDetailSession = "./components/InstructorComponents/ManageCourse/Session/ViewDetailSession";
const ViewDetailLesson = "./components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson";
const SalesHistory = "./components/InstructorComponents/SalesHistory";
const Review = "./components/InstructorComponents/Review";
const InstructorDashboard = "./pages/InstructorPage/InstructorDashboard";
const InstructorCourseLog = "./pages/InstructorPage/InstructorCourseLog";
const AllCourses = "./pages/Admin/allcourses";
const CoursesLog = "./pages/Admin/courselog";
const PendingCourses = "./pages/Admin/PendingCourses";
const PurchaseLog = "./pages/Admin/purchaselog";
const Login = "./pages/Login/Login";
const StudentDashboard = "./pages/Student/dashboard";
const OrderPage = "./pages/Student/order";
const SettingPage = "./pages/Student/setting";
const SubscriptionPage = "./pages/Student/view-subscription";
const Daskboard = "./pages/Admin/Daskboard";
const CategoryManagement = "./pages/Admin/CategoryManagement";
const RequestManagement = "./pages/Admin/RequestManagement";
const UserManagement = "./pages/Admin/UserManagement";
const PayoutManagement = "./pages/Admin/PayoutManagement";
const InstructorSub = "./pages/InstructorPage/InstructorSub";
const All = "./pages/AllCourses";
const PayoutInstructorPage = "./pages/InstructorPage/PayoutInstructorPage";
const Unauthorized = "./pages/unauthorize";
const CartPage = "./pages/Student/cart";
const CheckoutPage = "./pages/Student/order/checkout";
const publicRoute: RouteConfig[] = [
  {
    path: "/",
    importURL: Home,
    layout: DefaultLayout,
    role: [RoleEnum.Guest]

  },
  {
    path: "/login",
    importURL: Login,
    layout: null,
    role: [RoleEnum.Guest]


  },
  {
    path: "/manage-course",
    importURL: ManageCourse,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]
  },
  {
    path: "/instructor-payout",
    importURL: PayoutInstructorPage,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/:courseId",
    importURL: ViewDetailCourse,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/:sessionId",
    importURL: ViewDetailSession,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/:lessonId",
    importURL: ViewDetailLesson,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/sales-history",
    importURL: SalesHistory,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/review",
    importURL: Review,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/purchase-courses",
    importURL: PurchaseLog,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/instructor",
    importURL: InstructorDashboard,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/course-log-instructor",
    importURL: InstructorCourseLog,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]

  },
  {
    path: "/all",
    importURL: All,
    layout: DefaultLayout,
    role: [RoleEnum.Guest]

  },
  {
    path: "/subcription-instructor",
    importURL: InstructorSub,
    layout: InstructorLayout,
    role: [RoleEnum.Instructor]


  },
  {
    path: "/student",
    importURL: StudentDashboard,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },

  {
    path: "/view-order",
    importURL: OrderPage,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },
  {
    path: "/cart",
    importURL: CartPage,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },
  {
    path: "/checkout",
    importURL: CheckoutPage,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },
  {
    path: "/list-subscription",
    importURL: SubscriptionPage,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },
  {
    path: "/setting",
    importURL: SettingPage,
    layout: StudentLayout,
    role: [RoleEnum.Student],
  },
  {
    path: "/daskboard-admin",
    importURL: Daskboard,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/display-account",
    importURL: UserManagement,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/request-management",
    importURL: RequestManagement,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/category-management",
    importURL: CategoryManagement,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/payout-management",
    importURL: PayoutManagement,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/admin",
    importURL: AllCourses,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/pending-courses",
    importURL: PendingCourses,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/courses-log",
    importURL: CoursesLog,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/pruchase-courses",
    importURL: PurchaseLog,
    layout: AdminLayout,
    role: [RoleEnum.Admin],
  },
  {
    path: "/unauthorized",
    importURL: Unauthorized,
    layout: null,
    role: [RoleEnum.Guest],
  },
];

const privateRoute: RouteConfig[] = [];

export { privateRoute, publicRoute};
