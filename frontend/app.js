async function loadArtists() {
    const artists = await fetch('http://localhost:3000/api/artworks/artists');
    const data = await artists.json();

    const select = document.getElementById('artist');
    select.innerHTML = `<option value="">Select Artist</option>`;

    data.data.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.title;
        option.textContent = artist.title;
        select.appendChild(option);
    });
}

async function loadClassifications() {
    const response = await fetch('http://localhost:3000/api/artworks/classifications');
    const data = await response.json();

    const select = document.getElementById('classification');
    select.innerHTML = `<option value="">Select Classification</option>`;

    const classifications = new Set();

    data.data.forEach(art => {
        if (art.classification_title) {
            classifications.add(art.classification_title);
        }
    });

    classifications.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        select.appendChild(option);
    });
}

async function loadFeaturedArtworks() {

    const randomPage = Math.floor(Math.random() * 100) + 1;

    const response = await fetch(
        `http://localhost:3000/api/artworks/featured`
    );

    const data = await response.json();

    const swiperWrapper = document.getElementById('swiperWrapper');

    swiperWrapper.innerHTML = '';

    data.data.forEach(artwork => {

        if (!artwork.image_id) return;

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const imageUrl = `
            https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg
        `;

        slide.innerHTML = `
            <img src="${imageUrl}" alt="${artwork.title}">
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

async function loadClassificationChart() {
    const response = await fetch('http://localhost:3000/api/artworks/classifications');
    const data = await response.json();

    const counts = {};

    data.data.forEach(art => {
        const type = art.classification_title || "Unknown";
        counts[type] = (counts[type] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    const ctx = document.getElementById('classificationChart');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffce56',
                    '#4bc0c0',
                    '#9966ff',
                    '#ff9f40'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadArtists();
    loadClassifications();
    loadFeaturedArtworks();
    loadClassificationChart();
})