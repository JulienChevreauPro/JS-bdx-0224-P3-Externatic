import { Link, useLoaderData } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PreviousPage from "../components/atomic/buttons/PreviousPage";
import Button from "../components/atomic/buttons/Button";

function DashboardConsultant() {
  const consultantData = useLoaderData();
  const userData = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    if (userData.auth.id !== authId) {
      setAuthId(userData.auth.id);
    }
  }, [userData, authId]);

  return (
    <main className="flex flex-col gap-20 min-h-screen">
      <PreviousPage marginLeft="ml-10" source="/" />
      <h1 className="text-2xl self-center text-[var(--primary-color)]">
        Bonjour, {consultantData.firstname} {consultantData.lastname}
      </h1>
      <Link
        to={`/candidateManagement/${authId}`}
        className="bg-[var(--primary-color)] self-center text-[var(--primary-background-color)] rounded-lg w-64 h-20 text-center content-center"
      >
        Gestion Candidats
      </Link>
      <Link
        to="/offersCreate"
        className="bg-[var(--primary-color)] self-center text-[var(--primary-background-color)] rounded-lg w-64 h-20 text-center content-center"
      >
        Gestion Offres
      </Link>
      <Button
        apply="big self-center"
        name="Déconnexion"
        handleChange={logout}
      />
    </main>
  );
}

export default DashboardConsultant;
