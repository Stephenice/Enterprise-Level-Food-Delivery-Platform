import { Request, Response } from "express";
import User from "../models/user";


/**
 * Retrieves the current user based on the provided user ID in the request.
 * @async
 * @param {Request} req - The request object containing the ID of the current user.
 * @param {Response} res - The response object to send back the result.
 * @returns {Promise<void>} A promise that resolves once the operation is completed.
 * @throws {Error} If there is an error during user retrieval.
 */
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



/**
 * Creates a new user or updates an existing user based on the provided request data.
 * @async
 * @param {Request} req - The request object containing user data.
 * @param {Response} res - The response object to send back the result.
 * @returns {Promise<void>} A promise that resolves once the operation is completed.
 * @throws {Error} If there is an error during user creation or retrieval.
 */
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};


/**
 * Updates the current user's information based on the provided request data.
 * @param req - The request object containing user data and the ID of the current user.
 * @param res - The response object to send back the result.
 * @returns A Promise<void> representing the asynchronous operation completion.
 * @throws If there is an error during user retrieval or updating.
 */

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};