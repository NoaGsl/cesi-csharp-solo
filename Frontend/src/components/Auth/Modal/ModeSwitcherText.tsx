interface ModeSwitcherTextProps {
  mode: string;
  setMode: (mode: "login" | "register") => void;
}

const ModeSwitcherText = ({ mode, setMode }: ModeSwitcherTextProps) => {
  return (
    <div>
      {mode === "login" ? (
        <p className="mt-4 text-center text-sm">
          Pas encore de compte?{" "}
          <button
            type="button"
            onClick={() => setMode("register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Inscrivez-vous ici
          </button>
        </p>
      ) : (
        <p className="mt-4 text-center text-sm">
          Vous avez déjà un compte?{" "}
          <button
            type="button"
            onClick={() => setMode("login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Connectez-vous ici
          </button>
        </p>
      )}
    </div>
  );
};

export default ModeSwitcherText;
