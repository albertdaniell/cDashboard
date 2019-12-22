import React, {createContext, useState, useEffect} from 'react'

export const StockStatus = createContext();

const StockStatusProvider = (props) => {

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
    const allData = await fetch('analytics.json?dimension=dx:IYVjjC42J0C;UriZTcAqQhS;Da2hUTlhuev;tlLJoasHsnx;KU1G' +
        'dTyABV1;BnNTJQvpssM;GAWSnGyeBEp;hPRee4vfcHk;IpzMGXo8pSm;m72B7CKg78l;SrscdcMTFzi;' +
        'MfIPOuz50f6;ObK4JLoDLNy;sHsyHc1kmIU;vHL3aYvAkhb;iH9jNGP7dQu;P0Cy5mBXijV;N8OFIqhm' +
        'BjU&dimension=pe:LAST_MONTH&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw' +
        '9jvRNAGL');
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

      fetch(`dataElements/${indicatorid}`)
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
            }, 2000);
          }, 4000);
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
    <StockStatus.Provider
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

    </StockStatus.Provider>
  )
}

export default StockStatusProvider;