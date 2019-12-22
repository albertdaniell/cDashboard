import React from 'react';
import PageLayout from './components/PageLayout';
import UserContextProvider, {UserContext} from './contexts/UserContext';

function App() {
  return (
    <div className="">
      <UserContextProvider>
        <PageLayout></PageLayout>
      </UserContextProvider>
    </div>
  );
}

export default App;
