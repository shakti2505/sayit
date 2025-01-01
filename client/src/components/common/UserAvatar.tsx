import React from "react";
import {
  Avatar,
  AvatarImage,
} from "../../components/ui/avatar";
import { useUser } from "../../utils/criticalState";

const UserAvatar: React.FC = () => {
  const { image } = useUser();

  //   const { user, image } = useSelector((state: RootState) => state.auth);
  //   const user = localStorage.getItem("user");
  //   let userinfo = { name: "", image: "" };
  //   if (user) {
  //       userinfo = JSON.parse(user);
  //   }
  //   const { name, image } = userinfo;

  return (
    <Avatar>
      <AvatarImage src={image} />
      {/* <AvatarFallback>{name}</AvatarFallback> */}
    </Avatar>
  );
};

export default UserAvatar;
