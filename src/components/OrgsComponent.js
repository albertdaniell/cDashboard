import React, {useEffect, useState, useContext} from 'react';
import {UserOrgs} from '../contexts/UserOrgs';
import {useSpring, animated} from 'react-spring'

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
    getOrgChild4,
    selectedChild4,
    childorgsNames4,
    getOrgChild5,
    childorgs5,
    selectedChild5
  } = useContext(UserOrgs)
  const {toggleOrgsModal, changeOrgAPI, ouAPI, defaultou} = props
  const [isOpen,
    setIsOpen] = useState(false)
  const [myopacity,
    setOpacity] = useState(0)
  const props2 = useSpring({
    opacity: myopacity,
    from: {
      opacity: 0
    }
  })
  const updateOrg = (forcusOrg) => {
    changeOrgAPI(forcusOrg)
    customToggleOrgsModal()
  }

  const defaultOrgs = (myFocusOrg) => {
    changeOrgAPI(myFocusOrg)
    customToggleOrgsModal()
  
  }

  const customToggleOrgsModal = () => {
    toggleOrgsModal()
  }
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1)
    }, 500);
  }, [])

  useEffect(() => {
    setFocusOrg(defaultou)
  }, [forcusOrg])

  const [myFocusOrg,
    setFocusOrg] = useState(ouAPI)
  return (

    <div style={{}} className="orgComp">

      <div className="container">
        <div className="row">
          <div className="col-sm-3"></div>
          <animated.div style={props2} className="col-sm-6 orgCompDiv">
            <div
              style={{
              position: 'fixed',
              width: '560px',
              background: 'white',
              padding: 10
            }}>
              <center>
                <h4>User Organisation Units</h4>

              </center>

            </div>

            <div
              style={{
              position: 'fixed',
              width: '',
              background: 'white',
              padding: 10,
              marginBottom:20,
              bottom:50,
              float: 'right',
              padding: 15
            }}
              className="pull-left">

              {forcusOrg.length === "undefined" || forcusOrg.length === 0 || forcusOrg === ""
                ? <button
                    style={{
                    marginTop: -20,
                    marginLeft: 10
                  }}
                    className="btn btn-default pull-right"
                    disabled>Update</button>
                : <button
                  style={{
                  marginTop: -20,
                  marginLeft: 10
                }}
                  className="btn btn-primary pull-right"
                  onClick={() => updateOrg(forcusOrg)}>Update</button>
}
              <button
                style={{
                marginTop: -20
              }}
                className="btn btn-danger pull-left"
                onClick={() => toggleOrgsModal()}>Close</button>

            </div>

            <div style={{
              marginTop: 70,marginBottom:100
            }}>

              <p onClick={() => defaultOrgs(myFocusOrg)}>Default</p>
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
                                            {selectedChild4 === childorg3.ouId
                                              ? <p
                                                  onClick={() => getOrgChild4(childorg3.ouId)}
                                                  style={{
                                                  marginLeft: 60,
                                                  fontWeight: 'bold',
                                                  color: 'red'
                                                }}>
                                                  - {childorg3.ouName}</p>
                                              : <p
                                                onClick={() => getOrgChild4(childorg3.ouId)}
                                                style={{
                                                marginLeft: 60
                                              }}>
                                                {childorg3.ouName}</p>
}{childorgsNames4.map((childorg4) => {
                                          if(childorg3.ouId === childorg4.pId){
                                            return (
                                              <span>
                                                {selectedChild5 === childorg4.ouId
                                                  ? <p
                                                      style={{
                                                      marginLeft: 80,
                                                      fontWeight: 'bold',
                                                      color: 'red'
                                                    }}
                                                      onClick={() => getOrgChild5(childorg4.ouId)}>{childorg4.ouName}</p>

                                                  : <p
                                                    style={{
                                                    marginLeft: 80
                                                  }}
                                                    onClick={() => getOrgChild5(childorg4.ouId)}>{childorg4.ouName}</p>
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
          </animated.div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </div>
  );
}

export default OrgsComponent;
