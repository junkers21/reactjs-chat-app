import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { setUser } from "src/redux/authSlice";
import { supabase } from 'src/supabaseClient';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, FloatingLabel, Spinner, Button } from "react-bootstrap";

export default function Account() {

    return (
        <Container fluid className="mt-3">
            <UpdateEmailForm/>
            <div className='border-bottom border-white my-4'/>
            <UpdatePasswordForm/>
            <div className='border-bottom border-white my-4'/>
            <SignOut/>
            <div className='border-bottom border-white my-4'/>
            <DeleteAccount/>
        </Container>
    );
}

function UpdateEmailForm() {
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target)
        const formDataObj = Object.fromEntries(formData.entries())
        
        if (form.checkValidity() === true) {
            setLoading(true);
            try {
                // supabase method to send the magic link to the email provided
                const { error } = await supabase.auth.updateUser({
                    password: formDataObj.password,
                    options: {
                        emailRedirectTo: 'http://localhost:3000/'
                    }
                });
                if (error) throw error.message;
                navigate("/");
                dispatch(addToast({ message: "Password Updated", type: 'success' }))
            } catch (error) {
                if ( typeof error === 'string' || error instanceof String ){
                    dispatch(addToast({ message: error, type: 'error' }))
                } else {
                    dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
                }
            } finally {
                setLoading(false);
            }
        }

        setValidated(true);
    }

    return(
        <Form id="update-email" className='' noValidate validated={validated} onSubmit={handleSubmit}>
            <h4 className="mb-3">Account email</h4>
            <Row className='justify-content-between'>
                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel label="Email" className="mb-3">
                        <Form.Control id="email" name="email" type="email" placeholder="Email" required />
                        <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col xs={12} lg={6} xxl={4} className='d-flex align-self-end flex-column'>
                    <div className="d-grid gap-2 mb-3">
                        <Button type="submit" form='update-email' variant="primary" disabled={isLoading}>
                            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

function UpdatePasswordForm() {
    const [validated, setValidated] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validatePassword = () => {
        const confirmPassword = document.getElementById('confirm_password');
        const password = document.getElementById('password');

        if (confirmPassword.value !== password.value) {
            confirmPassword.setCustomValidity("Must be equal to password");
        } else {
            confirmPassword.setCustomValidity("");
        }
    }


    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target)
        const formDataObj = Object.fromEntries(formData.entries())
        validatePassword();
        if (form.checkValidity() === true) {
            setLoading(true);
            try {
                // supabase method to send the magic link to the email provided
                const { error } = await supabase.auth.updateUser({
                    password: formDataObj.password,
                    options: {
                        emailRedirectTo: 'http://localhost:3000/'
                    }
                });
                if (error) throw error.message;
                navigate("/");
                dispatch(addToast({ message: "Password Updated", type: 'success' }))
            } catch (error) {
                if ( typeof error === 'string' || error instanceof String ){
                    dispatch(addToast({ message: error, type: 'error' }))
                } else {
                    dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
                }
            } finally {
                setLoading(false);
            }
        }

        setValidated(true);
    }

    return(
        <Form id="update-password" className='' noValidate validated={validated} onSubmit={handleSubmit}>
            <h4 className="mb-3">Update Password</h4>
            <Row className='justify-content-end'>
                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel label="New Password" className="mb-3">
                        <Form.Control id="password" name="password" type="password" placeholder="Password" required minLength={6} />
                        <Form.Control.Feedback type="invalid">Password is required and must have at least 6 characters</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>

                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel label="Confirm password" className="mb-3">
                        <Form.Control onKeyUp={validatePassword} id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password" required minLength={6} />
                        <Form.Control.Feedback type="invalid">Is required and must be equal to password</Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                <Col xs={12} lg={6} xxl={4} className='d-flex align-self-end flex-column'>
                    <div className="d-grid gap-2 mb-3">
                        <Button type="submit" form='update-password' variant="primary" disabled={isLoading}>
                            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

function SignOut() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error.message;
            navigate("/");
            dispatch(addToast({ message: "See you later alligator", type: 'success' }))
        } catch (error) {
            if ( typeof error === 'string' || error instanceof String ){
                dispatch(addToast({ message: error, type: 'error' }))
            } else {
                dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        <Row className='justify-content-between'>
            <Col xs={12} lg={6} xxl={4}>
                <h4 className="mb-3 text-warning">Sign Out</h4>
            </Col>
            <Col xs={12} lg={6} xxl={4}>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="warning" disabled={isLoading} onClick={handleClick}>
                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Sign Out'}
                    </Button>
                </div>
            </Col>
        </Row>
    );
}

function DeleteAccount() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        setLoading(true);
        try {
            const { error } = await supabase.rpc('delete_user');
            if (error) throw error.message;

            dispatch(setUser(null));
            await supabase.auth.signOut();
            navigate("/");
            dispatch(addToast({ message: "Your account has been deleted", type: 'success' }))
        } catch (error) {
            if ( typeof error === 'string' || error instanceof String ){
                dispatch(addToast({ message: error, type: 'error' }))
            } else {
                dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        <Row className='justify-content-between'>
            <Col xs={12} lg={6} xxl={4}>
                <h4 className="mb-3 text-danger">Danger Zone</h4>
            </Col>
            <Col xs={12} lg={6} xxl={4}>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="danger" disabled={isLoading} onClick={handleClick}>
                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Delete Account'}
                    </Button>
                </div>
            </Col>
        </Row>
    );
}
