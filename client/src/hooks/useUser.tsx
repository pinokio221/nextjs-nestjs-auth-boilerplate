import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session } = useSession();

  if (session === null || !session.user) {
    return null;
  }

  return session.user;
};
