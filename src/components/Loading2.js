import React from 'react';
import Loading from '../images/spinner2.gif'

const Loading2 = () => {
    return (
        <div className="col-sm-6 loadingDiv">
            <center>
            <img alt="loading... " src={Loading} style={{height:100}}></img>
            </center>
        </div>
    );
}

export default Loading2;
