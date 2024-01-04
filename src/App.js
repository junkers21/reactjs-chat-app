import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import { listenToAuthChanges } from 'src/redux/authSlice';
import { selectEventSet } from 'src/redux/authSlice';

import AnonRoute from 'src/utils/routes/AnonRoute';
import PrivateRoute from 'src/utils/routes/PrivateRoute';

import AnonLayout from './components/layouts/AnonLayout'
import Home from './views/Home';
import NotFound from 'src/views/NotFound';
import SignIn from 'src/views/auth/SignIn';
import SignUp from 'src/views/auth/SignUp';
import ForgotPassword from './views/auth/ForgotPassword';

function App() {
  const dispatch = useDispatch();
  const eventSet = useSelector(selectEventSet);

  useEffect(() => {
    if( !eventSet ) {
      dispatch(listenToAuthChanges());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PrivateRoute/>}>
          <Route exact path="/" element={<Home />} />
        </Route>


        <Route exact path="/" element={<AnonRoute/>}>
          <Route exact path="/sign_up" element={<AnonLayout element={<SignUp />} />} />
          <Route exact path="/sign_in" element={<AnonLayout element={<SignIn />} />} />
          <Route exact path="/forgot_password" element={<AnonLayout element={<ForgotPassword />} />} />
        </Route>


        <Route exact path="*" element={<AnonLayout element={<NotFound />}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
