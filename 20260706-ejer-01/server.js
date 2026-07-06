//1. importar herramientas
const express = require('express');
const app = express();

//2. nuestra base de datos falsa(el catalogo)
// esto es un array de objetos (json)
const inventario = [
        {id:1, articulo: "Libros-Ficcion" , stock:200},
        {id:2, articulo: "Libros-Biogracias", stock:40},
        {id:3, articulo: "Libros-Aventuras", stock:150},
        {id:3, articulo: "Libros-Aventuras", stock:150}
];
// 3. la ruta (el camarero)
// cuando alguien pida 'api/productos', le entregamos el inventario

app.get('/api/productos', (req, res) =>{
    //res.json convierte los datos para que el internet entiend
    res.json(inventario);
    });

    //4, encender el servidor
    //le decimos que escuche en el puerto 3000
    app.listen(3000,() => {
        console.log('🎉 Servidor encendido y escuchando en el puerto 3000');
    });