import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Input';
import { validEmail } from '../../utils/helper'; // Assuming this helper exists
import AuthLayout from '../../layout/AuthLayout';
import {API_PATH} from '../../utils/apiPath';
import instance from '../../utils/instance';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors on new submission

        if (!email || !password) {
            setError('Please enter all fields');
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
        console.log("Login",email,password);
        // API call would go here
        try{
            const response = await instance.post(API_PATH.AUTH.LOGIN, { email, password });
            console.log("Login response",response);
            
        }catch(error){
            if(error.response && error.response.data){
                setError(error.response.data.message);
            }else{
                setError('Something went wrong');
            }
        }
    };

    return (
        <AuthLayout>
            <div className="w-full pt-10 flex justify-center">
              <div className="w-[60%] flex flex-col justify-center items-center bg-blue-50 rounded-2xl p-8 shadow-blue-200 shadow-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">Welcome</h3>
                
                {/* The form now correctly wraps the inputs AND the button */}
                <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col">
                    <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="example@email.com"
                        type="email" // Use type="email" for semantic HTML and browser features
                        label="Email Address"
                    />
                    <Input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                        type="password" 
                        label="Password"
                    />

                    {/* Added styling to the error message */}
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}

                    {/* FIX: Button moved inside the form */}
                    <div className="pt-2">
                      <button type="submit" className="w-full bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition-colors">
                          Login
                      </button>
                    </div>
                </form>

                <Link to="/signup" className="text-blue-600 hover:underline mt-4 pt-1">
                    Don't have an account?
                </Link> 
            </div>
          </div>
        </AuthLayout>
    );
};

export default Login;