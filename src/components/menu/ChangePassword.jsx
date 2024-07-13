'use client';

import { useState } from 'react';
import { auth } from '@/utils/db';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [samePassword, setSamePassword] = useState(false);
  const [wrongOldPassword, setWrongOldPassword] = useState(false);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function changePasswordEvent(e) {
    e.preventDefault();

    setSamePassword(false);
    setWrongOldPassword(false);
    setChangePasswordSuccess(false);
    setErrorMessage(false);

    if (oldPassword !== '' && newPassword !== '') {
      if (oldPassword === newPassword) {
        setSamePassword(true);
        return;
      }

      const user = auth.currentUser;
      const credentials = EmailAuthProvider.credential(user.email, oldPassword);

      reauthenticateWithCredential(user, credentials)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              setOldPassword('');
              setNewPassword('');
              setChangePasswordSuccess(true);
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage(true);
            });
        })
        .catch((error) => {
          setWrongOldPassword(true);
          console.log(error);
        });
    }
  }

  return (
    <div className="mt-10 p-4">
      <h1 className="text-xl font-bold text-center capitalize">
        Ganti password akun
      </h1>
      <form
        onSubmit={changePasswordEvent}
        className="mt-6 px-4 py-10 border rounded-lg flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label>Password Lama</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full py-2 px-4 text-center rounded-lg border"
            placeholder="Masukkan Password Lama"
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label>Password Baru</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full py-2 px-4 text-center rounded-lg border"
            placeholder="Masukkan Password Baru"
            required
          />
        </div>
        <div className="text-center">
          {samePassword && (
            <p className="text-red-500">
              Password lama dan baru tidak boleh sama!
            </p>
          )}
          {wrongOldPassword && (
            <p className="text-red-500">Password lama salah!</p>
          )}
          {changePasswordSuccess && (
            <p className="text-green-500">Ubah Password Berhasil</p>
          )}
          {errorMessage && (
            <p className="text-red-500">
              Terjadi Kesalahan! Ulangi pengisian atau hubungi admin!
            </p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="py-2 px-8 text-lg font-semibold bg-blue-950 text-white border border-blue-950 rounded-2xl hover:bg-white hover:text-blue-950"
          >
            Ganti Password
          </button>
        </div>
      </form>
    </div>
  );
}
