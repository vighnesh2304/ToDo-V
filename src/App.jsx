import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Header from './components/Header.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Context } from './main.jsx';

const App = () => {

  const{setUser,setIsAuthenticated,setLoading} = useContext(Context);

  useEffect(() => {
    // setLoading(true);
    axios.get(
      `https://todo-app-iyk0.onrender.com/api/v1/users/me`,
      {
        withCredentials: true,
      })
      .then(res => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      }).catch((error) =>{
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      })
  });
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App