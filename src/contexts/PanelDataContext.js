import React, {useContext, createContext, useState, useReducer, useEffect} from 'react'
import constants from '../constants'

export const PanelDataContext = createContext()

const PanelDataContextProvider = (props) => {

  const [chvReportingRate,
    setchvReportingRate] = useState('')

  const [chvActualRRateOnTime,
    setchvActualRRateOnTime] = useState('')

  const [commodityDispensed,
    setcommodityDispensed] = useState('')

  const [SOHActualReporting,
    setSOHActualReporting] = useState('');
  const getData1 = async() => {
    const allData = await fetch(`/api/analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME&dimension=pe:THIS_MONTH&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`)
    const allDatajson = await allData.json()
    const chvReportingRateData = await allDatajson.rows
    let filteredData = await chvReportingRateData.map((data) => {
      return data[2]
    })

    setchvReportingRate(filteredData)
  }

  const getData2 = async() => {
    const allData = await fetch(`/api/analytics.json?dimension=dx:s4029egvhCv.ACTUAL_REPORTS_ON_TIME&dimension=pe:THIS_MONTH&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`)
    const allDatajson = await allData.json()
    const chvActualRRateOnTimeData = await allDatajson.rows
    let filteredData = await chvActualRRateOnTimeData.map((data) => {
      return data[2]
    })

    setchvActualRRateOnTime(filteredData)
  }

  const getData3 = async() => {
    const allData = await fetch(`/api/analytics.json?dimension=dx:ozYIEpvgLnb.ACTUAL_REPORTS_ON_TIME&dimension=pe:THIS_MONTH&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`)
    const allDatajson = await allData.json()
    const commodityDispensedData = await allDatajson.rows
    let filteredData = await commodityDispensedData.map((data) => {
      return data[2]
    })

    setcommodityDispensed(filteredData)
  }

  const getData4 = async() => {
    const allData = await fetch(`/api/analytics.json?dimension=dx:z2slLbjn7PM.ACTUAL_REPORTS_ON_TIME&dimension=pe:THIS_MONTH&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`)
    const allDatajson = await allData.json()
    const SOHActualReportingData = await allDatajson.rows
    let filteredData = await SOHActualReportingData.map((data) => {
      return data[2]
    })

    setSOHActualReporting(filteredData)
  }

  useEffect(() => {
    getData1()
    getData2()
    getData3()
    getData4()
  }, [])

  return (
    <PanelDataContext.Provider
      value={{
      chvReportingRate,
      chvActualRRateOnTime,
      commodityDispensed,
      SOHActualReporting
    }}>
      {props.children}
    </PanelDataContext.Provider>
  )
}

export default PanelDataContextProvider;