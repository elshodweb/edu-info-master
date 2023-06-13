import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ path, text }) {
  const { pathname } = useLocation();
  return (
    <div className={pathname === path ? "link active" : "link"}>
      <Link to={path}>{text}</Link>
    </div>
  );
}

export default NavLink;
