import React, { useState, useEffect } from "react";
import Spacer from "./Spacer";
import SideNavLinks from "./SideNavLinks";
import constants from "../constants";

const SideNav = () => {
  const [date, setDate] = useState("");

  const [year, setYear] = useState("");

  const [month, setMonth] = useState("");

  const TheDate = async () => {
    var d = await new Date();
    let mydate = await d.getDate();
    setDate(mydate);
    return mydate;
  };

  const TheYear = async () => {
    var d = await new Date();
    let myyear = await d.getFullYear();
    setYear(myyear);
    return myyear;
  };

  const TheMonth = async () => {
    var d = await new Date();
    let mymonth = await d.getMonth();
    mymonth = mymonth + 1;
    if (mymonth === 1) {
      mymonth = "Jan ";
    } else if (mymonth === 2) {
      mymonth = "Feb ";
    } else if (mymonth === 3) {
      mymonth = "Mar ";
    } else if (mymonth === 4) {
      mymonth = "Apr ";
    } else if (mymonth === 5) {
      mymonth = "May ";
    } else if (mymonth === 6) {
      mymonth = "Jun";
    } else if (mymonth === 7) {
      mymonth = "Jul";
    } else if (mymonth === 8) {
      mymonth = "Aug";
    } else if (mymonth === 9) {
      mymonth = "Sep";
    } else if (mymonth === 10) {
      mymonth = "Oct";
    } else if (mymonth === 11) {
      mymonth = "Nov";
    } else if (mymonth === 12) {
      mymonth = "Dec";
    }
    setMonth(mymonth);
    return mymonth;
  };

  useEffect(() => {
    TheDate();
    TheMonth();
    TheYear();
  }, []);

  return (
    <div>
      <div className="sideHead">
        <div className="row">
          <div
            className="col-sm-12"
            style={{
              padding: 0,
            }}
          >
            <div className="col-sm-3">
              <i
                style={{ color: "rgb(255, 115, 0)" }}
                class="fas fa-chart-line"
              ></i>
            </div>

            <div className="col-sm-9">
              <p
                className="head"
                style={{
                  fontSize: 20,
                }}
              >
                cStock
              </p>
              
              <span
                style={{ color: "rgb(255, 115, 0)", fontSize: 12 }}
                className="head"
              >
                {date}- {month}- {year}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SideNavLinks></SideNavLinks>
    </div>
  );
};

export default SideNav;
