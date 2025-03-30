import { useContext,createContext, useEffect, useState } from "react";
import { auth } from "../util/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const myContext = createContext();

export function ContextApp({children}){
     const [user, setUser] = useState(null);
     const [currentUserId, setCurrentUserId]=useState()
         // current user
const em = user&&user.email
console.log(em)
   
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
     
        return () => unsubscribe();
      }, []);
      const logout = async () => {
        
        try {        
          await signOut (auth);
          setUser(null);
        } catch (error) {
          console.error("Error Logging Out:", error.message);
        }
      };

      // currentUser
      const currentUser = async()=>{
        try{
          const response = await fetch(import.meta.env.VITE_PUBLIC_URL+'user/cu?email='+em)
          const result = await response.json();
          if(!result){
            console.log("Email not found")
          }
          console.log(result)
          setCurrentUserId(result.data)
        }
        catch(err){
          console.log(err)
        }
         
        }
  
  //  edit Current Report
  const [getEditReport, setEditReport]=useState()


  // chat 
  const [MessageId, setMessageId] = useState({
      userId:'',
      receiverId:''
     });

  const ContextValues ={
        logout,user, setUser,currentUserId, setCurrentUserId,currentUser,
        getEditReport, setEditReport, MessageId, setMessageId}

    return(
        <myContext.Provider value={ContextValues}>
            {children}
        </myContext.Provider>
    )
}

export const useCon = ()=>{
 return useContext(myContext)
}