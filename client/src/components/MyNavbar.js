import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./MyNavbar.css";
import { Link } from "react-router-dom";
import lcLogo from "../images/lc.png";

import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { IconContext } from "react-icons";

const noAdminSidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Questions",
    path: "/form",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
];

const adminSidebarData = [
  {
    title: "Admin",
    path: "/admin",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Create Questions",
    path: "/admin/form",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];

function MyNavbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const onSignOut = () => {
    props.logOutUser();
  };
  const { user } = props;
  const SidebarData = user.authenticated
    ? user.isadmin
      ? [...noAdminSidebarData, ...adminSidebarData]
      : [...noAdminSidebarData]
    : [];

  console.log(user, SidebarData);
  return (
    <div class="Navbar">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="/">
            <img src={lcLogo} className="image" />
          </Link>
          {user.authenticated ? (
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          ) : null}
        </div>
        {console.log(SidebarData)}
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.title === "Logout") onSignOut();
                    }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = {
  logOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
