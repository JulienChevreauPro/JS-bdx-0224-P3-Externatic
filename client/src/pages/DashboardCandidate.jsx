import { useLoaderData } from "react-router-dom";
import FileUpload from "../components/atomic/FileUpload";
import Tag from "../components/atomic/tag/Tag";
import Button from "../components/atomic/buttons/Button";
import CardOfferForCandidate from "../components/atomic/card/CardOfferForCandidate";

function DashboardCandidate() {
  const data = useLoaderData();

  return (
    <main>
      <article className="p-5 md:pl-40 md:pr-40 flex flex-col">
        <header className="mt-10 text-md flex flex-col-reverse items-center gap-5 md:flex-row md:gap-16 md:justify-between ">
          <ul className="flex flex-col gap-2">
            <li>
              <h1 className=" text-[var(--primary-color)] mb-5">
                {data.firstname} {data.lastname}
              </h1>
            </li>
            <li>Mail: {data.email || "Non renseigné"}</li>
            <li>Tel: {data.phone || "Non renseigné"}</li>
            <li>Localisation: {data.name || "Non renseigné"}</li>
          </ul>
          <img src={data.picture || 'https://picsum.photos/200'} alt="" className="md:w-2/12 w-1/2 rounded-full" />
        </header>
        <FileUpload/>
        <h2 className="text-[var(--primary-color)] pb-3">Mes compétences</h2>
        <ul className="flex flex-wrap gap-5">
        {data.technos?.map((techno) => (
          <li className="list-none" key={techno.id}>
            <Tag text={techno.name} apply="tag" />
          </li>
        ))}
        </ul>
        <h2 className="text-[var(--primary-color)] pb-3 pt-10">Mes favoris</h2>
        <ul className="flex flex-wrap gap-5">
          {data.favorites?.map((offer) => (
            <li key={offer.id}>
              <CardOfferForCandidate offer={offer} />
            </li>
          ))}
        </ul>
      </article>
      <footer className="flex flex-col items-center gap-5 p-5">
        <Button type="button" apply="big" name="Déconnexion" />
        <Button type="button" apply="bigDelete" name="Supprimer mon compte" />
      </footer>
    </main>
  );
}

export default DashboardCandidate;