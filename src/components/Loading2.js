import React from "react";
import Loading from "../images/spinner2.png";

const Loading2 = () => {
  return (
    <div className="col-sm-6 loadingDiv">
      <center>
        <div
          style={{
            height: "4rem",
            width: "4rem",
          }}
          class="ld-ext-right running"
        >
          <div class="ld ld-ball ld-squeeze"></div>
        </div>

        {/* <p class="ld ld-bounce-in infinite">Loading ...</p> */}
        {/* <img alt="loading... " src={Loading} style={{
          height: 100
        }}></img> */}
      </center>
    </div>
  );
};

export default Loading2;
