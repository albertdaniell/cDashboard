import React, {useContext, useState, useEffect, createContext} from 'react'
import constants from '../constants'

export const ReceiptReportingRates = createContext();
const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ReceiptReportingRatesProvider = (props) => {

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
  const [ou2,
    setou2] = useState([])
  const [ouName,
    setouName] = useState([])

  const [dataElement,
    setdataElement] = useState([])

  const [pe,
    setPeriod] = useState([])

    const [ouAPI,setouAPI]=useState('USER_ORGUNIT')
    const [defaultou,setdefaultou]=useState('USER_ORGUNIT')

  const changeOrgAPI=(ou)=>{
    //alert(ou)
    setouAPI(ou)

  }


  const getData = async() => {

    const myalldata1 = await fetch(`/api/analytics.json?dimension=dx:s4029egvhCv.ACTUAL_REPORTS;s4029egvhCv.EXPECTED_REPORTS;s4029egvhCv.ACTUAL_REPORTS_ON_TIME&dimension=pe:THIS_MONTH;LAST_MONTH&filter=ou:${ouAPI}&displayProperty=NAME&user=Fsw9jvRNAGL`)
    const myalldata1json = await myalldata1.json()
    setallData1(await myalldata1json)

  
    let myDataElements = [];
    let filteredDataElements = await myalldata1json
      .rows
      .map((d) => {
        return d[0]

      })

    myDataElements = filteredDataElements
    myDataElements = [...new Set(myDataElements)]

    
    setdataElement(myDataElements)
    setou2(await myalldata1json.metaData.dimensions.ou)
    setou(await myalldata1json.metaData.dimensions.ou)
   // console.log(await myalldata1json)
    // setdataElement(await myalldata1json.metaData.dimensions.dx) alert(await
    // myalldata1json.metaData.dimensions.dx)
    setPeriod(await myalldata1json.metaData.dimensions.pe)
    setallData2(await myalldata1json.rows)

  }

  const getData2 = async() => {

    const myalldata1 = await fetch(`/api/analytics.json?dimension=dx:z2slLbjn7PM.EXPECTED_REPORTS;z2slLbjn7PM.ACTUAL_REPORTS;z2slLbjn7PM.ACTUAL_REPORTS_ON_TIME;z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPORTING_RATE&dimension=ou:${ouAPI}&filter=pe:LAST_MONTH&displayProperty=NAME&user=Fsw9jvRNAGL&outputIdScheme=UID`)
    const myalldata1json = await myalldata1.json()
   // console.log(await myalldata1json)
    //  setallData2(await myalldata1json.dataValues)

  }

  const makeGraphData = () => {
    let newds = []

    let aggData = []
    let dataElementName2;

    let dataElementName3;

    dataElement.map((de) => {

      let dataElementName = de
      dataElementName3 = de;
      var colorR = Math.floor(Math.random() * 255) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 255) + 1;
      var colorA = 0.85;
      let backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`

      if (dataElementName === "s4029egvhCv.ACTUAL_REPORTS") {
        dataElementName2 = "Monthly CHV Receipt Actual Reports"
        backgroundColor=`rgba(175, 204, 42, .8)`
      } else if (dataElementName === "s4029egvhCv.ACTUAL_REPORTS_ON_TIME") {
        dataElementName2 = "Monthly  CHV Receipt Actual Reports on Time"
        backgroundColor=`rgba(200, 94, 108, .8)`
      } else if (dataElementName === "s4029egvhCv.EXPECTED_REPORTS") {
        dataElementName2 = "Monthly  CHV Receipt Expected Reports"
        backgroundColor=`rgba(64, 121, 208, .8)`
      } else if (dataElementName === "z2slLbjn7PM.REPORTING_RATE") {
        dataElementName2 = "Monthly CHV SOH Reporting Rate"
        backgroundColor=`rgba(241,103,186,.80)`
      } else if (dataElementName === "z2slLbjn7PM.REPORTING_RATE_ON_TIME") {
        dataElementName2 = "Monthly CHV SOH Reporting Rate on time"
        backgroundColor=`rgba(112,223,173,.8)`
      }

      let filtered = allData2.filter((data) => {

        return data[0] === dataElementName3

      }).map((value) => {

        return value[2]

      })

      aggData = filtered

      var data = {
        data: aggData,
        label: dataElementName2,
        backgroundColor: backgroundColor
      }

      newds = [
        ...newds,
        data
      ]


      newds=newds.slice().sort((a, b) =>{
        if(a.label.toLowerCase() < b.label.toLowerCase()) return -1;
        if(a.label.toLowerCase() > b.label.toLowerCase()) return 1;
        return 0;
       })


    })

    setGraphData([...newds])

  }

  const getOrgNames = () => {
    let myou = []
    let ouArray = ou.forEach((orgUnitId, index) => {
      let ouName;

      fetch(`/api/organisationUnits/${orgUnitId}`)
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
    setTimeout(() => {
      setdataPresent(true)
    }, 3000);
  }, [graphData])

  useEffect(() => {
    getData()
  }, [ouAPI])

  useEffect(() => {
    // alert(0)
    getData2()
  }, [allData1])

  useEffect(() => {
    makeGraphData()

  }, [allData2])

  useEffect(() => {
    getOrgNames()
  }, [ou])

  return (
    <ReceiptReportingRates.Provider
      value={{
      allData1,
      allData2,
      ou,
      graphData,
      dataElement,
      ouName,
      dataPresent,
      pe,
      ou2,
      changeOrgAPI,
      ouAPI,
      defaultou
    }}>
      {props.children}

    </ReceiptReportingRates.Provider>
  )

}

export default ReceiptReportingRatesProvider;
