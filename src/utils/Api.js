import axios from "axios";
import "dotenv/config";

const api = axios.create({
  // baseURL: 'https://134.122.24.222:3333/', //este para producao
  //baseURL: "https://api.planaltolivre.com.br/", //este para producao
  baseURL: "http://localhost:3333/",
  //baseURL: `192.168.1.37:3333`,
  //baseURL: `${ process.env.BASEURL }`,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
