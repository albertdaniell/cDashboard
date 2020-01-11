import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar,Radar, Doughnut} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import { StockStatusByNo } from '../../contexts/StockStatusByNumber';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';

export default function StockStatusByNoGraph() {

  const [sortedMonths,
    setMonths] = useState([])

  const {graphData, periods, stockdataPresent, changePeriodAPI, allData,periodAPI} = useContext(StockStatusByNo)
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
<center># Stock Status  {sortedMonths.length === 0 || sortedMonths === undefined ?null:
<span> for {sortedMonths.length} month(s)</span>
}</center>
        </h4>
        <Spacer></Spacer>
        {allData.rows === undefined || allData.rows.length === 0
          ?<p style={{
            color: 'red',textAlign:'center'
          }}>No data for selected month(s). Toggle the dropdown to select a month</p>
          : !stockdataPresent
            ? <Loading2></Loading2>
            : <Bar options={{
              animation: {
                duration: 3000 // general animation time
            },
              responsive: true
            }} data={mydata}/>
}
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </div>
  )
}
