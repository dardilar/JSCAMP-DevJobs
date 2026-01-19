
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import { JobCard } from "./components/JobCard.jsx";

function App() {
  const handlePageChange = function(page) {
    console.log('Cambiando la página a:', page);
  }

  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section className="listing-container">
          <JobListings />
          <Pagination currentPage={3} totalPages={5} onPageChange={handlePageChange} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
