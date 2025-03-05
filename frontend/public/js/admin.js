document.addEventListener('DOMContentLoaded', () => {
    const dogList = document.getElementById('dogList');
    const createForm = document.getElementById('createForm');
  
    // Cargar todas las razas
    const loadDogs = async () => {
      try {
        const response = await axios.get('/api/dogs');
        renderDogList(response.data);
      } catch (error) {
        dogList.innerHTML = '<p class="error">Error cargando razas</p>';
      }
    };
  
    // Renderizar lista
    const renderDogList = (dogs) => {
      dogList.innerHTML = dogs.map(dog => `
        <div class="dog-item">
          <img src="${dog.image}" alt="${dog.breed}" class="admin-image">
          <div class="dog-details">
            <h3>${dog.breed}</h3>
            <button onclick="editDog('${dog._id}')">Editar</button>
            <button onclick="deleteDog('${dog._id}')">Eliminar</button>
          </div>
        </div>
      `).join('');
    };
  
    // Crear nueva raza
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await axios.post('/api/admin/dogs', {
          breed: document.getElementById('breed').value,
          image: document.getElementById('image').value,
          temperament: document.getElementById('temperament').value,
          life_span: document.getElementById('life_span').value,
          height: document.getElementById('height').value
        });
        loadDogs();
        createForm.reset();
      } catch (error) {
        alert('Error creando raza');
      }
    });
  
    // Funciones globales
    window.editDog = async (id) => {
      try {
        const response = await axios.get(`/api/dogs/id/${id}`);
        const dog = response.data;
        document.getElementById('editId').value = dog._id;
        document.getElementById('editBreed').value = dog.breed;
        document.getElementById('editImage').value = dog.image;
        document.getElementById('editTemperament').value = dog.temperament;
        document.getElementById('editLifeSpan').value = dog.life_span;
        document.getElementById('editHeight').value = dog.height;
        document.getElementById('editForm').classList.remove('hidden');
      } catch (error) {
        alert('Error cargando datos para editar');
      }
    };
  
    window.deleteDog = async (id) => {
      if (confirm('¿Eliminar esta raza?')) {
        try {
          await axios.delete(`/api/admin/dogs/${id}`);
          loadDogs();
        } catch (error) {
          alert('Error eliminando raza');
        }
      }
    };
  
    // Actualizar raza
    document.getElementById('editForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await axios.put(`/api/admin/dogs/${document.getElementById('editId').value}`, {
          breed: document.getElementById('editBreed').value,
          image: document.getElementById('editImage').value,
          temperament: document.getElementById('editTemperament').value,
          life_span: document.getElementById('editLifeSpan').value,
          height: document.getElementById('editHeight').value
        });
        loadDogs();
        document.getElementById('editForm').classList.add('hidden');
      } catch (error) {
        alert('Error actualizando raza');
      }
    });
  
    // Iniciar
    loadDogs();
  });
  