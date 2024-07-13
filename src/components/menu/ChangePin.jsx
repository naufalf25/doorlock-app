'use client';

import { getRTDB } from '@/services/firebase';
import { auth, database } from '@/utils/db';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ChangePin() {
  const [uid, setUid] = useState();
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [samePin, setSamePin] = useState(false);
  const [oldPinVerif, setOldPinVerif] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, []);

  async function changePinEvent(e) {
    e.preventDefault();

    const pin = await getRTDB(`${uid}/password`);

    setSamePin(false);
    setOldPinVerif(false);
    setSuccess(false);
    setErrorMessage(false);

    const updates = {};

    if (oldPin !== '' && newPin !== '') {
      if (oldPin != pin) {
        setOldPinVerif(true);
        return;
      }

      if (oldPin === newPin) {
        setSamePin(true);
        return;
      }

      if (uid) {
        updates[`${uid}/password`] = Number(newPin);
      }

      await update(ref(database), updates);
      setSuccess(true);
      setOldPin('');
      setNewPin('');

      router.refresh();
    }
  }

  return (
    <div className="mt-10 p-4">
      <h1 className="text-xl font-bold text-center capitalize">
        Ganti nomor pin alat
      </h1>
      <form
        onSubmit={changePinEvent}
        className="mt-6 px-4 py-10 border rounded-lg flex flex-col justify-center items-center gap-6"
      >
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label>Nomor Pin Lama</label>
          <input
            type="number"
            name="oldPin"
            value={oldPin}
            onChange={(e) => setOldPin(e.target.value)}
            min="0"
            max="999999"
            className="w-full py-2 px-4 text-center rounded-lg border"
            placeholder="Masukkan Nomor Pin Lama"
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label>Nomor Pin Baru</label>
          <input
            type="number"
            name="newPin"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            min="0"
            max="999999"
            className="w-full py-2 px-4 text-center rounded-lg border"
            placeholder="Masukkan Nomor Pin Baru"
            required
          />
        </div>
        <div className="text-center">
          {samePin && (
            <p className="text-red-500">
              Nomor pin lama dan baru tidak boleh sama!
            </p>
          )}
          {oldPinVerif && (
            <p className="text-red-500">Nomor pin lama tidak sesuai!</p>
          )}
          {success && (
            <p className="text-green-500">
              Ubah nomor pin pada alat berhasil! Silahkan me-restart alat
            </p>
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
            Ganti Nomor Pin
          </button>
        </div>
      </form>
    </div>
  );
}
