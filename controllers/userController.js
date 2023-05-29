// Database models
import User from "../models/User.js";

// Generators helpers
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

// Email configuration
import { emailRecovery, emailRegister } from "../helpers/email.js";

// Registro de usuario
const registerUser = async (req, res) => {
  // Evitar registros duplicados
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("El usuario ya existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = generateId();
    const userSaved = await user.save();
    res.json({
      msg: "Usuario creado correctamente, comprueba tu correo para confirmar la cuenta",
    });

    // Enviar email de confirmación
    emailRegister({
      email: userSaved.email,
      nombre: userSaved.nombre,
      token: userSaved.token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Ha ocurrido un error" });
  }
};

// Autenticar el usuario
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Combrobar si el usuario esta confirmado
  if (!user.confirmed) {
    const error = new Error("El usuario no ha sido confirmado");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el password es correcto
  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      email: user.email,
      telefono: user.telefono,
      token: generateJWT(user._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(400).json({ msg: error.message });
  }
};

// Confirmación de usuario
const confirmUser = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  console.log(userConfirm);
  if (!userConfirm) {
    const error = new Error("El token no es válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "Usuario confirmado conrrectamente" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "No se ha podido confirmar el usuario" });
  }
};

// Recuperar la contraseña
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuariono existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    user.token = generateId();
    await user.save();
    res.json({ msg: "Comprueba tu correo y sigue las instrucciones" });

    // Enviar email de recuperación
    emailRecovery({
      email: user.email,
      nombre: user.nombre,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ msg: "No se ha podido restablecer la contraseña" });
  }
};

// Comprobación de token
const matchToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "El Token es valido y el usuario existe" });
  } else {
    const error = new Error("El Token no es valido");
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
      res.json({ msg: "Contraseña modificada correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("El Token no es válido");
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
