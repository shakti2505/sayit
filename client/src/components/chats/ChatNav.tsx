import React from "react";
import MobileChatSidebar from "./MobileChatSideBar";
import type { RootState } from "../../store/store"; // Import AppDispatch type
import { useSelector } from "react-redux";

interface ChatNavProps {
  setSerchMessage: (query: string) => void; // Function taking a string and returning void
}

const ChatNav: React.FC<ChatNavProps> = ({ setSerchMessage }: ChatNavProps) => {
  const { data } = useSelector(
    (ChatGroups: RootState) => ChatGroups.getGroupByID
  );

  return (
    <nav className=" flex justify-between items-center  px-6 py-2">
      <div className="flex space-x-4 md:space-x-0 items-center">
        <div className="md:hidden">
          <MobileChatSidebar />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
          {data?.name}
        </h1>
        <p></p>
      </div>
      <div>
        <input
          onChange={(e) => setSerchMessage(e.target.value)}
          type="text"
          placeholder="Search"
          className="outline-none bg-[#F4F4F5] rounded-full p-1 px-2 text-md w-48 transform transition-all duration-150 hover:w-96 focus:w-96 focus:ring-2 focus:ring-blue-500 ease-in-out"
        />
      </div>
    </nav>
  );
};

export default ChatNav;
