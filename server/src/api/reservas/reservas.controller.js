// src/api/reserva.controller.js
const sequelize = require('../../config/db');

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
    const { fecha, hora, estado, idUsuario, idMesa } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO reserva (fecha, hora, estado, idusuario, idmesa)
             VALUES (:fecha, :hora, :estado, :idusuario, :idmesa)`,
            {
                replacements: { fecha, hora, estado, idUsuario, idMesa },
                type: sequelize.QueryTypes.INSERT,
            }
        );
        res.status(201).json({ message: 'Reserva creada exitosamente' });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ error: 'Error al crear la reserva', details: error.message });
    }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
    try {
        const reservas = await sequelize.query(
            `SELECT r.idreserva, r.idusuario, r.idmesa, r.fecha, r.hora, r.estado, u.nombre AS nombre
             FROM reserva r
             JOIN usuario u ON r.idusuario = u.idusuario`,
            { type: sequelize.QueryTypes.SELECT }
        );
        res.json(reservas);
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

// Actualizar una reserva
exports.actualizarReserva = async (req, res) => {
    const { id } = req.params;
    const { fecha, hora, estado, idusuario, idmesa } = req.body;

    console.log("Datos antes de la consulta SQL:", {
        id,
        fecha,
        hora,
        estado: typeof estado, // Debe ser number
        idusuario: typeof idusuario, // Debe ser number
        idmesa: typeof idmesa, // Debe ser number
      });
      
    console.log("Datos recibidos en el backend para actualizar:", {
        id,
        fecha,
        hora,
        estado,
        idusuario,
        idmesa
    });

    try {
        const [actualizado] = await sequelize.query(
            `UPDATE reserva 
             SET fecha = :fecha, hora = :hora, estado = :estado, idusuario = :idusuario, idmesa = :idmesa
             WHERE idreserva = :id`,
            {
                replacements: { id, fecha, hora, estado: estado, idusuario, idmesa },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        if (actualizado) {
            res.json({ message: 'Reserva actualizada exitosamente' });
        } else {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};


// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await sequelize.query(
            `DELETE FROM reserva WHERE idReserva = :id`,
            {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE,
            }
        );

        if (eliminado) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error("Error al eliminar la reserva:", error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};
