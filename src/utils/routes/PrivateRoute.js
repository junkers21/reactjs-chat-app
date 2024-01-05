import { Outlet, Navigate } from 'react-router-dom'
import React from 'react';
import { useSelector } from "react-redux";
import { selectEventSet, selectUser } from 'src/redux/authSlice';
import { ViewLoading } from 'src/components/loadings/Loading';
import AppLayout from 'src/components/layouts/AppLayout';

const PrivateRoute = () => {
    const user = useSelector(selectUser);
    const eventSet = useSelector(selectEventSet);

    
    if(eventSet) {
        return user ? <AppLayout element={<Outlet />}/> : <Navigate to="/sign_in" />;
    }

    return <ViewLoading/>;
}

export default PrivateRoute