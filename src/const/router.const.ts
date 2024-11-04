
export const ROUTER_URL = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOTPASSWORD: "/forgotpassword",
  VERIFY_EMAIL: "/verify-email/:token",
  RESEND_TOKEN: "/resend-verification",
  ADMIN:{
    DASHBOARD: "/admin",
    ALLCOURSES: "/admin/all-courses",
    PENDINGCOURSES:"/admin/pending-courses",
    PURCHASELOG: "/admin/purchase-log",
    CATEGORY: "/admin/category-management",
    REQUESTMANAGEMENT: "/admin/request-management",
    USERMANAGEMENT: "/admin/user-management",
    PAYOUTMANAGEMENT: "/admin/payout-management",
    COURSESLOG: "/admin/course-log",
  },
  INSTRUCTOR:{
    INSTRUCTORDASHBOARD: "/instructor",
    MANAGECOURSE: "/instructor/manage-course",
    VIEWDETAILCOURSE:"/instructor/manage-course/view-detail-course",
    VIEWDETAILSESSION: "/instructor/manage-course/view-detail-session",
    VIEWDETAILLESSON: "/instructor/manage-course/view-detail-lesson",
    SALESHISTORY: "/instructor/sales-history",
    INTRUCTORCOURSELOG: "/instructor/course-log",
    REVIEW: "/instructor/review",
    INSTRUCTORSUB: "/instructor/subscriptions",
    PAYOUTINSTRUCTORPAGE: "/instructor/payouts",
    PURCHASELOG:"/instructor/purchase-log",
    // SETTING: "/student/setting",
  },
  STUDENT: {
    STUDENTDASHBOARD: "/student",
    ORDERPAGE: "/student/order",
    SETTINGPAGE: "/student/setting",
    SUBSCRIPTIONPAGE: "/student/subscription",
    CHECKOUTPAGE: "/student/order/checkout",
  },
  COMMON: {
    HOME: "/",
    COURSEDETAIL: "/course/:id",
    ALLCOURSES:"/all"
  },
  UNAUTHORIZED:"/unauthorize"
};
