import React, {useContext,useState,useEffect} from 'react'
import ChvReportingRateContextProvider from '../contexts/ChvReportingRateContext'
import Test from './Test'
import ReportingRate from '../components/graphs/ReportingRate'
import ActualReportingExpectedProvider from '../contexts/ActualReportingExpected'
import ActualReports from '../components/graphs/ActualReports'
import Loading from '../components/Loading'
import CommodityRRate from '../components/graphs/CommodityRRate'
import ReceiptReportingGraph from '../components/graphs/ReceiptReportingGraph'
import ReceiptRRateOnTimeGraph from '../components/graphs/ReceiptRRateOnTimeGraph'
import {useSpring, animated} from 'react-spring'

export default function ReceiptReportPage() {
  const [myopacity,setOpacity]=useState(0)

  const props = useSpring({
    opacity: myopacity,
    from: { opacity: 0},
  })

  useEffect(() => {
   setTimeout(() => {
    setOpacity(1)
   }, 100);
  }, [])
  return (
    <animated.div style={props}>

      <h2 className="pageHeading">
        <i class="fas fa-medkit"></i>
        Receipt Reporting Rates</h2>

      <div className="container-fluid" style={{
        padding: 0
      }}>

        <div className="row">
          <div className="col-sm-12">
           <ReceiptReportingGraph></ReceiptReportingGraph>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
           <ReceiptRRateOnTimeGraph></ReceiptRRateOnTimeGraph>
          </div>
        </div>

      </div>

    </animated.div>
  )
}
