import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants'

export const ReportingRateReportingRateOnTime = createContext();

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const ReportingRateReportingRateOnTimeProvider = (props) => {

  const [periodAPI,
    setPeriodApi] = useState('LAST_3_MONTHS')
  const [graphData,
    setGraphData] = useState([])
  const [RROntimedataPresent,
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

    const changePeriodAPI = (pe) => {

      setPeriodApi(pe)
    }

  const getData = async() => {
    setdataPresent(false)
    const allData = await fetch(`  analytics.json?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPORTING_RATE&dimension=pe:${periodAPI}&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`, constants.FETCH_OPTIONS);

    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    setPeriods(await allDatajson.metaData.dimensions.pe)
    setOu(await allDatajson.metaData.dimensions.ou)
    setDx(await allDatajson.metaData.dimensions.dx)
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]))

  }

  const getOuNames = () => {
    let myounames = []
    ou.forEach((id, index) => {
      let orgName;
      let orgUnitId = id
      fetch(`organisationUnits/${orgUnitId}`, constants.FETCH_OPTIONS)
        .then(res => res.json())
        .then((result) => {
          //alert(myounames)
          orgName = result.displayName
          // myounames = [   ...myounames,   result.displayName ]

          myounames[index] = orgName;
          setOuNames([...myounames])
        })
        .catch((e) => {
          console.log(e)
        })

    })

  }
  const getData2 = async() => {
    const allData = await fetch(`analytics/dataValueSet?dimension=dx:z2slLbjn7PM.REPORTING_RATE_ON_TIME;z2slLbjn7PM.REPORTING_RATE&dimension=pe:THIS_MONTH;LAST_6_MONTHS&dimension=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`, constants.FETCH_OPTIONS);
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
  }, [periodAPI])

  useEffect(() => {

    getData2()

  }, [allData])

  useEffect(() => {

    getOuNames()

  }, [ou])

  useEffect(() => {

    // getData2()
    getOuNames()

  }, [ou])

  useEffect(() => {
    setTimeout(() => {
      makdeGraphData()
    }, 1000);
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
      RROntimedataPresent,
      changePeriodAPI,
      periodAPI
    }}>
      {props.children}
    </ReportingRateReportingRateOnTime.Provider>
  )

}

export default ReportingRateReportingRateOnTimeProvider;