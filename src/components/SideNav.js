import React from 'react';
import Spacer from './Spacer';
import SideNavLinks from './SideNavLinks';

const SideNav = () => {
  return (
    <div>
      <Spacer></Spacer>
     <div className="sideHead">
     <i class="fas fa-chart-line"></i> cStock
     </div>
      <Spacer></Spacer>
      <SideNavLinks></SideNavLinks>
    </div>
  );
}

export default SideNav;
