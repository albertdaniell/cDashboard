import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants'

export const ReportingRateReportingRateOnTime = createContext();

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ReportingRateReportingRateOnTimeProvider = (props) => {
  const [graphData,
    setGraphData] = useState([])
    const [dataPresent,
      setdataPresent] = useState(false)
  const [allData,
    setAllData] = useState([]);

  const [allData2,
    setAllData2] = useState([]);
  const [periods,
    setPeriods] = useState([])
  const [ou,
    setOu] = useState([])
  const [dx,
    setDx] = useState([])

  const [ouNames,
    setOuNames] = useState([])

  const getData = async() => {
    const allData = await fetch(`${constants.MY_PROXY}analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPOR' +
        'TING_RATE&dimension=pe:LAST_6_MONTHS&filter=ou:USER_ORGUNIT&displayProperty=NAME' +
        '&user=Fsw9jvRNAGL`);
    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    setPeriods(await allDatajson.metaData.dimensions.pe)
    setOu(await allDatajson.metaData.dimensions.ou)
    setDx(await allDatajson.metaData.dimensions.dx)
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]))
    
  }

  const getOuNames = () => {
    let myounames = []
    ou.map((id) => {
      let orgUnitId = id
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          //alert(myounames)
          myounames = [
            ...myounames,
            result.displayName
          ]
          setOuNames(myounames)
        })
        .catch((e) => {
          console.log(e)
        })

    })

  }
  const getData2 = async() => {
    const allData = await fetch('analytics/dataValueSet?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7' +
        'PM.REPORTING_RATE&dimension=pe:LAST_6_MONTHS&dimension=ou:USER_ORGUNIT&displayPr' +
        'operty=NAME&user=Fsw9jvRNAGL');
    const allDatajson = await allData.json();

    // setAllData2(await allDatajson.dataValues.slice().sort((a, b) => a.period -
    // b.period));
    console.log("this is data2", await allDatajson)
    const sortedrowData = await allDatajson.dataValues
    // .slice() .sort((a, b) => a[2] - b[2]) setAllData2(await sortedrowData)
    // setPeriods(await allDatajson.metaData.dimensions.pe) setOu(await
    // allDatajson.metaData.dimensions.ou) setDx(await
    // allDatajson.metaData.dimensions.dx)
  }

  const makdeGraphData = () => {
    // ou.forEach((orgid) => {   let orgUnitId = orgid   let orgUnitName;
    // fetch(`organisationUnits/${orgUnitId}`)     .then(res => res.json())
    // .then((result) => {       orgUnitName = result.displayName alert(orgUnitName)
    //     }) })

    let graphData = [];
    let newds = [];
    dx.map((dxvalue) => {
      let dataElement;
      let aggData = [];

      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 255) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 255) + 1;
      var colorA = 0.80;

      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;
      if (dxvalue === "z2slLbjn7PM.REPORTING_RATE_ON_TIME") {
        dataElement = "CHV Reporting Rate on time"
      } else if (dxvalue === "z2slLbjn7PM.REPORTING_RATE") {
        dataElement = "CHV Reporting Rate"

      }

      let filtered = allData2
        .slice()
        .sort((a, b) => a.period - b.period)
        .filter((data) => {
          return data[0] === dxvalue

        })
        .map((data) => {
          return data[2];
        })

      aggData = filtered

      let data = {
        data: aggData,
        label: dataElement,
        backgroundColor: backgroundColor
      }

      newds = [
        ...newds,
        data
      ]

      setGraphData(newds)
      setdataPresent(true)
      // allData2.forEach((data)=>{ })
      console.log(dataElement)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {

    getData2()
    getOuNames()

  }, [allData])

  useEffect(() => {

    // getData2()
    getOuNames()

  }, [ou])

  useEffect(() => {
    setTimeout(() => {
      makdeGraphData()
    }, 2000);
  }, [allData2, dx, ou])

  return (
    <ReportingRateReportingRateOnTime.Provider
      value={{
      ou,
      dx,
      allData,
      allData2,
      graphData,
      periods,
      ouNames,
      dataPresent
    }}>
      {props.children}
    </ReportingRateReportingRateOnTime.Provider>
  )

}

export default ReportingRateReportingRateOnTimeProvider;