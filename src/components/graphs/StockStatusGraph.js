import React, {useState, useContext, useEffect} from 'react'
import {useSpring, animated} from 'react-spring'
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
import {StockStatus} from '../../contexts/StockStatus';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import SavePdfImage from '../SavePdfImage';
import NoData from '../NoData';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';

export default function CommodityRRate() {
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
    ouNames,
    changeOrgAPI,
    allData2,
    ouAPI,
    defaultou
  } = useContext(StockStatus)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  useEffect(() => {
    let formattedMonths = sortMonths(periods)
    setMonths(formattedMonths)
  }, [graphData])
  const [myopacity,
    setOpacity] = useState(0)
  const props = useSpring({
    opacity: myopacity,
    from: {
      opacity: 0
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 100);
  }, [])

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

  return (

    <animated.div className="col-sm-12 graphDiv" style={props}>
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

      <div className="col-sm-4"></div>
      <br></br>

      <div className="col-sm-12">
        <h4>
          <center>#Stock Status {ouNames.length === 0 || ouNames === undefined
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
        <div className="theGraph">
          {allData.rows === undefined || allData.rows.length == 0
            ? <center>
                <NoData></NoData>
              </center>
            : !dataPresent || sortedMonths === undefined || sortedMonths.length === 0
              ? <Loading2></Loading2>
              : <div>
                {allData2.length === 0 || allData2 === "undefined"
                  ? <center>
                      <NoData></NoData>
                    </center>
                  : <div>

                    <Bar
                      options={{
                      responsive: true
                    }}
                      data={mydata}/>
                  </div>
}
              </div>
}
        </div>
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </animated.div>
  )
}
