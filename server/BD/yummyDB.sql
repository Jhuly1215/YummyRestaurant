-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-10-31 22:35:50.815

-- tables
-- Table: categoria
CREATE TABLE categoria (
    idcategoria SERIAL PRIMARY KEY,
    tipo varchar(30) NOT NULL,
    descripcion varchar(100) NOT NULL
);

-- Table: detalle_pedido
CREATE TABLE detalle_pedido (
    iddetalle SERIAL PRIMARY KEY,
    cantidad int NOT NULL,
    idplato int NOT NULL,
    idpedido int NOT NULL,
    idreserva int NOT NULL
);

-- Table: mesa
CREATE TABLE mesa (
    idmesa SERIAL PRIMARY KEY,
    capacidad int NOT NULL
);

-- Table: oferta
CREATE TABLE oferta (
    idoferta SERIAL PRIMARY KEY,
    requerimiento varchar(100) NOT NULL,
    descripcion varchar(70) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    descuento int NOT NULL,
    idplato int NOT NULL
);

-- Table: pago
CREATE TABLE pago (
    idpago SERIAL PRIMARY KEY,
    fecha int NOT NULL,
    monto real NOT NULL,
    idpedido int NOT NULL,
    idusuario int NOT NULL
);

-- Table: pedido
CREATE TABLE pedido (
    idpedido SERIAL PRIMARY KEY,
    fecha date NOT NULL,
    hora time NOT NULL,
    estado int NOT NULL,
    idusuario int NOT NULL,
    precio_total real NOT NULL
);

-- Table: platillo
CREATE TABLE platillo (
    idplato SERIAL PRIMARY KEY,
    nombre varchar(30) NOT NULL,
    descripcion varchar(70) NOT NULL,
    precio int NOT NULL,
    idcategoria int NOT NULL
);

-- Table: resenia
CREATE TABLE resenia (
    idresenia SERIAL PRIMARY KEY,
    puntuacion int NOT NULL,
    idusuario int NOT NULL,
    idplato int NOT NULL
);

-- Table: reserva
CREATE TABLE reserva (
    idreserva SERIAL PRIMARY KEY,
    fecha date NOT NULL,
    hora time NOT NULL,
    estado int NOT NULL,
    idusuario int NOT NULL,
    idmesa int NOT NULL
);

-- Table: rol
CREATE TABLE rol (
    idrol SERIAL PRIMARY KEY,
    rol varchar(25) NOT NULL
);

-- Table: usuario
CREATE TABLE usuario (
    idusuario SERIAL PRIMARY KEY,
    nombre varchar(255) NOT NULL,
    apellidos varchar(255) NOT NULL,
    correo varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    idrol int NOT NULL
);

-- foreign keys
-- Reference: detalle_pedido_pedido (table: detalle_pedido)
ALTER TABLE detalle_pedido ADD CONSTRAINT detalle_pedido_pedido
    FOREIGN KEY (idpedido)
    REFERENCES pedido (idpedido)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: detalle_pedido_platillo (table: detalle_pedido)
ALTER TABLE detalle_pedido ADD CONSTRAINT detalle_pedido_platillo
    FOREIGN KEY (idplato)
    REFERENCES platillo (idplato)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: detalle_pedido_reserva (table: detalle_pedido)
ALTER TABLE detalle_pedido ADD CONSTRAINT detalle_pedido_reserva
    FOREIGN KEY (idreserva)
    REFERENCES reserva (idreserva)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: pago_pedido (table: pago)
ALTER TABLE pago ADD CONSTRAINT pago_pedido
    FOREIGN KEY (idpedido)
    REFERENCES pedido (idpedido)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: pago_usuario (table: pago)
ALTER TABLE pago ADD CONSTRAINT pago_usuario
    FOREIGN KEY (idusuario)
    REFERENCES usuario (idusuario)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: pedido_usuario (table: pedido)
ALTER TABLE pedido ADD CONSTRAINT pedido_usuario
    FOREIGN KEY (idusuario)
    REFERENCES usuario (idusuario)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: platillo_categoria (table: platillo)
ALTER TABLE platillo ADD CONSTRAINT platillo_categoria
    FOREIGN KEY (idcategoria)
    REFERENCES categoria (idcategoria)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: promocion_platillo (table: oferta)
ALTER TABLE oferta ADD CONSTRAINT promocion_platillo
    FOREIGN KEY (idplato)
    REFERENCES platillo (idplato)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reserva_mesa (table: reserva)
ALTER TABLE reserva ADD CONSTRAINT reserva_mesa
    FOREIGN KEY (idmesa)
    REFERENCES mesa (idmesa)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reserva_usuario (table: reserva)
ALTER TABLE reserva ADD CONSTRAINT reserva_usuario
    FOREIGN KEY (idusuario)
    REFERENCES usuario (idusuario)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reseña_platillo (table: resenia)
ALTER TABLE resenia ADD CONSTRAINT resenia_platillo
    FOREIGN KEY (idplato)
    REFERENCES platillo (idplato)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reseña_usuario (table: resenia)
ALTER TABLE resenia ADD CONSTRAINT resenia_usuario
    FOREIGN KEY (idusuario)
    REFERENCES usuario (idusuario)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usuarios_roles (table: usuario)
ALTER TABLE usuario ADD CONSTRAINT usuarios_roles
    FOREIGN KEY (idrol)
    REFERENCES rol (idrol)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

INSERT INTO rol (rol) VALUES ('usuario');
INSERT INTO rol (rol) VALUES ('admin');
INSERT INTO rol (rol) VALUES ('cajero');
