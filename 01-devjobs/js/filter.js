'use strict'

const searchInput = document.querySelector('#search');
const locationFilter = document.querySelector('#ubicacion');
const levelFilter = document.querySelector('#nivel');
const technologyFilter = document.querySelector('#categoria');

const applyAllFilters = function() {
    const searchValue = searchInput.value.toLowerCase();
    const location = locationFilter.value;
    const level = levelFilter.value;
    const technology = technologyFilter.value;
    const cardsContainer = document.querySelectorAll('.search__result--card');

    cardsContainer.forEach(function(card) {
      let isHidden = false;
      const technologies = card.dataset.technology.split(',');
      const title = card.querySelector('.search__result--card__title').textContent.toLowerCase();

      // Search filter
      if(searchValue && !title.includes(searchValue)) {
        isHidden = true;
      }

      // Location filter
      if(location && card.dataset.location !== location) {
        isHidden = true;
      }

      // Level filter
      if(level && card.dataset.level !== level) {
        isHidden = true;
      }

      // Technology filter
      if(technology && !technologies.includes(technology)) {
        isHidden = true;
      }

      card.classList.toggle('hidden', isHidden);
    }) 
}

// Event listener Input 'search' filter
searchInput.addEventListener('input', function() {
    applyAllFilters();
})

// Event listener Filter 'Location'
locationFilter.addEventListener('change', function() {
    applyAllFilters();
})

// Event listener Filter 'Level'
levelFilter.addEventListener('change', function() {
    applyAllFilters();
})

// Event listener Filter 'Technology'
technologyFilter.addEventListener('change', function() {
    applyAllFilters();
})