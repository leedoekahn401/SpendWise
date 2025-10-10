import React, { useEffect, useState } from 'react';
import { Spin, Button, Avatar, Empty, notification } from 'antd';
import { Check, X, Mail } from 'lucide-react';

const InvitesPage = () => {
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchInvites = async () => {
      try {
        setLoading(true);
        const response = await instance.get(API_PATH.INVITE.GET_INVITES);
        setInvites(response.data.data);
      } catch (error) {
        notification.error({ message: "Couldn't load invitation list." });
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchInvites();
    }, []);
  
    const handleAction = async (inviteId, action) => {
      const originalInvites = [...invites];
      setInvites(prevInvites => prevInvites.filter(invite => invite._id !== inviteId));
      
      try {
        if (action === "accept") {
          await instance.post(`${API_PATH.INVITE.ACCEPT_INVITE}/${inviteId}`);
          notification.success({ message: "Invitation accepted!" });
        } else {
          await instance.post(`${API_PATH.INVITE.DECLINE_INVITE}/${inviteId}`);
          notification.info({ message: "Invitation declined." });
        }
      } catch (error) {
        notification.error({ message: `Couldn't ${action} invite. Please try again.` });
        setInvites(originalInvites);
      }
    };
  
    const renderInvites = () => {
      if (invites.length === 0) {
        return (
          <div className="text-center py-16">
              <Empty
                  image={<Mail size={60} className="mx-auto text-gray-400" />}
                  description={
                      <div>
                          <h3 className="text-lg font-semibold text-gray-700">No Pending Invitations</h3>
                          <p className="text-gray-500 mt-1">You're all caught up!</p>
                      </div>
                  }
              />
          </div>
        );
      }
  
      return (
        <ul className="space-y-4">
          {invites.map((invite) => (
            <li key={invite._id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <Avatar src={invite.inviter.profilePic} size={50} />
                <div>
                  <p className="font-bold text-gray-800">
                    {invite.group.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Sent by {invite.inviter.username} on {new Date(invite.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <Button
                  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold border-none rounded-lg"
                  icon={<X size={16} />}
                  onClick={() => handleAction(invite._id, 'decline')}
                >
                  Decline
                </Button>
                <Button
                  type="primary"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg"
                  icon={<Check size={16} />}
                  onClick={() => handleAction(invite._id, 'accept')}
                >
                  Accept
                </Button>
              </div>
            </li>
          ))}
        </ul>
      );
    };
  
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 mt-6">Group Invitations</h2>
            <div className="bg-white p-8 rounded-sm border border-gray-200 shadow-sm w-full mx-auto">
                {loading ? (
                <div className="flex justify-center items-center h-64"><Spin size="large" /></div>
                ) : (
                renderInvites()
                )}
            </div>
        </>
    );
  };
  
  export default InvitesPage;
  