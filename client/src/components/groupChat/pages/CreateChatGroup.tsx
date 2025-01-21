import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "../../../validations/groupChatValidation";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { createChatGroup } from "../services/groupChatServices";
import type { AppDispatch, RootState } from "../../../store/store"; // Import AppDispatch type
import { useUser } from "../../../utils/criticalState";
import Loader from "../../common/Loader";

const CreateChatGroup: React.FC = () => {
  const { token } = useUser();

  const [open, setOpen] = useState(false);
  // using the state from coponent slice
  const { loading } = useSelector(
    (creteChatGroupState: RootState) => creteChatGroupState.createChatGroupApi
  );

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    if (token) {
      const res = await dispatch(createChatGroup(payload, token));
      if (res.message === "Group created successfully") {
        setOpen(false);
        localStorage.setItem(
          res.data._id as string,
          JSON.stringify({
            user_id: res.data.group_admin,
            name: res.data.name,
            chatgroup: res.data._id,
          })
        );
      }
    } else {
      console.error("Token is undefined");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Your new chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-col">
            <input
              placeholder="Enter Chat title "
              {...register("name")}
              className="px-2 border rounded-full h-8"
            />
            <span className="text-red-500">{errors?.name?.message}</span>
          </div>
          <div className="mt-4 flex flex-col">
            <input
              type="number"
              placeholder="Enter Passcode "
              className="px-2 border rounded-full h-8"
              {...register("passcode")}
            />
            <span className="text-red-500">{errors?.passcode?.message}</span>
          </div>
          <div className="mt-4 flex flex-col">
            <Button className="w-full" disabled={loading}>
              {loading ? <Loader /> : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatGroup;
