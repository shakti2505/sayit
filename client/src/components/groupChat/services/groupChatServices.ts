import axios from "axios";
import {
  DELETE_GROUP_CHAT_URL,
  GET_GROUP_CHAT_URL,
  GROUP_CHAT_URL,
  UPDATE_GROUP_CHAT_URL,
} from "../../../utilities/apiEndPoints";
import { createChatSchemaType } from "../../../validations/groupChatValidation";
import { toast } from "sonner";
import { AppDispatch } from "../../../store/store";
import {
  createGroupChatFailure,
  createGroupChatStart,
  createGroupChatSuccess,
} from "../slices/groupChatSlice";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "../slices/getChatGroupSlice";
import {
  updateGroupStart,
  updateGroupSuccess,
  updateGroupFailure,
} from "../slices/updateChatGroupSlice";

// fetching public_key from localstorage
const userData = localStorage.getItem("user");
const logged_in_user_data = userData ? JSON.parse(userData) : null;

// api call for the create chat group api
export const createChatGroup =
  (payload: createChatSchemaType, token: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(createGroupChatStart());
    try {
      const { data } = await axios.post(
        GROUP_CHAT_URL,
        { ...payload, key: logged_in_user_data.public_key },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(createGroupChatSuccess(data));
      toast.success(data?.message);
      return data;
    } catch (error) {
      dispatch(createGroupChatFailure("Something went wrong"));
      toast.error("Something went wrong. Please try again!");
      return error;
    }
  };

// get groups
export const getGroups = () => async (dispatch: AppDispatch) => {
  dispatch(getGroupsStart());
  try {
    const { data } = await axios.get(GET_GROUP_CHAT_URL, {
      withCredentials: true,
    });
    dispatch(getGroupsSuccess(data.groups));
    toast.success(data?.message);
    return data;
  } catch (error) {
    dispatch(
      getGroupsFailure("Error in fetching chat groups, Please try again!")
    );
    return error;
  }
};

// delete group
export const deleteGroup = async (id: string) => {
  try {
    const { data } = await axios.delete(DELETE_GROUP_CHAT_URL(id), {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};

// update group
export const updateChatGroup =
  (payload: createChatSchemaType, id: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(updateGroupStart());
    try {
      const { data } = await axios.put(
        UPDATE_GROUP_CHAT_URL(id),
        {
          ...payload,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(updateGroupSuccess(data));
      toast.success(data?.message);
      return data;
    } catch (error) {
      dispatch(updateGroupFailure("Something went wrong"));
      toast.error("Something went wrong. Please try again!");
      return error;
    }
  };

// get group By UUID(public page);
