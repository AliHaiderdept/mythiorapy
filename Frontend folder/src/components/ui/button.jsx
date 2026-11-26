const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`rounded-lg px-5 py-2.5 font-medium transition hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };