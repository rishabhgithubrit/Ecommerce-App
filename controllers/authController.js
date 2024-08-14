import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import JWT from "jsonwebtoken"
export const registerController = async (req, res) => {
   try {
      const { name, email, password, phone, address, question } = req.body
      if (!name) {
         res.send({ error: 'Name is Required' })
      }
      if (!email) {
         res.send({ message: 'Email is Required' })
      }
      if (!password) {
         res.send({ message: 'Password is Required' })
      }
      if (!phone) {
         res.send({ message: 'Phone is Required' })
      }
      if (!address) {
         res.send({ message: 'Address is Required' })
      }
      if (!question) {
         res.send({ message: 'Question is Required' })
      }
      const existingUser = await userModel.findOne({ email })
      if (existingUser) {
         return res.status(200).send({
            success: false,
            message: "Already Registered Please Login"
         })
      }
      const hashedPassword = await hashPassword(password)
      const user = await new userModel({ name, email, phone, address, password: hashedPassword, question }).save()
      res.status(201).send({
         success: true,
         message: "User Register Successfully",
         user,
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: 'Error in Registeration',
         error,
      })
   }
}

export const loginController = async (req, res) => {
   try {
      const { email, password } = req.body
      if (!email || !password) {
         return res.status(404).send({
            success: false,
            message: "Invalid email or password"
         })
      }
      const user = await userModel.findOne({ email })
      if (!user) {
         return res.status(404).send({
            success: false,
            message: "Error is not registerd"
         })
      }
      const match = await comparePassword(password, user.password)
      if (!match) {
         return res.status(200).send({
            success: false,
            message: "Invalid Password"
         })
      }
      const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
      res.status(200).send({
         success: true,
         message: "login successfully",
         user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
         },
         token,
      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message: "Error in login",
         error
      })
   }
}
export const forgotPasswordController = async (req, res) => {
   try {
      const { email, question, newPassword } = req.body;
      if (!email) {
         res.status(400).send({ message: "Emai is required" });
      }
      if (!question) {
         res.status(400).send({ message: "question is required" });
      }
      if (!newPassword) {
         res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, question });
      //validation
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
         message: "Something went wrong",
         error,
      });
   }
};
export const testController = (req, res) => {
   res.send("Protected Route")
}
export const updateProfileController = async (req, res) => {
   try {
     const { name, email, password, address, phone } = req.body;
     const user = await userModel.findById(req.user._id);
     //password
     if (password && password.length < 6) {
       return res.json({ error: "Passsword is required and 6 character long" });
     }
     const hashedPassword = password ? await hashPassword(password) : undefined;
     const updatedUser = await userModel.findByIdAndUpdate(
       req.user._id,
       {
         name: name || user.name,
         password: hashedPassword || user.password,
         phone: phone || user.phone,
         address: address || user.address,
       },
       { new: true }
     );
     res.status(200).send({
       success: true,
       message: "Profile Updated SUccessfully",
       updatedUser,
     });
   } catch (error) {
     console.log(error);
     res.status(400).send({
       success: false,
       message: "Error WHile Update profile",
       error,
     });
   }
 };
 export const getAllOrdersController = async (req, res) => {
   try {
     const orders = await orderModel
       .find({})
       .populate("products", "-photo")
       .populate("buyer", "name")
       .sort({ createdAt: "-1" });
     res.json(orders);
   } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       message: "Error WHile Geting Orders",
       error,
     });
   }
 };
 export const orderStatusController = async (req, res) => {
   try {
     const { orderId } = req.params;
     const { status } = req.body;
     const orders = await orderModel.findByIdAndUpdate(
       orderId,
       { status },
       { new: true }
     );
     res.json(orders);
   } catch (error) {
     console.log(error);
     res.status(500).send({
       success: false,
       message: "Error While Updateing Order",
       error,
     });
   }
 }