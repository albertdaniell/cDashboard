import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants'

export const CHVStockReceiptContext = createContext();

const CHVStockReceiptContextProvider = (props) => {

  const [periodAPI,
    setPeriodApi] = useState('LAST_MONTH')

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
    setdataPresent(false)
    const allData = await fetch(`/api/analytics.json?dimension=dx:chAbRNgZ1Qd;ecB7rZwaUoF;M7vO6YvJFb2;yMqmnRfQey4;C6eXw6p3gQA;IO39vQgTuVk;CzPh5DcAbok;hSwm9GimbS2;PNhjC5E3gKn;MAWC8U4qAYj;gQCchJdm4DW;EIqvaR92eWt;jP8gCXQQYHr;wn9dgrzJ1qF;AhIinSzBdTW;adF5ghDhvFi;XGSDunjprxW;FkXYpKFt9hD&dimension=pe:${periodAPI}&filter=ou:USER_ORGUNIT&displayProperty=NAME&user=Fsw9jvRNAGL`);
    const allDatajson = await allData.json();
    setAllData(await allDatajson);
    setPeriods(await allDatajson.metaData.dimensions.pe);
    setOu(await allDatajson.metaData.dimensions.ou);
    setDx(await allDatajson.metaData.dimensions.dx);
    setAllData2(await allDatajson.rows.slice().sort((a, b) => a[1] - b[1]));
  }

  const changePeriodAPI = (pe) => {

    setPeriodApi(pe)
  }

  const getgraphData = () => {

    let graphData = [];
    let newds = [];
    dx.map((indi,index) => {
      let indicatorName = ""
      let inidcatorsList=[]
      let indicatorid = indi;
      let aggData = [];
      let backgroundColor = ''
      var colorR = Math.floor(Math.random() * 235) + 1;
      var colorG = Math.floor(Math.random() * 255) + 1;
      var colorB = Math.floor(Math.random() * 205) + 1;
      var colorA = 0.80;
      backgroundColor = `rgba(${colorR},${colorG},${colorB},${colorA})`;

      fetch(`/api/dataElements/${indicatorid}`)
        .then(res => res.json())
        .then((result) => {

          indicatorName = result.displayName
        //inidcatorsList[index] = indicatorName;
          //console.log("indicator results,", result.displayName)

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


          newds=newds.slice().sort((a, b) =>{
            if(a.label.toLowerCase() < b.label.toLowerCase()) return -1;
            if(a.label.toLowerCase() > b.label.toLowerCase()) return 1;
            return 0;
           })


            setGraphData(newds)

            setTimeout(() => {
              setdataPresent(true)
            }, 0);
          }, 0);
        })
        .catch((e) => {
        //  console.log(e)
          setdataPresent(false)
        })

    })
  }

  useEffect(() => {
    getData()
  }, [periodAPI])

  useEffect(() => {
    getgraphData()
  }, [allData2])

  return (
    <CHVStockReceiptContext.Provider
      value={{
      allData,
      allData2,
      dx,
      ou,
      periods,
      graphData,
      dataPresent,
      changePeriodAPI,
      periodAPI
    }}>
      {props.children}

    </CHVStockReceiptContext.Provider>
  )
}

export default CHVStockReceiptContextProvider;