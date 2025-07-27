'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Logged out successfully');
        router.push('/'); // or '/login' based on your route
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >

            Logout
        </button>
    );
};

export default LogoutButton;
