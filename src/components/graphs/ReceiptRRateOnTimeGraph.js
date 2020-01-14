import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import {ReportingRateReportingRateOnTime} from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';
import {ReceiptReportReportOntime} from '../../contexts/ReceiptReportReportOntime';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';

const ReceiptRRateOnTimeGraph = () => {
  const {saveToPdf}=useContext(SaveToPdfContext)

  const [showLine,
    setShowLine] = useState(false)
  const [sortedMonths,
    setMonths] = useState([])
  const {
    graphData,
    periods,
    ouNames,
    RROntimedataPresent,
    changePeriodAPI,
    periodAPI
  } = useContext(ReceiptReportReportOntime)
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
          <center>
            % Monthly CHV Receipt Reporting Rates over time for {ouNames.map((ou) => {
              return (
                <span>{ou}
                  ,</span>
              )
            })}
          </center>
        </h4>
        <Spacer></Spacer>
      </div>

      {!RROntimedataPresent
        ? <Loading2></Loading2>
        : <div className="theGraph">
          {showLine
            ? <Line
                options={{
                animation: {
                  duration: 3000
                },
                responsive: true
              }}
                data={mydata}></Line>
            : <HorizontalBar
              options={{
              animation: {
                duration: 3000
              },
              responsive: true
            }}
              data={mydata}/>
}
        </div>
}
    </div>
  );
}

export default ReceiptRRateOnTimeGraph;
