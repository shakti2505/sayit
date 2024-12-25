import React from "react";
import { Button } from "../ui/button";
import conversationImage from "../../assets/images/conversation.jpg";


const HeroSection: React.FC = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Seamless Chat Links for Instant Communication
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        SayIt lets you create secure chat links effortlessly, making it easy
        to start conversations instantly.
      </p>
      <a href="/dashboard">
        <Button>
            Get Started
        </Button>
      </a>

      <div className="mt-12 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <img
          src={conversationImage}
          alt="Illustration"
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
