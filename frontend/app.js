async function searchArtworks() {

}

async function loadArtists() {
    const artists = await fetch('https://api.artic.edu/api/v1/agents?limit=100');
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
    const classification = await fetch('https://api.artic.edu/api/v1/artworks?limit=100');
    const data = await classification.json();

    const select = document.getElementById('classification');
    select.innerHTML = `<option value="">Select Classification</option>`;

    const classification = new Set();

    data.data.forEach(art => {
        if (art.classification_title) {
            classifications.add(art.classification_title);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadArtists();
    loadClassifications();
})