import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants'

export const ReportingRateReportingRateOnTime = createContext();

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

export const CommodityReportingRate = createContext();

const CommodityReportingRateProvider = (props) => {
  const [graphData,
    setGraphData] = useState([])

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

  const [dataPresent,
    setdataPresent] = useState(false)

  const [ouNames,
    setOuNames] = useState([])

  const getData = async() => {
    const allData = await fetch(`analytics.json?dimension=dx:zUdUMvPpY7S;PflRNbAv3hO;B9jXSyRn4RH;bHf4q8pPzFJ;YfVM' +
        'oUlquDz;VPuHdZpv4sJ;Bt8Nedvaaee;hGMiQ4teZXa;q33nlys1mqT;Nbo7dLam7WC;eGe4UZ0eK5W;' +
        'MsJfgHV4ez4;j8f50aOYx6H;mcgnywJOgh7;XdJbnISaGY1;OOoaCN5rIRd;JSU8L0xCkf4;pQc0IAdW' +
        'prU&dimension=pe:LAST_3_MONTHS&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw' +
        '9jvRNAGL`, constants.FETCH_OPTIONS);
    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    setPeriods(await allDatajson.metaData.dimensions.pe)
    setOu(await allDatajson.metaData.dimensions.ou)
    setDx(await allDatajson.metaData.dimensions.dx)
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]))
  }

  const getgraphData = () => {

    let graphData = [];
    let newds = [];
    dx.map((indi) => {
      let indicatorName = ""
      let indicatorid = indi;
      let aggData = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 255) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 255) + 1;
      var colorA = 0.80;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      fetch(`indicators/${indicatorid}`, constants.FETCH_OPTIONS)
        .then(res => res.json())
        .then((result) => {

          indicatorName = result.displayName
          console.log("indicator results,", result.displayName)

          let filtered = allData2.filter((data) => {
            // alert(data[0])
            return data[0] === indicatorid

          }).map((data) => {
            return data[2];
          })
          aggData = filtered
          console.log("agg data,", filtered)

          setTimeout(() => {

            let data = {
              data: aggData,
              label: indicatorName,
              backgroundColor: backgroundColor
            }

            newds = [
              ...newds,
              data
            ]

            setGraphData(newds)

            setTimeout(() => {
              setdataPresent(true)
            }, 200);
          }, 400);
        })
        .catch((e) => {
          console.log(e)
        })

    })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getgraphData()
  }, [allData2])

  return (
    <CommodityReportingRate.Provider
      value={{
      allData,
      allData2,
      dx,
      ou,
      periods,
      graphData,
      dataPresent
    }}>
      {props.children}
    </CommodityReportingRate.Provider>
  )
}

export default CommodityReportingRateProvider;