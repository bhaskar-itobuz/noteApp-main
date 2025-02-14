import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const user = localStorage.getItem("user");
    return user ? <Outlet /> : <Navigate to="/login"/> 
}
export default ProtectedRoutes;