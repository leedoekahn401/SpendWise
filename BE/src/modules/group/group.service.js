import Group from "./group.model.js";
import User from "../users/user.model.js";
import Invite from "../invite/invite.model.js";
import {throwError} from "../../common/configs/error.config.js";
export const createGroupService = async({name,description,owner})=>{
    const group = await Group.create({ name, description, owner, members: [{ userId: owner, role: 'admin' }] });
    return group;
}
export const getMyGroupsService = async(userId) => {
    const groups = await Group.find({ 'members.userId': userId });
    return groups;
}

export const getMyGroupService = async(groupId)=>{
    const group = await Group.findById(groupId);
    return group;
}


export const sendInviteService = async({groupId,inviterId,inviteeName})=>{
    const invitee = await User.findOne({username:inviteeName});
    if(!invitee){
        throwError(404,"User not found");
    }
    const groupWithMember = await Group.findOne({ _id: groupId, 'members.userId': invitee._id });
    if (groupWithMember) {
        throwError(400,"This user is already in this group");
    }
    const invite = await Invite.create({groupId,inviterId,inviteeId:invitee._id});
    return invite;
}

export const getInvitesService = async(userId)=>{
    const invites = await Invite.find({inviteeId:userId});
    return invites;
}

export const acceptInviteService = async(id,userId)=>{
    const invite = await Invite.findById(id);
    if(!invite){
        throwError(404,"Invite not found");
    }
    if(invite.inviteeId!=userId){
        throwError(400,"You are not the invitee");
    }
    await Group.findByIdAndUpdate(invite.groupId,{ $push: { members: { userId: userId, role: "member" } } });
    await Invite.findByIdAndDelete(id);
    return;
}
