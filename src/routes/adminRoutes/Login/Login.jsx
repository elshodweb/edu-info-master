import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Navigate } from "react-router-dom";
import axiosInstance from "../../../axios";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
import Loading from "../../../components/Loading/Loading";

function Login({ isAuth, verifyToken }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);
  async function onLogin(e) {
    e.preventDefault();
    try {
      let res = await axiosInstance.post(
        "/login",
        {
          password,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      setMessage(error?.response?.data?.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
    verifyToken();
  }
  if (isAuth === null) {
    return <Loading />;
  }
  if (isAuth) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="login">
        <ErrorModal message={message} />
        <form className="form" onSubmit={onLogin}>
          <input
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            type="text"
          />
          <input
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
          />
          <button className="btn">login</button>
        </form>
      </div>
    );
  }
}

export default Login;
