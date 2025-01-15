import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store"; // Import AppDispatch type
import {
  updateGroupChatSchema,
  updateGroupChatSchemaType,
} from "../../../validations/updateGroupChatvalidation";
import { updateChatGroup } from "../services/groupChatServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../../common/Loader";

interface EditDialogProps {
  groupId: string;
  openEditDialog: boolean;
  passcode: string;
  setOpenEditDiolog: Dispatch<SetStateAction<boolean>>;
  // define your props here
}

const EditGroup: React.FC<EditDialogProps> = ({
  openEditDialog,
  setOpenEditDiolog,
  groupId,
}: EditDialogProps) => {
  // State from  get Group slices
  const { data } = useSelector(
    (getChatGroup: RootState) => getChatGroup.getChatGroup
  );

  // state from update group slice
  const { loading } = useSelector(
    (updateChatGroup: RootState) => updateChatGroup.updateGroup
  );

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch(); // Typed dispatch

  const group = data.find((item) => item._id === groupId);
 
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<updateGroupChatSchemaType>({
    resolver: zodResolver(updateGroupChatSchema),
  });
  

  const onSubmit = async (payload: updateGroupChatSchemaType) => {
    const res = await dispatch(updateChatGroup(payload, groupId));
    if (res.message === "Group updated successfully") {
      setOpenEditDiolog(false);
    }
  };

  useEffect(() => {
    if (group) {
      setValue("name", group.name);
      setValue("passcode", group.passcode);
    }
  }, [group, setValue]); 

  return (
    <>
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDiolog}>
        <DialogContent
          className=""
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogDescription>
              Make changes to your group here. Click save when you're done.
            </DialogDescription>
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
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditGroup;
