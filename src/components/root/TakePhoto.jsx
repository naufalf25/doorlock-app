import Button from './Button';

export default function TakePhoto({ className }) {
  return (
    <div className={`${className} md:p-2`}>
      <div className="w-full min-h-80 bg-black"></div>
      <div className="mt-4 w-full p-4 text-center">
        <p className="text-center">
          Ambil foto untuk melihat keadaan di depan pintu saat ini
        </p>
        <Button className="text-lg">Ambil Foto</Button>
      </div>
      <div className="w-full p-4 mt-10 text-center">
        <h2>Keadaan Kunci Pintu Rumah</h2>
        <p className="mt-1 font-semibold text-lg">Terkunci</p>
        <Button className="mt-4 text-lg">Buka Kunci Pintu</Button>
      </div>
    </div>
  );
}
