import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
// Import Routes
// import useProtectedRoutes from "./routes/protected/protectedRoutes";
import publishRoutes from "./routes/publish/publishRoute";

import adminRoutes from "./routes/subs/adminRoutes";
import instructorRoute from "./routes/subs/instrucstorRoutes";
import studentRoutes from "./routes/subs/studentRoutes";
//==============================

const App = () => {
  // const protectedRoutes = useProtectedRoutes();
  const router = createBrowserRouter([
    ...adminRoutes,
    ...instructorRoute,
    ...studentRoutes,
    // ...protectedRoutes,
    ...publishRoutes,
  ]);

  return (
    <>
      <Suspense>
            <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
