import { Navigate, useLocation } from 'react-router-dom'
const PrivateRoute = ({ children }) => {
    const localState = JSON.parse(localStorage.getItem('userInfo'));
    const location = useLocation();

    if (!localState?.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default PrivateRoute
