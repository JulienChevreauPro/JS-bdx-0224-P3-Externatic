// import { toast } from "react-toastify";

// eslint-disable-next-line import/prefer-default-export
export async function deleteOffer(url, offer, http) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${url}/${offer.id}`,
      {
        method: http,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return { ok: true };
    }

    const errorText = await response.text();
    return { ok: false, error: errorText };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'offre :", error);
    throw new Error(`Erreur lors de la suppression de l'offre : ${error.message}`);
  }
}
