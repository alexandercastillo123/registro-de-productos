const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productos',
});


conexion.connect((error) => {
    if (error){
        console.error('Error de conexión a la base de datos:', error);
        return;
    }
    else{
        console.log('Conexión a la base de datos correctamente establecida');
    }
});

module.exports = conexion;