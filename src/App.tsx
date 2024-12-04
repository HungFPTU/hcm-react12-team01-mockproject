import { Suspense } from "react";
import Loading from "./app/Loading";
import { useSelector } from "react-redux";
import RunRoutes from "./routes/route";
import ScrollToTopButton from "./components/home/ScrollToTopButton";
export const App = () => {
  const isLoading = useSelector((state: any) => state.loading);
  //test
  return (
    <>
      {isLoading && <Loading />}
      <Suspense >
        <RunRoutes />
      </Suspense>
      <ScrollToTopButton/>    
    </>
  );
};
