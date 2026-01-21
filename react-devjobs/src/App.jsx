import { useState } from "react";

import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";

import JobsData from "./data.json"

const RESULTS_PER_PAGE = 4;

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(JobsData.length / RESULTS_PER_PAGE);
  const pageResults = JobsData.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE);

  const handlePageChange = function(page) {
    setCurrentPage(page);
  }

  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section className="listing-container">
          <JobListings jobs={pageResults} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
