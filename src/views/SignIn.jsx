import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addToast } from "src/redux/toastSlice";
import { Button, Form, FloatingLabel, Spinner } from 'react-bootstrap';
import { supabase } from 'src/supabaseClient';
import { useNavigate, Link } from 'react-router-dom'


export default function SignIn() {
  const [validated, setValidated] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      const formData = new FormData(event.target)
      const formDataObj = Object.fromEntries(formData.entries())
      setLoading(true);
      try {
        // supabase method to send the magic link to the email provided
        const { error } = await supabase.auth.signInWithPassword({
          email: formDataObj.email,
          password: formDataObj.password,
          options: {
            emailRedirectTo: 'http://localhost:3000/'
          }
        });

        if (error) throw error;
        navigate("/");
        
      } catch (error) {
        dispatch(addToast({message: "Email or password invalid", type: 'error'}))
      } finally {
        setLoading(false);
      }
    }

    setValidated(true);
  }

  return (
    <>
      <div>
        <h2 className="t-large text-center mb-4">Sign In</h2>
        <Form id="sign-in" className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel
            label="Email address"
            className="mb-3"
          >
            <Form.Control name="email" type="email" placeholder="name@example.com" required/>
            <Form.Control.Feedback type="invalid">Enter a valid email</Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control name="password" type="password" placeholder="Password" required/>
            <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
          </FloatingLabel>
        </Form>

        <div className="d-grid gap-2 mb-4">
          <Button type="submit" form='sign-in' variant="primary" disabled={isLoading}>
            {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> : 'Sign In'}
          </Button>
        </div>

        <div className='text-start'>
          <p className='mb-2'><Link to='/' className='text-decoration-none'>Forgot Password</Link></p>
          <p className='mb-0'><Link to='/sign_up' className='text-decoration-none'>Sign Up</Link></p>
        </div>

      </div>
    </>
  );
}
