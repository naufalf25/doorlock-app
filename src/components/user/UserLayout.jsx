'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserNavbar from './Navbar';
import { auth } from '@/utils/db';

export default function UserLayout({ children }) {
  const [login, setLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      } else {
        setLogin(false);
      }
    });
  });

  if (!login) {
    return (
      <>
        <UserNavbar />
        {children}
      </>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-950">
        <h1 className="font-bold text-2xl text-center text-white">
          Loading...
        </h1>
      </div>
    );
  }
}
