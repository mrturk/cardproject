import { defaultAxiosInstance } from "./api";
import { ADDMEDIA, GETUSERMEDIA, ADDVCARD } from "../apis/const";

export async function addMedia(data) {
  return await defaultAxiosInstance.post(ADDMEDIA, data);
}

export async function getUserMedia(data) {
  return await defaultAxiosInstance.post(GETUSERMEDIA + `?key=${data}`);
}

export async function addVcard(data) {
  return await defaultAxiosInstance.post(ADDVCARD, { ...data });
}
