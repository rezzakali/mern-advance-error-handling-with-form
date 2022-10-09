// external imports

// internal imports
import User from '../models/userSchema.js';
import ErrorResponse from '../utilities/error.js';
import sendEmailMethod from '../utilities/sendEmail.js';

async function forgotPasswordController(req, res, next) {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse('Email could not be sent!', 404));
    }
    const resetPasswordToken = user.resetPassword();
    await user.save();

    const resetUrl = `http://${process.env.HOST_NAME}:${process.env.PORT}/forgot/${resetPasswordToken}`;

    const message = `
      <h1>You have requested to reset your password</h1>
      <p>Please go the link to reset your password </p>
      <a href=${resetUrl} clicktracking=off>${resetUrl} </a>
    `;

    // send the actual email
    try {
      sendEmailMethod({
        to: user.email,
        subject: 'Password reset request',
        text: message,
      });
      res.status(200).json({
        success: true,
        data: 'Email sent',
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      return next(new ErrorResponse('Email could not be sent!', 500));
    }
  } catch (error) {
    next(error);
  }
}

export default forgotPasswordController;
