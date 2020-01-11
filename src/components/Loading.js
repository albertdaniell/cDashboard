import React, {createContext, useContext} from 'react';
import {Redirect} from 'react-router'
import {useSpring, animated} from 'react-spring'
import spinner from '../images/spinner.png'
import logo from '../images/logo.jpg'
import {ChvReportingRateContext} from '../contexts/ChvReportingRateContext';
import {UserContext} from '../contexts/UserContext';
import BackgroundLoading from './BackgroundLoading';
import {ActualReportingExpected} from '../contexts/ActualReportingExpected';
import {StockStatusByNo} from '../contexts/StockStatusByNumber';
import {ReportingRateReportingRateOnTime} from '../contexts/ReportingRateReportingOnTime';
const Loading = () => {

  const {isData, showLoading, setshowLoading} = useContext(ChvReportingRateContext)

  const {RROntimedataPresent} = useContext(ReportingRateReportingRateOnTime)
  const {dataPresent, graphData} = useContext(ActualReportingExpected)
  const {stockdataPresent} = useContext(StockStatusByNo)

  const {userData} = useContext(UserContext)
  return (
    <div>
      {isData && dataPresent && RROntimedataPresent
        ? <Redirect to="/"></Redirect>
        : showLoading
          ? <div
              style={{
              position: 'fixed',
              zIndex: 2000,
              backgroundColor: 'rgba(255,255,255,.96)',
              height: '100%',
              width: '100%'
            }}>
              <div className="loadingDivContent" style={{}}>
                <center>
                  <div style={{height:'3rem', width:'3rem'}} class="ld-ext-right running">
                    <div class="ld ld-ball ld-squeeze"></div>
                  </div>
                  {/* <img alt="spinner" className="loadingDivimg" style={{}} src={spinner}></img> */}
                  <br></br>
                  <br></br>
                  {userData.length === 0?
                  <img class=""
                  alt="logo"
                  style={{
                  height: 50
                }}
                  src={logo}></img>
                  :<img class="ld ld-bounce infinite"
                  alt="logo"
                  style={{
                  height: 50
                }}
                  src={logo}></img>

}
                 
                  <br></br>
                  <br></br>
                  {userData.length === 0
                    ? <h3 style={{
                        color: 'black'
                      }}>Loading Metadata...</h3>
                    : <h3 style={{
                      color: 'black'
                    }}>Welcome {userData.displayName}</h3>
}

                  <button className="btn btn-primary" onClick={() => setshowLoading(false)}>Continue In Background</button>

                </center>
              </div>
            </div>
          : <BackgroundLoading></BackgroundLoading>
}
    </div>
  );
}

export default Loading;
