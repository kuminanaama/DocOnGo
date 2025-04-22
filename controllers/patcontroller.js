import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PatientModel } from "../models/patient.js";
import {
  loginPatientValidator,
  postValidator,
  registerPatientValidator,
} from "../validators/patientvalidators.js";
import { PostModel } from "../models/post.js";

//register user
export const registerPatient = async (req, res, next) => {
  //validate user info
  try {
    const { error, value } = registerPatientValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }

    // check if user exists
    const user = await PatientModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (user) {
      return res.status(409).json("Patient already exists");
    }

    //Hash Password
    const hashedpassword = bcrypt.hashSync(value.password, 10);
    const newUser = await PatientModel.create({
      ...value,
      password: hashedpassword,
    });
    return res
      .status(201)
      .json({ message: `Welcome ${value.username} to DocOnGo`, newUser });
  } catch (error) {
    next(error);
  }
};

//User login
export const loginPatient = async (req, res, next) => {
  //validate user info
  const { error, value } = loginPatientValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //find matching user record in database
  const user = await PatientModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("Patient does not exist!");
  }
  //compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("Invalid credentials!");
  }
  //generate access token for user
  const accessToken = jwt.sign(
    { id: user.id, role: "patient" },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  //return response
  res.status(200).json({ accessToken });
};

// Post request
export const postRequest = async (req, res, next) => {
  try {
    const { error, value } = postValidator.validate(
      { ...req.body, image: req.file?.filename },
      { abortEarly: false }
    );

    if (error) {
      return res.status(422).json(error);
    }

    const request = await PostModel.create(value);
    res.status(200).json({
      message: "New request created!",
      request: request,
    });
  } catch (error) {
    next(error);
  }
};

//Get request
export const getRequest = async (req, res, next) => {
  try {
    const request = await PostModel.find();
    res.status(200).json({
      message: "All requests",
      request,
    });
  } catch (error) {
    next(error);
  }
};

//Get one request
export const getRequestById = async (req, res, next) => {
  try {
    const request = await PostModel.findById(req.params.id, req.body);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

//Update request
export const updateRequest = async (req, res, next) => {
  try {
    const request = await PostModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file?.filename },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

//Delete Request
export const deleteRequest = async (req, res, next) => {
  try {
    const request = await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};
