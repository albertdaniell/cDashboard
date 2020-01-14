import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import {ReportingRateReportingRateOnTime} from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';

const ReportingRateOverTimeTable = () => {

  const [showLine,
    setShowLine] = useState(false)
  const [sortedMonths,
    setMonths] = useState([])
  const {graphData, periods, ouNames, dataPresent} = useContext(ReportingRateReportingRateOnTime)
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
  }, [graphData])

  let mydata1= 
    graphData.map((gdata)=>{
        return(
            <tr>
          <th  style={{fontSize:10}}>{gdata.label}</th> </tr>
        )

    })

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

      <div className="col-sm-4"></div>
      <div className="col-sm-4"></div>
      <br></br>

      <div className="col-sm-12">
        <h4>
          <center>Monthly CHV Reporting Rates Table over time for {ouNames.map((ou) => {
              return (
                <span>{ou}
                  ,</span>
              )
            })}
          </center>
        </h4>
        <Spacer></Spacer>
      </div>

      <div className="col-sm-12">

        <table class='table table-striped'>
          <thead>
            <tr>
              <th>OrgUnit
              </th>
              <th>Months</th>
              
              <th>Reporting Rate on time</th>
              <th>Reporting Rate</th>


{/*     
              {sortedMonths.map((pe) => {
                    return (
                 
                        <tr style={{fontSize:10}}><td>{pe}</td> </tr>
                
                    )

                  })
} */}
            </tr>
          </thead>
          <tbody>
          {mydata1}
            {/* {sortedMonths.map((month) => {
              return (
                <tr>  
                  <th  style={{fontSize:10}}>{month}</th> 
                  <th  style={{fontSize:10}}>30</th> 
                 
                
                  </tr>
               
                  
              )
              

            })} */}




   

         </tbody>
        </table>
      </div>

    </div>
  );
}

export default ReportingRateOverTimeTable;
