import { useEffect } from "react";

import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";

import { useFilters } from "../hooks/useFilters.jsx";

export function SearchPage() {
  // useFilters Hook
  const {
    loading,
    currentPage,
    jobs,
    total,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    filters,
  } = useFilters();

  // useEffect Hook
  useEffect(() => {
    document.title = `Results: ${total}, Page: ${currentPage}`;
  }, [currentPage, total]);

  // Render
  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        filters={filters}
      />

      <section className="listing-container">
        
        {loading ? (
          <p>Cargando empleos...</p>
        ) : (
          <JobListings jobs={jobs} />
        )}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
