import { DefaultLayout, StudentLayout } from "../layout";
import { RoleEnum, RouteConfig } from "../model/RouteConfig";
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
];

const studentRoute: RouteConfig[] = [
  {
    path: "/dashboard-student",
    component: StudentDashboard,
    layout: StudentLayout,
    role: RoleEnum.User,
  },
  {
    path: "/view-order",
    component: OrderPage,
    layout: StudentLayout,
    role: RoleEnum.User,
  },
  {
    path: "/view-order/completed-orders",
    component: CompletedOrderPage,
    layout: StudentLayout,
    role: RoleEnum.User,
  },
  {
    path: "/list-subscription",
    component: SubscriptionPage,
    layout: StudentLayout,
    role: RoleEnum.User,
  },
  {
    path: "/setting",
    component: SettingPage,
    layout: StudentLayout,
    role: RoleEnum.User,
  },
];
const privateRoute: RouteConfig[] = [];

export { privateRoute, publicRoute, studentRoute };
