import React, {useState, useContext, useEffect} from 'react'
import {
  Line,
  Bar,
  Pie,
  Polar,
  HorizontalBar,
  Radar
} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import NoData from '../NoData';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';
import PeriodsComponent from '../PeriodsComponent';

export default function CommodityRRate() {
  const {saveToPdf} = useContext(SaveToPdfContext)
  const [sortedMonths,
    setMonths] = useState([])

  const {
    graphData,
    ouNames,
    periods,
    dataPresent,
    allData,
    changePeriodAPI,
    periodAPI,
    changeOrgAPI,
    ouAPI,
    defaultou
  } = useContext(CommodityReportingRate)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  const [showLine,
    setShowLine] = useState(false)

  const [orgsModalOpen,
    setorgsModal] = useState(false)

  const [PeriodsModalOpen,
    setPeriodsModal] = useState(false)

  const togglePeriodModal = () => {
    setPeriodsModal(!PeriodsModalOpen)
  }
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

      {PeriodsModalOpen
        ? <PeriodsComponent
            togglePeriodModal={togglePeriodModal}
            changePeriodAPI={changePeriodAPI}
            periodAPI={periodAPI}></PeriodsComponent>
        : null
}

      <div className="col-sm-4">
        <ToggleGraphOptions
          togglePeriodModal={togglePeriodModal}
          showLine={showLine}
          toggleLine={toggleLine}
          toggleOrgsModal={toggleOrgsModal}></ToggleGraphOptions>
      </div>
      <div className="col-sm-4"></div>

      <div className="col-sm-4">

        {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}

      </div>
      <br></br>

      <div className="col-sm-12">

        <h4>
          <center>% Commodity Reporting Rates {ouNames.length === 0 || ouNames === undefined
              ? null
              : <span>
                for {ouNames.map((name) => {
                  return (
                    <span>
                      {name}
                      ,
                    </span>
                  )

                })
}
              </span>}
          </center>
        </h4>
        <Spacer></Spacer>
      </div>

      <div className="theGraph">

        {allData.rows === undefined || allData.rows.length == 0
          ? <center>
              <NoData></NoData>
            </center>
          : !dataPresent || sortedMonths === undefined || sortedMonths.length === 0
            ? <Loading2></Loading2>
            : <Bar options={{
              responsive: true
            }} data={mydata}/>
}
      </div>

    </div>
  )
}
