"use client";

import { useState, useEffect } from "react";
import AuthModal from "../Auth/AuthModal";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [inputSequence, setInputSequence] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await response.json();

        if (data.authenticated == true) {
          setIsConnected(true);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);

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

    if (isConnected) {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("Connected");
      return;
    }

    window.addEventListener("keydown", handleKeyDown);

    // So it doesnt add multiple event listeners at the same time
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
