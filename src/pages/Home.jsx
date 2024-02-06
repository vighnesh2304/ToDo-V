import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Context } from '../main';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] =useState(false);

  const {isAuthenticated } = useContext(Context);


  const updateHandler = async (id)=>{
    try {
      
      const data = await axios.put(`https://todo-app-iyk0.onrender.com/api/v1/task/${id}`,
      {},
      {
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async(id)=>{
    try {
      
      const data = await axios.delete(`https://todo-app-iyk0.onrender.com/api/v1/task/${id}`,
      {
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`https://todo-app-iyk0.onrender.com/api/v1/task/new`,{
        title,
        description,
      },{
        withCredentials:true,
        headers : {
          "Content-Type" : "application/json",
        },
      });
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    axios.get(`https://todo-app-iyk0.onrender.com/api/v1/task/my`,{
      withCredentials : true,

    }).then(res =>{
      setTasks(res.data.tasks);
    }).catch((e) => {
      toast.error(e.response.data.message);
    });
  },[refresh]);

  if (!isAuthenticated) return <Navigate to= "/login"/>;


  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button disabled = {loading} type="submit">
          Add Task
        </button>
        </form>
      </section>

      <section className='todosContainer'>
        {tasks.map(i=> (
          <TodoItem 
          title={i.title} 
          description={i.description}
          isCompleted={i.isCompleted}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          id = {i._id}
          key={i._id}
          />
        ))}
      </section>
    </div>
  )
}

export default Home