export default function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${className} mt-4 py-2 px-8 bg-blue-950 font-semibold text-white border border-blue-950 hover:bg-transparent hover:text-blue-950 rounded-full`}
    >
      {children}
    </button>
  );
}
