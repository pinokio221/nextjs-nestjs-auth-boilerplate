"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const isAuthUser = session && session.user;
  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
      await signOut();
    }
  };

  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b from-white to-gray-200 shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      </Link>

      {isAuthUser ? (
        <div className="flex gap-4 ml-auto">
          <p className="text-sky-600">{session.user.email}</p>
          <button
            onClick={() => handleSignOut()}
            className="flex gap-4 ml-auto text-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 ml-auto items-center">
          <Link href={"/signin"} className="flex gap-4 ml-auto text-green-600">
            Sign In
          </Link>
          <Link
            href={"/signup"}
            className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
