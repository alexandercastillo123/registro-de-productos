DROP DATABASE IF EXISTS productos;
CREATE DATABASE IF NOT EXISTS productos;
USE productos;

-- crear la tabla de categorisd
CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL
);

-- crear la tabla de los productos
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio DOUBLE NOT NULL,
    id_categoria INT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- pa registrar las categorías profe xd
INSERT categorias (nombre_categoria) VALUES ('Lácteos'), ('Bebidas'), ('Limpieza'), ('Otros');

-- pa registrar productos profe
DELIMITER //
CREATE PROCEDURE registrar_productos (
    IN _nombre VARCHAR(100),
    IN _descripcion VARCHAR(100),
    IN _precio DOUBLE,
    IN _id_categoria INT
)
BEGIN
    INSERT productos(nombre, descripcion, precio, id_categoria)
    VALUES (_nombre, _descripcion, _precio, _id_categoria);
END //
DELIMITER ;

-- pa eliminar productos profe
DELIMITER //
CREATE PROCEDURE eliminar_producto (
    IN _id_producto INT
)
BEGIN
    DELETE FROM productos WHERE id_producto = _id_producto;
END //
DELIMITER ;

-- pa listar productos profe
DELIMITER //
CREATE PROCEDURE listar_productos()
BEGIN
    SELECT p.*, c.nombre_categoria 
    FROM productos p
    LEFT JOIN categorias c ON p.id_categoria = c.id_categoria;
END //
DELIMITER ;

-- pa listar las categorías profe
DELIMITER //
CREATE PROCEDURE listar_categorias()
BEGIN
    SELECT * FROM categorias;
END //
DELIMITER ;

-- pa editar los productos profe
DELIMITER //
CREATE PROCEDURE editar_productos (
    IN _id_producto INT,
    IN _nombre VARCHAR(100),
    IN _descripcion VARCHAR(100),
    IN _precio DOUBLE,
    IN _id_categoria INT
)
BEGIN
    UPDATE productos
    SET nombre = _nombre,
        descripcion = _descripcion,
        precio = _precio,
        id_categoria = _id_categoria
    WHERE id_producto = _id_producto;
END //
DELIMITER ;