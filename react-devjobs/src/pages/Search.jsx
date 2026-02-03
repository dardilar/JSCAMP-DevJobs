import { useEffect } from "react";

import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useFilters } from "../hooks/useFilters.jsx";

export function SearchPage() {
  // useFilters Hook
  const { currentPage, jobsWithTextFilter, totalPages, pageResults, handlePageChange, handleSearch, handleTextFilter } = useFilters();
  
  // useEffect Hook
  useEffect(() => {
    document.title = `Results: ${jobsWithTextFilter.length}, Page: ${currentPage}`;
  }, [currentPage, jobsWithTextFilter]);

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
