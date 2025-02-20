import React from 'react';
import UserContext from './components/UserContext';

import UserDetails from './components/UserDetails';


function App () {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
  <UserContext.Provider value={userData}>
    <UserDetails />;
    </UserContext.Provider>
  );
  };

export default App;