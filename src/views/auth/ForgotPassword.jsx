import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { Button, Form, FloatingLabel, Spinner } from 'react-bootstrap';
import { supabase } from 'src/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'


export default function ForgotPassword() {
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
        const { error } = await supabase.auth.resetPasswordForEmail(formDataObj.email, {
          redirectTo: 'http://localhost:3000/config/account'
        });

        if (error) throw error;
        navigate("/");
        dispatch(addToast({message: "An email has been sent to reset yout password", type: 'success'}))
      } catch (error) {
        dispatch(addToast({message: "An error occurred, try again later", type: 'error'}))
      } finally {
        setLoading(false);
      }
    }

    setValidated(true);
  }

  return (
    <>
      <div>
        <h2 className="t-large text-center mb-4">Reset Password</h2>
        <Form id="sign-in" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
          
          <FloatingLabel label="Email address" className="mb-3" >
            <Form.Control name="email" type="email" placeholder="name@example.com" required/>
            <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
          </FloatingLabel>

        </Form>

        <div className="d-grid gap-2 mb-4">
          <Button type="submit" form='sign-in' variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : 'Sign In'}
          </Button>
        </div>

        <div className='text-start'>
          <p className='mb-2'><Link to='/sign_up' className='text-decoration-none'>Sign Up</Link></p>
          <p className='mb-0'><Link to='/sign_in' className='text-decoration-none'>Sign In</Link></p>
        </div>

      </div>
    </>
  );
}
