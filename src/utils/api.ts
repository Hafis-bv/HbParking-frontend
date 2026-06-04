import { firebaseAuth } from "@/lib/firebase";
import axios, { AxiosInstance } from "axios";

class Api {
  private client: AxiosInstance;
  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    if (!baseURL) {
      console.warn("Base url is missing in environment variables.");
    }

    this.client = axios.create({
      baseURL,
    });
  }

  async createCheckoutSession(balance: number) {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.post(
        "/checkout/create-checkout-session",
        {
          balance,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async createPlateNumber(plateNumber: string) {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.post(
        "/plates",
        { plateNumber },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deletePlateNumber(plateNumberId: string) {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.delete(`/plates/${plateNumberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getMyPlates() {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.get("/plates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getZones() {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.get("/zones", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getSession() {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.get("/sessions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async startSession(zoneId: string, plateId: string) {
    const currentUser = firebaseAuth.currentUser;
    if (!currentUser) return console.log("No user logged in");
    const token = await currentUser.getIdToken();
    try {
      const res = await this.client.post(
        "/sessions",
        { zoneId, plateId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  // async endSession() {
  //   const currentUser = firebaseAuth.currentUser;
  //   if (!currentUser) return console.log("No user logged in");
  //   const token = await currentUser.getIdToken();
  //   try {
  //     const res = await this.client.patch("/sessions", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
}

const API = new Api();

export default API;
