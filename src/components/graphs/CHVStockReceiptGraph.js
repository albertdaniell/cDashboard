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
import TogglePeriod from '../TogglePeriod';

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
      <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>

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
