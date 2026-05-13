'use strict'

class DevJobsAvatar extends HTMLElement {
    constructor() {
        super(); // Llama al constructor de la clase padre HTMLElement

        this.attachShadow({ mode: 'open' }); // Permite acceder al DOM del elemento personalizado
    }

    createUrl(service, username) {
        return `https://unavatar.io/${service}/${username}`;
    }

    render() {
        const service = this.getAttribute('service') ?? 'github';
        const username = this.getAttribute('username') ?? 'dardilar';
        const size = this.getAttribute('size') ?? '40';

        const url = this.createUrl(service, username);
        
        this.shadowRoot.innerHTML = `
            <style>
                .avatar {
                    border-radius: 50%;
                }
            </style>

            <img src="${url}" alt="Imagen de perfil" class="avatar" width="${size}" height="${size}">`;
    }

    //Cuando el elemento se inserta en el DOM
    connectedCallback() {
        this.render();
    }
}

// Registra el elemento personalizado
customElements.define('devjobs-avatar', DevJobsAvatar);
