import { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoute } from './routes';
import { DefaultLayout } from './layout';
import { RoleEnum } from './model/RouteConfig';
import Unauthorized from './pages/unauthorize';

// const Unauthorized = lazy(() => import('./pages/Unauthorized')); // Lazy load the Unauthorized page

function App() {
  const userRole = localStorage.getItem('userRole') as RoleEnum | null; // Type assertion for clarity

  return (
    <Router>
      <Suspense fallback="loading">
        <div className="App">
          <Routes>
            {publicRoute.map((route, index) => {
              // const Unauthorized = lazy(() => import('./pages/Unauthorized'));
              const importLink = route.importURL
              const Page = lazy(() => import(importLink));
              // const Page = route.importURL;
              const roles = route.role;
              let Layout: React.ComponentType<{ children?: React.ReactNode }> = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}

                  path={route.path}
                  element={
                    // Check if the route is accessible to everyone (Guest role) or if the user has the required role
                    roles.includes(RoleEnum.Guest) || (userRole && roles.includes(userRole)) ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <Navigate to="/unauthorized" replace />
                    )
                  }
                />
              );
            })}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;