import { Suspense } from "react";
import Loading from "./app/Loading";
import { useSelector } from "react-redux";
import RunRoutes from "./routes/route";

export const App = () => {
  const isLoading = useSelector((state: any) => state.loading);

  return (
    <>
      {isLoading && <Loading />}
      <Suspense fallback={<Loading />}>
        <RunRoutes />
      </Suspense>
    </>
  );
};
