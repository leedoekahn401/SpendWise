import express from "express";
import {HOST, PORT,CLIENT_URL} from "./src/common/configs/environment.config.js";
import cors from "cors";
import connectDB from "./src/common/configs/database.config.js";
import router from "./src/routes/index.route.js";
import notFoundHandler from "./src/common/middlewares/not-found.middleware.js";
import errorHandler from "./src/common/middlewares/error.middleware.js";
import jsonValidator from "./src/common/middlewares/json-valid.middleware.js";

const app = express();


app.use(cors({
    origin: CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
  

app.use(express.json());

app.use("/api",router);

app.use(jsonValidator)
app.use(notFoundHandler)
app.use(errorHandler)

connectDB();


const server = app.listen(PORT, "::", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  


process.on("unhandledRejection", (error, promise) => {
	console.error(`Error: ${error.message}`);
	server.close(() => process.exit(1));
});