import { LOGIN, LOGOUT } from "../Const/auth";

const initialState = {};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN: {
      return payload;
    }
    case LOGOUT: {
      return payload;
    }
    default:
      return state;
  }
}
