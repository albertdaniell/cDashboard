import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants'

export const StockStatus = createContext();

const StockStatusProvider = (props) => {

  const [periodAPI,
    setPeriodApi] = useState('LAST_3_MONTHS')

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

  const [pe,
    setPeriod] = useState([])
  const [ouAPI,
    setouAPI] = useState('USER_ORGUNIT')
  const [defaultou,
    setdefaultou] = useState('USER_ORGUNIT')

  const changeOrgAPI = (ou) => {
    //alert(ou)
    setouAPI(ou)

  }

  const getData = async() => {
    setdataPresent(false)
    const allData = await fetch(`/api/analytics.json?dimension=dx:IYVjjC42J0C;UriZTcAqQhS;Da2hUTlhuev;tlLJoasHsnx;KU1G' +
        'dTyABV1;BnNTJQvpssM;GAWSnGyeBEp;hPRee4vfcHk;IpzMGXo8pSm;m72B7CKg78l;SrscdcMTFzi;MfIPOuz50f6;ObK4JLoDLNy;sHsyHc1kmIU;vHL3aYvAkhb;iH9jNGP7dQu;P0Cy5mBXijV;N8OFIqhmBjU&dimension=pe:${periodAPI}&filter=ou:${ouAPI}&displayProperty=NAME&user=Fsw9jvRNAGL`);
    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    //setPeriods(await allDatajson.metaData.dimensions.pe);

    let myPeriods = [];
    let filteredPeriods = await allDatajson
      .metaData
      .dimensions
      .pe
      .slice()
      .sort((a, b) => a - b)
      .map((d) => {
        return d

      })

    myPeriods = filteredPeriods
    myPeriods = [...new Set(myPeriods)]

    setPeriods(myPeriods)
    //setdataElement(myDataElements)

    setOu(await allDatajson.metaData.dimensions.ou);
    setDx(await allDatajson.metaData.dimensions.dx);
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]));
  }

  const changePeriodAPI = (pe) => {

    setPeriodApi(pe)
  }

  const getOuNames = () => {
    let myounames = []
    ou.forEach((id, index) => {
      let orgName;
      let orgUnitId = id
      fetch(`/api/organisationUnits/${orgUnitId}`)
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

  const getgraphData = () => {

    let graphData = [];
    let newds = [];
    dx.map((indi, index) => {
      let indicatorName = ""
      let inidcatorsList = []
      let indicatorid = indi;
      let aggData = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 225) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 205) + 1;
      var colorA = 0.80;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      fetch(`/api/dataElements/${indicatorid}`)
        .then(res => res.json())
        .then((result) => {

          indicatorName = result.displayName
          // inidcatorsList[index] = indicatorName;  console.log("indicator results,",
          // result.displayName)

          let filtered = allData2.filter((data) => {
            // alert(data[0])
            return data[0] === indicatorid

          }).map((data) => {
            return data[2];
          })
          aggData = filtered
          // console.log("agg data,", filtered)

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

            setTimeout(() => {
              setdataPresent(true)
            }, 200);
          }, 400);
        })
        .catch((e) => {
          // console.log(e)
          setdataPresent(false)
        })

    })
  }

  useEffect(() => {
    getData()
  }, [periodAPI,ouAPI])

  useEffect(() => {
    getgraphData()
  }, [allData2])

  useEffect(() => {
    getOuNames()
  }, [ou])

  return (
    <StockStatus.Provider
      value={{
      allData,
      allData2,
      dx,
      ou,
      periods,
      graphData,
      dataPresent,
      changePeriodAPI,
      periodAPI,
      ouNames,
      changeOrgAPI,
      ouAPI,
      defaultou
    }}>
      {props.children}

    </StockStatus.Provider>
  )
}

export default StockStatusProvider;