import React, {useContext, useState, useEffect, createContext} from 'react'

import constants from '../constants'

export const CHVRRateFacility = createContext();

const CHVRRateFacilityProvider = (props) => {
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

  const [ouName,
    setouName] = useState([])

  const [dataElement,
    setdataElement] = useState([])

  const getAllData = async() => {

    const myalldata1 = await fetch(`analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPORTING_RATE&dimension=ou:LEVEL-4;JNvqpOnKfGR&filter=pe:LAST_MONTH&displayProperty=NAME&outputIdScheme=UID`, constants.FETCH_OPTIONS)
    const myalldata1json = await myalldata1.json()
    setallData1(await myalldata1json)
    setou(await myalldata1json.metaData.dimensions.ou)
    console.log(await myalldata1json)
    setdataElement(await myalldata1json.metaData.dimensions.dx)

  }

  const getOuNames = () => {
    let ounames = []
    //
    ou.forEach((ouid, index) => {
      let orgName;

      fetch(`organisationUnits/${ouid}`, constants.FETCH_OPTIONS)
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
      }

      else if(dataElementName === "z2slLbjn7PM.REPORTING_RATE_ON_TIME"){
        dataElementName2 = "CHV Reporting Rate on Time"
      }

      let filtered = allData1.rows.filter((data) => {
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

      setGraphData(newds)
      setdataPresent(true)

    })

  }

  useEffect(() => {
    getAllData();
  }, [])

  useEffect(() => {
    makeGraphData()

  }, [dataElement])

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
      dataPresent
    }}>
      {props.children}</CHVRRateFacility.Provider>
  )

}

export default CHVRRateFacilityProvider;