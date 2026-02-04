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
  setCurrentPage(1)
}, [textToFilter, filters.technology, filters.location, filters.experienceLevel])

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if(textToFilter) params.append('text', textToFilter);
        if(filters.technology) params.append('technology', filters.technology);
        if(filters.location) params.append('type', filters.location);
        if(filters.experienceLevel) params.append('level', filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append('limit', RESULTS_PER_PAGE);
        params.append('offset', offset);

        const queryParams = params.toString();

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);
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
  }, [filters, textToFilter, currentPage]);


  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

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
