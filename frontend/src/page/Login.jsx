import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertCircle, Facebook, GithubIcon, MailPlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../util/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useCon } from "../controller/ContextController";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { user, setUser } = useCon();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [Eror, setEror] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function onSubmit() {
    try {
      if (!mode) {
        await login();
      } else {
        await signUp();
        const setReg = async () => {
          try {
            setLoading(true);
            await fetch(import.meta.env.VITE_PUBLIC_URL + "user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
            setLoading(false);
          } catch (err) {
            console.log("registration error", err);
          }
        };
        setReg();
      }
    } catch (error) {
      setLoading(false);
      setEror(true);
    } finally {
      setLoading(false);
    }
  }

  // Sign Up
  const signUp = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(userCredential.user);
      if (userCredential.user !== undefined) {
        setLoading(false);
        toast.success("Signup successfully");
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error("auth/email-already-in-use");
    } finally {
      setEror(false);
      setLoading(false);
    }
  };

  // Login
  const login = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEror(true);
    } finally {
      setLoading(false);
    }
  };

  // Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign-In Success:", result.user);
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <div className="h-[600px]  relative flex items-center  justify-center   p-4">



<div className="absolute top-0 left-0 z-0 h-full w-full ">
  <img src="https://tpkwireless.com/wp-content/uploads/2024/06/DALL%C2%B7E-2024-06-10-17.45.08-A-collage-of-various-tech-gadgets-of-2024-including-smart-home-devices-wearables-audio-devices-and-personal-mobility-devices.-The-image-should-be-.webp" className="object-center object-cover h-full w-full" alt="" />
</div>
      
      {/* overlay */}
      <div className="absolute bg-black/50 z-10  top-0 left-0 h-full w-full ">
      </div>

   

   <Card className="w-full max-w-md shadow-xl z-30  bg-white rounded-xl">
        <CardHeader className="inline-flex  flex-col  justify-start  space-y-2">
          <div className="flex items-center gap-2 text-sm bg-[#454545] w-max p-2 rounded-xl">
            <span className={!mode ? "font-semibold text-white" : "text-gray-300"}>
              Login
            </span>
            <Switch checked={mode}  onCheckedChange={setMode} />
            <span className={mode ? "font-semibold text-white" : "text-gray-300"}>
              Sign Up
            </span>
          </div>
          <h2 className="text-3xl text-[#fa771f] font-semibold text-center">
            {mode ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-600 text-center">
            {mode ? "Sign up to get started 🚀" : "Login to continue 🔑"}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md h-11"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md h-11 "
          />
          {mode && (
            <Input
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
              className="rounded-md h-11"
            />
          )}

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onSubmit}
          >
            {mode ? "Sign Up" : "Login"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-700">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <MailPlus
              size={32}
              className="cursor-pointer border border-gray-300 rounded-full p-2 bg-blue-50 hover:text-blue-600 transition"
              onClick={signInWithGoogle}
            />
            <Facebook
              size={32}
              className="cursor-pointer border border-gray-300  rounded-full p-2 bg-blue-50 hover:text-blue-600 transition"
            />
            <GithubIcon
              size={32}
              className="cursor-pointer border border-gray-300 rounded-full p-2 bg-blue-50 hover:text-gray-800 transition"
            />
          </div>

          {/* Error */}
          {Eror && (
            <Alert variant="destructive" className="mt-4 bg-white">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unauthorized</AlertTitle>
              <AlertDescription>
                Your email or password is incorrect. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>



      {/* Loader Overlay */}
      {Loading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <p className="loader"></p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
