import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({children}) => {
    return <div className="flex">
        <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
            <h2 className="flex justify-center text-3xl font-semibold text-black">Spend Wise</h2>
            {children}
        </div>
        <div className="hidden md:block shadow-lg shadow-blue-200 w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
            <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 "/>
            <div className="w-48 h-56 rounded-[40px] border-[20px] border-purple-500 absolute top-[30%] -right-10"/>
            <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"/>
            <div className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-950 bg-blue-800"/>
        </div>
    </div>;

};

export default AuthLayout;