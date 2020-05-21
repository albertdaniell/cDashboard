import React, { useContext } from "react";
import spinner from "../images/spinner.png";

import { ChvReportingRateContext } from "../contexts/ChvReportingRateContext";

export default function BackgroundLoading() {
  const { isData, showLoading, setshowLoading } = useContext(
    ChvReportingRateContext
  );
  return (
    <div className="bgloading">
      <div
        style={{ height: "2rem", width: "2rem" }}
        class="ld-ext-right running"
      >
        <div class="ld ld-ball ld-squeeze"></div>
      </div>{" "}
      <span style={{ fontStyle: "italic", fontWeight: "bold" }}>
        Loading metadata in background mode.
      </span>
    </div>
  );
}
