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
import {CHVRRateFacility} from '../../contexts/CHVRRateFacility';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const CHVRRateFacGraph = () => {
  const {saveToPdf}=useContext(SaveToPdfContext)
  const [sortedMonths,
    setMonths] = useState([])
  const [ouNames,
    setouNames] = useState([])
  const {graphData, ou, ouName, dataPresent,periods,periodAPI,changePeriodAPI} = useContext(CHVRRateFacility)
  const mydata = {
    labels: ouName,
    datasets: graphData
  }

  const [showLine,
    setShowLine] = useState(false)


  useEffect(() => {

    let formattedMonths= sortMonths(periods)
    setMonths(formattedMonths)
  }, [graphData])
  useEffect(() => {

    let holdSortedOrgs = [...ou];
    let formattedOrgs = [];

    holdSortedOrgs.forEach((orgUnitId) => {
      let orgName;
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          orgName = result.displayName
         // console.log("or name", orgName)
        })

      //formattedMonth = `${monthName} ${year}`
      setTimeout(() => {
        formattedOrgs = [
          ...formattedOrgs,
          orgName
        ];
        //console.log(formattedOrgs)
        setouNames(formattedOrgs)
      }, 6000);

    })
    //alert(formattedOrgs)

    setTimeout(() => {
      //console.log(ouNames)
    }, 3000);

  }, [graphData])
  return (
    <div className="col-sm-12 graphDiv" style={{
    
    }}>
      <div className="col-sm-2">
        <button
          className="btn btn-default btn-sm"
          onClick={() => setShowLine(!showLine)}>{showLine
            ? <i class="fas fa-chart-line fa-2x isLine"></i>
            : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>

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
<center>Reporting Rates over time for {sortedMonths.map((pe)=>{return(<span> {pe} ,</span>)})}</center>
        </h4>
        <Spacer></Spacer>
      </div>

      {!dataPresent
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

export default CHVRRateFacGraph;
