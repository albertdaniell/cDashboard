import React, {useContext, useState, useEffect} from 'react';

import {
  Line,
  Bar,
  Radar,
  Pie,
  Doughnut,
  Polar,
  Bubble
} from 'react-chartjs-2';
import ReceiptReportingRatesProvider, {ReceiptReportingRates} from '../../contexts/ReceiptReportingRates';
import Spacer from '../Spacer';
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths';
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import NoData from '../NoData';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ReceiptReportingGraph = () => {
  const {saveToPdf} = useContext(SaveToPdfContext)
  const [ouNames,
    setouNames] = useState([])

  const [formatedMonths,
    setMonths] = useState([])
  const {
    graphData,
    ou,
    ouName,
    dataPresent,
    pe,
    allData2,
    changeOrgAPI,
    ouAPI,
    defaultou
  } = useContext(ReceiptReportingRates)
  const mydata = {
    labels: formatedMonths,
    datasets: graphData
  }

  useEffect(() => {
    let formattedMonths = sortMonths(pe)
    setMonths(formattedMonths)
  }, [pe])

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

    let holdSortedOrgs = [...ou];
    let formattedOrgs = [];

    holdSortedOrgs.forEach((orgUnitId) => {
      let orgName;
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          orgName = result.displayName
          //  console.log("or name", orgName)
        })

      //formattedMonth = `${monthName} ${year}`
      setTimeout(() => {
        formattedOrgs = [
          ...formattedOrgs,
          orgName
        ];
        // console.log(formattedOrgs)
        setouNames(formattedOrgs)
      }, 0);

    })
    //alert(formattedOrgs)

    setTimeout(() => {
      console.log(ouNames)
    }, 0);

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

      <div className="col-sm-4">
        <ToggleGraphOptions
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
          <center># Reporting Rates over time for {formatedMonths.map((month) => {
              return (
                <span>{month},
                </span>
              )
            })}</center>
        </h4>
        <Spacer></Spacer>
      </div>

      {ouName.length === 0
        ? <Loading2></Loading2>
        : <div className="theGraph">
          {allData2.length === 0 || allData2 === "undefined"
            ? <center>
                <NoData></NoData>
              </center>
            : <div>
              {!showLine
                ? <Bar
                    options={{
                    animation: {
                      duration: 3000
                    },
                    responsive: true
                  }}
                    data={mydata}/>
                : <Line
                  options={{
                  animation: {
                    duration: 3000
                  },
                  responsive: true
                }}
                  data={mydata}></Line>
}
            </div>
}
        </div>
}
    </div>
  );
}

export default ReceiptReportingGraph;
