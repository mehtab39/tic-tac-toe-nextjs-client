import { useSession } from 'next-auth/react';
import React from 'react';

export const UserContext = React.createContext(null);

export function UserProvider({ children }) {
  const { data, status } = useSession();
  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';
  return (
    <UserContext.Provider value={{
      loggedInUserInfo: data?.user,
      isLoggedIn,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
}

