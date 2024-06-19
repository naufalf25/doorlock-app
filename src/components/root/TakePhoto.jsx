import Image from 'next/image';
import Button from './Button';

export default function TakePhoto({ className }) {
  return (
    <div className={`${className} md:p-2`}>
      <div className="w-full">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/door-lock-esp32-b79a1.appspot.com/o/image%2F8rRjCUIrqZZlx4mjJXaXMyTPP9B2%2F1718700723.jpg?alt=media&token=cf3ea036-9eb5-4ad9-bb4b-07284d717bed"
          alt="latestImage"
          width={1600}
          height={1200}
        />
      </div>
      <div className="mt-4 w-full p-4 text-center">
        <p className="text-center">
          Ambil foto untuk melihat keadaan di depan pintu saat ini
        </p>
        <Button className="text-lg">Ambil Foto</Button>
      </div>
      <div className="w-full p-4 mt-12 text-center">
        <h2>Keadaan Kunci Pintu Rumah</h2>
        <p className="mt-1 font-semibold text-lg">Terkunci</p>
        <Button className="mt-4 text-lg">Buka Kunci Pintu</Button>
      </div>
    </div>
  );
}
