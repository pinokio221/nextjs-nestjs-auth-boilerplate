"use client";
import { COMMON_CONFIG } from "@/config";
import Link from "next/link";
import React, { useRef } from "react";

type FormInputs = {
  email: string;
  password: string;
};

const SignUp = () => {
  const register = async () => {
    const res = await fetch(COMMON_CONFIG.SERVER_URL + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
  };
  const data = useRef<FormInputs>({
    email: "",
    password: "",
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <input
          name="email"
          required
          onChange={(e) => (data.current.email = e.target.value)}
        />
        <input
          name="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <button onClick={register}>Submit</button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
