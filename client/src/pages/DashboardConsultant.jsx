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
        className="mx-auto w-80 h-20 z-10 bg-[var(--primary-color)] rounded-md relative font-semibold text-[var(--primary-background-color)] max-md:w-64 max-md:h-20 max-md:text-sm text-center content-center"
      >
        Gestion Candidats
      </Link>
      <Link
        to="/offersCreate"
        className="mx-auto w-80 h-20 z-10 bg-[var(--primary-color)] rounded-md relative font-semibold text-[var(--primary-background-color)] max-md:w-64 max-md:h-20 max-md:text-sm text-center content-center"
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
