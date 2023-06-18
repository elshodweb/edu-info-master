import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ path, text, url }) {
  let { pathname } = useLocation();
  const dashboardPath = "/dashboard";

  const pathCut = pathname.substring(
    pathname.indexOf(dashboardPath) + dashboardPath.length + 1
  );

  return (
    <Link to={path} className={pathCut === path ? "link active" : "link"}>
      <img width={30} src={url} alt="icon" />
      <span>{text}</span>
    </Link>
  );
}

export default NavLink;
