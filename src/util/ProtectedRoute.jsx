import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, redirectPath = "/unauthorized" }) => {
  console.log("ProtectedRoute" , role);
  if (role !== "ADMIN") {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
