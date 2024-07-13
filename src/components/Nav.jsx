'use client';

import { auth } from '@/utils/db';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaHome, FaPhotoVideo, FaSignOutAlt } from 'react-icons/fa';
import { IoNotifications, IoMenu } from 'react-icons/io5';

const nav = [
  {
    id: 'beranda',
    href: '/',
    icon: 'FaHome',
  },
  {
    id: 'riwayat foto',
    href: '/photos',
    icon: 'FaPhotoVideo',
  },
  {
    id: 'notifikasi',
    href: '/notifications',
    icon: 'IoNotifications',
  },
  // {
  //   id: 'sign out',
  //   href: '/user/logout',
  //   icon: 'FaSignOutAlt',
  // },
  {
    id: 'menu',
    href: '/menu',
    icon: 'IoMenu',
  },
];

export default function Nav({ path }) {
  const router = useRouter();

  const logOut = (e) => {
    e.preventDefault();

    try {
      signOut(auth);

      router.push('/user/login');
    } catch (error) {
      alert('Error! Harap hubungi admin');
      console.log(error);
    }
  };

  return (
    <div className="mt-10 w-full p-4 sticky left-0 bottom-0 bg-slate-300 border-t">
      <nav className="flex justify-evenly items-center gap-4 text-sm">
        {nav.map(({ id, href, icon }) => (
          <Link
            key={id}
            href={href}
            className={
              'flex flex-col justify-center items-center gap-1 hover:text-black' +
              (path === href ? ' text-black' : ' text-slate-500')
            }
          >
            {icon === 'FaHome' && <FaHome className="text-2xl" />}
            {icon === 'FaPhotoVideo' && <FaPhotoVideo className="text-2xl" />}
            {icon === 'IoNotifications' && (
              <IoNotifications className="text-2xl" />
            )}
            {icon === 'FaSignOutAlt' && <FaSignOutAlt className="text-2xl" />}
            {icon === 'IoMenu' && <IoMenu className="text-2xl" />}
            <p className="capitalize">{id}</p>
          </Link>
        ))}
        {/* <button
          onClick={logOut}
          className="flex flex-col justify-center items-center gap-1 hover:text-black text-slate-500"
        >
          <FaSignOutAlt className="text-2xl" />
          <p className="capitalize">sign out</p>
        </button> */}
      </nav>
    </div>
  );
}
