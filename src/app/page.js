'use client';

import Layout from '@/components/Layout';
import TakePhoto from '@/components/root/TakePhoto';
import { auth } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [uid, setUid] = useState('');
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/user/login');
      } else {
        setUid(user.uid);
      }
    });
  });

  return (
    <Layout title="halaman dashboard" uid={uid} path="/">
      <main className="min-h-[75vh]">
        <TakePhoto className="mt-6" />
      </main>
    </Layout>
  );
}
