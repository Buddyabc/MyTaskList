"use client";

import Link from "next/link";
import {  createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {useRouter} from "next/navigation";


export const context=createContext({user : {}});

export const ContextProvider=({children})=>{
  const [user,setUser]=useState({});

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.user);
      });
  }, []);

  return (<context.Provider value={{user,setUser}}>{children}  <Toaster/> </context.Provider>)  //without toaster pop-ups not visible 
}

export const LogoutBtn=()=>{

    const {user,setUser}=useContext(context);
    const LogoutHandler=async ()=>{
      try{
          const res=await fetch("/api/auth/logout");
          const data=await res.json();
          if(!data.success) return toast.error(data.message);
          setUser({});
          toast.success(data.message);
      }
      catch(err){
        toast.error(err);
      }
    }
    return user._id? (<button className="btn" onClick={LogoutHandler}>LOGOUT</button>) : (<Link href={"/login"}>LOGIN</Link>)
}

export const TodoButton=({id,completed})=>{
  const router = useRouter();
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };

  const updateHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      return toast.error(error);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateHandler(id)}
      />
      <button className="btn" onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </>
  );

}