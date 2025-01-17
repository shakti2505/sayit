import axios from "axios";
// import {
//   groupChatStart,
//   groupChatfailure,
//   groupChatsuccess,
// } from "../slices/GroupChatsSlices";
import {
  getGroupChatStart,
  getGroupChatfailure,
  getGroupChatsuccess,
} from "../slices/getGroupChatsSlice";
import { AppDispatch } from "../../../store/store";
import { GET_GROUP_CHATS_URL } from "../../../utilities/apiEndPoints";
import { toast } from "sonner";

// save chats
// export const saveChats = () => async (dispatch:AppDispatch) => {

//     dispatch(groupChatStart());
//     try {
//         const {data} = await axios.post()
//     } catch (error) {

//     }
// };

// get chats

export const getGroupChatsByID =
  (group_id: string) => async (dispatch: AppDispatch) => {
    dispatch(getGroupChatStart());
    try {
      const res = await axios.get(GET_GROUP_CHATS_URL(group_id));
      dispatch(getGroupChatsuccess(res.data.data));
      toast.success(res.data.message);
    } catch (error) {
      dispatch(getGroupChatfailure("failed to fetch chats"));
      return error;
    }
  };
