import mongoose from "mongoose";
import bycrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    telefono: {
      type: String,
      required: false,
      trim: true,
    },
    token: {
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (passwordForm) {
  return await bycrypt.compare(passwordForm, this.password);
};


const User = mongoose.model("Usuario", userSchema);
export default User;
