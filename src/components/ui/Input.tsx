import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => (
    <div className="flex flex-col gap-2">
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? "border-destructive" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  ),
);
Input.displayName = "Input";

export { Input };
