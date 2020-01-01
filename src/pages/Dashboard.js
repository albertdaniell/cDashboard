import React from 'react'
import ChvReportingRateContextProvider from '../contexts/ChvReportingRateContext'
import Test from './Test'
import ReportingRate from '../components/graphs/ReportingRate'
import ActualReportingExpectedProvider from '../contexts/ActualReportingExpected'
import ActualReports from '../components/graphs/ActualReports'
import Loading from '../components/Loading'
import ReportingRRateonTime from '../components/graphs/ReportingRRateonTime'
import CHVRRateFacGraph from '../components/graphs/CHVRRateFacGraph'

export default function Dashboard() {
  return (
    <div>

      <h2 className="pageHeading">
        <i class="fas fa-tachometer-alt"></i>
        Dashboard</h2>

      <div className="container-fluid" style={{
        padding: 0
      }}>
        <div className="row">

          <div className="col-sm-6">
            <ReportingRRateonTime></ReportingRRateonTime>

          </div>

          <div className="col-sm-6">
            <ActualReportingExpectedProvider>
              <ActualReports></ActualReports>
            </ActualReportingExpectedProvider>
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
