import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import {StockStatus} from '../../contexts/StockStatus';

export default function CommodityRRate() {

  const [sortedMonths,
    setMonths] = useState([])

  const {graphData, periods, dataPresent, changePeriodAPI, allData} = useContext(StockStatus)
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
          break

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
  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv">
      <div className="col-sm-4">
        <select
          className="form-control"
          name="periods"
          onChange={(e) => changePeriodAPI(e.target.value)}>
          <option value="LAST_MONTH">Last month</option>
          <option value="LAST_3_MONTHS">Last 3 months</option>
          <option value="LAST_6_MONTHS">Last 6 months</option>
          <option value="LAST_12_MONTHS">Last 12 Months</option>
          <option value="LAST_BIMONTH">This Bi Month
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
          <center>Stock Status for {sortedMonths.map((month) => {
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
            : <Bar options={{
              responsive: true
            }} data={mydata}/>
}
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </div>
  )
}
