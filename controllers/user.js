import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { registerUserValidator, loginUserValidator } from "../validators/user.js";

export const registerUser = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = registerUserValidator.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Check if user does not exist
    const user = await UserModel.findOne({ email: value.email });
    if (user) {
      return res.status(409).json({ error: { message: 'User already exist!' } });
    }
    // Encrypt user password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Create user
    await UserModel.create({
      ...value,
      password: hashedPassword
    });
    // Return response
    res.status(201).json({ data: { message: 'User Registered' } });
  } catch (error) {
    // Handle duplicate field error code
    if (error.code === 11000) {
      return res.status(409).json({ error: { message: error.message } });
    }
    // Allow next to take over the rest
    next(error);
  }
}

export const loginUser = async (req, res, next) => {
  try {
    // Validate request
    const { value, error } = loginUserValidator.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(422).json({ error: { message: error.message } });
    }
    // Find a user with their unique identifier
    const user = await UserModel.findOne({ email: value.email });
    if (!user) {
      return res.status(401).json({ error: { message: 'User Not Found' } });
    }
    // Verify their password
    const correctPassword = bcrypt.compareSync(value.password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ error: { message: 'Invalid Credentials' } });
    }
    // Create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '72h' }
    );
    // Return response
    res.status(200).json({
      data: {
        message: 'User Logged In',
        accessToken: token
      }
    });
  } catch (error) {
    next(error);
  }
}

export const getProfile = async (req, res, next) => {
  try {
    // Find user by id
    const user = await UserModel.findById(req.auth.id)
      .select({ password: false });
    // Return response
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}