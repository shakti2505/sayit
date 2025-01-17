import GroupUsersModal from "../modals/groupUsersModal.js";

// get All group users by group_id

export const getGroupUsers = async (req, res) => {
  try {
    const { group_id } = req.params;
    const users = await GroupUsersModal.find({
      chatgroup: group_id,
    }).sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: "Group Users Fetched Successfully.", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// store user in group

export const storeUsersInGroup = async (req, res) => {
  try {
    const { name, chatgroup, user_id } = req.body;
    const user = await GroupUsersModal.create({
      name,
      chatgroup,
      user_id,
    });
    console.log(user);
    return res
      .status(200)
      .json({ message: "User added Successfully in group.", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
