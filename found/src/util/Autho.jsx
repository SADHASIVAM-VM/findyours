import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");





  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User Logged Out");
    } catch (error) {
      console.error("Error Logging Out:", error.message);
    }
  };

  return (
    <div>
      <h2>{user ? `Welcome, ${user.email}` : "Sign Up / Login"}</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      
<button >Sign In with Google</button>;


      <button onClick={signUp}>Sign Up</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
