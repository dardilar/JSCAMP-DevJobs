
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { Pagination } from "./components/Pagination.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { JobListings } from "./components/JobListings.jsx";
import { JobCard } from "./components/JobCard.jsx";

function App() {
  return (
    <>
      <Header />

      <main>
        <SearchFormSection />

        <section className="listing-container">
          <JobListings />
          <Pagination currentPage={1} totalPages={5} />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
