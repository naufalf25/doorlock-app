import Link from 'next/link';
import { FaHome, FaPhotoVideo, FaSignOutAlt } from 'react-icons/fa';
import { IoNotifications } from 'react-icons/io5';

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
  {
    id: 'sign out',
    href: '/logout',
    icon: 'FaSignOutAlt',
  },
];

export default function Nav({ path }) {
  return (
    <div className="mt-10 w-full p-4 sticky left-0 bottom-0 bg-slate-300 border-t">
      <nav className="flex justify-evenly items-center gap-4 text-sm">
        {nav.map(({ id, href, icon }) => (
          <Link
            key={id}
            href={href}
            className={
              'flex flex-col justify-center items-center gap-1 text-slate-500 hover:text-black' +
              (path === href && ' text-black')
            }
          >
            {icon === 'FaHome' && <FaHome className="text-2xl" />}
            {icon === 'FaPhotoVideo' && <FaPhotoVideo className="text-2xl" />}
            {icon === 'IoNotifications' && (
              <IoNotifications className="text-2xl" />
            )}
            {icon === 'FaSignOutAlt' && <FaSignOutAlt className="text-2xl" />}
            <p className="capitalize">{id}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
}
