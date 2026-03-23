import type { ReactNode } from "react";

type TextInputProps = {
  placeholder?: string;
  value?: any;
  label?: string;
  onChange?: (val: any) => void;
  disabled?: boolean;
  type?: string;
  upperCase?: boolean;
  hasError?: boolean;
  required?: boolean;
  errorMessage?: string;
  rightIcon?: ReactNode;
  [key: string]: any;
};

export default function TextInput({
  placeholder,
  value,
  label,
  onChange,
  disabled = false,
  type = "text",
  upperCase = false,
  hasError = false,
  required = false,
  errorMessage,
  rightIcon,
  ...props
}: TextInputProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">
            {label}
          </label>
          {required === true && (
            <span style={{ color: "red", fontWeight: "bold" }}>*</span>
          )}
        </div>
      )}
      <div className="mt-2 relative">
        <input
          id={props.id || "text-input"}
          name={props.name || "text"}
          type={type}
          value={value}
          disabled={disabled}
          className={`block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 ${
            hasError
              ? "outline-red-500 focus:outline-red-500"
              : "outline-gray-300 focus:outline-indigo-600 dark:focus:outline-indigo-500"
          }`}
          style={{
            textTransform: upperCase ? "uppercase" : "none",
          }}
          placeholder={placeholder ? placeholder : label}
          onChange={(e) => {
            const value = e.target.value;
            if (onChange) {
              onChange(value);
            }
          }}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {rightIcon && <div className="pointer-events-none">{rightIcon}</div>}
        </div>
      </div>
      {hasError && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
