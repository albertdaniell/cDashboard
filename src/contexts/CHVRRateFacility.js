import React, {useContext, useState, useEffect, createContext} from 'react'

import constants from '../constants'

export const CHVRRateFacility = createContext();

const CHVRRateFacilityProvider = (props) => {

  const [periodAPI,
    setPeriodApi] = useState('LAST_MONTH')
  const [allData1,
    setallData1] = useState([])
  const [allData2,
    setallData2] = useState([])
  const [graphData,
    setGraphData] = useState([])
  const [dataPresent,
    setdataPresent] = useState(false)
  const [ou,
    setou] = useState([])
  const [periods,
    setPeriods] = useState([])

  const [ouName,
    setouName] = useState([])

  const [dataElement,
    setdataElement] = useState([])

  const [ouLevel,
    setouLevel] = useState('LEVEL-4')

  const [ouID,
    setOuID] = useState('JNvqpOnKfGR')

  const getAllData = async() => {
    setdataPresent(false)
    const url2 = `/api/analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE;s4029egvhCv.REPORTING_RATE_ON_TIME&dimension=ou:${ouLevel};${ouID}&filter=pe:${periodAPI}&displayProperty=NAME`;
    const myalldata1 = await fetch(`/api/analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPORTING_RATE&dimension=ou:LEVEL-4;${ouID}&filter=pe:${periodAPI}&displayProperty=NAME&outputIdScheme=UID`)
    const myalldata1json = await myalldata1.json()
    setallData1(await myalldata1json)
    let myou = [];

    let filtered = await myalldata1json
      .rows
      .map((d) => {
        return d[1]

      })

    myou = filtered
    setou(myou)
    //setou(await myalldata1json.rows[1]) console.log(await myalldata1json)
    setdataElement(await myalldata1json.metaData.dimensions.dx)
    setPeriods(await myalldata1json.metaData.dimensions.pe);
    setallData2(await myalldata1json.rows.slice().sort((a, b) => a[4] - b[4]))

  }

  const changePeriodAPI = (pe) => {

    setPeriodApi(pe)
  }

  const getOuNames = () => {
    let ounames = []
    //
    ou.forEach((ouid, index) => {
      let orgName;

      fetch(`/api/organisationUnits/${ouid}`)
        .then(res => res.json())
        .then((result) => {

          orgName = result.displayName;
          // alert(orgName)
          ounames[index] = orgName;

          setouName([...ounames])

        })
    })

  }

  const makeGraphData = () => {
    let newds = []
    dataElement.map((de) => {

      let aggData = []

      let dataElementName = de
      let dataElementName2 = de
      if (dataElementName === "z2slLbjn7PM.ACTUAL_REPORTS") {
        dataElementName2 = "CHV Actual Reports"
      } else if (dataElementName === "z2slLbjn7PM.ACTUAL_REPORTS_ON_TIME") {
        dataElementName2 = "CHV Actual Reports on Time"
      } else if (dataElementName === "z2slLbjn7PM.EXPECTED_REPORTS") {
        dataElementName2 = "CHV Expected Reports"
      } else if (dataElementName === "z2slLbjn7PM.REPORTING_RATE") {
        dataElementName2 = "CHV Reporting Rate"
      } else if (dataElementName === "z2slLbjn7PM.REPORTING_RATE_ON_TIME") {
        dataElementName2 = "CHV Reporting Rate on Time"
      }

      let filtered = allData2.filter((data) => {
        return data[0] === dataElementName

      }).map((data) => {

        return data[2]

      })

      aggData = filtered

      var colorR = Math.floor(Math.random() * 255) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 255) + 1;
      var colorA = 0.85;
      var data = {
        data: aggData,
        label: dataElementName2,
        backgroundColor: `rgba(${colorR},${colorG},${colorB},${colorA})`
      }

      newds = [
        ...newds,
        data
      ]

      newds = newds
        .slice()
        .sort((a, b) => {
          if (a.label.toLowerCase() < b.label.toLowerCase()) 
            return -1;
          if (a.label.toLowerCase() > b.label.toLowerCase()) 
            return 1;
          return 0;
        })

      setGraphData(newds)
      setdataPresent(true)

    })

  }

  useEffect(() => {
    getAllData();
  }, [periodAPI])

  useEffect(() => {
    makeGraphData()

  }, [allData2])

  useEffect(() => {
    getOuNames();
  }, [ou])
  return (
    <CHVRRateFacility.Provider
      value={{
      allData1,
      ou,
      ouName,
      dataElement,
      graphData,
      dataPresent,
      allData2,
      periods,
      periodAPI,
      changePeriodAPI
    }}>
      {props.children}</CHVRRateFacility.Provider>
  )

}

export default CHVRRateFacilityProvider;