'use client';
import Layout from '@/components/Layout';
import ChangePin from '@/components/menu/ChangePin';
import Link from 'next/link';
// import ChangePassword from '@/components/menu/ChangePassword';
import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function Menu() {
  // const [changePassword, setChangePassword] = useState(false);
  const [changePin, setChangePin] = useState(false);

  function backEvent(e) {
    e.preventDefault();

    // setChangePassword(false);
    setChangePin(false);
  }

  return (
    <Layout title="halaman menu" path="/menu">
      <main className="min-h-[75vh]">
        {
          /* changePassword ||*/ changePin ? (
            <div className="mt-4 p-4">
              <button
                onClick={backEvent}
                className="py-2 px-6 border rounded-lg flex gap-2 items-center font-semibold hover:border-black"
              >
                <IoIosArrowRoundBack className="text-3xl" />
                Kembali
              </button>
            </div>
          ) : (
            <></>
          )
        }
        {/* {changePassword && <ChangePassword />} */}
        {changePin && <ChangePin />}
        <div
          className={
            'p-4 mt-4' + /*changePassword ||*/ (changePin ? ' hidden' : '')
          }
        >
          {/* <div className="border-y border-t-transparent px-4 py-6">
            <button
              onClick={() => setChangePassword(true)}
              className="text-xl font-semibold"
            >
              Ganti Password Akun
            </button>
          </div> */}
          <div className="border-y border-t-transparent px-4 py-6">
            <button
              onClick={() => setChangePin(true)}
              className="text-xl font-semibold"
            >
              Ganti Nomor Pin Alat
            </button>
          </div>
          <div className="mt-20 text-center">
            <Link
              href="/user/logout"
              className="py-2 px-8 border rounded-lg capitalize text-xl font-bold bg-red-500 border-red-500 text-white hover:text-red-500 hover:bg-white"
            >
              Keluar dari akun
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
