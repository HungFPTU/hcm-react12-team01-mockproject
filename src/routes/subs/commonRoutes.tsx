import { RouteObject } from "react-router-dom";
import { DefaultLayout, homeRoute, coureseDetail, allCourses, cart,detailinstructor } from "../../const/constCommon"
import Loading from "../../app/Loading";
import { Suspense } from "react";
const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: 
    <Suspense fallback={<Loading />} >
      <DefaultLayout />
    </Suspense>,
    children: [
      homeRoute,
      coureseDetail,
      allCourses,
      cart,
      detailinstructor
    ],
  },
];
export default commonRoutes;
