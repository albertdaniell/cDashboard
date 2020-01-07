import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths'
function ReportingRate() {
  const [sortedMonths,
    setMonths] = useState([])
  const [data,
    setdata] = useState([])
  const {
    graphData,
    periods,
    dataName,
    isData,
    changePeriodAPI,
    periodAPI
  } = useContext(ChvReportingRateContext)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  const [showLine,
    setShowLine] = useState(false)

  useEffect(() => {
    console.log(periods[0])
    periods.map((p) => {
      console.log(p)

    })
   
    let formattedMonths= sortMonths(periods)
    setMonths(formattedMonths)

  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv" style={{}}>
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
          <option value="THIS_BIMONTH">This Bi Month</option>
          <option value="LAST_BIMONTH">Last Bi Month</option>
          <option value="QUARTERS_LAST_YEAR">Quarters Last Year
          </option>
          <option value="LAST_YEAR">Last Year
          </option>

        </select>
      </div>
      <div className="col-sm-12">
        <h4>
          <center>
            % CHV Reporting rate {sortedMonths.length === 0 || sortedMonths === undefined
              ? null
              : <span>
                for {sortedMonths.length}
                month(s)</span>
}</center>
        </h4>
        <Spacer></Spacer>
      </div>

      {!isData
        ? <Loading2></Loading2>
        : <div>
          {showLine
            ? <Line
                options={{
                lineTension: "0",
                animation: {
                  duration: 3000
                },
                responsive: true
              }}
                data={mydata}></Line>
            : <Bar
              options={{
              animation: {
                duration: 3000
              },
              responsive: true
            }}
              data={mydata}></Bar>
}
        </div>
}

    </div>
  )
}

export default ReportingRate;