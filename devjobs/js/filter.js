'use strict'

const searchInput = document.querySelector('#search');
const locationFilter = document.querySelector('#ubicacion');
const levelFilter = document.querySelector('#nivel');

const applyAllFilters = function() {
    const searchValue = searchInput.value.toLowerCase();
    const location = locationFilter.value;
    const level = levelFilter.value;
    const cardsContainer = document.querySelectorAll('.search__result--card');

    cardsContainer.forEach(function(card) {
      let isHidden = false;
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

      card.classList.toggle('hidden', isHidden);
    }) 
}

// Filter 'Location'
locationFilter.addEventListener('change', function() {
    applyAllFilters();
})

// Filter 'Level'
levelFilter.addEventListener('change', function() {
    applyAllFilters();
})

// Input 'search' filter
searchInput.addEventListener('input', function() {
    applyAllFilters();
})