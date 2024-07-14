export default function Button({ children, className, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || false}
      className={`${className} mt-4 py-2 px-8 bg-blue-950 font-semibold text-white border border-blue-950 hover:bg-transparent hover:text-blue-950 rounded-full disabled:bg-slate-400 disabled:border-slate-400 disabled:opacity-75 disabled:text-white`}
    >
      {children}
    </button>
  );
}
