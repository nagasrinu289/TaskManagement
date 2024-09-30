import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../useAuth';

const Layout = () => {
    const { user } = useAuthContext();

    if (user.id === 'manager') {
        return <Outlet />; 
    } else {
        return <Navigate to="/" replace />; 
    }
};

export default Layout;
