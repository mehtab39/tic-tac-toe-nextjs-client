import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signIn = useCallback(async (formData) => {
        try {
            // Make a POST request to your sign-in endpoint
            const response = await axios.post('http://localhost:8081/api/signin', formData);
            // Handle successful sign-in
            setData({user:response.data})
            setIsLoggedIn(true);
        } catch (error) {
            // Handle sign-in error
            console.error('Sign-in failed:', error);
              setIsLoggedIn(false);
      setStatus('error')
        }
     
  }, [])

    const createAccount = useCallback(async (formData) => {
        try {
            // Make a POST request to your sign-in endpoint
            const response = await axios.post('http://localhost:8081/api/create-account', formData);
            // Handle successful sign-in
            setData({user:response.data})
            setIsLoggedIn(true);
        } catch (error) {
            // Handle sign-in error
            console.error('Sign-in failed:', error);
            setIsLoggedIn(false);
           setStatus('error')
        }
     
  }, [])

  return (
    <UserContext.Provider value={{
      loggedInUserInfo: data?.user,
      isLoggedIn,
      isLoading: status === 'loading',
      signIn,
      createAccount
    }}>
      {children}
    </UserContext.Provider>
  );
}

