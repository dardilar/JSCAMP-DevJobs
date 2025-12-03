import { useState } from "react";

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { Pagination } from "../components/Pagination.jsx";
import Data from "../data.json";


const RESULTS_PER_PAGE = 5;

export function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [textFilter, setTextFilter] = useState('');
  const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experience: ''
  });
  
  const jobsWithFilters = Data.filter(job => {
    return (
      (filters.technology === '' || job.data.technology === filters.technology) &&
      (filters.location === '' || job.data.modalidad === filters.location) &&
      (filters.experience === '' || job.data.nivel === filters.experience)
    )
  });
    
  const jobsWithTextFilter = textFilter === '' ? jobsWithFilters : jobsWithFilters.filter(job => {
    return job.titulo.toLowerCase().includes(textFilter.toLowerCase())
  });

  // Pagination logic
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);
  const pageResults = jobsWithTextFilter.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);


  const handlePageChange = function(page) {
    setCurrentPage(page);
  }

  const handleSearch = function(filters) {
    setFilters(filters);
    setCurrentPage(1);
  }

  const handelTextFilter = function(text) {
    setTextFilter(text);
    setCurrentPage(1);
  }

  return (
      <main className="container__results">
        <SearchFormSection onSearch={handleSearch} onTextFilter={handelTextFilter} />

        <JobListings jobs={pageResults} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
  );
}
