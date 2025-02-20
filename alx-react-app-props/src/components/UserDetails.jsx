
import React, { useContext } from 'react';

import UserContext from './UserContext';

const  UserDetails = () => {
    const userData = useContext(UserContext);

    if (!userData){
      return <p>Error: No context provided</p>;
    }
    const { name, email } = userData;
    return (
      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
      </div>
    );
  }
  
  export default UserDetails;