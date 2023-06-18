import React, { useState } from "react";
import "./Dashboard.scss";
import NavBar from "../../../components/NavBar/NavBar";
import menu from "./../../../assets/isons/menu.png";
import { Outlet, useLocation } from "react-router-dom";
function Dashboard() {
  let { pathname } = useLocation();
  // console.log(!!localStorage.getItem("nav"));
  const [isOpen, setIsOpen] = useState(localStorage.getItem("nav")==="true");
  console.log(isOpen);
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
          <button onClick={openNav}>
            <img width={40} src={menu} alt="menu" />
          </button>
          <h1 className="title">{path ? path.toUpperCase() : "CATEGORIES"}</h1>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
