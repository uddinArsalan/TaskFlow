import { User, UserDocument } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

interface UserPayloadType {
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(
  email: string
): Promise<UserDocument | null> {
  return await User.findOne({ email });
}

export async function createUser(
  userData: UserPayloadType
): Promise<UserDocument> {
  return await User.create(userData);
}

export async function findUserById(id: string) {
  return await User.findById(id).select("-password -refreshToken");
}

export async function findByIdAndUpdate(id: string) {
  await User.findByIdAndUpdate(
    id,
    {
      $set: {
        refreshAccessToken: undefined,
      },
    },
    { new: true }
  );
}

export async function generateAccessAndRefreshToken(user: UserDocument) {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: true });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      400,
      "Something went wrong while generating access and refresh token"
    );
  }
}
