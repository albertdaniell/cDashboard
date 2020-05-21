import React, { useContext, useState, useEffect } from "react";
import SideNav from "../SideNav";
import AppNav from "../AppNav";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Users from "../../pages/User";
import Loading from "../Loading";
import ActualReportingExpectedProvider from "../../contexts/ActualReportingExpected";
import ChvReportingRateContextProvider, {
  ChvReportingRateContext,
} from "../../contexts/ChvReportingRateContext";
import UserContextProvider from "../../contexts/UserContext";
import ReportingRateReportingRateOnTimeProvider from "../../contexts/ReportingRateReportingOnTime";
import CommodityReportingRateProvider, {
  CommodityReportingRate,
} from "../../contexts/CommodityReportingRates";
import CommodityRates from "../../pages/CommodityRates";
import StockStatusPage from "../../pages/StockStatusPage";
import StockStatusByNoPage from "../../pages/StockStatusByoPage";
import StockStatusProvider from "../../contexts/StockStatus";
import SideNavWallpaper from "../SideNavWallpaper";
import CHVRRateFacilityProvider from "../../contexts/CHVRRateFacility";
import StockStatusByNoProvider from "../../contexts/StockStatusByNumber";
import BackgroundLoading from "../BackgroundLoading";
import CHVStockReceiptContextProvider from "../../contexts/CHVStockReceiptContext";
import ReceiptReportingRatesProvider from "../../contexts/ReceiptReportingRates";
import PanelDataContextProvider from "../../contexts/PanelDataContext";
import ReceiptReportPage from "../../pages/ReceiptReportPage";
import ReceiptReportReportOntimeProvider from "../../contexts/ReceiptReportReportOntime";
import { useSpring, animated } from "react-spring";
import SaveToPdfContextProvider from "../../contexts/SaveToPdfContext";
import UserOrgsProvider from "../../contexts/UserOrgs";

export default function PageLayout() {
  const [myopacity, setOpacity] = useState(0);

  const props = useSpring({
    opacity: myopacity,
    from: {
      opacity: 0,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 3000);
  }, []);

  useEffect(() => {
    // window.onbeforeunload = (e) => {   console.log('Stop this');
    // window.location.replace("https://kecstock.jsi.com/api/apps/CStock-App/index.h
    // t ml")   e.preventDefault()   e.returnValue = ''; };
  }, []);
  return (
    <Router>
      <UserOrgsProvider>
        <SaveToPdfContextProvider>
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

                                  <animated.div
                                    className="container-fluid"
                                    style={props}
                                  >
                                    <div className="row">
                                      <SideNavWallpaper></SideNavWallpaper>
                                      <div className="col-sm-2 sideNav">
                                        <SideNav></SideNav>
                                      </div>
                                      <div className="col-sm-10 mainDiv">
                                        <AppNav></AppNav>

                                        <animated.div style={props}>
                                          <Route
                                            exact
                                            path="/"
                                            component={Dashboard}
                                          />
                                          <Route
                                            path="/users"
                                            component={Users}
                                          />
                                          <Route
                                            path="/commodityRR"
                                            component={CommodityRates}
                                          ></Route>
                                          <Route
                                            path="/stockstatus"
                                            component={StockStatusPage}
                                          ></Route>
                                          <Route
                                            path="/stockstatusbyno"
                                            component={StockStatusByNoPage}
                                          ></Route>
                                          <Route
                                            path="/receiptreports"
                                            component={ReceiptReportPage}
                                          ></Route>
                                        </animated.div>
                                      </div>
                                    </div>
                                  </animated.div>
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
        </SaveToPdfContextProvider>
      </UserOrgsProvider>
    </Router>
  );
}
