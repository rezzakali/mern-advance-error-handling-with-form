// external imports
import jwt from 'jsonwebtoken';

// internal imports
import User from '../models/userSchema.js';
import ErrorResponse from '../utilities/error.js';

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Unauthorized user!', 401));
  }
  // verify the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('User not found!', 404));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return next(
      new ErrorResponse(`Unauthorized user not access the data`, 401)
    );
  }
};

export default auth;
