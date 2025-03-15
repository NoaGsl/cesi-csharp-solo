"use client";

import React, { ReactNode } from "react";

interface AuthFormWrapperProps {
  title?: string;
  children: ReactNode;
}

const AuthFormWrapper = ({ title, children }: AuthFormWrapperProps) => {
  return (
    <div className="max-w-md p-6 bg-white shadow-md rounded-md z-50">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default AuthFormWrapper;
