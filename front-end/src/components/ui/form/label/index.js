export default function UIFormLabel({label, className = "", children, ...props}) {
  return (
    <label {...props} className={`block text-sm font-thin text-default ${className} ` + className}>
      {label ? label : children}
    </label>
  );
}
