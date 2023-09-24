const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Company = require('../models/Company')

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: users || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

const getUserById = async (req, res) => {  
  try {
    const userFound = await User.findById({ _id: req.params.id });
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: userFound || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};

const signupUser = async (req, res) => {
  const {username, password, companyCode } = req.body;      
  try {
    const userFound = await User.findOne({ username: username })    
    if (userFound) {      
      return res.status(404).json({ ok: false, message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const companyFound = await Company.findOne({ code: companyCode })
    
    if (!companyFound) {
      return res.status(404).json({ ok: false, message: "the company code is invalid" });
    }
    const newUser = new User({
      username: username,
      password: hashedPassword,
      role: 'user',
      company_id: companyFound._id
    });    
    const userCreated = await User.create(newUser);    
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: userCreated || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
}


const signToken = ({ _id }) => {
  return jwt.sign({ _id }, process.env.SALT, {
    expiresIn: 60 * 60 * 24 * 365,
  })
}


const loginUser = async (req, res) => {
  const {username, password} = req.body;
  try {
    const userFound = await User.findOne({ username: username })    
    if (userFound == null) {      
      return res.status(404).json({ ok: false, message: "user or password invalid" });
    }    
    if (await bcrypt.compare(password, userFound.password)){
      const token = signToken({ _id: userFound._id })
      return res.status(201).json({
        ok: true,
        message: "Request successfully completed",
        data: { token },
      });
    }          
    return res.status(404).json({ ok: false, message: "user or password invalid" });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


const deleteUserById = async (req, res) => {  
  try {
    const userDeleted = await User.findByIdAndDelete({ _id: req.params.id });
    return res.status(201).json({
      ok: true,
      message: "Request successfully completed",
      data: userDeleted || [],
    });
  } catch (err) {
    return res.status(404).json({ ok: false, message: "Request failed", error: err });
  }
};


module.exports = { getUsers, getUserById, signupUser, loginUser, deleteUserById};