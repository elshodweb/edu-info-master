import React, { useState } from "react";
import "./NavBar.scss";
import NavLink from "../NavLink/NavLink";
function NavBar() {
  return (
    <div className="nav-bar">
      <div className="logo">
        EDU-INFO
        <hr />
      </div>
      <nav className="nav">
        <NavLink path={""} text={"Categories"} />
        <NavLink path={"centers"} text={"Centers"} />
        <NavLink path={"filials"} text={"Filials"} />
        <NavLink path={"courses"} text={"Courses"} />
      </nav>

      <div
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="logout"
      >
        <a href="#">CHIQISH</a>
      </div>
    </div>
  );
}

export default NavBar;
