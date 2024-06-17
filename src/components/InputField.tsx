import React from "react";

interface InputProps {
  label: string;
  type: string;
  id: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id}>{label}</label>
      <input
        className={`text-black w-full p-1 rounded border-0 ring-0 focus:outline-none focus:outline-yellow-400 ${
          error ? " outline-none outline-red-500 focus:outline-none focus:outline-red-500" : ""
        }`}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
