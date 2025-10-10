import {Router} from "express";
import {upload,uploadFile} from "./upload.control.js";

const uploadRouter = Router();

uploadRouter.post("/",upload.single("avatar"),uploadFile);

export default uploadRouter;