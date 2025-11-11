import Header from './components/Header';
import SearchFormSection from './components/SearchFormSection';
import Pagination from './components/Pagination';
import JobListings from './components/JobListings';

export default function App() {
  return (
    <>
        <Header />
        <main className="container__results">
            <SearchFormSection />
            
            <JobListings />

            <Pagination />  
        </main>
    </>
  );
}