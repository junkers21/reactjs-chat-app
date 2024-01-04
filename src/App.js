import './App.scss';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home'; // Importa tus componentes de vista
import NotFound from './views/NotFound';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import AnonLayout from './components/layouts/AnonLayout'
import { useDispatch } from 'react-redux';
import { listenToAuthChanges } from 'src/redux/authSlice';
import AnonRoute from 'src/utils/routes/AnonRoute';
import PrivateRoute from 'src/utils/routes/PrivateRoute';
import { useSelector } from "react-redux";
import { selectEventSet } from 'src/redux/authSlice';

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
        </Route>


        <Route exact path="*" element={<AnonLayout element={<NotFound />}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
