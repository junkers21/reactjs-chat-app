import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faGears } from '@fortawesome/free-solid-svg-icons';
import CustomToastContainer from '../toasts/CustomToastContainer';
import { NavLink } from 'react-router-dom';

export default function AppLayout(props) {
    const { element } = props;

    return (
        <div className="d-flex">
            <SideMenu/>
            <div id="main-view">
                <Container fluid id='main-view-container' className=''>
                    {element}
                </Container>
            </div>
            <CustomToastContainer/>
        </div>
    );
}

function SideMenu() {
    return(
        <div id="side-menu" className="d-flex justify-content-between flex-column px-3 py-3">
            <div className='d-grid gap-2'>
                <NavLink to="/" className={(navData) => (navData.isActive ? "active btn btn-container py-3 px-2" : 'btn btn-container py-3 px-2')}>
                    <FontAwesomeIcon icon={faComment} className='fs-4' />
                </NavLink>
            </div>
            <NavLink to="/config" className={(navData) => (navData.isActive ? "active btn btn-container py-3 px-2" : 'btn btn-container py-3 px-2')}>
                <FontAwesomeIcon icon={faGears} className='fs-4' />
            </NavLink>
        </div>
    )
}
