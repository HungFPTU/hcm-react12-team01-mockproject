export const API = {
  // BANK: {
  //   GET_BANK: "https://api.vietqr.io/v2/banks"
  // },
  COMMON: {
    PUBLIC_CATEGORY: "api/client/category/search",
  },
  AUTH: {
    LOGIN: "api/auth",
    LOGOUT: "api/auth/logout",
    LOGIN_GOOGLE: "api/auth/google",
    REGISTER_GOOGLE_PUBLIC: "api/users/google",
    REGISTER: "api/users",
    VERIFY_TOKEN: "api/auth/verify-token",
    RESEND_TOKEN: "api/auth/resend-token",
    FORGOT_PASSWORD: "api/auth/forgot-password"
  },
  ADMIN: {
    GET_USERS: "api/users/search",
    GET_USER_DETAILS: "api/users/:id",
    UPDATE_USER: "api/users/:id",
    CHANGE_STATUS: "api/users/change-status",
    CHANGE_ROLE: "api/users/change-role",
    CHANGE_PASSWORD: "api/users/change-password",
    CREATE_USER: "api/users/create",
    DELETE_USER: "api/users/:id",
    REVIEW_PROFILE_INSTRUCTOR: "/api/users/review-profile-instructor",

    GET_SETTING: "/api/setting/default",

    CREATE_CATEGORY: "/api/category",
    GET_CATEGORIES: "/api/category/search",
    GET_CATEGORY: "/api/category/:id",
    UPDATE_CATEGORY: "/api/category/:id",
    DELETE_CATEGORY: "/api/category/:id",

    GET_COURSES: "/api/course/search",
    GET_COURSE_LOG: "/api/course/log/search",
    GET_SESSIONS: "/api/session/search",
    GET_LESSONS: "/api/lesson/search",
    GET_PURCHASE: "/api/purchase/search",

  },
  INSTRUCTOR: {
    GET_USER_DETAILS: "api/users/:id",
    UPDATE_USER: "api/users/:id",
    CHANGE_PASSWORD: "api/users/change-password",

    GET_CATEGORIES: "/api/category/search",

    CREATE_REVIEW: "/api/review",
    GET_PURCHASE: "/api/purchase/search-for-instructor",

  },
  STUDENT: {
    GET_USER_DETAILS: "api/users/:id",
    UPDATE_USER: "api/users/:id",
    CHANGE_PASSWORD: "api/users/change-password",
    CREATE_REVIEW: "/api/review",
    GET_PURCHASE: "/api/purchase/search-for-student",

  },
  COURSE: {
    CREATE_COURSE: "/api/course",
    GET_COURSES: "/api/course/search",
    GET_COURSE: "/api/course/:id",
    UPDATE_COURSE: "/api/course/:id",
    DELETE_COURSE: "/api/course/:id",
    CHANGE_STATUS: "/api/course/change-status",
    GET_COURSE_LOG: "/api/course/log/search",

    GET_PUBLIC_COURSE: "api/client/course/search",
    GET_PUBLIC_COURSE_DETAIL: "api/client/course/:id",
  },
  SESSION: {
    CREATE_SESSION: "/api/session",
    GET_SESSIONS: "/api/session/search",
    GET_SESSION: "/api/session/:id",
    UPDATE_SESSION: "/api/session/:id",
    DELETE_SESSION: "/api/session/:id",
  },
  LESSON: {
    CREATE_LESSON: "/api/lesson",
    GET_LESSONS: "/api/lesson/search",
    GET_LESSON: "/api/lesson/:id",
    UPDATE_LESSON: "/api/lesson/:id",
    DELETE_LESSON: "/api/lesson/:id",
  },
  CART: {
    GET_CART: "/api/cart/search",
    CREATE_CART: "/api/cart",
    UPDATE_STATUS_CART: "/api/cart/update-status",
    DELETE_CART: "/api/cart/:id"
  }
};
