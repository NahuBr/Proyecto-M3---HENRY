import { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  connectUser: () => {},
  disconnectUser: () => {},
  updateUserProfile: () => {} 
});


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    birthdate: '',
    nDni: 0,
    id: 0,
    profilePicture: '', 
  });

  const updateUserProfile = (newProfilePicture) => {
    setUser((prevUser) => ({
      ...prevUser,
      profilePicture: newProfilePicture,
    }));
  };

  const connectUser = (userData) => {
    setUser(userData);
    console.log(user);
    
  };

  const disconnectUser = () => {
    setUser({
      name: '',
      email: '',
      birthdate: '',
      nDni: 0,
      id: 0,
      profilePicture: '',
    });
  };

  const value = {
    user,
    connectUser,
    disconnectUser,
    updateUserProfile, 
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);