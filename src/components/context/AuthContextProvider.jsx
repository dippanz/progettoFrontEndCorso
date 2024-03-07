import { createContext, useState } from "react";


export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    ruoli : []
  });

  const [isLogged, setIsLogged] = useState(false)

   

  return (
    <>
      <AuthContext.Provider value={{ user, setUser, isLogged, setIsLogged }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
