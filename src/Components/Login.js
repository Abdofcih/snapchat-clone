import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { Button } from "@material-ui/core";

import { auth } from "../firebase"; // my auth with config
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { login } from "../features/appSlice";
import SnapLogo from "./SnapLogo";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid
          })
        );
        console.log(result);
      })
      .catch(err => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <SnapLogo />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default Login;
