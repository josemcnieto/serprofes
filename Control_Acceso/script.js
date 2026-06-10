let contador = 0;
const listaDiv = document.getElementById('listaTickets');
const contadorSpan = document.getElementById('contador');

document.getElementById('abrirTicket').addEventListener('click', function() {
    const equipo = document.getElementById('nombreEquipo').value;
    const problema = document.getElementById('problema').value;

    if (equipo.trim() === '' || problema.trim() === '') {
        alert('¡Atencion! Debes indicar el equipo y el problema');
        return;
    }

    contador++;
    contadorSpan.textContent = `Total Asistentes: ${contador}`;

     const ticketDiv = document.createElement('div');
    ticketDiv.style.border = '1px solid #ccc';
    ticketDiv.style.margin = '10px 0';
    ticketDiv.style.padding = '10px';
    ticketDiv.innerHTML = `<strong>${equipo}</strong><br>${problema}`;
    listaDiv.appendChild(ticketDiv);


      document.getElementById('Nombre del Asistente').value = '';
      document.getElementById('profesion').value = '';
});
