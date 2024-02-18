import axios from "axios";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "./sessionStorage";
import router from "@/router";

export default function setupAxiosInterceptors() {
  axios.interceptors.request.use(
    (config) => {
      if (!config.url.includes('/auth/')) {
        const token = getTokenFromLocalStorage("jwtToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(response);

      if (response.request.responseURL.includes("/auth/") && response.status == 200 && response.data && response.data.valid == false) {

        removeTokenFromLocalStorage("jwtToken");
        router.push('/');
        return Promise.reject(response);
      }

      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        removeTokenFromLocalStorage("jwtToken");
        router.push('/');
      }
      return Promise.reject(error);
    }
  );
}
