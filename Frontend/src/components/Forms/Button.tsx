"use client";

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      {children}
    </button>
  );
};

export default Button;
