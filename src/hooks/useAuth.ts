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

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [, setCookie, removeCookie] = useCookies(["auth_token"]);
  const router = useRouter();

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
      await signInWithPopup(firebaseAuth, providers[provider]);
      await saveToken();
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
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await saveToken();
      router.push("/");
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function hadleLogout() {
    await signOut(firebaseAuth);

    removeCookie("auth_token", {
      path: "/",
    });
  }

  return {
    loading,
    handleGoogleLogin: () => handleLogin("google"),
    handleEmailRegister,
    handleEmailLogin,
    hadleLogout,
    setLoading,
  };
}
