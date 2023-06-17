import React  from "react";
import "./Dashboard.scss";
import NavBar from "../../../components/NavBar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
function Dashboard() {
  let { pathname } = useLocation();
  const dashboardPath = '/dashboard';
  
  const path = pathname.substring(pathname.indexOf(dashboardPath) + dashboardPath.length + 1);


  return (
    <div className="dashbaord">
      <NavBar />
      <main className="main">
        <h1 className="title">{path?path.toUpperCase():'CATEGORIES'}</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
