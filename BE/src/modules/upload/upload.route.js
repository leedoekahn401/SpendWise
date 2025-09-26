import {Router} from "express";
import {authMiddleware} from "../../common/middlewares/auth.middleware.js";
import {upload,uploadFile} from "./upload.control.js";

const uploadRouter = Router();

uploadRouter.post("/",authMiddleware,upload.single("file"),uploadFile);

export default uploadRouter;