import React from "react";
import "./Loading.scss";
import gif from "./../../assets/img/loading.gif";
function Loading() {
  return (
    <div className="loading">
      <img src={gif} alt="gif" />
    </div>
  );
}

export default Loading;
