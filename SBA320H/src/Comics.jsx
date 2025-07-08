function ComicList({ comics }) {
  return (
    <div className="CGrid">
      {comics.map((comic) => (
        <div key={comic.id} className="ComicCard">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
            width="200"
          />
          <p>{comic.title}</p>
        </div>
      ))}
    </div>
  );
}

export default ComicList;