import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from '../context/authContext';

const PrivateRoute = ({ children }) => {
    const { state } = useAuthState();
    const location = useLocation();

    if (!state?.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

export default PrivateRoute
