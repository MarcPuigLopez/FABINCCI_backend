import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.includes(origin)) {
      callback(null, true);
    }else {
      callback(new Error("No permitido por CORS"));
    }
  }
}

app.use(cors(corsOptions));

// Routing
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
