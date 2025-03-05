const axios = require('axios');
const Dog = require('../models/Dog');

exports.loadInitialData = async () => {
  try {
    const count = await Dog.countDocuments();
    if (count === 0) {
      console.log('⚙️ Cargando datos iniciales...');
      const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': process.env.THE_DOG_API_KEY || '' // Agrega tu API key en el .env si la tienes
        }
      });
      const dogsData = response.data;

      const dogsToSave = dogsData.map(dog => {
        // Intentamos obtener la URL de la imagen
        let imageUrl = '/images/default-dog.jpg'; // valor por defecto
        if (dog.image && dog.image.url) {
          imageUrl = dog.image.url;
        } else if (dog.reference_image_id) {
          imageUrl = `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`;
        }
        return {
          breed: dog.name,
          image: imageUrl,
          temperament: dog.temperament || 'No especificado',
          life_span: dog.life_span || 'No especificado',
          height: (dog.height && dog.height.metric) ? dog.height.metric : 'No especificado',
          // Se muestra "Sin descripción" si no existe bred_for
          description: dog.bred_for ? dog.bred_for : 'Sin descripción'
        };
      });

      await Dog.insertMany(dogsToSave);
      console.log('✅ Datos iniciales cargados');
    }
  } catch (error) {
    console.error('❌ Error en carga inicial:', error);
  }
};
