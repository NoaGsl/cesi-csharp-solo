"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast.success("Connexion réussie!");
      router.push("/employees");
    } else {
      const errorData = await response.json();
      toast.error(errorData.message || "Connexion échouée");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <AuthFormWrapper title="Connexion">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            id="login-email"
            type="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Mot de passe"
            id="login-password"
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Connexion</Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Pas encore de compte?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Inscrivez-vous ici
          </Link>
        </p>
      </AuthFormWrapper>
    </div>
  );
};

export default Login;
