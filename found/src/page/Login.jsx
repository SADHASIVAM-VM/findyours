import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Facebook, Gem, GithubIcon, MailPlus } from "lucide-react";
import { Switch } from "@/components/ui/switch"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../util/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useCon } from "../controller/ContextController";




const LoginPage = () => {


    const [formData, setFormData] = useState({
        email:"",
        password:"",
        name:""
    });

const [mode, setMode]=useState(false);

function handleChange(e){
    const {name, value} = e.target;
    
        setFormData({...formData, [name]:value})
       


}

async function onSubmit(){
    try {
        if (!mode) {
          await login();
        } else {
          await signUp();
          const setReg =async()=>{
           try{
            await fetch(import.meta.env.VITE_PUBLIC_URL+'user',{
              method:"POST",
              headers:{
               "Content-Type":"application/json"
              },
              body:JSON.stringify(formData)
            })
           }
           catch(err){
            console.log("registration error", err)
           }
          }
            setReg();
          
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
  

}

  // Sign Up
  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setUser(userCredential.user);
      console.log("User Signed Up:", userCredential.user);
    } catch (error) {
      console.error("Error Signing Up:", error.message);
    }
  };

  // Login
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      setUser(userCredential.user);
      console.log("User Logged In:", userCredential.user);
    } catch (error) {
      console.error("Error Logging In:", error);
    }
  };
  const googleProvider = new GoogleAuthProvider();

//   google 
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Success:", result.user);
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };
  




  return (
    <div className=" h-[90vh] p-5">
<div className="flex bg-[#f2f2f2] gap-5  rounded-lg justify-center h-full w-full p-3">
    
      <div
        className="md:w-2/3 hidden rounded-lg md:flex bg-cover bg-center"
        style={{ backgroundImage: "url('/loginImg.png')" }}
      ></div>
      
      {/* Form */}
      <div className="md:w-1/3 h-full w-full flex flex-col items-center justify-center relative">
      <div className="flex w-full justify-start absolute top-0">
<div className="flex gap-2 text-[12px] bg-white p-3 rounded-lg ">
        <p>login</p>
      
                    <Switch
                      onCheckedChange={(e)=>setMode(e)} />
        <p>SignUp</p>
      </div>
</div>

    
     
        <Card className="w-full border-none shadow-none bg-[#f2f2f2]  p-6 transition-all">
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold text-center">{!mode?"LogIn":"Sign up"}</h2>
            <Input type="email" name="email" placeholder="Email" className="w-full rounded-none border-black " value={formData.email} onChange={handleChange}/>
            <Input type="password" name="password" placeholder="Password" value={formData.password}  onChange={handleChange} className="w-full rounded-none border-black 
           " />
           {
            mode&&<Input  name="name" placeholder="user name" className="w-full rounded-none border-black " value={formData.name} onChange={handleChange}/>
           }

            <Button className="w-full" onClick={onSubmit}>
                {!mode?"Login":"Sign up"}
</Button>
            
            {/* Social Login */}
            <div className="flex flex-col justify-center space-x-4 pt-4">
                <div className="flex w-full items-center gap-2">
                    <hr className="border-[#cbcbcb] border flex-1" />
                    <p>continue with</p>
                    <hr className="border-[#cbcbcb] border flex-1" />
                </div>
            
            <div className="flex gap-2 justify-center mt-5">
            <MailPlus size={'28px'} className=" cursor-pointer border-[#cbcbcb] border rounded-full p-1 hover:text-blue-500 transition-all hover:-translate-y-1.5" onClick={signInWithGoogle}/>
            <Facebook size={'28px'} className=" border-[#cbcbcb] border rounded-full p-1 cursor-pointer hover:text-blue-500 transition-all hover:-translate-y-1.5" />
            <GithubIcon size={'28px'} className=" cursor-pointer border-[#cbcbcb] border rounded-full p-1  hover:text-blue-500 transition-all hover:-translate-y-1.5" />
            </div>
            </div>
          </CardContent>
        </Card>

{/* error validatation */}
        {/* <Alert variant="destructive" className="bg-red-100 w-full">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your Email or Password is Wrong. Please log in again.
      </AlertDescription>
    </Alert> */}
      </div>
    </div>

    </div>
    
  );
};

export default LoginPage;
