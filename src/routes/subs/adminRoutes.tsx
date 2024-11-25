import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { AdminLayout } from "../../layout";
import Loading from "../../app/Loading";

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

const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "all-courses", element: <AllCourses /> },
      { path: "courses-log", element: <CoursesLog /> },
      { path: "pending-courses", element: <PendingCourses /> },
      { path: "purchase-log", element: <PurchaseLog /> },
      { path: "category-management", element: <CategoryManagement /> },
      { path: "request-management", element: <RequestManagement /> },
      { path: "user-management", element: <UserManagement /> },
      { path: "payout-management", element: <PayoutManagement /> },
      { path: "category-management/:id", element: <EditCategory /> },
    ],
  },
];
export default AdminRoutes;
