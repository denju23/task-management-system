// components/PrivateRoute.jsx
'use client';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateRoute({ children, role }) {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (role && user.role !== role) {
      router.push('/unauthorized');
    }
  }, [user, router, role]);

  return user ? children : null;
}
