import React, {createContext, useContext} from 'react';
import spinner from '../images/spinner.gif'
import logo from '../images/logo.jpg'
import {ChvReportingRateContext} from '../contexts/ChvReportingRateContext';
import { UserContext } from '../contexts/UserContext';
import BackgroundLoading from './BackgroundLoading';
import { ActualReportingExpected } from '../contexts/ActualReportingExpected';
import { StockStatusByNo } from '../contexts/StockStatusByNumber';
const Loading = () => {

  const {isData, showLoading ,setshowLoading} = useContext(ChvReportingRateContext)
  const {dataPresent} = useContext(ActualReportingExpected)
  const {stockdataPresent,} = useContext(StockStatusByNo)

  const {userData} = useContext(UserContext)
  return (
    <div>
      {isData && dataPresent && stockdataPresent
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
          <div className="loadingDivContent"
            style={{
           
          }}>
            <center>
              <img alt="spinner" className="loadingDivimg" style={{
               
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
