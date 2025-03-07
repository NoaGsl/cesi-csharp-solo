"use client";

import React, { ReactNode } from "react";

interface AuthFormWrapperProps {
  title?: string;
  children: ReactNode;
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({ title, children }) => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
      {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
      {children}
    </div>
  );
};

export default AuthFormWrapper;
