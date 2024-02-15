import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const signupController = async (req, res) => {

    try {
        const { username, email, password, answer, address, role } = req.body

        if (!username) {
            return res.send({ message: 'Username is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email is Required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is Required' })
        }
        if (!address) {
            return res.send({ message: 'Address is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password is Required' })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered Email Id please Login'
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = await new userModel({ username, email, password: hashedPassword, answer, address, role }).save()

        res.status(200).send({
            success: true,
            message: 'Sign Up Successfully',
            user
        })
    } 
    
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Sign Up Failed!',
            error
        })
    }
};

export const loginController = async (req, res) => { 
    try {
        
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or password'
            })
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).send({
                success:false,
                message: 'Email is not registered'
            })
        }

        const match = await comparePassword(password, user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message: 'Invalid Password'
            })
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        console.log("role" + user.role);
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            },
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    
    const user = await userModel.findOne({ email, answer });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

