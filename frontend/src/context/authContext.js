import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const isAuth = async () => {
      try {
        const res = await fetch(
          '/getUser'
        );
        setUser(res)
      } catch (error) {
        setUser(null)
      }
    }
    isAuth()
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
