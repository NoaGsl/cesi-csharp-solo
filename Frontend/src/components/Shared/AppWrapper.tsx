"use client";

import { useState, useEffect } from "react";
import AuthModal from "../Auth/AuthModal";
import { useAuth } from "@/hooks/AuthContext";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, setIsConnected } = useAuth();
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line
  const [inputSequence, setInputSequence] = useState("");
  
  useEffect(() => {
    const secretSequence = process.env.NEXT_PUBLIC_ADMIN_SEQUENCE || "admin";
    const secretSequenceLength = secretSequence.length;

    const handleKeyDown = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const updatedSequence = (prev + e.key).slice(-secretSequenceLength);
        
        if (updatedSequence === secretSequence) {
          setShowModal(true);
        }
        
        return updatedSequence;
      });
    };

    if (!isConnected) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConnected]);

  return (
    <>
      {children}
      {showModal && <AuthModal setShowModal={setShowModal} setIsConnected={setIsConnected} />}
    </>
  );
};

export default AppWrapper;
