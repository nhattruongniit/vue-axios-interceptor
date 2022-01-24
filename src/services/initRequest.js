import axios from "axios";

const axiosConfig = {
  baseURL: "https://tony-auth-express.herokuapp.com/api",
  timeout: 5000,
  showLoading: false,
};

export const axiosInstance = axios.create(axiosConfig);

export default function initRequest() {
  let requestCount = 0;

  function decreaseRequestCount() {
    requestCount -= 1;
    if (requestCount === 0) {
      // dispatch action hide loading
    }
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("interceptor request success: ", config);
      if (config?.showLoading) {
        requestCount += 1;
        // dispatch action show loading
      }

      // add auth token
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlZTJhNzM2YWEzYzIwMDE2YzNiZWU1IiwiZmlyc3ROYW1lIjoidG9ueSIsImxhc3ROYW1lIjoibmd1eWVuIiwiYXZhdGFyIjoiYXZhdGFyIiwiZW1haWwiOiJuaGF0dHJ1b25nMTgxMUBnbWFpbC5jb20iLCJyb2xlIjoib3BlcmF0b3IifSwiaWF0IjoxNjQyOTk4Mzk2LCJleHAiOjE2NDMwMzQzOTZ9.4IUAnrZTrBVAnd4PXB3xK7EY-XAjIzI_8V1sMrdsqk8`;
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`;
        // config.headers.common['Authorization'] = `Bearer ${token}`;
        config.headers["x-auth-token"] = token;
      }

      return config;
    },
    (error) => {
      console.log("interceptor request error: ", error);
      if (error.config?.showLoading) {
        decreaseRequestCount();
      }
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      console.log("interceptor response sucess: ", res);

      if (res.config?.showLoading) {
        decreaseRequestCount();
      }
      return res;
    },
    (error) => {
      console.log("interceptor response error code: ", error?.code);
      console.log("interceptor response error config: ", error.config);
      console.log("interceptor response error response: ", error.response);

      // hide loading when timeout
      if (
        (error && error.config?.showSpinner) ||
        error.code === "ECONNABORTED"
      ) {
        decreaseRequestCount();
      }

      // handle request timeout
      if (error?.code === "ECONNABORTED") {
        if (error.config?.apiTimeout?.type === "song") {
          console.log("behavious timeout for api song");
        } else {
          console.log("common timeout");
        }
      }

      // handle errors
      switch (error.response?.status) {
        case 504:
          break;
        case 401:
          break;
        case 403:
          break;
        case 500:
        case 404:
          break;
        default:
          return Promise.reject(error.response);
      }
      return Promise.reject(error.response);
    }
  );
}
