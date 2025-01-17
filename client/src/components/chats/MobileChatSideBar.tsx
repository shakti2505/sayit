"use client";
import { useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import type { RootState } from "../../store/store"; // Import AppDispatch type

export default function   MobileChatSidebar() {
  const { data } = useSelector(
    (ChatGroupUsers: RootState) => ChatGroupUsers.getAllGroupUsers
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="bg-muted">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Users</SheetTitle>
        </SheetHeader>
        <div>
          {data?.length !== 0 &&
            data.map((item, index) => (
              <div key={index} className="bg-white rounded-md p-2 mt-2">
                <p className="font-bold"> {item.name}</p>
                <p>
                  Joined :{" "}
                  <span>{new Date(item.createdAt).toDateString()}</span>
                </p>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
