import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Please provide a password of at least 6 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
