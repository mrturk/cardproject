import { LOGIN, LOGOUT } from "../Const/auth";

export function loginAction(payload) {
  return { type: LOGIN, payload };
}
export const logoutAction = () => {
  return { type: LOGOUT, payload: { logout: true } };
};
