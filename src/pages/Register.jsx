import React, { useContext, useState } from 'react'
import { Link , Navigate} from 'react-router-dom';
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {isAuthenticated , setIsAuthenticated,loading,setLoading} = useContext(Context);




  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://todo-app-iyk0.onrender.com/api/v1/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);

    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to= "/"/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <input 
            value = {name}
            onChange={(e) => setName(e.target.value)}
            type='text' 
            placeholder='Name'
            required
          />
          <input 
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            type='email' 
            placeholder='Email'
            required
          />
          <input 
            value = {[password]}
            onChange={(e) => setPassword(e.target.value)}
            type='password' 
            placeholder='Password'
            required
          />
          <button
            disabled = {loading} type='submit'>Sign Up </button>
          <h4>Or</h4>
          <Link to="/login">Log in </Link>
        </form>
      </section>
    </div>  
  );
}

export default Register;