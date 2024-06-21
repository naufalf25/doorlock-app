'use client';

import { auth } from '@/utils/db';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongAuth, setWrongAuth] = useState(false);
  const router = useRouter();

  const loginAction = async (e) => {
    e.preventDefault();
    setWrongAuth(false);

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        router.push('/');
      }
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setWrongAuth(true);
      } else {
        alert('Error! Please contact admin');
      }
    }
  };

  return (
    <div className="w-full md:max-w-screen-sm py-6 px-4 border rounded-lg">
      <form onSubmit={loginAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 justify-center items-center">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            className="w-full py-2 px-4 border rounded-xl text-center outline-none"
          />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className="w-full py-2 px-4 border rounded-xl text-center outline-none"
          />
        </div>
        {wrongAuth && (
          <div className="text-center">
            <p className="text-red-500 text-sm">
              email / password yang Anda masukkan salah
            </p>
          </div>
        )}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="w-full py-2 px-8 bg-blue-950 font-semibold text-white border border-blue-950 hover:bg-transparent hover:text-blue-950 rounded-full"
          >
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
}
