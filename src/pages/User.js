import React, {useContext,useState,useEffect} from 'react'
import {UserContext} from '../contexts/UserContext';
import Spacer from '../components/Spacer';
import {useSpring, animated} from 'react-spring'

const User = () => {
  const {userData, userCredentials, userAccess} = useContext(UserContext);
  // console.log(userData.userCredentials.username) const
  // {userCredentials}=.userCredentials
  const [myopacity,setOpacity]=useState(0)

  const props = useSpring({
    opacity: myopacity,
    from: { opacity: 0},
  })

  useEffect(() => {
   setTimeout(() => {
    setOpacity(1)
   }, 100);
  }, [])
  return (
    <animated.div style={props}>
      <h2 className="pageHeading">
        <i class="fas fa-user"></i>
        User Account</h2>

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 graphDiv">
            <h4>User Details</h4>
            <Spacer></Spacer>
            Name: {userData.displayName}
            <br></br>
            Username: {userCredentials.username}
            <br></br>
            Created: {userCredentials.created}
            <br></br>
            Last Logged: {userCredentials.lastLogin}
            <br></br>
            Last Updated: {userCredentials.lastUpdated}

            <br></br>
            Password Last Updated: {userCredentials.passwordLastUpdated}
          </div>

          <div className="col-sm-6">
            <div className="col-sm-12 graphDiv">
              <h4>User Access Details</h4>
              <Spacer></Spacer>
              Read: {userAccess.read
                ? "true"
                : "false"}
              <br></br>
              Write: {userAccess.write
                ? "true"
                : "false"}
              <br></br>
              Update: {userAccess.update
                ? "true"
                : "false"}
              <br></br>
              Delete: {userAccess.delete
                ? "true"
                : "false"}

              <br></br>
              Manage: {userAccess.manage
                ? "true"
                : "false"}
            </div>
          </div>

        </div>
      </div>
    </animated.div>
  );
}

export default User;
