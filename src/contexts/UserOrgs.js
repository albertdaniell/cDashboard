import React, {useState, useContext, useEffect} from 'react'
import {createContext} from 'react'


export const UserOrgs = createContext();

const UserOrgsProvider = (props) => {
  const [orgs,
    setOrgs] = useState([])
  const [forcusOrg,
    setFocusOrg] = useState('')

  const [childorgs1,
    setChildOrgs1] = useState([])
  const [childorgsNames1,
    setChildOrgsNames1] = useState([])

  const [selectedChild1,
    setSelectedChild1] = useState('')

  const [childorgs2,
    setChildOrgs2] = useState([])
  const [childorgsNames2,
    setChildOrgsNames2] = useState([])

  const [selectedChild2,
    setSelectedChild2] = useState('')

  const [childorgs3,
    setChildOrgs3] = useState([])
  const [childorgsNames3,
    setChildOrgsNames3] = useState([])

  const [selectedChild3,
    setSelectedChild3] = useState('')

  const getOrgs1 = async() => {
    let data1 = await fetch(`/api/organisationUnits?userOnly=true`);
    let data1json = data1.json();
    console.log(await data1json)
    const {organisationUnits} = await data1json
    setOrgs(await organisationUnits)

  }

  const getOrgChild1 = async(ouid) => {
    setChildOrgs1([])
    setFocusOrg(ouid)
    //const {organisationUnits}=orgs
    setSelectedChild1(ouid)

    let data1 = await fetch(`/api/organisationUnits/${ouid}?userOnly=true`);
    let data1json = data1.json();
    console.log(await data1json)
    const {children} = await data1json
    setChildOrgs1(await children)

  }

  const getOrgName1 = () => {
    //const {organisationUnits}=orgs
    orgs.map((ou) => {
      fetch(`/api/organisationUnits/${ou.id}`)
        .then(res => res.json())
        .then((result) => {
          let ouName;
          ouName = result.displayName
          console.log("zzzzz", ouName)

        })

    })
 

  }

  const getOrgName2 = () => {
    //const {organisationUnits}=orgs
    let childorgsData = [];
    childorgs1.map((ou) => {

      let childorgsDataName = "";
      fetch(`/api/organisationUnits/${ou.id}`)
        .then(res => res.json())
        .then((result) => {
          let ouName;
          childorgsDataName = result.displayName
          //console.log("zzzzz", ouName)
          let data = {
            "ouName": result.displayName,
            "ouId": ou.id,
            "pId": selectedChild1
          }

          childorgsData = [
            ...childorgsData,
            data
          ]

          childorgsData = childorgsData
            .slice()
            .sort((a, b) => {
              if (a.ouName.toLowerCase() < b.ouName.toLowerCase()) 
                return -1;
              if (a.ouName.toLowerCase() > b.ouName.toLowerCase()) 
                return 1;
              return 0;
            })
          setChildOrgsNames1(childorgsData)

        })

    })
   

  }

  const getOrgChild2 = async(ouid) => {
    //setChildOrgs2([]) const {organisationUnits}=orgs
    setSelectedChild2(ouid)
    setFocusOrg(ouid)

    let data1 = await fetch(`/api/organisationUnits/${ouid}?userOnly=true`);
    let data1json = data1.json();
    console.log(await data1json)
    const {children} = await data1json
    setChildOrgs2(await children)

  }

  const getOrgName3 = () => {
    //const {organisationUnits}=orgs
    let childorgsData = [];
    childorgs2.map((ou) => {

      let childorgsDataName = "";
      fetch(`/api/organisationUnits/${ou.id}`)
        .then(res => res.json())
        .then((result) => {
          let ouName;
          childorgsDataName = result.displayName
          //console.log("zzzzz", ouName)
          let data = {
            "ouName": result.displayName,
            "ouId": ou.id,
            "pId": selectedChild2
          }

          childorgsData = [
            ...childorgsData,
            data
          ]

          childorgsData = childorgsData
            .slice()
            .sort((a, b) => {
              if (a.ouName.toLowerCase() < b.ouName.toLowerCase()) 
                return -1;
              if (a.ouName.toLowerCase() > b.ouName.toLowerCase()) 
                return 1;
              return 0;
            })
          setChildOrgsNames2(childorgsData)

        })

    })

  }

  const getOrgChild3 = async(ouid) => {
    //setChildOrgs2([]) const {organisationUnits}=orgs
    setSelectedChild3(ouid)
    setFocusOrg(ouid)

    let data1 = await fetch(`/api/organisationUnits/${ouid}?userOnly=true`);
    let data1json = data1.json();
    console.log(await data1json)
    const {children} = await data1json
    setChildOrgs3(await children)

  }

  const getOrgName4 = () => {
    //const {organisationUnits}=orgs
    let childorgsData = [];
    childorgs3.map((ou) => {

      let childorgsDataName = "";
      fetch(`/api/organisationUnits/${ou.id}`)
        .then(res => res.json())
        .then((result) => {
          let ouName;
          childorgsDataName = result.displayName
          //console.log("zzzzz", ouName)
          let data = {
            "ouName": result.displayName,
            "ouId": ou.id,
            "pId": selectedChild3
          }

          childorgsData = [
            ...childorgsData,
            data
          ]

          childorgsData = childorgsData
            .slice()
            .sort((a, b) => {
              if (a.ouName.toLowerCase() < b.ouName.toLowerCase()) 
                return -1;
              if (a.ouName.toLowerCase() > b.ouName.toLowerCase()) 
                return 1;
              return 0;
            })
          setChildOrgsNames3(childorgsData)

        })

    })

  }

  useEffect(() => {
    getOrgs1()
  }, [])

  useEffect(() => {
    getOrgName1()
  }, [orgs])

  useEffect(() => {
    getOrgName2()
  }, [childorgs1])

  useEffect(() => {
    getOrgName3()
  }, [childorgs2])

  useEffect(() => {
    getOrgName4()
  }, [childorgs3])
  return (
    <UserOrgs.Provider
      value={{
      orgs,
      childorgs1,
      getOrgChild1,
      selectedChild1,
      childorgsNames1,
      selectedChild1,
      childorgs2,
      getOrgChild2,
      selectedChild2,
      childorgsNames2,
      childorgs3,
      getOrgChild3,
      selectedChild3,
      childorgsNames3,
      forcusOrg
    }}>
      {props.children}
    </UserOrgs.Provider>
  )

}

export default UserOrgsProvider;