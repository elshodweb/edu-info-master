import React from "react";

import { useNavigate } from "react-router-dom";
import "./UserPage.scss";
import Header from "../../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";
function UserPage() {
  return (
    <div className="user-page">
      <Header />

      <div className="main">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
