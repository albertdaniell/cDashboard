import React, {useContext, useState, useEffect, createContext} from 'react'
import constants from '../constants'

export const ActualReportingExpected = createContext();
const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ActualReportingExpectedProvider = (props) => {

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

  const getData = async() => {

    const myalldata1 = await fetch(`  analytics.json?dimension=dx:z2slLbjn7PM.EXPECTED_REPORTS;z2slLbjn7PM.ACTUAL_REPORTS_ON_TIME;z2slLbjn7PM.ACTUAL_REPORTS&dimension=ou:USER_ORGUNIT&filter=pe:LAST_MONTH&displayProperty=NAME&user=Fsw9jvRNAGL`, constants.FETCH_OPTIONS)
    const myalldata1json = await myalldata1.json()
    setallData1(await myalldata1json)
    setou(await myalldata1json.metaData.dimensions.ou)
    console.log(await myalldata1json)
    setdataElement(await myalldata1json.metaData.dimensions.dx)

  }

  const getData2 = async() => {

    const myalldata1 = await fetch(`  analytics/dataValueSet.json?dimension=dx:z2slLbjn7PM.EXPECTED_REPORTS;z2slLbjn7PM.ACTUAL_REPORTS_ON_TIME;z2slLbjn7PM.ACTUAL_REPORTS&dimension=ou:USER_ORGUNIT&dimension=pe:LAST_MONTH&displayProperty=NAME&user=Fsw9jvRNAGL`, constants.FETCH_OPTIONS)
    const myalldata1json = await myalldata1.json()
    console.log(await myalldata1json)
    setallData2(await myalldata1json.dataValues)

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
      }

      let filtered = allData2.filter((data) => {
        
        return data.dataElement === dataElementName 
        

      })
      
      .map(({value}) => {

        return value

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

     
      setdataPresent(true)

    
    

  })

  setGraphData(newds)

  }

  const getOrgNames = () => {
    let myou = []
    ou.forEach((orgUnitId, index) => {
      let ouName;
      
        fetch(`  organisationUnits/${orgUnitId}`, constants.FETCH_OPTIONS)
          .then(res => res.json())
          .then((result) => {
            ouName = result.displayName
            myou[index] = ouName
            // myou = [   ...myou,   result.displayName ]
            setouName([...myou])

          })
    

    })

  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    // alert(0)
    getData2()
  }, [allData1])

  useEffect(() => {
    makeGraphData()

  }, [allData2])

  useEffect(() => {
    getOrgNames()
  }, [allData2])

  return (
    <ActualReportingExpected.Provider
      value={{
      allData1,
      allData2,
      ou,
      graphData,
      dataElement,
      ouName,
      dataPresent
    }}>
      {props.children}

    </ActualReportingExpected.Provider>
  )

}

export default ActualReportingExpectedProvider;
