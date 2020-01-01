import React, {createContext, useState, useEffect} from 'react'
import constants from '../constants';
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

  const [dataPresent,
    setDataPresent] = useState(false)

  const getUserData = async() => {
    const userdetails = await fetch(`${constants.MY_PROXY}me/`,fetchOptions)
    const userdetails2 = await userdetails.json()

    setUserData(userdetails2)
    setUserCredentials(await userdetails2.userCredentials)
    setUserAccess(await userdetails2.userCredentials.access)
    console.log("Uset data", await userdetails2.userCredentials)
    setDataPresent(true)

  }

  useEffect(() => {
    getUserData()
  }, [])

  return (

    <UserContext.Provider
      value={{
      userData,
      userCredentials,
      userAccess,
      dataPresent
    }}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserContextProvider;