import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../store/Action/auth";
export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand mb-0 h1">DİGİSCARD</span>
        <span
          style={{ float: "right", cursor: "pointer" }}
          onClick={() => {
            history.push("/Login");
            dispatch(logoutAction());
          }}
          class="navbar-brand mb-0 h1"
        >
          Çıkış
        </span>
      </div>
    </nav>
  );
}
