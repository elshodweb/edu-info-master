import React from "react";
import "./NavBar.scss";
import NavLink from "../NavLink/NavLink";
import categories from "../../assets/isons/categories.png";
import centers from "../../assets/isons/centers.png";
import filials from "../../assets/isons/filials.png";
import courses from "../../assets/isons/courses.png";
import logout from "../../assets/isons/logout.png";
function NavBar({isOpen}) {
  return (
    <div className={isOpen?"open nav-bar":"nav-bar"}>
      <div className="logo">
        EDU-INFO
        <hr />
      </div>
      <nav className="nav">
        <NavLink url={categories} path={""} text={"Categories"} />
        <NavLink url={centers} path={"centers"} text={"Centers"} />
        <NavLink url={filials} path={"filials"} text={"Filials"} />
        <NavLink url={courses} path={"courses"} text={"Courses"} />
      </nav>

      <div
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="logout"
      >
        <img width={20} src={logout} alt="logout" />
        <span >CHIQISH</span>
      </div>
    </div>
  );
}

export default NavBar;
