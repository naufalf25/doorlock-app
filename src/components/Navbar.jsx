export default function Navbar({ title, uid }) {
  return (
    <div className="p-6 border-b bg-blue-950 text-white">
      <p className="text-end text-sm">User ID: {uid}</p>
      <h1 className="mt-4 font-bold text-xl capitalize">{title}</h1>
    </div>
  );
}
