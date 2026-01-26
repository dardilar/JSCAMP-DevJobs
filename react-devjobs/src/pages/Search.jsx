import { useState } from "react";

import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";

import JobsData from "../data.json";

const RESULTS_PER_PAGE = 4;

export function SearchPage() {
  // States
  const [currentPage, setCurrentPage] = useState(1);

  const [textToFilter, setTextToFilter] = useState("");
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });

  // Filters
  const jobsFilteredByFilters = JobsData.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology === filters.technology.toLowerCase()) &&
      (filters.location === "" ||
        job.data.modalidad === filters.location.toLowerCase()) &&
      (filters.experienceLevel === "" ||
        job.data.nivel === filters.experienceLevel.toLowerCase())
    );
  });

  const jobsWithTextFilter =
    textToFilter === ""
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) => {
          return job.titulo.toLowerCase().includes(textToFilter.toLowerCase());
        });

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);
  const pageResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  // Handlers
  // Pagination
  const handlePageChange = function (page) {
    setCurrentPage(page);
  };

  // SearchFormSection
  const handleSearch = function (filters) {
    setCurrentPage(1);
    setFilters(filters);
  };

  const handleTextFilter = function (text) {
    setCurrentPage(1);
    setTextToFilter(text);
  };

  // Render
  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />

      <section className="listing-container">
        <JobListings jobs={pageResults} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
