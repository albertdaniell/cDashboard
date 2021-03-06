import React, {createContext, useState, useContext, useEffect} from 'react'
import constants from '../constants'

export const StockStatusByNo = createContext();

const StockStatusByNoProvider = (props) => {
  const [periodAPI,
    setPeriodApi] = useState('LAST_12_MONTHS')

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

  const [stockdataPresent,
    setdataPresent] = useState(false)

  const [ouNames,
    setOuNames] = useState([])

  const [ouAPI,
    setouAPI] = useState('USER_ORGUNIT')
  const [defaultou,
    setdefaultou] = useState('USER_ORGUNIT')

  const changeOrgAPI = (ou) => {
    //alert(ou)
    setouAPI(ou)

  }

  const getData = async() => {
    setPeriods([])
    let stockstatusid = ".VAhKn4YLOtX"
    setdataPresent(false)
    const allData = await fetch(`/api/analytics.json?dimension=VAhKn4YLOtX:aVuisZ9bgxJ;JkW5RXtoxjj;YxgCPnP2Mbn;fkBysl2P7tC&dimension=pe:${periodAPI}&filter=ou:${ouAPI}&filter=dx:IYVjjC42J0C;UriZTcAqQhS;Da2hUTlhuev;tlLJoasHsnx;KU1GdTyABV1;BnNTJQvpssM;GAWSnGyeBEp;hPRee4vfcHk;IpzMGXo8pSm;m72B7CKg78l;SrscdcMTFzi;MfIPOuz50f6;ObK4JLoDLNy;sHsyHc1kmIU;vHL3aYvAkhb;iH9jNGP7dQu;P0Cy5mBXijV;N8OFIqhmBjU&displayProperty=NAME&user=Fsw9jvRNAGL&outputIdScheme=UID`);
    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    setPeriods(await allDatajson.metaData.dimensions.pe);
    setOu(await allDatajson.metaData.dimensions.ou);
    setDx(await allDatajson.metaData.dimensions.VAhKn4YLOtX);
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]));
  }
  const changePeriodAPI = (pe) => {

    setPeriodApi(pe)
  }
  const getgraphData = () => {

    let newds = [];
    dx.map((dxid) => {
      let catOptid = dxid
      let catOptionName = "99"
      let aggData = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 225) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 205) + 1;
      var colorA = 0.80;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      fetch(`/api/categoryOptions/${catOptid}`)
        .then(res => res.json())
        .then((result) => {
          // console.log("stockstatus by n res",result)
          catOptionName = result.displayName
          if (catOptionName === "Adequate") {

            backgroundColor = `rgba(150, 200, 64, 1)`
          } else if (catOptionName === "Overstocked") {
            backgroundColor = `rgba(130, 161, 201, .8)`
          } else if (catOptionName === "Stockout") {
            backgroundColor = `rgba(150, 30, 30, .8)`
          } else if (catOptionName === "Understocked") {
            backgroundColor = `rgba(239, 84, 249, .8)`
          } else {
            backgroundColor = backgroundColor
          }

          let filtered = allData2.filter((data) => {
            // alert(data[0])
            return data[0] === catOptid

          }).map((data) => {
            return data[2];
          })

          aggData = filtered
          //console.log("agg data,", filtered)

          setTimeout(() => {

            let data = {
              data: aggData,
              label: catOptionName,
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
            }, 100);
          }, 100);

        })

    })
  }

  useEffect(() => {
    getData()
  }, [periodAPI,ouAPI])

  useEffect(() => {
    getgraphData()
  }, [allData2])
  return (
    <StockStatusByNo.Provider
      value={{
      allData,
      allData2,
      dx,
      ou,
      periods,
      graphData,
      stockdataPresent,
      changePeriodAPI,
      periodAPI,
      changeOrgAPI,
      ouAPI,
      defaultou
    }}>
      {props.children}

    </StockStatusByNo.Provider>

  )
}

export default StockStatusByNoProvider;