export default function Navbar({ title, uid }) {
  return (
    <div className="p-6 border-b bg-blue-950 text-white">
      {/* <p className="text-end text-sm">User ID: {uid}</p> */}
      <h1 className="font-bold text-3xl capitalize arista">
        <span className="text-red-500">Kunci</span> Pintuku
        <span className="text-lg font-sans">&#8482;</span>
      </h1>
      <p className="text-sm capitalize">{"Let's save our homes"}</p>
    </div>
  );
}
