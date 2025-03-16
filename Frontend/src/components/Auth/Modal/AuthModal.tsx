"use client";

import { useState } from "react";
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeSwitcherText from "./ModeSwitcherText";

interface AuthModalProps {
  setShowModal: (showModal: boolean) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const AuthModal = ({ setShowModal, setIsConnected }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = mode === "login" ? "/api/login" : "/api/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      if (mode === "login") {
        toast.success("Connexion réussie!");
        setShowModal(false);
        setIsConnected(true);
      } else {
        toast.success(
          "Enregistrement réussi! Vous pouvez maintenant vous connecter."
        );
        setMode("login");
      }
    } else {
      const errorData = await response.json();
      toast.error(
        errorData.message ||
          (mode === "login" ? "Connexion échouée" : "Enregistrement échoué")
      );
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40 bg-black/50">
      {/* Clickout div */}
      <div
        className="absolute inset-0 z-40"
        onClick={() => setShowModal(false)}
      />

      <AuthFormWrapper
        title={mode === "login" ? "Connexion" : "Enregistrement"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            id={`${mode}-email`}
            type="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            id={`${mode}-password`}
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">
            {mode === "login" ? "Connexion" : "Enregistrement"}
          </Button>
        </form>

        <ModeSwitcherText mode={mode} setMode={setMode} />
      </AuthFormWrapper>
    </div>
  );
};

export default AuthModal;
