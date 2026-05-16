// Loads artists in the category section
async function loadArtists() {

    const response = await fetch(
        'http://localhost:3000/api/artworks/classifications'
    );

    const result = await response.json();

    const select = document.getElementById('artist');

    if (!select) return;

    select.innerHTML =
        `<option value="">Select Artist</option>`;

    const artists = [];

    result.data.forEach(art => {

        if (
            art.artist_title &&
            !artists.includes(art.artist_title)
        ) {

            artists.push(art.artist_title);

        }

    });

    artists.sort();

    artists.forEach(artist => {

        const option = document.createElement('option');

        option.value = artist;

        option.textContent = artist;

        select.appendChild(option);

    });
}

// Loads classifications in the category section
async function loadClassifications() {

    const response = await fetch(
        'http://localhost:3000/api/artworks/classifications'
    );

    const result = await response.json();

    const select = document.getElementById('classification');

    if (!select) return;

    select.innerHTML =
        `<option value="">Select Classification</option>`;

    const classifications = [];

    result.data.forEach(art => {

        if (
            art.classification_title &&
            !classifications.includes(art.classification_title)
        ) {

            classifications.push(art.classification_title);

        }

    });

    classifications.sort();

    classifications.forEach(item => {

        const option = document.createElement('option');

        option.value = item;

        option.textContent = item;

        select.appendChild(option);

    });
}

// Loads a preview of featured artworks
async function loadFeaturedArtworks() {

    const response = await fetch(
        'http://localhost:3000/api/artworks/featured'
    );

    const featuredArtworks = await response.json();

    const swiperWrapper =
        document.getElementById('swiperWrapper');

    if (!swiperWrapper) return;

    swiperWrapper.innerHTML = '';

    featuredArtworks.data.forEach(artwork => {

        if (!artwork.image_id) return;

        const slide = document.createElement('div');

        slide.classList.add('swiper-slide');

        const imageURL =
            `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

        slide.innerHTML = `

            <img src="${imageURL}" alt="${artwork.title}">

            <h3>${artwork.title}</h3>

            <p>${artwork.artist_title || 'Unknown Artist'}</p>

        `;

        swiperWrapper.appendChild(slide);

    });

    new Swiper('.mySwiper', {

        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        slidesPerView: 1,
        spaceBetween: 20,

        breakpoints: {

            768: {
                slidesPerView: 2
            },

            1024: {
                slidesPerView: 3
            }

        }

    });
}

// Loads classification chart
async function loadClassificationChart() {

    const response = await fetch(
        'http://localhost:3000/api/artworks/classifications'
    );

    const result = await response.json();

    const classificationCount = {};

    result.data.forEach(art => {

        const type =
            art.classification_title || 'Unknown';

        classificationCount[type] =
            (classificationCount[type] || 0) + 1;

    });

    const labels = Object.keys(classificationCount);

    const values = Object.values(classificationCount);

    const ctx =
        document.getElementById('classificationChart');

    if (!ctx) return;

    new Chart(ctx, {

        type: 'pie',

        data: {

            labels: labels,

            datasets: [{

                data: values,

                backgroundColor: [
                    '#548c6e',
                    '#8bbab4',
                    '#7beda5',
                    '#4bc0c0',
                    '#bf89a9',
                    '#4a58b5'
                ]

            }]

        },

        options: {
            responsive: true
        }

    });
}

// Search artworks
async function searchArt(event) {

    event.preventDefault();

    const searchValue =
        document.getElementById('searchInput').value;

    if (!searchValue.trim()) {

        alert('Please enter a search.');

        return;

    }

    const response = await fetch(
        `http://localhost:3000/api/artworks/search?q=${searchValue}`
    );

    const artworks = await response.json();

    const resultsSection =
        document.getElementById('artworkResults');

    resultsSection.innerHTML = '';

    artworks.forEach(art => {

        const card = document.createElement('div');

        card.classList.add('art-card');

        card.innerHTML = `

            <img src="${art.image}" width="250">

            <h3>${art.title}</h3>

            <p>${art.artist}</p>

            <button class="save-btn">
                Save Favorite
            </button>

        `;

        const button = card.querySelector('.save-btn');

        button.addEventListener('click', () => {

            saveFavorite(art);

        });

        resultsSection.appendChild(card);

    });
}

// Save favorite
async function saveFavorite(art) {

    await fetch(
        'http://localhost:3000/api/favorites',
        {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                artwork_id: art.id,
                title: art.title,
                artist: art.artist,
                image_url: art.image

            })

        }
    );

    alert('Favorite Saved');

}

// Load favorites
async function loadFavorites() {

    const response = await fetch(
        'http://localhost:3000/api/favorites'
    );

    const favorites = await response.json();

    const container =
        document.getElementById('favoritesContainer');

    if (!container) return;

    container.innerHTML = '';

    favorites.forEach(art => {

        container.innerHTML += `

            <div class="art-card">

                <img src="${art.image_url}" width="250">

                <h3>${art.title}</h3>

                <p>${art.artist}</p>

            </div>

        `;

    });
}

// Filter artworks
async function filterArtworks(event) {

    event.preventDefault();

    const classification =
        document.getElementById('classification').value;

    const response = await fetch(
        'http://localhost:3000/api/artworks/classifications'
    );

    const result = await response.json();

    let artworks = result.data;

    if (classification) {

        artworks = artworks.filter(art =>

            art.classification_title &&
            art.classification_title.toLowerCase() ===
            classification.toLowerCase()

        );
    }

    const resultsSection =
        document.getElementById('artworkResults');

    resultsSection.innerHTML = '';

    if (artworks.length === 0) {

        resultsSection.innerHTML =
            '<p>No artworks found for selected filters.</p>';

        return;

    }

    artworks.forEach(art => {

        if (!art.image_id) return;

        const imageURL =
            `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`;

        const card = document.createElement('div');

        card.classList.add('art-card');

        card.innerHTML = `

            <img src="${imageURL}" width="250">

            <h3>${art.title}</h3>

            <p>${art.artist_title || 'Unknown Artist'}</p>

        `;

        resultsSection.appendChild(card);

    });
}

document.addEventListener('DOMContentLoaded', () => {

    loadArtists();

    loadClassifications();

    loadFeaturedArtworks();

    loadClassificationChart();

    loadFavorites();

    const filterForm =
        document.getElementById('filterForm');

    if (filterForm) {

        filterForm.addEventListener(
            'submit',
            filterArtworks
        );

    }

});