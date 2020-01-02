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

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ActualReports = () => {
  const [ouNames,
    setouNames] = useState([])
  const {graphData, ou, ouName, dataPresent} = useContext(ActualReportingExpected)
  const mydata = {
    labels: ouNames,
    datasets: graphData
  }

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
      }, 6000);

    })
    //alert(formattedOrgs)

    setTimeout(() => {
      console.log(ouNames)
    }, 3000);

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
      <div className="col-sm-4"></div>
      <br></br>

      <div className="col-sm-12">
        <h4>
          <center>Reporting Rates over time</center>
        </h4>
        <Spacer></Spacer>
      </div>
    
      {!dataPresent
        ? <Loading2></Loading2>
        : <div>
          {!showLine
            ? <Bar
                options={{
                responsive: true
              }}
                data={mydata}/>
            : <Line options={{
              responsive: true
            }} data={mydata}></Line>
}
        </div>
}
    </div>
  );
}

export default ActualReports;
