import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import { ReportingRateReportingRateOnTime } from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const ReportingRRateonTime = () => {

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
              case 'Q1':
                monthName = 'January ';
                break;
              case 'Q2':
                monthName = 'February ';
                break;
              case 'Q3':
                monthName = 'March ';
                break;
              case 'Q4':
                monthName = 'April ';
                break;
              case 'Q5':
                monthName = 'May ';
                break;
              case 'Q6':
                monthName = 'June ';
                break;
              case 'Q7':
                monthName = 'July ';
                break;
              case 'Q8':
                monthName = 'August ';
                break;
              case 'Q9':
                monthName = 'September ';
                break;
              case 'Q10':
                monthName = 'October ';
                break;
              case 'Q11':
                monthName = 'November ';
                break;
              case 'Q12':
                monthName = 'December ';
                
              break;

              case '':
                monthName = 'Year ';
                break
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
        <center>Monthly CHV Reporting Rates over time for {ouNames.map((ou)=>{
            return(
            <span>{ou} ,</span>
            )
        })} </center>
      </h4>
      <Spacer></Spacer>
        </div>
                
     
 {
   ! RROntimedataPresent?<Loading2></Loading2>:
   <div>
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
