import { User } from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user.id }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPassCorrect = await user.comparePassword(password);
  if (!isPassCorrect) {
    throw new UnauthenticatedError("Invalid password");
  }
  const token = user.createToken();
  res.status(StatusCodes.OK).json({ name: user.name, token });
};
