
INSERT INTO rol (rol) VALUES ('usuario');
INSERT INTO rol (rol) VALUES ('admin');
INSERT INTO rol (rol) VALUES ('cajero');

select * from usuario
insert into usuario (idusuario, nombre, apellidos, correo, password, idrol) values 
(1, 'Test', 'Usuario', 'test@example.com','Yummy123',2),
(6814265, 'jhuly', 'tarqui', 'jhulsdev@gmail.com','Yummy123.',2),
(2, 'Test2', 'UsuarioAppe', 'test3@example.com','Yummy123',3),
(3, 'Test3', 'UsuarioApellido', 'test4@example.com','Yummy123',1);

insert into mesa (capacidad) values 
(3),
(6),
(4),
(4),
(4),
(4),
(3),
(6),
(4),
(4),
(4),
(4),
(4),
(4),
(4);
-- Inserta reservas de ejemplo
INSERT INTO reserva (fecha, hora, estado, idusuario, idmesa)
VALUES 
('2024-11-20', '14:00:00', 1, 1, 10), -- Pendiente
('2024-11-20', '16:00:00', 0, 2, 11), -- Entregada
('2024-11-21', '12:00:00', 1, 3, 12), -- Pendiente
('2024-11-22', '18:00:00', 0, 6814265, 13), -- Entregada
('2024-11-23', '13:00:00', 1, 1, 14), -- Pendiente
('2024-11-24', '19:00:00', 0, 2, 15), -- Entregada
('2024-11-25', '11:00:00', 1, 3, 16), -- Pendiente
('2024-11-25', '15:00:00', 0, 6814265, 17), -- Entregada
('2024-11-26', '17:00:00', 1, 1, 8), -- Pendiente
('2024-11-27', '20:00:00', 0, 2, 9); -- Entregada