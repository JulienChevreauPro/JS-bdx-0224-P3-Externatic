export default async function createOffer(url, offer, http) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method: http,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(offer),
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données :", error);
    return null;
  }
}
