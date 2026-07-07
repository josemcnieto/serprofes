const express = require('express');
const app = express();
// Catálogo 1
const listaA = [
        {id:1, item: "Libros-Ficcion" , stock:200},
        {id:2, item: "Libros-Biografias", stock:40},
        {id:3, item: "Libros-Aventuras", stock:150},
        {id:3, item: "Libros-Arquitectura", stock:150}
];
// Catálogo 2
const listaB = [
        { id: 1, item: "El año que vivimos peligrosamente", stock:20},
        { id: 2, item: "Lo que el viento se llevo" , stock: 50},
        { id: 1, item: "El padrino" ,stock: 30},
        { id: 2, item: "La lista de Schindler" , stock: 10}
];
// Ruta Principal
app.get('/', (req, res) => {
res.send('Servidor activo. Prueba /api/primera o /api/segunda');
});
// Ruta 1
app.get('/api/primera', (req, res) => {
res.json(listaA);
});
// Ruta 2
app.get('/api/segunda', (req, res) => {
res.json(listaB);
});
app.listen(3000, () => {
console.log('Servidor en puerto 3000');
});