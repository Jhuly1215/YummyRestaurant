const Mesa = require('./mesasModel'); // Asegúrate de que la ruta al modelo sea correcta


// Función para obtener todas las actividades
const obtenerMesa = async (req, res) => {
  try {
    const actividades = await Mesa.findAll();
    res.status(200).json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener las actividades' });
  }
};

// Función para crear una nueva actividad
const crearMesa = async (req, res) => {
  try {
    const { capacidad, nombre, posx, posy } = req.body;

    const nuevaMesa = await Mesa.create({ capacidad, nombre, posx, posy });
    res.status(201).json(nuevaMesa);
  } catch (error) {
    console.error('Error al crear Mesa:', error);
    res.status(500).json({ error: 'Error al crear la Mesa' });
  }
};
// Función para actualizar una mesa
const actualizarMesa = async (req, res) => {
    try {
      const { id } = req.params;
      const { capacidad, nombre, posx, posy } = req.body;
  
      const mesa = await Mesa.findByPk(id);
  
      if (mesa) {
        // Actualiza los campos de la mesa
        mesa.capacidad = capacidad !== undefined ? capacidad : mesa.capacidad;
        mesa.nombre = nombre !== undefined ? nombre : mesa.nombre;
        mesa.posx = posx !== undefined ? posx : mesa.posx;
        mesa.posy = posy !== undefined ? posy : mesa.posy;
  
        await mesa.save(); // Guarda los cambios en la base de datos
  
        res.status(200).json(mesa);
      } else {
        res.status(404).json({ error: 'Mesa no encontrada' });
      }
    } catch (error) {
      console.error('Error al actualizar la mesa:', error);
      res.status(500).json({ error: 'Error al actualizar la mesa' });
    }
  };
  // Función para borrar una mesa
const borrarMesa = async (req, res) => {
    try {
      const { id } = req.params;
      const mesa = await Mesa.findByPk(id); // Busca la mesa por la clave primaria (ID)
  
      if (mesa) {
        await mesa.destroy(); // Elimina la mesa de la base de datos
        res.status(200).json({ message: 'Mesa eliminada con éxito' });
      } else {
        res.status(404).json({ error: 'Mesa no encontrada' });
      }
    } catch (error) {
      console.error('Error al borrar la mesa:', error);
      res.status(500).json({ error: 'Error al borrar la mesa' });
    }
  };
  
  

module.exports = {
  obtenerMesa,
  crearMesa,
  actualizarMesa,
  borrarMesa
};
