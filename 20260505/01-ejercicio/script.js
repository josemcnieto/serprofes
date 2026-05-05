console.log("!Cerebro conectado con defer!")


function calcularPrecioFinal(){
    // 1.ATRAPAMOS los datos del HTML
    // Usamos 'let' porque son valores que el usuario puede cambiar 
    //cada vez que teclea
    let precio = Number(document.getElementById('precio').value);
    let porcentaje = Number(document.getElementById('descuento').value);
    // 2. logica(matematica)
    // usamos 'const' porque , una vez calculados, estos resultado
    //matematicos no van a cambiar en ese evento
    const descuentoEnEuros = precio*(porcentaje / 100);
    const precioFinal = precio -descuentoEnEuros;
    //3. Inyectamos el resultado en el HTML
    //toFixed(2) obliga siempre que haya 2 decimales(ej.80.00 €)
    document.getElementById('texto-resultado').textContent = precioFinal.toFixed(2)+"€";

}
