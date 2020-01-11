import React from 'react';

const TogglePeriod = (props) => {
  const {changePeriodAPI, periodAPI} = props
  return (
    <select
      className="form-control"
      name="periods"
      onChange={(e) => changePeriodAPI(e.target.value)}>
      <option value={periodAPI}>Select Month</option>
      <option value="THIS_MONTH">This Month</option>
      <option value="LAST_MONTH">Last month</option>
      <option value="LAST_3_MONTHS">Last 3 months</option>
      <option value="LAST_6_MONTHS">Last 6 months</option>
      <option value="LAST_12_MONTHS">Last 12 Months</option>
      <option value="THIS_BIMONTH">This Bi Month
      </option>
      <option value="LAST_BIMONTH">Last Bi Month</option>
      <option value="QUARTERS_LAST_YEAR">Quarters Last Year
      </option>
      <option value="LAST_YEAR">Last Year
      </option>

    </select>
  );
}

export default TogglePeriod;
