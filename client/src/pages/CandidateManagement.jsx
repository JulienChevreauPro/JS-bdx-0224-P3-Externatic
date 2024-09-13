import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import SearchInputConsultant from "../components/atomic/inputConsultant/searchInput/SearchInputConsultant";
import CardConsultant from "../components/atomic/card/CardConsultant";
import PreviousPage from "../components/atomic/buttons/PreviousPage";

function CandidateManagement() {
  const candidatesData = useLoaderData();  

  const userData = useContext(AuthContext);

  const [authId, setAuthId] = useState(null);

  useEffect(() => {
    if (userData.auth.id !== authId) {
      setAuthId(userData.auth.id);
    }
  }, [userData, authId]);

  const [inputLastnameContent, setInputLastnameContent] = useState("");

  const filteredCandidatesByLastname = Array.isArray(candidatesData)
    ? candidatesData.filter((candidate) =>
        candidate.lastname
          .toLowerCase()
          .includes(inputLastnameContent.toLowerCase())
      )
    : [];

  return (
    <main className="flex flex-col gap-10 min-h-screen">
      <PreviousPage
        marginLeft="ml-10"
        source={`/dashboardConsultant/${authId}`}
      />
      <h1 className="self-center text-3xl text-[var(--secondary-color)]">
        Vos Candidats
      </h1>
      <form className="self-center flex flex-col gap-4">
        <SearchInputConsultant
          id={candidatesData.id}
          placeholder="Rechercher des candidats..."
          value={inputLastnameContent}
          onChange={(e) => setInputLastnameContent(e.target.value)}
        />
      </form>
      <section className="mx-4 gap-5 flex flex-col items-center md:flex-row md:flex-wrap md:justify-center">
        {filteredCandidatesByLastname.length > 0 ? (
          filteredCandidatesByLastname.map((candidate) => (
            <CardConsultant key={candidate.id} user={candidate} />
          ))
        ) : (
          <h2 className="text-2xl text-[var(--primary-color)] mt-20 outline outline-1 outline-[var(--primary-color)] p-10 rounded-lg">
            Aucun candidat pour le moment...
          </h2>
        )}
      </section>
    </main>
  );
}

export default CandidateManagement;
