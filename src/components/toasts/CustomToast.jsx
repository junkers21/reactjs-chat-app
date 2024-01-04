import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleInfo, faCircleExclamation, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Toast } from 'react-bootstrap';
import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { remove } from "../../redux/toastSlice";

const toastTypes = {
    success: {
      title: 'Success',
      icon: faCircleCheck,
      iconClass: "text-success"
    },
    warning: {
      title: 'Warning',
      icon: faCircleExclamation,
      iconClass: "text-warning"
    },
    info: {
      title: 'Information',
      icon: faCircleInfo,
      iconClass: "text-info"
    },
    error: {
      title: 'Error',
      icon: faCircleXmark,
      iconClass: "text-danger"
    },
  };

function CustomToast({ message, type, id }) {
  const { title, icon, iconClass } = toastTypes[type];
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const timerID = useRef(null);

  const handleDismiss = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      dispatch(remove(id));
    }, 400);
  }, [dispatch, id]);

  useEffect(() => {
    timerID.current = setTimeout(() => {
      handleDismiss();
    }, 4000);

    return () => {
      clearTimeout(timerID.current);
    };
  }, [handleDismiss]);

  return (
    <Toast show={show} animation={true} onClose={handleDismiss}>
        <Toast.Header>
            <span className='me-2'><FontAwesomeIcon icon={icon} className={iconClass} /></span>
            <strong className="me-auto">{title}</strong>
            <small></small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}

export default CustomToast;
