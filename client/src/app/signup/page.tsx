import React from "react";
import SignUp from "./_components/SignUp";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/next-auth";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <SignUp />;
};

export default SignupPage;
