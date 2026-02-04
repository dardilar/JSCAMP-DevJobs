import { useState, useEffect } from "react";
import JobsData from "../data.json";

const RESULTS_PER_PAGE = 4;

export const useFilters = function () {
  // States
  const [currentPage, setCurrentPage] = useState(1);

  const [textToFilter, setTextToFilter] = useState("");
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experienceLevel: "",
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        //delay 5s
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await fetch('https://jscamp-api.vercel.app/api/jobs');
        const json = await response.json();
        
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error('Error fetching jobs:', error); 
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);


  const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

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

  return {
    loading,
    currentPage,
    jobs,
    total,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};
