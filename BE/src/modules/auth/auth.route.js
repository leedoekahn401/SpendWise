import { Router } from "express";
import { authRegister, authLogin, authGetMyInfo, authChangeMyPassword, authGetInfo,authGetInfos,authUpdateProfile,authGetAvatar } from "./auth.controller.js";
import { authRegisterSchema, authLoginSchema,authUpdateProfileSchema } from "./auth.schema.js";
import validBodyReq from "../../common/middlewares/valid-body.middleware.js";
import { authMiddleware, restrictTo } from "../../common/middlewares/auth.middleware.js";
import { USER_ROLE } from "../../common/consts/user-role.js";

const authRouter = Router();

// --- Public Routes ---
// These routes do not require a token.
authRouter.post("/register", validBodyReq(authRegisterSchema), authRegister);
authRouter.post("/login", validBodyReq(authLoginSchema), authLogin);
authRouter.put("/update-profile", validBodyReq(authUpdateProfileSchema), authUpdateProfile);


// --- Middleware Barrier ---
// All routes defined BELOW this line are now protected and require a valid token.
authRouter.use(authMiddleware);


// --- Protected Routes for ANY Authenticated User ---
authRouter.put("/change-pass/me", authChangeMyPassword);
authRouter.get("/info/me", authGetMyInfo);
authRouter.get("/avatar/me", authGetAvatar);

authRouter.get("/info/:id", restrictTo(USER_ROLE.ADMIN), authGetInfo);
authRouter.get("/info", restrictTo(USER_ROLE.ADMIN), authGetInfos);


export default authRouter;