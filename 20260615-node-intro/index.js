// //mostramos informacion del sistema
// console.log("Inicializando el cuarto de maquinas");
// console.log("Version Node:");
// console.log(process.version);

// importamos express
const express = require("express");

// creamos la aplicacion
const app = express();

// ruta principal
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// ruta jose
app.get("/jose", (req, res) => {
    res.send("soy jose en nueva ruta");
});

// ruta saludo
app.get("/saludo", (req, res) => {
    res.send("Hola alumnos");
});

// ruta api
app.get("/api", (req, res) => {
    res.json({
        estado: "ok"
    });
});

// ruta hobbies
app.get("/hobbies", (req, res) => {
    res.json([
        { hobbie: "leer" },
        { hobbie: "cine" },
        { hobbie: "programar" }
    ]);
});

// ruta cursos
app.get("/curso", (req, res) => {
    res.json({
        asignatura: [
            "Html5",
            "Javascript",
            "CSS"
        ]
    });
});

app.get("/profesores", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Profesores</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                table {
                    border-collapse: collapse;
                    width: 60%;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Listado de Profesores</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Jorge Martínez</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Gonzalo Pérez</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Javier Gómez</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Ana Rodríguez</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Laura Sánchez</td>
                </tr>
            </table>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Servidor iniciado");
});