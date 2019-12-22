import React, {createContext, useState,useEffect} from 'react'
export const UserContext = createContext();

const fetchOptions = {
  headers: {
    Authorization: `Basic ${btoa('albertagoya@gmail.com:Pa$$word1')}`
  }
}

const UserContextProvider = (props) => {
  const [userData,
    setUserData] = useState([])

    const [userCredentials,
      setUserCredentials] = useState([])

      const [userAccess,
        setUserAccess] = useState([])
  

    const getUserData = async() => {
    const userdetails = await fetch('me/')
    const userdetails2 = await userdetails.json()

    setUserData(userdetails2)
    setUserCredentials(await userdetails2.userCredentials)
    setUserAccess(await  userdetails2.userCredentials.access)
   console.log("Uset data",await userdetails2.userCredentials)

  }

  useEffect(() => {
      getUserData()
  }, [])

  return (

    <UserContext.Provider value={{
      userData,
      userCredentials,
      userAccess
    }}> {props.children} </UserContext.Provider>
  )

}

export default UserContextProvider;