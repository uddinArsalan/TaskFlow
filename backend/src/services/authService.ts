import {
  findUserByEmail,
  createUser,
  findUserById,
  findByIdAndUpdate,
} from "../db/dbOperations";
import { generateAccessAndRefreshToken } from "../db/dbOperations";
import { ApiError } from "../utils/ApiError";
import { verifyRefreshToken } from "../utils/authUtils";

export const authService = {
  async registerUser(name: string, email: string, password: string) {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }
    return await createUser({ name, email, password });
  },

  async loginUser(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    // check for password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid Credentials");
    }

    // Generate access and Refresh Tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user
    );

    const loggedInUser = await findUserById(user._id as string);

    return { accessToken, refreshToken, user: loggedInUser };
  },

  async refreshAccessToken(incomingRefreshToken: string | undefined) {
    if (!incomingRefreshToken) {
      throw new ApiError(400, "Refresh Token is Required!");
    }
    const decodedToken = await verifyRefreshToken(incomingRefreshToken);
    const user = await findUserById(decodedToken?._id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user);

    return { accessToken, refreshToken: newRefreshToken };
  },

  async logoutUser(userId: string) {
    await findByIdAndUpdate(userId);
  },
};
