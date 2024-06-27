import React from 'react';

export default function UIButtonPrimary({
  className = '',
  children,
  disabled = false,
  ...props
}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary focus:bg-secondary active:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && 'opacity-25'
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}
