import CustomToast from './CustomToast';
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-bootstrap';

function CustomToastContainer () {
    const toasts = useSelector((state) => state.toast.toasts);
    return(
        <ToastContainer
            id='toast-container'
            className="p-3 position-absolute top-0 end-0"
            style={{ zIndex: 1 }}
            >
                {toasts.map((toast) => ( <CustomToast key={toast.id} {...toast} /> ))}
        </ToastContainer>
    )
}

export default CustomToastContainer;