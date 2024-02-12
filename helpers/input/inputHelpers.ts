import bcrypt from "bcryptjs";

const validateUserInput = (email: string, password: string): boolean => {
    return email.trim() !== '' && password.trim() !== '';
};


const comparePassword = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
};

export { validateUserInput, comparePassword };
