import React, {useState, createContext, useEffect, useContext} from 'react'
import constants from '../constants'

export const ChvReportingRateContext = createContext();

const ChvReportingRateContextProvider = (props) => {
  const [periodAPI,
    setPeriodApi] = useState('LAST_12_MONTHS')

  const [showLoading,
    setshowLoading] = useState(true)

  const [dataName,
    setdataName] = useState('CHV Reporting rate for the past 12 months')
  const [allMetaData,
    setData] = useState([])
  const [periods,
    setPeriods] = useState([])
  const [orgUnits,
    setOrgUnit] = useState([])

  const [orgUnitsNames,
    setOrgUnitName] = useState([])

  const [rowData,
    setrowData] = useState([])

  const [graphData,
    setGraphData] = useState([])

  const [isData,
    setDataPresent] = useState(false)

  // end of states

  const changePeriodAPI = (pe) => {

    setPeriodApi(pe)
  }
  const url = `  analytics?dimension=dx:z2slLbjn7PM.REPORTING_RATE&dimension=ou:USER_ORGUNIT&dimension=pe:${periodAPI}&displayProperty=NAME&`
  const orgUniturl = `organisationUnits`
  const getData = async() => {
    setDataPresent(false)

    const allData = await fetch(url, constants.FETCH_OPTIONS);
    const allData2 = await allData.json();
    const setmydata = setData([
      ...allMetaData,
      await allData2
    ]);
    const myperiods = await allData2.metaData.dimensions.pe
    const myorgUnits = await allData2.metaData.dimensions.ou
    const myrowData = await allData2.rows

    //console.log("rowData",await myrowData[2])
    const sortedrowData = await myrowData
      .slice()
      .sort((a, b) => a[2] - b[2])
    setrowData(await sortedrowData.slice().sort((a, b) => a[1] - b[1]))
    setOrgUnit(await myorgUnits)
    //Test();

    setPeriods(await myperiods);

    // console.log("All Metadata:",allMetaData) console.log(setmydata)
    // console.log(await allData2)
  }

  const getOUNames = () => {
    console.log("orgUnits", orgUnits)
    console.log("rowData", rowData)
    var newds = [];
    orgUnits.forEach((id,index) => {
      let aggData = [];
      var myds = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 225) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 205) + 1;
      var colorA = 0.85;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      let orgUnitId = id
      var orgUnitName = "";
      fetch(`  organisationUnits/${orgUnitId}`, constants.FETCH_OPTIONS)
        .then(res => res.json())
        .then((result) => {
          orgUnitName= result.displayName
          console.log(orgUnitName)

          let filtered = rowData
            .slice()
            .sort((a, b) => a[2] - b[2])
            .filter((data) => {
              return data[1] === orgUnitId

            })
            .map((data) => {
              return data[3];
            })
          aggData = filtered

          let data = {
            data: aggData,
            orgUnitId: orgUnitId,
            label: orgUnitName,
            backgroundColor: backgroundColor
          }

          newds = [
            ...newds,
            data
          ]

          console.log("gdata", newds)
          setGraphData(newds)

          setTimeout(() => {
            setDataPresent(true)
            setshowLoading(false)
          }, 3000);

          //console.log(myds)

        })

      console.log(newds)
      //setGraphData([newds])
      return newds

    })

  }

  const Test = () => {
    // alert(0)
  }

  useEffect(() => {
    console.log("haahha")
    getData();

  }, [periodAPI])

  useEffect(() => {
    // getOUNames();
    const mygraphdata = getOUNames()
    console.log(mygraphdata)

    // setGraphData([...graphData,mygraphdata])

    console.log("graph data.....", graphData)
  }, [periods])

  // useEffect(() => {   console.log("The data changed", graphData)
  // //setDataPresent(false) }, [graphData])

  return (
    <ChvReportingRateContext.Provider
      value={{
      allMetaData,
      periods,
      graphData,
      dataName,
      isData,
      rowData,
      changePeriodAPI,
      showLoading,
      setshowLoading
    }}>
      {props.children}
    </ChvReportingRateContext.Provider>
  )

}

export default ChvReportingRateContextProvider;