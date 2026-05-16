import { fetchUser, logout, setUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import { firebaseAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CustomLoading } from "./CustomLoading";
import API from "@/utils/api";

type AuthProviderProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [, setCookie, removeCookie] = useCookies(["auth_token"]);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 * 7 });
        await dispatch(fetchUser());
      } else {
        removeCookie("auth_token");
        dispatch(logout());
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) return <CustomLoading />;

  return <>{children}</>;
};
