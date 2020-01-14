import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import { ReportingRateReportingRateOnTime } from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';

const ReportingRRateonTime = () => {
  const {saveToPdf}=useContext(SaveToPdfContext)
    const [showLine,
        setShowLine] = useState(false)
    const [sortedMonths,
        setMonths] = useState([])
    const {graphData,periods,ouNames, RROntimedataPresent,changePeriodAPI,periodAPI} = useContext(ReportingRateReportingRateOnTime)
    const mydata = {
        labels: sortedMonths,
        datasets: graphData
      }

      useEffect(() => {
 
        let formattedMonths= sortMonths(periods)
        setMonths(formattedMonths)
      }, [periods])
    return (
        <div className="col-sm-12 graphDiv">
           <div className="col-sm-2">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowLine(!showLine)}>{showLine
            ? <i class="fas fa-chart-line fa-2x isLine"></i>
            : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>

      </div>
      <div className="col-sm-4">

      <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>

      </div>
      <div className="col-sm-4">
     
      {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}
      
      </div>
      <br></br>

      <div className="col-sm-12">
      <h4>
        <center>% Monthly CHV Reporting Rates over time  {
          ouNames.length === 0?<span> ...</span>:
          <div>
            for {ouNames.map((ou)=>{
            return(
            <span>{ou} ,</span>
            )
        })}
          </div>
          } </center>
      </h4>
      <Spacer></Spacer>
        </div>
                
     
 {
   ! RROntimedataPresent?<Loading2></Loading2>:
   <div className="theGraph">
         {showLine
        ? <Line options={{
          animation: {
            duration: 3000 // general animation time
        },
            responsive: true
          }} data={mydata}></Line>
        : <HorizontalBar options={{
          animation: {
            duration: 3000 // general animation time
        },
          responsive: true
        }} data={mydata}/>
}
   </div>
 }
        </div>
    );
}

export default ReportingRRateonTime;
