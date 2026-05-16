// Loads artists in the category section
async function loadArtists() {
    const response = await fetch('http://localhost:3000/api/artworks/artists');
    const result = await response.json();
    const artists = result.data;

    const select = document.getElementById('artist');
    select.innerHTML = `<option value="">Select Artist</option>`;

    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.title;
        option.textContent = artist.title;
        select.appendChild(option);
    });
}

// Loads classifications in the category section
async function loadClassifications() {
    const response = await fetch('http://localhost:3000/api/artworks/classifications');
    const classificationResponse = await response.json();

    const select = document.getElementById('classification');
    select.innerHTML = `<option value="">Select Classification</option>`;

    const classifications = new Set();
    classificationResponse.data.forEach(art => {
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

// Loads a preview of featured artworks (comes from Swiper library)
async function loadFeaturedArtworks() {

    const response = await fetch(`http://localhost:3000/api/artworks/featured`);

    const featuredArtworks = await response.json();

    const swiperWrapper = document.getElementById('swiperWrapper');

    swiperWrapper.innerHTML = '';

    featuredArtworks.data.forEach(artwork => {

        if (!artwork.image_id) return;

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        const imageURL = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

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

// Loads a pie chart of total classifications (comes from Chart.js)
async function loadClassificationChart() {
    const response = await fetch('http://localhost:3000/api/artworks/classifications');
    const classificationPieChartResponse = await response.json();

    const classificationCount = {};

    classificationPieChartResponse.data.forEach(art => {
        const type = art.classification_title || 'Unknown';
        classificationCount[type] = (classificationCount[type] || 0) + 1;
    });

    const labels = Object.keys(classificationCount);
    const values = Object.values(classificationCount);

    const ctx = document.getElementById('classificationChart');

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


document.addEventListener('DOMContentLoaded', () => {
    loadArtists();
    loadClassifications();
    loadFeaturedArtworks();
    loadClassificationChart();
})