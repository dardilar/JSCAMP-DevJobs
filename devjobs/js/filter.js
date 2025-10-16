'use strict'

// Filter 'Ubicación'
const locationFilter = document.querySelector('#ubicacion');

locationFilter.addEventListener('change', function() {
    const cardsLocation = document.querySelectorAll('.search__result--card');
    const location = locationFilter.value;
    
    cardsLocation.forEach(function(card) {
        const cardLocation = card.dataset.location;
        const isHidden = location === cardLocation || location === ''
        
        card.classList.toggle('hidden', !isHidden);
    })
})

// Input 'search' filter
const searchInput = document.querySelector('#search');

searchInput.addEventListener('input', function(e) {
    const searchValue = searchInput.value;
    console.log(searchValue);
})