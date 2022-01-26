import { defaultAxiosInstance } from "./api";
import { GETALLUSER } from "../apis/const";
export async function getAllUser() {
  return await defaultAxiosInstance.get(GETALLUSER);
}

