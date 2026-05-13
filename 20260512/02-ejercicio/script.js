//1.nuestro super array(Array lleno de objetos)
const carrito = [
    {nombre: "🍞pan de molde", precio:1.20},
    {nombre:"🥛 Leche entera", precio:0.90},
    {nombre: "🥚 Huevos camperos", precio:2.50},
    {nombre: "🥑 Aguacate", precio: 1.00},
    {nombre: "🧀 Queso", precio: 1.50},
    {nombre: "🌭 Salchicha", precio: 3.00}
];
//codigo de apoyo visual
let listaHTML = document.getElementById('lista-producto');
for(let i = 0; i < carrito.length;i++){
    //Usamos carrito[i].nombre para sacar el dato en cada vuelta
    listaHTML.innerHTML += `
    <li><span>${carrito[i].nombre}</span>
    <span>${carrito[i].precio.toFixed(2)}€</span>
    `
}
//la funcion cobrar
function cobrar(){
//1. creamos una variable = acumulador
let sumaTotal = 0;
//2.creamos un bucle for para recorrer el array
for (let i = 0; i< carrito.length; i++){
    //en cada vuelta le sumamos al "sumaTotal" el precio
    sumaTotal = sumaTotal + carrito[i].precio;
}
sumaTotal *= 1.21;


//3. mostramos el resultado final en html
document.getElementById('resultado-total').textContent = 
"Total: " + sumaTotal.toFixed(2) +" €";


}


