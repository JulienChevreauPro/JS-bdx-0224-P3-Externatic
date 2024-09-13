export default async function fetchMultipleApis(urls) {
  try {
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(import.meta.env.VITE_API_URL + url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.json();
          })
      )
    );
    return responses;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
}
