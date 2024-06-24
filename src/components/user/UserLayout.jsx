'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserNavbar from './Navbar';
import { auth } from '@/utils/db';
import Loading from '../Loading';

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
    return <Loading />;
  }
}
