import { Row, Col} from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

export default function Configuration() {
  const navLinkClass = 'btn btn-container py-3 px-0'

  return (
    <Row className='h-100'>
      <Col xs={3} md={5} lg={3} xxl={2} className='border-end border-container border-1'>
        <div className='d-grid gap-2 mt-3'>
          <NavLink to="/config/profile" className={(navData) => (navData.isActive ? `active ${navLinkClass}` : navLinkClass)}>
            <FontAwesomeIcon icon={faUser} className='me-md-3' /> <span class="d-none d-md-inline">Profile</span>
          </NavLink>
          <NavLink to="/config/account" className={(navData) => (navData.isActive ? `active ${navLinkClass}` : navLinkClass)}>
            <FontAwesomeIcon icon={faKey} className='me-md-3' /> <span class="d-none d-md-inline">Account</span>
          </NavLink>
        </div>
      </Col>
      <Col xs={9} md={7} lg={9} xxl={10} className=''>
        <Outlet />
      </Col>
    </Row>
  );
}
