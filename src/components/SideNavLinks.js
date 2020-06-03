import React from "react";
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

const SideNavLinks = () => {
  const navlinks = [
    {
      linkName: "Dashboard",
      activeClass: "active",
      to: "/",
      icon: "fas fa-tachometer-alt",
    },
    {
      linkName: "C. Reporting Rate",
      activeClass: "active",
      to: "/commodityRR",
      icon: "fas fa-medkit",
    },
    {
      linkName: "Stock Status",
      activeClass: "active",
      to: "/stockstatus",
      icon: "fas fa-store",
    },
    {
      linkName: "Stock Status By No.",
      activeClass: "active",
      to: "/stockstatusbyno",
      icon: "fas fa-notes-medical",
    },
    {
      linkName: "Receipt Reports",
      activeClass: "active",
      to: "/receiptreports",
      icon: "fas fa-file-invoice",
    },
    {
      linkName: "User Account",
      activeClass: "active",
      to: "/users",
      icon: "fas fa-user",
    },
    {
      linkName: "Tables",
      activeClass: "",
      to: "/table",
      icon: "fas fa-user",
    },
  ];
  let myLinks = navlinks.map((link) => {
    return (
      <div>
        <NavLink exact activeClassName={link.activeClass} to={link.to}>
          <i class={link.icon}></i>
          {link.linkName}
        </NavLink>
      </div>
    );
  });
  return (
    <div>
      {myLinks}
      <a href="/dhis-web-dashboard-integration/index.html">
        {" "}
        <i className="fas fa-home"></i> Back to kecstock
      </a>
    </div>
  );
};

export default SideNavLinks;
