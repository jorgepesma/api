const breedSelect = document.getElementById('breed');
const imgContainer = document.getElementById('imgContainer');
const cantContainer = document.getElementById('cantContainer');
const breedInfo = document.getElementById('breedInfo');
const infoContent = document.getElementById('infoContent');
const closeButton = document.getElementById("closeBreedInfo"); // Obtener el botón de cierre

// Obtener la lista de razas
axios.get('https://dog.ceo/api/breeds/list/all')
    .then(response => {
        const breeds = Object.keys(response.data.message);
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.text = breed;
            breedSelect.appendChild(option);
        });
    });

breedSelect.addEventListener('change', () => {
    const selectedBreed = breedSelect.value;
    if (selectedBreed) {
        axios.get(`https://dog.ceo/api/breed/${selectedBreed}/images`)
            .then(response => {
                const images = response.data.message;
                cantContainer.textContent = `Cantidad: ${images.length}`;
                imgContainer.innerHTML = ''; // Limpiar imágenes anteriores
                images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = selectedBreed;
                    img.addEventListener('click', () => showBreedInfo(selectedBreed));
                    imgContainer.appendChild(img);
                });
            });
    } else {
        imgContainer.innerHTML = '';
        cantContainer.textContent = "Cantidad: 0";
        breedInfo.classList.add('hidden'); // Ocultar breedInfo si no hay raza seleccionada
    }
});

async function showBreedInfo(breed) {
    try {
        const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
        const images = response.data.message;

        // Información detallada de ejemplo 
        const breedDetails = {
            name: breed,
            description: `Descripción detallada de la raza ${breed}. Esta es información de ejemplo.`,
            temperament: "Temperamento de ejemplo",
            lifeSpan: "10-12 años",
            otherInfo: ""
        };

        infoContent.innerHTML = ""; // Limpiar el contenido anterior

        const breedName = document.createElement('h2');
        breedName.textContent = breedDetails.name;
        infoContent.appendChild(breedName);

        for (const key in breedDetails) {
            if (key !== 'name') {
                const infoItem = document.createElement('p');
                infoItem.textContent = `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${breedDetails[key]}`;
                infoContent.appendChild(infoItem);
            }
        }

        // Mostrar algunas imágenes de ejemplo 
        images.slice(0, 3).forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.style.maxWidth = '100px'; // Ajustar tamaño de las imágenes
            img.style.height = 'auto';
            img.style.margin = '5px';
            infoContent.appendChild(img);
        });

        breedInfo.classList.remove('hidden'); // Mostrar el panel

    } catch (error) {
        console.error("Error fetching breed info:", error);
        infoContent.textContent = "No se encontró información para esta raza."; // Mensaje de error
        breedInfo.classList.remove('hidden'); // Mostrar el panel aunque haya error
    }
}


closeButton.addEventListener("click", () => {
    breedInfo.classList.add("hidden");
});