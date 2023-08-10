import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = password === user.password;
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const isAdmin = user.role !== "user";
    console.log(user.role);
    console.log(isAdmin);
    if (!isAdmin) return res.status(400).json({ msg: "A user cannot login. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // creating the token to send to the front-end, the client will send this along in the next requests so the server knows that they're trustworthy (authorization)

    delete user.password; // delete the password so it's not sent to the front-end (delete from the User object)
    res.status(200).json({ token, user }); // send the token and the user object to the front-end as a JSON OBJECTs
  } catch (err) {
    res.status(500).json({ error: err.message }); // send error message
  }
};
