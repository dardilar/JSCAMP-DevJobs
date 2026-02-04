import { JobCard } from "./JobCard.jsx"

export function JobListings({ jobs }) {
    return (
        <>
            <h2>Resultados de búsqueda</h2>

            <div className="jobs-listings">
                {
                    jobs.length === 0 && (
                        <p style={{textAlign: 'center', padding: '1rem', textWrap: 'balance'}}>No se encontraron resultados que coincidan con los criterios de búsqueda</p>
                    )
                }
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}