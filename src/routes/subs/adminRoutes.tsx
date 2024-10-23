import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { AdminLayout } from "../../layout";
const Dashboard = lazy(() => import("../../pages/admin/dashboard"));
const AllCourses = lazy (
    () => import("../../pages/admin/allcourses")
)
const CoursesLog = lazy (
    () => import("../../pages/admin/courselog")
)
const PendingCourses = lazy (
    () => import("../../pages/admin/pendingcourses")
)
const PurchaseLog = lazy (
    () => import("../../pages/admin/purchaselog")
)
const CategoryManagement = lazy (
    () => import("../../pages/admin/categorymanagement")
)
const RequestManagement = lazy (
    () => import("../../pages/admin/requestmanagement")
)
const UserManagement = lazy (
    () => import("../../pages/admin/usermanagement")
)
const PayoutManagement = lazy (
    () => import ("../../pages/admin/payoutmanagement")
)

const adminRoutes: RouteObject[] = [
{
    path: "/admin",
    element: <AdminLayout/>,
    children: [
        { index: true , element:<Dashboard/>},
        { path: "all-courses", element:<AllCourses/>},
        { path: "courses-log", element: <CoursesLog/>},
        { path: "pending-courses", element: <PendingCourses/>},
        { path: "purchase-log", element: <PurchaseLog/>},
        { path: "category-management", element: <CategoryManagement/>},
        { path: "request-management", element: <RequestManagement/>},
        { path: "user-management", element: <UserManagement/>},
        { path: "payout-management", element: <PayoutManagement/>}
    ],
},
]
export default adminRoutes;
