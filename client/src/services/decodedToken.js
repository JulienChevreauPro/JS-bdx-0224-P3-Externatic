import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export default function decodeToken(token) {
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      toast.error("Votre session a expiré. Veuillez vous reconnecter.");
      return null;
    }
    return {
      role: decodedToken.role,
      id: decodedToken.id,
    };
  } catch (error) {
    toast.error(error.message);
    return null;
  }
}
