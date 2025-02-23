import React from 'react';
import UserContext from './components/UserContext';
import UserDetails from './components/UserDetails';
import UserProfile from './components/UserProfile';


function App () {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com", age: "25", bio: "Loves hiking and photography" }
  return (
  <UserContext.Provider value={userData}>
    <UserDetails />
    <UserProfile />
    </UserContext.Provider>
  );
  };

export default App;