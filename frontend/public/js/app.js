document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.getElementById("breedSelect");
  const breedCount = document.getElementById("breedCount");
  const dogDetails = document.getElementById("dogDetails");
  const loader = document.getElementById("loader");

  // ========================
  // 1. Cargar todas las razas
  // ========================
  const loadDogs = async () => {
    try {
      showLoader();
      const response = await axios.get("/api/dogs");
      
      if (response.data.length === 0) {
        dogDetails.innerHTML = "<p>⚠️ No hay razas registradas</p>";
        return;
      }
      
      initializeBreedSelector(response.data);
    } catch (error) {
      dogDetails.innerHTML = "<p>🚨 Error cargando datos</p>";
    } finally {
      hideLoader();
    }
  };

  // ========================
  // 2. Inicializar selector de razas (dropdown)
  // ========================
  const initializeBreedSelector = (dogs) => {
    breedSelect.innerHTML = `<option value="">-- Selecciona una raza --</option>` +
      dogs.map(dog => `<option value="${dog.breed}">${dog.breed}</option>`).join('');
    
    breedCount.textContent = `Total de razas: ${dogs.length}`;

    breedSelect.addEventListener("change", async (e) => {
      if (e.target.value) {
        await showDetails(e.target.value);
      } else {
        dogDetails.innerHTML = "";
      }
    });
  };

  // ========================
  // 3. Mostrar detalles de la raza seleccionada
  // ========================
  const showDetails = async (breedName) => {
    try {
      showLoader();
      // Se usa la ruta para buscar por nombre
      const response = await axios.get(`/api/dogs/breed/${encodeURIComponent(breedName)}`);
      const dog = response.data;
      
      // Se verifica que la imagen tenga un valor válido; si no, se asigna la imagen default
      const imgSrc = (dog.image && dog.image !== 'undefined') ? dog.image : '/images/default-dog.jpg';

      dogDetails.innerHTML = `
        <div class="breed-details">
          <h2>${dog.breed}</h2>
          <img src="${imgSrc}" alt="${dog.breed}" onerror="this.src='/images/default-dog.jpg'">
          <div class="details-list">
            <p><strong>📅 Esperanza de vida:</strong> ${dog.life_span}</p>
            <p><strong>📏 Altura:</strong> ${dog.height}</p>
            <p><strong>🌡️ Temperamento:</strong> ${dog.temperament}</p>
          </div>
        </div>
      `;
    } catch (error) {
      dogDetails.innerHTML = "<p>🚨 Error cargando detalles</p>";
    } finally {
      hideLoader();
    }
  };

  // ========================
  // Funciones auxiliares
  // ========================
  const showLoader = () => {
    if (loader) loader.style.display = "block";
  };

  const hideLoader = () => {
    if (loader) loader.style.display = "none";
  };

  // Iniciar carga de razas
  loadDogs();
});
