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
}

const API = new Api();

export default API;
