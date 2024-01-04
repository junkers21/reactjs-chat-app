import { Outlet, Navigate } from 'react-router-dom'
import React from 'react';
import { useSelector } from "react-redux";
import { selectEventSet, selectUser } from 'src/redux/authSlice';
import { ViewLoading } from 'src/components/loadings/Loading'

const AnonRoute = () => {
    const user = useSelector(selectUser);
    const eventSet = useSelector(selectEventSet);

    if(eventSet) {
        return !user ? <Outlet /> : <Navigate to="/" />;
    }

    return <ViewLoading/>;
}

export default AnonRoute