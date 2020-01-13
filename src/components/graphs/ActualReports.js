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
import ActualReportingExpectedProvider, {ActualReportingExpected} from '../../contexts/ActualReportingExpected';
import Spacer from '../Spacer';
import Loading2 from '../Loading2';
import sortMonths from '../../constants/sortMonths';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ActualReports = () => {
  const {saveToPdf}=useContext(SaveToPdfContext)
  const [ouNames,
    setouNames] = useState([])

    const [formatedMonths,setMonths]=useState([])
  const {graphData, ou, ouName, dataPresent,pe} = useContext(ActualReportingExpected)
  const mydata = {
    labels: ouName,
    datasets: graphData
  }

  useEffect(()=>{

    let formattedMonths= sortMonths(pe)
    setMonths(formattedMonths)
  },[pe])



  const [showLine,
    setShowLine] = useState(false)

  useEffect(() => {

    let holdSortedOrgs = [...ou];
    let formattedOrgs = [];

    holdSortedOrgs.forEach((orgUnitId) => {
      let orgName;
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          orgName = result.displayName
          console.log("or name", orgName)
        })

      //formattedMonth = `${monthName} ${year}`
      setTimeout(() => {
        formattedOrgs = [
          ...formattedOrgs,
          orgName
        ];
        console.log(formattedOrgs)
        setouNames(formattedOrgs)
      }, 0);

    })
    //alert(formattedOrgs)

    setTimeout(() => {
      console.log(ouNames)
    }, 0);

  }, [graphData])
  return (
    <div className="col-sm-12 graphDiv" style={{
     
    }}>
      <div className="col-sm-4">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowLine(!showLine)}>Toggle Line/Bar {showLine
            ? <i class="fas fa-chart-line fa-2x isLine"></i>
            : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>

      </div>
      <div className="col-sm-4"></div>
      <div className="col-sm-4">
     
      {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}
      
      </div>
      <br></br>

      <div className="col-sm-12">
        <h4>
<center>Reporting Rates over time for {formatedMonths}</center>
        </h4>
        <Spacer></Spacer>
      </div>
    
      {ouName.length === 0
        ? <Loading2></Loading2>
        : <div className="theGraph">
          {!showLine
            ? <Bar
                options={{
                  animation: {
                    duration: 3000 // general animation time
                },
                responsive: true
              }}
                data={mydata}/>
            : <Line options={{
              animation: {
                duration: 3000 // general animation time
            },
              responsive: true
            }} data={mydata}></Line>
}
        </div>
}
    </div>
  );
}

export default ActualReports;
