"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { signIn, SignInResponse } from "next-auth/react";

type FormInputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router: AppRouterInstance = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const data = useRef<FormInputs>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res: SignInResponse | undefined = await signIn("credentials", {
        email: data.current.email,
        password: data.current.password,
        callbackUrl: "/dashboard",
      });

      if (res) {
        if (res.error) {
          alert("error while authorizing!!!");
          return;
        }
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-y-5 bg-neutral-800"
    >
      <div className="m-2 border rounded overflow-hidden shadow">
        <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
          Sign in
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
            <button disabled={isLoading}>Submit</button>
            <Link className="" href={"/"}>
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
