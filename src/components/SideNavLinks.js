import React from 'react';
import {Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'

const SideNavLinks = () => {
  return (
    <div>

      <NavLink exact activeClassName="active" to="/">
        <i class="fas fa-tachometer-alt"></i>
        Dashboard</NavLink>

      <NavLink activeClassName="active" to="/commodityRR">
        <i class="fas fa-medkit"></i>
        C. Reporting Rate</NavLink>
      <NavLink activeClassName="active" to="/stockstatus">
        <i class="fas fa-store"></i>
        Stock Status</NavLink>

      <NavLink activeClassName="active" to="/stockstatusbyno">
        <i class="fas fa-notes-medical"></i>
        Stock Status By No.</NavLink>
      <NavLink activeClassName="active" to='receiptreports'>
        <i class="fas fa-user"></i>
        Receipt Reports</NavLink>

      <NavLink activeClassName="active" to="/users">
        <i class="fas fa-user"></i>
        User Account</NavLink>

      <NavLink activeClassName="" to="#">
        <i class="fas fa-user"></i>
        Tables</NavLink>
    </div>
  );
}

export default SideNavLinks;
