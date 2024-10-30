import React from "react";

interface PublicRouteProps {
  component: React.ReactNode;
}

const PublicRouteProps = ({ component }: PublicRouteProps) => <div>{component}</div>;

export default PublicRouteProps;
