'use client';

// import { useAuthContext } from './AuthContext';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Navbar from './Navbar';
import Loading from './Loading';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, messaging } from '@/utils/db';
import { useRouter } from 'next/navigation';
import { getToken } from 'firebase/messaging';

async function requestPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });
    console.log('Token Gen', token);
  } else if (permission === 'denied') {
    console.log('Denied for the notification');
  }
}

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
        requestPermission();
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
