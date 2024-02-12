import { Request, Response, NextFunction } from "express";
import CustomError from "../../helpers/error/CustomError";
import User from "../../models/User";

const checkEmailExists = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı", 400);
    }
    next();
  } catch (error) {
    next(error); 
  }
};

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Kullanıcıyı bul
    const user = await User.findById(req.params.userId);

    // Kullanıcı yoksa hata döndür
    if (!user) {
      return next(new CustomError("Kullanıcı bulunamadı", 404));
    }

    //  admin değilse hata döndür
    if (user.role !== "admin") {
      return next(new CustomError("Bu işlemi yalnızca adminler gerçekleştirebilir", 403));
    }

    // Kullanıcı admin ise, bir sonraki işlemi devam ettir
    next();
  } catch (error) {
    next(error); 
  }
};

export { checkEmailExists, checkAdmin };
