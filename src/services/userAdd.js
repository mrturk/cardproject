import { defaultAxiosInstance } from "./api";
import { USERADD } from "../apis/const";

export async function addUser(data) {
  return await defaultAxiosInstance.post(USERADD, data);
}
