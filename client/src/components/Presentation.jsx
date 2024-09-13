import { useModal } from "../contexts/ModalContext";
import Button from "./atomic/buttons/Button";

function Presentation() {
  const { handleChangeModal } = useModal();

  return (
    <section className="flex flex-col items-center">
      <h1 className="mt-6 text-5xl md:text-7xl text-center text-[var(--secondary-color)] md:mt-16">
        Externatic
      </h1>
      <h2 className="flex-none my-10 text-3xl md:text-4xl mx-8 md:mx-0 text-[var(--primary-color)] md:self-start md:ml-28 md:mt-20">
        Ton prochain job à portée de clicks
      </h2>
      <p className="max-w-prose mx-8 md:mx-0 md:ml-28 mb-10 md:mb-10 md:self-start md:animate-fade-left md:animate-once md:animate-duration-700 md:animate-delay-300">
        Externatic est un cabinet dédié au recrutement de profils d’experts,
        ingénieurs et managers dans le domaine de l’informatique. Les
        entreprises nous font confiance et ça booste votre candidature. Faire
        appel à un cabinet fait passer votre CV sur le haut de la pile! Faire
        appel à nous, c’est donc vous ouvrir à un réseau d’entreprises qui ne
        publient pas forcément leurs offres. Plus de 400 entreprises, de la
        startup à la DSI en passant par les éditeurs de logiciels, agence web,
        PME…
      </p>
      <h2 className="flex-none mx-8 text-3xl md:text-4xl md:mx-8 my-10 text-[var(--primary-color)] md:self-end md:mr-28 md:mt-20">
        Plus qu’un cabinet de recrutement informatique
      </h2>
      <p className="max-w-prose md:self-end md:mr-44 mx-8 mb-16 md:mb-32 md:text-left md:mx-0 md:animate-fade-right md:animate-once md:animate-duration-700 md:animate-delay-300">
        Externatic, c’est avant tout une équipe d’experts IT, tous animés par la
        même passion des relations humaines. L’intelligence émotionnelle et
        l’éducation cognitive ne peuvent être remplacées par des algorithmes.
        Notre cabinet de recrutement s’appuie sur des méthodes authentiques, où
        l’humain est tout simplement indispensable.
      </p>
      <Button
        apply="big"
        name="S'inscrire"
        handleChange={handleChangeModal}
      />
    </section>
  );
}

export default Presentation;
