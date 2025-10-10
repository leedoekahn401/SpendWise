import { Router } from "express";
import {authMiddleware} from "../../common/middlewares/auth.middleware.js";
import { createGroup, getMyGroup, getMyGroups, sendInvite, getInvites, acceptInvite,findUsers,declineInvite } from "./group.controller.js";
import { groupSchema } from "./group.schema.js";
import validBodyReq from "../../common/middlewares/valid-body.middleware.js";

const groupRouter = Router();

groupRouter.use(authMiddleware);

groupRouter.post("/create",validBodyReq(groupSchema),createGroup);
groupRouter.get("/my",getMyGroups);
groupRouter.get("/me/:id",getMyGroup);
groupRouter.post("/send-invite",sendInvite);
groupRouter.get("/invites",getInvites);
groupRouter.post("/accept-invite/:id",acceptInvite);
groupRouter.get("/find",findUsers);
groupRouter.post("/decline-invite/:id",declineInvite);

export default groupRouter;
