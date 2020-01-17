import React from 'react';

const ToggleGraphOptions = (props) => {
  const {toggleLine, toggleOrgsModal, showLine} = props
  return (
    <div>
      <div class="dropdown">
        <button
          class="btn btn-default dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true">
          Graph Options 
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>

            <button className="btn btn-default btn-sm" onClick={(e) => toggleOrgsModal(e)}>

              Filter by Organisation Units
            </button>

          </li>
          <li>

            <button className="btn btn-default btn-sm">
              Filter By Period
            </button>

          </li>

          <li role="separator" class="divider"></li>
          <li>
            <button className="btn btn-default btn-sm" onClick={() => toggleLine()}>Toggle Line/Bar Graph {showLine
                ? <i class="fas fa-chart-line fa-2x isLine"></i>
                : <i class="far fa-chart-bar fa-2x isBar"></i>
}</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ToggleGraphOptions;
