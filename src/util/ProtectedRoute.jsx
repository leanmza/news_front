import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role, redirectPath = "/unauthorized" }) => {
  if (role !== "ADMIN") {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

ProtectedRoute.propTypes = {
  role: PropTypes.string,
  redirectPath: PropTypes.string,
};

export default ProtectedRoute;
