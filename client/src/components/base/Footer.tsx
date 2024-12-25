import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between">
        <div>
          <div>© 2024 QuickChat. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <Link to="/privacy policy">Privacy Policy</Link>
            <Link to="">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            placeholder="Subscribe to our newsletter"
            className="bg-gray-800 border-none"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
