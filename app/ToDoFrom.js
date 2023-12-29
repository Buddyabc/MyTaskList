"use client";

import { context } from '@/Components/Clients';
import { useRouter,redirect } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

function ToDoFrom() {

  const [title,setTitle]=useState();
  const [description,setDescription]=useState();
  const {user}=useContext(context);
  const router=useRouter();

  const HandleCreatetask=async(e)=>{
      e.preventDefault();
      try {
        const res=await fetch("/api/newtask",{
          method:"POST",
          body:JSON.stringify({title,description}),
          headers:{"Content-Type":"application/json"}
        });

        const data=await res.json();
        if(!data.success) return toast.error(data.message);

        toast.success(data.message);
        router.refresh();
        setTitle("");
        setDescription("");
       
      } catch (error) {
        return toast.error(error);
      }

    }
    if(!user._id) return redirect("/login")    //without login we can not route to home 
  return (
    <div className="login">
    <section>
      <form onClick={HandleCreatetask}>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter Title " />
        <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Create Task</button>
      </form>
    </section>
  </div>
  )
}

export default ToDoFrom
