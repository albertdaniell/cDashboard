import React, {useContext, useState, useEffect} from 'react';

import {
  Line,
  Bar,
  Radar,
  Pie,
  Doughnut,
  Polar,
  Bubble,
  HorizontalBar
} from 'react-chartjs-2';
import Spacer from '../Spacer';
import Loading2 from '../Loading2';
import { CHVRRateFacility } from '../../contexts/CHVRRateFacility';


const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const CHVRRateFacGraph = () => {
  const [ouNames,
    setouNames] = useState([])
  const {graphData, ou, ouName, dataPresent} = useContext(CHVRRateFacility)
  const mydata = {
    labels: ouName,
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
      position: 'relative'
    }}>
      <button
        className="btn btn-default btn-sm"
        onClick={() => setShowLine(!showLine)}>Toggle Line/Bar</button>
      <h4>
        <center>Reporting Rates over time</center>
      </h4>
      <Spacer></Spacer>
      {!dataPresent
        ? <Loading2></Loading2>
        : <div>
          {!showLine
            ? <HorizontalBar
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

export default CHVRRateFacGraph;
