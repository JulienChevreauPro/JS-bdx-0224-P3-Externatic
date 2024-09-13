/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import Dropzone from "react-dropzone";
import ButtonSubmit from "./buttons/ButtonSubmit";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("myfile", file);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        setUploadSuccess(true);
      } catch (err) {
        console.error("Upload error", err);
        setUploadSuccess(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center md:items-start mt-8 mb-8"
    >
      <Dropzone
        onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
        accept={{ 'application/pdf': [] }}
      >
        {({ getRootProps, getInputProps }) => (
          <label
            {...getRootProps()}
            className="gap-3 w-80 md:w-96 flex flex-col align-center outline-dashed outline-1 p-5 outline-[var(--secondary-color)] hover:bg-[var(--secondary-background-color)] mb-5"
          >
            <svg
              width="64"
              height="73"
              viewBox="0 0 74 83"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54 71.4444H71M62.5 62.8889V80M37 3H16.6C11.8396 3 9.45932 3 7.64109 3.93251C6.04168 4.75273 4.74135 6.06156 3.92646 7.67142C3 9.50154 3 11.8973 3 16.6889V66.3111C3 71.1026 3 73.4986 3.92646 75.3287C4.74135 76.9384 6.04168 78.2474 7.64109 79.0674C9.45932 80 11.8396 80 16.6 80H32.75M37 3L62.5 28.6667M37 3V21.8222C37 24.218 37 25.4159 37.4633 26.331C37.8708 27.1359 38.5206 27.7903 39.3205 28.2004C40.2296 28.6667 41.4196 28.6667 43.8 28.6667H62.5M62.5 28.6667V41.5M20 62.8889H32.75M20 45.7778H45.5M20 28.6667H24.25"
                stroke="#CA2061"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input {...getInputProps()} />
            {uploadSuccess === null && (
              <p>Glissez le fichier ici ou cliquez pour le sélectionner</p>
            )}
            {uploadSuccess === true && (
              <p>Le fichier a été téléchargé avec succès! ✅</p>
            )}
            {uploadSuccess === false && (
              <p>Erreur lors du téléchargement du fichier. ❌</p>
            )}
            <ul>
              {file && (
                <ul>
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                </ul>
              )}
            </ul>
          </label>
        )}
      </Dropzone>
      <ButtonSubmit apply="medium" name="Envoyer" />
    </form>
  );
}
