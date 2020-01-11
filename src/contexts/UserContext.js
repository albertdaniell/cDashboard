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

    // var x = browser.cookies.getAll(
    //   url="https://kecstock.jsi.com/"            // object
    // )
    // console.log("cookie",x)

    const userdetails = await fetch(`/api/me/`)
    const userdetails2 = await userdetails.json()

    setUserData(userdetails2)
    setUserCredentials(await userdetails2.userCredentials)
    setUserAccess(await userdetails2.userCredentials.access)
   // console.log("Uset data", await userdetails2.userCredentials)
    setDataPresent(true)

  }

  useEffect(() => {
    setTimeout(() => {
      getUserData()
    }, 2500);
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