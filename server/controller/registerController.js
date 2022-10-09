// internal imports
import User from '../models/userSchema.js';

async function registerController(req, res, next) {
  try {
    const { name, email, phone, password, cPassword } = req.body;

    if (password !== cPassword) {
      res.status(400).json({
        success: false,
        Error: 'Password mismatched!',
      });
    } else {
      const newUser = new User({
        name,
        email,
        phone,
        password,
        cPassword,
      });
      console.log(newUser);

      res.status(201).json({
        success: true,
        result: newUser,
      });
      await newUser.save();
      next();
    }
  } catch (error) {
    next(error);
  }
}

export default registerController;
