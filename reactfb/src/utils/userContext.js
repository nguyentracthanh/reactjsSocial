import React,{useState} from 'react'


const initialAccount = null;

export const UserContext=React.createContext()

const UserProvider = (props) => {
    const [userData, setUserData] = useState(initialAccount);
 
 const onSignIn=(accountData)=>{
    setUserData(accountData);
};
return (<UserContext.Provider value={{userData,onSignIn}} {...props}/>)
}
export default UserProvider;
