import React, {useState, useContext, useEffect} from 'react'
import {Line, Bar, Pie, Polar, HorizontalBar,Radar, Doughnut} from 'react-chartjs-2';
import {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext';
import Spacer from '../Spacer'
import Loading2 from '../Loading2';
import {CommodityReportingRate} from '../../contexts/CommodityReportingRates';
import { StockStatusByNo } from '../../contexts/StockStatusByNumber';
import sortMonths from '../../constants/sortMonths';
import TogglePeriod from '../TogglePeriod';
import SavePdfImage from '../SavePdfImage';
import { SaveToPdfContext } from '../../contexts/SaveToPdfContext';
import NoData from '../NoData';

export default function StockStatusByNoGraph() {

  
  const {saveToPdf}=useContext(SaveToPdfContext)
  const [sortedMonths,
    setMonths] = useState([])

  const {graphData, periods, stockdataPresent, changePeriodAPI, allData,periodAPI} = useContext(StockStatusByNo)
  const mydata = {
    labels: sortedMonths,
    datasets: graphData
  }

  useEffect(() => {
    let formattedMonths= sortMonths(periods)
    setMonths(formattedMonths)
  }, [graphData])

  return (
    <div className="col-sm-12 graphDiv">
      <div className="col-sm-4">
      <TogglePeriod changePeriodAPI={changePeriodAPI} periodAPI={periodAPI}></TogglePeriod>

      </div>

      <div className="col-sm-4"></div>
      <div className="col-sm-4">
      
      {/* <SavePdfImage saveToPdf={saveToPdf}></SavePdfImage> */}
      
      </div>
      <br></br>

      <div className="col-sm-12">
        <h4>
<center># Stock Status  {sortedMonths.length === 0 || sortedMonths === undefined ?null:
<span> for {sortedMonths.length} month(s)</span>
}</center>
        </h4>
        <Spacer></Spacer>
       <div className="theGraph">
       {allData.rows === undefined || allData.rows.length === 0
          ?
          <center>
            <NoData></NoData>
          </center>
          : !stockdataPresent
            ? <Loading2></Loading2>
            : <Bar options={{
              animation: {
                duration: 3000 // general animation time
            },
              responsive: true
            }} data={mydata}/>
}
       </div>
        {/* <button onClick={() => changePeriodAPI()}>Change</button> */}

      </div>
    </div>
  )
}
