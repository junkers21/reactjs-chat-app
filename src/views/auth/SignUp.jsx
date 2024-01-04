import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { Button, Form, FloatingLabel, Spinner } from 'react-bootstrap';
import { supabase } from 'src/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'


export default function SignUp() {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const validatePassword = () => {
    const confirmPassword = document.getElementById('confirm_password');
    const password = document.getElementById('password');

    if ( confirmPassword.value !== password.value ){
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
        dispatch(addToast({message: "Your account has been created, if you haven't received the confirmation email, maybe you should try to reset your password", type: 'success'}))
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
        <h2 className="t-large text-center mb-4">Sign Up</h2>
        <Form id="sign-in" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
          
          <FloatingLabel label="Email address" className="mb-3" >
            <Form.Control name="email" type="email" placeholder="name@example.com" required/>
            <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Password" className="mb-3">
            <Form.Control id="password" name="password" type="password" placeholder="Password" required minLength={6}/>
            <Form.Control.Feedback type="invalid">Password is required and must have at least 6 characters</Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Confirm password">
            <Form.Control onKeyUp={validatePassword} id="confirm_password" name="confirm_password" type="password" placeholder="Confirm Password" required minLength={6}/>
            <Form.Control.Feedback type="invalid">Is required and must be equal to password</Form.Control.Feedback>
          </FloatingLabel>

        </Form>

        <div className="d-grid gap-2 mb-4">
          <Button type="submit" form='sign-in' variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : 'Sign In'}
          </Button>
        </div>

        <div className='text-start'>
          <p className='mb-2'><Link to='/forgot_password' className='text-decoration-none'>Forgot Password</Link></p>
          <p className='mb-0'><Link to='/sign_in' className='text-decoration-none'>Sign In</Link></p>
        </div>

      </div>
    </>
  );
}
