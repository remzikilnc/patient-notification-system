export default function UIFormLabel({label, className = "", children, ...props}) {
  return (
    <label {...props} className={`block text-sm text-default font-medium ${className} ` + className}>
      {label ? label : children}
    </label>
  );
}
