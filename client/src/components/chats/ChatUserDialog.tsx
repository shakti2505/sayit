import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { Button } from "../ui/button";
import {
  addNewUserToGroup,
  getAllGroupUsers,
} from "./services/chatGroupServices";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store"; // Import AppDispatch type

import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ChatUserDialog: React.FC<Props> = ({ open, setOpen }: Props) => {
  const { group_id } = useParams();
  const [newUser, setNewUser] = useState({
    name: "",
    passcode: "",
  });
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const navigate = useNavigate();

  const { data } = useSelector(
    (ChatGroups: RootState) => ChatGroups.getGroupByID
  );

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch

  // const logged_in_user = JSON.parse(localStorage.getItem("user") || "");

  // this function when hitting will check if the local store has data added User stored if not then it will store the new user,if passcode matched
  const onSubmit = async () => {
    const localData = localStorage.getItem(group_id as string);
    if (!localData || localData == null) {
      try {
        if (!group_id) {
          toast.error("Group ID is missing");
          return;
        }
        let payload = {
          user_id: loggedInUserId,
          name: newUser.name,
          group_id: group_id as string,
          chatgroup: data?._id?.toString() || "",
        };

        const res = await dispatch(addNewUserToGroup(payload));
        if (res.message === "User added Successfully in group.") {
          setOpen(false);
          dispatch(getAllGroupUsers(group_id));
        }
        localStorage.setItem(group_id as string, JSON.stringify(res.data));
      } catch (error) {
        toast.error("Something went wrong please try again");
      }
    }

    // checing if passcode matches with the entered passcode;

    if (data?.passcode !== newUser.passcode) {
      toast.error("Please enter correct passcode");
    } else {
      setOpen(false);
    }
  };

  // checking if user is already in added in the group then dialog to add a new user to group will not appear

  useEffect(() => {
    if (group_id) {
      const data = localStorage.getItem(group_id);
      const logged_in_user = localStorage.getItem("user") || "";
      if (data) {
        const JsonData = JSON.parse(data);
        console.log("json data", JsonData);
        const user = JSON.parse(logged_in_user);
        if (JsonData?.name && JsonData?.chatgroup) {
          setOpen(false);
        }

        if (user) {
          setLoggedInUserId(user.id);
        }
        if (!logged_in_user) {
          navigate(`/?gorup_id=${group_id}`);
        }
      }
      const user = JSON.parse(logged_in_user);
      if (user) {
        setLoggedInUserId(user.id);
      }
    }
  }, [group_id]);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>
            Add your name and passcode to join in room
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Input
            placeholder="Enter your name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="Enter your passcode"
            value={newUser.passcode}
            onChange={(e) =>
              setNewUser({ ...newUser, passcode: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <Button className="w-full" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatUserDialog;
