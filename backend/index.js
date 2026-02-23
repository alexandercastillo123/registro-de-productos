const express = require('express');
const database = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// el get pa listar los productos profe
app.get('/listar', (req, res) => {
    const sql = 'CALL listar_productos()';

    database.query(sql, (error, results) => {
        if (error) {
            console.error("Error al listar:", error);
            return res.status(500).json({ error: 'No se pudo obtener la lista de productos' });
        }
        res.json(results[0]);
    });
});

// el get pa listar las categorías profe
app.get('/categorias', (req, res) => {
    const sql = 'CALL listar_categorias()';

    database.query(sql, (error, results) => {
        if (error) {
            console.error("Error al listar categorías:", error);
            return res.status(500).json({ error: 'No se pudo obtener las categorías' });
        }
        res.json(results[0]);
    });
});

// el post pa registrar los productos profe
app.post('/registrar', (req, res) => {
    const { nombre, descripcion, precio, id_categoria } = req.body;
    const sql = 'CALL registrar_productos(?, ?, ?, ?)';

    database.query(sql, [nombre, descripcion, precio, id_categoria], (error, results) => {
        if (error) {
            console.error("Error al registrar:", error);
            return res.status(500).json({ error: 'Error al crear el producto' });
        }
        res.json({ message: "¡Producto registrado con éxito!" });
    });
});

// el post pa actualizar los productos profe
app.post('/actualizar', (req, res) => {
    const { id_producto, nombre, descripcion, precio, id_categoria } = req.body;
    const sql = 'CALL editar_productos(?, ?, ?, ?, ?)';

    database.query(sql, [id_producto, nombre, descripcion, precio, id_categoria], (error, results) => {
        if (error) {
            console.error("Error al actualizar:", error);
            return res.status(500).json({ error: 'Error al actualizar el producto' });
        }
        res.json({ message: "¡Producto actualizado correctamente!" });
    });
});

// el post pa eliminar los productos profe
app.post('/eliminar', (req, res) => {
    const { id_producto } = req.body;
    const sql = 'CALL eliminar_producto(?)';

    database.query(sql, [id_producto], (error, results) => {
        if (error) {
            console.error("Error al eliminar:", error);
            return res.status(500).json({ error: 'Error al eliminar el producto' });
        }
        res.json({ message: "Producto eliminado" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});
