export default function UIButtonDanger({className = "", disabled, children, ...props}) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={
        `inline-flex items-center px-4 py-2 bg-white rounded-md font-semibold text-xs text-red-600 hover:text-white border border-red-600 uppercase tracking-widest hover:bg-red-500 focus:text-white active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
    >
      {children}
    </button>
  );
}
