import { RouteObject } from "react-router-dom";
import { DefaultLayout, homeRoute, coureseDetail, allCourses} from "../../const/constCommon"

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