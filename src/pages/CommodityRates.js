import React from 'react'
import ChvReportingRateContextProvider from '../contexts/ChvReportingRateContext'
import Test from './Test'
import ReportingRate from '../components/graphs/ReportingRate'
import ActualReportingExpectedProvider from '../contexts/ActualReportingExpected'
import ActualReports from '../components/graphs/ActualReports'
import Loading from '../components/Loading'
import CommodityRRate from '../components/graphs/CommodityRRate'

export default function Commodities() {
  return (
    <div>

      <h2 className="pageHeading">
        <i class="fas fa-medkit"></i>
        Commodities Reporting Rates</h2>

      <div className="container-fluid" style={{
        padding: 0
      }}>

        <div className="row">
          <div className="col-sm-12">
            <CommodityRRate></CommodityRRate>
          </div>
        </div>

      </div>

    </div>
  )
}