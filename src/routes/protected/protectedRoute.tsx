import React from "react";
import { Route, Navigate } from "react-router-dom";
import { UserRole } from "../../model/User";

interface ProtectedRouteProps {
  component: React.ComponentType<object>;
  userRole: UserRole;
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  userRole,
  allowedRoles,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={
        allowedRoles.includes(userRole) ? (
          <Component {...rest} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
