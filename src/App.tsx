import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout, DefaultLayout, InstructorLayout, StudentLayout } from './layout';
import { RoleEnum } from './model/RouteConfig';

const Dashboard = lazy(
  () => import("./pages/Admin/Daskboard"),
);
const AllCourses = lazy(
  () => import("./pages/Admin/allcourses"),
);
const CoursesLog = lazy(
  () => import("./pages/Admin/courselog"),
);
const PendingCourses = lazy(
  () => import("./pages/Admin/PendingCourses"),
);
const PurchaseLog = lazy(
  () => import("./pages/Admin/purchaselog"),
);
const CategoryManagement = lazy(
  () => import("./pages/Admin/CategoryManagement"),
);
const RequestManagement = lazy(
  () => import("./pages/Admin/RequestManagement"),
);
const UserManagement = lazy(
  () => import("./pages/Admin/UserManagement"),
);
const PayoutManagement = lazy(
  () => import("./pages/Admin/PayoutManagement"),
);

const InstructorDashboard = lazy(
  () => import("./pages/InstructorPage/InstructorDashboard"),
);
const ManageCourse = lazy(
  () => import("./pages/InstructorPage/ManageCourse"),
);
const ViewDetailCourse = lazy(
  () => import("./components/InstructorComponents/ManageCourse/Course/ViewDetailCourse"),
);
const ViewDetailSession = lazy(
  () => import("./components/InstructorComponents/ManageCourse/Session/ViewDetailSession"),
);
const ViewDetailLesson = lazy(
  () => import("./components/InstructorComponents/ManageCourse/Lesson/ViewDetailLesson"),
);
const SalesHistory = lazy(
  () => import("./components/InstructorComponents/SalesHistory"),
);
const InstructorCourseLog = lazy(
  () => import("./pages/InstructorPage/InstructorCourseLog"),
);
const Review = lazy(
  () => import("./components/InstructorComponents/Review"),
);
const InstructorSub = lazy(
  () => import("./pages/InstructorPage/InstructorSub"),
);
const PayoutInstructorPage = lazy(
  () => import("./pages/InstructorPage/PayoutInstructorPage"),
);
const StudentDashboard = lazy(
  () => import("./pages/Student/dashboard"),
);
const OrderPage = lazy(
  () => import("./pages/Student/order"),
);
const SettingPage = lazy(
  () => import("./pages/Student/setting"),
);
const SubscriptionPage = lazy(
  () => import("./pages/Admin/PendingCourses"),
);
const CheckoutPage = lazy(
  () => import("./pages/Student/order/checkout"),
);
const Unauthorized = lazy(
  () => import('./pages/unauthorize')
);
const Home = lazy(() => import("./pages/Home"));
const LoginPage = lazy(() => import("./pages/Login/Login"));
const AllCoursesGuest = lazy(() => import("./pages/AllCourses"));
const App: React.FC = () => {
  const newUserRole: RoleEnum = RoleEnum.Admin; 

// Store the new role in localStorage:
  localStorage.setItem('userRole', newUserRole);
  const userRole = localStorage.getItem('userRole') as RoleEnum | null;

  const getRoutes = (role: RoleEnum | null): JSX.Element => {
    switch (userRole) {
      case RoleEnum.Admin:
        return (
          <>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="all-courses" element={<AllCourses />} />
              <Route path="courses-log" element={<CoursesLog />} />
              <Route path="pending-courses" element={<PendingCourses />} />
              <Route path="purchase-log" element={<PurchaseLog />} />
              <Route path="category-management" element={<CategoryManagement />} />
              <Route path="request-management" element={<RequestManagement />} />
              <Route path="user-management" element={<UserManagement />} />
              <Route path="payout-management" element={<PayoutManagement />} />
            </Route>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="order" element={<AllCoursesGuest />} />
            </Route>
          </>
        );
      case RoleEnum.Instructor:
        return (
          <>
            <Route path="/instructor" element={<InstructorLayout />}>
              <Route index element={<InstructorDashboard />} />
              <Route path="manage-course" element={<ManageCourse />} />
              <Route path="manage-course/view-detail-course" element={<ViewDetailCourse />} />
              <Route path="manage-course/view-detail-session" element={<ViewDetailSession />} />
              <Route path="manage-course/view-detail-lesson" element={<ViewDetailLesson />} />
              <Route path="sales-history" element={<SalesHistory />} />
              <Route path="course-log" element={<InstructorCourseLog />} />
              <Route path="review" element={<Review />} />
              <Route path="subscriptions" element={<InstructorSub />} />
              <Route path="payouts" element={<PayoutInstructorPage />} />
              <Route path="purchase-log" element={<PurchaseLog />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="order" element={<AllCoursesGuest />} />
            </Route>
            <Route path="/admin/*" element={<Navigate to="/login" replace />} />
            <Route path="/student/*" element={<Navigate to="/login" replace />} />
          </>
        );
      case RoleEnum.Student:
        return (
          <>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
              <Route path="order/checkout" element={<CheckoutPage />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="order" element={<AllCoursesGuest />} />
            </Route>
            <Route path="/admin/*" element={<Navigate to="/unauthorized" replace />} />
            <Route path="/instructor/*" element={<Navigate to="/unauthorized" replace />} />
          </>
        );
      case RoleEnum.Guest:
        return (
          <>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="order" element={<AllCoursesGuest />} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/admin/*" element={<Navigate to="/unauthorized" replace />} />
            <Route path="/instructor/*" element={<Navigate to="/unauthorized" replace />} />
            <Route path="/student/*" element={<Navigate to="/unauthorized" replace />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        );
      default:
        return (
          <>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/login" element={<LoginPage />} />
          </>
        );
    }
  };

  return (
    <Router>
      <Suspense fallback="loading">
        <div className="App">
          <Routes>
            {getRoutes(userRole)}
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
