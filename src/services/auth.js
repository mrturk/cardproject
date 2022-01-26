import { defaultAxiosInstance } from "./api";
import { LOGIN } from "../apis/const";

export async function login(data) {
  return await defaultAxiosInstance.post(LOGIN, data);
}
