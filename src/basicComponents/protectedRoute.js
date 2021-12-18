import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, children }) => {
    
    return auth ? children : <Navigate to="/login" state={{ from: children.location }} />;
};

export default ProtectedRoute;