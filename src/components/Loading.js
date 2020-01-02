import React, {createContext, useContext} from 'react';
import spinner from '../images/spinner.gif'
import logo from '../images/logo.jpg'
import {ChvReportingRateContext} from '../contexts/ChvReportingRateContext';
import { UserContext } from '../contexts/UserContext';
import BackgroundLoading from './BackgroundLoading';
const Loading = () => {

  const {isData, showLoading ,setshowLoading} = useContext(ChvReportingRateContext)
  const {userData} = useContext(UserContext)
  return (
    <div>
      {isData
        ? null
        : showLoading?
        <div
          style={{
          position: 'fixed',
          zIndex: 2000,
          backgroundColor: 'rgba(255,255,255,.96)',
          height: '100%',
          width: '100%'
        }}>
          <div
            style={{
            width: '20%',
            height: '20%',
            marginLeft: '40%',
            marginTop: '5%'
          }}>
            <center>
              <img alt="spinner" style={{
                height: 250
              }} src={spinner}></img>
              <br></br>
              <br></br>
              <img alt="logo" style={{
                height: 50
              }} src={logo}></img>
              <br></br>
              <br></br>
              {userData.displayName === ""
                ? <h3 style={{
                    color: 'black'
                  }}>Please Wait...</h3>
                :  <h3 style={{color:'black'}}>Welcome {userData.displayName}</h3>
}

<button className="btn btn-primary" onClick={()=>setshowLoading(false)}>Continue In Background</button>

            </center>
          </div>
        </div>
        :<BackgroundLoading></BackgroundLoading>
}
    </div>
  );
}

export default Loading;
