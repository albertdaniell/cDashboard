import React, {useState, useContext, useEffect} from 'react'
import {
  Line,
  Bar,
  Pie,
  Polar,
  HorizontalBar,
  Radar,
  Bubble
} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import {StockStatus} from '../../contexts/StockStatus';
import {CHVStockReceiptContext} from '../../contexts/CHVStockReceiptContext';
import sortMonths from '../../constants/sortMonths';

export default function CHVStockReceiptGraph() {

  const [sortedMonths,
    setMonths] = useState([])

  const {graphData, periods, dataPresent, changePeriodAPI, allData,periodAPI} = useContext(CHVStockReceiptContext)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  useEffect(() => {
    let formattedMonths= sortMonths(periods)
    setMonths(formattedMonths)
  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv">
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
          <option value="THIS_BIMONTH">This Bi Month
          </option>
          <option value="LAST_BIMONTH">Last Bi Month</option>
          <option value="QUARTERS_LAST_YEAR">Quarters Last Year
          </option>
          <option value="LAST_YEAR">Last Year
          </option>

        </select>
      </div>

      <div className="col-sm-4"></div>
      <div className="col-sm-4"></div>
      <br></br>

      <div className="col-sm-12">
        <h4>
          <center>CHV Stock Receipt for {sortedMonths.map((month) => {
              return (
                <span>{month}
                  ,
                </span>
              )

            })
}</center>
        </h4>
        <Spacer></Spacer>
        {allData.rows === undefined || allData.rows.length == 0
          ? <p style={{
              color: 'red'
            }}>No data for selected month(s)</p>
          : !dataPresent
            ? <Loading2></Loading2>
            : <Bar
              options={{
                animation: {
                    duration: 3000 // general animation time
                },
                
              responsive: true,
              legend: {
                display: true,
                
              },
             
            }}
              data={mydata}/>
}
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </div>
  )
}
