'use strict'

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