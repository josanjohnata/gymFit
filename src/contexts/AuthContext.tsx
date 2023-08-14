import { createContext, ReactNode, useEffect, useState } from 'react';

import { storageUserGet, storageUserSave, storageUserRemove } from '@storage/storageUser';

import { api } from '@services/api';

import { UserDTO } from '@dtos/UserDTO';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password});

      if(data.user && data.token) {
        setUser(data.user);
        storageUserSave(data.user)
      }
    } catch (error) {
      throw error;
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();

      if(userLogged) {
        setUser(userLogged);
      }

    } catch (error) {
      throw error;
      
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserStorageData
      }}>
      {children}
    </AuthContext.Provider>
  )
};
