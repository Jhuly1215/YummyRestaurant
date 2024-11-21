const sequelize = require('../../config/db');

// Crear una nueva calificación
exports.crearCalificacion = async (req, res) => {
  const { puntuacion, idUsuario, idPlato } = req.body;

  try {
    const nuevaCalificacion = await sequelize.query(
      `INSERT INTO resenia (puntuacion, idusuario, idplato)
       VALUES (:puntuacion, :idUsuario, :idPlato)`,
      {
        replacements: { puntuacion, idUsuario, idPlato },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(201).json({
      message: 'Calificación creada exitosamente',
      data: nuevaCalificacion,
    });
  } catch (error) {
    console.error('Error al crear la calificación:', error);
    res.status(500).json({ error: 'Error al crear la calificación' });
  }
};

// Obtener todas las calificaciones
exports.obtenerCalificaciones = async (req, res) => {
  try {
    const calificaciones = await sequelize.query(
      `SELECT r.idresenia, r.puntuacion, r.idusuario, r.idplato,
              u.nombre AS usuario, p.nombre AS platillo
       FROM resenia r
       LEFT JOIN usuario u ON r.idusuario = u.idusuario
       LEFT JOIN platillo p ON r.idplato = p.idplato`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json(calificaciones);
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    res.status(500).json({ error: 'Error al obtener las calificaciones' });
  }
};

// Actualizar una calificación
exports.actualizarCalificacion = async (req, res) => {
  const { id } = req.params;
  const { puntuacion, idUsuario, idPlato } = req.body;

  try {
    const [actualizado] = await sequelize.query(
      `UPDATE resenia
       SET puntuacion = :puntuacion, idusuario = :idUsuario, idplato = :idPlato
       WHERE idresenia = :id`,
      {
        replacements: { id, puntuacion, idUsuario, idPlato },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (actualizado) {
      res.json({ message: 'Calificación actualizada exitosamente' });
    } else {
      res.status(404).json({ error: 'Calificación no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar la calificación:', error);
    res.status(500).json({ error: 'Error al actualizar la calificación' });
  }
};

// Eliminar una calificación
exports.eliminarCalificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await sequelize.query(
      `DELETE FROM resenia WHERE idresenia = :id`,
      {
        replacements: { id },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    if (eliminado) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Calificación no encontrada' });
    }
  } catch (error) {
    console.error('Error al eliminar la calificación:', error);
    res.status(500).json({ error: 'Error al eliminar la calificación' });
  }
};
