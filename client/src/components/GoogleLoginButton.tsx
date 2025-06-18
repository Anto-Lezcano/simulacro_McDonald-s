import { auth, GoogleAuthProvider, signInWithPopup } from "../firebase";
import { loginGoogle } from "../api/Login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await loginGoogle(idToken);

      toast.success("Inicio de sesión con Google exitoso");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión con Google");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center bg-white text-gray-800 font-medium py-3 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="bg-white p-1 rounded-full mr-3">
        <FcGoogle className="w-5 h-5" />
      </div>
      Iniciar con Google
    </button>
  );
}
