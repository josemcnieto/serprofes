
//1.El objeto
//Usamos llaves´{} para crear la ficha tecnica
//y dos puntos para dar valor
let producto = {
    nombre: "🍎 Manzanas",
    precio: 2.5,
    categoria: "Fruta",
};

// 2.¿Como leemos un dato concreto y lo mandamos
//al html?
document.getElementById("prod-nombre").textContent=producto.nombre;
document.getElementById("prod-precio").textContent=producto.precio;
document.getElementById("prod-cat").textContent=producto.categoria;

//Mini reto//
function mostrarMiFicha(){
    //1.crea tu propio objeto "alumno"
    let alumno = {
        alumno: "😀Jose ",
        edad: "50",
        ciudad: "Almeria",
    }
    //2.mostrar los datos en html
    document.getElementById("alum-nombre").textContent=alumno.alumno;
    document.getElementById("alum-edad").textContent=alumno.edad;
    document.getElementById("alum-ciudad").textContent=alumno.ciudad;
}