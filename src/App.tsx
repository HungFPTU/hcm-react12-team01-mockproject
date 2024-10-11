import { Fragment } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout";
import { publicRoute, studentRoute } from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {[...publicRoute, ...studentRoute].map((route, index) => {
            const Page = route.component;
            const role = route.role;
            console.log(role);
            // Allow Layout to be any valid component (functional or class) with children
            let Layout: React.ComponentType<{ children?: React.ReactNode }> =
              DefaultLayout;

            // Check if a layout is specified
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
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
