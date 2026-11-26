const Label = ({ children, className = "", ...props }) => {
  return (
    <label
      {...props}
      className={`mb-2 block text-sm font-medium ${className}`}
    >
      {children}
    </label>
  );
};

export { Label };