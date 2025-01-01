import React from "react";
import ProfileMenu from "../auth/ProfileMenu";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";

interface Props {
  // define your props here
}

const DashNav: React.FC<Props> = () => {
  // const { user, image } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="p-6 flex justify-between items-center bg-white shadow-sm fixed w-full z-20 top-0">
      <h1 className="text-xl md:text-2xl font-extrabold">SayIt</h1>
      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <ProfileMenu/>
      </div>
    </nav>
  );
};

export default DashNav;
