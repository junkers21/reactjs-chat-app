import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { supabase } from 'src/supabaseClient';
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, FloatingLabel, Spinner, Button } from "react-bootstrap";

export default function Profile() {
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
                const { error } = await supabase.auth.signUp({
                    email: formDataObj.email,
                    password: formDataObj.password,
                    options: {
                        emailRedirectTo: 'http://localhost:3000/'
                    }
                });

                if (error) throw error;
                navigate("/");
                dispatch(addToast({ message: "Your account has been created, if you haven't received the confirmation email, maybe you should try to reset your password", type: 'success' }))
            } catch (error) {
                dispatch(addToast({ message: "An error occurred, try again later", type: 'error' }))
            } finally {
                setLoading(false);
            }
        }

        setValidated(true);
    }

    return (
        <Container fluid className="mt-3">
            <Form id="update-profile" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} lg={6} xxl={4}>
                        <FloatingLabel label="Email address" className="mb-3" >
                            <Form.Control name="email" type="email" placeholder="name@example.com" required />
                            <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    <Col xs={12} lg={6} xxl={4}>
                        <FloatingLabel label="Password" className="mb-3">
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
                </Row>
                <Row className='justify-content-end'>
                    <Col xs={12} lg={6} xxl={4}>
                        <div className="d-grid gap-2 mb-4">
                            <Button type="submit" form='sign-in' variant="primary" disabled={isLoading}>
                                {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
