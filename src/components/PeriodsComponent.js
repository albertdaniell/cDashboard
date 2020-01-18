import React, {useEffect, useState, useContext} from 'react';
import {useSpring, animated} from 'react-spring'

const PeriodsComponent = (props) => {

  const myPeriods = [
    {
      "periodName": "This Month",
      "value": "THIS_MONTH"
    }, {
      "periodName": "Last Month",
      "value": "LAST_MONTH"
    }, {
      "periodName": "Last 3 Months",
      "value": "LAST_3_MONTHS"
    }, {
      "periodName": "Last 6 Months",
      "value": "LAST_6_MONTHS"
    }, {
      "periodName": "Last 12 Months",
      "value": "LAST_12_MONTHS"
    }, {
      "periodName": "This BiMonth",
      "value": "THIS_BIMONTH"
    }, {
      "periodName": "Last BiMonth",
      "value": "LAST_BIMONTH"
    }, {
      "periodName": "Quarters This Year",
      "value": "QUARTERS_THIS_YEAR"
    }, {
      "periodName": "Quarters Last Year",
      "value": "QUARTERS_LAST_YEAR"
    }, {
      "periodName": "Last Year",
      "value": "LAST_YEAR"
    }, {
      "periodName": "Last 5 Years",
      "value": "LAST_5_YEARS"
    }
  ]

  const {togglePeriodModal, changePeriodAPI, periodAPI} = props

  const [myopacity,
    setOpacity] = useState(0)
  const props2 = useSpring({
    opacity: myopacity,
    from: {
      opacity: 0
    }
  })

  const UpdatePeriod = (period) => {
    changePeriodAPI(period)
    togglePeriodModal()

  }
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 500);
  }, [])

  return (

    <div style={{}} className="orgComp">

      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <animated.div style={props2} className="col-sm-6 orgCompDiv">
            <div
              style={{
              position: 'fixed',
              width: '560px',
              background: 'white',
              padding: 10
            }}>
              <center>
                <h4>Periods</h4>

              </center>

            </div>

            <div
              style={{
              position: 'fixed',
              width: '',
              background: 'white',
              padding: 10,
              marginBottom: 20,
              bottom: 50,
              float: 'right',
              padding: 15
            }}
              className="pull-left">

              <button
                style={{
                marginTop: -20
              }}
                onClick={() => togglePeriodModal()}
                className="btn btn-danger pull-left">Close</button>

            </div>

            <div
              style={{
              marginTop: 70,
              marginBottom: 100
            }}>

              {myPeriods.map((period) => {
                return (
                  <span>
                    {periodAPI === period.value
                      ? <p
                          style={{
                          fontWeight: 'bold',
                          color: 'red'
                        }}
                          onClick={() => UpdatePeriod(period.value)}>{period.periodName}
                        </p>
                      : <p onClick={() => UpdatePeriod(period.value)}>{period.periodName}
                      </p>
}
                    <hr/>
                  </span>
                )

              })
}

            </div>
          </animated.div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </div>
  );
}

export default PeriodsComponent;
