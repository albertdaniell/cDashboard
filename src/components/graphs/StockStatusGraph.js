import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import { StockStatus } from '../../contexts/StockStatus';

export default function CommodityRRate() {

    const [sortedMonths,
        setMonths] = useState([])

  const {graphData, periods, dataPresent} = useContext(StockStatus)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  useEffect(()=>{
    let holdSortedMonths = [...periods];
    let formattedMonths = [];
    holdSortedMonths.forEach(originalMonth => {
      let formattedMonth;
      let year;
      let monthValue;
      let monthName;

      year = originalMonth.slice(0, 4);
      monthValue = originalMonth.slice(4, 6);

      switch (monthValue) {
        case '01':
          monthName = 'January ';
          break;
        case '02':
          monthName = 'February ';
          break;
        case '03':
          monthName = 'March ';
          break;
        case '04':
          monthName = 'April ';
          break;
        case '05':
          monthName = 'May ';
          break;
        case '06':
          monthName = 'June ';
          break;
        case '07':
          monthName = 'July ';
          break;
        case '08':
          monthName = 'August ';
          break;
        case '09':
          monthName = 'September ';
          break;
        case '10':
          monthName = 'October ';
          break;
        case '11':
          monthName = 'November ';
          break;
        case '12':
          monthName = 'December ';
          break;
        default:
          break;
      }

      formattedMonth = `${monthName} ${year}`
      formattedMonths = [
        ...formattedMonths,
        formattedMonth
      ];
    });

    setMonths(formattedMonths)
  },[graphData])

  return (
    <div className="col-sm-12 graphDiv">
      <h4>
  <center>Stock Status for {
      sortedMonths.map((month)=>{
          return(
              <span>{month} </span>
          )

      })
      }</center>
      </h4>
      <Spacer></Spacer>

      <div className="col-sm-12">
      {!dataPresent
        ? <Loading2></Loading2>
        : <Bar options={{
          responsive: true
        }} data={mydata}/>
}
      </div>
    </div>
  )
}
