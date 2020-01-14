import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths'
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';
function ReportingRate() {
  const {saveToPdf}=useContext(SaveToPdfContext)
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
      <div className="col-sm-2">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowLine(!showLine)}>{showLine
            ? <i class="fas fa-chart-line fa-2x isLine"></i>
            : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>

      </div>
      <div className="col-sm-4">

      <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>

      </div>

      <div className="col-sm-4">
     
      {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}
      
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
        : <div className="theGraph">
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