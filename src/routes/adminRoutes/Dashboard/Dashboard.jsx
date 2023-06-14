import React, { useEffect } from "react";
import "./Dashboard.scss";
import NavBar from "../../../components/NavBar/NavBar";
import { Outlet, Routes, useLocation } from "react-router-dom";
function Dashboard({ routerPath }) {
  let { pathname } = useLocation();
  const dashboardPath = '/dashboard';
  
  const path = pathname.substring(pathname.indexOf(dashboardPath) + dashboardPath.length + 1);


  return (
    <div className="row">
      <NavBar />
      <main className="main">
        <h1 className="title">{path?path.toUpperCase():'CATEGORIES'}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
