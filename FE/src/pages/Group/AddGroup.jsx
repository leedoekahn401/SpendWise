import React, { useState, useEffect } from 'react';
import { Form, Input, Button, List, Avatar, Tag, notification,Card } from 'antd';
import { UserPlus } from 'lucide-react';
import instance from '../../utils/instance.js';
import { BASE_URL,API_PATH } from '../../utils/apiPath.js';

const { Search } = Input;

const AddGroup = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        form.setFieldsValue({
            members: selectedMembers.map(member => member._id),
        });
    }, [selectedMembers, form]);

    const handleSearch = async (value) => {
        if (!value || value.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            setLoading(true);
            const response = await instance.get(`${API_PATH.INVITE.FIND_USERS}?username=${value}`);
            const newResults = response.data.data.filter(
                user => !selectedMembers.some(selected => selected._id === user._id)
            );
            console.log(newResults)
            setSearchResults(newResults);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            notification.error({ message: "Failed to search for users." });
        } finally {
            setLoading(false);
        }
    };

    const addMember = (user) => {
        setSelectedMembers(prev => [...prev, user]);
        setSearchResults(prev => prev.filter(result => result._id !== user._id));
    };

    const removeMember = (userId) => {
        setSelectedMembers(prev => prev.filter(member => member._id !== userId));
    };

    const handleCreateGroup = async (values) => {
        try {
            setLoading(true);
            const group = await instance.post(`${API_PATH.GROUP.CREATE}`, values);
            const invites = await instance.post(`${API_PATH.INVITE.SEND_INVITE}`, {inviterId: values.owner,groupId: group.data.data._id, inviteesID: values.members});
            form.resetFields();
            setSelectedMembers([]);
            setSearchResults([]);
            alert("Group created successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Failed to create group:", error);
            alert("Failed to create the group.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create a New Group</h2>
            <Form form={form} onFinish={handleCreateGroup} layout="vertical">
                <Form.Item name="name" label="Group Name" rules={[{ required: true, message: 'Please enter a name for your group.' }]}>
                    <Input placeholder="e.g., Family Finances" />
                </Form.Item>

                <Form.Item name="description" label="Description">
                    <Input.TextArea placeholder="e.g., For tracking our monthly household expenses." />
                </Form.Item>

                <Form.Item name="members" hidden><Input /></Form.Item>

                <Form.Item label="Add Members">
                    <Search
                        placeholder="Search for users by username..."
                        onSearch={handleSearch}
                        loading={loading}
                        enterButton
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                            }
                        }}
                    />
                </Form.Item>
                    <Card className=" rounded-md">
                        <h4 className="font-semibold mb-2 text-gray-600">Selected Members:</h4>
                        <div className="flex flex-wrap gap-2">
                            {selectedMembers.map(member => (
                                <Tag
                                    key={member._id}
                                    closable
                                    onClose={() => removeMember(member._id)}
                                    className="flex items-center gap-2 p-1 text-sm"
                                >
                                    {member.username}
                                </Tag>
                            ))}
                        </div>
                    </Card>
                    <div className = "h-[18vw] overflow-y-scroll no-scrollbar">
                    <List 
                        itemLayout="horizontal"
                        dataSource={searchResults}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="text"
                                        icon={<UserPlus size={18} />}
                                        onClick={() => addMember(item)}
                                    >
                                        Add
                                    </Button>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profilePic} className="bg-gray-200 ring-1 ring-gray-200" size={40} />}
                                    title={item.username}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <Form.Item className="mt-6">
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Create Group
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddGroup;
