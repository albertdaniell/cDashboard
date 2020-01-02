import React,{useContext} from 'react'
import spinner from '../images/spinner.gif'

import { ChvReportingRateContext } from '../contexts/ChvReportingRateContext'

export default function BackgroundLoading() {
    const {isData, showLoading ,setshowLoading} = useContext(ChvReportingRateContext)
    return (
        <div className="bgloading">
            <p> <img alt="spinner" style={{
                height: 20
              }} src={spinner}></img> Loading metadata in background mode.</p>
        </div>
    )
}
