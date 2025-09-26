import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Image, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Input from '../../components/Input';
import { validEmail } from '../../utils/helper';
import AuthLayout from '../../layout/AuthLayout';

// Helper function to convert file to base64 for preview
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    // State for the image uploader
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]); // Will hold the profile picture

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password) {
            setError('Please fill in all required fields');
            return;
        }
        if (!validEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        // Get the actual file from the fileList state
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append('profilePic', fileList[0].originFileObj);
        }

        console.log('Signing up with form data...');
        // Example: await api.post('/auth/signup', formData);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        // Return false to prevent automatic upload, we handle it on form submission
        return false;
    };

    const uploadButton = (
        <button className="flex flex-col items-center justify-center" style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <AuthLayout>
            <div className="w-full pt-8 flex justify-center">
              <div className="w-[60%] flex flex-col justify-center items-center bg-blue-50 rounded-2xl p-8 shadow-blue-200 shadow-lg">
                <h2 className="text-center text-2xl font-semibold text-gray-900 pb-5">
                    Create an Account
                </h2>

                <form onSubmit={handleSignUp} className="w-full max-w-sm flex flex-col">
                    {/* Profile Picture Upload Section */}
                    <div className="flex flex-col items-center">
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <p className="pt-2 text-center text-black">Upload your profile picture</p>
                    </div>

                    <Input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="username"
                        type="text"
                        label="Username"
                    />
                    <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="you@example.com"
                        type="email"
                        label="Email Address"
                    />
                    <Input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                        type="password" 
                        label="Password"
                    />

                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="pt-3 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log in
                    </Link> 
                </p>

                {/* Hidden Image component for the preview modal */}
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
                </div>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
