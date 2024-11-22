const sequelize = require('../../config/db');

// Crear un nuevo pago
exports.crearPago = async (req, res) => {
    const { idpedido, idusuario, monto, fecha } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO pago (idpedido, idusuario, monto, fecha)
             VALUES (:idpedido, :idusuario, :monto, :fecha)`,
            {
                replacements: { idpedido, idusuario, monto, fecha },
                type: sequelize.QueryTypes.INSERT,
            }
        );

        res.status(201).json({ message: 'Pago creado exitosamente' });
    } catch (error) {
        console.error("Error al crear el pago:", error);
        res.status(500).json({ error: 'Error al crear el pago' });
    }
};

// Obtener todos los pagos
exports.obtenerPagos = async (req, res) => {
    try {
        const pagos = await sequelize.query(
            `SELECT p.idpago, p.monto, p.fecha, p.idpedido, p.idusuario, 
                    u.nombre AS usuario, ped.fecha AS fecha_pedido
             FROM pago p
             JOIN usuario u ON p.idusuario = u.idusuario
             JOIN pedido ped ON p.idpedido = ped.idpedido`,
            { type: sequelize.QueryTypes.SELECT }
        );

        res.json(pagos);
    } catch (error) {
        console.error("Error al obtener los pagos:", error);
        res.status(500).json({ error: 'Error al obtener los pagos' });
    }
};

// Actualizar un pago
exports.actualizarPago = async (req, res) => {
    const { id } = req.params;
    const { idpedido, idusuario, monto, fecha } = req.body;

    try {
        const [actualizado] = await sequelize.query(
            `UPDATE pago 
             SET idpedido = :idpedido, idusuario = :idusuario, monto = :monto, fecha = :fecha
             WHERE idpago = :id`,
            {
                replacements: { id, idpedido, idusuario, monto, fecha },
                type: sequelize.QueryTypes.UPDATE,
            }
        );

        if (actualizado) {
            res.json({ message: 'Pago actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error("Error al actualizar el pago:", error);
        res.status(500).json({ error: 'Error al actualizar el pago' });
    }
};

// Eliminar un pago
exports.eliminarPago = async (req, res) => {
    const { id } = req.params;

    try {
        const eliminado = await sequelize.query(
            `DELETE FROM pago WHERE idpago = :id`,
            { replacements: { id }, type: sequelize.QueryTypes.DELETE }
        );

        if (eliminado) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Pago no encontrado' });
        }
    } catch (error) {
        console.error("Error al eliminar el pago:", error);
        res.status(500).json({ error: 'Error al eliminar el pago' });
    }
};