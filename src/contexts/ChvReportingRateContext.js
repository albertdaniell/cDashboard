import React, {useState, createContext, useEffect} from 'react'

export const ChvReportingRateContext = createContext();

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

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
  const url = `analytics?dimension=dx:z2slLbjn7PM.REPORTING_RATE&dimension=ou:USER_ORGUNIT&dimension=pe:LAST_12_MONTHS&displayProperty=NAME&`
  const orgUniturl = `organisationUnits`
  const getData = async() => {
    setDataPresent(false)
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
      var myds = [];

      let orgUnitId = id
      var orgUnitName = "";
      fetch(`organisationUnits/${orgUnitId}`)
        .then(res => res.json())
        .then((result) => {
          orgUnitName = result.displayName
          console.log(orgUnitName)
          rowData.forEach((data) => {
            if (data[1] === orgUnitId) {

              myds = [
                ...myds,
                data[3]
              ]
              // console.log("data for org unit", orgUnitName,"is ", data[3])
            }

          })
          //console.log(myds)

        })
      setTimeout(() => {
        setTimeout(() => {
          var colorR = Math.floor(Math.random() * 255) + 1;
          var colorG = Math.floor(Math.random() * 255) + 1;
          var colorB = Math.floor(Math.random() * 255) + 1;
          var colorA = 0.85;

          var data = {
            data: myds,
            orgUnitId: orgUnitId,
            label: orgUnitName,
            backgroundColor: `rgba(${colorR},${colorG},${colorB},${colorA})`

          }

          newds = [
            ...newds,
            data
          ]

          console.log("gdata", newds)
          setGraphData(newds)
          setTimeout(() => {
            setDataPresent(true)
          }, 2000);

        }, 3000);

      }, 3000);
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
setDataPresent(false)
  }, [graphData])

  useEffect(() => {
    // getOUNames();
    const mygraphdata = getOUNames()
    console.log(mygraphdata)

    // setGraphData([...graphData,mygraphdata])

    console.log("graph data.....", graphData)
  }, [periods])

  useEffect(() => {
    console.log("The data changed", graphData)
    setDataPresent(false)
  }, [graphData])

  return (
    <ChvReportingRateContext.Provider
      value={{
      allMetaData,
      periods,
      graphData,
      dataName,
      isData
    }}>
      {props.children}
    </ChvReportingRateContext.Provider>
  )

}

export default ChvReportingRateContextProvider;