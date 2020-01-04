import React from 'react'
import ChvReportingRateContextProvider from '../contexts/ChvReportingRateContext'
import Test from './Test'
import ReportingRate from '../components/graphs/ReportingRate'
import ActualReportingExpectedProvider from '../contexts/ActualReportingExpected'
import ActualReports from '../components/graphs/ActualReports'
import Loading from '../components/Loading'
import ReportingRRateonTime from '../components/graphs/ReportingRRateonTime'
import CHVRRateFacGraph from '../components/graphs/CHVRRateFacGraph'
import StockStatusByNoGraph from '../components/graphs/StockSatusByNoGraph'
import {ReportingRateReportingRateOnTime} from '../contexts/CommodityReportingRates'
import CommodityRRate from '../components/graphs/CommodityRRate'
import ReportingRateOverTimeTable from '../components/tables/ReportingRateOverTimeTable'
import CHVStockReceiptGraph from '../components/graphs/CHVStockReceiptGraph'

export default function Dashboard() {
  return (
    <div>

      <h2 className="pageHeading">
        <i class="fas fa-tachometer-alt"></i>
        Dashboard</h2>

      <div className="" style={{
        padding: 0
      }}>
        <div className="row">

          <div className="col-lg-6">
            <ReportingRRateonTime></ReportingRRateonTime>

          </div>

          <div className="col-lg-6">

            <StockStatusByNoGraph></StockStatusByNoGraph>

          </div>

        </div>

        <div className="row">
          <div className="col-lg-6">

            
          </div>

          <div className="col-lg-6">
            

           {/* <ReportingRateOverTimeTable></ReportingRateOverTimeTable> */}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">

          <ActualReports></ActualReports>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">

          <CHVStockReceiptGraph></CHVStockReceiptGraph>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">

            <ReportingRate></ReportingRate>

          </div>
        </div>


        <div className="row">
          <div className="col-sm-12">

            <CHVRRateFacGraph></CHVRRateFacGraph>

          </div>
        </div>

      </div>

    </div>
  )
}
