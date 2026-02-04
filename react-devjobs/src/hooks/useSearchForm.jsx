import { useState } from "react";

let timeoutId = null;

export const useSearchForm = function({ idTechnology, idLocation, idExperienceLevel, idText, onSearch, onTextFilter }) {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget)

    if(e.target.name === idText) {
      return;
    }
  
    const filters = {
      technology: formData.get(idTechnology),
      location: formData.get(idLocation),
      experienceLevel: formData.get(idExperienceLevel),
    }
  
    onSearch(filters);
  }
  
  const handleTextChange = function(e) {
    const text = e.target.value;
    setSearchText(text); // Update input immediately

    // Debounce: Cancel previous timeout
    if(timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      onTextFilter(text);
    }, 500);
  }

  return {
    handleSubmit,
    handleTextChange,
  }
}