import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar,Radar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import sortMonths from '../../constants/sortMonths';

export default function CommodityRRate() {

    const [sortedMonths,
        setMonths] = useState([])

  const {graphData, periods, dataPresent,allData} = useContext(CommodityReportingRate)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  useEffect(()=>{
    let formattedMonths= sortMonths(periods)
    setMonths(formattedMonths)
  },[graphData])

  return (
    <div className="col-sm-12 graphDiv">
      <h4>
  <center>Commodity Reporting Rates for {
      sortedMonths.map((month)=>{
          return(
              <span>{month} </span>
          )

      })
      }</center>
      </h4>
      <Spacer></Spacer>

      {graphData.length === 0
        ? <Loading2></Loading2>
        : <Bar options={{
          animation: {
            duration: 3000 // general animation time
        },
          responsive: true
        }} data={mydata}/>
}
    </div>
  )
}
