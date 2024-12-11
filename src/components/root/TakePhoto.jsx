import Image from "next/image";
import Button from "./Button";
import { showFormattedDateAndTime } from "@/utils/data";
export default function TakePhoto({
  className,
  image,
  lock,
  openLock,
  takePhotoEvent,
  openLockEvent,
  takeImage,
}) {
  return (
    <div className={`${className} md:p-2`}>
      {image ? (
        <>
          <div className="w-full h-full relative">
            <Image
              src={image?.imageUrl || ""}
              alt="latestImage"
              width={1600}
              height={1200}
              priority
              className="w-full h-full"
            />
            <div
              className={`absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-80 ${
                takeImage ? "" : "hidden"
              }`}
            >
              <Image
                src="/loading.gif"
                width={100}
                height={100}
                alt="loading..."
              />
            </div>
          </div>
          <div className="px-4 py-2 text-sm md:text-base">
            <h2 className="font-semibold">Foto terakhir diambil pada:</h2>
            <p>{showFormattedDateAndTime(image?.timestamp || null)}</p>
          </div>
        </>
      ) : (
        <div className="min-h-80 flex justify-center items-center bg-black">
          <p className="text-white font-semibold text-lg">
            Belum ada gambar tersimpan
          </p>
        </div>
      )}
      <div className="mt-4 w-full p-4 text-center">
        <p className="text-center">
          Ambil foto untuk melihat keadaan di depan pintu saat ini
        </p>
        <Button
          onClick={takePhotoEvent}
          disabled={takeImage ? true : false}
          className="text-lg"
        >
          {takeImage ? "Mengambil Foto" : "Ambil Foto"}
        </Button>
      </div>
      <div className="w-full p-4 mt-12 text-center">
        <h2>Keadaan Kunci Pintu Rumah</h2>
        <p className="mt-1 font-semibold text-lg">
          {lock ? "Terkunci" : "Tidak Terkunci"}
        </p>
        <Button
          onClick={openLockEvent}
          className="mt-4 text-lg"
          disabled={openLock ? true : false}
        >
          {openLock ? "Menunggu pintu kembali terkunci" : "Buka Kunci Pintu"}
        </Button>
      </div>
    </div>
  );
}
