import React, {useContext} from 'react'
import SideNav from '../SideNav'
import AppNav from '../AppNav'
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import Users from '../../pages/User'
import Loading from '../Loading'
import ActualReportingExpectedProvider from '../../contexts/ActualReportingExpected'
import ChvReportingRateContextProvider, {ChvReportingRateContext} from '../../contexts/ChvReportingRateContext'
import UserContextProvider from '../../contexts/UserContext'
import ReportingRateReportingRateOnTimeProvider from '../../contexts/ReportingRateReportingOnTime'
import CommodityReportingRateProvider, {CommodityReportingRate} from '../../contexts/CommodityReportingRates'
import CommodityRates from '../../pages/CommodityRates'
import StockStatusPage from '../../pages/StockStatusPage'
import StockStatusByNoPage from '../../pages/StockStatusByoPage'
import StockStatusProvider from '../../contexts/StockStatus'
import SideNavWallpaper from '../SideNavWallpaper'
import CHVRRateFacilityProvider from '../../contexts/CHVRRateFacility'
import StockStatusByNoProvider from '../../contexts/StockStatusByNumber'
import BackgroundLoading from '../BackgroundLoading'
import CHVStockReceiptContextProvider from '../../contexts/CHVStockReceiptContext'
import ReceiptReportingRatesProvider from '../../contexts/ReceiptReportingRates'
import PanelDataContextProvider from '../../contexts/PanelDataContext'
import ReceiptReportPage from '../../pages/ReceiptReportPage'
import ReceiptReportReportOntimeProvider from '../../contexts/ReceiptReportReportOntime'

export default function PageLayout() {

  return (

    <Router>
      <ReceiptReportReportOntimeProvider>
        <ReceiptReportingRatesProvider>
          <PanelDataContextProvider>
            <CHVStockReceiptContextProvider>
              <StockStatusByNoProvider>
                <CHVRRateFacilityProvider>
                  <StockStatusProvider>
                    <CommodityReportingRateProvider>
                      <ReportingRateReportingRateOnTimeProvider>
                        <UserContextProvider>
                          <ActualReportingExpectedProvider>

                            <ChvReportingRateContextProvider>
                              <Loading></Loading>
                              {/* <BackgroundLoading></BackgroundLoading> */}

                              <div className="container-fluid" style={{}}>

                                <div className="row">
                                  <SideNavWallpaper></SideNavWallpaper>
                                  <div className="col-sm-2 sideNav">

                                    <SideNav></SideNav>
                                  </div>
                                  <div className="col-sm-10 mainDiv">
                                    <AppNav></AppNav>

                                    <div>
                                      <Route exact path="/" component={Dashboard}/>
                                      <Route path="/users" component={Users}/>
                                      <Route path="/commodityRR" component={CommodityRates}></Route>
                                      <Route path="/stockstatus" component={StockStatusPage}></Route>
                                      <Route path="/stockstatusbyno" component={StockStatusByNoPage}></Route>
                                      <Route path="/receiptreports" component={ReceiptReportPage}></Route>

                                    </div>

                                  </div>

                                </div>

                              </div>
                            </ChvReportingRateContextProvider>
                          </ActualReportingExpectedProvider>

                        </UserContextProvider>
                      </ReportingRateReportingRateOnTimeProvider>

                    </CommodityReportingRateProvider>
                  </StockStatusProvider>
                </CHVRRateFacilityProvider>
              </StockStatusByNoProvider>
            </CHVStockReceiptContextProvider>
          </PanelDataContextProvider>
        </ReceiptReportingRatesProvider>
      </ReceiptReportReportOntimeProvider>

    </Router>
  )
}
