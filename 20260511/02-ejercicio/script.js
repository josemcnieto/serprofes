//1. creamos nuestra "caja grande" (Array)
let carrito = ["🍏 Manzana", "🍌 Platano"];
//2. Imprimir el carrito nada mas al cargar la pagina
document.getElementById('pantalla-cesta').textContent = carrito.join(" - ");

//3.la funcion para agregar cosas nuevas a la lista
function añadirAlCarrito(){
    //atrapamos o que escribe el usuario
    let item = document.getElementById('nuevo-item').value;
    //magia de arrays: .push() mete el nuevo elemento al final de la lista
    carrito.push(item);
    //volvemos a pintar la esta para que se vea
    document.getElementById('pantalla-cesta').textContent = carrito.join(' - ');
    //limpiamos el input
    document.getElementById('nuevo-item').value = "";
    
}
function eliminarDelCarrito(){
    //atrapamos o que escribe el usuario
    let item = document.getElementById('nuevo-item').value;
    //magia de arrays: .push() mete el nuevo elemento al final de la lista
    carrito.pop(item);
    //volvemos a pintar la esta para que se vea
    document.getElementById('pantalla-cesta').textContent = carrito.join(' - ');
    //limpiamos el input
    document.getElementById('nuevo-item').value = "";
    
}