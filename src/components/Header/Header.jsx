import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">EDU-INFO</div>
          <div className="header__nav">
            <Link className="header__nav-item" to={"/"}>
              About
            </Link>
            <Link className="header__nav-item" to={"/Categories"}>
              Courses
            </Link>
            {/* <Link className="header__nav-item" to={'/add'}>Courses</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
