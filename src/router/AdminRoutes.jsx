import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";


const AdminRoutes = ({children}) => {
    const location=useLocation();
    const {user,loading}=useAuth();
    const {role, roleLoading}=useUserRole();
     if(loading || roleLoading){
        return <progress className="progress w-56"></progress>

    }
    if(!user || role !=='admin'){
        return  <Navigate  to="/forbidden" state={{ from: location }} replace ></Navigate>
    }
    return children;
   
};

export default AdminRoutes;