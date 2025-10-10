import { Router } from "express";
import { authRegister, authLogin, authGetMyInfo, authChangeMyPassword, authGetInfo,authGetInfos,authUpdateProfile,authGetAvatar } from "./auth.controller.js";
import { authRegisterSchema, authLoginSchema,authUpdateProfileSchema } from "./auth.schema.js";
import validBodyReq from "../../common/middlewares/valid-body.middleware.js";
import { authMiddleware, restrictTo } from "../../common/middlewares/auth.middleware.js";
import { USER_ROLE } from "../../common/consts/user-role.js";

const authRouter = Router();

authRouter.post("/register", validBodyReq(authRegisterSchema), authRegister);
authRouter.post("/login", validBodyReq(authLoginSchema), authLogin);

authRouter.use(authMiddleware);

authRouter.put("/update-profile", validBodyReq(authUpdateProfileSchema), authUpdateProfile);
authRouter.put("/change-pass", authChangeMyPassword);
authRouter.get("/info/me", authGetMyInfo);
authRouter.get("/avatar/me", authGetAvatar);

authRouter.get("/info/:id", restrictTo(USER_ROLE.ADMIN), authGetInfo);
authRouter.get("/info", restrictTo(USER_ROLE.ADMIN), authGetInfos);


export default authRouter;
