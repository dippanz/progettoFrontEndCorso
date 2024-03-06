import { createContext, useState } from "react";


export const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {

  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
