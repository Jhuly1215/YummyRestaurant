const sequelize = require('../../config/db');

// Crear una nueva oferta
exports.crearOferta = async (req, res) => {
    const { descripcion, requerimiento, fecha_inicio, fecha_fin, descuento, idPlato } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO oferta (descripcion, requerimiento, fecha_inicio, fecha_fin, descuento, idPlato)
         VALUES (:descripcion, :requerimiento, :fecha_inicio, :fecha_fin, :descuento, :idPlato)`,
            {
                replacements: { descripcion, requerimiento, fecha_inicio, fecha_fin, descuento, idPlato },
                type: sequelize.QueryTypes.INSERT,
            }
        );
        res.status(201).json({ message: 'Oferta creada exitosamente' });
    } catch (error) {
        console.error(error); // Esto imprimirá el error completo en la consola
        res.status(500).json({ error: 'Error al crear la oferta', details: error.message });
    }
};

// Obtener todas las ofertas
exports.obtenerOfertas = async (req, res) => {
    try {
        const ofertas = await sequelize.query(
            `SELECT * FROM oferta`,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(ofertas);
    } catch (error) {
        console.error("Error al obtener las ofertas:", error);
        res.status(500).json({ error: 'Error al obtener las ofertas' });
    }
};

// Actualizar una oferta
exports.actualizarOferta = async (req, res) => {
    const { id } = req.params;
    const { descripcion, requerimiento, fecha_inicio, fecha_fin, descuento, idPlato } = req.body;

    try {
        const [actualizado] = await sequelize.query(
            `UPDATE oferta SET descripcion = :descripcion, requerimiento = :requerimiento, 
         fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin, descuento = :descuento, idPlato = :idPlato
         WHERE idOferta = :id`,
            {
                replacements: { id, descripcion, requerimiento, fecha_inicio, fecha_fin, descuento, idPlato },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        if (actualizado) {
            res.json({ message: 'Oferta actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la oferta' });
    }
};

// Eliminar una oferta
exports.eliminarOferta = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await sequelize.query(
            `DELETE FROM oferta WHERE idOferta = :id`,
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE,
            }
        );

        if (eliminado) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Oferta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la oferta' });
    }
};  