'use client';

import { auth } from '@/utils/db';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    try {
      signOut(auth);

      router.push('/user/login');
    } catch (error) {
      alert('Error! Harap hubungi admin');
      console.log(error);
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <h1 className="font-bold text-2xl text-center text-white">Loading...</h1>
    </div>
  );
}
