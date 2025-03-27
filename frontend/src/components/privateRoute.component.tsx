import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "../models/privateRoute.model";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    // Check if the user is authenticated; here we assume a simple flag in localStorage.
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;