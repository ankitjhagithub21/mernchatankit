const User = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSec = process.env.JWT_SECRET || "your_secret_key";

const genToken = (payload) => {
  return jwt.sign(payload, jwtSec, { expiresIn: "1d" });
};

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 86400000, //1 day in miliseconds
};

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({
          message: "Please enter valid email address.",
          success: false,
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist.", success: false });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Please enter strong password.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = genToken({ id: newUser._id });

    res.cookie("token", token, options);

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({
          message: "Please enter valid email address.",
          success: false,
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found.", success: false });
        
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({message:"Wrong credentials", success:false})
    }


    const token = genToken({id:user._id});

    res.cookie('token', token, options)


    return res.status(200).json({
        message:`Welcome back ${user.fullname}`,
        success:true,
        user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email
        }
    })
    

  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const logout = async(req,res) => {
   return res.clearCookie('token').status(200).json({message:"Logout successfull", success:true})
}

module.exports = {
    register, 
    login,
    logout
}
