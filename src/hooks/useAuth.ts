"use client";

import { firebaseAuth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "./redux";
import { fetchUser, logout, setUser } from "@/features/auth/authSlice";
import axios from "axios";

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [, setCookie, removeCookie] = useCookies(["auth_token"]);
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function saveToken() {
    const user = firebaseAuth.currentUser;

    if (!user) return;
    const firebaseToken = await user.getIdToken();
    setCookie("auth_token", firebaseToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  async function handleLogin(provider: Provider) {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, providers[provider]);
      console.log(user);
      await saveToken();

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          token: await user.getIdToken(),
        },
        { withCredentials: true },
      );

      await dispatch(fetchUser());

      router.push("/");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailRegister(email: string, password: string) {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      await saveToken();

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          token: await user.getIdToken(),
        },
        { withCredentials: true },
      );

      await dispatch(fetchUser());

      router.push("/");

      return user;
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleEmailLogin(email: string, password: string) {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      await saveToken();
      dispatch(fetchUser());
      router.push("/");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    const user = firebaseAuth.currentUser;
    const firebaseToken = await user?.getIdToken();
    await signOut(firebaseAuth);
    dispatch(logout());

    removeCookie("auth_token", {
      path: "/",
    });

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {
        token: firebaseToken,
      },
      {
        withCredentials: true,
      },
    );
    router.push("/login");
  }

  return {
    loading,
    handleGoogleLogin: () => handleLogin("google"),
    handleEmailRegister,
    handleEmailLogin,
    handleLogout,
    setLoading,
  };
}
