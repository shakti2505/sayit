import ChatGroupModal from "../modals/chatGroupModal.js";

// create group
export const createGroup = async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    await ChatGroupModal.create({
      name: body.name,
      passcode: body.passcode,
      user_id: user._id,
    });

    return res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// get all grouo created by user
export const getAllGroupOfUser = async (req, res) => {
  try {
    const user = req.user;
    const groups = await ChatGroupModal.find({ user_id: user._id }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ message: "Chat Groups fetched successfully", groups: groups });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// get group by Id
export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await ChatGroupModal.findById(id);
    return res
      .status(200)
      .json({ message: "Chat Group fetched successfully", data: group });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// update group
export const updateGroup = async (req, res) => {
  try {
    const { name, passcode } = req.body;
    const { id } = req.params;
    const updatedGroup = await ChatGroupModal.findByIdAndUpdate(
      id,
      { $set: { name: name, passcode: passcode } },
      { new: true } // return the updated document
    );
    return res
      .status(201)
      .json({ message: "Group updated successfully", data: updatedGroup });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// delete group

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await ChatGroupModal.findByIdAndDelete(id);
    return res.status(200).json({ message: "Group Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
