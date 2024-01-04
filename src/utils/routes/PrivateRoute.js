import { Outlet, Navigate } from 'react-router-dom'
import React from 'react';
import { useSelector } from "react-redux";
import { selectEventSet, selectUser } from 'src/redux/authSlice';
import { ViewLoading } from 'src/components/loadings/Loading'

const PrivateRoute = () => {
    const user = useSelector(selectUser);
    const eventSet = useSelector(selectEventSet);
    
    if(eventSet) {
        return user ? <Outlet /> : <Navigate to="/sign_in" />;
    }

    return <ViewLoading/>;
}

export default PrivateRoute