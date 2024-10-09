import React from "react";
import SignIn from "./_components/SignIn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/next-auth";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
  return <SignIn />;
};

export default SigninPage;
