import {
  Document,
  Schema,
  Model,
  model,
  models,
  HydratedDocument,
} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config/constants";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
}

interface IUserMethods {
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => Promise<string>;
  generateRefreshToken: () => Promise<string>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: this._id, email: this.email, name: this.name },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRY,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        if (token) resolve(token);
      }
    );
  });
};

userSchema.methods.generateRefreshToken = async function () {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: this._id },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        if (token) resolve(token);
      }
    );
  });
};

export const User = models?.User || model<IUser, UserModel>("User", userSchema);
