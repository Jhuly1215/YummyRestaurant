// src/api/platillos/platillo.controller.js
const sequelize = require('../../config/db');

// Crear un nuevo platillo
exports.crearPlatillo = async (req, res) => {
    const { nombre, descripcion, precio, idCategoria } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO platillo (nombre, descripcion, precio, idCategoria, imagen)
             VALUES (:nombre, :descripcion, :precio, :idCategoria, :imagen)`,
            {
                replacements: { nombre, descripcion, precio, idCategoria, imagen },
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
            `SELECT * FROM platillo`,
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
