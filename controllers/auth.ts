import CustomError from "../helpers/error/CustomError";
import User from "../models/User";
import { validateUserInput, comparePassword } from "../helpers/input/inputHelpers";
import { Request, Response, NextFunction } from "express";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);
    await user.save();

    return res.status(200).json({
      message: "Kayıt Başarılı",
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!validateUserInput(email, password)) {
      return next(new CustomError("Lütfen giriş bilgilerinizi kontrol edin", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!comparePassword(password, user.password)) {
      return next(new CustomError("Hatalı şifre", 400));
    }
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    next(err);
  }
};

export { register, login };
