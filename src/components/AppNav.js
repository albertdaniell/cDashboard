import React, {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import logo from '../images/logo.jpg'
import {Route, NavLink, BrowserRouter as Router, Switch} from 'react-router-dom'

const AppNav = () => {

  const {userData, dataPresent, userCredentials} = useContext(UserContext);
  return (
    <div>
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img
                alt="logo"
                src={logo}
                style={{
                height: '100%',
                width: 'auto'
              }}></img>
            </a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbarlinks">
              <li>
                <NavLink exact activeClassName="active" to="/">
                  <i class="fas fa-tachometer-alt"></i>
                  Dashboard</NavLink>
              </li>
              <li>
                <NavLink activeClassName="active" to="/users">
                  <i class="fas fa-user"></i>
                  User Account</NavLink>
              </li>

              <li>
                <NavLink activeClassName="active" to="/commodityRR">
                  <i class="fas fa-medkit"></i>
                  C. Reporting Rate</NavLink>
              </li>

              <li>
                <NavLink activeClassName="active" to="/stockstatus">
                  <i class="fas fa-store"></i>
                  Stock Status</NavLink>
              </li>

              <li>
                <NavLink activeClassName="active" to="/stockstatusbyno">
                  <i class="fas fa-notes-medical"></i>
                  Stock Status By No.</NavLink>
              </li>

            </ul>

            <ul class="nav navbar-nav navbar-right">
              <li></li>
              <li class="dropdown">
                <NavLink activeClassName="active" to="/users">
                  <span
                    style={{
                    padding: 5,
                    borderRadius: 100
                  }}>
                    <i
                      class="fas fa-user"
                      style={{
                      color: 'black'
                    }}></i>
                  </span>
                  {!dataPresent
                    ? <span>...</span>
                    : <span className="username">
                      {userCredentials.username}
                    </span>
}

                </NavLink>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AppNav;
