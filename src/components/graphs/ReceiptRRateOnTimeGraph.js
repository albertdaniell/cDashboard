import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import {ReportingRateReportingRateOnTime} from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';
import {ReceiptReportReportOntime} from '../../contexts/ReceiptReportReportOntime';
import sortMonths from '../../constants/sortMonths';

const ReceiptRRateOnTimeGraph = () => {

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
      <div className="col-sm-4">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowLine(!showLine)}>Toggle Line/Bar {showLine
            ? <i class="fas fa-chart-line fa-2x isLine"></i>
            : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>

      </div>
      <div className="col-sm-4">

        <select
          className="form-control"
          name="periods"
          onChange={(e) => changePeriodAPI(e.target.value)}>
          <option value={periodAPI}>Select Month</option>
          <option value="THIS_MONTH">This Month</option>
          <option value="LAST_MONTH">Last month</option>
          <option value="LAST_3_MONTHS">Last 3 months</option>
          <option value="LAST_6_MONTHS">Last 6 months</option>
          <option value="LAST_12_MONTHS">Last 12 Months</option>
          <option value="LAST_BIMONTH">Last Bi Month</option>
          <option value="QUARTERS_LAST_YEAR">Quarters Last Year
          </option>
          <option value="LAST_YEAR">Last Year
          </option>

        </select>
      </div>
      <div className="col-sm-4"></div>
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
        : <div>
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
