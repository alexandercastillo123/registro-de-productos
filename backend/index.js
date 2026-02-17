const express = require('express');
const database = require('./db');
const cors = require('cors');
const conexion = require('./db');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/listar', (req, res) => {
    const sql = 'CALL listar_productos()';

    database.query(sql, (error, results) => {
        if (error) {
            console.error("Error en SQL:", error);
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(results[0]); 
    });
});


app.post('/registrar', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const sql = 'CALL registrar_productos(?, ?, ?)';

    database.query(sql, [ nombre, descripcion, precio], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la creación del producto' });
        }
        res.json({ message: "Registro exitoso del producto" });
    });
});



app.post('/actualizar', (req, res) => {
    const { id_producto, nombre, descripcion, precio } = req.body;
    const sql = 'CALL editar_productos(?, ?, ?, ?)';

    database.query(sql, [id_producto, nombre, descripcion, precio], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la acctualizacion del producto' });
        }
        res.json({ message: "Actualizacion exitoso del producto" });
    });
});

app.post('/eliminar', (req, res) => {
    const { id_producto } = req.body;
    const sql = 'CALL eliminar_producto(?)';

    database.query(sql, [id_producto], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la creación del producto' });
        }
        res.json({ message: "Eliminacion exitosa del producto" });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);});