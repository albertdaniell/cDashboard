import React from 'react'
import ChvReportingRateContextProvider from '../contexts/ChvReportingRateContext'
import Test from './Test'
import ReportingRate from '../components/graphs/ReportingRate'
import ActualReportingExpectedProvider from '../contexts/ActualReportingExpected'
import ActualReports from '../components/graphs/ActualReports'
import Loading from '../components/Loading'
import CommodityRRate from '../components/graphs/CommodityRRate'
import ReceiptReportingGraph from '../components/graphs/ReceiptReportingGraph'

export default function ReceiptReportPage() {
  return (
    <div>

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

      </div>

    </div>
  )
}
