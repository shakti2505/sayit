import React from "react";
import { Button } from "../ui/button";


const Navbar: React.FC = () => {
  return (
    <>
     <nav className="p-6 flex justify-between items-center bg-white shadow-sm">
      <h1 className="text-xl md:text-2xl font-extrabold">SayIt</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <a href="/">Home</a>
        <a href="#features">Features</a>
        <a href="/dashboard">
        <Button>Dashboard</Button>
        </a>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
