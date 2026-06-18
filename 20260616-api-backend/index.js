//1, imprtamos la heramiente principal (Express)
const express = require("express");

//2, cramos nuesta aplicaicon(nuestro sevidor)
const app = express();

//3, MIDDLEWARE (la linea magica)
//esto es un traductor . le dice a node : "si alguien 
// te envia detos desde fuera ttraducelos al formato
//json para que podamos leerlos". si falta esto 
//, el post falla."
app.use(express.json());


//nuestra base de datos
//guardamos informacion temporalmente en una lista array
//dentro de la memoria del sevidor

let estudiantes = [
    {id: 1, nombre: "Aroa", curso: "React"},
    {id: 2, nombre: "Jose", curso:"Node"}
];




// 🚩ruta get : para leer datos
//cuando alguien pregunte por "/api/estudiantes" , el servidor muestra la lista
app.get("/api/estudiantes", (req,res)=>{
    res.json(estudiantes);
});


//🚩 ruta  post: para guardar datos nuevos
//cuando alguien envie informacion a "api/estudiantes", hacemos lo siguiente
// app.post("/api/estudiantes", (req,res) =>{
//     //A. atrapamos los datos que vienen de fuera (viven dentro de  req.body)
//     const nuevoEstudiante = req.body;
//     //B. metemos ese estudante nuevo en nuestra list usando .push()
//     estudiantes.push(nuevoEstudiante);
//     //C. le respondemos al usuario confirmando que toso ha ido bien
//     res.json({
//         mensaje: "¡Estudiante añadido con exito a la base de datos!",
//         listaActualizada: estudiantes
//     });
// });


app.post("/api/estudiantes", (req,res) =>{
    //A. atrapamos los datos que vienen de f uera (viven dentro de  req.body)
    //const nuevoEstudiante = req.body;
    const {nombre, curso}=req.body;


    //reto 3
    if (!nombre || !curso || nombre.trim() ===" || curso.trim( )"){
        return res.status(400).json({
            error : "Error: El nombre  el curso son obligatorios."
        })
    }

    //reto nivel 2: id automatico
    const nuevoEstudiante = {
        id: estudiantes.length+1,
        nombre :nombre,
        curso: curso

        
    };

    //B. metemos ese estudante nuevo en nuestra list usando .push()
    estudiantes.push(nuevoEstudiante);
    //C. le respondemos al usuario confirmando que toso ha ido bien
    res.json({
        mensaje: "¡Estudiante añadido con exito a la base de datos!",
        listaActualizada: estudiantes
    });
});




//rutas dinamicas (CRUD COMPLETO)
app.get("/api/estudiantes/:id", (req, res) =>{
    const idBuscado = parseInt(req.params.id);
    const estudiante = estudiantes.find(e=> e.id === idBuscado);

    if (estudiante){
        res.json(estudiante);
    }else{
        res.status(404).json({error : "Estudiante no encontrado"});
    }   
});

//✍️ actualizar estudiante
app.put("/api/estudiantes/:id", (req, res) => {
    const idActualizar = parseInt(req.params.id);
    const indice = estudiantes.findIndex(e => e.id === idActualizar);

    if (indice !== -1){
        // Actualizamos los datos, pero mantenemos el ID original intacto
        estudiantes[indice] = { id: idActualizar, ...req.body};
        res.json({
            mensaje: "¡Estudiante actualizado",
            estudianteModificado: estudiantes[indice]
        });
    } else {
        res.status(404).json({ error: "Estudiante no encontrado"});
    }
});





// reto 1. base de datos profesores
let profesores = [
    {id: 1, nombre: "Jorge", asignatura: "Desarrollo Web"},
    {id: 2, nombre: "Gonzalo", asignatura:"Machine Learnign"}
];

//ruta get- leer datos
app.get("/api/profesores", (req,res)=>{
    res.json(profesores);
});
//ruta post: para guardar
app.post("/api/profesores", (req,res) =>{
const nuevoProfesor = req.body;
profesores.push(nuevoProfesor);
   res.json({
        mensaje: "¡Profesor añadido con exito a la base de datos!",
        listaActualizada: profesores
    });
});






//5. encendemos el motor 💨
//le decimos  al sevidor que se quede viigilando el puerto 3000
app.listen(3000, ()=>{
    console.log("¡Servidor funcionando! URL: http://localhost:3000");
});
