import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, HorizontalBar} from 'react-chartjs-2';
import Spacer from '../Spacer'
import {ReportingRateReportingRateOnTime} from '../../contexts/ReportingRateReportingOnTime';
import Loading from '../Loading';
import Loading2 from '../Loading2';
import {ReceiptReportReportOntime} from '../../contexts/ReceiptReportReportOntime';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import {SaveToPdfContext} from '../../contexts/SaveToPdfContext';
import OrgsComponent from '../OrgsComponent';
import ToggleGraphOptions from '../ToggleGraphOptions';
import NoData from '../NoData';
import PeriodsComponent from '../PeriodsComponent';

const ReceiptRRateOnTimeGraph = () => {
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
  } = useContext(ReceiptReportReportOntime)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  const tableHeaders=graphData.map((th)=>{
    return(
      <th>{th.label}</th>
    )
  })


  const tableData2=graphData.map((th)=>{
    return(
  <span>
      <td>{th.data[0]}</td>
    <td>{th.data[1]}</td>
  </span>
    )
  })

  const tableData=sortedMonths.map((month)=>{
    return(
    
     
       <tr>
            <td>
{month}
          
        </td>
       {tableData2}
       </tr>
       
     
        

     
    )
  })
//console.log(graphData.length+1)
  const tableOrgUnits=ouNames.map((ou)=>{
    return(
     
      <tbody>
          <tr>
        <td rowSpan={sortedMonths.length + 1 }>
{ou}
        </td>
    
      </tr>
      {tableData}
      </tbody>
      
    )
  })


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
          <center>
            % Monthly CHV Receipt Reporting Rates over time for {ouNames.map((ou) => {
              return (
                <span>{ou}
                  ,</span>
              )
            })}
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

export default ReceiptRRateOnTimeGraph;
