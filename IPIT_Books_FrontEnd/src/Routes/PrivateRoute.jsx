/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import PleaseLogin from '../Pages/Login/PleaseLogin';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <PleaseLogin />
            </div>
        )
    }

    if (user) {
        return children;
    }

    return <Navigate to="/pleaseLogin" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;


