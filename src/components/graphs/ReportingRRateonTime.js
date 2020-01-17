import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import {ReportingRateReportingRateOnTime} from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';
import NoData from '../NoData';

const ReportingRRateonTime = () => {
  const {saveToPdf} = useContext(SaveToPdfContext)
  const [showLine,
    setShowLine] = useState(false)
  const [sortedMonths,
    setMonths] = useState([])
  const {
    graphData,
    periods,
    ouNames,
    RROntimedataPresent,
    changePeriodAPI,
    periodAPI,
    allData2,
    changeOrgAPI,
    ouAPI,
    defaultou
  } = useContext(ReportingRateReportingRateOnTime)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

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
  }, [periods])
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
          <center>% Monthly CHV Reporting Rates over time {ouNames.length === 0
              ? <span>
                  ...</span>
              : <div>
                for {ouNames.map((ou) => {
                  return (
                    <span>{ou}
                      ,</span>
                  )
                })}
              </div>
}
          </center>
        </h4>
        <Spacer></Spacer>
      </div>

      {!RROntimedataPresent
        ? <Loading2></Loading2>
        : <div className="theGraph">
          {allData2.length === 0 || allData2 === "undefined"
            ? <center>
                <NoData></NoData>
              </center>
            : <div>
              {showLine
                ? <Line
                    options={{
                    animation: {
                      duration: 3000
                    },
                    responsive: true
                  }}
                    data={mydata}></Line>
                : <HorizontalBar
                  options={{
                  animation: {
                    duration: 3000
                  },
                  responsive: true
                }}
                  data={mydata}/>
}
            </div>
}
        </div>
}
    </div>
  );
}

export default ReportingRRateonTime;
