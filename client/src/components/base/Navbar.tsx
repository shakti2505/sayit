import React from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import GoogleLogin from '../auth/GoogleLogin'
import { GoogleOAuthProvider } from "@react-oauth/google";
const Navbar: React.FC = () => {

  const GoogleAuthWrapper = () => {
    // Access the Google Client ID from the environment variable
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    return (
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    );
  };

  
  return (
    <>
      <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold">SayIt</h1>
        <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <Dialog>
      <DialogTrigger asChild>
        <Button>Getting start</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to QuickChat</DialogTitle>
          <DialogDescription>
            QuickChat makes it effortless to create secure chat links and start
            conversations in seconds.
          </DialogDescription>
        </DialogHeader> 
        <GoogleAuthWrapper/>
      </DialogContent>
    </Dialog>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
