import { Router } from "express";
import {authMiddleware} from "../../common/middlewares/auth.middleware.js";
import { createGroup, getMyGroup, getMyGroups, sendInvite, getInvites, acceptInvite } from "./group.controller.js";
import { groupSchema } from "./group.schema.js";
import validBodyReq from "../../common/middlewares/valid-body.middleware.js";

const groupRouter = Router();

groupRouter.use(authMiddleware);

groupRouter.post("/",validBodyReq(groupSchema),createGroup);
groupRouter.get("/",getMyGroups);
groupRouter.get("/me/:id",getMyGroup);
groupRouter.post("/send-invite/:id",sendInvite);
groupRouter.get("/invites",getInvites);
groupRouter.post("/accept-invite/:id",acceptInvite);

export default groupRouter;
