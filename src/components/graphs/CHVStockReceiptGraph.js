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
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';
import NoData from '../NoData';

export default function CHVStockReceiptGraph() {
  const {saveToPdf} = useContext(SaveToPdfContext)

  const [sortedMonths,
    setMonths] = useState([])

  const {
    graphData,
    periods,
    dataPresent,
    changePeriodAPI,
    allData,
    periodAPI,
    changeOrgAPI,
    allData2,
    defaultou,
    ouAPI
  } = useContext(CHVStockReceiptContext)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  const [showLine,
    setShowLine] = useState(false)

  const [orgsModalOpen,
    setorgsModal] = useState(false)

  const toggleOrgsModal = () => {
 
    setorgsModal(!orgsModalOpen)
  }

  const toggleLine = (e) => {
    // e.preventDefault()
    setShowLine(!showLine)
  }

  useEffect(() => {
    let formattedMonths = sortMonths(periods)
    setMonths(formattedMonths)
  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv">

      {orgsModalOpen
        ? <OrgsComponent
            defaultou={defaultou}
            ouAPI={ouAPI}
            changeOrgAPI={changeOrgAPI}
            toggleOrgsModal={toggleOrgsModal}></OrgsComponent>
        : null
}

      <div className="col-sm-4">
        <ToggleGraphOptions
          showLine={showLine}
          toggleLine={toggleLine}
          toggleOrgsModal={toggleOrgsModal}></ToggleGraphOptions>
      </div>
      <div className="col-sm-4">
        <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>

      </div>

      <div className="col-sm-4">

        {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}

      </div>
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
        <div className="theGraph">
          {allData.rows === undefined || allData.rows.length == 0
            ?<center><NoData></NoData></center>
            : !dataPresent
              ? <Loading2></Loading2>
              : <Bar
                options={{
                animation: {
                  duration: 3000
                },
                responsive: true,
                legend: {
                  display: true
                }
              }}
                data={mydata}/>
}
        </div>
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </div>
  )
}
