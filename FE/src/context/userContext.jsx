import React, { createContext, useState, useEffect } from "react";
import instance from "../utils/instance"; // Make sure to install and import axios or use fetch
import { API_PATH } from "../utils/apiPath";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const res = await instance.get(API_PATH.AUTH.GET_INFO); 
                    console.log(res.data.data);
                    setUser(res.data.data);
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const updateUser = (data) => {
        setUser(data);
    };

    const clearUser = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export default UserProvider;