import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserAvatar from "../common/UserAvatar";
const Logout = React.lazy(() => import("./Logout"));

const ProfileMenu: React.FC = () => {
  const [logoutOpen, setlogoutOpen] = useState(false);

  return (
    <>
      {logoutOpen && (
        <Suspense fallback={<p>Loadig...</p>}>
          <Logout open={logoutOpen} setOpen={setlogoutOpen} />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setlogoutOpen(true)}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
