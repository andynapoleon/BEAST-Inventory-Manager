import User from "../models/User.js"; // we need the .js, unlike React importing

export const getUser = async (req, res) => {
  try {
    console.log("hi");
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
