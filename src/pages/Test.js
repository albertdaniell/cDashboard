import React,{useContext} from 'react';
import { ChvReportingRateContext } from '../contexts/ChvReportingRateContext';

const Test = () => {
    const {allMetaData,periods}=useContext(ChvReportingRateContext)
    console.log(allMetaData)
    return (
        <div>hehe
            {
                JSON.stringify(periods)
            }

            {/* {
                allMetaData.map((md)=>{
                    return(
                        <p>{md}</p>
                    )

                })
            } */}
        </div>
    );
}

export default Test;
