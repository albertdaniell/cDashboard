import React,{useContext,useState} from 'react';
import { PanelDataContext } from '../contexts/PanelDataContext';

const DashboardPanels = () => {
    const {chvReportingRate, chvActualRRateOnTime, commodityDispensed, SOHActualReporting} = useContext(PanelDataContext)

  return (
    <div>
      <div className="col-sm-12 myPanelDiv">

        <div className="col-sm-3 myPanel">
          <div className="col-sm-12 myPanelBody myPanelBody1">
            <h4>CHV SOH Reporting Rate on time</h4>
            <span className="large">
              {chvReportingRate}
              %</span>
          </div>
        </div>

        <div className="col-sm-3 myPanel">
          <div className="col-sm-12 myPanelBody myPanelBody2">
            <h4>CHV Receipt Actual reports on time</h4>
            <span className="large">{chvActualRRateOnTime}</span>
          </div>
        </div>

        <div className="col-sm-3 myPanel">
          <div className="col-sm-12 myPanelBody myPanelBody3">
            <h4>Commodity Dispensed actual Reports on Time</h4>
            <span className="large">{commodityDispensed}</span>
          </div>
        </div>

        <div className="col-sm-3 myPanel">
          <div className="col-sm-12 myPanelBody myPanelBody4">
            <h4>CHV SOH Actual Reporting Rate on time</h4>
            <span className="large">{SOHActualReporting}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPanels;
