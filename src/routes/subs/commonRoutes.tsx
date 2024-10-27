import { RouteObject } from "react-router-dom";
import { DefaultLayout, homeRoute, coureseDetail, allCourses} from "../../const/ConstCommon"

const commonRoutes: RouteObject[] = [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        homeRoute,
        coureseDetail,
        allCourses,
      ],
    },
  ];
  export default commonRoutes;  