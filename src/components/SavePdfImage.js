import React from 'react';

const SavePdfImage = (props) => {
  const {saveToPdf} = props
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

          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li>
            <a href="#" onClick={() => saveToPdf()}>
              <i className="fas fa-file-pdf"></i>
              Save as pdf
            </a>
          </li>
          <li>
            <a href="#">Another action</a>
          </li>

          <li role="separator" class="divider"></li>
          <li>
            <a href="#">Separated link</a>
          </li>
        </ul>
      </div>

    </div>
  );
}

export default SavePdfImage;
