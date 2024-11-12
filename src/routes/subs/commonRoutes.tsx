import { RouteObject } from "react-router-dom";
import { DefaultLayout, homeRoute, coureseDetail, allCourses, cart } from "../../const/constCommon"

const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      homeRoute,
      coureseDetail,
      allCourses,
      cart
    ],
  },
];
export default commonRoutes;  