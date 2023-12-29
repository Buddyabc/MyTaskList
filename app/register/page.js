"use client";

import { context } from "@/Components/Clients";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(context);

  const Registeruser = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();   //here data represents all the json receive from api as success,message,user(particular user)
      if (!data.success) return toast.error(data.message);  
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      return toast.error(data.message);
    }
  };

  if (user._id) return redirect("/login");
  return (
    <div className="login">
      <section>
        <form onSubmit={Registeruser}>
          <input type="text" onChange={(e) => setName(e.target.value)}
            value={name} placeholder="Enter Your Name" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter Password"
          />
          <button type="submit">SIGN UP</button>
          <p>OR</p>
          <Link href={"/login"}>LOG IN</Link>
        </form>
      </section>
    </div>
  );
}

export default Page;
