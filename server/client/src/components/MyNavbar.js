import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import { Button, Navbar, Nav, NavDropdown, Row } from "react-bootstrap";
import "./MyNavbar.css";
import { Link } from "react-router-dom";
import lcLogo from "../images/lc.png";

import * as IoIcons from "react-icons/io";
import * as FaIcons from "react-icons/fa";
import { RiFilePaper2Fill, RiLogoutBoxLine } from "react-icons/ri";
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
    icon: <RiFilePaper2Fill />,
    cName: "nav-text",
  },
];

const logOutNav = {
  title: "Logout",
  path: "/",
  icon: <RiLogoutBoxLine />,
  cName: "nav-text",
};

const adminSidebarData = [
  {
    title: "All Responses",
    path: "/admin",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  
];
const superAdminSidebarData = [
  {
    title: "Edit Form",
    path: "/admin/form",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];

function MyNavbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const url = window.location.pathname;

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const onSignOut = () => {
    props.logOutUser();
  };
  const { user } = props;

  const renderSidebar = () => {
    var sidebar = [];
    
    if (user.authenticated) {
      sidebar=sidebar.concat(noAdminSidebarData);
      if (user.isadmin) {
        sidebar=sidebar.concat(adminSidebarData);
      }
      if (user.isSuperAdmin) {
        sidebar=sidebar.concat(superAdminSidebarData);
      }
      sidebar=sidebar.concat(logOutNav);
    }
    
    return sidebar
  };
  // const SidebarData = user.authenticated
  //   ? user.isadmin
  //     ? [...noAdminSidebarData, ...adminSidebarData, logOutNav]
  //     : [...noAdminSidebarData, logOutNav] 
  //     ? user.isSuperAdmin
  //       ? [
  //           ...noAdminSidebarData,
  //           ...superAdminSidebarData,
  //           logOutNav,
  //         ]
  //       : [...noAdminSidebarData, logOutNav]
  //     : []
  //   : [];
  const SidebarData= renderSidebar();
  console.log(user, sidebar);

  return (
    <div class="Navbar">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="/">
            <img src={lcLogo} className="image" />
          </Link>
          {user.authenticated ? (
            <div
              class="col"
              onClick={(e) =>
                setTimeout(() => {
                  showSidebar();
                }, 400)
              }
            >
              <div class="con">
                <div class="bar arrow-top-r"></div>
                <div class="bar arrow-middle-r"></div>
                <div class="bar arrow-bottom-r"></div>
              </div>
            </div>
          ) : null}
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li key="image" className="nav-image">
              <div className="horizontally_center_items nav-image-main">
                <img src={user.image} />
              </div>
              <Row style={{ justifyContent: "center", margin: "5px 10px" }}>
                <div className="horizontally_center_items nav-image-name">
                  {user.name}
                </div>
              </Row>
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
