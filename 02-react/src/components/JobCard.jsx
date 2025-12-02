import { useState } from "react";

export function JobCard ({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = function(e) {
    e.preventDefault();
    setIsApplied(true);
  }

  const buttonClasses = isApplied ? 'apply__btn--active' : 'apply__btn';
  const buttonLabel = isApplied ? 'Aplicado' : 'Aplicar';

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
            className={`apply__btn ${buttonClasses}`}
            href="#"
            onClick={handleApply}
          >
            {buttonLabel}
          </a>
        </div>
      </article>
    </>
  );
};