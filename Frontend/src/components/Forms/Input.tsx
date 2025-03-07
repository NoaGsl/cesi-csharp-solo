"use client";

import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...props}
      />
    </div>
  );
};

export default Input;
