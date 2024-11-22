const sequelize = require('../../config/db');

// Crear una nueva oferta
exports.crearOferta = async (req, res) => {
    try {
        const { titulo, requerimiento, descripcion, fecha_inicio, fecha_fin, descuento, idPlato } = req.body;
        const src = req.file ? req.file.path : null; // Ruta relativa de la imagen

        // Valida los datos requeridos
        if (!titulo || !requerimiento || !descripcion || !fecha_inicio || !fecha_fin || !descuento || !idPlato || !src) {
            return res.status(400).json({ error: "Todos los campos son requeridos." });
        }

        // Inserta la oferta en la base de datos
        await sequelize.query(
            `INSERT INTO oferta (src, titulo, requerimiento, descripcion, fecha_inicio, fecha_fin, descuento, idplato)
         VALUES (:src, :titulo, :requerimiento, :descripcion, :fecha_inicio, :fecha_fin, :descuento, :idPlato)`,
            {
                replacements: { src, titulo, requerimiento, descripcion, fecha_inicio, fecha_fin, descuento, idPlato },
                type: sequelize.QueryTypes.INSERT,
            }
        );
    } catch (error) {
        console.error("Error al crear la oferta mensaje backend:", error);
        res.status(500).json({ error: "Error al crear la oferta backend", details: error.message });
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
    const { src, titulo, requerimiento, descripcion, fecha_inicio, fecha_fin, descuento, idPlato } = req.body;

    try {
        const [actualizado] = await sequelize.query(
            `UPDATE oferta SET src = :src, titulo = :titulo, requerimiento = :requerimiento, descripcion = :descripcion, 
            fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin, descuento = :descuento, idPlato = :idPlato
            WHERE idOferta = :id`,
            {
                replacements: { id, src, titulo, requerimiento, descripcion, fecha_inicio, fecha_fin, descuento, idPlato },
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