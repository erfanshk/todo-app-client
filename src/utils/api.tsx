import { errorToast, successToast } from "@store/slices/toast/toast.slice";
import store from "@store/store";
import axios, { AxiosInstance } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
const BaseApi: AxiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  timeout: 5000,
});
BaseApi.interceptors.response.use(
  (response) => {
    let message = response.data.message;
    if (message) {
      store.dispatch(successToast(message));
    }
    return response;
  },
  (error) => {
    let message;
    switch (error.response.status) {
      case 500:
      case 422:
      case 400:
      case 419:
        message = error.response.data.message;
        break;
    }
    store.dispatch(errorToast(message));
    return Promise.reject(error);
  }
);

export default BaseApi;
