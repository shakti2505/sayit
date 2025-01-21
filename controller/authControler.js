// auth controler
import axios from "axios";
import { oauth2Client } from "../utils/googleConfig.js";

import UserModal from "../modals/userModal.js";
import Jwt from "jsonwebtoken";

const maxAge = 3 * 60 * 60;

export const googleLogin = async (req, res) => {
  try {
    const { code, key } = req.query;
    const result = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(result.tokens);
    const userResponse = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${result.tokens.access_token}`
    );
    const { email, name, picture } = userResponse.data;
    let user = await UserModal.findOne({ email: email });
    if (!user) {
      user = await UserModal.create({
        name: name,
        email: email,
        image: picture,
        public_key: key,
      });
    }
    const { _id } = user;
    // creating jwt token to pass it to the client
    const token = Jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 5000 });
   
    return res
      .status(200)
      .json({ message: "success", token, user, user_id: _id  });
  } catch (err) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// save public keys

const saveUserPublicKey = () => {
  try {
  } catch (error) {}
};
