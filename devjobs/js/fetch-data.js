'use strict'

// fetch data and create cards
const cardsContainer = document.querySelector('.search__results--cards');

fetch('./data.json')
.then(response => response.json())
.then(jobs => {
    jobs.forEach(job => {
        const article = `
        <article class="search__result--card" data-location="${job.data.modalidad}">
            <div>
                <h3>${job.titulo}</h3>
                <p>${job.empresa} | ${job.ubicacion}</p>
                <p>${job.descripcion}</p>
            </div>

            <div class="search__result--card__cta">
                <a class="apply__btn" href="#">Aplicar</a>
            </div>
        </article>`;

        cardsContainer.insertAdjacentHTML('beforeend', article);
    })
})