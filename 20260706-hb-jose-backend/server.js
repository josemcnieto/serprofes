//1. importar herramientas
const express = require('express');
const app = express();

//2. nuestra base de datos falsa(el catalogo)
// esto es un array de objetos (json)
const inventario = [
        {id:1, articulo: "Portatil HP" , stock:15},
        {id:2, articulo: "Monitor Dell", stock:5},
        {id:3, articulo: "Teclado Mecanico", stock:22}
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
