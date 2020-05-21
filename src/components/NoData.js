import React, {useEffect, useState, useContext} from 'react';
import noData from '../images/noData.jpg'
import {useSpring, animated} from 'react-spring'

const NoData = () => {

    const [myopacity,
        setOpacity] = useState(0)
      const props2 = useSpring({
        opacity: myopacity,
        from: {
          opacity: 0
        }
      })
    
      useEffect(() => {
        setTimeout(() => {
          setOpacity(1)
        }, 500);
      }, [])
    return (
        <animated.div style={props2}>
           <img id="noDataImage" src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg" alt="No Data to Display" style={{height:'35%',width:'35%'}}/> 
           </animated.div>
    );
}

export default NoData;
