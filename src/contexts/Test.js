import React, {useContext, createContext, useState} from 'react';

export const TestConext = createContext();

const TestConextProvider = (props) => {

  const testFn = () => {
    setTimeout(() => {
      return 20
    }, 3000);
  }

  const test2 = async() => {
    const value = await testFn

  }

  useEffect(() => {
    test2()
  }, [])

  return (
    <TestConext.Provider value={{}}>
      {props.children}

    </TestConext.Provider>
  )

}

export default TestConextProvider;
