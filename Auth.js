import UserModel from "../models/User.js"
import bcryptjs from "bcryptjs"

/* ================= REGISTER ================= */
const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    const existUser = await UserModel.findOne({ email })
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please login!"
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword
    })

    await newUser.save()

    return res.status(201).json({
      success: true,
      message: "User registered successfully!"
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error!"
    })
  }
}

/* ================= LOGIN ================= */
const Login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!"
      })
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found. Please register!"
      })
    }

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password!"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error!"
    })
  }
}

export { Register, Login }
