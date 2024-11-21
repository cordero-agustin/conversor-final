let valores = {};
let conversionId = 1;  

function cargarTasasDeCambio() {
    fetch('valores.json')
        .then(response => response.json())
        .then(data => {
            valores = data;
            console.log('Tasas de cambio cargadas:', valores);
        })
        .catch(error => {
            console.error('Error al cargar las tasas de cambio:', error);
            valores = {};
        });
}


window.onload = () => {
    cargarTasasDeCambio();
    cargarHistorial();
};


function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = '';  

    
    historial.forEach((item) => {
        const p = document.createElement('p');
        p.innerText = `ID: ${item.id} | Fecha: ${item.hora} | ${item.resultado}`;
        historialDiv.insertBefore(p, historialDiv.firstChild);
    });
}


document.getElementById('botonConversor').addEventListener('click', () => {
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const desde = document.getElementById('desde').value;
    const hacia = document.getElementById('hacia').value;

    if (!cantidad || isNaN(cantidad)) {
        document.getElementById('resultado').innerText = 'Ingresar una cantidad válida';
        return;
    }

    if (Object.keys(valores).length === 0) {
        document.getElementById('resultado').innerText = 'No se han cargado las tasas de cambio aún.';
        return;
    }

    const cantidadConvertida = cantidad * (valores[desde][hacia] || 1);
    const resultadoTexto = `${cantidad} ${desde} = ${cantidadConvertida.toFixed(2)} ${hacia}`;

    document.getElementById('resultado').innerText = resultadoTexto;

   
    const hora = new Date().toLocaleString(); 

  
    const idConversión = conversionId++;

   
    const historialItem = {
        id: idConversión,
        hora: hora,
        resultado: resultadoTexto
    };

   
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    historial.push(historialItem);

 
    localStorage.setItem('historial', JSON.stringify(historial));

    
    cargarHistorial();
});


document.getElementById('botonLimpiarHistorial').addEventListener('click', () => {
    localStorage.removeItem('historial');
    cargarHistorial();
});

function cargarHistorial() {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    const historialDiv = document.getElementById('historial');
    historialDiv.innerHTML = '';  
   
    const historialFiltrado = historial.filter(item => item.id && item.hora && item.resultado);

   
    historialFiltrado.forEach((item) => {
        const p = document.createElement('p');
        p.innerText = `ID: ${item.id} | Fecha: ${item.hora} | ${item.resultado}`;
        historialDiv.insertBefore(p, historialDiv.firstChild);
    });
}

