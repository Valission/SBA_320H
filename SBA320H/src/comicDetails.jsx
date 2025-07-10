import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import md5 from 'md5'; // Make sure this is imported

function ComicDetails() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComicById() {
      try {
        const timeStamp = Date.now().toString();
        const publicKey = "8479f9c35a3fa0c6bbd2192eb7dd60e6";
        const privateKey = "5ec1a2baa353d79019b70efe24b46bf1902bb7bb";
        const hash = md5(timeStamp + privateKey + publicKey);

        const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}`;
        console.log("Fetching comic by ID:", url);

        const response = await fetch(url);
        const data = await response.json();
        console.log("Comic detail data:", data);

        if (!data.data || data.data.results.length === 0) {
          setError("Comic not found");
        } else {
          setComic(data.data.results[0]);
        }
      } catch (err) {
        console.error("Error fetching comic:", err);
        setError("Failed to load comic");
      }
    }

    fetchComicById();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!comic) return <p>Loading...</p>;

  return (
    <div className="ComicDetail">
      <h2>{comic.title}</h2>
      <img
        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
        width="300"
      />
      <p dangerouslySetInnerHTML={{ __html: comic.description || "No description available." }} />
    </div>
  );
}

export default ComicDetails;