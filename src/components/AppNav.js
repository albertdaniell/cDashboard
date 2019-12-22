import React, {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import logo from '../images/logo.jpg'

const AppNav = () => {

  const {userData} = useContext(UserContext);
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
            <img alt="logo" src={logo} style={{height:'100%',width:'auto'}}></img>
            </a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav"></ul>

            <ul class="nav navbar-nav navbar-right">
              <li></li>
              <li class="dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"> <span style={{padding:5,backgroundColor:'gray',borderRadius:100}}> <i class="fas fa-user" style={{color:'white'}}></i></span> {userData.displayName}
                  <span class="caret"></span>
                </a>

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default AppNav;
