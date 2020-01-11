import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar,Radar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';

export default function CommodityRRate() {

    const [sortedMonths,
        setMonths] = useState([])

  const {graphData,ouNames, periods, dataPresent,allData,changePeriodAPI,periodAPI} = useContext(CommodityReportingRate)
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

<div className="col-sm-4">
       <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>
      </div>

      <div className="col-sm-4"></div>
      <div className="col-sm-4"></div>
      <br></br>


      
    <div className="col-sm-12">

    <h4>
          <center>% Commodity Reporting Rates {ouNames.length === 0 || ouNames ===undefined ?null: <span>
            for {ouNames.map((name) => {
              return (
                <span>  {name}
                  ,
                </span>
              )

            })
}
            </span>} </center>
        </h4>
        <Spacer></Spacer>
    </div>
     

      {allData.rows === undefined || allData.rows.length == 0 
          ? <p style={{
              color: 'red',textAlign:'center'
            }}>No data for selected month(s). Toggle the dropdown to select a month</p>
          : !dataPresent || sortedMonths === undefined || sortedMonths.length === 0
            ? <Loading2></Loading2>
            : <Bar options={{
              responsive: true
            }} data={mydata}/>
}
  


    </div>
  )
}
