import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ path, text, url }) {
  let { pathname } = useLocation();
  const dashboardPath = "/dashboard";

  const pathCut = pathname.substring(
    pathname.indexOf(dashboardPath) + dashboardPath.length + 1
  );

  return (
    <div className={pathCut === path ? "link active" : "link"}>
      <img width={30} src={url} alt="icon" />
      <Link to={path}>{text}</Link>
    </div>
  );
}

export default NavLink;
