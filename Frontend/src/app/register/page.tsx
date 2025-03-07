"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import AuthFormWrapper from "@/components/Auth/AuthFormWrapper";
import Input from "@/components/Forms/Input";
import Button from "@/components/Forms/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      toast.success("Enregistrement réussi! Vous pouvez maintenant vous connecter.");
      router.push("/login");
    } else {
      const errorData = await response.json();
      console.log(response);
      toast.error(errorData.message || "Enregistrement échoué");
    }
  };

  return (
    <AuthFormWrapper title="Enregistrement">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          id="register-email"
          type="email"
          placeholder="Entrer votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Mot de passe"
          id="register-password"
          type="password"
          placeholder="Entrer votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Enregistrement</Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Vous avez déjà un compte?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Connectez-vous ici
        </Link>
      </p>
    </AuthFormWrapper>
  );
};

export default Register;
