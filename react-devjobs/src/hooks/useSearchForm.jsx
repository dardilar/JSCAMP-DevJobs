import { useState } from "react";

export const useSearchForm = function({ idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)
  
    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }
  
    onSearch(filters);
  }
  
  const handleTextChange = function(e) {
    const text = e.target.value;
    setSearchText(text);
    onTextFilter(text);
  }

  return {
    handleSubmit,
    handleTextChange,
  }
}