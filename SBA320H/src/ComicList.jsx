import { Link } from 'react-router-dom';

function ComicList({ comics }) {
  return (
    <div className="CGrid">
      {comics.map((comic) => (
        <div key={comic.id} className="ComicCard">
          <Link to={`/comic/${comic.id}`}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              width="200"
            />
            <p>{comic.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ComicList;