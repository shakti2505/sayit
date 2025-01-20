import axios from "axios";
import {
  getGroupByIdFailure,
  getGroupByIdStart,
  getGroupByIdSuccess,
} from "../slices/ChatGroupByIdSlice";
import {
  getAllChatGroupUser_Start,
  getAllChatGroupUser_Success,
  getAllChatGroupUsers_Failure,
} from "../slices/ChatGroupUserSlice";
import { AppDispatch } from "../../../store/store";
import { toast } from "sonner";
import {
  ADD_NEW_USER_TO_GROUP,
  GENERATE_GROUP_LINK,
  GET_GROUP_CHAT_BY_ID_URL,
  GET_GROUP_USERS_BY_ID_URL,
} from "../../../utilities/apiEndPoints";
// import { AddNewUserToGroupSchemaType } from "../../../validations/addNewUserToGroupValidation";
import {
  addNewUserToGroup_failure,
  addNewUserToGroup_start,
  addNewUserToGroup_success,
} from "../slices/AddNewUserToGroupSlice";

// get group by ID (public);
export const getGroupsByID = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(getGroupByIdStart());
  try {
    const { data } = await axios.get(GET_GROUP_CHAT_BY_ID_URL(id));
    dispatch(getGroupByIdSuccess(data.data));
    toast.success(data?.message);
  } catch (error) {
    dispatch(
      getGroupByIdFailure(`Error in Fetching chats of group with IDL${id}`)
    );
    return error;
  }
};

// getAllGroupUser

export const getAllGroupUsers =
  (group_id: string) => async (dispatch: AppDispatch) => {
    dispatch(getAllChatGroupUser_Start());
    try {
      const { data } = await axios.get(GET_GROUP_USERS_BY_ID_URL(group_id));
      dispatch(getAllChatGroupUser_Success(data.data));
      toast.success(data?.message);
      return data;
    } catch (error) {
      dispatch(
        getAllChatGroupUsers_Failure(
          `Error in Fetching chats of group with IDL${group_id}`
        )
      );
      return error;
    }
  };

// add new User to group

type payload = {
  name: string;
  group_id: string;
  chatgroup: string;
  user_id: string;
};

export const addNewUserToGroup =
  (payload: payload) => async (dispatch: AppDispatch) => {
    dispatch(addNewUserToGroup_start());
    try {
      const { data } = await axios.post(ADD_NEW_USER_TO_GROUP, { ...payload });
      dispatch(addNewUserToGroup_success(data.data));
      toast.success(data.message);
      return data;
    } catch (error) {
      dispatch(addNewUserToGroup_failure("Something went wrong"));
      toast.error("Something went wrong. Please try again!");
      return error;
    }
  };

export const generateGroupLink = async (groupID: string) => {
  try {
    const res = await axios.post(GENERATE_GROUP_LINK(groupID));
    if (res.status !== 200) {
      toast.error("unable to generate Link");
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
