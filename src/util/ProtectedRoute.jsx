import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = ({role, redirectPath ='/unauthorized'}) => {

    if (role !== "ADMIN"){
        console.log("hola");
        return <Navigate to={redirectPath} replace/>
    }
    return <Outlet/>
}

export default ProtectedRoute
