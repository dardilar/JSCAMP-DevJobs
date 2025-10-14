'use strict';

const searchResults = document.querySelector('.search__results');

// Apply button change styles
searchResults.addEventListener('click', function(e) {
    const applyBtn = e.target.closest('.apply__btn');

    if(applyBtn) {
        e.preventDefault();
        applyBtn.textContent = '¡Aplicado!';
        applyBtn.classList.add('apply__btn--active');
    }
})

// Filter 'Ubicación'
const locationFilter = document.querySelector('#ubicacion');
const cardsLocation = document.querySelectorAll('.search__result--card');

locationFilter.addEventListener('change', function(e) {
    const location = e.target.value;
    
    cardsLocation.forEach(function(card) {
        const cardLocation = card.dataset.location;
        
        if(location === cardLocation || location === '') {
            card.classList.remove('hidden');
        }else {
            card.classList.add('hidden');
        }
    })
})