export default function JobCard ({ job }) {
  return (
    <>
      <article
        className="search__result--card"
        data-location={job?.modalidad}
        data-level={job?.nivel}
        data-technology={job?.technology}
      >
        <div>
          <h3 className="search__result--card__title">{job?.titulo}</h3>
          <p>
            {job?.empresa} | {job?.ubicacion}
          </p>
          <p>{job?.descripcion}</p>
        </div>

        <div className="search__result--card__cta">
          <a
            className="apply__btn"
            href="#"
          >
            Aplicar
          </a>
        </div>
      </article>
    </>
  );
};