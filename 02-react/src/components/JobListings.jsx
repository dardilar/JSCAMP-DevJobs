import { JobCard } from './JobCard.jsx';

export function JobListings({ jobs }) {
  return (
    <>
      <section className="search__results">
        <h2>Resultados de búsqueda</h2>

        <div className="search__results--cards">
          {jobs.map(job => {
            return (
              <JobCard key={job.id} job={job} />
            )
          })}
        </div>
      </section>
    </>
  );
}
