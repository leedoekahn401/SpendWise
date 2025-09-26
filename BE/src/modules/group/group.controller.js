import { createResponse } from "../../common/configs/response.config.js";
import handleAsync from "../../common/utils/handle-async.util.js";
import { createGroupService, getMyGroupService, getMyGroupsService, sendInviteService, acceptInviteService, getInvitesService } from "./group.service.js";

export const createGroup = handleAsync(async(req,res)=>{
    const group = await createGroupService({
        ...req.body, // Copies all properties from req.body
        owner: req.user.id // Adds or overwrites the owner
    });
    return createResponse(res,200,"Create group successfully",group);
})

export const getMyGroups = handleAsync(async(req,res)=>{
    const groups = await getMyGroupsService(req.user.id);
    return createResponse(res,200,"Get my groups successfully",groups);
})

export const getMyGroup = handleAsync(async(req,res)=>{
    const group = await getMyGroupService(req.params.id);
    return createResponse(res,200,"Get my group successfully",group);
})

export const acceptInvite = handleAsync(async(req,res)=>{
    const invite = await acceptInviteService(req.params.id,req.user.id);
    return createResponse(res,200,"Accept invite successfully",invite);
})

export const sendInvite = handleAsync(async(req,res)=>{
    const invite = await sendInviteService({groupId:req.params.id,inviterId:req.user.id,inviteeName:req.body.inviteeName});
    return createResponse(res,200,"Send invite successfully",invite);
})

export const getInvites = handleAsync(async(req,res)=>{
    const invites = await getInvitesService(req.user.id);
    return createResponse(res,200,"Get invites successfully",invites);
})