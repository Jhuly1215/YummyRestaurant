// src/api/platillos/platillo.controller.js
const sequelize = require('../../config/db');

// Crear un nuevo platillo
// Crear un nuevo platillo
exports.crearPlatillo = async (req, res) => {
  const { nombre, descripcion, precio, idCategoria, imagenExterna } = req.body;

  // Determina la ruta de la imagen
  const imagen = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}` // URL completa para imágenes subidas
      : imagenExterna || null; // Usa la URL externa si existe o deja nulo

  const estado = 1; // Establecemos el estado siempre en 1

  try {
      await sequelize.query(
          `INSERT INTO platillo (nombre, descripcion, precio, idCategoria, imagen, estado)
           VALUES (:nombre, :descripcion, :precio, :idCategoria, :imagen, :estado)`,
          {
              replacements: { nombre, descripcion, precio, idCategoria, imagen, estado },
              type: sequelize.QueryTypes.INSERT,
          }
      );
      res.status(201).json({ message: 'Platillo creado exitosamente' });
  } catch (error) {
      console.error("Error al crear el platillo:", error);
      res.status(500).json({ error: 'Error al crear el platillo', details: error.message });
  }
};

// Obtener todos los platillos
exports.obtenerPlatillos = async (req, res) => {
    try {
        const platillos = await sequelize.query(
            `SELECT * FROM platillo where estado != 0`,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(platillos);
    } catch (error) {
        console.error("Error al obtener los platillos:", error);
        res.status(500).json({ error: 'Error al obtener los platillos' });
    }
};

// Actualizar un platillo
exports.actualizarPlatillo = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, idCategoria, imagen } = req.body;

    try {
        const [actualizado] = await sequelize.query(
            `UPDATE platillo SET nombre = :nombre, descripcion = :descripcion, 
             precio = :precio, idcategoria = :idCategoria, imagen = :imagen
             WHERE idplato = :id`,
            {
                replacements: { id, nombre, descripcion, precio, idCategoria, imagen },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        if (actualizado) {
            res.json({ message: 'Platillo actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Platillo no encontrado' });
        }
    } catch (error) {
        console.error("Error al actualizar el platillo:", error);
        res.status(500).json({ error: 'Error al actualizar el platillo', details: error.message });
    }
};

// Eliminar un platillo
exports.eliminarPlatillo = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await sequelize.query(
            `DELETE FROM platillo WHERE idplato = :id`, // Cambia idPlatillo a idplato
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE,
            }
        );

        if (eliminado) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Platillo no encontrado' });
        }
    } catch (error) {
        console.error("Error al eliminar el platillo:", error);
        res.status(500).json({ error: 'Error al eliminar el platillo', details: error.message });
    }
};

// Cambiar el estado de un platillo a "desactivado" (de 1 a 0)
// Cambiar estado a desactivado
exports.cambiarDesactivado = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [actualizado] = await sequelize.query(
        `UPDATE platillo SET estado = 0 WHERE idplato = :id`,
        {
          replacements: { id },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
  
      if (actualizado) {
        res.json({ message: 'Platillo desactivado correctamente' });
      } else {
        res.status(404).json({ error: 'Platillo no encontrado' });
      }
    } catch (error) {
      console.error("Error al desactivar el platillo:", error);
      res.status(500).json({ error: 'Error al desactivar el platillo', details: error.message });
    }
  };
  
