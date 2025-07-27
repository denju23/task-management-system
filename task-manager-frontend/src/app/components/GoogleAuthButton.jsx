'use client';

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginWithGoogle } from '../features/auth/authSlice';

const GoogleAuthButton = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    // const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);


    const handleSuccess = async (credentialResponse) => {
        setGoogleLoading(true);
        try {
            const credential = credentialResponse.credential;
            const resultAction = await dispatch(loginWithGoogle(credential));
            if (loginWithGoogle.fulfilled.match(resultAction)) {
                toast.success('Google login successful');
                router.push('/dashboard');
            } else {
                toast.error(resultAction.payload || 'Google login failed');
            }
        } catch (err) {
            console.error('Google Login Error:', err);
            toast.error('Google login failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center my-3 w-100">
            <div className="mb-2 fw-semibold text-muted">
                {googleLoading ? 'Logging in with Google...' : 'Continue with Google'}
            </div>
            <div className="text-center w-100">
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => toast.error('Google Sign-In Failed')}
                    theme="outline"
                    size="large"
                    width="100%"
                    disabled={googleLoading}
                />
            </div>
        </div>
    );
};

export default GoogleAuthButton;
