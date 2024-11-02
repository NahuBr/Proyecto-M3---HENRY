import { createContext, useState } from "react";

export const userContext = createContext({
        user:{},
        connectUser:()=>{},
        disconnectUser:()=>{}
  }
)

  export const UserProvider = ({children}) =>{

    const [user,setUser] = useState({
        name:'',
        email:'',
        birthdate:'',
        nDni:0,
        id:0,
    })

    
    const connectUser = (userData) => { 
      setUser(userData)
    }

    const disconnectUser = () => {
      setUser({
        name:'',
        email:'',
        birthdate:'',
        nDni:0,
        id:0,
    })
    }
    
    const value = {
      user,
      connectUser,
      disconnectUser,
    }

    return(
        <>
        <userContext.Provider value={value}>{children}</userContext.Provider>
        </>
    )
  }