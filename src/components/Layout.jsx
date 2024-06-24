'use client';

// import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Navbar from './Navbar';
import Loading from './Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/utils/db';
import { useRouter } from 'next/navigation';

export default function Layout({ children, title, path }) {
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/user/login');
      } else {
        setLoading(false);

        setUid(user.uid);
      }
    });
  }, [router]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Navbar title={title} uid={uid} />
        {children}
        <Nav path={path} />
      </>
    );
  }
}
