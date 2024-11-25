import { lazy } from "react";
import { ROUTER_URL } from "../../const/router.const";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("../../pages/Admin/Dashboard"));
const AllCourses = lazy(() => import("../../pages/Admin/allcourses"));
const CoursesLog = lazy(() => import("../../pages/Admin/courselog"));
const PendingCourses = lazy(() => import("../../pages/Admin/PendingCourses"));
const PurchaseLog = lazy(() => import("../../pages/Admin/purchaselog"));
const CategoryManagement = lazy(
  () => import("../../pages/Admin/CategoryManagement")
);
const RequestManagement = lazy(
  () => import("../../pages/Admin/RequestManagement")
);
const UserManagement = lazy(() => import("../../pages/Admin/UserManagement"));
const PayoutManagement = lazy(
  () => import("../../pages/Admin/PayoutManagement")
);
const EditCategory = lazy(
  () => import("../../pages/Admin/CategoryManagement/EditCategory")
);
export const adminPaths: Record<string, RouteObject[]> = {
  [ROUTER_URL.ADMIN.DASHBOARD]: [
    {
      index: true,
      element: <Dashboard />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.ALL_COURSES,
      element: <AllCourses />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.COURSES_LOG,
      element: <CoursesLog />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.PENDING_COURSES,
      element: <PendingCourses />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.PURCHASE_LOG,
      element: <PurchaseLog />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.CATEGORY,
      element: <CategoryManagement />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.REQUEST_MANAGEMENT,
      element: <RequestManagement />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.USER_MANAGEMENT,
      element: <UserManagement />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.PAYOUT_MANAGEMENT,
      element: <PayoutManagement />,
    },
    {
      index: false,
      path: ROUTER_URL.ADMIN.EDIT_CATEGORY,
      element: <EditCategory />,
    },
  ],
};
