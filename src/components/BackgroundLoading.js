import React,{useContext} from 'react'
import spinner from '../images/spinner.gif'

import { ChvReportingRateContext } from '../contexts/ChvReportingRateContext'

export default function BackgroundLoading() {
    const {isData, showLoading ,setshowLoading} = useContext(ChvReportingRateContext)
    return (
        <div className="bgloading">
           <img alt="spinner" style={{
                height: 30
              }} src={spinner}></img>   <span style={{fontStyle:'italic',fontWeight:'bold'}}>Loading metadata in background mode.</span>
        </div>
    )
}
