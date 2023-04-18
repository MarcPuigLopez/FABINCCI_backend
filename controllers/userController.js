import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWS from "../helpers/generateJWS.js";
import { emailRecovery, emailRegister } from "../helpers/email.js";

// Registro de usuario
const registerUser = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("User already exists");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    const userSaved = await user.save();
    res.json({
      msg: "User created correctly, chek your email to confirm your account",
    });

    // Enviar email de confirmación
    emailRegister({
      email: userSaved.email,
      nombre: userSaved.nombre,
      token: userSaved.token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "There was an error" });
  }
};

// Autenticar el usuario
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("The User doesn't exist");
    return res.status(404).json({ msg: error.message });
  }

  // Combrobar si el usuario esta confirmado
  if (!user.confirmed) {
    const error = new Error("The User is not confirmed");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el password es correcto
  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
      token: generateJWS(user._id),
    });
  } else {
    const error = new Error("The password is incorrect");
    return res.status(400).json({ msg: error.message });
  }
};

// Confirmación de usuario
const confirmUser = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  console.log(userConfirm)
  if (!userConfirm) {
    const error = new Error("Token is not valid");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User confirmed Correctly" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Cannot confirm the user" });
  }
};

// Recuperar la contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("The User doesn't exist");
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();
    res.json({ msg: "Check your email and follow the instructions" });

    // Enviar email de recuperación
    emailRecovery({
      email: user.email,
      nombre: user.nombre,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Cannot recover the password" });
  }
};

// Comprobación de token
const matchToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token is valid and the User exists" });
  } else {
    const error = new Error("Token is not valid");
    return res.status(404).json({ msg: error.message });
  }
};

// Cambio de contraseña
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ token });

  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password changed correctly" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token is not valid");
    return res.status(404).json({ msg: error.message });
  }
};

const profileUser = async (req, res) => {
  const { user } = req;

  res.json(user);
};

export {
  registerUser,
  authenticateUser,
  confirmUser,
  forgotPassword,
  matchToken,
  newPassword,
  profileUser,
};
