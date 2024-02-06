import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Header = () => {

  const {isAuthenticated , setIsAuthenticated, loading,setLoading} = useContext(Context);
  // console.log(isAuthenticated);

  const logoutHandler = async (e) => {
    setLoading(true);
    try {
     await axios.get(
        `https://todo-app-iyk0.onrender.com/api/v1/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <nav className='header'>
        <div>
            <h2>
                TODO APP.
            </h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {
              isAuthenticated ? 
                <button disabled = {loading} onClick={logoutHandler} className='btn'>Logout</button> : 
                <Link to={"/login"}>Login</Link>

            }
            
            

        </article>
    </nav>
  )
}

export default Header