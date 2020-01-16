import React, {useEffect, useState, useContext} from 'react';
import {UserOrgs} from '../contexts/UserOrgs';

const OrgsComponent = (props) => {
  const {
    orgs,
    getOrgChild1,
    childorgsNames1,
    childorgs1,
    selectedChild1,
    getOrgChild2,
    selectedChild2,
    childorgsNames2,
    getOrgChild3,
    selectedChild3,
    childorgsNames3,
    forcusOrg,
    
  } = useContext(UserOrgs)
  const {toggleOrgsModal, changeOrgAPI,ouAPI,defaultou} = props
  const [isOpen,
    setIsOpen] = useState(false)

    useEffect(() => {
       setFocusOrg(defaultou)
      }, [forcusOrg])

    const [myFocusOrg,setFocusOrg]=useState(ouAPI)
  return (

    <div style={{}} className="orgComp">

      <div className="container">
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 orgCompDiv">
            <div
              style={{
              position: 'fixed',
              width: '370px',
              background: '#ccc',
              padding: 10
            }}>
              <h4>User Organisation Units</h4>
              {forcusOrg.length === "undefined" || forcusOrg.length === 0 || forcusOrg === ""
                ? <button className="btn btn-default pull-right" disabled>Update</button>
                : <button
                  className="btn btn-primary pull-right"
                  onClick={() => changeOrgAPI(forcusOrg)}>Update</button>
}
              <button
                className="btn btn-danger pull-right"
                onClick={(e) => toggleOrgsModal(e)}>Close</button>

              <hr></hr>
            </div>

            <div style={{
              marginTop: 100
            }}>

                <p onClick={() => changeOrgAPI(myFocusOrg)}>Default</p>
              {orgs.map((or) => {
                return (
                  <span>
                    {selectedChild1 === or.id
                      ? <p
                          onClick={() => getOrgChild1(or.id)}
                          style={{
                          fontWeight: 'bold',
                          color: 'red'
                        }}>
                          - {or.displayName}
                        </p>
                      : <p style={{}} onClick={() => getOrgChild1(or.id)}>{or.displayName}
                      </p>
}
                    {childorgsNames1.map((childorg) => {
                      if (selectedChild1 === or.id) {
                        return (
                          <span>

                            {selectedChild2 === childorg.ouId
                              ? <p
                                  onClick={() => getOrgChild2(childorg.ouId)}
                                  style={{
                                  marginLeft: 20,
                                  fontWeight: 'bold',
                                  color: 'red'
                                }}>
                                  - {childorg.ouName}</p>
                              : <p
                                onClick={() => getOrgChild2(childorg.ouId)}
                                style={{
                                marginLeft: 20
                              }}>
                                {childorg.ouName}</p>
}
                            {childorgsNames2.map((childorg2) => {
                              if (childorg.ouId === childorg2.pId) {
                                return (
                                  <span>
                                    {selectedChild3 === childorg2.ouId
                                      ? <p
                                          onClick={() => getOrgChild3(childorg2.ouId)}
                                          style={{
                                          marginLeft: 40,
                                          fontWeight: 'bold',
                                          color: 'red'
                                        }}>
                                          - {childorg2.ouName}</p>
                                      : <p
                                        onClick={() => getOrgChild3(childorg2.ouId)}
                                        style={{
                                        marginLeft: 40
                                      }}>
                                        {childorg2.ouName}</p>
}

                                    {childorgsNames3.map((childorg3) => {
                                      if (childorg2.ouId === childorg3.pId) {
                                        return (
                                          <span>
                                            <p
                                              style={{
                                              marginLeft: 60
                                            }}>
                                              - {childorg3.ouName}</p>
                                          </span>
                                        )
                                      }

                                    })
}
                                  </span>
                                )
                              }
                            })
}
                          </span>
                        )
                      }
                    })
}
                  </span>
                )

              })
}

            </div>
          </div>
          <div className="col-sm-4"></div>
        </div>
      </div>
    </div>
  );
}

export default OrgsComponent;
