import { createContext,useState } from "react";

// it was created bec the header section was not auto updated to the create a new post and logout 

export const UserContext = createContext({})

export function UserContextProvider({children}) {
    const [userInfo,setUserInfo] = useState({});
    return (
      <UserContext.Provider value={{userInfo,setUserInfo}}>
        {children}
      </UserContext.Provider>
    );
  }