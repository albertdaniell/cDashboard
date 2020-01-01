import React, {useState, createContext, useEffect} from 'react'
import constants from '../constants'

export const ChvReportingRateContext = createContext();

const ChvReportingRateContextProvider = (props) => {

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
  const url = `${constants.MY_PROXY}analytics?dimension=dx:z2slLbjn7PM.REPORTING_RATE&dimension=ou:USER_ORGUNIT&dimension=pe:LAST_12_MONTHS&displayProperty=NAME&`
  const orgUniturl = `organisationUnits`
  const getData = async() => {
  
    const allData = await fetch(url);
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
    setrowData(await sortedrowData)
    setOrgUnit(await myorgUnits)
    //Test();
    setTimeout(() => {}, 5000);
    setPeriods(await myperiods);

    // console.log("All Metadata:",allMetaData) console.log(setmydata)
    // console.log(await allData2)
  }

  const getOUNames = () => {
    console.log("orgUnits", orgUnits)
    console.log("rowData", rowData)
    var newds = [];
    orgUnits.map((id) => {
      let aggData = [];
      var myds = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 255) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 255) + 1;
      var colorA = 0.85;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      let orgUnitId = id
      var orgUnitName = "";
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          orgUnitName = result.displayName
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
          setTimeout(() => {
            setTimeout(() => {
          
              console.log("gdata", newds)
              setGraphData(newds)
              setTimeout(() => {
                setDataPresent(true)
              }, 1000);
    
            }, 400);
    
          }, 400);

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

  }, [])

  
  useEffect(() => {
    // getOUNames();
    const mygraphdata = getOUNames()
    console.log(mygraphdata)

    // setGraphData([...graphData,mygraphdata])

    console.log("graph data.....", graphData)
  }, [periods])

  // useEffect(() => {
  //   console.log("The data changed", graphData)
  //   //setDataPresent(false)
  // }, [graphData])

  return (
    <ChvReportingRateContext.Provider
      value={{
      allMetaData,
      periods,
      graphData,
      dataName,
      isData,
      rowData
    }}>
      {props.children}
    </ChvReportingRateContext.Provider>
  )

}

export default ChvReportingRateContextProvider;