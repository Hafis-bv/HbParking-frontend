import { firebaseAuth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useCookies } from "react-cookie";

const providers = {
  google: new GoogleAuthProvider(),
};

type Provider = keyof typeof providers;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [, setCookie, removeCookie] = useCookies(["auth_token"]);

  async function handleLogin(provider: Provider) {
    setLoading(true);
    try {
      const { user } = await signInWithPopup(firebaseAuth, providers[provider]);

      const firebaseToken = await user.getIdToken();
      if (firebaseToken) {
        setCookie("auth_token", firebaseToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
}
