import React, { useState } from "react";
import "./Dashboard.scss";
import NavBar from "../../../components/NavBar/NavBar";
import menu from "./../../../assets/isons/menu.png";
import { Outlet, useLocation } from "react-router-dom";
function Dashboard() {
  let { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("nav") === "false" ? false : true
  );
  const dashboardPath = "/dashboard";
  function openNav() {
    setIsOpen(!isOpen);
    localStorage.setItem("nav", !isOpen);
  }
  const path = pathname.substring(
    pathname.indexOf(dashboardPath) + dashboardPath.length + 1
  );

  return (
    <div className="dashbaord">
      <NavBar isOpen={isOpen} />
      <main className={isOpen ? "open main" : "main"}>
        <div className="dashbaord__row">
          <button
            onClick={openNav}
            className={isOpen ? "btn_open active" : "btn_open"}
          >
            <img src={menu} alt="menu" />
          </button>
          <h1 className="title">{path ? path.toUpperCase() : "CATEGORIES"}</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
