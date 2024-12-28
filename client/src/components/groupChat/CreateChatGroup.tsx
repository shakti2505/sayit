import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUser } from "../../utils/criticalState";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "../../validations/groupChatValidation";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import { GROUP_CHAT_URL } from "../../utilities/apiEndPoints";
interface ChatGroupProps {
  // define your props here
}

const CreateChatGroup: React.FC<ChatGroupProps> = () => {
  const [Open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useUser();

  // const onSubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    console.log("the chat payload is: ", payload);

    try {
      setLoading(true);
      const {data} = await axios.post(
        GROUP_CHAT_URL,
        { ...payload },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if(data?.message){
        setLoading(false);
        setOpen(false);
        toast.success(data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Chat</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Your new chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 flex flex-col">
            <input placeholder="Enter Chat title " {...register("name")} />
            <span className="text-red-500">{errors?.name?.message}</span>
          </div>
          <div className="mt-4  flex flex-col">
            <input
              type="number"
              placeholder="Enter Passcode "
              {...register("passcode")}
            />
            <span className="text-red-500">{errors?.passcode?.message}</span>
          </div>
          <div className="mt-4 flex flex-col">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChatGroup;
