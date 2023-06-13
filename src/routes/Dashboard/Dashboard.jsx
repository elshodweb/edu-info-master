import React from "react";
import "./Dashboard.scss";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet, Routes } from "react-router-dom";
function Dashboard({ children }) {
  return (
    <div className="row">
      <NavBar />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
