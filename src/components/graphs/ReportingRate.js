import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths'
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';
import NoData from '../NoData';
import PeriodsComponent from '../PeriodsComponent';
function ReportingRate() {
  const {saveToPdf} = useContext(SaveToPdfContext)
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
    periodAPI,
    changeOrgAPI,
    allMetaData,
    ouAPI,
    defaultou,
    allData2
  } = useContext(ChvReportingRateContext)
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
    // console.log(periods[0])
    periods.map((p) => {
      // console.log(p)

    })

    let formattedMonths = sortMonths(periods)
    setMonths(formattedMonths)

  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv" style={{}}>
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

          {allData2 === undefined || allData2.length == 0
            ? <center>
                <NoData></NoData>
              </center>
            : <div>
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
}

    </div>
  )
}

export default ReportingRate;